import React from 'react';
import './index.css';
import App from './App';
// import Navbar from '/components/Navbar.js'
// import Journal from './components/Journal'

import ReactDOM from "react-dom/client";
import {
  BrowserRouter
} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  
  <BrowserRouter>
 

        <App />

     
  
  </BrowserRouter>
);