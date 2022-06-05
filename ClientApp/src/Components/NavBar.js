import React from 'react';
import SignOut from './SignOut';

const NavBar = () => {
    //  redha kif kant for responsive
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand " href="#">
                SHO
            </a>
         
           <div className="d-flex justify-content-between  w-100">
              {localStorage.getItem("UserId")? 
                    <div className="navbar" id="navbarNavDropdown">
                            <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link" href="/">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/voiture">
                                    Voitures
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/location">
                                    Mes Locations
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/user">
                                    Profile
                                </a>
                            </li>
                            </ul>
                    </div>
                
                   : localStorage.getItem("admin")? 
                        <div className="navbar" id="navbarNavDropdown">
                            <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link" href="/">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/voiture">
                                    Voitures
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/utilisateur">
                                    utilisateurs
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/location">
                                    Locations
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link">
                                    <b>ADMIN</b>
                                </a>
                            </li>
                            </ul>
                        </div>
                   : 
                   <div className="navbar" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link" href="/">
                                    Home
                                </a>
                            </li>
                        </ul>
                    </div> 
                    }
                <div>
                    {
                        localStorage.getItem("UserId") || localStorage.getItem("admin")? <SignOut/>  :
                        <ul className=' d-flex justify-content-between m-2'>
                            <button className='btn nav-item' ><a href="/sign-in" className='text-decoration-none'>Sign In</a></button>
                            <button className='btn nav-item' ><a href="/sign-up" className='text-decoration-none'>Sign Up</a></button>
                        </ul>
                    }
                </div>
           </div>
        </nav>
    );
};

export default NavBar;