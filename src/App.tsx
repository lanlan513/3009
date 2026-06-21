import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import ButterflyList from "@/pages/ButterflyList";
import ButterflyDetail from "@/pages/ButterflyDetail";
import MapExplorer from "@/pages/MapExplorer";
import FamilyTree from "@/pages/FamilyTree";
import FlightObservation from "@/pages/FlightObservation";
import SpecimenMuseum from "@/pages/SpecimenMuseum";
import SpecimenDetail from "@/pages/SpecimenDetail";

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
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}
