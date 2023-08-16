import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Header from './components/Header';
import Footer from './components/Footer';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import SingleProduct from './pages/SingleProduct';
import Products from './pages/Products';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/product/:id" element={<SingleProduct />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
