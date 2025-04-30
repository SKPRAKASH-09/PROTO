import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer'; // Added missing Footer import
import { Outlet } from 'react-router-dom'; // Added Outlet import

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="px-12 md:px-32 lg:px-64"> {/* Fixed className */}
        <Outlet /> {/* Fixed Outlet */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;