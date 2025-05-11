const FeatureItem = () => {
    return (
      <div className="mb-16">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <div className="bg-wealth-secondary/10 p-8 rounded-2xl shadow-lg">
              <div className="rounded-full bg-wealth-secondary w-16 h-16 flex items-center justify-center mb-6">
                <span className="text-white text-xl">★</span>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-wealth-primary">Feature Title</h2>
              <p className="text-muted-foreground">Feature description goes here.</p>
            </div>
          </div>
  
          <div className="md:w-1/2">
            <div className="relative rounded-xl overflow-hidden shadow-xl bg-wealth-light/5 aspect-video">
              <div className="absolute inset-0 bg-gradient-to-r from-wealth-primary to-wealth-secondary opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-6">
                  <h3 className="text-xl font-semibold mb-2 text-wealth-primary">Feature Title</h3>
                  <p className="text-sm text-muted-foreground">
                    Interactive visualization example
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const FeatureSection = () => {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-wealth-primary">Comprehensive Platform Features</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover how our platform can transform your property insights and wealth data analysis
            </p>
          </div>
  
          <FeatureItem />
          <FeatureItem />
          <FeatureItem />
        </div>
      </section>
    );
  };
  
  export default FeatureSection;
  