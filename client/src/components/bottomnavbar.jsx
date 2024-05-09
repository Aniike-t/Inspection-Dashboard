import React from 'react';
import './bottomnsvbar.css'; // Import CSS file

function BottomNavbar() {
    // Function to download XLSX file from the backend
    const downloadXlsx = () => {
        fetch('http://localhost:5000/download-xlsx', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }
        })
        .then(response => {
            if (response.ok) {
                return response.blob();
            }
            throw new Error('Failed to download XLSX file');
        })
        .then(blob => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'data.xlsx');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        })
        .catch(error => {
            console.error('Error downloading XLSX file:', error);
            // Handle error
        });
    };

    return (
        <nav className="navbar"> {/* Add 'navbar' class */}
            <button className="dwnbutton" onClick={downloadXlsx}>Download XLSX file</button> {/* Add 'button' class */}
        </nav>
    );
}

export default BottomNavbar;
