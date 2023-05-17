import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//data
import { availableModels, parameters, instanceChat } from "./data";

//interfaces
import { Chat, ChatState, Model, Parameters, Message } from "./interfaces";

import { v4 as uuid } from "uuid";

const initialState: ChatState = {
  availableModels,
  currentModel: availableModels[0],
  chats: [],
  currentChat: null,
  sendingMessage: false,
  parameters,
  showParameters: true,
  withChatContext: true,
  isError: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrentModel: (state, action: PayloadAction<Model>) => {
      state.isError = false;
      state.currentModel = action.payload;
      if (state.currentChat) {
        state.currentChat = null;
      }
    },
    setShowParameters: (state, action: PayloadAction<boolean>) => {
      state.showParameters = action.payload;
    },
    setChangeParameters: (
      state,
      action: PayloadAction<{
        parameter: keyof Parameters;
        value: Parameters[keyof Parameters];
      }>
    ) => {
      const { parameter, value } = action.payload;
      const newParameters: Parameters = {
        ...state.parameters,
        [parameter]: value,
      };
      state.parameters = newParameters;
    },
    setWithChatContext: (state, action: PayloadAction<boolean>) => {
      state.withChatContext = action.payload;
    },
    setCurrentChat: (state, action: PayloadAction<Chat>) => {
      state.isError = false;
      state.currentChat = action.payload;
      state.currentModel = state.currentChat.model;
    },
    setAddNewChat: (state) => {
      state.isError = false;
      state.currentChat = null;
    },
    setSendingMessage: (state, action: PayloadAction<boolean>) => {
      state.sendingMessage = action.payload;
    },
    setIsError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
    setAddMessageInCurrentChat: (state, action: PayloadAction<Message>) => {
      const { payload } = action;

      const updatedChat: Chat = {
        ...instanceChat,
        id: uuid(),
        model: state.currentModel,
        messages: state.currentChat
          ? [...state.currentChat.messages, payload]
          : [payload],
      };

      const chatIndex = state.chats.findIndex(
        (chat) => chat.id === state.currentChat?.id
      );
      if (chatIndex !== -1) {
        state.chats.splice(chatIndex, 1);
      }

      state.chats.unshift(updatedChat);
      state.currentChat = updatedChat;
    },
    setDeleteLastMessageInCurrentChat: (state) => {
      if (state.currentChat) {
        const updatedMessages = state.currentChat.messages.slice(0, -1);
        state.currentChat = { ...state.currentChat, messages: updatedMessages };
      }
    },
    setDeleteCurrentChat: (state) => {
      if (state.currentChat) {
        const chatIndex = state.chats.findIndex(
          (chat) => chat.id === state.currentChat!.id
        );
        if (chatIndex !== -1) {
          state.chats.splice(chatIndex, 1);
        }
        state.currentChat = null;
      }
    },
  },
});

export const {
  setAddMessageInCurrentChat,
  setAddNewChat,
  setChangeParameters,
  setWithChatContext,
  setCurrentChat,
  setCurrentModel,
  setSendingMessage,
  setIsError,
  setShowParameters,
  setDeleteLastMessageInCurrentChat,
  setDeleteCurrentChat,
} = chatSlice.actions;
export default chatSlice.reducer;
