import { IoPersonCircleSharp } from "react-icons/io5";
import { ChatRoom } from "../../types/chat";
import { Socket } from "socket.io-client";
import { useEffect, useState } from "react";

const Chatarea: React.FC<{
  selectedChatroom: string;
  chatRooms: ChatRoom[];
  socket: Socket;
  setChatRooms: React.Dispatch<React.SetStateAction<ChatRoom[]>>;
}> = ({ selectedChatroom, chatRooms, socket, setChatRooms }) => {
  const chatRoom = chatRooms.find((room) => room._id === selectedChatroom);

  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<[]>([]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        message: newMessage,
        sentBy: chatRoom?.SessionUser,
      };

      socket.emit("sendMessage", { roomId: chatRoom?._id, message });
    }
  };

  // Need to start updating that message either on a seperate Array or edit the chatRoom itself

  // setChatRooms([{
  //   ...chatRoom, // Spread the existing chatRoom
  //   messages: [...chatRoom.messages, message] // Add the new message to the messages array
  // }]);
  const handleKeyStroke = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log("Enter Pressed");
    }
  };

  return (
    <>
      {!chatRoom ? (
        <div className="flex w-full items-center justify-center">
          <h1 className="text-2xl opacity-50">Select A ChatRoom</h1>
        </div>
      ) : (
        <div className="flex w-5/6 flex-col">
          {/* Chatroom Header */}
          <div className="flex h-[6rem] w-full border-b-2 p-4">
            <IoPersonCircleSharp className="text-[4rem]" />
            <div className="px-2 py-2">
              <h1>{chatRoom.otherParticipantName}</h1>
              <span className="text-green-400">Online</span>
            </div>
          </div>

          {/* Chat Area */}
          <div className="m-4">
            <div className="flex">
              <IoPersonCircleSharp className="mr-1 flex-shrink-0 text-[3rem]" />
              <div className="ml-1">
                <div className="flex w-[80%] gap-x-1">
                  <h1>{chatRoom.otherParticipantName}</h1>
                  <span className="opacity-80">12:00pm</span>
                </div>
                <div className="my-4 max-w-[50%] rounded-lg bg-gray-700 p-4">
                  <p>Lorem, ipsum dolor sit</p>
                </div>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="mt-auto flex">
            <input
              type="text"
              className="m-4 w-full rounded-md bg-gray-800 p-4"
              placeholder="Write Something..."
              onKeyDown={(e) => handleKeyStroke(e)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Chatarea;
