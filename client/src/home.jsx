import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import { Link } from 'react-router-dom';
import './home.css';

function Home() {
  // State to store the fetched data
  const [data, setData] = useState([]);
  // State for loading and error handling
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    fetchData();
  }, []);

  // Function to fetch data from the backend
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/data'); // Replace with your backend URL
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setData(jsonData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  // Function to render cards dynamically
  const renderCards = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    } else if (error) {
      return <div>Error loading: {error}</div>;
    } else {
      return data.map((item) => (
        <div key={item.id} className="card">
          <h2>{item.vendorName}</h2>
          <p>L&T PO Number: {item.lntPoNumber}</p>
          <p>Project Number: {item.projectNumber}</p>
          <p>Project Name: {item.projectName}</p>
          <p>QAP Status: {item.qapStatus}</p>
          <p>Customer Name: {item.customerName}</p>
          <p>Inspection Call Letter Date: {item.inspectionCallLetterDate}</p>
          <p>Inspection Completed Date: {item.inspectionCompletedDate}</p>
          <p>Customer Clearance: {item.customerClearance}</p>
          <div className="buttons">
            <button>Edit</button>
            <button>Delete</button>
            <button>Open</button>
          </div>
        </div>
      ));
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <Link to="/new-entry">
          <button className="entry-button">New Data Entry</button>
        </Link>
      </div>
      <div className="card-container">
        {/* Render the cards */}
        {renderCards()}
      </div>
    </>
  );
}

export default Home;
