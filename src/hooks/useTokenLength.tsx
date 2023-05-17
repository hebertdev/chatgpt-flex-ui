import { useState, useEffect } from "react";
import encode from "@beskar-labs/gpt-encoder";

interface UseTokenLengthProps {
  message: string;
}

export function useTokenLength({ message }: UseTokenLengthProps): number {
  const [tokenLength, setTokenLength] = useState(0);

  useEffect(() => {
    const tokens = encode(message).length;
    setTokenLength(tokens);
  }, [message]);

  return tokenLength;
}
