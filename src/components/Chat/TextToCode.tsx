import { Fragment, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface TextCodeProps {
  text: string;
}

const splitTextAndCode = (text: string) => {
  const regex = /```(\w+)?\n([\s\S]*?)\n```/g;
  const parts: { type: string; lang?: string; content: string }[] = [];
  let lastIndex = 0;

  while (true) {
    const match = regex.exec(text);
    if (!match) {
      break;
    }
    if (match.index > lastIndex) {
      parts.push({ type: "text", content: text.slice(lastIndex, match.index) });
    }
    parts.push({ type: "code", lang: match[1], content: match[2] });
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push({ type: "text", content: text.slice(lastIndex) });
  }
  return parts;
};

export const TextToCode: React.FC<TextCodeProps> = ({ text }) => {
  const contentParts = splitTextAndCode(text);
  const [copyMessage, setCopyMessage] = useState("");

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopyMessage("Copiado");
    setTimeout(() => setCopyMessage(""), 1000);
  };

  return (
    <>
      {contentParts.map((part, index) =>
        part.type === "text" ? (
          <Fragment key={index}>{part.content}</Fragment>
        ) : (
          <div key={index}>
            <SyntaxHighlighter language={part.lang} style={atomDark}>
              {part.content}
            </SyntaxHighlighter>
            <button onClick={() => handleCopy(part.content)}>
              {copyMessage || "Copiar"}
            </button>
          </div>
        )
      )}
    </>
  );
};
