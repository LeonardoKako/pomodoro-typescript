import { useEffect, useRef } from "react";

export function useInterval<C extends CallableFunction>(
  callback: C,
  delay: number | null
): void {
  const savedCallback = useRef<C | undefined>(undefined); // Inicializa com undefined

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        // Adicionei uma verificação de segurança
        savedCallback.current();
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
