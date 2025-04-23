// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'


// const EmployeeDetail = () => {
//     const [employee, setEmployee] = useState([])
//     const {id} = useParams()
//     const navigate = useNavigate()
//     useEffect(() => {
//         axios.get('http://localhost:3000/employee/detail/'+id)
//         .then(result => {
//             setEmployee(result.data[0])
//         })
//         .catch(err => console.log(err))
//     }, [])
//     const handleLogout = () => {
//         axios.get('http://localhost:3000/employee/logout')
//         .then(result => {
//           if(result.data.Status) {
//             localStorage.removeItem("valid")
//             navigate('/')
//           }
//         }).catch(err => console.log(err))
//       }
//   return (
//     <div>
//         <div className="p-2 d-flex justify-content-center shadow">
//             <h4>SVECW Faculty Management System</h4>
//         </div>
//         <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
//             <img src={`http://localhost:3000/Images/`+employee.image} className='emp_det_image'/>
//             <div className='d-flex align-items-center flex-column mt-5'>
//                 <h3>Name: {employee.name}</h3>
//                 <h3>Faculty_Id: {employee.id}</h3>
//                 <h3>Email: {employee.email}</h3>
//                 <h3>Salary: ${employee.salary}</h3>
//                 <h3>Address: {employee.address}</h3>
//             </div>
//             <div>
//                 <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default EmployeeDetail

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const EmployeeDetail = () => {
    const [employee, setEmployee] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:3000/employee/detail/${id}`)
            .then(result => {
                setEmployee(result.data[0])
            })
            .catch(err => console.log(err))
    }, [id])

    const handleLogout = () => {
        axios.get('http://localhost:3000/employee/logout')
            .then(result => {
                if (result.data.Status) {
                    localStorage.removeItem("valid")
                    navigate('/')
                }
            }).catch(err => console.log(err))
    }

    return (
        <div>
            <div className="p-2 d-flex justify-content-center shadow">
                <h4>SVECW Faculty Management System</h4>
            </div>
            <div className='container mt-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <nav className="navbar navbar-light bg-light flex-column">
                            <ul className="navbar-nav">
                                
                                <li className="nav-item">
                                    <Link className="nav-link text-dark py-2 px-3" to="/publications">Publications</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className='col-md-9'>
                        <div className='d-flex justify-content-center flex-column align-items-center'>
                            <img src={`http://localhost:3000/Images/${employee.image}`} className='emp_det_image' />
                            <div className='d-flex align-items-center flex-column mt-5'>
                                <h3 style={{ color: 'blue' }}>Name:</h3> <h3>{employee.name}</h3>
                                <h3>Faculty_Id: {employee.id}</h3>
                                <h3>Email: {employee.email}</h3>
                                <h3>Salary: ${employee.salary}</h3>
                                <h3>Address: {employee.address}</h3>
                            </div>
                            <div>
                                <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeDetail
