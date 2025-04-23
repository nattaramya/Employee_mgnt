import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Addfields = () => {
    const [fields, setfields] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/employee/add_field', {fields})
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
            <h2>Add Field</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="fields"><strong>Name:</strong></label>
                    <input type="text" name='fields' placeholder='Enter Name'
                     onChange={(e) => setfields(e.target.value)} className='form-control rounded-0'/>
                </div>
                <button className='btn btn-success w-100 rounded-0 mb-2'>Add</button>
            </form>
        </div>
    </div>
  )
}

export default Addfields



