import { ChatRoom } from "../types/chat";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import Listbar from "../Components/ChatComponents/Listbar";
import Chatarea from "../Components/ChatComponents/Chatarea";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import SidebarFooterAccount from "../Components/Sidebar Components/SidebarFooterAccount";
import { useEffect, useState } from "react";

export default function Mainpage() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.log("Please Login");
      navigate("/");
    }

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

  const [selectedUser, setSelectedUser] = useState<string>("");

  return (
    <>
      {token ? (
        <DashboardLayout
          sidebarExpandedWidth={300}
          defaultSidebarCollapsed
          slots={{
            toolbarAccount: () => null,
            sidebarFooter: SidebarFooterAccount,
          }}
        >
          <div className="flex overflow-hidden">
            <Listbar
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              chatRooms={chatRooms}
            />
            <Chatarea />
          </div>
        </DashboardLayout>
      ) : (
        <div>
          <h1>Redirecting To Singin</h1>
        </div>
      )}
    </>
  );
}
