import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { IoPersonCircleSharp } from "react-icons/io5";

type ChatRoom = {
  otherParticipantName: string;
  chatname: string;
  participants: string;
};

export default function Listbar() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode<{
        email: string;
        id: string;
        username: string;
      }>(token);

      const fetchChatRooms = async () => {
        try {
          const response = await axios.post(
            "http://localhost:3000/api/chat/getChatRooms",
            {
              id: decoded.id,
            },
          );
          setChatRooms(response.data.chatRoomName);
        } catch (error) {
          console.log(error);
        }
      };
      fetchChatRooms();
    }
  }, [token]);

  return (
    <div className="h-screen max-h-screen w-3/6 border-r-[1px] border-[#848884] border-opacity-20 p-4">
      <h1>Chats</h1>
      <input
        type="text"
        className="my-4 w-full rounded-md bg-gray-800 p-4"
        placeholder="Search User..."
      />
      <div>
        {chatRooms.map((chatroom) => (
          <div
            key={chatroom.chatname}
            className="flex p-4 hover:cursor-pointer hover:rounded-md hover:bg-gray-800 hover:duration-200"
          >
            <IoPersonCircleSharp className="text-[4rem]" />
            <div className="px-4">
              <h1 className="py-1">{chatroom.otherParticipantName}</h1>
              <span>Hello</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
