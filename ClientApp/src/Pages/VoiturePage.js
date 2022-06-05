import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios';
const VoiturePage = () => {
  const [voitures, setVoitures] = useState([]);
  const [carBand, setCarBrand] = useState("");
  const [carAv, setCarAv] = useState(true);
  const [carId, setCarId] = useState()
  const [carObject, setCarObject] = useState({});
  const [amount, setAmount] = useState(0);
  const [rent, setRent] = useState({
    'type': "",
    'pickupdate': null,
    'returndate': null,
    'userid':null,
    'carid':null
  }
  )
  // const [updateCar,setUpdateCar] = useState({})

  useEffect(() => {
    axios.get('https://localhost:7092/api/cars')
      .then((response) => {
        console.log(response);
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
  }
  const changeAmountHandler = (e) => {
    e.preventDefault()
    setAmount(e.target.value)
  }

  const handleDelete = (id) => {
    axios.delete('https://localhost:7092/api/cars/' + id)
    setRent(...rent)
  }

  const handleUpdate = (car) => {
    setCarAv(car.available)
    setCarBrand(car.brand)
    setCarId(car.carId)
  }

  const handleUpdateModal = () => {
    const data = {
      "carId": carId,
      "brand": carBand,
      "available": carAv,
      "amount": amount
    }
    axios.put('https://localhost:7092/api/cars/' + carId, data);
  }



  const changeRentHandler = (e) => {
    e.preventDefault()
    setRent({ ...rent, [e.target.name]: e.target.value });
  }


  const submitRent = (e) => {
    e.preventDefault()
     try {
      const data = {
        type: rent.type,
        pickUpDate: rent.pickupdate,
        returnDate: rent.returndate,
        userId: localStorage.getItem("UserId"),
        user: null,
        carId: carObject.carId,
        car: null
      }
      const response = axios({
        method: "post",
        url: "https://localhost:7092/api/rents/",
        data: data,
        headers: { 'Content-Type': 'application/json' },
      });
      const data1 = {
        "carId": carObject.carId,
        "brand": carObject.brand,
        "available": !carObject.available,
        "amount": carObject.amount
      }
      axios.put('https://localhost:7092/api/cars/' + carObject.carId, data1);
      setCarObject(data1)
      setRent({
        'type': "",
        'pickupdate': null,
        'returndate': null,
        'userid':null,
        'carid':null
      })
    } catch (error) {
      console.log(error)
    }
  }

  const rentHandler = (car) => {
    setCarObject(car)
   
  }


  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {

      const data = {
        "brand": carBand,
        "available": carAv,
        "amount": amount
      }
      // make axios post request
      const response = await axios({
        method: "post",
        url: "https://localhost:7092/api/cars/",
        data: data,
        headers: { 'Content-Type': 'application/json' },
      });
      setCarBrand("")
      setAmount(0)
    } catch (error) {
      console.log(error)
    }
  }
  const func = voitures.map((car) => {
    return (
      <tr className='text-center' key={car.carId}>
        <td scope="col" >{car.carId}</td>
        <td scope="col">{car.brand}</td>
        <td scope='col'>{car.amount}</td>
        <td scope="col text-center">{car.available ? <p className="text-success text-center">oui</p> : <p className="text-danger text-center">non</p>}</td>
        {localStorage.getItem("admin") ? <td > <div className="btn-group btn-group-sm " role="group" > <button className='btn btn-success ' data-target="#updateModal" scope="col text-center" data-toggle="modal" onClick={() => handleUpdate(car)}>update</button> <button className='btn btn-danger' onClick={() => handleDelete(car.carId)}>delete</button> </div></td> :
          <td > <div className="btn-group btn-group-sm " role="group" > <button className='btn btn-warning' data-target="#reservationModal" scope="col text-center" data-toggle="modal" onClick={() => rentHandler(car)} disabled={car.available ? false : true}>
            Reserver</button></div></td>}
      </tr>
    )
  })

  return (
    <div className='container mt-4'>
      <div className="d-flex justify-content-between mb-3 text-dark">
        Listes Voitures
        {localStorage.getItem("admin") ?
          <button className='btn btn-primary' scope="col text-center" data-toggle="modal" data-target="#exampleModal">Ajouter voiture</button> : null}
      </div>
      <table className="table">
        <thead className=" bg-dark text-white">
          <tr className='text-center'>
            <th scope="col text-center">Immatriculation</th>
            <th scope="col text-center">Marque</th>
            <th scope="col text-center">Amount</th>
            <th scope="col text-center">Disponible</th>
            <th scope="col text-center">Controll</th>

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
                  <input type="text" className="form-control" id="exampleInputEmail1" name="brand" value={carBand} onChange={changeBrandHandler} aria-describedby="emailHelp" />
                </div>
                <div className="form-group">
                  <label >Available</label>
                  <select className="form-control" name="available" id="exampleFormControlSelect1" defaultChecked={carAv} onChange={changeAvHandler}   >
                    <option value="true">Disponible</option>
                    <option value="false">Non disponible</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Prix</label>
                  <input type="number" id="typeNumber" class="form-control" value={amount} onChange={changeAmountHandler} />
                </div>
                <button type="submit" className="btn btn-primary">Ajouter</button>
              </form>
            </div>

          </div>
        </div>
      </div>
      {/* Modifier */}
      <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modifier Voiture</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleUpdateModal}>
                <div className="form-group">
                  <label >Marque Voiture</label>
                  <input type="text" className="form-control" required id="exampleInputEmail1" name="brand" value={carBand} onChange={changeBrandHandler} aria-describedby="emailHelp" />
                </div>
                <div className="form-group">
                  <label >Available</label>
                  <select className="form-control" required name="available" id="exampleFormControlSelect1" defaultChecked={carAv} onChange={changeAvHandler}   >
                    <option value="true">Disponible</option>
                    <option value="false">Non disponible</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Prix</label>
                  <input type="number" id="typeNumber" required class="form-control" value={amount} onChange={changeAmountHandler} />
                </div>
                <button type="submit" className="btn btn-primary" >Modifier</button>
              </form>
            </div>

          </div>
        </div>
      </div>
      {/* Reservation */}
      <div className="modal fade" id="reservationModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Reservation</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={submitRent}>
                <div className="form-group">
                  <label >Pick-Up Date</label>
                  <input classeName="form-control" required value={rent.pickupdate} disabled={carObject.available ? false : true} onChange={changeRentHandler} type="datetime-local" name='pickupdate' />
                </div>
                <div className="form-group">
                  <label >Return Date</label>
                  <input classeName="form-control" required value={rent.returndate} disabled={carObject.available ? false : true} onChange={changeRentHandler} type="datetime-local" name='returndate' />
                </div>
                <div className="form-group">
                  <label >Type</label>
                  <select className="form-control" required name="type" id="exampleFormControlSelect1" disabled={carObject.available ? false : true} defaultChecked={rent.type} onChange={changeRentHandler}   >
                    <option value="tres courte duree">Trés Courte Durée</option>
                    <option value="courte duree">Courte Durée</option>
                    <option value="longue duree">Longue Durée</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary" disabled={carObject.available ? false : true}>Reserver</button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>

  );
};

export default VoiturePage;