import './App.css';
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Login from './components/LoginFunctions/Login';
import Register from './components/LoginFunctions/Register';
import AppContext from './components/AppContext';
import Temppassword from './components/LoginFunctions/Temppassword';
import Resetconfirmed from './components/confimations/Resetconfirmed';
import Forgotuser from './components/LoginFunctions/Forgotuser';
import Resetconfirmed2 from './components/confimations/Resetconfirmed2';
import RegistrationConfirmed from './components/confimations/Registrationconfirmed';
import Usernameconfirm from './components/confimations/Usernameconfirm';
import Logout from './components/LoginFunctions/Logout';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoginNav from './components/LoginForms/LoginNav';
import LoginHome from './components/LoginForms/LoginHome'
import Resetpassword from './components/LoginFunctions/Resetpassword';
import Main from './components/Main'
axios.defaults.withCredentials = true;


function App() {
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setuser] = useState("");

  const userSettings = {
    loggedIn: loggedIn,
    user:user,
    setuser,
    setLoggedIn,
  };


  axios.get('http://localhost:8001/user')
  .then(res => {
    console.log(res.data._id)
    if(res.data._id){
    setuser(res.data._id);
    }
  })
  .catch((error) => {
    setuser("")
});


  useEffect(() => {

  

    axios.get('http://localhost:8001/checkAuthentication')
      .then(res => {
        setLoggedIn(res.data.authenticated);
     
      })
      .catch((error) => {
        setLoggedIn(false)
    });
  }, []);

  function handleChange(){
 
  }
  return (
    <div  className='flex'> 
    <AppContext.Provider value={userSettings}>
      {loggedIn ? (
        <div className="App">
      
          

            <Routes>
            <Route path="/" exact element={<Main />} />
              <Route path="/home" element={<Main />} />
              <Route path="/logout" element={<Logout />} />

      
            </Routes>
       
        </div>
      ) : (
        <div >
          <LoginNav />
    
          {/* <Link to="/register">
         Signup
        </Link>
        <Link to="/login">
          Login
        </Link>
        <Link to="/forgot">
          Forgot Password
        </Link>
        <Link to="/forgotuser">
          Forgot Username
        </Link>
        <Link to="/resetpassword">
          Reset Password
        </Link> */}
        </div>
      )}
      <Routes>
        <Route path="/" exact element={<LoginHome />} />
        <Route path="/forgotuser" element={<Forgotuser />} />

        <Route path="/register" element={<Register />} />
        <Route path="/resetpassword" element={<Resetpassword />} />
        <Route path="/resetconfirmed" element={<Resetconfirmed />} />
        <Route path="/resetconfirmed2" element={<Resetconfirmed2 />} />
        <Route path="/usernameconfirm" element={<Usernameconfirm />} />
        <Route path="/RegistrationConfirmed" element={<RegistrationConfirmed />} />
        
        <Route path="/logout" element={<LoginHome />} />
        <Route path="/login" element={<Login onChange={handleChange} />} />
        <Route
        path="*"
        element={<Navigate to="/" replace />}
    />
      </Routes>
    </AppContext.Provider>
    </div>
  );
}

export default App
