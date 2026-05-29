import { useState, useCallback } from "react";

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);

  const open = useCallback((payload = null) => {
    setData(payload);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    // Delay clear data so modal close animation plays
    setTimeout(() => setData(null), 300);
  }, []);

  return { isOpen, data, open, close };
}