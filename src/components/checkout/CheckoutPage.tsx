import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CreditCard, Lock, ArrowRight, Shield, Sparkles } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

// Test publishable key
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const CheckoutPage: React.FC = () => {
  const { setActiveStep } = useApp();
  const [selectedPlan] = useState('starter');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleCheckout = async () => {
    setIsProcessing(true);
    
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      // This would normally come from your backend
      const testSession = {
        id: 'cs_test_' + Math.random().toString(36).substr(2, 9),
        amount: 100, // $1.00
        currency: 'usd',
        payment_method_types: ['card'],
      };

      // Simulate a successful payment
      setTimeout(() => {
        setActiveStep('account');
        setIsProcessing(false);
      }, 2000);

    } catch (error) {
      console.error('Payment error:', error);
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Checkout Form */}
        <div>
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Purchase</h1>
            <p className="text-gray-600">You're just one step away from creating amazing visuals.</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <h2 className="font-medium text-gray-900">Starter Shot</h2>
                <p className="text-sm text-gray-500">1 upload = 3 creative shots</p>
              </div>
              <div className="ml-auto">
                <span className="text-2xl font-bold text-gray-900">$1</span>
              </div>
            </div>

            <div className="pt-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="w-4 h-4" />
                100% satisfaction guarantee
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="font-medium text-gray-900 mb-4">Test Card Details</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <div className="relative">
                  <CreditCard className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    id="cardNumber"
                    value="4242 4242 4242 4242"
                    readOnly
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">Use this test card number</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiry"
                    value="12/25"
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>
                
                <div>
                  <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">
                    CVC
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      id="cvc"
                      value="123"
                      readOnly
                      className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full mt-6 bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-md shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Complete Purchase
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          <p className="mt-4 text-center text-sm text-gray-500">
            This is a test mode. No real payments will be processed.
          </p>
        </div>

        {/* Order Summary */}
        <div className="lg:pl-12">
          <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
            <h2 className="text-lg font-medium text-gray-900 mb-4">What's Included</h2>
            
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4 text-teal-500" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">1 Original Upload</h3>
                  <p className="text-sm text-gray-600">Upload any product photo to transform</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">3 Creative Variations</h3>
                  <p className="text-sm text-gray-600">Get three unique creative interpretations</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Shield className="w-4 h-4 text-indigo-500" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">100% Satisfaction Guarantee</h3>
                  <p className="text-sm text-gray-600">Not happy? Get a full refund, no questions asked</p>
                </div>
              </li>
            </ul>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-900">$1.00</span>
              </div>
              <div className="flex justify-between items-center font-medium">
                <span className="text-gray-900">Total</span>
                <span className="text-xl text-gray-900">$1.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;