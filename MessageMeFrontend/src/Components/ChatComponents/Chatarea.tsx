import { IoPersonCircleSharp } from "react-icons/io5";

export default function Chatarea() {
  return (
    <div className="flex flex-grow">
      <div className="flex h-[6rem] w-full flex-grow border-b-2 p-4">
        <IoPersonCircleSharp className="text-[4rem]" />
        <div className="px-2 py-2">
          <h1>Example User</h1>
          <span className="text-green-400">Online</span>
        </div>
      </div>
    </div>
  );
}
