import React, { useState } from 'react';
import NavBar from '../Components/NavBar';
import SignOut from '../Components/SignOut';
import HomePage from './HomePage';



const User = () => {
  
    return (
        <div>
       {
        localStorage.getItem("UserId") ? 
        <div>  <p>exist</p> </div> 
        : 
        window.location.href="/"}
        </div>
    );
};

export default User;