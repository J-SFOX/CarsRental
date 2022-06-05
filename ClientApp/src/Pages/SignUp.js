import React,{useState}  from "react";
import axios from "axios";
const SignUp = () =>{
    // const axios = require('axios');
    const [data, setData] = useState({
        username: '',
        email: '',
        gsm:'',
        password: '',
        conpassword: ''
      });
      const [msg ,setMsg] = useState("");
    const changeHandler = (e) => {
        e.preventDefault();
        setData({...data, [e.target.name]: e.target.value});
        
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(data.password !== data.conpassword){
            setMsg("Confirm password doesn't match password");
        }else{
            await axios.post('https://localhost:7092/api/users/', data )
            .then((response) => {
              console.log(response.data.userId);
              localStorage.setItem("UserId", response.data.userId);
              window.location.href = "/user";
            }, (error) => {
              console.log(error);
            });
        }
        // const formData = new FormData();
        // formData.append(data);
        
       
    }
    return (
      <div class="col-lg-4 col-md-4 col-sm-4 container justify-content-center">
      <h1 class="container justify-content-center">Sign Up</h1>
      <form  onSubmit={handleSubmit}>

          <div class="form-group row">
            <label for="name" class="col-sm-4 col-form-label">UserName</label>
            <div class="col-sm-6">
              <input
                  type="text"
                  class="form-control" 
                  id="name"
                  name="username"
                  placeholder="Username"
                  value={data.username}
                  aria-describedby="inputGroupPrepend2" required
                  onChange={changeHandler}
                /> 
            </div>
          </div>

          <div class="form-group row">
            <label for="mail" class="col-sm-4 col-form-label">Email</label>
            <div class="col-sm-6">
              <input 
                type="email"
                class="form-control"
                name="email"
                id="email"  
                placeholder="Email"
                value={data.email}
                aria-describedby="inputGroupPrepend2" required
                onChange={changeHandler}/>
            </div>
          </div>

          <div class="form-group row">
            <label for="gsm" class="col-sm-4 col-form-label">Phone Number</label>
            <div class="col-sm-6">
              <input 
              type="text"
              class="form-control"
              name="gsm"
              id="gsm" 
              placeholder="GSM"
              value={data.gsm}
              aria-describedby="inputGroupPrepend2" required
              onChange={changeHandler}/>
            </div>
          </div>

          <div class="form-group row">
            <label for="password" class="col-sm-4 col-form-label">Password</label>
            <div class="col-sm-6">
              <input
                type="password"
                class="form-control"
                name="password"
                id="password"
                placeholder="Password"
                value={data.password}
                aria-describedby="inputGroupPrepend2" required
                onChange={changeHandler}
              />
            </div>
          </div>
          
          <div class="form-group row">
          <label for="password" class="col-sm-4 col-form-label">Confirm Password</label>
            <div class="col-sm-6">
              <input
                type="password"
                class="form-control"
                name="conpassword"
                placeholder="Confirm Password"
                value={data.conpassword}
                aria-describedby="inputGroupPrepend2" required
                onChange={changeHandler}
              />
            </div>
          </div>

          <p>{msg}</p>

          <div class="form-group row">
            <div class="col-sm-2 container justify-content-center">
              <input type="submit" class="btn btn-dark mb-2" value="S'enregistrer"  />
            </div>
          </div>
      </form>
    </div>
    );
}

export default SignUp;
