type SimpleCookieOptions = {
  path?: string;
  domain?: string;
  sameSite?: "lax" | "strict" | "none";
  secure?: boolean;
  expires?: Date;
};

const defaultOptions: SimpleCookieOptions = {
  path: "/",
  sameSite: "lax",
  secure: typeof window !== "undefined" && location.protocol === "https:",
};

export function setCookie(
  name: string,
  value: string,
  days = 365,
  opts?: SimpleCookieOptions,
) {
  const expires = new Date();
  expires.setDate(expires.getDate() + days);

  const options: SimpleCookieOptions = { ...defaultOptions, ...opts, expires };

  const parts = [`${encodeURIComponent(name)}=${encodeURIComponent(value)}`];
  if (options.expires) parts.push(`Expires=${options.expires.toUTCString()}`);
  if (options.path) parts.push(`Path=${options.path}`);
  if (options.domain) parts.push(`Domain=${options.domain}`);
  if (options.sameSite) parts.push(`SameSite=${options.sameSite}`);
  if (options.secure) parts.push("Secure");

  document.cookie = parts.join("; ");

  window.dispatchEvent(
    new CustomEvent("cookies-changed", { detail: { name, value } }),
  );
}

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp("(^|; )" + encodeURIComponent(name) + "=([^;]*)"),
  );
  return match ? decodeURIComponent(match[2]) : null;
}

export function removeCookie(name: string) {
  setCookie(name, "", -1);
}
