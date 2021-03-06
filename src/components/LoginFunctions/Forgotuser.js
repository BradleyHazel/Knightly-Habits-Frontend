import React, { useState } from 'react';
import axios from 'axios';
import { TextField } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Temppassword from './Temppassword';


import picture from "../../assets/Wesnoth_shield.svg"

function Forgotuser() {
  
  const [email, setEmail] = useState("");

  const nav = useNavigate();


  let handleSubmit = async (e) => {
    e.preventDefault();

    axios.post('https://knightly-habits.herokuapp.com/forgotuser' , {
      email: email,
     }).then((res)=>{
         console.log(res);
            nav("/usernameconfirm");
}).catch((error) => {
 console.log(error)
});
     }

  return (
    <div style={{boxShadow:"inset 0 0 0 1000px rgba(58, 88, 121, 0.547)"}} className="form-container w-screen">
      <div className="form-content-left">
        <img alt="Crossed swords and a shield" className="form-img hidden lg:block" src={picture}></img>
      </div>
      <div className="form-content-right">
        <div>
        <h1 className="title  text-2xl text-white font-bold">Forgot Username</h1>
        <br/>
        <form onSubmit={handleSubmit}>
          <TextField
            className="form-inputs"
            id="outlined-static"
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <br />
          <button className="form-input-btn" type="submit">
          Submit
          </button>
        </form>
        </div>
      
        <Temppassword />
      </div>
    </div>
  );
}

export default Forgotuser