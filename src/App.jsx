import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GalaxyUltraTitans from './GalaxyUltraTitans';
import ZFoldVisionaries from './ZFoldVisionaries';
import SSeriesSquad from './SSeriesSquad';
import GalaxyATeam from './GalaxyATeam';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/titanium" element={<GalaxyUltraTitans />} />
        <Route path="/knox" element={<ZFoldVisionaries />} />
        <Route path="/ultra" element={<SSeriesSquad />} />
        <Route path="/vision" element={<GalaxyATeam />} />
      </Routes>
    </BrowserRouter>
  );
}
