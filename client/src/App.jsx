import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home';
import NewEntry from './components/pages/newentry';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-entry" element={<NewEntry />} />
      </Routes>
    </Router>
  );
}

export default App;
