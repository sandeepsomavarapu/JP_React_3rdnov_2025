import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const baseUrl = 'http://localhost:5000/employees';
  useEffect(() => {
    axios.get(`${baseUrl}/${id}`)
      .then(response => setEmployee(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/employees/${id}`, employee)
      .then(() => {
        alert('Employee updated successfully');
        window.location.href = '/employees';
      })
      .catch(error => console.error(error));
  };

  if (!employee) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit} className='FormGroup'>
        <div>
          <label>Name:</label>
          <input type="text" name="name" className='form-control' value={employee.name} onChange={handleChange} />
        </div>
        <div>
          <label>Department:</label>
          <input type="text" name="department" className='form-control' value={employee.department} onChange={handleChange} />
        </div>
        <div>
          <label>Salary:</label>
          <input type="number" name="salary" className='form-control' value={employee.salary} onChange={handleChange} />
        </div>
        <button type="submit" className='btn btn-primary'>Update</button>
      </form>
    </div>
  )
}

export default EditEmployee
