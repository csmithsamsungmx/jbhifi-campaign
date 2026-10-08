import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GalaxyUltraTitans from './GalaxyUltraTitans';
import ZFoldVisionaries from './ZFoldVisionaries';
import SSeriesSquad from './SSeriesSquad';
import GalaxyATeam from './GalaxyATeam';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/titans" element={<GalaxyUltraTitans />} />
        <Route path="/visionaries" element={<ZFoldVisionaries />} />
        <Route path="/s-squad" element={<SSeriesSquad />} />
        <Route path="/a-team" element={<GalaxyATeam />} />
      </Routes>
    </BrowserRouter>
  );
}
