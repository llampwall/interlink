import type { FC } from '@teact';
import { memo, useEffect, useRef } from '@teact';
import { getActions, withGlobal } from '../../../global';

import type { ApiChatFolder, ApiChatlistExportedInvite } from '../../../api/types';
import type { GlobalState } from '../../../global/types';
import type { FolderEditDispatch } from '../../../hooks/reducers/useFoldersReducer';
import type { AnimationLevel } from '../../../types';

import { ALL_FOLDER_ID } from '../../../config';
import { selectCurrentMessageList, selectMainChatFolder, selectTabState } from '../../../global/selectors';
import { selectCurrentLimit } from '../../../global/selectors/limits';
import { selectSharedSettings } from '../../../global/selectors/sharedState';
import { IS_TOUCH_ENV } from '../../../util/browser/windowEnvironment';
import buildClassName from '../../../util/buildClassName';
import captureEscKeyListener from '../../../util/captureEscKeyListener';
import { captureEvents, SwipeDirection } from '../../../util/captureEvents';
import { isChatInMainFolder } from '../../../util/mainFolder';
import { resolveTransitionName } from '../../../util/resolveTransitionName';

import useDerivedState from '../../../hooks/useDerivedState';
import { useFolderManagerForOrderedIds } from '../../../hooks/useFolderManager';
import useFolderTabs from '../../../hooks/useFolderTabs';
import useHistoryBack from '../../../hooks/useHistoryBack';
import useLang from '../../../hooks/useLang';
import useLastCallback from '../../../hooks/useLastCallback';
import useScrolledState from '../../../hooks/useScrolledState';
import useShowTransition from '../../../hooks/useShowTransition';

import StoryRibbon from '../../story/StoryRibbon';
import Transition from '../../ui/Transition';
import ChatFolderTabList from './ChatFolderTabList';
import ChatList from './ChatList';

import emptyFolderStyles from './EmptyFolder.module.scss';

type OwnProps = {
  foldersDispatch: FolderEditDispatch;
  isForumPanelOpen?: boolean;
  isFoldersSidebarShown?: boolean;
};

type StateProps = {
  chatFoldersById: Record<number, ApiChatFolder>;
  folderInvitesById: Record<number, ApiChatlistExportedInvite[]>;
  orderedFolderIds?: number[];
  mainFolderId?: number;
  currentChatId?: string;
  activeChatFolder: number;
  currentUserId?: string;
  animationLevel: AnimationLevel;
  shouldSkipHistoryAnimations?: boolean;
  maxFolders: number;
  maxChatLists: number;
  maxFolderInvites: number;
  hasArchivedChats?: boolean;
  hasArchivedStories?: boolean;
  archiveSettings: GlobalState['archiveSettings'];
  isStoryRibbonShown?: boolean;
};

const SAVED_MESSAGES_HOTKEY = '0';
const FIRST_FOLDER_INDEX = 0;

