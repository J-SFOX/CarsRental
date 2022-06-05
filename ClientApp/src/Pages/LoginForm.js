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
              window.location.href = "/";
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
    <div class="col-lg-4 col-md-4 col-sm-4 container justify-content-center">
      <h1 class="container justify-content-center">Sign in</h1>
      <form onSubmit={handleSubmit}>
        <div class="form-group row">
          <label for="name" class="col-sm-4 col-form-label">UserName</label>
          <div class="col-sm-6">
            <input
              type="text"
              class="form-control"
              name="username"
              placeholder="Username"
              value={data.username}
              aria-describedby="inputGroupPrepend2" required
              onChange={changeHandler}
            />
          </div>
        </div>

        <div class="form-group row">
          <label for="name" class="col-sm-4 col-form-label">password</label>
          <div class="col-sm-6">
            <input
              type="password"
              class="form-control"
              name="password"
              placeholder="Password"
              value={data.password}
              aria-describedby="inputGroupPrepend2" required
              onChange={changeHandler}
            />
          </div>
        </div>

        <input className="btn btn-dark mb-2" type="submit" value="Connecter" />
        <div className="error">{error}</div>
      </form>
    </div>
  );
}

export default LoginForm;
