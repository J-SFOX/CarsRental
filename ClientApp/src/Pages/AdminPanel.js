import React from 'react';


const AdminPanel = () => {
    return (
         
        <div>
             {
                localStorage.getItem("admin") ? 
                <div> Admin Panel </div> 
                : 
                window.location.href="/"
                }
        </div>
    );
};

export default AdminPanel;



