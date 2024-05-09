import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home';
import NewEntry from './components/pages/newentry';
import Edit from './components/pages/edit';
import OpenEntry from './components/pages/open'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-entry" element={<NewEntry />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/open/:id" element={<OpenEntry />} />
      </Routes>
    </Router>
  );
}

export default App;
