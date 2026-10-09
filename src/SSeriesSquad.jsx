import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { X, Search, Gift } from 'lucide-react';

const Header = ({ title }) => (
  <header className="w-full bg-black border-b border-neutral-800 p-4 md:px-8 flex flex-col md:flex-row justify-between items-center z-10 relative">
    <div className="flex items-center gap-4 mb-4 md:mb-0">
      <div className="bg-[#FFCC00] text-black font-black text-2xl md:text-3xl italic tracking-tighter px-3 py-1 rounded-sm shadow-[0_0_15px_rgba(255,204,0,0.5)]">
        JB HI-FI
      </div>
      <div className="text-white text-xl md:text-2xl font-bold tracking-widest flex items-center gap-3">
        <X size={24} className="text-neutral-500" />
        SAMSUNG
      </div>
    </div>
    <div className="flex flex-col items-center md:items-end">
      <h1 className="text-white text-lg md:text-2xl font-black uppercase tracking-widest text-center md:text-right">
        Black Friday <span className="text-neutral-400 drop-shadow-[0_0_10px_rgba(163,163,163,0.8)]">Incentive</span>
      </h1>
      <p className="text-neutral-400 text-xs md:text-sm uppercase tracking-widest mt-1">Live % Leaderboard</p>
    </div>
  </header>
);

const ProgressBar = ({ sales, cutIn, target }) => {
  const salesPercent = Math.min((sales / target) * 100, 100);
  const cutInPercent = Math.min((cutIn / target) * 100, 100);
  const isCutInMet = sales >= cutIn;
  const isTargetMet = sales >= target;
  const actualPercent = ((sales / target) * 100).toFixed(1);

  const labelTransform = cutInPercent > 80 ? 'translateX(-100%)' : 'translateX(-50%)';
  const labelMargin = cutInPercent > 80 ? '-6px' : '0px';

  return (
    <div className="w-full flex flex-col justify-center">
        <div className="flex justify-between text-[10px] md:text-xs mb-1">
            <span className="text-neutral-400 font-medium">Sales: {sales}</span>
            <span className={`font-black transition-colors duration-500 ${isTargetMet ? 'text-green-400 animate-pulse' : isCutInMet ? 'text-blue-400' : 'text-neutral-300'}`}>
                {actualPercent}%
            </span>
        </div>
        <div className="w-full bg-neutral-800 h-2 md:h-3 rounded-full relative">
            <div
                className={`h-full rounded-full transition-all duration-1000 ease-out ${isTargetMet ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]' : isCutInMet ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-neutral-500'}`}
                style={{ width: `${salesPercent}%` }}
            ></div>
            <div
                className={`absolute top-[-4px] bottom-[-4px] w-1.5 z-10 rounded-sm border border-black transition-colors duration-500 ${isCutInMet ? 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,1)]' : 'bg-yellow-400 shadow-[0_0_5px_rgba(250,204,21,1)]'}`}
                style={{ left: `${cutInPercent}%`, transform: 'translateX(-50%)' }}
                title={`Cut-in: ${cutIn}`}
            ></div>
        </div>
        <div className="flex justify-between text-[9px] md:text-[10px] text-neutral-500 mt-1 relative h-4">
            <span>0</span>
            <span
                style={{
                    position: 'absolute',
                    left: `${cutInPercent}%`,
                    transform: labelTransform,
                    marginLeft: labelMargin
                }}
                className={`font-bold whitespace-nowrap transition-all duration-500 ${isCutInMet ? 'text-blue-400 drop-shadow-[0_0_5px_rgba(96,165,250,0.8)]' : 'text-yellow-500/90'}`}
            >
                {isCutInMet ? '✓ $100 FYF' : `Cut-in (${cutIn})`}
            </span>
            <span className={isTargetMet ? 'text-green-400 font-bold drop-shadow-[0_0_5px_rgba(34,197,94,0.8)]' : ''}>
                Target ({target})
            </span>
        </div>
    </div>
  );
};

