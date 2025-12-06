import {
  CtaBox,
  FAQ,
  FeaturesBox,
  Hero,
  HowItWorksBox,
  Header,
  Footer,
} from "@/widgets";
import { Layout } from "@/shared/ui";

export default function HomePage() {
  return (
    <Layout headerSlot={<Header />} footerSlot={<Footer />}>
      <Hero />
      <FeaturesBox />
      <HowItWorksBox />
      <FAQ />
      <CtaBox />
    </Layout>
  );
}