const ChatFolders: FC<OwnProps & StateProps> = ({
  foldersDispatch,
  chatFoldersById,
  orderedFolderIds,
  mainFolderId,
  currentChatId,
  activeChatFolder,
  currentUserId,
  isForumPanelOpen,
  animationLevel,
  shouldSkipHistoryAnimations,
  maxFolders,
  maxChatLists,
  folderInvitesById,
  maxFolderInvites,
  hasArchivedChats,
  hasArchivedStories,
  archiveSettings,
  isStoryRibbonShown,
  isFoldersSidebarShown,
}) => {
  const {
    loadChatFolders,
    setActiveChatFolder,
    openChat,
  } = getActions();

  const transitionRef = useRef<HTMLDivElement>();

  const lang = useLang();

  const { isAtBeginning, handleScroll, updateScrollState } = useScrolledState();

  useEffect(() => {
    loadChatFolders();
  }, []);

  useEffect(() => {
    const activeList = transitionRef.current?.querySelector<HTMLElement>('.chat-list.Transition_slide-active');
    updateScrollState(activeList ?? undefined);
  }, [activeChatFolder, updateScrollState]);

  const {
    ref,
    shouldRender: shouldRenderStoryRibbon,
    getIsClosing: getIsStoryRibbonClosing,
  } = useShowTransition({
    isOpen: isStoryRibbonShown,
    className: false,
    withShouldRender: true,
  });
  const isStoryRibbonClosing = useDerivedState(getIsStoryRibbonClosing);

  const scrollToTop = useLastCallback(() => {
    const activeList = ref.current?.querySelector<HTMLElement>('#LeftColumn .chat-list.Transition_slide-active');
    activeList?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  const { displayedFolders, folderTabs } = useFolderTabs({
    sidebarMode: false,
    noEmoticons: true,
    orderedFolderIds,
    chatFoldersById,
    maxFolders,
    maxChatLists,
    folderInvitesById,
    maxFolderInvites,
  });

  const mainChatIds = useFolderManagerForOrderedIds(mainFolderId ?? ALL_FOLDER_ID);
  useEffect(() => {
    if (!navigator.serviceWorker) return;

    void navigator.serviceWorker.ready.then((registration) => {
      registration.active?.postMessage({
        type: 'setAllowedNotificationChatIds',
        payload: mainFolderId ? mainChatIds || [] : [],
      });
    });
  }, [mainChatIds, mainFolderId]);

  useEffect(() => {
    if (currentChatId && mainChatIds && !isChatInMainFolder(mainChatIds, currentChatId)) {
      openChat({ id: undefined });
    }
  }, [currentChatId, mainChatIds, openChat]);

  const allChatsFolderIndex = displayedFolders?.findIndex((folder) => folder.id === ALL_FOLDER_ID);
  const isInAllChatsFolder = allChatsFolderIndex === activeChatFolder;
  const isInFirstFolder = FIRST_FOLDER_INDEX === activeChatFolder;

  const handleSwitchTab = useLastCallback((index: number) => {
    setActiveChatFolder({ activeChatFolder: index }, { forceOnHeavyAnimation: true });
    if (activeChatFolder === index) {
      scrollToTop();
    }
  });

  // Prevent `activeTab` pointing at non-existing folder after update
  useEffect(() => {
    if (!folderTabs?.length) {
      return;
    }

    if (activeChatFolder >= folderTabs.length) {
      setActiveChatFolder({ activeChatFolder: FIRST_FOLDER_INDEX });
    }
  }, [activeChatFolder, folderTabs, setActiveChatFolder]);

  useEffect(() => {
    if (!IS_TOUCH_ENV || !folderTabs?.length || isForumPanelOpen) {
      return undefined;
    }

    return captureEvents(transitionRef.current!, {
      selectorToPreventScroll: '.chat-list',
      onSwipe: (e, direction) => {
        if (direction === SwipeDirection.Left) {
          setActiveChatFolder(
            { activeChatFolder: Math.min(activeChatFolder + 1, folderTabs.length - 1) },
            { forceOnHeavyAnimation: true },
          );
          return true;
        } else if (direction === SwipeDirection.Right) {
          setActiveChatFolder({ activeChatFolder: Math.max(0, activeChatFolder - 1) }, { forceOnHeavyAnimation: true });
          return true;
        }

        return false;
      },
    });
  }, [activeChatFolder, folderTabs, isForumPanelOpen, setActiveChatFolder]);

  const isNotInFirstFolderRef = useRef();
  isNotInFirstFolderRef.current = !isInFirstFolder;
  useEffect(() => (isNotInFirstFolderRef.current ? captureEscKeyListener(() => {
    if (isNotInFirstFolderRef.current) {
      setActiveChatFolder({ activeChatFolder: FIRST_FOLDER_INDEX });
    }
  }) : undefined), [activeChatFolder, setActiveChatFolder]);

  useHistoryBack({
    isActive: !isInFirstFolder,
    onBack: () => setActiveChatFolder({ activeChatFolder: FIRST_FOLDER_INDEX }, { forceOnHeavyAnimation: true }),
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.code.startsWith('Digit') && folderTabs) {
        const [, digit] = e.code.match(/Digit(\d)/) || [];
        if (!digit) return;

        if (digit === SAVED_MESSAGES_HOTKEY) {
          openChat({ id: currentUserId, shouldReplaceHistory: true });
          return;
        }

        const folder = Number(digit) - 1;
        if (folder > folderTabs.length - 1) return;

        setActiveChatFolder({ activeChatFolder: folder }, { forceOnHeavyAnimation: true });
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [currentUserId, folderTabs, openChat, setActiveChatFolder]);

  const {
    ref: placeholderRef,
    shouldRender: shouldRenderPlaceholder,
  } = useShowTransition({
    isOpen: !orderedFolderIds && !isFoldersSidebarShown,
    noMountTransition: true,
    withShouldRender: true,
  });

  function renderCurrentTab(isActive: boolean) {
    const activeFolder = Object.values(chatFoldersById)
      .find(({ id }) => id === folderTabs![activeChatFolder].id);
    const isFolder = activeFolder && !isInAllChatsFolder;

    return (
      <ChatList
        folderType={isFolder ? 'folder' : 'all'}
        folderId={isFolder ? activeFolder.id : undefined}
        isActive={isActive}
        isForumPanelOpen={isForumPanelOpen}
        foldersDispatch={foldersDispatch}
        isMainList
        canDisplayArchive={(hasArchivedChats || hasArchivedStories) && !archiveSettings.isHidden}
        archiveSettings={archiveSettings}
        isFoldersSidebarShown={isFoldersSidebarShown}
        isStoryRibbonShown={isStoryRibbonShown}
        onScroll={handleScroll}
      />
    );
  }

  const hasFolders = folderTabs && folderTabs.length > 1;
  const shouldRenderFolders = hasFolders && !isFoldersSidebarShown;

  return (
    <div
      ref={ref}
      className={buildClassName(
        'ChatFolders',
        shouldRenderStoryRibbon && 'with-story-ribbon',
        isFoldersSidebarShown && 'ChatFolders--tabs-sidebar-shown',
      )}
    >
      {shouldRenderStoryRibbon && <StoryRibbon isClosing={isStoryRibbonClosing} />}
      <div className={buildClassName(
        'ChatFolders-content',
        shouldRenderFolders && 'with-tabs',
        !shouldRenderFolders && !isAtBeginning && 'scrolled',
      )}
      >
        {shouldRenderFolders ? (
          <ChatFolderTabList
            tabs={folderTabs}
            activeTab={activeChatFolder}
            onSwitchTab={handleSwitchTab}
          />
        ) : shouldRenderPlaceholder ? (
          <div ref={placeholderRef} className="tabs-placeholder" />
        ) : undefined}
        {folderTabs?.length ? (
          <Transition
            ref={transitionRef}
            name={resolveTransitionName('slideOptimized', animationLevel, shouldSkipHistoryAnimations, lang.isRtl)}
            activeKey={activeChatFolder}
            renderCount={hasFolders ? folderTabs.length : undefined}
          >
            {renderCurrentTab}
          </Transition>
        ) : orderedFolderIds ? (
          <div className={emptyFolderStyles.root}>
            <h3 className={emptyFolderStyles.title}>Main folder not found</h3>
          </div>
        ) : undefined}
      </div>
    </div>
  );
};

export default memo(withGlobal<OwnProps>(
  (global): Complete<StateProps> => {
    const {
      chatFolders: {
        byId: chatFoldersById,
        invites: folderInvitesById,
      },
      chats: {
        listIds: {
          archived,
        },
      },
      stories: {
        orderedPeerIds: {
          archived: archivedStories,
        },
      },
      currentUserId,
      archiveSettings,
    } = global;
    const mainFolder = selectMainChatFolder(global);
    const { animationLevel } = selectSharedSettings(global);
    const { shouldSkipHistoryAnimations, activeChatFolder } = selectTabState(global);
    const { storyViewer: { isRibbonShown: isStoryRibbonShown } } = selectTabState(global);

    return {
      chatFoldersById,
      folderInvitesById,
      orderedFolderIds: mainFolder ? [mainFolder.id] : [],
      mainFolderId: mainFolder?.id,
      currentChatId: selectCurrentMessageList(global)?.chatId,
      activeChatFolder,
      currentUserId,
      animationLevel,
      shouldSkipHistoryAnimations,
      hasArchivedChats: Boolean(archived?.length),
      hasArchivedStories: Boolean(archivedStories?.length),
      maxFolders: selectCurrentLimit(global, 'dialogFilters'),
      maxFolderInvites: selectCurrentLimit(global, 'chatlistInvites'),
      maxChatLists: selectCurrentLimit(global, 'chatlistJoined'),
      archiveSettings,
      isStoryRibbonShown,
    };
  },
)(ChatFolders));
