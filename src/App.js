import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home'
import Company from './pages/Company/Company'
import Contact from './pages/Contact/Contact'
import NewProject from './pages/NewProject/NewProject'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Container from './components/Container/Container'

function App() {
  return (
    <Router>
      {/* <div>
        <Link to="/" >Home</Link>
        <Link to="/company">Sobre a empresa</Link>
        <Link to="/contact">Contato</Link>
        <Link to="/newproject">Novos Projetos</Link>
      </div> */}
      <Header />
      <Container customClass="min-height">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/company" element={<Company />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/newproject" element={<NewProject />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
