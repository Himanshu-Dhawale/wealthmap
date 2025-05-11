const HeroSection = () => {
    return (
      <section className="relative flex-grow flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-wealth-primary/75"></div>
        </div>
        <div className="container mx-auto px-4 py-16 relative z-10 text-white flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Unlock Property Insights with WealthMap
            </h1>
            <p className="text-lg md:text-xl mb-6 text-wealth-light/90">
              Explore property ownership and net worth data across the US through our interactive maps and third-party data integrations.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="/register"
                className="bg-wealth-accent hover:bg-wealth-secondary text-wealth-primary font-semibold text-center px-6 py-3 rounded"
              >
                Request Demo
              </a>
              <a
                href="/login"
                className="border border-wealth-accent text-wealth-light hover:bg-wealth-accent/10 text-center px-6 py-3 rounded"
              >
                Learn More
              </a>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl shadow-lg max-w-md w-full">
              <div className="aspect-video rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center bg-wealth-primary/20">
                  <div className="text-center p-6">
                    <h3 className="text-xl font-semibold mb-2">Interactive Property Maps</h3>
                    <p className="text-sm text-wealth-light/90">
                      Visualize property data with our cutting-edge mapping technology.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default HeroSection;
  