import './App.css';
import Footer from './components/footer';
import Header from './components/header';
import Navbar from './components/navbar';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Agricultural from './components/agricultural';
import React from 'react';

function App() {
  return (
    <div className="container">
      <div className='app-grid'>
        <Header />
        <HashRouter>
          <Navbar />
          <div className='contents'>
            <Routes>
              <Route path='/agricultural' element={<Agricultural />} />
            </Routes>
          </div>
        </HashRouter>
        <Footer />
      </div>
    </div>
  );
}

export default App;
