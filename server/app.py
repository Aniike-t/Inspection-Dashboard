from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os



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
        return jsonify(serialized_data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
