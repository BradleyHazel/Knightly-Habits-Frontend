import React, { useState } from 'react';
import { TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


import picture from "../../assets/Wesnoth_shield.svg"
import { useContext } from "react";
import AppContext from "../AppContext";
axios.defaults.withCredentials = true;

function Register() {
    

  const myContext = useContext(AppContext);
  const nav = useNavigate();

  
  
const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");



let handleSubmit = async (e) => {
  e.preventDefault();

  axios.post('https://knightly-habits.herokuapp.com/register' , {
    username: username,
    email: email,
    password: password,
   }).then((res)=>{
       console.log(res);
       
       axios.get('https://knightly-habits.herokuapp.com/checkAuthentication')
       .then(res => {
          myContext.setLoggedIn(res.data.authenticated);
          nav("/");
          
       })
   
            
      

}).catch((error) => {
          
});
   }

   

return (
  <div style={{boxShadow:"inset 0 0 0 1000px rgba(58, 88, 121, 0.547)"}}className="form-container w-screen ">
    <div className="form-content-left">
      <img alt="Crossed swords and a shield" className="form-img hidden lg:block" src={picture}></img>
    </div>
    <div className="form-content-right">
      <div>
        <br />
      <h1 className="title text-2xl text-white font-bold ">Register</h1>
      <form onSubmit={handleSubmit}>
        <br />
        <div>
        <div>
        <TextField
          className="form-inputs"
          id="outlined-static"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          />
          </div>
        <br />
        <div>
        <TextField
          className="form-inputs"
          id="outlined-static"
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
            <br />
            <br/>
          </div>
        <TextField
          className="form-inputs"
          id="outlined-static"
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          />
          <br/>
    </div>
     <button className="form-input-btn" type="submit">
            Submit
          </button>
        {/* <Button
          type="submit"
          variant="outlined"
          sx={{
            color: "black",
            backgroundColor: "white",
            borderColor: "purple",
          }}
        >
          Submit
        </Button> */}
      </form>
      </div>
    </div >
  </div>
);
}

export default Register