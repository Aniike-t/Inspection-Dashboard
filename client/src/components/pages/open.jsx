import React, { useState, useEffect } from 'react';
import Navbar from '../navbar';
import { useParams } from 'react-router-dom';
import './open.css';
import { useNavigate } from 'react-router-dom';

function OpenEntry() {
    const navigate = useNavigate();
  // State to store the fetched entry data
  const [entryData, setEntryData] = useState(null);
  // State for loading and error handling
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the entry ID from the URL params
  const { id } = useParams();

  useEffect(() => {
    // Fetch the entry data when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/data/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch entry data');
      }
      const data = await response.json();
      setEntryData(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching entry data:', error);
      setError(error.message);
      setIsLoading(false);
    }
  };
  const handleEdit = (id) => {
    // Perform actions for editing
    navigate(`/edit/${id}`)
  };
  const handleDelete = (id) => {
    // Perform actions for deleting
    console.log(`Deleting item with ID ${id}`);
    
    // Call the function to delete the entry from the backend
    fetch(`http://localhost:5000/delete/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete entry');
      }
      // Optionally, update the UI or fetch data again after deletion
      console.log(`Deleted item with ID ${id}`);
      // Close the confirmation dialog
      
      navigate('/')
    })
    .catch(error => {
      console.error('Error deleting item:', error);
      // Optionally, handle errors
    });
  };
  return (
    <>
      <Navbar />
      <div className="container">
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {entryData && (
          <div className="entry-details">
            <h2>Entry Details</h2>
            <p>Vendor Name: {entryData.vendorName}</p>
            <p>L&T PO Number: {entryData.lntPoNumber}</p>
            <p>Project Number: {entryData.projectNumber}</p>
            <p>Project Name: {entryData.projectName}</p>
            <p>Atom Description: {entryData.atomDescription}</p>
            <p>QAP Status: {entryData.qapStatus}</p>
            <p>Customer Name: {entryData.customerName}</p>
            <p>Inspection Call Letter Date: {entryData.inspectionCallLetterDate}</p>
            <p>Inspection Completed Date: {entryData.inspectionCompletedDate}</p>
            <p>Customer Clearance: {entryData.customerClearance}</p>
            <hr></hr>
            <button className="card-button" onClick={() => handleEdit(entryData.id)}>Edit</button>
            <button className="card-button" onClick={() => handleDelete(entryData.id)}>Delete</button>
          </div>
        )}
      </div>
    </>
  );
}

export default OpenEntry;
