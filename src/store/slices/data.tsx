import { Model, Parameters, Chat } from "./interfaces";

export const availableModels: Model[] = [
  {
    name: "davinci-002",
    type: "completion",
    description: `Este modelo es capaz de realizar una variedad de tareas de lenguaje natural,
       como la generación de texto coherente y relevante, 
       la traducción automática, el resumen de texto, 
       la respuesta a preguntas, la escritura creativa, 
       la redacción de correos electrónicos y mucho más.`,
    helper: "Genera texto, pero no entiende el contexto de la conversación.",
    is_free: false,
  },
  {
    name: "gpt-3.5-turbo",
    type: "chat",
    description:
      "El modelo GPT-3.5-turbo de OpenAI es un modelo de lenguaje de inteligencia artificial altamente avanzado y versátil. Puede realizar tareas como redacción de textos, generación de ideas, resumen de información, traducción de idiomas, respuesta a preguntas, tutoría en varias materias, programación y mucho más. Es útil para una amplia gama de aplicaciones y se adapta a diferentes contextos según las necesidades del usuario.",
    helper: "Genera texto, y entiende el contexto de la conversación.",
    is_free: false,
  },
  {
    name: "gpt-4",
    type: "chat",
    description:
      "Más capaz que cualquier modelo GPT-3.5, capaz de realizar tareas más complejas y optimizado para el chat",
    helper: "Genera texto, y entiende el contexto de la conversación.",
    is_free: false,
  },
  {
    name: "gpt-4o-mini",
    type: "chat",
    description:
      "Más capaz que cualquier modelo GPT-3.5, capaz de realizar tareas más complejas y optimizado para el chat",
    helper: "Genera texto, y entiende el contexto de la conversación.",
    is_free: false,
  },
  {
    name: "gpt-4o",
    type: "chat",
    description:
      "Más capaz que cualquier modelo GPT-3.5, capaz de realizar tareas más complejas y optimizado para el chat",
    helper: "Genera texto, y entiende el contexto de la conversación.",
    is_free: false,
  },
];

export const parameters: Parameters = {
  temperature: 1,
  top_p: 1,
  stream: false,
};

export const instanceChat: Chat = {
  id: null,
  model: availableModels[0],
  messages: [],
};
