import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SearchPage from "./pages/SearchPage";
import ResultsPage from "./pages/ResultsPage";
import DetailViewPage from "./pages/DetailViewPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="results" element={<ResultsPage />} />
        <Route path="entity" element={<DetailViewPage type="entity" />} />
        <Route path="property" element={<DetailViewPage type="property" />} />
      </Routes>
    </Router>
  );
}

export default App;
