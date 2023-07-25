import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import SingleProduct from './pages/SingleProduct';
import Contact from './pages/Contact';
import Inquiry from './pages/Inquiry';
import Footer from './components/Footer';
import About from './pages/About';

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>


      <BrowserRouter>
        <Navbar />
        <Routes>
            <Route index element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='product' element={<Products />} />
            <Route path="product/:id" element={<SingleProduct />} />
            <Route path="contact" element={<Contact />} />
            <Route path="inquiry" element={<Inquiry />} />
          
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
