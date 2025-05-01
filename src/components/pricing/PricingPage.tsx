import React from 'react';
import { useApp } from '../../context/AppContext';
import { CreditCard, Package, Zap, Infinity, Check, Star } from 'lucide-react';

const PricingPage: React.FC = () => {
  const { setActiveStep } = useApp();

  const handleSelectPackage = () => {
    setActiveStep('checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Start Your Creative Journey for Just $1
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Transform your product photos into professional marketing shots instantly.
          Each upload creates a new set of creative visuals.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Starter Shot */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 hover:border-teal-500 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-teal-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Starter Shot</h2>
          </div>
          
          <div className="mb-6">
            <span className="text-4xl font-bold text-gray-900">$1</span>
            <span className="text-gray-500 ml-2">one-time</span>
          </div>
          
          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-2 text-gray-600">
              <Check className="w-5 h-5 text-teal-500" />
              1 upload = 1 creative set (3 shots)
            </li>
            <li className="flex items-center gap-2 text-gray-600">
              <Check className="w-5 h-5 text-teal-500" />
              Instant generation
            </li>
            <li className="flex items-center gap-2 text-gray-600">
              <Check className="w-5 h-5 text-teal-500" />
              Download in HD
            </li>
          </ul>
          
          <button 
            onClick={handleSelectPackage}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors"
          >
            Create for $1
          </button>
        </div>

        {/* Mini Pack */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 hover:border-purple-500 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
              <Package className="w-5 h-5 text-purple-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Mini Pack</h2>
          </div>
          
          <div className="mb-6">
            <span className="text-4xl font-bold text-gray-900">$7</span>
            <span className="text-gray-500 ml-2">one-time</span>
          </div>
          
          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-2 text-gray-600">
              <Check className="w-5 h-5 text-purple-500" />
              10 uploads = 10 creative sets
            </li>
            <li className="flex items-center gap-2 text-gray-600">
              <Check className="w-5 h-5 text-purple-500" />
              Designed for small collections
            </li>
            <li className="flex items-center gap-2 text-gray-600">
              <Check className="w-5 h-5 text-purple-500" />
              1 free extra style variation
            </li>
          </ul>
          
          <button 
            onClick={handleSelectPackage}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors"
          >
            Upgrade My Shots
          </button>
        </div>

        {/* Power Pack */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 hover:border-indigo-500 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
              <Zap className="w-5 h-5 text-indigo-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Power Pack</h2>
          </div>
          
          <div className="mb-6">
            <span className="text-4xl font-bold text-gray-900">$30</span>
            <span className="text-gray-500 ml-2">one-time</span>
          </div>
          
          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-2 text-gray-600">
              <Check className="w-5 h-5 text-indigo-500" />
              50 uploads = 50 creative sets
            </li>
            <li className="flex items-center gap-2 text-gray-600">
              <Check className="w-5 h-5 text-indigo-500" />
              Best for growing brands
            </li>
            <li className="flex items-center gap-2 text-gray-600">
              <Check className="w-5 h-5 text-indigo-500" />
              Priority generation included
            </li>
          </ul>
          
          <button 
            onClick={handleSelectPackage}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors"
          >
            Power My Brand
          </button>
        </div>

        {/* Unlimited Studio */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Infinity className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold">Unlimited Studio</h2>
          </div>
          
          <div className="mb-6">
            <span className="text-4xl font-bold">$99</span>
            <span className="text-gray-300 ml-2">/month</span>
          </div>
          
          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-2 text-gray-300">
              <Star className="w-5 h-5 text-yellow-500" />
              600 uploads per month
            </li>
            <li className="flex items-center gap-2 text-gray-300">
              <Star className="w-5 h-5 text-yellow-500" />
              Access premium moods and variations
            </li>
            <li className="flex items-center gap-2 text-gray-300">
              <Star className="w-5 h-5 text-yellow-500" />
              Priority queue + dedicated support
            </li>
          </ul>
          
          <button 
            onClick={handleSelectPackage}
            className="w-full bg-white text-gray-900 font-medium py-2 px-4 rounded-md shadow-sm hover:bg-gray-100 transition-colors"
          >
            Unlock Unlimited
          </button>
        </div>
      </div>

      <div className="mt-16 text-center text-gray-600">
        <p className="mb-2">Each upload creates a new set of creative shots.</p>
        <p className="mb-2">You always own your uploads and generated images forever.</p>
        <p>Top up anytime — your uploads never expire.</p>
      </div>
    </div>
  );
};

export default PricingPage;