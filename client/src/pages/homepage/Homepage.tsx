import FeaturesSection from "@/components/FeatureSection";
import HeroSection from "@/components/HeroSection";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="relative">
        <HeroSection />
        <FeaturesSection />
      </main>
    </div>
  );
};

export default HomePage;
