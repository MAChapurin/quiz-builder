import { COOKIE_KEYS } from "@/shared/config";
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const store = await cookies();
  const locale = store.get(COOKIE_KEYS.LOCALE)?.value || "ru";

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
