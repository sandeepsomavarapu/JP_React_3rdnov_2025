import React, { useEffect, useState } from 'react';
import axios from 'axios';//npm  install axios
import { Link } from 'react-router-dom';


function Employees() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const baseUrl = 'http://localhost:5000/employees';

  useEffect(() => {
    axios.get(baseUrl)
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  },[]);


  // Filter employees based on search term
  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.salary.toString().includes(searchTerm)
  );

  const handleDelete = (id) => {
    axios.delete(`${baseUrl}/${id}`)
      .then(() => {
        setEmployees(employees.filter(emp => emp.id !== id));
      })
      .catch(error => console.error(error));
  };
  return (
<div>
  <h2>Employee List</h2>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
    <input
      type="text"
      placeholder="Search by name, department, or salary"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{ padding: '8px', width: '300px', marginRight: '10px' }}
    />
    <Link to="/addemp">
      <button className="btn btn-primary">Add Employee</button>
    </Link>
  </div>

  <table className="table table-striped table-dark">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Department</th>
        <th>Salary</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {filteredEmployees.map(emp => (
        <tr key={emp.id}>
          <td>{emp.id}</td>
          <td>{emp.name}</td>
          <td>{emp.department}</td>
          <td>${emp.salary}</td>
          <td>
            <i className="fa-solid fa-trash" onClick={() => handleDelete(emp.id)}></i>&nbsp;
            <Link to={`/edit/${emp.id}`}><i className="fa-solid fa-pen"></i></Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  );
}

export default Employees
