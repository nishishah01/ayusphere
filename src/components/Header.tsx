import { NavLink, Link } from "react-router-dom";
import { Bell, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="w-full bg-white shadow-sm py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-ayu-purple">Ayu</span>
          <span className="text-2xl font-bold text-ayu-blue">Sphere</span>
        </div>

        {/* Navigation */}
        {isAuthenticated && <nav className="hidden md:flex items-center space-x-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `ayu-nav-item ${isActive ? "text-ayu-purple font-semibold" : "text-gray-600"} hover:text-ayu-purple`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/history"
            className={({ isActive }) =>
              `ayu-nav-item ${isActive ? "text-ayu-purple font-semibold" : "text-gray-600"} hover:text-ayu-purple`
            }
          >
            Medical History
          </NavLink>

          <NavLink
            to="/appointments"
            className={({ isActive }) =>
              `ayu-nav-item ${isActive ? "text-ayu-purple font-semibold" : "text-gray-600"} hover:text-ayu-purple`
            }
          >
            Appointments
          </NavLink>

          <NavLink
            to="/medications"
            className={({ isActive }) =>
              `ayu-nav-item ${isActive ? "text-ayu-purple font-semibold" : "text-gray-600"} hover:text-ayu-purple`
            }
          >
            Medications
          </NavLink>

          <Link to="/doctor-enlistment">
            <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2">
              <User size={16} />
              <span>Join as Doctor</span>
            </Button>
          </Link>
        </nav>}

        {/* Notification & Profile */}
        <div className="flex items-center gap-3">
          <Link to="/notifications">
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} className="text-gray-500" />
              <span className="absolute -top-1 -right-1 bg-ayu-purple text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Button>
          </Link>

          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-2">
              <div className="flex items-center gap-2 bg-ayu-gray-light py-1 px-3 rounded-full">
                <div className="w-8 h-8 rounded-full bg-ayu-purple flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <span className="text-sm font-medium">
                  {user?.first_name} {user?.last_name}
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login"><Button variant="outline" size="sm">Login</Button></Link>
              <Link to="/register"><Button size="sm" className="ayu-button-primary">Sign Up</Button></Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
