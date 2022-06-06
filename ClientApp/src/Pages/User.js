import React, { useEffect, useState } from 'react';
import axios from 'axios';

const User = () => {
    const [user, setUser] = useState({
        userName : null,
        password : null,
        email : null,
        phoneNumber:null,
    });
    const [userName, setUserName] = useState("")
    const [password ,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [phoneNumber ,setPhoneNumber] = useState("")
    const [conPassword ,setConPassword] = useState("")
    const [msg ,setMsg] = useState("");
    const [data, setData] = useState({
        username: '',
        email: '',
        gsm:'',
        password: '',
        conpassword: ''
      });
    // setRent({ ...rent, [e.target.name]: e.target.value });
    
   
   
    const handleSubmit = () => {
        const Id = localStorage.getItem("UserId");
        const data = {
            "UserId" : Id,
            "userName": userName,
            "password": password,
            "email": email,
            "PhoneNumber": phoneNumber,
            "rents" : null
        }
        axios.put('https://localhost:7092/api/users/' + Id, data);
    }
    const getUser = () =>{
        const Id = localStorage.getItem("UserId");
        console.log(Id)
        axios.get('https://localhost:7092/api/users/'+Id).then(response =>{
            const data = response.data
            // console.log(data.userName)
            setUserName(data.userName);
            setPassword(data.password);
            setEmail(data.email);
            setPhoneNumber(data.phoneNumber);
            // setUser(previousState => {
            //     return { ...previousState, userName: data.userName ,password : data.password , email: data.email, phoneNumber : data.phoneNumber}
            // });
        });
       
       

    }
    const changeUNHandler = (e) => {
        e.preventDefault()
        setUserName(e.target.value)
      }

      const changePNHandler= (e) =>{
        e.preventDefault();
        setPhoneNumber(e.target.value)
    }
    const changeEmailHandler= (e) =>{
        e.preventDefault();
        setEmail(e.target.value)
    }
    const changePassHandler= (e) =>{
        e.preventDefault();
        setPassword(e.target.value)
    }




   
    
    

    useEffect(() => {
       getUser(); 
      },[])
    return (
        
        <div>
       {
        localStorage.getItem("UserId") ? 
            <div className="container mt-5 "> 
                    <div className="d-flex justify-content-between p-3 border-bottom border-dark mb-5">
                        <div className='h-100 align-middle font-weight-bolder'><p>{userName.toUpperCase()}</p></div>
                        <button className='btn btn-warning' data-target="#ModiModal" scope="col text-center" data-toggle="modal" > Modifier</button>
                    </div>
                    <div className='d-flex justify-content-between pl-5  mx-5 mt-3'>
                        <p className='w-25 font-weight-bold'>UserName</p>:
                        <p className='w-50 ml-5 text-left'>{userName}</p>
                    </div>
                    <div className='d-flex justify-content-between pl-5 mx-5 mt-3'>
                         <p className='w-25 font-weight-bold'>Email</p>:
                         <p className='w-50 ml-5 text-left'> {email}</p>
                    </div>
                    <div className='d-flex justify-content-between pl-5 mx-5 mt-3'>
                        <p className='w-25 font-weight-bold'>PhoneNumber</p>:
                        <p className='w-50 ml-5 text-left '> {phoneNumber}</p>
                    </div>
                    <div className='d-flex justify-content-between pl-5 mx-5 mt-3'>
                        <p className='w-25 font-weight-bold'>Password</p>:
                        <p className='w-50 ml-5 text-left'> {password}</p>
                        
                    </div>
                    <div className="border-bottom h-100 mt-5 border-dark"></div>
                    <div className="modal fade" id="ModiModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modification Profile</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                            <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                <label >Nom Utilisateur</label>
                                <input type="text" className="form-control" required id="exampleInputEmail1" name="brand" value={userName} onChange={changeUNHandler} aria-describedby="emailHelp" />
                                </div>
                                <div className="form-group">
                                <label >Email</label>
                                <input type="text" className="form-control" required id="exampleInputEmail1" name="brand" value={email} onChange={changeEmailHandler} aria-describedby="emailHelp" />
                                
                                </div>
                                <div className="form-group">
                                <label>PhoneNumber</label>
                                <input type="text" id="typeNumber" required class="form-control" value={phoneNumber} onChange={changePNHandler} />
                                </div>
                                <div className="form-group">
                                <label>Password</label>
                                <input type="password" id="typeNumber" required class="form-control" value={password} onChange={changePassHandler} />
                                </div>
                                <button type="submit" className="btn btn-primary" >Modifier</button>
                            </form>
                            </div>
                        </div>
        </div>
      </div>
            </div> 
        : 
        window.location.href="/"}
        </div>
    );
};

export default User;