import React, { useState } from "react";
import { checkConnection, retrievePublicKey, getPreciseData, sendXLM } from "./freighter";

const Header = () => {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("0.0000000");
  const [history, setHistory] = useState([]);
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [loading, setLoading] = useState(false);

  const syncData = async () => {
    try {
      const data = await getPreciseData();
      setBalance(data.balance);
      setHistory(data.history);
    } catch (e) { console.error("Sync failed", e); }
  };

  const connectWallet = async () => {
    try {
      const allowed = await checkConnection();
      if (!allowed) return alert("Please allow Freighter access.");
      const key = await retrievePublicKey();
      setAddress(key);
      setConnected(true);
      await syncData();
    } catch (e) { alert("Failed to connect: " + e.message); }
  };

  const handleSend = async () => {
    if (!destination || !amount) return alert("Fill all fields");
    setLoading(true);
    setStatus({ type: 'loading', msg: 'Transmitting to Ledger...' });
    try {
      const res = await sendXLM(destination, amount);
      setStatus({ type: 'success', msg: `Confirmed! Hash: ${res.hash.slice(0, 8)}` });
      await syncData();
    } catch (e) {
      setStatus({ type: 'error', msg: 'Transfer Failed' });
      alert(e.message);
    } finally { setLoading(false); }
  };

  return (
    <div className="relative z-10 w-full max-w-md bg-white/[0.01] backdrop-blur-[40px] border border-white/10 rounded-[3.5rem] p-10 shadow-2xl text-white">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-light tracking-[0.4em] uppercase">Lumina<span className="font-black text-purple-500">Pay</span></h1>
        <div className="h-[1px] w-12 bg-purple-500/50 mx-auto mt-4" />
      </header>

      {!connected ? (
        <button onClick={connectWallet} className="w-full py-6 rounded-3xl bg-white text-black font-black uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all shadow-xl">
          Authorize Identity
        </button>
      ) : (
        <div className="space-y-6 animate-in fade-in duration-1000">
          <div className="text-center p-6 bg-white/[0.02] border border-white/5 rounded-[2.5rem]">
            <p className="text-[10px] text-purple-400 uppercase tracking-widest mb-1">Precise XLM Balance</p>
            <h2 className="text-3xl font-mono">{balance}</h2>
          </div>

          <div className="space-y-4">
            <input placeholder="Destination Address" className="w-full bg-black/40 border border-white/5 p-4 rounded-2xl text-xs font-mono outline-none focus:border-purple-500/50" onChange={(e) => setDestination(e.target.value)} />
            <input type="number" placeholder="Amount" className="w-full bg-black/40 border border-white/5 p-4 rounded-2xl text-xs font-mono outline-none focus:border-purple-500/50" onChange={(e) => setAmount(e.target.value)} />
            <button onClick={handleSend} disabled={loading} className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 font-bold text-xs uppercase tracking-widest active:scale-95 transition-all">
              {loading ? "Processing..." : "Execute Transfer"}
            </button>
            {status.msg && <p className={`text-center text-[10px] font-bold uppercase ${status.type === 'error' ? 'text-red-400' : 'text-cyan-400'}`}>{status.msg}</p>}
          </div>

          <div className="pt-4 border-t border-white/5">
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-3">Immutable Ledger History</p>
            <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
              {history.map((tx) => (
                <div key={tx.id} className="p-3 bg-white/5 rounded-xl border border-white/5 flex justify-between items-center text-[9px]">
                  <div className="flex flex-col">
                    <span className={tx.to === address ? "text-cyan-400" : "text-purple-400"}>{tx.to === address ? "RECEIVED" : "SENT"}</span>
                    <a href={`https://stellar.expert/explorer/testnet/tx/${tx.transaction_hash}`} target="_blank" rel="noreferrer" className="text-slate-500 font-mono hover:text-white transition-all">{tx.transaction_hash.slice(0, 12)}...</a>
                  </div>
                  <span className="font-mono">{tx.amount} XLM</span>
                </div>
              ))}
            </div>
          </div>
          
          <button onClick={() => setConnected(false)} className="w-full text-slate-700 hover:text-slate-400 text-[8px] uppercase tracking-[0.3em]">TERMINATE SESSION</button>
        </div>
      )}
    </div>
  );
};

export default Header;