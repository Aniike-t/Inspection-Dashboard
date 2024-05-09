// NewEntry.jsx
import React, { useState } from 'react';
import './NewEntry.css';
import Navbar from '../navbar';
import { useNavigate } from 'react-router-dom';

function NewEntry() {
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

    fetch('http://localhost:5000/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        alert('Success')
        navigate('/')
        // Optionally, handle the response from the server
      })
      .catch((error) => {
        console.error('Error:', error);
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
        <button type="submit">Submit</button>
      </form>
    </div>
    </>
  );
}

export default NewEntry;
