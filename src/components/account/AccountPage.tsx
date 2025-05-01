import React from 'react';
import { useApp } from '../../context/AppContext';
import { CreditCard, Package, History, Settings, LogOut } from 'lucide-react';

const AccountPage: React.FC = () => {
  const { user, logout } = useApp();

  const mockAccount = {
    credits: 47,
    activePackage: {
      name: 'Power Pack',
      creditsTotal: 50,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    },
    recentOrders: [
      {
        id: '1',
        date: new Date(),
        package: 'Power Pack',
        amount: 30.00,
        status: 'completed',
      },
      {
        id: '2',
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        package: 'Starter Shot',
        amount: 1.00,
        status: 'completed',
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Account</h1>
        <p className="text-gray-600">Manage your VisualMint account and subscriptions</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Credits & Active Package */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">Available Credits</h2>
              <span className="text-3xl font-bold text-gray-900">{mockAccount.credits}</span>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-medium text-purple-900 mb-2">Active Package: {mockAccount.activePackage.name}</h3>
              <p className="text-sm text-purple-700">
                {mockAccount.credits} of {mockAccount.activePackage.creditsTotal} credits remaining
              </p>
              <div className="mt-2 h-2 bg-purple-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-500 rounded-full"
                  style={{ width: `${(mockAccount.credits / mockAccount.activePackage.creditsTotal) * 100}%` }}
                ></div>
              </div>
            </div>

            <button className="mt-4 w-full bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors">
              Top Up Credits
            </button>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Orders</h2>
            <div className="space-y-4">
              {mockAccount.recentOrders.map(order => (
                <div key={order.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div>
                    <h3 className="font-medium text-gray-900">{order.package}</h3>
                    <p className="text-sm text-gray-500">
                      {order.date.toLocaleDateString()} · Order #{order.id}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-gray-900">${order.amount.toFixed(2)}</span>
                    <p className="text-sm text-green-600">Completed</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-teal-500" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Payment Methods</h3>
                  <p className="text-sm text-gray-500">Manage your cards</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
                  <Package className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Packages</h3>
                  <p className="text-sm text-gray-500">View available plans</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <History className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Order History</h3>
                  <p className="text-sm text-gray-500">View all transactions</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Account Settings</h3>
                  <p className="text-sm text-gray-500">Update your preferences</p>
                </div>
              </button>

              <button 
                onClick={logout}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                  <LogOut className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h3 className="font-medium text-red-600">Sign Out</h3>
                  <p className="text-sm text-red-500">Log out of your account</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;