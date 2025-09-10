import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LinkVault from "./pages/LinkVault";
import Gallery from "./pages/Gallery";
import Event from "./pages/Event";
import Feedback from "./pages/Feedback";
import Contact from "./pages/Contact";
import "./App.css";
const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main">
          <Routes>
            <Route path="/" element={<LinkVault />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/event" element={<Event />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};
export default App;
