// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useParams, useNavigate } from "react-router-dom";

// const Viewdetails = () => {
//   const [employee, setEmployee] = useState(null);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3000/employee/detail/${id}`)
//       .then((result) => {
//         setEmployee(result.data[0]);
//       })
//       .catch((err) => console.log(err));
//   }, [id]);

//   if (!employee) {
//     return <div>Loading...</div>;
//   }

//   const handleDelete = (id) => {
//     axios
//       .delete(`http://localhost:3000/auth/delete_employee/${id}`)
//       .then((result) => {
//         if (result.data.Status) {
//           alert("Do you want to delete");
//           navigate('/dashboard'); // Redirect to dashboard after successful deletion
//         } else {
//           alert(result.data.Error);
//         }
//       })
//       .catch((error) => {
//         console.error("Error deleting employee:", error);
//       });
//   };

//   return (
//     <div className="container mt-3">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card border-primary" style={{ maxWidth: "18rem" }}>
//             <img
//               src={`http://localhost:3000/Images/${employee.image}`}
//               className="card-img-top"
//               alt={employee.name}
//               style={{ maxHeight: "200px", objectFit: "cover" }}
//             />
//             <div className="card-body">
//               <center><h5 className="card-title">{employee.name}</h5></center>
//               <p className="card-text">Faculty Id: {employee.id}</p>
//               <p className="card-text">Email: {employee.email}</p>
//               <p className="card-text">Salary: ${employee.salary}</p>
//               <p className="card-text">Address: {employee.address}</p>
//               <div className="d-flex justify-content-between">
//                 <Link
//                   to={`/dashboard/edit_employee/${employee.id}`}
//                   className="btn btn-info btn-sm"
//                 >
//                   Edit
//                 </Link>
//                 <button
//                   className="btn btn-warning btn-sm"
//                   onClick={() => handleDelete(employee.id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Viewdetails;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


const Viewdetails = () => {
  const [employee, setEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to track editing mode
  const { id } = useParams();
  const navigate = useNavigate();
  

  useEffect(() => {
    axios
      .get(`http://localhost:3000/employee/detail/${id}`)
      .then((result) => {
        setEmployee(result.data[0]);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleDelete = () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this employee?");
    if (isConfirmed) {
      axios
        .delete(`http://localhost:3000/auth/delete_employee/${id}`)
        .then((result) => {
          if (result.data.Status) {
            alert("Employee deleted successfully");
            navigate('/dashboard'); // Redirect to dashboard after successful deletion
          } else {
            alert(result.data.Error);
          }
        })
        .catch((error) => {
          console.error("Error deleting employee:", error);
        });
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleSave = () => {
    const isConfirmed = window.confirm("Are you sure you want to save changes?");
    if (isConfirmed) {
      axios
        .put('http://localhost:3000/auth/edit_employee/' + id, employee)
        .then(result => {
          if (result.data.Status) {
            alert("Changes saved successfully");
            navigate('/dashboard/employee');
          } else {
            alert(result.data.Error);
          }
        })
        .catch(err => console.log(err));
    }
  };

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card border-primary" style={{ maxWidth: "18rem" }}>
            <img
              src={`http://localhost:3000/Images/${employee.image}`}
              className="card-img-top"
              alt={employee.name}
              style={{ maxHeight: "200px", objectFit: "cover" }}
            />
            <div className="card-body">
              <p className="card-text">Faculty Id: {employee.id}</p>

              <p className="card-text">Name: {isEditing ? <input type="text" value={employee.name} onChange={(e) => setEmployee({ ...employee, name: e.target.value })} /> : employee.name}</p>

              <p className="card-text">Email: {isEditing ? <input type="text" value={employee.email} onChange={(e) => setEmployee({ ...employee, email: e.target.value })} /> : employee.email}</p>
              <p className="card-text">Salary: ${isEditing ? <input type="number" value={employee.salary} onChange={(e) => setEmployee({ ...employee, salary: e.target.value })} /> : employee.salary}</p>
              <p className="card-text">Address: {isEditing ? <input type="text" value={employee.address} onChange={(e) => setEmployee({ ...employee, address: e.target.value })} /> : employee.address}</p>
              <div className="d-flex justify-content-between">
                {!isEditing ? ( // Show Edit button if not in editing mode
                  <button className="btn btn-info btn-sm" onClick={handleEdit}>
                    Edit
                  </button>
                ) : (
                  <>
                    <button className="btn btn-success btn-sm" onClick={handleSave}>
                      Save
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => setIsEditing(false)}>
                      Cancel
                    </button>
                  </>
                )}
                <button className="btn btn-warning btn-sm" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewdetails;
