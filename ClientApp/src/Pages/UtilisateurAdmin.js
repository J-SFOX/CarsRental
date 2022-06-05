
import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios';


const UtilisateurAdmin = () => {

    const [utilisateur,setUtilisateur] = useState([])

    useEffect(() => {
        axios.get('https://localhost:7092/api/users')
          .then((response) => {
            console.log(response);
            setUtilisateur(response.data)
          }, (error) => {
            console.log(error);
          });
      },[]);

      const handleDelete = (id) => {
        axios.delete('https://localhost:7092/api/users/' + id)
      }

      const func = utilisateur.map((u) => {
        return (
          <tr className='text-center' key={u.userId}>
            <td scope="col" >{u.userId}</td>
            <td scope="col">{u.userName}</td>
            <td scope='col'>{u.email}</td>
            <td scope='col'>{u.phoneNumber}</td>
            {localStorage.getItem("admin") ? 
            <td > 
                    <button className='btn btn-danger' onClick={() => handleDelete(u.userId)}>
                        delete
                    </button> 
            </td> : <div>VOUS N AVEZ PAS LE DROIT D ETRE ICI</div>
          }
          </tr>
        )
      })

    return ( 
      <div className='container'>
            {
                localStorage.getItem("admin") ? 
                null 
                : 
                window.location.href="/"
            }
          <h1>Utilisateurs</h1>
          <div className='container mt-4'>
      <div className="d-flex justify-content-between mb-3 text-dark">
        Listes Voitures
        
          <button className='btn btn-primary' scope="col text-center" data-toggle="modal" data-target="#exampleModal">Ajouter voiture</button>
      </div>
      <table className="table">
        <thead className=" bg-dark text-white">
          <tr className='text-center'>
            <th scope="col text-center">Id Utilisateur</th>
            <th scope="col text-center">Nom Client</th>
            <th scope="col text-center">Email</th>
            <th scope="col text-center">Numero Tel</th>
            <th scope="col text-center">Controll</th>

          </tr>
        </thead>
        <tbody className='text-black'>
          {func}
        </tbody>
      </table>
      </div>

      </div>
    );
};

export default UtilisateurAdmin;