"use client";

import { useCallback, useState } from "react";

export function useSafeModal() {
  const [opened, setOpened] = useState(false);

  const open = useCallback(() => {
    setOpened(true);
  }, []);

  const close = useCallback((afterClose?: () => void) => {
    setOpened(false);

    if (afterClose) {
      setTimeout(() => {
        afterClose();
      }, 150);
    }
  }, []);

  return {
    opened,
    open,
    close,
  };
}
