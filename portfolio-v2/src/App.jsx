import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import Layout from './components/Layout';
import Home from './pages/Home';
import MLB from './pages/projects/MLB';

// Uncomment as you build:
// import KissaTanpopo from './pages/projects/KissaTanpopo';
// import Projects from './pages/Projects';
// import About from './pages/About';
// import Contact from './pages/Contact';

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
          <Route path="project/mlb" element={<MLB />} />
          {/* <Route path="project/kissa-tanpopo" element={<KissaTanpopo />} /> */}
          {/* <Route path="project" element={<Projects />} /> */}
          {/* <Route path="about" element={<About />} /> */}
          {/* <Route path="contact" element={<Contact />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
