const steps = [
    {
      number: 1,
      title: "Register Your Company",
      description: "Create a company account to access our powerful property data platform."
    },
    {
      number: 2,
      title: "Onboard Team Members",
      description: "Invite team members and set permissions based on their roles."
    },
    {
      number: 3,
      title: "Access Property Data",
      description: "Explore interactive maps and wealth data across the US."
    },
    {
      number: 4,
      title: "Generate Insights",
      description: "Analyze property ownership and wealth composition for better decisions."
    }
  ];
  
  const HowItWorks = () => {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-wealth-primary">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Follow these simple steps to start leveraging the power of WealthMap
            </p>
          </div>
  
          <div className="relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-wealth-secondary/30 z-0"></div>
  
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {steps.map((step) => (
                <div key={step.number} className="relative z-10">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 rounded-full bg-wealth-secondary flex items-center justify-center text-2xl font-bold text-white">
                        {step.number}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-wealth-primary">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default HowItWorks;
  