import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import Layout from './components/Layout';
import Home from './pages/Home';

// Future pages — uncomment as you build them:
// import Projects from './pages/Projects';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import MLBPage from './pages/projects/MLB';
// import KissaTanpopo from './pages/projects/KissaTanpopo';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles/global.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* Uncomment as you build: */}
          {/* <Route path="project" element={<Projects />} /> */}
          {/* <Route path="about" element={<About />} /> */}
          {/* <Route path="contact" element={<Contact />} /> */}
          {/* <Route path="project/mlb" element={<MLBPage />} /> */}
          {/* <Route path="project/kissa-tanpopo" element={<KissaTanpopo />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
