import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Footer from "./components/Footer/Footer";
import EquipmentPage from "./pages/EquipmentPage/EquipmentPage";
import ApplicationPage from "./pages/ApplicationPage/ApplicationPage"

const App = () => {
  document.title = "Eagle Axis"; // shtohet logjika më vonë

  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <div className="absolute top-0 left-0 w-full z-50">
          <NavBar />
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/apply-now" element={<ApplicationPage />} />
          <Route path="/equipment" element={<EquipmentPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
