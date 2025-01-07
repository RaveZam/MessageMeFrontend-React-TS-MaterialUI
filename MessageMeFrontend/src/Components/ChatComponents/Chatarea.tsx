import { IoPersonCircleSharp } from "react-icons/io5";
import { ChatRoom } from "../../types/chat";
import { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Discount } from "@mui/icons-material";

type tokenInterface = {
  email: string;
  username: string;
  id: string;
};

const Chatarea: React.FC<{
  selectedChatroom: string;
  chatRooms: ChatRoom[];
  socket: Socket;
  setChatRooms: React.Dispatch<React.SetStateAction<ChatRoom[]>>;
}> = ({ selectedChatroom, chatRooms, socket, setChatRooms }) => {
  const chatRoom: ChatRoom | undefined = chatRooms.find(
    (room) => room._id === selectedChatroom,
  );

  const storedToken = localStorage.getItem("token");
  const [myToken, setMyToken] = useState<tokenInterface>();

  useEffect(() => {
    if (storedToken) {
      const decoded = jwtDecode<{
        email: string;
        username: string;
        id: string;
      }>(storedToken);
      setMyToken(decoded);
    }
  }, [storedToken]);

  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    if (selectedChatroom) {
      let roomId = chatRoom?._id;
      socket.emit("joinRoom", roomId);

      socket.on("joinedRoom", (message) => {
        console.log(message);
      });
    }
  }, [selectedChatroom]);

  useEffect(() => {
    socket.emit("disconnectFromRoom", { roomId: chatRoom?._id });
  }, [selectedChatroom]);

  //need to optimize the rooms, sometimes the the messages are sent to the previous selected room
  //ss

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setChatRooms((prevChatRooms) =>
        prevChatRooms.map((room) =>
          room._id === chatRoom?._id
            ? {
                ...room,
                messages: [...room.messages, message.message],
              }
            : room,
        ),
      );
    });
  }, [chatRoom?._id, socket, setChatRooms]);

  const sendMessage = () => {
    if (newMessage.trim() && chatRoom && myToken) {
      const message = {
        message: newMessage,
        sentBy: myToken.username,
      };

      socket.emit("sendMessage", { roomId: chatRoom._id, message });

      setChatRooms((prevChatRooms) =>
        prevChatRooms.map((room) =>
          room._id === chatRoom._id
            ? {
                ...room,
                messages: [...room.messages, message],
              }
            : room,
        ),
      );
    }
  };

  const handleKeyStroke = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
      setNewMessage("");
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
          <div className="overflow-y-scroll">
            {chatRoom.messages.map((message, index) => (
              <div
                className={`m-8 ${
                  message.sentBy === myToken?.username
                    ? "flex flex-row-reverse"
                    : ""
                }`}
                key={index}
              >
                <div
                  className={`flex ${
                    message.sentBy === myToken?.username
                      ? "flex flex-row-reverse"
                      : ""
                  }`}
                >
                  <IoPersonCircleSharp className="mx-1 flex-shrink-0 text-[3rem]" />
                  <div className="my-1">
                    <div
                      className={`flex gap-x-1 ${
                        message.sentBy === myToken?.username
                          ? "flex flex-row-reverse"
                          : ""
                      }`}
                    >
                      <h1>{message.sentBy}</h1>
                      {/* <span className="opacity-80">12:00pm</span> */}
                    </div>
                    <div className="my-4 rounded-lg bg-gray-700 p-4">
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="mt-auto flex">
            <input
              type="text"
              className="m-4 w-full rounded-md bg-gray-800 p-4"
              placeholder="Write Something..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => handleKeyStroke(e)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Chatarea;
