import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import Home from './pages/Home';
import Asobiba from './pages/Asobiba';
import MLB from './pages/projects/MLB';
import Charisma from './pages/projects/charisma';
import About from "./pages/About"

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles/global.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="asobiba" element={<Asobiba />} />
          <Route path="about" element={<About />} />
          <Route path="mlb" element={<MLB />} />
          <Route path="charisma-cafe" element={<Charisma />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
