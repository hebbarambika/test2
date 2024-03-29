// AdminLoginPage.js
import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { useAdminContext } from '../context/AdminContext'
import '../css/AdminLogin.css';

const AdminLogin = ({ setIsAdminLoggedIn }) => {
    const history=useNavigate();
    const { setAdmin } = useAdminContext();

    const [adminId,setAdminname]=useState('')
    const [password,setPassword]=useState('')
    // const [club,setClubname]=useState('')

    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:3000/adminlogin",{
                adminId,password,
            })
            .then(res => {
                console.log('Data=====>', res);
                if (res.data.status === "match") {
                    // Successful login
                    setIsAdminLoggedIn(true);
                    setAdmin(res.data.admin);
                    history("/admin");
                } else if (res.data.status === "doesnotmatch") {
                    // Unauthorized: Incorrect Password or club
                    alert("Incorrect Password");
                } else if (res.data.status === "notexist") {
                    // Not Found: Wrong Admin name/You are not admin
                    alert("Wrong Admin name/You are not admin");
                }
            })
            .catch(e => {
                // Internal Server Error or other unexpected errors
                alert("Wrong details");
                console.log(e);
            });

        }
        catch(e){
            console.log(e);

        }

    }
  return (
     <div className="login-container">
        <h2 className="login-text">Admin Login</h2>
        <form action="POST">
                <label htmlFor="Adminname">AdminId:</label>
                <br/>
                <input type="Adminname"  id="Adminname"  onChange={(e) => { setAdminname(e.target.value) }} placeholder="AdminId"  />
                <br></br>
                <label htmlFor="password">Password :</label>
                <br/>
                <input type="password"  id="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" autoComplete="new-password"  />
                <br></br>
                
                
                <input className="submit-button2" type="submit" onClick={submit} />
      </form>

    </div>
    );
};

export default AdminLogin;
