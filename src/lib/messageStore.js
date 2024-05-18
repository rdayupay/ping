import { create } from 'zustand';

import { useUserStore } from './userStore';

export const useMessageStore = create((set) => ({
  messageId: null,
  user: null,
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,

  selectMessage: (messageId, user) => {
    const currentUser = useUserStore.getState().currentUser;

    // Check if the current user is blocked by the receiver
    if (user.blocked.includes(currentUser.id)) {
      return set({
        messageId,
        user: null,
        isCurrentUserBlocked: true,
        isReceiverBlocked: false,
      });
    }

    // Check if the receiver is blocked by the current user
    if (currentUser.blocked.includes(user.id)) {
      return set({
        messageId,
        user,
        isCurrentUserBlocked: false,
        isReceiverBlocked: true,
      });
    }

    return set({
      messageId,
      user,
      isCurrentUserBlocked: false,
      isReceiverBlocked: false,
    });
  },

  setBlockedState: () => {
    set((state) => ({ ...state, isReceiverBlocked: !state.isReceiverBlocked }));
  },
}));
