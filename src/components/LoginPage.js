// LoginPage.js
import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
// import React from 'react';
import '../css/LoginPage.css';

const LoginPage = ({ setIsUserLoggedIn }) => {
  const history=useNavigate();

    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')

    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:3000/login",{
                username,password
            })
            .then(res=>{
                if(res.data=="match"){
                    setIsUserLoggedIn(true);
                    history("/",{state:{id:username}})
                }
                else if(res.data=="doesnotmatch"){
                    alert("Enter correct Password")
                }
                else if(res.data=="notexist"){
                    alert("User have not sign up")
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })

        }
        catch(e){
            console.log(e);

        }

    }
  return (
    <div className="login-container">
      <h2 className="login-text">Login</h2>
      <form action="POST">
                <label htmlFor="username">Username:</label>
                <input type="username" onChange={(e) => { setUsername(e.target.value) }} placeholder="Username"  />
                <br></br>
                <label htmlFor="password">Password :</label>
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password"  />
                <br></br>
                <input className="submit-button1" type="submit" onClick={submit} />
      </form>

            <br />
            <p>Don't have an account?</p>
            {/* <br /> */}
            
            <Link to="/Signup">Signup Page</Link>
    </div>
  );
};

export default LoginPage;
