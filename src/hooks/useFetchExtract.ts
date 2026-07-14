import { useRef, useState } from '../lib/teact/teact';

import type { ApiAttachment } from '../api/types';
import type { Signal } from '../util/signals';

import { extractAndBuildAttachments, findSocialUrl } from '../util/fetchExtract';
import parseHtmlAsFormattedText from '../util/parseHtmlAsFormattedText';
import { useDebouncedResolver } from './useAsyncResolvers';
import useDerivedSignal from './useDerivedSignal';
import { useSignalEffect } from './useSignalEffect';

export type FetchStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface FetchExtractionResult {
  attachments: ApiAttachment[];
  caption: string;
  platform: string;
  thumbnail?: string;
}

const DEBOUNCE_MS = 500;

export default function useFetchExtract(getHtml: Signal<string>) {
  const [status, setStatus] = useState<FetchStatus>('idle');
  const [platform, setPlatform] = useState('');
  const [thumbnail, setThumbnail] = useState<string | undefined>();
  const resultRef = useRef<FetchExtractionResult | undefined>();
  const urlRef = useRef<string | undefined>();
  const abortRef = useRef(false);

  // Detect social URLs reactively via signal subscription (debounced)
  const detectUrlDebounced = useDebouncedResolver(() => {
    const { text } = parseHtmlAsFormattedText(getHtml());
    return findSocialUrl(text);
  }, [getHtml], DEBOUNCE_MS, true);

  const getSocialUrl = useDerivedSignal(
    detectUrlDebounced, [detectUrlDebounced, getHtml], true,
  );

  // React to social URL changes — start/stop extraction
  useSignalEffect(() => {
    const socialUrl = getSocialUrl();

    // URL unchanged — nothing to do
    if (socialUrl === urlRef.current) return;

    // URL removed or changed — reset
    resultRef.current = undefined;
    abortRef.current = true;

    if (!socialUrl) {
      urlRef.current = undefined;
      setStatus('idle');
      setPlatform('');
      setThumbnail(undefined);
      return;
    }

    // New social URL detected — start optimistic extraction
    urlRef.current = socialUrl;
    abortRef.current = false;
    setStatus('loading');

    extractAndBuildAttachments(socialUrl)
      .then((result) => {
        if (abortRef.current || urlRef.current !== socialUrl) return;
        if (result) {
          resultRef.current = result;
          setPlatform(result.platform);
          setThumbnail(result.thumbnail);
          setStatus('ready');
        } else {
          setStatus('error');
        }
      })
      .catch(() => {
        if (abortRef.current || urlRef.current !== socialUrl) return;
        setStatus('error');
      });
  }, [getSocialUrl]);

  return {
    fetchStatus: status,
    fetchPlatform: platform,
    fetchThumbnail: thumbnail,
    consumeResult(): FetchExtractionResult | undefined {
      const result = resultRef.current;
      if (!result) return undefined;
      resultRef.current = undefined;
      urlRef.current = undefined;
      abortRef.current = true;
      setStatus('idle');
      setPlatform('');
      setThumbnail(undefined);
      return result;
    },
  };
}
