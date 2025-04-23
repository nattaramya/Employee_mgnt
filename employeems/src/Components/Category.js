


import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Category = () => {

    const [category, setCategory] = useState([])

    useEffect(()=> {
        axios.get('http://localhost:3000/auth/category')
        .then(result => {
            if(result.data.Status) {
                setCategory(result.data.Result);
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }, [])
  return (
    <div className='px-5 mt-3'>
        <div className='d-flex justify-content-center'>
            <h3>Category List</h3>
        </div>
        <Link to="/dashboard/add_category" className='btn btn-success'>Add Category</Link>
        <div className='mt-3'>
        <div className="row row-cols-1 row-cols-md-3 g-4">
      {category.map((c) => (
        <div key={c.id} className="col mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title" style={{ color: 'blue' }}>{c.name}</h5>
            </div>
          </div>
        </div>
      ))}
    </div>
        </div>

    </div>
  )
}

export default Category

