import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, Sparkles, Camera, Palette, Download, Twitter, Instagram, Facebook, Mail } from 'lucide-react';

const LandingPage: React.FC = () => {
  const { setActiveStep } = useApp();

  const handleGetStarted = () => {
    setActiveStep('login');
  };

  const handlePricing = () => {
    setActiveStep('pricing');
  };

  const handleLogin = () => {
    setActiveStep('login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-2xl font-bold text-gray-800">
            <Sparkles className="w-6 h-6 text-teal-500" />
            <span className="bg-gradient-to-r from-teal-500 to-purple-600 bg-clip-text text-transparent">
              VisualMint
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <a 
              href="#" 
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              Gallery
            </a>
            <button 
              onClick={handlePricing}
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={handleLogin}
              className="bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 text-white text-sm font-medium py-2 px-4 rounded-md shadow-sm transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 pt-32 pb-32">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Skip the Photoshoots.
            <br />
            Skip the Designers.
            <br />
            <span className="bg-gradient-to-r from-teal-500 to-purple-600 bg-clip-text text-transparent">
              Create Stunning Shots — for $1.
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Upload your product. Pick a vibe. Download professional visuals — no studio, no graphic designer, no headaches.
          </p>
          
          <button
            onClick={handleGetStarted}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 text-white text-lg font-medium px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
          >
            Create My First Shot for $1
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Before/After Showcase */}
        <div className="mt-20">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/4464821/pexels-photo-4464821.jpeg"
                  alt="Original product"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                  Original
                </div>
              </div>
              
              {[1, 2, 3].map((i) => (
                <div key={i} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={`https://images.pexels.com/photos/${4464821 + i}/pexels-photo-${4464821 + i}.jpeg`}
                    alt={`Creative variation ${i}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-teal-500 to-purple-600 px-3 py-1 rounded-full text-sm font-medium text-white">
                    Creative {i}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">
            Three Simple Steps to Amazing Visuals
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: Camera,
                title: "Upload Your Product",
                description: "Start with any product photo you have",
              },
              {
                icon: Palette,
                title: "Choose Your Style",
                description: "Select from curated creative directions",
              },
              {
                icon: Download,
                title: "Get Professional Results",
                description: "Download your new marketing visuals",
              },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-teal-500 to-purple-600 flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            No credit card required to start
          </div>
          
          <h2 className="text-4xl font-bold mb-8 max-w-2xl mx-auto">
            Ready to Transform Your Product Photos?
          </h2>
          
          <button
            onClick={handleGetStarted}
            className="inline-flex items-center gap-2 bg-white text-gray-900 hover:bg-gray-100 text-lg font-medium px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
          >
            Start Creating Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4">
                <Sparkles className="w-5 h-5 text-teal-500" />
                <span className="bg-gradient-to-r from-teal-500 to-purple-600 bg-clip-text text-transparent">
                  VisualMint
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Transform your product photos into professional marketing shots instantly.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <button
                    onClick={handlePricing}
                    className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
                  >
                    Pricing
                  </button>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                    Updates
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="mailto:support@visualmint.com" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm transition-colors">
                    <Mail className="w-4 h-4" />
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-500">
                © 2025 VisualMint. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                  Terms
                </a>
                <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                  Privacy
                </a>
                <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;