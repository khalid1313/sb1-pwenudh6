import React from 'react';
import { useApp } from '../context/AppContext';
import Layout from '../components/layout/Layout';
import ImageUploader from '../components/upload/ImageUploader';
import ImagePreview from '../components/preview/ImagePreview';
import PromptSelector from '../components/prompt/PromptSelector';
import GenerationProcess from '../components/generate/GenerationProcess';
import ResultsGallery from '../components/results/ResultsGallery';
import PricingPage from '../components/pricing/PricingPage';
import LoginPage from '../components/auth/LoginPage';
import LandingPage from '../components/landing/LandingPage';
import CheckoutPage from '../components/checkout/CheckoutPage';
import AccountPage from '../components/account/AccountPage';

const Dashboard: React.FC = () => {
  const { activeStep, user } = useApp();
  
  // Show landing page for non-authenticated users when activeStep is 'landing'
  if (activeStep === 'landing' || (!user && !['login', 'pricing', 'checkout'].includes(activeStep))) {
    return <LandingPage />;
  }

  // For authenticated users or specific public pages, use the Layout
  return (
    <Layout>
      {(() => {
        switch (activeStep) {
          case 'upload':
            return <ImageUploader />;
          case 'preview':
            return <ImagePreview />;
          case 'prompt':
            return <PromptSelector />;
          case 'generate':
            return <GenerationProcess />;
          case 'results':
            return <ResultsGallery />;
          case 'pricing':
            return <PricingPage />;
          case 'login':
            return <LoginPage />;
          case 'checkout':
            return <CheckoutPage />;
          case 'account':
            return <AccountPage />;
          default:
            return user ? <ImageUploader /> : <LandingPage />;
        }
      })()}
    </Layout>
  );
};

export default Dashboard;