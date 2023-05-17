export type TypeChat = "chat" | "completion";

export interface Model {
  name: string;
  type: TypeChat;
  description: string;
  helper: string;
  is_free: boolean;
}

export interface Parameters {
  temperature: number;
  top_p: number;
  stream: boolean;
}

export type Role = "assistant" | "system" | "user";

export interface Message {
  role: Role;
  content: string;
}

export interface Chat {
  id: string | null;
  model: Model;
  messages: Message[]; // Cambiar 'chat' a 'messages'
}

export interface ChatState {
  availableModels: Model[];
  currentModel: Model;
  parameters: Parameters;
  showParameters: boolean;
  chats: Chat[];
  currentChat: Chat | null;
  withChatContext: boolean;
  sendingMessage: boolean;
}
