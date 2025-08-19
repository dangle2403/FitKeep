import {
  FaCalendarAlt,
  FaChartLine,
  FaBullseye,
  FaMobileAlt,
  FaChartBar,
  FaChevronRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const features = [
  {
    id: "scheduling",
    icon: FaCalendarAlt,
    title: "Smart Workout Scheduling",
    description:
      "Create personalized workout schedules that adapt to your lifestyle and fitness goals.",
    details:
      "Our intelligent scheduling system learns from your preferences and availability to suggest optimal workout times. Set recurring sessions, get reminders, and never miss a workout again. Integration with popular calendar apps keeps everything synchronized.",
  },
  {
    id: "progress",
    icon: FaChartLine,
    title: "Advanced Progress Tracking",
    description:
      "Monitor your fitness journey with detailed analytics and visual progress reports.",
    details:
      "Track various metrics including strength gains, endurance improvements, body measurements, and workout frequency. Visual charts and graphs help you understand your progress patterns and identify areas for improvement. Export data for detailed analysis.",
  },
  {
    id: "personalization",
    icon: FaBullseye,
    title: "Goal-Oriented Personalization",
    description:
      "Customize your experience based on specific fitness goals and preferences.",
    details:
      "Whether you're building muscle, losing weight, or training for an event, our platform adapts to your specific objectives. AI-powered recommendations suggest workout modifications, rest periods, and nutrition tips tailored to your goals.",
  },
  {
    id: "mobile",
    icon: FaMobileAlt,
    title: "Mobile-First Experience",
    description:
      "Access your workouts and track progress on the go with our mobile app.",
    details:
      "Native mobile apps for iOS and Android provide seamless offline capabilities. Track workouts without internet connection, sync data when online, and receive push notifications for workout reminders and achievements.",
  },
  {
    id: "analytics",
    icon: FaChartBar,
    title: "Comprehensive Analytics",
    description:
      "Deep insights into your fitness data with advanced reporting tools.",
    details:
      "Understand your performance trends with detailed analytics dashboards. Track weekly, monthly, and yearly progress. Identify patterns in your workout performance, recovery times, and optimal training periods for maximum results.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 lg:py-32 px-4 lg:px-8 relative bg-[#0f0f1a]">
      <div className="container mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-6 text-white">
            Everything You Need to
            <span className="block text-orange-500">Achieve Your Goals</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Discover powerful features designed to make your fitness journey
            more effective and enjoyable.
          </p>
        </div>

        {/* Features using <details> */}
        <div className="max-w-4xl mx-auto space-y-4">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <details
                key={feature.id}
                className="glass-effect rounded-2xl px-6 border border-gray-700 transition-all duration-300 hover:border-orange-500"
              >
                <summary className="cursor-pointer py-6 flex items-center justify-between group">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center transition-colors duration-300 group-hover:bg-orange-500/20">
                      <IconComponent className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg md:text-xl text-white transition-colors duration-300 group-hover:text-orange-500">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 text-sm md:text-base mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <FaChevronRight className="text-orange-500 transition-transform duration-300 rotate-0 group-open:rotate-90" />
                </summary>
                <div className="ml-16 pb-6 text-gray-300 leading-relaxed">
                  {feature.details}
                </div>
              </details>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <p className="text-gray-300 mb-6">
            Ready to transform your fitness routine?
          </p>
          <Link to="/schedule" className="inline-block">
            <button className="bg-orange-500 hover:bg-orange-500/90 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 glow-orange flex items-center justify-center space-x-2">
              <span>Start Your Journey</span>
              <FaChevronRight />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
