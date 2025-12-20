import {
  CtaBox,
  FAQ,
  FeaturesBox,
  Hero,
  HowItWorksBox,
  HeaderMarketing,
  Footer,
} from "@/widgets";
import { Layout } from "@/shared/ui";
// import { useTranslations } from "next-intl";

export default function HomePage() {
  // const t = useTranslations("HomePage");
  return (
    <Layout headerSlot={<HeaderMarketing />} footerSlot={<Footer />}>
      <Hero />
      {/* <h1>{t("title")}</h1> */}
      <FeaturesBox />
      <HowItWorksBox />
      <FAQ />
      <CtaBox />
    </Layout>
  );
}
