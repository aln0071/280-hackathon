import './App.css';
import Footer from './components/footer';
import Header from './components/header';
import Navbar from './components/navbar';
import { TimeSeries } from './components/macroeconomic/time-series';

function App() {
  return (
    <div className="container">
      <div className='app-grid'>
        <Header />
        <Navbar />
        <div className='contents'>
          <TimeSeries />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
