import express from 'express'
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

const router = express.Router()

router.post("/employee_login", (req, res) => {
    const sql = "SELECT * from employee Where email = ?";
    con.query(sql, [req.body.email], (err, result) => {
      if (err) return res.json({ loginStatus: false, Error: "Query error" });
      if (result.length > 0) {
        bcrypt.compare(req.body.password, result[0].password, (err, response) => {
            if (err) return res.json({ loginStatus: false, Error: "Wrong Password" });
            if(response) {
                const email = result[0].email;
                const token = jwt.sign(
                    { role: "employee", email: email, id: result[0].id },
                    "jwt_secret_key",
                    { expiresIn: "1d" }
                );
                res.cookie('token', token)
                return res.json({ loginStatus: true, id: result[0].id });
            }
        })
        
      } else {
          return res.json({ loginStatus: false, Error:"wrong email or password" });
      }
    });
  });
  router.get('/publications', (req, res) => {
    const sql = "SELECT * FROM publications";
    con.query(sql, (err, result) => {
        if(err) 
        {
          console.log(err);
          return res.json({Status: false, Error: "query error"})}
        return res.json({Status: true, Result: result})
    })
})



router.post('/add_publications', (req, res) => {

  console.log(req.body.publications)
    const sql = "INSERT INTO publications (`Name`) VALUES (?)"
    con.query(sql, [req.body.publications], (err, result) => {
        if(err) 
        {
          return res.json({Status: false, Error: "query error"})}
        else{
        return res.json({Status: true})}
    })
})

router.post('/add_field', (req, res) => {
  const sql = "INSERT INTO fields (`Name`) VALUES (?)"
  con.query(sql, [req.body.fields], (err, result) => {
      if(err) 
      {
        return res.json({Status: false, Error: "query error"})}
      else{
      return res.json({Status: true})}
  })
})

router.get('/detail/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee where id = ?"
  con.query(sql, [id], (err, result) => {
      if(err) return res.json({Status: false});
      return res.json(result)
  })
})

  router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
  })

  export {router as EmployeeRouter}

