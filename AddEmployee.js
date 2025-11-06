import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddEmployee() {
  const [employee, setEmployee] = useState({ name: '', department: '', salary: '' });
  const navigate = useNavigate();
  const baseUrl = 'http://localhost:5000/employees';

  const handleAdd = async () => {
    if (!employee.name || !employee.department || !employee.salary) {
      alert("All fields are required");
      return;
    }
    try {
      await axios.post(baseUrl, employee);
      alert("Employee added successfully");
      navigate('/employees'); 
    } catch (error) {
      console.error(error);
      alert("Failed to add employee");
    }
  };

  return (
    <div>
      <h2>Add Employee</h2>
      <input type="text" placeholder="Name" value={employee.name}
        onChange={(e) => setEmployee({ ...employee, name: e.target.value })} />
      <input type="text" placeholder="Department" value={employee.department}
        onChange={(e) => setEmployee({ ...employee, department: e.target.value })} />
      <input type="number" placeholder="Salary" value={employee.salary}
        onChange={(e) => setEmployee({ ...employee, salary: e.target.value })} />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default AddEmployee;
