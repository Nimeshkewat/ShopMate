import React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-card/50 border border-border/80 rounded-xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:bg-card/80 hover:border-border group shadow-sm">
      <div className="w-12 h-12 rounded-full flex items-center justify-center text-foreground/80 mb-5 group-hover:scale-105 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-foreground font-semibold text-lg mb-2 tracking-wide">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed max-w-65">
        {description}
      </p>
    </div>
  );
};

export const About = () => {
  const features = [
    {
      title: "Customer First",
      description: "We put our customers at the heart of everything we do.",
      icon: (
        <svg
          className="w-7 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      ),
    },
    {
      title: "Quality Products",
      description: "We ensure all products meet our high standards.",
      icon: (
        <svg
          className="w-7 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39 0.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
          />
        </svg>
      ),
    },
    {
      title: "Community",
      description: "Building lasting relationships with our customers.",
      icon: (
        <svg
          className="w-7 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.964-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94-3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
          />
        </svg>
      ),
    },
    {
      title: "Innovation",
      description: "Constantly improving our platform and services.",
      icon: (
        <svg
          className="w-7 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
          <circle
            cx="12"
            cy="12"
            r="2.5"
            stroke="currentColor"
            strokeWidth={1.5}
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4 py-16 transition-colors duration-300">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header Section */}
        <header className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            About ShopMate
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Your trusted e-commerce platform for quality products and
            exceptional service.
          </p>
        </header>

        {/* Core Values 2x2 Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </section>

        {/* Our Story Banner Section */}
        <section className="bg-card/50 border border-border/80 rounded-xl p-8 md:p-10 space-y-4 transition-all duration-300 hover:bg-card/80 shadow-sm">
          <h2 className="text-xl md:text-2xl font-bold tracking-wide">
            Our Story
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-light">
            Founded with a vision to make online shopping simple and enjoyable,
            ShopMate has grown to become a trusted platform for thousands of
            customers worldwide. We believe that everyone deserves access to
            quality products at fair prices, backed by exceptional customer
            service.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
