import { useEffect, useCallback, useState } from "react";
import {
  getCookie,
  setCookie,
  removeCookie,
} from "@/shared/lib/client-cookies";

export function useCookies() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const onChange = () => setTick((t) => t + 1);

    window.addEventListener("cookies-changed", onChange as EventListener);
    const onStorage = (e: StorageEvent) => {
      if (e.key === "cookies-update") setTick((t) => t + 1);
    };
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("cookies-changed", onChange as EventListener);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const get = useCallback((name: string) => getCookie(name), []);
  const set = useCallback((name: string, value: string, days?: number) => {
    setCookie(name, value, days);
    localStorage.setItem("cookies-update", Date.now().toString());
    localStorage.removeItem("cookies-update");
  }, []);
  const del = useCallback((name: string) => {
    removeCookie(name);
    localStorage.setItem("cookies-update", Date.now().toString());
    localStorage.removeItem("cookies-update");
  }, []);

  return { get, set, del };
}
