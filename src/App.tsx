import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import ButterflyList from "@/pages/ButterflyList";
import ButterflyDetail from "@/pages/ButterflyDetail";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/butterflies" element={<ButterflyList />} />
        <Route path="/butterfly/:id" element={<ButterflyDetail />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}
