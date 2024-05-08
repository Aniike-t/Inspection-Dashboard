import React, { useState, useEffect } from 'react';
import './NewEntry.css';
import Navbar from '../navbar';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Edit() {
    const { id } = useParams();
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vendorName: '',
    lntPoNumber: '',
    projectNumber: '',
    projectName: '',
    atomDescription: '',
    qapStatus: '',
    customerName: '',
    inspectionCallLetterDate: '',
    inspectionCompletedDate: '',
    customerClearance: '',
  });

  useEffect(() => {
    // Fetch data for the provided item ID from the backend
    const fetchFormData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/data/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Optionally, handle errors
      }
    };

    fetchFormData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      [name]: val,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit edited form data to the backend
    fetch('http://localhost:5000/edited-info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        // Optionally, handle the response from the server
        // Display success alert
        alert('Success');
        navigate('/'); // Navigate to the home page
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error While Editing');
        // Optionally, handle errors
      });
  };


  return (
    <>
    <Navbar/>
    <div className="form-container">
      <h2>New Entry Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="column">
          <div className="form-group">
            <label htmlFor="vendorName">Vendor Name:</label>
            <input
              type="text"
              id="vendorName"
              name="vendorName"
              value={formData.vendorName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lntPoNumber">L&T PO Number (9 digits):</label>
            <input
              type="text"
              id="lntPoNumber"
              name="lntPoNumber"
              value={formData.lntPoNumber}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="projectNumber">Project Number:</label>
            <input
              type="text"
              id="projectNumber"
              name="projectNumber"
              value={formData.projectNumber}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="projectName">Project Name:</label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="column">
          <div className="form-group">
            <label htmlFor="atomDescription">Atom Description:</label>
            <input
              type="text"
              id="atomDescription"
              name="atomDescription"
              value={formData.atomDescription}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="qapStatus">QAP Status:</label>
            <select
              id="qapStatus"
              name="qapStatus"
              value={formData.qapStatus}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="approved">Approved</option>
              <option value="unapproved">Unapproved</option>
              <option value="awaiting">Awaiting</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="customerName">Customer Name:</label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
              <label htmlFor="inspectionCallLetterDate">Inspection Call Letter Date:</label>
              <input
                type="date"
                id="inspectionCallLetterDate"
                name="inspectionCallLetterDate"
                value={formData.inspectionCallLetterDate}
                onChange={handleChange}
              />
            </div>
          <div className="form-group">
            <label htmlFor="inspectionCompletedDate">Inspection Completed Date:</label>
            <input
              type="date"
              id="inspectionCompletedDate"
              name="inspectionCompletedDate"
              value={formData.inspectionCompletedDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
              <label htmlFor="customerClearance">Customer Clearance:</label>
              <select
                id="customerClearance"
                name="customerClearance"
                value={formData.customerClearance}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
        </div>
        <button type="submit">Edit And Exit</button>
      </form>
    </div>
    </>
  );
}

export default Edit;
