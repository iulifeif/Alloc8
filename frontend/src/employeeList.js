import React, { useEffect, useState } from "react";
import axios from "axios";

const Employees = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/employees/")
            .then(response => setEmployees(response.data))
            .catch(error => console.error("Error fetching employees:", error));
    }, []);

    return (
        <div>
            <h2>Employee List</h2>
            <ul>
                {employees.map(emp => (
                    <li key={emp.id}>{emp.name} - {emp.role}</li>
                ))}
            </ul>
        </div>
    );
};

export default Employees;
