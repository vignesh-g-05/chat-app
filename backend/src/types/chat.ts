export type Chat = {
  id: string;
  createdAt: string;
};

export type ChatRow = {
  id: string;
  created_at: string;
};

export type Participants = {
  id: string;
  chatId: string;
  userId: string;
};

export type ParticipantsRow = {
  id: string;
  chat_id: string;
  user_id: string;
};

export type Message = {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  createdAt: string;
};

export type MessageRow = {
  id: string;
  chat_id: string;
  sender_id: string;
  content: string;
  created_at: string;
};
