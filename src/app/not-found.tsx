import { permanentRedirect } from "next/navigation";

export default function GlobalNotFound() {
  permanentRedirect("/not-found");
}
