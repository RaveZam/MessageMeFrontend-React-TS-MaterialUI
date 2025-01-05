export type ChatRoom = {
  otherParticipantName: string;
  // SessionUser: string;
  chatname: string;
  participants: string;
  _id: string;
  messages: Array<{ message: string; sentBy: string }>;
};
