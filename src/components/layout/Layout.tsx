import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ProgressBar from './ProgressBar';
import { useApp } from '../../context/AppContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { activeStep } = useApp();
  
  // Hide progress bar on login, landing, pricing, checkout and account pages
  const hideProgressBar = ['login', 'landing', 'pricing', 'checkout', 'account'].includes(activeStep);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 flex flex-col max-w-7xl w-full mx-auto py-8 px-4">
        {!hideProgressBar && <ProgressBar />}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;