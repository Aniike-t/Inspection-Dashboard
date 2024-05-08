import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home';
import NewEntry from './components/pages/newentry';
import Edit from './components/pages/edit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-entry" element={<NewEntry />} />
        <Route path="/edit/:id" element={<Edit />} /> {/* Provide the Edit component here */}
      </Routes>
    </Router>
  );
}

export default App;
