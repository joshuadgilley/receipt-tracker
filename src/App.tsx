import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Colors from './components/Colors';
import { useState } from 'react';

function App() {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [sha, setSha] = useState("");

  const handleSuccess = (status: boolean, sha: string) => {
    setLoginSuccess(status);
    setSha(sha);
  }
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={!loginSuccess ? <Login handleSuccess={handleSuccess}/> : <Colors sha={sha}/>} />
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
