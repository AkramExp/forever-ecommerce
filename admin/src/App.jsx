import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <>
        <Navbar />
        <hr className="border-gray-300" />
        <div className="w-full flex">
          <Sidebar />
        </div>
      </>
    </div>
  );
};

export default App;
