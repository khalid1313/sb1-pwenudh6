import React, { useState } from 'react';
import AuthForm from './AuthForm';

const LoginPage: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  return (
    <div className="max-w-md mx-auto w-full py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {mode === 'login' ? 'Sign In to VisualMint' : 'Join VisualMint'}
        </h1>
        <p className="text-gray-600">
          {mode === 'login'
            ? 'Welcome back! Please enter your details.'
            : 'Start creating amazing visuals today.'}
        </p>
      </div>

      <AuthForm mode={mode} />

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            {mode === 'login' ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;