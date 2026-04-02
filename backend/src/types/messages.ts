export type Message = {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;

  isDeleted: boolean;
  deletedAt: string;

  createdAt: string;
};

export type SendMessageInput = {
  conversationId?: string;
  content: string;
};
