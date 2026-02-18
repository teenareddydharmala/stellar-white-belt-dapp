import React, { useState, useEffect } from "react";
import { isConnected, requestAccess } from "@stellar/freighter-api";

function App() {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  // Logic: Connect Wallet handler
  const handleConnect = async () => {
    setError("");
    try {
      if (await isConnected()) {
        const result = await requestAccess(); // This triggers the popup
        if (result.address) {
          setAddress(result.address);
        } else if (result.error) {
          setError(result.error);
        }
      } else {
        setError("Please install the Freighter extension first!");
      }
    } catch (err) {
      setError("Connection failed. Try again.");
    }
  };

  // Logic: Disconnect (Simple state clear)
  const handleDisconnect = () => setAddress("");

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-4">
      {/* Nebula Background Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-900/20 blur-[150px] -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-900/10 blur-[150px] -z-10" />

      <div className="w-full max-w-md bg-zinc-950/50 backdrop-blur-3xl border border-white/5 p-8 rounded-[2rem] shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            LuminaPay
          </h1>
          <p className="text-zinc-500 text-xs tracking-widest mt-2">SECURE STELLAR GATEWAY</p>
        </div>

        {address ? (
          <div className="space-y-6">
            <div className="bg-cyan-500/5 border border-cyan-500/20 p-4 rounded-2xl">
              <p className="text-[10px] text-cyan-500 uppercase font-bold mb-1">Connected Address</p>
              <p className="text-zinc-200 font-mono text-xs break-all">{address}</p>
            </div>
            <button onClick={handleDisconnect} className="w-full py-4 rounded-2xl bg-zinc-900 text-zinc-400 hover:text-white transition-colors border border-white/5">
              Disconnect
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <button 
              onClick={handleConnect}
              className="w-full py-4 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all active:scale-95"
            >
              Connect Wallet
            </button>
            {error && <p className="text-red-400 text-center text-xs">{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;