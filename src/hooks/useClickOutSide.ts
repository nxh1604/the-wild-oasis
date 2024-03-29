import { useEffect, useRef } from "react";

export const useClickOutSide = <T>(handler: () => void, ListenToCapturing = true) => {
  const ref = useRef<null | T>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        ref.current &&
        ref.current instanceof HTMLElement &&
        !ref.current?.contains(e.target as Node)
      ) {
        handler();
      }
    };

    document.addEventListener("click", handleClick, ListenToCapturing);

    return () => document.removeEventListener("click", handleClick, ListenToCapturing);
  }, [handler, ListenToCapturing]);

  return { ref };
};
