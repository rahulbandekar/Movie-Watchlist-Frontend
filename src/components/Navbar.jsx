import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Menu, X, Film, LogOut, User, List } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { to: "/", label: "Home", icon: Film, auth: false },
    { to: "/watchlist", label: "Watchlist", icon: List, auth: true },
  ];

  return (
    <nav className="bg-secondary/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-800">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Film className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent">
              MovieWatchlist
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => {
              if (link.auth && !user) return null;
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center space-x-2 text-gray-300 hover:text-primary transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-300">
                    Hi, {user.name?.split(" ")[0]}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-600/20 text-red-500 hover:bg-red-600 hover:text-white transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg text-gray-300 hover:text-primary transition-colors"
                >
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-primary transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            {navLinks.map((link) => {
              if (link.auth && !user) return null;
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-primary hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            {user ? (
              <>
                <div className="px-4 py-3 text-gray-400 flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-red-500 hover:bg-red-600/20 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="space-y-2 px-4">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-2 rounded-lg text-gray-300 hover:text-primary transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center btn-primary"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
