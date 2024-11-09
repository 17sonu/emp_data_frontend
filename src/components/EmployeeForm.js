import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeForm = ({ refreshEmployees, editEmployee, setEditEmployee }) => {
   const [employee, setEmployee] = useState({ name: '', email: '', position: '' });


   useEffect(() => {
      if (editEmployee) {
         setEmployee(editEmployee);
      }
   }, [editEmployee]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (editEmployee) {

         await axios.put(`https://emp-data-backend-biswadeep-pauls-projects.vercel.app/api/employees/${editEmployee._id}`, employee);
         setEditEmployee(null); 
      } else {
         //  POST request
         await axios.post('https://emp-data-backend-biswadeep-pauls-projects.vercel.app/api/employees', employee);
      }

      setEmployee({ name: '', email: '', position: '' }); // Reset fields
      refreshEmployees(); // Refresh  list
   };

   return (
      <form onSubmit={handleSubmit}>
         <input type="text" value={employee.name} placeholder="Name" onChange={e => setEmployee({ ...employee, name: e.target.value })} />
         <input type="email" value={employee.email} placeholder="Email" onChange={e => setEmployee({ ...employee, email: e.target.value })} />
         <input type="text" value={employee.position} placeholder="Position" onChange={e => setEmployee({ ...employee, position: e.target.value })} />
         <button type="submit">{editEmployee ? 'Update Employee' : 'Add Employee'}</button>
      </form>
   );
};

export default EmployeeForm;
