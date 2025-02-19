import { Model, Parameters, Chat } from "./interfaces";

export const availableModels: Model[] = [
  {
    name: "davinci-002",
    type: "completion",
    description:
      "Este modelo es capaz de realizar una variedad de tareas de lenguaje natural, como la generación de texto coherente y relevante, la traducción automática, el resumen de texto, la respuesta a preguntas, la escritura creativa, la redacción de correos electrónicos y mucho más.",
    helper: "Genera texto, pero no entiende el contexto de la conversación.",
    is_free: false,
  },
  {
    name: "gpt-3.5-turbo",
    type: "chat",
    description:
      "GPT-3.5-turbo es un modelo de lenguaje avanzado de OpenAI que puede realizar tareas como redacción de textos, generación de ideas, resumen de información, traducción de idiomas, respuesta a preguntas, tutoría en diversas materias y programación. Es útil para una amplia gama de aplicaciones y se adapta a diferentes contextos según las necesidades del usuario.",
    helper: "Genera texto y entiende el contexto de la conversación.",
    is_free: false,
  },
  {
    name: "gpt-4",
    type: "chat",
    description:
      "GPT-4 es un modelo multimodal avanzado capaz de procesar entradas de texto e imagen, resolviendo problemas complejos con mayor precisión que sus predecesores. Está optimizado para interacciones de chat y tareas de finalización tradicionales.",
    helper:
      "Genera texto y comprende el contexto de la conversación, manejando entradas de texto e imagen.",
    is_free: false,
  },
  {
    name: "gpt-4o-mini",
    type: "chat",
    description:
      "GPT-4o-mini es un modelo de lenguaje compacto que supera a GPT-3.5-turbo en tareas de inteligencia textual y razonamiento multimodal. Es eficiente en costos y adecuado para aplicaciones que requieren respuestas rápidas y precisas.",
    helper:
      "Genera texto y entiende el contexto de la conversación, ofreciendo respuestas rápidas y eficientes.",
    is_free: false,
  },
  {
    name: "gpt-4o",
    type: "chat",
    description:
      "GPT-4o es un modelo multimodal capaz de procesar y generar texto, imágenes y audio simultáneamente. Ofrece un rendimiento superior en tareas de lenguaje no inglés y visión, estableciendo nuevos estándares en capacidades de IA.",
    helper:
      "Genera y comprende texto, imágenes y audio, adaptándose a múltiples contextos y lenguajes.",
    is_free: false,
  },
  {
    name: "o1-mini",
    type: "chat",
    description:
      "o1-mini es una versión más rápida y económica del modelo o1, diseñada para tareas que requieren razonamiento complejo en áreas como ciencias y programación, manteniendo un rendimiento eficiente.",
    helper:
      "Genera texto y aplica razonamiento avanzado para resolver problemas complejos de manera eficiente.",
    is_free: false,
  },
  {
    name: "o1-preview",
    type: "chat",
    description:
      "o1-preview es un modelo diseñado para abordar problemas complejos mediante un proceso de razonamiento más profundo antes de generar respuestas, mejorando la precisión en áreas como codificación y matemáticas.",
    helper:
      "Genera texto y emplea un razonamiento detallado para proporcionar respuestas precisas en tareas complejas.",
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
