import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Resep from './pages/Resep';
import About from './pages/About';
import FoodDetail from './pages/FoodDetail';


function App() {
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resep" element={<Resep />} />
        <Route path="/food/:id" element={<FoodDetail />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;