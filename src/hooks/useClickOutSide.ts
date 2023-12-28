import { useEffect, useRef } from "react";

export const useClickOutSide = <T>(
  handler: () => void,
  ListenToCapturing = true
) => {
  const ref = useRef<null | T>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        ref.current &&
        ref.current instanceof HTMLElement &&
        // kiem tra xem event fire co' nam` trong node target của current element không
        !ref.current?.contains(e.target as Node)
      ) {
        handler();
      }
    };

    // khởi tạo một event nằm ngoài quản lý event của React vì Modal của chúng ta nằm ngoài root app của react
    // Event chỉ listen với capture phase. Vì thế khi click để mở modal thì model sẽ không listen to bubbling phase và không tự tắt.
    document.addEventListener("click", handleClick, ListenToCapturing);

    // mỗi lần Modal được gọi sẽ addevent vì vậy cần phải remove không sẽ bị chồng event.
    return () =>
      document.removeEventListener("click", handleClick, ListenToCapturing);
  }, [handler, ListenToCapturing]);

  return { ref };
};
