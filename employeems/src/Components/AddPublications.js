import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddPublications = () => {
    const [publications, setPublications] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/employee/add_publications', {publications})
        .then(result => {
            if(result.data.Status) {
                navigate('/publications')
            } else {
                console.log('error')  
                // alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }
  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
        <div className='p-3 rounded w-25 border'>
            <h2>Add Publication</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="publications"><strong>Name:</strong></label>
                    <input type="text" name='publications' placeholder='Enter Name'
                     onChange={(e) => setPublications(e.target.value)} className='form-control rounded-0'/>
                </div>
                <button className='btn btn-success w-100 rounded-0 mb-2'>Add Publications</button>
            </form>
        </div>
    </div>
  )
}

export default AddPublications



