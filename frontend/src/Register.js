import React, { useEffect } from "react";
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Register() {

  useEffect(() => {
    localStorage.clear()
  })

    const [info, setInfo] = useState({name : "", password: "", email:"", gender: "", phoneNo: ""})
    const navigate = useNavigate();

    const handleChange = (event) => {
        
        console.log(info)
        console.log(info)
        
        fetch("http://localhost:5000/api/users", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(info)
        })
        .then(res => res.json())
        .then((post) => {
          if(post.token) {
            localStorage.setItem("token", JSON.stringify(post))
            navigate(`/dashboard`, {replace : true})
          }
          else{
            alert("email already exists")
          }
          console.log(post)
        });
       
      };

      const handleInputChange = (e) => {
        console.log(e.target.name, e.target.value)
        setInfo({ ...info, [e.target.name]: e.target.value})
      }

  return (
    
    <div className="App">
      {/* <Header />
      <CardImage /> */}
      <h1>Registration </h1>
      <h3>Name</h3><input value = {info.name} name="name" onChange={(e) => handleInputChange(e)} />
      <h3>Email</h3><input value = {info.email} name="email" onChange={(e) => handleInputChange(e)} />
      <h3>Password</h3><input value = {info.password} type="password" name="password"  onChange={(e) => handleInputChange(e)} />
      <h3>Gender</h3><select name="gender" onChange={(e) => handleInputChange(e)} defaultValue="male">
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="others">Others</option>
      </select>
      {/* <input value = {info.gender} name="gender"  onChange={(e) => handleInputChange(e)} /> */}

      
      <div>
      <button onClick={handleChange}>Register</button>
      <p>already have acccount ?</p>
      <Link to="/">
        <button>Sign In</button>
      </Link>
      </div>
      
    </div>
  );
}

export default Register;
