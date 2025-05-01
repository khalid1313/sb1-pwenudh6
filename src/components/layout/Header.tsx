import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, LogOut, User } from 'lucide-react';

const Header: React.FC = () => {
  const { resetProject, setActiveStep, user, logout } = useApp();

  const handlePricingClick = () => {
    setActiveStep('pricing');
  };

  const handleLoginClick = () => {
    setActiveStep('login');
  };

  const handleAccountClick = () => {
    setActiveStep('account');
  };

  const handleGalleryClick = () => {
    setActiveStep('upload');
  };

  const handleLogoClick = () => {
    if (user) {
      resetProject();
      setActiveStep('upload');
    } else {
      // For non-authenticated users, always go to landing
      resetProject();
      setActiveStep('landing');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      resetProject();
      setActiveStep('landing');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  return (
    <header className="bg-white shadow-sm py-4 px-6 border-b border-gray-100 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <button
          onClick={handleLogoClick}
          className="flex items-center gap-2 text-2xl font-bold text-gray-800 hover:text-teal-500 transition-colors"
        >
          <Sparkles className="w-6 h-6 text-teal-500" />
          <span className="bg-gradient-to-r from-teal-500 to-purple-600 bg-clip-text text-transparent">
            VisualMint
          </span>
        </button>
        
        <div className="flex items-center gap-6">
          {user && (
            <button 
              onClick={handleGalleryClick}
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              Gallery
            </button>
          )}
          <button 
            onClick={handlePricingClick}
            className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
          >
            Pricing
          </button>
          {user ? (
            <div className="flex items-center gap-6">
              <button
                onClick={handleAccountClick}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
              >
                <User className="w-4 h-4" />
                My Account
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={handleLoginClick}
              className="bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 text-white text-sm font-medium py-2 px-4 rounded-md shadow-sm transition-colors"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;