import Hero from "../components/Hero.jsx";
import FeatureStrip from "../components/FeatureStrip.jsx";
import ProductSection from "../components/ProductSection.jsx";
import PromoBanners from "../components/PromoBanners.jsx";
import BrandShowcase from "../components/BrandShowcase.jsx";
import BenefitsBar from "../components/BenefitsBar.jsx";

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureStrip />
      <ProductSection />
      <PromoBanners />
      <BrandShowcase />
      <BenefitsBar />
    </>
  );
}
