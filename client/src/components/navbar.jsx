import React, { useState, useEffect } from 'react';
import './navbar.css';

function Navbar() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <>
        <nav id='navbar'>
            <p id='dashboardname'>Dashboard</p>
            <p id='datetime'>{currentTime.toLocaleTimeString()}<br></br> {currentTime.toLocaleDateString()}</p>
        </nav>
    </>
  );
}

export default Navbar;