import './App.css';
import Footer from './components/footer';
import Header from './components/header';
import Navbar from './components/navbar';
import MacroEconomic  from './components/macroeconomic';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Agricultural from './components/agricultural';
import CropsMango from './components/maps/indexMango';
import CropsWalnut from './components/maps/indexWalnut';
import Crops from './components/maps';
import React, { useEffect } from 'react';
import WalnutsIran from './components/speciality-crops/walnuts-iran';
import PhilippinesMango from './components/speciality-crops/philippines-mango';

function App() {

  useEffect(() => {
    if(localStorage.getItem("foodResearcher")===null){
      localStorage.setItem("foodResearcher",false)

    }
}, [])

  return (
    <div className="my-container">
      <div className='app-grid'>
        <Header />
        <HashRouter>
          <Navbar />
          <div className='contents'>
            <Routes>
              <Route path='/philippines-mango' element={<PhilippinesMango />} />
              <Route path='/walnuts-iran' element={<WalnutsIran />} />
              <Route path='/agricultural' element={<Agricultural />} />
              <Route path='/crops' element={<Crops />} />
              <Route path='/crops-mango' element={<CropsMango />} />
              <Route path='/crops-walnut' element={<CropsWalnut />} />
              <Route path='/' element={<MacroEconomic />} />
            </Routes>
          </div>
        </HashRouter>
        <Footer />
      </div>
    </div>
  );
}

export default App;
