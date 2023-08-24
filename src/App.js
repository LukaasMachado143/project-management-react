import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home'
import Company from './pages/Company/Company'
import Contact from './pages/Contact/Contact'
import NewProject from './pages/NewProject/NewProject'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Container from './components/Container/Container'
import Projects from "./pages/Projects/Projects";

function App() {
  return (
    <Router>
      <Header />
      <Container customClass="min-height">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/company" element={<Company />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/newproject" element={<NewProject />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
