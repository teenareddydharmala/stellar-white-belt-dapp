import React, { useState } from "react";
import { isConnected, requestAccess } from "@stellar/freighter-api";

function App() {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const handleConnect = async () => {
    setError("");
    try {
      if (await isConnected()) {
        const result = await requestAccess();
        if (result.address) setAddress(result.address);
        else if (result.error) setError(result.error);
      } else {
        setError("Freighter wallet not detected.");
      }
    } catch (err) {
      setError("Connection failed.");
    }
  };

  return (
    // 1. Cyber-Vogue Background: Deep Charcoal with Silver Sheen
    <div className="min-h-screen bg-[#020202] flex items-center justify-center p-6 font-sans">
      
      {/* 2. Abstract Geometric Accents: Titanium Silver & Ultraviolet */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-slate-400/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* 3. The "Liquid Metal" Glass Card */}
      <div className="relative w-full max-w-md bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-t-[3rem] rounded-b-[1rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        
        {/* Decorative Top Bar */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/20 rounded-full" />

        <header className="text-center mb-12">
          <h1 className="text-4xl font-light tracking-[0.3em] uppercase text-white mb-2">
            Lumina<span className="font-black text-purple-500">Pay</span>
          </h1>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto" />
          <p className="text-slate-500 text-[10px] uppercase tracking-[0.5em] mt-4 font-bold">White Belt Protocol</p>
        </header>

        {address ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Connected Display */}
            <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5 space-y-2">
              <span className="text-[10px] text-purple-400 uppercase tracking-widest font-bold">Active Wallet</span>
              <p className="text-slate-300 font-mono text-xs break-all leading-relaxed">
                {address}
              </p>
            </div>
            
            <button 
              onClick={() => setAddress("")}
              className="w-full py-4 rounded-2xl border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all text-sm uppercase tracking-widest"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <button 
              onClick={handleConnect}
              className="group relative w-full py-5 rounded-2xl bg-white text-black font-black text-sm uppercase tracking-[0.2em] transition-all hover:bg-purple-500 hover:text-white overflow-hidden"
            >
              <span className="relative z-10">Connect Identity</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
            {error && <p className="text-red-500 text-center text-[10px] uppercase tracking-widest font-bold animate-pulse">{error}</p>}
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
