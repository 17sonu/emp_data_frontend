import React, {useState,useEffect} from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import axios from "axios";
import './App.css'
const App =() =>{
    const [employees, setEmployees] = useState([]);
    const [editEmployee, setEditEmployee] = useState(null);

    const fetchEmployees = async () =>{
        try {
            const res = await axios.get('https://emp-data-backend-biswadeep-pauls-projects.vercel.app/api/employees');
            setEmployees(res.data);
        } catch (error) {
            console.error("Error fetching employees:", error)
        }
    };

    useEffect(() =>{
        fetchEmployees();
    },[]);

    return(
        <div>
            <h1>
                Employee Management System
            </h1>

            <EmployeeForm 
             refreshEmployees={fetchEmployees}
             editEmployee={editEmployee}
             setEditEmployee={setEditEmployee}
            />

            <EmployeeList employees={employees} setEditEmployee={setEditEmployee}/>
        </div>
    );
};

export default App;


