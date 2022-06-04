import React  from "react";

const SignOut = () =>{
   
    const handleClick = () =>{
        localStorage.removeItem("UserId");
        localStorage.removeItem("admin");
        window.location.href = "/";
    }
    return (
         <button className="btn nav-item" onClick={handleClick}>Signout</button>
    );
}

export default SignOut;
