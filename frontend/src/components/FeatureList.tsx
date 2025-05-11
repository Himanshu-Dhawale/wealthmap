const FeaturesList = () => {
    return (
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-wealth-primary">Your Title Here</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Your static description goes here.
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="wealth-card p-6 h-full flex flex-col">
              <div className="mb-4 flex items-center">
                <div className="rounded-full bg-wealth-secondary/20 p-2 mr-3">
                  <svg className="h-5 w-5 text-wealth-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0L3.293 10.707a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-semibold text-wealth-primary">Feature One</h3>
              </div>
              <p className="text-sm text-muted-foreground">Static feature description goes here.</p>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default FeaturesList;
  