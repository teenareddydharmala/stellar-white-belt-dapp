import React, { useState, useEffect } from "react";
import { isConnected, requestAccess } from "@stellar/freighter-api";
import { Horizon } from "@stellar/stellar-sdk";

// Connect to Testnet Horizon
const server = new Horizon.Server("https://horizon-testnet.stellar.org");

function App() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchBalance = async (pubKey) => {
    setLoading(true);
    try {
      const account = await server.loadAccount(pubKey); // Requirement #3: Fetching account
      const nativeBalance = account.balances.find(b => b.asset_type === 'native');
      setBalance(nativeBalance ? nativeBalance.balance : "0");
    } catch (err) {
      console.error("Balance fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async () => {
    if (await isConnected()) {
      const result = await requestAccess(); // Requirement #2: Wallet Connect
      if (result.address) {
        setAddress(result.address);
        fetchBalance(result.address); // Trigger balance fetch immediately
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white flex items-center justify-center p-6">
      <div className="relative w-full max-w-md bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 shadow-2xl">
        
        <header className="text-center mb-12">
          <h1 className="text-4xl font-light tracking-[0.3em] uppercase">
            Lumina<span className="font-black text-purple-500">Pay</span>
          </h1>
          <p className="text-slate-500 text-[10px] uppercase tracking-[0.5em] mt-4 font-bold">Identity & Assets</p>
        </header>

        {!address ? (
          <button onClick={handleConnect} className="w-full py-5 rounded-2xl bg-white text-black font-black uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-all">
            Connect Identity
          </button>
        ) : (
          <div className="space-y-6 animate-in fade-in zoom-in duration-500">
            {/* Balance Display: Requirement #3 */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-900/20 to-transparent border border-purple-500/20 text-center">
              <span className="text-[10px] text-purple-400 uppercase tracking-widest font-bold">XLM Balance</span>
              <div className="text-5xl font-light mt-2">
                {loading ? "..." : parseFloat(balance).toLocaleString()}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5">
              <span className="text-[8px] text-slate-500 uppercase font-bold block mb-1">Vault Address</span>
              <p className="text-[10px] font-mono text-slate-400 break-all">{address}</p>
            </div>
            
            <button onClick={() => setAddress("")} className="w-full text-slate-600 hover:text-white text-[10px] uppercase tracking-widest transition-colors">
              Reset Session
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
