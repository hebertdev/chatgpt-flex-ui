import { ChangeEvent, useState } from "react";

//interfaces
import { Message } from "@/interfaces/chatState";

//services
import { completionOpenAI, chatCompletionOpenAI } from "@/services/openai";

//hooks
import { useChatState } from "@/hooks/useChatState";
import { useAlertContext } from "@/hooks/useAlertContext";

export function useChatForm() {
  const [chatState, chatActions] = useChatState();
  const {
    sendingMessage,
    currentModel,
    currentChat,
    parameters,
    withChatContext,
    isError,
  } = chatState;

  const {
    toggleSendingMessage,
    addMessageInCurrentChat,
    toggleIsError,
    deleteLastMessageInCurrentChat,
    deleteCurrentChat,
  } = chatActions;

  const [message, setMessage] = useState("");

  const handleChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const { showAlert } = useAlertContext();

  const generate_message = (
    role: Message["role"],
    content: Message["content"]
  ): Message => {
    return {
      role,
      content,
    };
  };

  const handleError = (error: any) => {
    setMessage("");
    toggleSendingMessage(false);
    if (error.response && error.response.status === 401) {
      // Error de autenticación (401 Unauthorized)
      showAlert("API key incorrecta", "error");
      toggleIsError(true);
      window.location.reload();
    } else if (error.response && error.response.status === 404) {
      showAlert("No tienes acceso a este modelo", "error");
      deleteCurrentChat();
    } else if (error.response && error.response.status >= 500) {
      // Error de servidor (códigos de estado 5xx)
      toggleIsError(true);
      showAlert("Error en el servidor", "error");
    } else {
      // Otros errores
      toggleIsError(true);
      showAlert("Error en la solicitud", "error");
    }
  };

  const handleSubmitMessage = async (
    e:
      | React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (!isError) {
      if (message.length === 0) return;
    }
    if (sendingMessage) return;
    if (currentModel.type === "completion") {
      await handleGenerationTextCompletion();
    } else if (currentModel.type === "chat") {
      await handleGenerationChatCompletion();
    } else {
      return;
    }
  };

  const handleGenerationTextCompletion = async () => {
    try {
      toggleSendingMessage(true);

      let userMessage;
      if (!isError) {
        userMessage = generate_message("user", message);
        addMessageInCurrentChat(userMessage);
      } else {
        const lastMessageInCurrentChat =
          currentChat!.messages[currentChat!.messages.length - 1];
        userMessage = generate_message(
          "user",
          lastMessageInCurrentChat.content
        );
      }

      toggleIsError(false);
      setMessage("");

      const { data } = await completionOpenAI({
        model: currentModel,
        message: userMessage.content,
        parameters,
      });

      addMessageInCurrentChat(
        generate_message("assistant", data?.choices[0]?.text!.trim())
      );
      toggleSendingMessage(false);
      toggleIsError(false);
    } catch (error) {
      handleError(error);
    }
  };

  const handleGenerationChatCompletion = async () => {
    try {
      toggleSendingMessage(true);
      let userMessage;
      if (!isError) {
        userMessage = generate_message("user", message);
        addMessageInCurrentChat(userMessage);
      } else {
        userMessage = generate_message("user", message);
        const lastMessageInCurrentChat =
          currentChat!.messages[currentChat!.messages.length - 1];
        userMessage = generate_message(
          "user",
          lastMessageInCurrentChat.content
        );
      }

      let messages_in_current_chat = currentChat
        ? [...currentChat.messages, userMessage]
        : [userMessage];

      let all_messages: Message[] = [
        {
          role: "system",
          content:
            "You are ChatGPT, a large language model trained by OpenAI & Hebertdev.",
        },
      ];

      all_messages = withChatContext
        ? [...all_messages, ...messages_in_current_chat]
        : [...all_messages, userMessage];
      toggleIsError(false);
      setMessage("");
      const { data } = await chatCompletionOpenAI({
        model: currentModel,
        messages: all_messages,
        parameters,
      });

      addMessageInCurrentChat(
        generate_message(
          "assistant",
          data?.choices[0]?.message!.content!.trim()
        )
      );
      toggleSendingMessage(false);
    } catch (error: any) {
      handleError(error);
    }
  };

  const handleResetMessage = () => {
    deleteLastMessageInCurrentChat();
  };

  return {
    message,
    handleChangeMessage,
    handleSubmitMessage,
    handleResetMessage,
    sendingMessage,
    isError,
  };
}
