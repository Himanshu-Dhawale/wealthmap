import { ChartBar, Map, Database } from 'lucide-react';

const services = [
  {
    title: "Interactive Property Mapping",
    description: "Visualize property ownership and details through our intuitive mapping interface. Filter and search properties based on various criteria.",
    icon: <Map className="h-12 w-12 text-wealth-accent" />
  },
  {
    title: "Wealth Data Analysis",
    description: "Gain insights into property owner wealth composition. Analyze net worth, investment patterns, and financial profiles.",
    icon: <ChartBar className="h-12 w-12 text-wealth-accent" />
  },
  {
    title: "Third-Party Data Integration",
    description: "Access a wealth of information from our extensive network of data partners. Seamlessly integrate external data sources into your analysis.",
    icon: <Database className="h-12 w-12 text-wealth-accent" />
  }
];

const ServicesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-wealth-primary">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive property insights and wealth analysis solutions for your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="wealth-card p-8 text-center h-full flex flex-col"
            >
              <div className="mb-6 flex justify-center">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-wealth-primary">{service.title}</h3>
              <p className="text-muted-foreground flex-grow">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
