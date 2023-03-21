import React, { useEffect } from "react";
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignIn() {

  useEffect(() => {
    localStorage.clear()
  })

    const [info, setInfo] = useState({ email:"", password: ""})
    const navigate = useNavigate();

    const handleChange = (event) => {
        
        console.log(info)
        console.log(info)
        
        fetch("http://localhost:5000/api/users/detail", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(info)
        })
        .then(res => res.json())
        .then((post) => {
          if(post.token) {
            console.log(post)
            localStorage.setItem("token", JSON.stringify(post))
            navigate(`/dashboard`, {replace : true})
          }
          else{
            console.log(post)
            alert(post.message)
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
      <h1>Sign In </h1>
      <h3>Email</h3><input value = {info.email} name="email" onChange={(e) => handleInputChange(e)} />
      <h3>Password</h3><input value = {info.password} type="password" name="password"  onChange={(e) => handleInputChange(e)} />      
      <div>
      <button onClick={handleChange}>Sign In</button>
      <p>Don't have acccount ?</p>
      <Link to="/Register">
        <button>Sign Up</button>
      </Link>
      </div>
      
    </div>
  );
}

export default SignIn;
