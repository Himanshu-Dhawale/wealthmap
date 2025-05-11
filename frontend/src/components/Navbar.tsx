
// // import { Link } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
// import { Building, ChartBar, Map, FileText, Database, UserPlus, User, LogOut } from 'lucide-react';
// import { useAuth, UserRole } from '@/contexts/AuthContext';

// const Navbar = () => {
//   const { user, isAuthenticated, logout, hasPermission } = useAuth();

//   const canAccessDataExport = hasPermission(['admin', 'editor']);
//   const canAccessIntegrations = hasPermission(['admin', 'editor']);
//   const isAdmin = hasPermission(['admin']);

//   return (
//     <div className="bg-wealth-primary text-white shadow-md">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           <div className="flex items-center space-x-2">
//             <Building className="h-6 w-6 text-wealth-accent" />
//             <Link to="/" className="text-xl font-bold">WealthMap</Link>
//           </div>
          
//           {isAuthenticated && (
//             <div className="hidden md:flex md:items-center md:space-x-6">
//               <Link to="/property-search" className="text-sm text-wealth-light hover:text-wealth-accent transition-colors flex items-center">
//                 <Map className="h-4 w-4 mr-1" />
//                 Property Search
//               </Link>
//               <Link to="/wealth-composition" className="text-sm text-wealth-light hover:text-wealth-accent transition-colors flex items-center">
//                 <ChartBar className="h-4 w-4 mr-1" />
//                 Wealth Analysis
//               </Link>
              
//               {canAccessDataExport && (
//                 <Link to="/data-export" className="text-sm text-wealth-light hover:text-wealth-accent transition-colors flex items-center">
//                   <FileText className="h-4 w-4 mr-1" />
//                   Reports
//                 </Link>
//               )}
              
//               {canAccessIntegrations && (
//                 <Link to="/integrations" className="text-sm text-wealth-light hover:text-wealth-accent transition-colors flex items-center">
//                   <Database className="h-4 w-4 mr-1" />
//                   Integrations
//                 </Link>
//               )}
              
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="ghost" className="text-sm text-wealth-light hover:text-wealth-accent transition-colors">
//                     {user?.name || 'Account'}
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                   <DropdownMenuItem asChild>
//                     <Link to="/profile" className="flex items-center">
//                       <User className="h-4 w-4 mr-2" />
//                       Profile
//                     </Link>
//                   </DropdownMenuItem>
                  
//                   {isAdmin && (
//                     <DropdownMenuItem asChild>
//                       <Link to="/admin" className="flex items-center">
//                         <UserPlus className="h-4 w-4 mr-2" />
//                         Admin Dashboard
//                       </Link>
//                     </DropdownMenuItem>
//                   )}
                  
//                   <DropdownMenuItem onClick={logout} className="flex items-center">
//                     <LogOut className="h-4 w-4 mr-2" />
//                     Logout
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//           )}
          
//           {!isAuthenticated && (
//             <div className="hidden md:flex md:items-center md:space-x-4">
//               <Link to="/login">
//                 <Button variant="ghost" className="text-wealth-light hover:text-wealth-accent">
//                   Login
//                 </Button>
//               </Link>
//               <Link to="/register">
//                 <Button className="bg-wealth-secondary hover:bg-wealth-accent text-white">
//                   Register
//                 </Button>
//               </Link>
//             </div>
//           )}
          
//           <div className="md:hidden">
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" size="sm">
//                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
//                     <line x1="4" x2="20" y1="12" y2="12" />
//                     <line x1="4" x2="20" y1="6" y2="6" />
//                     <line x1="4" x2="20" y1="18" y2="18" />
//                   </svg>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end" className="w-[200px]">
//                 {isAuthenticated ? (
//                   <>
//                     <DropdownMenuItem asChild>
//                       <Link to="/property-search" className="flex items-center">
//                         <Map className="h-4 w-4 mr-2" />
//                         Property Search
//                       </Link>
//                     </DropdownMenuItem>
//                     <DropdownMenuItem asChild>
//                       <Link to="/wealth-composition" className="flex items-center">
//                         <ChartBar className="h-4 w-4 mr-2" />
//                         Wealth Analysis
//                       </Link>
//                     </DropdownMenuItem>
                    
//                     {canAccessDataExport && (
//                       <DropdownMenuItem asChild>
//                         <Link to="/data-export" className="flex items-center">
//                           <FileText className="h-4 w-4 mr-2" />
//                           Reports
//                         </Link>
//                       </DropdownMenuItem>
//                     )}
                    
//                     {canAccessIntegrations && (
//                       <DropdownMenuItem asChild>
//                         <Link to="/integrations" className="flex items-center">
//                           <Database className="h-4 w-4 mr-2" />
//                           Integrations
//                         </Link>
//                       </DropdownMenuItem>
//                     )}
                    
//                     <DropdownMenuItem asChild>
//                       <Link to="/profile" className="flex items-center">
//                         <User className="h-4 w-4 mr-2" />
//                         Profile
//                       </Link>
//                     </DropdownMenuItem>
                    
//                     {isAdmin && (
//                       <DropdownMenuItem asChild>
//                         <Link to="/admin" className="flex items-center">
//                           <UserPlus className="h-4 w-4 mr-2" />
//                           Admin Dashboard
//                         </Link>
//                       </DropdownMenuItem>
//                     )}
                    
//                     <DropdownMenuItem onClick={logout} className="flex items-center">
//                       <LogOut className="h-4 w-4 mr-2" />
//                       Logout
//                     </DropdownMenuItem>
//                   </>
//                 ) : (
//                   <>
//                     <DropdownMenuItem asChild>
//                       <Link to="/login">Login</Link>
//                     </DropdownMenuItem>
//                     <DropdownMenuItem asChild>
//                       <Link to="/register">Register</Link>
//                     </DropdownMenuItem>
//                   </>
//                 )}
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;



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
  