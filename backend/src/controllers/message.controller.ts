import type { Request, Response } from "express";
import {
  createMessage,
  getChatMessages,
  getLastMessage,
  getOrCreateDirectChat,
  getOtherParticipant,
  getUserChatIds,
} from "../models/message.model";
import { getUserById } from "../models/auth.model";

export const sendMessage = async (
  req: Request<{}, {}, { content: string; receiverId: string }>,
  res: Response,
) => {
  try {
    const { content, receiverId } = req.body || {};
    if (!content?.trim() || !receiverId) {
      return res.status(400).json({
        success: false,
        message: "missing required fields",
        data: null,
      });
    }
    const existingReceiver = await getUserById(receiverId);
    if (!existingReceiver) {
      return res.status(400).json({
        success: false,
        message: "receiver not found",
        data: null,
      });
    }
    const senderId = req.user!.id;
    if (receiverId === senderId) {
      return res.status(400).json({
        success: false,
        message: "cannot message yourself",
        data: null,
      });
    }
    const chatId = await getOrCreateDirectChat({
      receiverId,
      senderId,
    });
    const messageId = await createMessage({ chatId, content, senderId });
    return res.json({
      success: true,
      message: "message sent successfully",
      data: messageId,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "unexpected error occured",
      data: null,
    });
  }
};

export const getChats = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const chatIds = await getUserChatIds(userId);
    const promises = chatIds.map(async (id) => {
      const otherUser = await getOtherParticipant({ chatId: id, userId });
      const lastMessage = await getLastMessage(id);
      return {
        chatId: id,
        userId: otherUser?.userId,
        username: otherUser?.username,
        lastMessage: lastMessage?.content || null,
        lastMessageAt: lastMessage?.createdAt || null,
      };
    });
    const chats = await Promise.all(promises);
    return res.json({
      success: true,
      message: "chats fetched successfully",
      data: chats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "unexpected error occured",
      data: null,
    });
  }
};

export const getMessages = async (
  req: Request<{ chatId: string }>,
  res: Response,
) => {
  try {
    const { chatId } = req.params;
    const messages = await getChatMessages(chatId);
    return res.json({
      success: true,
      message: "messages fetched successfully",
      data: messages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "unexpected error occured",
      data: null,
    });
  }
};
