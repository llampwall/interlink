import { describe, expect, it } from 'vitest';

import type { ApiChatFolder } from '../api/types';

import { findMainChatFolder, isChatInMainFolder } from './mainFolder';

function buildFolder(id: number, title: string): ApiChatFolder {
  return {
    id,
    title: { text: title },
    includedChatIds: [],
    excludedChatIds: [],
  };
}

describe('findMainChatFolder', () => {
  it('finds Main case-insensitively', () => {
    const folders = [buildFolder(1, 'Personal'), buildFolder(2, 'MAIN')];

    expect(findMainChatFolder(folders)?.id).toBe(2);
  });

  it('returns undefined when Main is missing', () => {
    expect(findMainChatFolder([buildFolder(1, 'Other')])).toBeUndefined();
  });
});

describe('isChatInMainFolder', () => {
  it('rejects a chat outside the resolved folder IDs', () => {
    expect(isChatInMainFolder(['1', '2'], '3')).toBe(false);
  });
});
