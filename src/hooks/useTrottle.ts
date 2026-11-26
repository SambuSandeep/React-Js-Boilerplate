import { useEffect, useRef, useState } from 'react';

export function useThrottle<T>(value: T, intervalMs = 300): T {
  const [throttled, setThrottled] = useState(value);
  const lastUpdate = useRef(0);

  useEffect(() => {
    const wait = Math.max(0, intervalMs - (Date.now() - lastUpdate.current));
    const timer = setTimeout(() => {
      lastUpdate.current = Date.now();
      setThrottled(value);
    }, wait);
    return () => clearTimeout(timer);
  }, [value, intervalMs]);

  return throttled;
}
