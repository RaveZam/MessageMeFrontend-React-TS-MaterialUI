import { IoPersonCircleSharp } from "react-icons/io5";

const Chatarea: React.FC<{ selectedUser: String }> = ({ selectedUser }) => {
  return (
    <div className="flex w-5/6 flex-col">
      <div className="flex h-[6rem] w-full border-b-2 p-4">
        <IoPersonCircleSharp className="text-[4rem]" />
        <div className="px-2 py-2">
          <h1>{selectedUser}</h1>
          <span className="text-green-400">Online</span>
        </div>
      </div>
      {/* //chat Area */}
      <div className="m-4">
        <div className="flex">
          <IoPersonCircleSharp className="mr-1 flex-shrink-0 text-[3rem]" />
          <div className="ml-1">
            <div className="flex gap-x-1">
              <h1>{selectedUser}</h1>
              <span className="opacity-80">12:00pm</span>
            </div>
            <div className="my-4 max-w-[50%] rounded-lg bg-gray-700 p-4">
              <p>Lorem, ipsum dolor sit</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto flex">
        <input
          type="text"
          className="m-4 w-full rounded-md bg-gray-800 p-4"
          placeholder="Write Something..."
        />
      </div>
    </div>
  );
};

export default Chatarea;
