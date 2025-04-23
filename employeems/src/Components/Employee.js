// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Employee = () => {
//   const [employee, setEmployee] = useState([]);
//   const navigate = useNavigate()

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/auth/employee")
//       .then((result) => {
//         if (result.data.Status) {
//           setEmployee(result.data.Result);
//         } else {
//           alert(result.data.Error);
//         }
//       })
//       .catch((err) => console.log(err));
//   }, []);
//   const handleDelete = (id) => {
//     axios.delete('http://localhost:3000/auth/delete_employee/'+id)
//     .then(result => {
//         if(result.data.Status) {
//             window.location.reload()
//         } else {
//             alert(result.data.Error)
//         }
//     })
//   } 
//   return (
//     <div className="px-5 mt-3">
//       <div className="d-flex justify-content-center">
//         <h3>Employee List</h3>
//       </div>
//       <Link to="/dashboard/add_employee" className="btn btn-success">
//         Add Employee
//       </Link>
//       <div className="mt-3">
//       <div className="row row-cols-1 row-cols-md-3 g-4">
//         {employee.map((e) => (
//           <div key={e.id} className="col mb-4">
//             <div className="card">
//               <center><img
//                 src={`http://localhost:3000/Images/` + e.image}
//                 alt={e.name}
//                 className="card-img-top employee_image"
//                 style={{  objectFit: 'cover' }}
//               /></center>
//               <div className="card-body">
//                 <h5 className="card-title">{e.name}</h5>
//                 <p className="card-text">Email: {e.email}</p>
//                 <p className="card-text">Address: {e.address}</p>
//                 <p className="card-text">Salary: {e.salary}</p>
//                 <div className="d-flex justify-content-between">
//                   <Link to={`/dashboard/edit_employee/` + e.id} className="btn btn-info btn-sm">
//                     Edit
//                   </Link>
//                   <button
//                     className="btn btn-warning btn-sm"
//                     onClick={() => handleDelete(e.id)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
// </div>
            
               
      
    
//   );
// };

// export default Employee;

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from 'react-router-dom'

// const Employee = () => {
//   const [employees, setEmployees] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/auth/employee")
//       .then((result) => {
//         if (result.data.Status) {
//           setEmployees(result.data.Result);
//         } else {
//           alert(result.data.Error);
//         }
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   const handleDelete = (id) => {
//     axios
//       .delete("http://localhost:3000/auth/delete_employee/" + id)
//       .then((result) => {
//         if (result.data.Status) {
//           // Filter out the deleted employee from the state
//           setEmployees(employees.filter((employee) => employee.id !== id));
//         } else {
//           alert(result.data.Error);
//         }
//       });
//   };

//   return (
//     <div className="px-3 mt-3">
//        <Link to="/dashboard/add_employee" className="btn btn-success">
//         Add Employee
//       </Link>
//       <div className="d-flex justify-content-center">
//         <h3>Faculty List</h3>
//       </div>
//       <div className="mt-3">
//         <div className="row row-cols-1 row-cols-md-3 g-4">
//           {employees.map((employee) => (
//             <div key={employee.id} className="col mb-3">
//               <div className="card text-center" style={{ maxWidth: "200px", maxHeight: "200px" }}>
//                 <div className="card-body">
//                   <h5 className="card-title">Name: {employee.name}</h5>
//                   <h5 className="card-title">Faculty_id: {employee.id}</h5>
//                   <div className="d-flex justify-content-center">
//                   <Link to={`/dashboard/employee_view/${employee.id}`} className="btn btn-info btn-sm">
//     View Details
// </Link>

                    
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Employee;


import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployees(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // Function to handle input change in search input
  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  // Function to filter employees based on search input
  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="px-3 mt-3">
      <Link to="/dashboard/add_employee" className="btn btn-success">
        Add Employee
      </Link>
      <div className="d-flex justify-content-center">
        <h3>Faculty List</h3>
      </div>
      <div className="mt-3">
        <input 
          type="text" 
          className="form-control mb-3" 
          placeholder="Search by name" 
          value={searchInput}
          onChange={handleInputChange} 
        />
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.id} onClick={() => navigate(`/dashboard/employee_view/${employee.id}`)} style={{cursor: 'pointer'}}>
                <td><Link to={`/dashboard/employee_view/${employee.id}`}>{employee.name}</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;

