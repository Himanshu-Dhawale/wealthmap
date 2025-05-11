const Navbar = () => {
    return (
      <div style={{ backgroundColor: '#0A2342' }} className="bg-wealth-primary text-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 text-wealth-accent bg-gray-500"></div>
              <a className="text-xl font-bold">WealthMap</a>
            </div>  
  
            <div className="hidden md:flex md:items-center md:space-x-6">
              <a href="/property-search" className="text-sm text-wealth-light hover:text-wealth-accent transition-colors flex items-center">
                <div className="h-4 w-4 mr-1 bg-gray-500"></div>
                Property Search
              </a>
              <a href="/wealth-composition" className="text-sm text-wealth-light hover:text-wealth-accent transition-colors flex items-center">
                <div className="h-4 w-4 mr-1 bg-gray-500"></div>
                Wealth Analysis
              </a>
              <a href="/data-export" className="text-sm text-wealth-light hover:text-wealth-accent transition-colors flex items-center">
                <div className="h-4 w-4 mr-1 bg-gray-500"></div>
                Reports
              </a>
              <a href="/integrations" className="text-sm text-wealth-light hover:text-wealth-accent transition-colors flex items-center">
                <div className="h-4 w-4 mr-1 bg-gray-500"></div>
                Integrations
              </a>
  
              <div className="text-sm text-wealth-light hover:text-wealth-accent transition-colors">
                Account
              </div>
            </div>
  
            <div className="hidden md:flex md:items-center md:space-x-4">
              <a href="/login" className="text-wealth-light hover:text-wealth-accent">Login</a>
              <a href="/register" className="bg-wealth-secondary hover:bg-wealth-accent text-white px-3 py-1 rounded">Register</a>
            </div>
  
            <div className="md:hidden">
              <div className="text-white p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Navbar;
  