import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ShowData from './pages/ShowData';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/toPrint' element={<ShowData />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
