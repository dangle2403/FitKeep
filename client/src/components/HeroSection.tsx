import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 lg:px-8 bg-[#0f0f1a]">
      {/* Hero content */}
      <div className="relative z-10 text-center max-w-4xl animate-fade-in">
        {/* Main heading */}
        <h1 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight text-white">
          Your <span className="gradient-text text-orange-400">Fitness</span>{" "}
          Journey <span className="text-orange-500">Simplified</span>
        </h1>

        {/* Tagline */}
        <p className="text-lg md:text-xl lg:text-2xl text-gray-100 mb-8 max-w-2xl mx-auto leading-relaxed">
          Schedule workouts, track progress, and achieve your fitness goals with
          our modern platform designed for real results.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
          <Link to="/schedule">
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-500/90 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 glow-orange group"
            >
              Get Started
              <FaArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
