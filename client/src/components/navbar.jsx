import React, { useState, useEffect } from 'react';
import './navbar.css';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const Navigate =useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); 

    return () => clearInterval(interval);
  }, []);
  function handleHomePage(){
    Navigate('/')
  }
  return (
    <>
        <nav id='navbar'>
            <p id='dashboardname' onClick={handleHomePage}>Dashboard</p>
            <p id='datetime'>{currentTime.toLocaleTimeString()}<br></br> {currentTime.toLocaleDateString()}</p>
        </nav>
    </>
  );
}

export default Navbar;