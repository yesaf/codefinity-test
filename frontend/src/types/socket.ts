export enum SocketServerEvents {
  UsersUpdated = "users-updated",
  ChatCreated = "chat-created",
  Message = "message",
  TypingStatus = "typing-status",
  SeenUpdate = "seen-update",
}

export enum SocketClientEvents {
  Message = "message",
  JoinChat = "join-chat",
  TypingStatus = "typing-status",
  SeenUpdate = "seen-update",
}
