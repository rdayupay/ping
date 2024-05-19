import { useEffect, useRef, useState } from 'react';
import { Camera, Image, Info, Mic, Phone, Smile, Video } from 'react-feather';
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import EmojiPicker from 'emoji-picker-react';

import { db } from '../lib/firebase';
import { useMessageStore } from '../lib/messageStore';
import { useUserStore } from '../lib/userStore';
import upload from '../lib/upload';

function MainChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState();
  const [text, setText] = useState('');
  const [image, setImage] = useState({
    file: null,
    url: '',
  });

  const messageEndRef = useRef(null);

  const { currentUser } = useUserStore();
  const { messageId, user } = useMessageStore();

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({
      behavior: 'auto',
      block: 'end',
    });
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'messages', messageId), (res) => {
      setMessage(res.data());
    });

    return () => unsubscribe();
  }, [messageId]);

  const handleEmojiClick = (event) => {
    setText((prevText) => prevText + event.emoji);
    setIsOpen(false);
  };

  const handleImageUpload = (event) => {
    if (!event.target.files[0]) {
      return;
    }

    setImage({
      file: event.target.files[0],
      url: URL.createObjectURL(event.target.files[0]),
    });
  };

  const handleSendMessage = async () => {
    if (!text && !image.file) {
      return;
    }

    let imageUrl = null;

    try {
      if (image.file) {
        imageUrl = await upload(image.file);
      }

      const newMessage = {
        senderId: currentUser.id,
        ...(text && { text }),
        ...(imageUrl && { image: imageUrl }),
        createdAt: new Date(),
      };

      await updateDoc(doc(db, 'messages', messageId), {
        messages: arrayUnion(newMessage),
      });

      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async (id) => {
        const userMessagesRef = doc(db, 'userMessages', id);
        const userMessagesSnapshot = await getDoc(userMessagesRef);

        if (userMessagesSnapshot.exists()) {
          const userMessageData = userMessagesSnapshot.data();

          const messageIndex = userMessageData.messages.findIndex(
            (message) => message.messageId === messageId
          );

          userMessageData.messages[messageIndex].lastMessage =
            text || 'Sent an image';
          userMessageData.messages[messageIndex].isSeen =
            id === currentUser.id ? true : false;
          userMessageData.messages[messageIndex].updatedAt = Date.now();

          await updateDoc(userMessagesRef, {
            messages: userMessageData.messages,
          });
        }
      });
    } catch (error) {
      console.error(error);
    }

    setImage({
      file: null,
      url: '',
    });

    setText('');
  };

  return (
    <div className="flex flex-col h-screen">
      <section>
        <div className="flex px-4 py-2 border-b border-gray-700 items-center">
          <img
            src="/Selena.png"
            alt="Selena Gomez smiling"
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div className="flex flex-col flex-grow">
            <span className="text-sm text-white">Selena Gomez</span>
            <p className="text-xs text-gray-500">Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="flex lg:gap-8 md:gap-4 gap-2 items-center">
            <Phone className="hover:cursor-pointer" />
            <Video className="hover:cursor-pointer" />
            <Info className="hover:cursor-pointer" />
          </div>
        </div>
      </section>

      <section className="flex flex-col flex-grow px-4 py-4 overflow-y-auto">
        {/* Message from another person */}
        {/* <div className="flex">
          <img
            src="/Selena.png"
            alt="Selena Gomez smiling"
            className="w-6 h-6 rounded-full object-cover mr-4"
          />
          <div>
            <p className="text-sm text-white bg-gray-700 rounded-lg p-3 max-w-md">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste
              quam sapiente, temporibus aut aspernatur enim illum nulla deleniti
              quas adipisci voluptate impedit ratione qui blanditiis minima?
              Animi inventore voluptate nisi!
            </p>
            <span className="text-xs text-gray-500">1 min ago</span>
          </div>
        </div> */}

        {/* Message from myself */}
        {message?.messages?.map((message) => (
          <div
            className="flex flex-col items-end mb-4"
            key={message?.createdAt}
          >
            {message.image && (
              <img
                src={message.image}
                alt="Image sent"
                className="w-full max-w-xs rounded-lg object-cover mb-2"
              />
            )}
            {message.text && (
              <p className="text-sm text-white bg-blue-500 rounded-lg p-3 max-w-md">
                {message.text}
              </p>
            )}
            <span className="text-xs text-gray-500 mt-1">1 min ago</span>
          </div>
        ))}

        {image.url && (
          <figure>
            <img
              src={image.url}
              alt="Sent image"
              className="w-full max-w-xs rounded-lg object-cover mb-2"
            />
          </figure>
        )}

        <div ref={messageEndRef} />
      </section>

      <section className="flex items-center gap-2 px-2 py-4 border-t border-gray-700">
        <div className="flex items-center gap-1 sm:gap-2">
          <label htmlFor="file">
            <Image size={32} className="hover:cursor-pointer" />
          </label>
          <input
            type="file"
            id="file"
            className="hidden"
            onChange={handleImageUpload}
          />
          <Camera size={32} className="text-white hover:cursor-pointer" />
          <Mic size={32} className="text-white hover:cursor-pointer" />
        </div>
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full h-10 px-4 py-2 rounded-md bg-gray-700 text-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-transparent"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />

        <div className="relative">
          <Smile
            size={32}
            className="text-white hover:cursor-pointer"
            onClick={() => setIsOpen((prevState) => !prevState)}
          />
          {isOpen && (
            <div className="absolute bottom-10">
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                height={500}
                width={250}
              />
            </div>
          )}
        </div>

        <button
          type="button"
          className="h-8 px-4 rounded-md bg-violet-500 text-white text-xs focus:outline-none focus:ring-1 focus:ring-violet-400 focus:border-transparent"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </section>
    </div>
  );
}

export default MainChat;
