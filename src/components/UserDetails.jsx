import { ChevronDown, ChevronUp, Download, Plus } from "react-feather";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

import { db } from "../lib/firebase";
import { useMessageStore } from "../lib/messageStore";
import { useUserStore } from "../lib/userStore";

function UserDetails() {
  const {
    messageId,
    user,
    isCurrentUserBlocked,
    isReceiverBlocked,
    setBlockedState,
  } = useMessageStore();

  const { currentUser } = useUserStore();

  const handleBlockUser = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });

      setBlockedState();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <article className="flex-col mx-auto mb-4 pl-4 py-4 border-b border-gray-700">
        <img
          src={user?.avatar || "./TSCat.jpg"}
          alt="User avatar"
          className="w-32 h-32 rounded-full object-cover mb-2 mx-auto"
        />
        <h2 className="text-center font-semibold mb-2">{user?.username}</h2>
        <p className="text-sm text-center">Life happens, coffee helps.</p>
      </article>

      <button
        type="button"
        className="mx-4 mb-6 text-sm text-red-700 font-semibold hover:text-red-500"
        onClick={handleBlockUser}
      >
        {isCurrentUserBlocked
          ? "You are blocked by this user"
          : isReceiverBlocked
          ? "Unblock User"
          : " Block User"}
      </button>

      <aside>
        <ul className="px-4">
          <li className="flex justify-between mb-4">
            <span>Chat Settings</span>
            <ChevronUp className="cursor-pointer" />
          </li>

          <li className="flex justify-between mb-4">
            <span>Privacy & Help</span>
            <ChevronUp className="cursor-pointer" />
          </li>

          <li className="flex-col mb-4">
            <div className="flex justify-between mb-2">
              <span>Shared Media</span>
              <ChevronDown className="cursor-pointer" />
            </div>

            <figure className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <img
                  src="/TSCat.jpg"
                  alt="cat"
                  className="h-8 w-8 rounded-md"
                />
                <span className="text-sm text-gray-400">meredith.jpg</span>
              </div>
              <Download className="cursor-pointer" />
            </figure>
          </li>

          <li className="flex justify-between mb-4">
            <span>Shared Files</span>
            <Plus className="cursor-pointer" />
          </li>
        </ul>
      </aside>
    </section>
  );
}

export default UserDetails;
