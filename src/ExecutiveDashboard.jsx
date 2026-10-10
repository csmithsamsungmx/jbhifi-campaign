import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { X, Trophy, AlertTriangle, TrendingUp, ChevronRight, Activity, Target, BarChart3 } from 'lucide-react';

const Header = () => (
  <header className="w-full bg-black border-b border-neutral-800 p-4 md:px-8 flex flex-col md:flex-row justify-between items-center z-10 relative">
    <div className="flex items-center gap-4 mb-4 md:mb-0">
      <div className="bg-[#FFCC00] text-black font-black text-2xl md:text-3xl italic tracking-tighter px-3 py-1 rounded-sm shadow-[0_0_15px_rgba(255,204,0,0.5)]">
        JB HI-FI
      </div>
      <div className="text-white text-xl md:text-2xl font-bold tracking-widest flex items-center gap-3">
        <X size={24} className="text-neutral-500" />
        SAMSUNG MX
      </div>
    </div>
    <div className="flex flex-col items-center md:items-end">
      <h1 className="text-white text-lg md:text-2xl font-black uppercase tracking-widest text-center md:text-right">
        Executive <span className="text-neutral-400">Overview</span>
      </h1>
      <p className="text-neutral-400 text-xs md:text-sm uppercase tracking-widest mt-1">Global Top 5 & Bottom 5</p>
    </div>
  </header>
);

const QuickLink = ({ title, url, colorClass, icon: Icon }) => (
  <a href={url} className="flex items-center justify-between p-3 bg-neutral-900 border border-neutral-800 rounded-lg hover:bg-neutral-800 transition-colors group">
    <div className="flex items-center gap-3">
      <Icon size={18} className={colorClass} />
      <span className="font-bold text-white text-sm">{title}</span>
    </div>
    <ChevronRight size={16} className="text-neutral-500 group-hover:text-white transition-colors" />
  </a>
);

