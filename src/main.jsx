import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

import ExecutiveDashboard from './ExecutiveDashboard.jsx'
import GalaxyUltraTitans from './GalaxyUltraTitans.jsx'
import ZFoldVisionaries from './ZFoldVisionaries.jsx'
import SSeriesSquad from './SSeriesSquad.jsx'
import GalaxyATeam from './GalaxyATeam.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* The base URL now shows a practically invisible, blank black screen to hide the rest of the site */}
        <Route path="/" element={<div className="min-h-screen bg-[#050505] flex items-center justify-center text-neutral-900 font-sans text-xs">Campaign Active</div>} />
        
        {/* Your hidden Executive Dashboard - only accessible if you know the exact link */}
        <Route path="/hq-overview" element={<ExecutiveDashboard />} />
        
        {/* The individual Tier Leaderboards for the stores */}
        <Route path="/titanium" element={<GalaxyUltraTitans />} />
        <Route path="/knox" element={<ZFoldVisionaries />} />
        <Route path="/ultra" element={<SSeriesSquad />} />
        <Route path="/vision" element={<GalaxyATeam />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)