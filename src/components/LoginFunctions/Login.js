
import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../AppContext";
axios.defaults.withCredentials = true;


function Login() {
  
    

    const myContext = useContext(AppContext);
    const nav = useNavigate();

    
    
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  
  
let handleSubmit = async (e) => {
    e.preventDefault();

    axios.post('http://localhost:8001/login' , {
      username: username,
      password: password,
     }).then((res)=>{
         console.log(res);
         
         axios.get('http://localhost:8001/checkAuthentication')
         .then(res => {
            myContext.setLoggedIn(res.data.authenticated);
            nav("/home");
            
         })
         .catch((error) => {
            myContext.setLoggedIn(false)
       });


         
        
     
})
     }



  return (
      <div style={{boxShadow:"inset 0 0 0 1000px rgba(58, 88, 121, 0.547)"}} className="form-container w-screen">
        <div className="form-content-left">
          <img className="form-img hidden lg:block" src="https://upload.wikimedia.org/wikipedia/commons/5/5d/Wesnoth_shield.svg"></img>
        </div>
        <div className="form-content-right">
          <div>
          <h1 className="title  text-2xl text-white font-bold">Login</h1>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="form-inputs">
              <TextField
                className="form-inputs"
                id="outlined-static"
                label="Username"
                value={username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <br />
            <div className="form-inputs">
              <TextField
                className="form-inputs"
                id="outlined-static"
                label="password"
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="form-input-btn" type="submit">
              Log In
            </button>
            {/* <div className="form-input-btn"> */}
            {/* <Button
              type="submit"
              variant="outlined"
              sx={{
                color: "black",
                backgroundColor: "white",
                borderColor: "purple",
                margin: 1.5,
              }}
            >
              Submit
            </Button>
            </div> */}
          </form>
          </div>
        </div>
      </div>
  );
}

export default Login

