import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios';
const VoiturePage= () => {
  const [voitures ,setVoitures] = useState([]);
  const [carBand, setCarBrand] = useState("");
  const [carAv, setCarAv] = useState("");

   useEffect (()=>{
      axios.get('https://localhost:7092/api/cars')
      .then((response) => {
        setVoitures(response.data)
      }, (error) => {
        console.log(error);
      });
      
   });

   const changeBrandHandler = (e) => {
    e.preventDefault();
    setCarBrand(e.target.value);
    
  }
  const changeAvHandler = (e) => {
    e.preventDefault();
    // console.log(e.target.value)
    const value = JSON.parse(e.target.value)
    setCarAv(value);
    console.log(carAv);
  }

   const handleAddSubmit = async (e)=>{
    e.preventDefault();
    try {
      
      const data = {
        "brand" : carBand,
        "available" : carAv
      }
      console.log(data)
      // make axios post request
      const response = await axios({
        method: "post",
        url: "https://localhost:7092/api/cars/",
        data: data,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch(error) {
      console.log(error)
    }
   }
  const func = voitures.map((car)=>{
      return(
            <tr className='text-center'key={car.carId}>
              <td scope="col" >{car.carId}</td>
              <td scope="col">{car.brand}</td>
              <td scope="col text-center">{car.available? <p className="text-success text-center">oui</p> : <p className="text-danger text-center">non</p>}</td>
              {localStorage.getItem("admin") ? <td > <div className="btn-group btn-group-sm " role="group" > <button className='btn btn-success '>update</button> <button className='btn btn-danger'>delete</button> </div></td> : null}
            </tr>
      )
    })
    
    return (
        <div className='container mt-4'>
            <div className="d-flex justify-content-between mb-3 text-dark">
              Listes Voitures
            {localStorage.getItem("admin") ? 
                  <button className='btn btn-primary' scope="col text-center" data-toggle="modal" data-target="#exampleModal">Ajouter voiture</button>: null}
            </div>
            <table className="table">
              <thead className=" bg-dark text-white">
                <tr className='text-center'>
                  <th scope="col text-center">Immatriculation</th>
                  <th scope="col text-center">Marque Voiture</th>
                  <th scope="col text-center">disponible</th>
                  {localStorage.getItem("admin") ? 
                  <th scope="col text-center">Control</th>: null}
                 
                </tr>
              </thead>
              <tbody className='text-black'>
                {func}
              </tbody>
            </table>
          {/* Ajouter */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Ajouter Voiture</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleAddSubmit}>
                      <div className="form-group">
                        <label >Marque Voiture</label>
                        <input type="text" className="form-control" id="exampleInputEmail1"  name="brand" value={carBand} onChange={changeBrandHandler} aria-describedby="emailHelp"/>
                      </div>
                      <div className="form-group">
                        <label >Available</label>
                        <select className="form-control" name="available" id="exampleFormControlSelect1" defaultChecked={carAv} onChange={changeAvHandler}   >
                          <option value="true">Disponible</option>
                          <option value="false">Non disponible</option>
                        </select>
                      </div>
                      <button type="submit" className="btn btn-primary" >Ajouter</button>
                    </form>
                  </div>
                  
                </div>
              </div>
            </div>
          {/* Modifier */}
        </div>
        
    );
};

export default VoiturePage;