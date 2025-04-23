// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'

// const Publications = () => {

//     const [publications, setPublications] = useState([])

//     useEffect(()=> {
//         axios.get('http://localhost:3000/employee/publications')
//         .then(result => {
//             if(result.data.Status) {
//                 setPublications(result.data.Result);
//             } else {
//                 alert(result.data.Error)
//             }
//         }).catch(err => console.log(err))
//     }, [])
//   return (
//     <div className='px-5 mt-3'>
//         <div className='d-flex justify-content-center'>
//             <h3>Publications List</h3>
//         </div>
//         <Link to="/add_publications" className='btn btn-success'>Add Publications</Link>
//         <div className='mt-3'>
//         <div className="row row-cols-1 row-cols-md-3 g-4">
//       {publications.map((p) => (
//         <div key={p.Id} className="col mb-4">
//           <div className="card">
//             <div className="card-body">
//               <h5 className="card-title" style={{ color: 'blue' }}>{p.Name}</h5>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//         </div>

//     </div>
//   )
// }

// export default Publications

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
 
const Publications = () => {
  const navigate=useNavigate()
  const [publications,setPublications]=useState([])
 const fields=useState();

    useEffect(()=> {
        axios.get('http://localhost:3000/employee/publications')
        .then(result => {
            if(result.data.Status) {
                setPublications(result.data.Result);
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }, [])
    
    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-md-10'>
                    <div className='card'>
                        <div className='card-body'>
                            <h3 className='card-title'>Publications List</h3>
                            <Link to="/add_publications" className='btn btn-success mb-3'>Add Publications</Link>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Name</th>
                                        <th>Action</th> 
                                        
                                        {/* Add this th for Action */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {publications.map((publication, index) => (
                                        <tr key={publication.Id}>
                                            <td>{index + 1}</td>
                                            <td>{publication.Name}</td>
                                            <td>
                                            <Link to="/add_field" className='btn btn-success mb-3'>Add Field</Link>
                                            </td>
                                         
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Publications


