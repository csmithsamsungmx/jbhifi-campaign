import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

// Import your new dashboards
import ExecutiveDashboard from './ExecutiveDashboard.jsx'
import GalaxyUltraTitans from './GalaxyUltraTitans.jsx'
import ZFoldVisionaries from './ZFoldVisionaries.jsx'
import SSeriesSquad from './SSeriesSquad.jsx'
import GalaxyATeam from './GalaxyATeam.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ExecutiveDashboard />} />
        <Route path="/titanium" element={<GalaxyUltraTitans />} />
        <Route path="/knox" element={<ZFoldVisionaries />} />
        <Route path="/ultra" element={<SSeriesSquad />} />
        <Route path="/vision" element={<GalaxyATeam />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)