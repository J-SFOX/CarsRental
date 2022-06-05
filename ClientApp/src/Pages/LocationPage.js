import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios';


const LocationPage = () => {
 
const [rents,setRent] = useState([])

useEffect(() => {
  axios.get('https://localhost:7092/api/rents')
    .then((response) => {
      console.log(response)
      response.data.map((d)=>{
        // console.log(d);
        axios.get('https://localhost:7092/api/users/'+d.userId)
        .then((response) => {
          var clientname = response.data.userName
          axios.get('https://localhost:7092/api/cars/'+d.carId)
          .then((response) => {
            var carname = response.data.brand
            let newRent={
              userId:d.userId,
              rentId:d.rentId,
              carId:d.carId,
              type:d.type,
              pickUpDate:d.pickUpDate,
              returnDate:d.returnDate,
              clientName:clientname,
              carName: carname
            }
            // console.log(newRent);
            setRent((oldArray) =>  [...oldArray, newRent])
          }, (error) => {
            console.log(error);
          });
      })
        }, (error) => {
          console.log(error);
        });
      })
    }, (error) => {
      console.log(error);
},[rents]);

const handleSupprimer = (r) =>{
  axios.delete('https://localhost:7092/api/rents/' + r.rentId)
  axios.get('https://localhost:7092/api/cars/'+r.carId)
  .then((response) => {
    console.log(response.data)
    const test = {
      "carId": r.carId,
      "brand": response.data.brand,
      "available": true,
      "amount": response.data.amount
    }
    axios.put('https://localhost:7092/api/cars/' + r.carId, test);
  }, (error) => {
    console.log(error);
  });
}

    return (
        <div className='container mt-4'>
      <div className="d-flex justify-content-between mb-3 text-dark">
        Voitures Loué
      </div>
      <table className="table">
        <thead className=" bg-dark text-white">
          <tr className='text-center'>
            <th scope="col text-center">Type</th>
            <th scope="col text-center">Date de Location</th>
            <th scope="col text-center">Date de Retour</th>
            <th scope="col text-center">Client</th>
            <th scope="col text-center">Voiture</th>
            <th scope="col text-center">Controll</th>
            
          </tr>
        </thead>
        <tbody className='text-black'>
          {
            
            rents.map( (rent)=>
            (
              <tr className='text-center' key={rent.rentId}>
                <td scope="col" >{rent.type}</td>
                <td scope="col">{rent.pickUpDate}</td>
                <td scope='col'>{rent.returnDate}</td>
                <td scope="col">{rent.clientName}</td>
                <td scope='col'>{rent.carName}</td>
                <td scope='col'>
                {
                localStorage.getItem("admin") || localStorage.getItem("UserId") == rent.userId ?
                  <button 
                    className='btn btn-danger btn-sm' 
                    onClick={() => handleSupprimer(rent)}>
                      Supprimer
                  </button> : null
                }
                </td>
              </tr> 
            )
            )
          }
        </tbody>
      </table>
      </div>
    );
};

export default LocationPage;