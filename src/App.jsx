import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Header from './Components/Header';
import Relogio from './Components/Relogio';
import Timer from './Components/Timer';
import Cronometro from './Components/Cronometro';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Relogio />} />
          <Route path="timer" element={<Timer />} />
          <Route path="cronometro" element={<Cronometro />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
