import { IoPersonCircleSharp } from "react-icons/io5";
import { ChatRoom } from "../../types/chat";
import { useState } from "react";
import axios from "axios";
import { Users } from "../../types/user";

const Listbar: React.FC<{
  chatRooms: ChatRoom[];
  selectedUser: string;
  setSelectedUser: React.Dispatch<React.SetStateAction<string>>;
}> = ({ chatRooms, selectedUser, setSelectedUser }) => {
  const [searchUser, setSearchUser] = useState<string>("");
  const [users, setUsers] = useState<Users[]>([]);

  const getUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/users/getUsers",
      );
      setUsers(response.data.users);
    } catch (error) {
      console.log("Error Fetching Users", error);
    }
  };

  if (searchUser && users.length === 0) {
    getUsers();
  }

  const filteredUsers = users.filter((user) =>
    user.username.toLocaleLowerCase().includes(searchUser.toLocaleLowerCase()),
  );

  return (
    <div className="h-screen max-h-screen w-3/6 border-r-[1px] border-[#848884] border-opacity-20 p-4">
      <h1>Chats</h1>
      <input
        type="text"
        className="my-4 w-full rounded-md bg-gray-800 p-4"
        placeholder="Search User..."
        value={searchUser}
        onChange={(e) => setSearchUser(e.target.value)}
      />
      <div>
        {searchUser.length == 0 ? (
          chatRooms.map((chatroom) => (
            <div
              onClick={() => setSelectedUser(chatroom.otherParticipantName)}
              key={chatroom.chatname}
              className={`flex p-4 hover:cursor-pointer hover:rounded-md hover:bg-gray-800 hover:duration-200 ${
                selectedUser === chatroom.otherParticipantName
                  ? "rounded-md bg-gray-800"
                  : ""
              }`}
            >
              <IoPersonCircleSharp className="text-[4rem]" />
              <div className="px-4">
                <h1 className="py-1">{chatroom.otherParticipantName}</h1>
                <span>Hello</span>
              </div>
            </div>
          ))
        ) : filteredUsers.length === 0 ? (
          <div className="p-4">
            <h1>No Users Found </h1>
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              className="flex p-4 hover:cursor-pointer hover:rounded-md hover:bg-gray-800 hover:duration-200"
            >
              <IoPersonCircleSharp className="text-[4rem]" />
              <div className="px-4">
                <h1 className="py-1">{user.username}</h1>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Listbar;

//Dont Forget to Update the user query since it also fetches the password when a User is Searched
