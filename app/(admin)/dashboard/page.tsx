import React from "react";

const AdminDashboardPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <h2 className="text-zinc-500 font-medium text-sm uppercase">Total Users</h2>
          <p className="text-4xl font-bold mt-2">1,248</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <h2 className="text-zinc-500 font-medium text-sm uppercase">Active Sessions</h2>
          <p className="text-4xl font-bold mt-2">248</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <h2 className="text-zinc-500 font-medium text-sm uppercase">Sales</h2>
          <p className="text-4xl font-bold mt-2">$24,940</p>
        </div>
      </div>
      
      <div className="bg-white p-8 rounded-xl border border-zinc-200 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-zinc-100">
            <span className="text-zinc-700">New user signed up: alex@example.com</span>
            <span className="text-zinc-400 text-sm">2 mins ago</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-zinc-100">
            <span className="text-zinc-700">New order #12345 processed</span>
            <span className="text-zinc-400 text-sm">15 mins ago</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-zinc-100">
            <span className="text-zinc-700">System update completed successfully</span>
            <span className="text-zinc-400 text-sm">1 hour ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
