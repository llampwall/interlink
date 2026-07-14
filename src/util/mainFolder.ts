import type { ApiChatFolder } from '../api/types';

export function findMainChatFolder(folders: ApiChatFolder[]) {
  return folders.find(({ title }) => title.text.trim().toLowerCase() === 'main');
}

export function isChatInMainFolder(chatIds: string[] | undefined, chatId: string) {
  return Boolean(chatIds?.includes(chatId));
}