const RankList = ({ data, startIndex = 1 }) => {
  if (!data || data.length === 0) return null;

  const getRankStyle = (index) => {
    const rank = index + startIndex;
    if (rank === 1) return "text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.8)] animate-pulse scale-110";
    if (rank === 2) return "text-gray-300 drop-shadow-[0_0_8px_rgba(209,213,219,0.5)]";
    if (rank === 3) return "text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]";
    return "text-neutral-500";
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-neutral-900/80 backdrop-blur-md rounded-xl border border-neutral-800 shadow-2xl overflow-hidden mb-12">
      <div className="divide-y divide-neutral-800/50">
        {data.map((item, index) => {
          const isCutInMet = item.sales >= item.cutIn;
          const isTargetMet = item.sales >= item.target;

          return (
            <div key={item.id} className="grid grid-cols-12 gap-2 md:gap-6 p-4 md:p-6 items-center hover:bg-neutral-800 hover:scale-[1.01] transition-all duration-300 ease-out group cursor-default">
               <div className={`col-span-2 md:col-span-1 text-center font-black text-xl md:text-2xl transition-all ${getRankStyle(index)}`}>
                   #{index + startIndex}
               </div>
               <div className="col-span-10 md:col-span-4 flex flex-col justify-center">
                   <div className="font-bold text-white text-sm md:text-lg truncate group-hover:text-neutral-200 transition-colors">
                       {item.name}
                   </div>
                   <div className="h-5 mt-0.5 flex items-center">
                     {isCutInMet && (
                        <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border ${isTargetMet ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-blue-500/20 text-blue-400 border-blue-500/50'} animate-in fade-in slide-in-from-left-2 duration-500`}>
                          <Gift size={12} className={isTargetMet ? 'text-green-400' : 'text-blue-400'} />
                          $100 FYF Unlocked!
                        </div>
                     )}
                   </div>
               </div>
               <div className="col-span-12 md:col-span-7 mt-2 md:mt-0">
                   <ProgressBar sales={item.sales} cutIn={item.cutIn} target={item.target} />
               </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // IMPORTANT: Paste your actual Google Sheets CSV link here!
  const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSrXl7Scqf1VBbVtF6fDfwuklrIsdVI2fTInCoQ3UJqn3OwUIUS5M0uAQwxDs0Zq61Pg6xQD60ZFl7Y/pub?gid=1077907476&single=true&output=csv";

  useEffect(() => {
    Papa.parse(GOOGLE_SHEET_CSV_URL, {
      download: true,
      header: true,
      complete: (results) => {
        const liveData = results.data
          .filter(row => row.Store) 
          .map((row, index) => ({
            id: index,
            name: row.Store,
            sales: Number(row.Sales) || 0,
            target: Number(row.Target) || 0,
            cutIn: Number(row.Cutin) || 0
          }));
        
        setData(liveData);
        setLoading(false);
      },
      error: (error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    });
  }, []);

  const title = "Ultra";
  
  const sortedData = [...data].sort((a, b) => {
     const aPercent = a.sales / a.target;
     const bPercent = b.sales / b.target;
     if (bPercent !== aPercent) return bPercent - aPercent;
     return b.sales - a.sales;
  });

  return (
    <>
      <style>{`body { background-color: #050505; color: white; margin: 0; font-family: system-ui, -apple-system, sans-serif; }`}</style>
      <div className="min-h-screen bg-[#050505] flex flex-col font-sans relative overflow-x-hidden">
        <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-neutral-600/10 to-transparent pointer-events-none z-0"></div>
        <div className="fixed top-[-20%] right-[-10%] w-[50%] h-[50%] bg-neutral-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
        
        <Header title={title} />

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 relative z-10 flex flex-col items-center">
          
          <div className="flex flex-col items-center w-full max-w-4xl mx-auto mb-8 px-2 mt-4 gap-4">
             <h3 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-500 tracking-wide uppercase drop-shadow-lg text-center">
                {title}
             </h3>
             <div className="flex flex-wrap justify-center items-center gap-4 mt-2">
                 <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 bg-neutral-900 px-3 py-1 rounded-full border border-neutral-800"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Cut-in Met</div>
                 <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 bg-neutral-900 px-3 py-1 rounded-full border border-neutral-800"><div className="w-2 h-2 rounded-full bg-green-500"></div> Target Reached</div>
             </div>
          </div>

          <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-500 mt-4 md:mt-8">
            {loading ? (
                <div className="w-full text-center py-20 text-neutral-400 flex flex-col items-center font-bold text-lg animate-pulse">
                    Connecting to Live Data...
                </div>
            ) : sortedData.length > 0 ? (
               <RankList data={sortedData} startIndex={1} />
            ) : (
               <div className="w-full text-center py-20 text-neutral-500 flex flex-col items-center">
                  <Search size={48} className="mb-4 opacity-20" />
                  <p>No store data available for this group.</p>
               </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}