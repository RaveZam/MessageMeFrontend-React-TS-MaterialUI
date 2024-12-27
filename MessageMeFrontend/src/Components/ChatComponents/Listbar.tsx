import { IoPersonCircleSharp } from "react-icons/io5";

export default function Listbar() {
  return (
    <div className="h-screen max-h-screen w-2/6 border-r-[1px] border-[#848884] border-opacity-20 p-4">
      <h1>Chats</h1>
      <input
        type="text"
        className="my-4 w-full rounded-md bg-gray-800 p-4"
        placeholder="Search User..."
      />
      <div>
        <div className="flex p-4 hover:cursor-pointer hover:rounded-md hover:bg-gray-800 hover:duration-200">
          <IoPersonCircleSharp className="text-[4rem]" />
          <div className="px-4">
            <h1 className="py-1">Example User</h1>
            <span>Hello</span>
          </div>
        </div>
      </div>
    </div>
  );
}
