export type ChatRoom = {
  otherParticipantName: string;
  chatname: string;
  participants: string;
  _id: string;
  messages: Array<{ message: string; sentBy: string; createdAt: string }>;
};
