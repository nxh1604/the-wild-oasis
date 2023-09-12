import { useState, useEffect } from "react";

export function useLocalStorageState<T>(
  initialState: T,
  key: string
): [string | T, React.Dispatch<React.SetStateAction<T | string>>] {
  const [value, setValue] = useState<T | string>(() => {
    const storedValue = localStorage.getItem(key);

    const parsedStoredValue =
      storedValue && (JSON.parse(storedValue) as string | null);

    return parsedStoredValue || initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
