import React, { useState } from 'react';
import SignOut from '../Components/SignOut';



const User = () => {
  
    return (
        localStorage.getItem("UserId") ? <div> <SignOut/> <p>exist</p> </div> : <div>doesnt</div>
    );
};

export default User;