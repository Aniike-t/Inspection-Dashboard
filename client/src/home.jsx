import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import { Link } from 'react-router-dom';
import './home.css';
import { useNavigate } from 'react-router-dom';
import BottomNavbar from './components/bottomnavbar';

function Home() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [qapStatusFilter, setQapStatusFilter] = useState('');
  const [customerClearanceFilter, setCustomerClearanceFilter] = useState('');

  const handleDeleteConfirmation = (id) => {
    setShowConfirmation(true);
    setDeleteItemId(id);
  };

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

  const deleteEntry = (id) => {
    // Call the backend to delete the entry with the specified ID
    fetch(`http://localhost:5000/delete/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete entry');
        }
        console.log(`Deleted item with ID ${id}`);
        // Optionally, update the UI or fetch data again after deletion
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
        // Optionally, handle errors
      });
  };

  const handleCancel = () => {
    // Close the confirmation dialog
    setShowConfirmation(false);
  };

  const navigate = useNavigate();

  const handleEdit = (id) => {
    // Perform actions for editing
    navigate(`/edit/${id}`);
  };

  const handleOpen = (id) => {
    // Perform actions for opening
    navigate(`/open/${id}`);
  };

  const handleDelete = (id) => {
    // Perform actions for deleting
    console.log(`Deleting item with ID ${id}`);

    // Call the function to delete the entry from the backend
    fetch(`http://localhost:5000/delete/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete entry');
        }
        // Optionally, update the UI or fetch data again after deletion
        console.log(`Deleted item with ID ${id}`);
        // Close the confirmation dialog
        setShowConfirmation(false);
        fetchData();
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
        // Optionally, handle errors
      });
  };

  const handleSearch = () => {
    const filtered = data.filter((item) =>
      Object.values(item).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredData(
      filtered.sort((a, b) => a.vendorName.localeCompare(b.vendorName))
    );
  };

  const handleFilter = () => {
    let filtered = [...data];
    if (qapStatusFilter !== '') {
      filtered = filtered.filter((item) => item.qapStatus === qapStatusFilter);
    }
    if (customerClearanceFilter !== '') {
      filtered = filtered.filter(
        (item) => item.customerClearance === customerClearanceFilter
      );
    }
    setFilteredData(
      filtered.sort((a, b) => a.vendorName.localeCompare(b.vendorName))
    );
  };

  // Function to render cards dynamically
  const renderCards = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    } else if (error) {
      return <div>Error loading: {error}</div>;
    } else {
      const cardsToRender =
        filteredData.length > 0 ? filteredData : data;
      return (
        <div className="card-container">
          {cardsToRender.map((item) => (
            <div key={item.id} className="card">
              <h2>{item.vendorName}</h2>
              <hr />
              <div id="infocon">
                <p>L&T PO Number: {item.lntPoNumber}</p>
                <p>Project Number: {item.projectNumber}</p>
                <p>Project Name: {item.projectName}</p>
                <p>QAP Status: {item.qapStatus}</p>
                <p>Customer Name: {item.customerName}</p>
                <p>Inspection Call Letter Date: {item.inspectionCallLetterDate}</p>
                <p>Inspection Completed Date: {item.inspectionCompletedDate}</p>
                <p>Customer Clearance: {item.customerClearance}</p>
              </div>
              <div className="card-buttons-con">
                <hr />
                <button className="card-button" onClick={() => handleEdit(item.id)}>Edit</button>
                <button className="card-button" onClick={() => handleOpen(item.id)}>Open</button>
                <button className="card-button" onClick={() => handleDeleteConfirmation(item.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/new-entry">
            <button className="entry-button">New Data Entry</button>
          </Link>
          <div>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="searchcon"
            />
            <button onClick={handleSearch} className="searchbtn">
              <img src="./search-icon.svg" alt="Search icon" className="searchicon" />
            </button>
          </div>
          {/* <div>
            <select value={qapStatusFilter} onChange={(e) => setQapStatusFilter(e.target.value)}>
              <option value="">QAP Status</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <select value={customerClearanceFilter} onChange={(e) => setCustomerClearanceFilter(e.target.value)}>
              <option value="">Customer Clearance</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <button onClick={handleFilter}>Filter</button>
          </div> */}
        </div>
      </div>
      <dialog open={showConfirmation}>
        <p>Are you sure you want to delete this entry?</p>
        <button onClick={() => handleDelete(deleteItemId)}>Yes</button>
        <button onClick={handleCancel}>Cancel</button>
      </dialog>
      <div className="card-container">
        {/* Render the cards */}
        {renderCards()}
      </div>
      <BottomNavbar/>
    </>
  );
}

export default Home;
