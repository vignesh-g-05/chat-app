CREATE TABLE chats (
  id CHAR(36) PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE participants (
  id CHAR(36) PRIMARY KEY,
  chat_id CHAR(36) NOT NULL,
  user_id CHAR(36) NOT NULL,
  UNIQUE(chat_id, user_id)
);

CREATE TABLE messages (
  id CHAR(36) PRIMARY KEY,
  chat_id CHAR(36) NOT NULL,
  sender_id CHAR(36) NOT NULL,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_messages_chat_id ON messages(chat_id);
CREATE INDEX idx_participants_user_id ON participants(user_id);