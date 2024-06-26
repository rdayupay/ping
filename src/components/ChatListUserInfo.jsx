import { Settings, Video, Edit } from 'react-feather';

import { useUserStore } from '../lib/userStore';

function ChatListUserInfo() {
  const { currentUser } = useUserStore();

  return (
    <div className="flex px-4 py-2 mb-2">
      <img
        src={currentUser?.avatar || './TSCat.jpg'}
        alt="User avatar"
        className="w-10 h-10 rounded-full object-cover mr-4"
      />
      <div>
        <span className="font-semibold text-white">
          {currentUser?.username}
        </span>
        <div className="flex gap-2 items-center">
          <Video size={16} className="cursor-pointer" />
          <Edit size={16} className="cursor-pointer" />
          <Settings size={16} className="cursor-pointer" />
        </div>
        <p className="text-sm text-gray-200">Do not disturb ⛔</p>
      </div>
    </div>
  );
}

export default ChatListUserInfo;
