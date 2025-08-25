import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BrandLogo } from "@/components/BrandLogo";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { siteConfig } from "@/config/site";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const fetchUserRole = async () => {
        const { data } = await supabase
          .from('profiles')
          .select('role')
          .eq('user_id', user.id)
          .single();
        setUserRole(data?.role || 'user');
      };
      fetchUserRole();
    } else {
      setUserRole(null);
    }
  }, [user]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/impact", label: "Impact" },
    { href: "/shop", label: "Shop" },
    { href: "/packages", label: "Solar Packages" },
    { href: "/blog", label: "Insights" },
    { href: "/contact", label: "Contact" },
  ];


  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <BrandLogo width={180} height={50} />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-foreground hover:text-primary transition-colors text-sm font-medium ${
                  location.pathname === link.href ? 'text-primary font-semibold' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Admin Link for authenticated users with admin roles */}
            {user && userRole && ['admin', 'editor', 'super_admin'].includes(userRole) && (
              <Link
                to="/admin"
                className={`text-foreground hover:text-primary transition-colors text-sm font-medium ${
                  location.pathname === '/admin' ? 'text-primary font-semibold' : ''
                }`}
              >
                Admin
              </Link>
            )}
          </div>

          {/* CTA Buttons - Hide on Impact page */}
          {location.pathname !== '/impact' && (
            <div className="hidden md:flex items-center space-x-3">
              <CartDrawer />
              {user ? (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <User className="h-4 w-4" />
                    <span className="hidden lg:inline">
                      {user.user_metadata?.display_name || user.email}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => signOut()}
                    className="text-foreground hover:bg-accent"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-foreground hover:bg-accent"
                >
                  <Link to="/auth">
                    <User className="h-4 w-4" />
                    <span className="hidden lg:ml-2 lg:inline">Login</span>
                  </Link>
                </Button>
              )}
            </div>
          )}

          {/* Impact page - Show only user auth */}
          {location.pathname === '/impact' && (
            <div className="hidden md:flex items-center space-x-3">
              <CartDrawer />
              {user ? (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <User className="h-4 w-4" />
                    <span className="hidden lg:inline">
                      {user.user_metadata?.display_name || user.email}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => signOut()}
                    className="text-foreground hover:bg-accent"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-foreground hover:bg-accent"
                >
                  <Link to="/auth">
                    <User className="h-4 w-4" />
                    <span className="hidden lg:ml-2 lg:inline">Login</span>
                  </Link>
                </Button>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-foreground hover:text-primary transition-colors ${
                    location.pathname === link.href ? 'text-primary font-medium' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
               {user && userRole && ['admin', 'editor', 'super_admin'].includes(userRole) && (
                 <Link
                   to="/admin"
                   className={`text-foreground hover:text-primary transition-colors ${
                     location.pathname === '/admin' ? 'text-primary font-medium' : ''
                   }`}
                   onClick={() => setIsMenuOpen(false)}
                 >
                   Admin Panel
                 </Link>
               )}
               <div className="flex flex-col space-y-2 pt-4">
                 <CartDrawer />
                 {user ? (
                   <div className="flex flex-col space-y-2">
                     <div className="text-sm text-muted-foreground">
                       Logged in as: {user.user_metadata?.display_name || user.email}
                     </div>
                     <Button
                       variant="ghost"
                       size="sm"
                       onClick={() => signOut()}
                       className="justify-start"
                     >
                       <LogOut className="mr-2 h-4 w-4" />
                       Logout
                     </Button>
                   </div>
                 ) : (
                   <Button
                     asChild
                     variant="ghost"
                     size="sm"
                     className="justify-start"
                   >
                     <Link to="/auth">
                       <User className="mr-2 h-4 w-4" />
                       Login
                     </Link>
                   </Button>
                 )}
               </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
