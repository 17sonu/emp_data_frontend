import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeList = ({setEditEmployee}) =>{
    const [employees, setEmployees] = useState([]);

    const fetchEmployees= async()=>{
        const res = await axios.get('https://emp-data-backend-biswadeep-pauls-projects.vercel.app/api/employees');
        setEmployees(res.data);
    };

    const  handleDelete = async(id)=>{
        await axios.delete(`https://emp-data-backend-biswadeep-pauls-projects.vercel.app/api/employees/${id}`);
        fetchEmployees();
    };

    useEffect(()=>{
        fetchEmployees();
    }, []);

    return(
        <div>
            <h1>Employee List</h1>
            <ul>
                {employees.map(emp =>(
                    <li key={emp._id}>
                        {emp.name} ({emp.position}) : {emp.email}
                        <button onClick={ ()=> handleDelete(emp._id)}>Delete</button>
                        <button onClick={ ()=> setEditEmployee(emp)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default EmployeeList