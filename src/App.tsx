import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import ButterflyList from "@/pages/ButterflyList";
import ButterflyDetail from "@/pages/ButterflyDetail";
import MapExplorer from "@/pages/MapExplorer";
import FamilyTree from "@/pages/FamilyTree";
import FlightObservation from "@/pages/FlightObservation";
import SpecimenMuseum from "@/pages/SpecimenMuseum";
import SpecimenDetail from "@/pages/SpecimenDetail";
import ButterflyCompareLab from "@/pages/ButterflyCompareLab";
import DiscoveryTimeline from "@/pages/DiscoveryTimeline";
import RareButterflyArchive from "@/pages/RareButterflyArchive";
import RareButterflyDetail from "@/pages/RareButterflyDetail";
import PatternRecognition from "@/pages/PatternRecognition";
import ObservationCalendar from "@/pages/ObservationCalendar";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapExplorer />} />
        <Route path="/butterflies" element={<ButterflyList />} />
        <Route path="/butterfly/:id" element={<ButterflyDetail />} />
        <Route path="/family-tree" element={<FamilyTree />} />
        <Route path="/flight-observation" element={<FlightObservation />} />
        <Route path="/specimen-museum" element={<SpecimenMuseum />} />
        <Route path="/specimen/:id" element={<SpecimenDetail />} />
        <Route path="/compare-lab" element={<ButterflyCompareLab />} />
        <Route path="/discovery-timeline" element={<DiscoveryTimeline />} />
        <Route path="/rare-archive" element={<RareButterflyArchive />} />
        <Route path="/rare-butterfly/:id" element={<RareButterflyDetail />} />
        <Route path="/pattern-recognition" element={<PatternRecognition />} />
        <Route path="/observation-calendar" element={<ObservationCalendar />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}
