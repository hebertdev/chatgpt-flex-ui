import { Configuration, OpenAIApi } from "openai";
import { getToken } from "@/helpers/auth";

//interfaces
import { Model, Parameters, Message } from "@/store/slices/interfaces";

export async function verifyToken(token: string) {
  const configuration = new Configuration({
    apiKey: token,
  });
  const openai = new OpenAIApi(configuration);
  await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "cuanto es 1 + 1?",
  });
}

const configuration = new Configuration({
  apiKey: getToken()!,
});
const openai = new OpenAIApi(configuration);

interface CreateCompletionProps {
  model: Model;
  message: string;
  parameters: Parameters;
}

export async function completionOpenAI({
  model,
  message,
  parameters,
}: CreateCompletionProps) {
  const data = await openai.createCompletion({
    model: model.name,
    prompt: message,
    ...parameters,
    max_tokens: 4000,
  });

  return data;
}

interface GenerateTitleForChatProps {
  messages: string;
}
export async function generateTitleForChat({
  messages,
}: GenerateTitleForChatProps) {
  const message = `Genera un título breve y preciso para esta conversación ${messages}`;
  const data = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: message,
    temperature: 0,
    max_tokens: 256,
  });

  return data;
}

interface CreateChatCompletionProps {
  model: Model;
  messages: Message[];
  parameters: Parameters;
}

export async function chatCompletionOpenAI({
  model,
  messages,
  parameters,
}: CreateChatCompletionProps) {
  const data = await openai.createChatCompletion({
    model: model.name,
    messages: messages,
    ...parameters,
    max_tokens: 2048,
  });

  return data;
}
