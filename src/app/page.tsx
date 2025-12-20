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

export default function HomePage() {
  return (
    <Layout headerSlot={<HeaderMarketing />} footerSlot={<Footer />}>
      <Hero />
      <FeaturesBox />
      <HowItWorksBox />
      <FAQ />
      <CtaBox />
    </Layout>
  );
}
