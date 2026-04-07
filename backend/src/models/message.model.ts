import { RowDataPacket } from "mysql2";
import { db } from "../config/db";
import { Message, MessageRow, ParticipantsRow } from "../types/chat";
import { v4 as uuid } from "uuid";
import { PoolConnection } from "mysql2/promise";
import { getUserById } from "./auth.model";

export const findDirectChatBetweenUsers = async (
  conn: PoolConnection,
  {
    receiverId,
    senderId,
  }: {
    receiverId: string;
    senderId: string;
  },
) => {
  const query = `
SELECT chat_id FROM participants
WHERE user_id IN (?, ?)
GROUP BY chat_id
HAVING COUNT(DISTINCT user_id) = 2
LIMIT 1;
`;
  const values = [receiverId, senderId];
  const [rows] = await conn.execute<
    (Pick<ParticipantsRow, "chat_id"> & RowDataPacket)[]
  >(query, values);
  if (rows.length === 0) return null;

  return rows[0].chat_id;
};

export const createChat = async (conn: PoolConnection) => {
  const chatId = uuid();
  const query = "INSERT INTO chats(id, created_at) VALUES(?, NOW())";
  const values = [chatId];
  await conn.execute(query, values);
  return chatId;
};

export const addParticipants = async (
  conn: PoolConnection,
  {
    chatId,
    participantIds,
  }: {
    chatId: string;
    participantIds: string[];
  },
) => {
  const promises = participantIds.map((participantId) => {
    const id = uuid();
    const query =
      "INSERT INTO participants(id, chat_id, user_id) values(?, ?, ?)";
    const values = [id, chatId, participantId];
    return conn.execute(query, values);
  });
  return await Promise.all(promises);
};

export const getOrCreateDirectChat = async ({
  receiverId,
  senderId,
}: {
  senderId: string;
  receiverId: string;
}) => {
  const connection = await db.getConnection();
  try {
    connection.beginTransaction();
    const existingConversationId = await findDirectChatBetweenUsers(
      connection,
      {
        receiverId,
        senderId,
      },
    );
    if (existingConversationId) {
      await connection.commit();
      return existingConversationId;
    }
    const newChatId = await createChat(connection);
    await addParticipants(connection, {
      chatId: newChatId,
      participantIds: [senderId, receiverId],
    });
    await connection.commit();
    return newChatId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const createMessage = async ({
  chatId,
  content,
  senderId,
}: Pick<Message, "senderId" | "content" | "chatId">) => {
  const id = uuid();
  const query = `
INSERT INTO
messages(id, content, sender_id, chat_id, created_at)
VALUES(?, ?, ?, ?, NOW())
`;
  const values = [id, content, senderId, chatId];
  await db.execute(query, values);
  return id;
};
export const getUserChatIds = async (userId: string) => {
  const query = `
    SELECT chat_id FROM participants
    WHERE user_id = ?
  `;
  const [rows] = await db.execute<
    (Pick<ParticipantsRow, "chat_id"> & RowDataPacket)[]
  >(query, [userId]);

  return rows.map((row) => row.chat_id);
};

export const getOtherParticipant = async ({
  chatId,
  userId,
}: {
  userId: string;
  chatId: string;
}) => {
  const query = `
    SELECT user_id FROM participants
    WHERE chat_id = ? AND user_id != ?
    LIMIT 1
  `;
  const [rows] = await db.execute<
    (Pick<ParticipantsRow, "user_id"> & RowDataPacket)[]
  >(query, [chatId, userId]);

  if (rows.length === 0) return null;
  const otherParticipant = await getUserById(rows[0].user_id);
  return {
    userId: otherParticipant?.id,
    username: otherParticipant?.username,
  };
};

export const getLastMessage = async (chatId: string) => {
  const query = `
SELECT content, created_at FROM messages
WHERE chat_id = ?
ORDER BY created_at DESC
LIMIT 1
`;
  const values = [chatId];
  const [rows] = await db.execute<
    (Pick<MessageRow, "content" | "created_at"> & RowDataPacket)[]
  >(query, values);

  if (rows.length === 0) return null;
  const message = rows[0];
  return {
    content: message.content,
    createdAt: message.created_at,
  };
};
export const getChatMessages = async (chatId: string) => {
  const query = `
    SELECT * FROM messages
    WHERE chat_id = ?
    ORDER BY created_at ASC
    LIMIT 50
  `;
  const [rows] = await db.execute<(MessageRow & RowDataPacket)[]>(query, [
    chatId,
  ]);
  return rows;
};
export const isUserParticipant = async ({
  chatId,
  userId,
}: {
  userId: string;
  chatId: string;
}) => {
  const query = `
SELECT * FROM PARTICIPANTS
WHERE USER_ID = ?
AND CHAT_ID = ?
LIMIT 1
`;

  const values = [userId, chatId];
  const [rows] = await db.execute<(ParticipantsRow & RowDataPacket)[]>(
    query,
    values,
  );
  return rows.length > 0;
};
