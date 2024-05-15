import { useState } from 'react';
import { Camera, Image, Info, Mic, Phone, Smile, Video } from 'react-feather';
import EmojiPicker from 'emoji-picker-react';

function MainChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleEmojiClick = (event) => {
    setMessage((prevMessage) => prevMessage + event.emoji);
    setIsOpen(false);
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

      <section className="flex flex-grow">Center</section>

      <section className="flex items-center gap-2 px-2 py-4 mb-6 border-t border-gray-700">
        <div className="flex items-center gap-1 sm:gap-2">
          <Image size={32} className="text-white hover:cursor-pointer" />
          <Camera size={32} className="text-white hover:cursor-pointer" />
          <Mic size={32} className="text-white hover:cursor-pointer" />
        </div>
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full h-10 px-4 py-2 rounded-md bg-gray-700 text-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-transparent"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
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
        >
          Send
        </button>
      </section>
    </div>
  );
}

export default MainChat;
