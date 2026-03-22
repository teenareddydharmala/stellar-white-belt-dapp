import React from "react";
import Header from "./components/Header";

function App() {
  return (
    <div className="relative min-h-screen w-full bg-[#030303] flex items-center justify-center p-6 overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-purple-900/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-900/10 rounded-full blur-[120px] animate-pulse delay-700" />
      <Header />
    </div>
  );
}

export default App;