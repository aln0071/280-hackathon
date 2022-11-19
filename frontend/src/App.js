import './App.css';
import Footer from './components/footer';
import Header from './components/header';
import Navbar from './components/navbar';

function App() {
  return (
    <div className="container">
      <div className='app-grid'>
        <Header />
        <Navbar />
        <div className='contents'>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
