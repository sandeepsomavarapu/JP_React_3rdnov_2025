# pip install flask flask-cors
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

# Database initialization (creates file if not exists)
DB_PATH = "employees.db"

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row  # Enables dictionary-like access
    return conn

# Create table if not exists
with get_db_connection() as conn:
    conn.execute("""
        CREATE TABLE IF NOT EXISTS employees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            department TEXT NOT NULL,
            salary REAL NOT NULL
        )
    """)
    conn.commit()

# ✅ CRUD Endpoints

@app.route('/employees', methods=['GET'])
def get_employees():
    conn = get_db_connection()
    employees = conn.execute("SELECT * FROM employees").fetchall()
    conn.close()
    return jsonify([dict(row) for row in employees])

@app.route('/employees/<int:id>', methods=['GET'])
def get_employee(id):
    conn = get_db_connection()
    employee = conn.execute("SELECT * FROM employees WHERE id=?", (id,)).fetchone()
    conn.close()
    if employee:
        return jsonify(dict(employee))
    return jsonify({"error": f"Employee with ID {id} not found"}), 404

@app.route('/employees', methods=['POST'])
def add_employee():
    data = request.json
    conn = get_db_connection()
    conn.execute("INSERT INTO employees (name, department, salary) VALUES (?, ?, ?)",
                 (data['name'], data['department'], data['salary']))
    conn.commit()
    conn.close()
    return jsonify({"message": "Employee added successfully"}), 201

@app.route('/employees/<int:id>', methods=['PUT'])
def update_employee(id):
    data = request.json
    conn = get_db_connection()
    conn.execute("UPDATE employees SET name=?, department=?, salary=? WHERE id=?",
                 (data['name'], data['department'], data['salary'], id))
    conn.commit()
    conn.close()
    return jsonify({"message": "Employee updated successfully"}), 200

@app.route('/employees/<int:id>', methods=['DELETE'])
def delete_employee(id):
    conn = get_db_connection()
    employee = conn.execute("SELECT * FROM employees WHERE id=?", (id,)).fetchone()
    if not employee:
        conn.close()
        return jsonify({"error": f"Employee with ID {id} not found"}), 404

    conn.execute("DELETE FROM employees WHERE id=?", (id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Employee deleted successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True)
