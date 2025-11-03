import { useCallback, useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
): [value: T, setValue: (newValue: T) => void] {
  return useStorage(localStorage, key, defaultValue);
}

export function useSessionStorage<T>(
  key: string,
  defaultValue: T,
): [value: T, setValue: (newValue: T) => void] {
  return useStorage(sessionStorage, key, defaultValue);
}

// See: https://developer.mozilla.org/docs/Web/API/Window/storage_event
const eventName = "storage";

function useStorage<T>(
  storage: Storage,
  key: string,
  defaultValue: T,
): [value: T, setValue: (newValue: T) => void] {
  const [value, setValueLocally] = useState<T>(() => {
    const item = storage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  });

  const setValue = useCallback(
    (newValue: T) => {
      storage.setItem(key, JSON.stringify(newValue));
      window.dispatchEvent(new StorageEvent(eventName, { key: key }));
    },
    [key],
  );

  const handler = useCallback(
    (e: StorageEvent) => {
      if (e.key != key) return;
      const item = storage.getItem(key);
      setValueLocally(item ? JSON.parse(item) : defaultValue);
    },
    [key, defaultValue],
  );

  useEffect(() => {
    window.addEventListener(eventName, handler);

    return () => {
      window.removeEventListener(eventName, handler);
    };
  }, [handler]);

  return [value, setValue];
}
