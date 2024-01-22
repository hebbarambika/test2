// LoginPage.js
import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
// import React from 'react';
import '../css/LoginPage.css';

const AdminLogin = ({ setIsAdminLoggedIn }) => {
  const history=useNavigate();

    const [adminId,setAdminname]=useState('')
    const [password,setPassword]=useState('')
    const [club,setClubname]=useState('')

    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:3000/adminlogin",{
                adminId,password,club,
            })
            .then(res=>{
                console.log('Data=====>',res)
                if(res.data!="match"){
                    // const adminid=res.data;
                    // console.log('admin id===>',adminid)
                    setIsAdminLoggedIn(true);
                    history("/admin")
                }
                else if(res.data=="doesnotmatch"){
                    alert("Incorrect Password or club")
                }
                else if(res.data=="notexist"){
                    alert("Wrong Admin name/You are not admin")
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
        <h2 className="login-text">Admin Login</h2>
        <form action="POST">
                <label htmlFor="Adminname">AdminId:</label>
                <input type="Adminname"  id="Adminname"  onChange={(e) => { setAdminname(e.target.value) }} placeholder="AdminId"  />
                <br></br>
                <label htmlFor="password">Password :</label>
                <input type="password"  id="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" autoComplete="new-password"  />
                <br></br>
                <div className="form-group">
                    <label htmlFor="club">ClubName:</label>
                    <select onChange={(e) => setClubname(e.target.value)}
                     value={club}
                     required
                     id="club"
                    >
                    <option value="" disabled>
                        Select Club
                    </option>
                    <option value="Arts Club">Arts Club</option>
                    <option value="NSS">NSS</option>
                    <option value="RedCross">Red Cross</option>
                    <option value="ITClub">IT Club</option>
                    <option value="ScienceClub">Science Club</option>
                    <option value="CommerceClub">Commerce Club</option>
                    <option value="NCCNavy">NCC Navy</option>
                    <option value="NCCArmy">NCC Army</option>
                    <option value="EcoClub">Eco Club</option>
                    <option value="RangerRovers">RangerRovers</option>
                    <option value="MSc" > M.Sc</option>
                    </select>
                </div>

                <br></br>
                <input className="submit-button1" type="submit" onClick={submit} />
      </form>

            
     </div>
    );
};

export default AdminLogin;
