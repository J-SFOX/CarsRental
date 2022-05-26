import React  from "react";

const SignOut = () =>{
   
    const handleClick = () =>{
        localStorage.removeItem("UserId");
        window.location.href = "/";
    }
    return (
         <button onClick={handleClick}>Signout</button>
    );
}

export default SignOut;
