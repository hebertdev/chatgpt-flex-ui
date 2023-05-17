import { useSelector, useDispatch } from "react-redux";
import {
  setAddMessageInCurrentChat,
  setAddNewChat,
  setChangeParameters,
  setWithChatContext,
  setCurrentChat,
  setCurrentModel,
  setSendingMessage,
  setShowParameters,
  setIsError,
  setDeleteLastMessageInCurrentChat,
  setDeleteCurrentChat,
} from "@/store/slices/chatSlice";
import {
  ChatState,
  Chat,
  Message,
  Parameters,
} from "@/store/slices/interfaces";

interface ChatActions {
  addMessageInCurrentChat: (message: Message) => void;
  addNewChat: () => void;
  changeParameters: (
    parameter: keyof Parameters,
    value: Parameters[keyof Parameters]
  ) => void;
  changeWitcChatContext: () => void;
  addCurrentChat: (chat: Chat) => void;
  addCurrentModel: (model: string) => void;
  toggleSendingMessage: (sendingMessage: boolean) => void;
  toggleShowParameters: (showParameters: boolean) => void;
  toggleIsError: (isError: boolean) => void;
  deleteLastMessageInCurrentChat: () => void;
  deleteCurrentChat: () => void;
}

export const useChatState = (): [ChatState, ChatActions] => {
  const dispatch = useDispatch();
  const chatState = useSelector(
    (state: { chatSlice: ChatState }) => state.chatSlice
  );

  const addNewChat = () => {
    dispatch(setAddNewChat());
  };

  const changeParameters = (
    parameter: keyof Parameters,
    value: Parameters[keyof Parameters]
  ) => {
    dispatch(setChangeParameters({ parameter, value }));
  };

  const addCurrentModel = (selectedModelName: string) => {
    const selectedModel = chatState.availableModels.find(
      (model) => model.name === selectedModelName
    );
    if (selectedModel) {
      dispatch(setCurrentModel(selectedModel));
    }
  };

  const changeWitcChatContext = () => {
    if (chatState.sendingMessage) return;
    dispatch(setWithChatContext(!chatState.withChatContext));
  };

  const addCurrentChat = (chat: Chat) => {
    dispatch(setCurrentChat(chat));
  };

  const toggleSendingMessage = (value: boolean) => {
    dispatch(setSendingMessage(value));
  };

  const toggleShowParameters = (value: boolean) => {
    dispatch(setShowParameters(value));
  };

  const addMessageInCurrentChat = (message: Message) => {
    dispatch(setAddMessageInCurrentChat(message));
  };

  const toggleIsError = (value: boolean) => {
    dispatch(setIsError(value));
  };

  const deleteLastMessageInCurrentChat = () => {
    dispatch(setIsError(false));
    dispatch(setDeleteLastMessageInCurrentChat());
  };

  const deleteCurrentChat = () => {
    dispatch(setDeleteCurrentChat());
  };

  const chatActions: ChatActions = {
    addNewChat,
    changeParameters,
    changeWitcChatContext,
    addCurrentChat,
    addCurrentModel,
    toggleSendingMessage,
    toggleShowParameters,
    addMessageInCurrentChat,
    toggleIsError,
    deleteLastMessageInCurrentChat,
    deleteCurrentChat,
  };

  return [chatState, chatActions];
};
