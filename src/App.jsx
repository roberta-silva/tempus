import React from 'react';
import './App.css';
import { HashRouter, Route, Routes } from 'react-router';
import Header from './Components/Header';
import Relogio from './Components/Relogio';
import Timer from './Components/Timer';
import Cronometro from './Components/Cronometro';

function App() {
  return (
    <>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Relogio />} />
          <Route path="timer" element={<Timer />} />
          <Route path="cronometro" element={<Cronometro />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
