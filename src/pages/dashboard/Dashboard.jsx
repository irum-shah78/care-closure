import React from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <div className="px-8">
          <h2 className="text-2xl font-bold mt-4">Dashboard</h2>
          <p>Welcome to the dashboard!</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
