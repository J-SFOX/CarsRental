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
            await axios.post('https://localhost:7092/api/users/',data )
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
        <form  onSubmit={handleSubmit}>
            Sign UP
            UserName:
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={data.username}
                aria-describedby="inputGroupPrepend2" required
                onChange={changeHandler}
              /> <br />
            Email :
            <input type="email"
              name="email"
              id="email"  
              placeholder="Email"
              value={data.email}
              aria-describedby="inputGroupPrepend2" required
              onChange={changeHandler}/>
<br />
            Phone Number :
            <input type="tel"
              name="gsm"
              id="gsm" 
              placeholder="GSM"
              value={data.gsm}
              aria-describedby="inputGroupPrepend2" required
              onChange={changeHandler}/>
<br />
            Password:
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={data.password}
              aria-describedby="inputGroupPrepend2" required
              onChange={changeHandler}
            />
            
<br />
            Confirm Password:
            <input
              type="password"
              name="conpassword"
              placeholder="Confirm Password"
              value={data.conpassword}
              aria-describedby="inputGroupPrepend2" required
              onChange={changeHandler}
            />
            <p>{msg}</p>
            <input type="submit" value="S'Enregistrer"  />
        </form>
    );
}

export default SignUp;
