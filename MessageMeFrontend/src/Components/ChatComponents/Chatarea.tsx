import { IoPersonCircleSharp } from "react-icons/io5";
import { ChatRoom } from "../../types/chat";

const Chatarea: React.FC<{
  selectedChatroom: string;
  chatRooms: ChatRoom[];
}> = ({ selectedChatroom, chatRooms }) => {
  const chatRoom = chatRooms.find((room) => room._id === selectedChatroom);

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
                <div className="flex gap-x-1">
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
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Chatarea;
