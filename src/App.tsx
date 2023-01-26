import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PricingPage from './components/PricingPage';
import { useState } from 'react';

function App() {
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleSuccess = (status: boolean) => {
    setLoginSuccess(status);
  }
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={!loginSuccess ? <Login handleSuccess={handleSuccess}/> : <PricingPage />} />
          </Routes>
          <Routes>
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
