import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  // const axios = require('axios');
  const [data, setData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState("")
  const changeHandler = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });

  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(data)
    if (data.username === "root" && data.password === "root") {
      localStorage.setItem("admin", true);
      window.location.href = "/";
    } else {
      axios.get('https://localhost:7092/api/users/' + data.username + "/" + data.password)
        .then((response) => {
          if(response.data != -1){
            if(response.data != -2){
              localStorage.setItem("UserId", response.data);
              window.location.href = "/user";
            }else{
              setError("Bad credentials")
            }
          }else{
            setError("Bad credentials")
          }
        }, (error) => {
          console.log(error);
        });
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      UserName:
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={data.username}
        aria-describedby="inputGroupPrepend2" required
        onChange={changeHandler}
      />


      password:
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={data.password}
        aria-describedby="inputGroupPrepend2" required
        onChange={changeHandler}
      />
      <input type="submit" value="Connecter" />
      <div className="error">{error}</div>
    </form>
  );
}

export default LoginForm;
