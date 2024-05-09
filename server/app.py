from flask import Flask, request, send_file
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
import pandas as pd
from flask import jsonify

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///form_data.db'
db = SQLAlchemy(app)

# Define the model for form data
class FormData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    vendorName = db.Column(db.String(100))
    lntPoNumber = db.Column(db.String(100))
    projectNumber = db.Column(db.String(100))
    projectName = db.Column(db.String(100))
    atomDescription = db.Column(db.String(100))
    qapStatus = db.Column(db.String(100))
    customerName = db.Column(db.String(100))
    inspectionCallLetterDate = db.Column(db.String(100))
    inspectionCompletedDate = db.Column(db.String(100))
    customerClearance = db.Column(db.String(100))

# Check if the database file exists, if not, create it
if not os.path.exists('form_data.db'):
    with app.app_context():
        db.create_all()

@app.route('/submit-form', methods=['POST'])
def submit_form():
    data = request.json
    new_form_data = FormData(**data)
    db.session.add(new_form_data)
    db.session.commit()
    return jsonify({'message': 'Form data submitted successfully'}), 201

@app.route('/data', methods=['GET'])
def get_data():
    try:
        # Fetch data from the database
        data = FormData.query.all()
        # Serialize the data to JSON format
        serialized_data = [{
            'id': entry.id,
            'vendorName': entry.vendorName,
            'lntPoNumber': entry.lntPoNumber,
            'projectNumber': entry.projectNumber,
            'projectName': entry.projectName,
            'qapStatus': entry.qapStatus,
            'customerName': entry.customerName,
            'inspectionCallLetterDate': entry.inspectionCallLetterDate,
            'inspectionCompletedDate': entry.inspectionCompletedDate,
            'customerClearance': entry.customerClearance
        } for entry in data]
        print(serialized_data)
        return jsonify(serialized_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/data/<int:id>', methods=['GET'])
def get_data_by_id(id):
    try:
        # Fetch data from the database for the provided ID
        entry = FormData.query.filter_by(id=id).first()
        if not entry:
            return jsonify({'error': 'Entry not found'}), 404
        # Serialize the data to JSON format
        serialized_data = {
            'id': entry.id,
            'vendorName': entry.vendorName,
            'lntPoNumber': entry.lntPoNumber,
            'projectNumber': entry.projectNumber,
            'projectName': entry.projectName,
            'qapStatus': entry.qapStatus,
            'customerName': entry.customerName,
            'inspectionCallLetterDate': entry.inspectionCallLetterDate,
            'inspectionCompletedDate': entry.inspectionCompletedDate,
            'customerClearance': entry.customerClearance
        }
        return jsonify(serialized_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/edited-info', methods=['POST'])
def edit_form_data():
    try:
        data = request.json
        id = data.get('id')
        # Fetch the existing entry from the database
        entry = FormData.query.filter_by(id=id).first()
        if not entry:
            return jsonify({'error': 'Entry not found'}), 404
        # Update the entry with new data
        for key, value in data.items():
            setattr(entry, key, value)
        db.session.commit()
        return jsonify({'message': 'Form data edited successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/data/<int:id>', methods=['GET'])
def get_entry_data(id):
    try:
        # Fetch entry data from the database based on ID
        entry = FormData.query.get(id)
        if not entry:
            return jsonify({'error': 'Entry not found'}), 404
        # Serialize the data to JSON format
        serialized_data = {
            'id': entry.id,
            'vendorName': entry.vendorName,
            'lntPoNumber': entry.lntPoNumber,
            'projectNumber': entry.projectNumber,
            'projectName': entry.projectName,
            'atomDescription': entry.atomDescription,
            'qapStatus': entry.qapStatus,
            'customerName': entry.customerName,
            'inspectionCallLetterDate': entry.inspectionCallLetterDate,
            'inspectionCompletedDate': entry.inspectionCompletedDate,
            'customerClearance': entry.customerClearance
        }
        return jsonify(serialized_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/delete/<int:id>', methods=['DELETE'])
def delete_entry(id):
    try:
        # Find the entry by ID
        entry = FormData.query.get(id)
        if not entry:
            return jsonify({'error': 'Entry not found'}), 404
        # Delete the entry from the database
        db.session.delete(entry)
        db.session.commit()
        return jsonify({'message': 'Entry deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/download-xlsx')
def download_xlsx():
    try:
        # Query the form data from the database
        form_data = FormData.query.all()

        # Convert the form data to a pandas DataFrame
        data = pd.DataFrame([{
            'Vendor Name': entry.vendorName,
            'L&T PO Number': entry.lntPoNumber,
            'Project Number': entry.projectNumber,
            'Project Name': entry.projectName,
            'Atom Description': entry.atomDescription,
            'QAP Status': entry.qapStatus,
            'Customer Name': entry.customerName,
            'Inspection Call Letter Date': entry.inspectionCallLetterDate,
            'Inspection Completed Date': entry.inspectionCompletedDate,
            'Customer Clearance': entry.customerClearance
        } for entry in form_data])

        # Generate the XLSX file
        file_path = 'form_data.xlsx'
        data.to_excel(file_path, index=False)

        # Send the XLSX file as a response
        return send_file(file_path, as_attachment=True)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
