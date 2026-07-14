/**
 * Fetch media extraction client.
 * Calls the Fetch API backend to extract media from social media URLs,
 * then converts results into ApiAttachment objects ready for sending.
 */

import type { ApiAttachment } from '../api/types';

// Relative URLs — proxied through serve.cjs in production
const FETCH_API_URL = '';

// eslint-disable-next-line @stylistic/max-len
const SOCIAL_URL_RE = /https?:\/\/(?:www\.)?(?:instagram\.com\/(?:p|reel|reels|stories)\/[\w-]+|(?:x\.com|twitter\.com)\/\w+\/status\/\d+|tiktok\.com\/@[\w.]+\/video\/\d+|(?:vm\.)?tiktok\.com\/[\w]+|(?:m\.)?youtube\.com\/(?:watch\?[\w=&]+|shorts\/[\w-]+)|youtu\.be\/[\w-]+|(?:old\.)?reddit\.com\/r\/\w+\/(?:comments|s)\/[\w]+|v\.redd\.it\/[\w]+|i\.redd\.it\/[\w.]+)[/\w\-?=&%.]*/i;

interface ExtractedItem {
  type: 'photo' | 'video';
  url: string;
  width?: number;
  height?: number;
  duration?: number;
}

interface ExtractResult {
  success: boolean;
  platform?: string;
  caption?: string;
  thumbnail?: string;
  items?: ExtractedItem[];
  error?: string;
}

export function findSocialUrl(text: string): string | undefined {
  const match = text.match(SOCIAL_URL_RE);
  return match?.[0];
}

export function stripUrl(text: string, url: string): string {
  return text.replace(url, '').trim();
}

async function callExtractApi(url: string): Promise<ExtractResult> {
  const resp = await fetch(`${FETCH_API_URL}/extract?url=${encodeURIComponent(url)}`);
  return resp.json();
}

async function downloadBlob(fileUrl: string): Promise<Blob> {
  const resp = await fetch(`${FETCH_API_URL}${fileUrl}`);
  return resp.blob();
}

export async function extractAndBuildAttachments(
  socialUrl: string,
): Promise<{
  attachments: ApiAttachment[];
  caption: string;
  platform: string;
  thumbnail?: string;
} | undefined> {
  const result = await callExtractApi(socialUrl);
  if (!result.success || !result.items?.length) {
    return undefined;
  }

  const attachments: ApiAttachment[] = [];

  for (const item of result.items) {
    const blob = await downloadBlob(item.url);
    const isVideo = item.type === 'video';
    const filename = item.url.split('/').pop() || (isVideo ? 'video.mp4' : 'photo.jpg');
    const blobUrl = URL.createObjectURL(blob);

    const attachment: ApiAttachment = {
      blobUrl,
      filename,
      mimeType: isVideo ? 'video/mp4' : 'image/jpeg',
      size: blob.size,
      quick: (item.width && item.height)
        ? {
          width: item.width,
          height: item.height,
          duration: isVideo && item.duration ? item.duration : undefined,
        }
        : undefined,
    };
    attachments.push(attachment);
  }

  return {
    attachments,
    caption: result.caption || '',
    platform: result.platform || 'Unknown',
    thumbnail: result.thumbnail,
  };
}
