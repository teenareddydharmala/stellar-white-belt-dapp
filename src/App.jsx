import React, { useState } from "react";
import { isConnected, requestAccess, signTransaction } from "@stellar/freighter-api";
import { Horizon, TransactionBuilder, Networks, Asset } from "@stellar/stellar-sdk";

const server = new Horizon.Server("https://horizon-testnet.stellar.org");

function App() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(null);
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState({ type: '', msg: '' });

  const handleConnect = async () => {
    if (await isConnected()) {
      const result = await requestAccess();
      if (result.address) {
        setAddress(result.address);
        fetchBalance(result.address);
      }
    }
  };

  const fetchBalance = async (pubKey) => {
    try {
      const account = await server.loadAccount(pubKey);
      const native = account.balances.find(b => b.asset_type === 'native');
      setBalance(native ? native.balance : "0");
    } catch (e) { console.error(e); }
  };

  const sendXLM = async () => {
    setStatus({ type: 'loading', msg: 'Signing Transaction...' });
    try {
      const account = await server.loadAccount(address);
      const transaction = new TransactionBuilder(account, { fee: "1000", networkPassphrase: Networks.TESTNET })
        .addOperation(Asset.native().payment({ destination, amount }))
        .setTimeout(30)
        .build();

      const xdr = transaction.toXDR();
      const signedXdr = await signTransaction(xdr, { network: "TESTNET" });
      const result = await server.submitTransaction(signedXdr);
      
      setStatus({ type: 'success', msg: `Sent! Hash: ${result.hash.slice(0, 8)}...` });
      fetchBalance(address);
    } catch (e) {
      setStatus({ type: 'error', msg: 'Transaction Failed' });
    }
  };

  return (
    // 1. THE "NON-PLAIN" BACKGROUND
    <div className="relative min-h-screen w-full bg-[#030303] flex items-center justify-center p-6 overflow-hidden">
      
      {/* Animated Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-purple-900/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-900/10 rounded-full blur-[120px] animate-pulse delay-700" />
      
      {/* Moving Glass Spheres */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 border border-white/10 rounded-full blur-2xl animate-bounce duration-[10s]" />
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl animate-pulse duration-[8s]" />

      {/* 2. THE CYBER-VOGUE CARD */}
      <div className="relative z-10 w-full max-w-md bg-white/[0.01] backdrop-blur-[40px] border border-white/10 rounded-[3.5rem] p-10 shadow-[0_0_100px_rgba(0,0,0,0.8)]">
        
        <header className="text-center mb-10">
          <h1 className="text-3xl font-light tracking-[0.4em] uppercase text-white">Lumina<span className="font-black text-purple-500">Pay</span></h1>
          <div className="h-[1px] w-12 bg-purple-500/50 mx-auto mt-4" />
        </header>

        {!address ? (
          <button onClick={handleConnect} className="w-full py-6 rounded-3xl bg-white text-black font-black uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all duration-500 active:scale-95 shadow-xl">
            Authorize Identity
          </button>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            {/* Balance Widget */}
            <div className="text-center p-6 bg-white/[0.02] border border-white/5 rounded-[2.5rem]">
              <p className="text-[10px] text-purple-400 uppercase tracking-widest mb-1">Available XLM</p>
              <h2 className="text-5xl font-extralight tracking-tight">{parseFloat(balance).toLocaleString()}</h2>
            </div>

            {/* Send Form */}
            <div className="space-y-4">
              <input 
                placeholder="Destination Address (G...)" 
                className="w-full bg-black/40 border border-white/5 p-4 rounded-2xl text-xs font-mono text-slate-300 focus:border-purple-500/50 outline-none transition-all"
                onChange={(e) => setDestination(e.target.value)}
              />
              <input 
                type="number" 
                placeholder="Amount" 
                className="w-full bg-black/40 border border-white/5 p-4 rounded-2xl text-xs font-mono text-slate-300 focus:border-purple-500/50 outline-none transition-all"
                onChange={(e) => setAmount(e.target.value)}
              />
              <button 
                onClick={sendXLM}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all shadow-lg"
              >
                Execute Transfer
              </button>
              {status.msg && <p className={`text-center text-[10px] uppercase font-bold tracking-tighter ${status.type === 'error' ? 'text-red-400' : 'text-cyan-400'}`}>{status.msg}</p>}
            </div>
            
            <button onClick={() => setAddress("")} className="w-full text-slate-700 hover:text-slate-400 text-[8px] uppercase tracking-[0.3em] transition-all">TERMINATE SESSION</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
