
import React, { Component, useState } from 'react';
import LoginForm from '../Components/LoginForm';
import SignUp from '../Components/SignUp';

const HomePage = () => {
    const [flag , setFlag] = useState(false);
    const [name , setName] = useState("SingUp");
    const handleClick = (e) => {
        e.preventDefault();
        setFlag(!flag);
        flag? setName("SignUp") : setName("Login");
    }
    return (
        <div>
            { flag ? <SignUp/> : <LoginForm/> }
            <button onClick={handleClick}>{name}</button>
        </div>
    );
};

export default HomePage;