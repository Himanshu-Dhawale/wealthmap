interface Testimonial {
    quote: string;
    author: string;
    position: string;
    company: string;
  }
  
  const testimonials: Testimonial[] = [
    {
      quote: "WealthMap has transformed how we analyze property ownership and wealth data. The platform is intuitive and provides valuable insights for our investment decisions.",
      author: "Sarah Johnson",
      position: "Chief Investment Officer",
      company: "Meridian Realty"
    },
    {
      quote: "The property mapping features and wealth data analysis have given us a competitive edge. We've been able to identify opportunities that we would have missed otherwise.",
      author: "Michael Chen",
      position: "Director of Acquisitions",
      company: "Core Holdings Group"
    },
    {
      quote: "WealthMap's third-party integrations provide a comprehensive view of property data that has streamlined our research process and improved our decision-making.",
      author: "Rachel Williams",
      position: "VP of Market Analysis",
      company: "Landmark Investments"
    }
  ];
  
  const TestimonialSection = () => {
    return (
      <section className="py-16 bg-gray-200 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-lg text-wealth-light/90 max-w-3xl mx-auto">
              Discover how organizations are leveraging WealthMap to transform their property insights
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-lg"
              >
                <div className="mb-4">
                  {/* Quote Icon */}
                  <svg className="h-8 w-8 text-wealth-accent/50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="mb-6 text-wealth-light/90">{testimonial.quote}</p>
                <div>
                  <h4 className="font-semibold text-wealth-light">{testimonial.author}</h4>
                  <p className="text-sm text-wealth-light/70">{testimonial.position}, {testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default TestimonialSection;
  