const StoreCard = ({ store, rank, isBottom = false }) => {
  const targetPercent = store.target > 0 ? ((store.sales / store.target) * 100).toFixed(1) : 0;
  const cutInPercent = store.cutIn > 0 ? ((store.sales / store.cutIn) * 100).toFixed(1) : 0;
  const isFYFUnlocked = store.sales >= store.cutIn && store.cutIn > 0;

  // Tier badge styling
  const getTierColor = (tier) => {
    switch(tier) {
      case 'Titanium': return 'bg-neutral-100 text-black';
      case 'Knox': return 'bg-purple-500 text-white';
      case 'Ultra': return 'bg-emerald-500 text-white';
      case 'Vision': return 'bg-cyan-500 text-black';
      default: return 'bg-neutral-700 text-white';
    }
  };

  return (
    <div className={`flex flex-col p-4 rounded-xl border ${isBottom ? 'bg-red-950/10 border-red-900/30' : 'bg-neutral-900/50 border-neutral-800'} hover:bg-neutral-800/80 transition-colors relative overflow-hidden group`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className={`font-black text-xl ${isBottom ? 'text-red-500/50' : 'text-yellow-500/80'}`}>
            #{rank}
          </div>
          <div>
            <h4 className="font-bold text-white md:text-lg leading-tight">{store.name}</h4>
            <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${getTierColor(store.tier)}`}>
              {store.tier}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-neutral-400 font-medium uppercase tracking-wider mb-0.5">Total Sales</div>
          <div className={`text-xl font-black ${isBottom ? 'text-red-400' : 'text-green-400'}`}>{store.sales}</div>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 gap-4 mt-2 p-3 bg-black/40 rounded-lg border border-black/50">
        <div>
          <div className="flex justify-between text-[10px] text-neutral-400 mb-1">
            <span>To Cut-in</span>
            <span className={isFYFUnlocked ? 'text-blue-400 font-bold' : ''}>{cutInPercent}%</span>
          </div>
          <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
            <div className={`h-full ${isFYFUnlocked ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]' : 'bg-neutral-500'}`} style={{ width: `${Math.min(cutInPercent, 100)}%` }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-[10px] text-neutral-400 mb-1">
            <span>To Target</span>
            <span className={store.sales >= store.target ? 'text-green-400 font-bold' : ''}>{targetPercent}%</span>
          </div>
          <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
            <div className={`h-full ${store.sales >= store.target ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]' : 'bg-neutral-500'}`} style={{ width: `${Math.min(targetPercent, 100)}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ExecutiveDashboard() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  // Array of all your campaign CSV links mapped to their respective tier names
  const SHEETS = [
    { name: 'Titanium', url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSrXl7Scqf1VBbVtF6fDfwuklrIsdVI2fTInCoQ3UJqn3OwUIUS5M0uAQwxDs0Zq61Pg6xQD60ZFl7Y/pub?gid=0&single=true&output=csv" },
    { name: 'Knox', url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSrXl7Scqf1VBbVtF6fDfwuklrIsdVI2fTInCoQ3UJqn3OwUIUS5M0uAQwxDs0Zq61Pg6xQD60ZFl7Y/pub?gid=1502747918&single=true&output=csv" },
    { name: 'Ultra', url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSrXl7Scqf1VBbVtF6fDfwuklrIsdVI2fTInCoQ3UJqn3OwUIUS5M0uAQwxDs0Zq61Pg6xQD60ZFl7Y/pub?gid=1077907476&single=true&output=csv" },
    { name: 'Vision', url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSrXl7Scqf1VBbVtF6fDfwuklrIsdVI2fTInCoQ3UJqn3OwUIUS5M0uAQwxDs0Zq61Pg6xQD60ZFl7Y/pub?gid=2070861314&single=true&output=csv" }
  ];

  useEffect(() => {
    // Fetch all 4 sheets simultaneously
    const fetchAllData = async () => {
      try {
        const promises = SHEETS.map(sheet => {
          return new Promise((resolve) => {
            Papa.parse(sheet.url, {
              download: true,
              header: true,
              complete: (results) => {
                const parsed = results.data
                  .filter(row => row.Store)
                  .map(row => ({
                    name: row.Store,
                    tier: sheet.name,
                    sales: Number(row.Sales) || 0,
                    target: Number(row.Target) || 0,
                    cutIn: Number(row["Cut-in"]) || Number(row.Cutin) || 0
                  }));
                resolve(parsed);
              },
              error: () => resolve([]) // fail gracefully for individual sheets
            });
          });
        });

        const allResults = await Promise.all(promises);
        // Flatten the array of arrays into one master list of all stores
        const masterList = allResults.flat();
        
        // Sort by % to target to determine true overall performance
        masterList.sort((a, b) => {
          const aPercent = a.target > 0 ? a.sales / a.target : 0;
          const bPercent = b.target > 0 ? b.sales / b.target : 0;
          if (bPercent !== aPercent) return bPercent - aPercent;
          return b.sales - a.sales; // Break ties with raw sales volume
        });

        setStores(masterList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching master data:", error);
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const top5 = stores.slice(0, 5);
  // Bottom 5 excludes any stores with literally 0 target to avoid broken data, taking the lowest percentages
  const bottom5 = [...stores].filter(s => s.target > 0).slice(-5).reverse();

  return (
    <>
      <style>{`body { background-color: #050505; color: white; margin: 0; font-family: system-ui, -apple-system, sans-serif; }`}</style>
      <div className="min-h-screen bg-[#050505] flex flex-col font-sans relative overflow-x-hidden">
        <div className="fixed top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none z-0"></div>
        
        <Header />

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 relative z-10">
          
          {/* Quick Links Header */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            <QuickLink title="Titanium" url="/titanium" icon={Trophy} colorClass="text-neutral-300" />
            <QuickLink title="Knox" url="/knox" icon={Target} colorClass="text-purple-400" />
            <QuickLink title="Ultra" url="/ultra" icon={Activity} colorClass="text-emerald-400" />
            <QuickLink title="Vision" url="/vision" icon={BarChart3} colorClass="text-cyan-400" />
          </div>

          {loading ? (
            <div className="w-full text-center py-32 text-neutral-400 flex flex-col items-center font-bold text-lg animate-pulse">
                Aggregating National Data...
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              
              {/* TOP 5 COLUMN */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-500/20 rounded-lg border border-green-500/30">
                    <TrendingUp className="text-green-400" size={24} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                    Top 5 Performers
                  </h2>
                </div>
                
                <div className="space-y-4">
                  {top5.map((store, index) => (
                    <StoreCard key={`top-${index}`} store={store} rank={index + 1} />
                  ))}
                </div>
              </div>

              {/* BOTTOM 5 COLUMN */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-red-500/20 rounded-lg border border-red-500/30">
                    <AlertTriangle className="text-red-400" size={24} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-600">
                    Opportunity Stores
                  </h2>
                </div>
                
                <div className="space-y-4">
                  {bottom5.map((store, index) => (
                    <StoreCard key={`bottom-${index}`} store={store} rank={stores.length - index} isBottom={true} />
                  ))}
                </div>
              </div>

            </div>
          )}
        </main>
      </div>
    </>
  );
}