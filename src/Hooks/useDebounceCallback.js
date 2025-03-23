import { useState, useEffect } from "react";

// Debounce Hook
const useDebouncedCallback = (callback, delay) => {
  const [timer, setTimer] = useState(null);

  const debouncedFunction = (...args) => {
    if (timer) clearTimeout(timer);
    const newTimer = setTimeout(() => {
      callback(...args);
    }, delay);

    setTimer(newTimer);
  };

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timer]);

  return debouncedFunction;
};

export default useDebouncedCallback;