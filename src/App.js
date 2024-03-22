import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ShowData from './pages/ShowData';
import SignIn from './pages/SignIn';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path='/System' element={<Homepage />} />
        <Route path='/toPrint' element={<ShowData />} />
        <Route path='/' element={<SignIn />} />
        <Route path='/Recover' element={<ForgotPassword />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
