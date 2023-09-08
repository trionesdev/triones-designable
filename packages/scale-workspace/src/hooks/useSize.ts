import { useState, useEffect, RefObject } from "react";

interface Size {
  width: number;
  height: number;
}

export const useSize = (
  targetRef: RefObject<HTMLElement>,
  callback?: (size: Size) => void
): Size => {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  useEffect(() => {
    const target = targetRef.current;

    if (!target) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setSize({ width, height });

        if (callback) {
          callback({ width, height });
        }
      }
    });

    resizeObserver.observe(target);

    return () => {
      resizeObserver.unobserve(target);
      resizeObserver.disconnect();
    };
  }, [targetRef, callback]);

  return size;
};
