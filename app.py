#pip install flask flask-mysql flask-cors
from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# MySQL connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="rpsconsulting",
    database="jpmc"
)
cursor = db.cursor(dictionary=True)

# CRUD Endpoints
@app.route('/employees', methods=['GET'])
def get_employees():
    print("Fetching all employees")
    cursor.execute("SELECT * FROM employees")
    return jsonify(cursor.fetchall())

@app.route('/employees/<int:id>', methods=['GET'])
def get_employee(id):
    cursor.execute("SELECT * FROM employees WHERE id=%s", (id,))
    return jsonify(cursor.fetchone())

@app.route('/employees', methods=['POST'])
def add_employee():
    data = request.json
    cursor.execute("INSERT INTO employees (name, department, salary) VALUES (%s,%s,%s)",
                   (data['name'], data['department'], data['salary']))
    db.commit()
    return jsonify({"message": "Employee added successfully"})

@app.route('/employees/<int:id>', methods=['PUT'])
def update_employee(id):
    data = request.json
    cursor.execute("UPDATE employees SET name=%s, department=%s, salary=%s WHERE id=%s",
                   (data['name'], data['department'], data['salary'], id))
    db.commit()
    return jsonify({"message": "Employee updated successfully"})

@app.route('/employees/<int:id>', methods=['DELETE'])
def delete_employee(id):
    try:
        cursor.execute("SELECT * FROM employees WHERE id=%s", (id,))
        employee = cursor.fetchone()
        
        if not employee:
            return jsonify({"error": f"Employee with ID {id} not found"}), 404

        # Delete employee
        cursor.execute("DELETE FROM employees WHERE id=%s", (id,))
        db.commit()
        return jsonify({"message": "Employee deleted successfully"}), 200

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    except Exception as e:
        return jsonify({"error": "Unexpected error: " + str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
