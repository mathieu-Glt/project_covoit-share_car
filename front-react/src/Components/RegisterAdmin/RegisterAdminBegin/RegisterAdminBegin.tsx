import { ChangeEvent, FormEvent, useState } from "react";
import TermsModal from "../../TermsModal/TermsModal";
import { Button, Modal } from "react-bootstrap";
import { registerAdmin } from "../../../services/api/auth";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterAdminBegin() {

    const [showModal, setShowModal] = useState(false)

    const handleCloseModal = () => {
        setShowModal(false)
    };

    const [userAdmin, setUserAdmin] = useState({
      lastname: "",
      firstname: "",
      email: "",
      address: "",
      city: "",
      phone: "",
      type: "parent"
    })

    // Function set the values of the inputs
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        setUserAdmin({ ...userAdmin, [name]: value })
        console.log(value)
    }

  
  const showToastSuccess = () => {
        toast.success('Donnée admin crée !!', {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    const showToastError = () => {
        toast.error('Formulaire admin invalide !!', {
            position: toast.POSITION.TOP_RIGHT
        });
  };
    
    // Function sends register form
    const handleFormAdmin = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log('btn clické');
      const response = await registerAdmin(userAdmin);
        try {
          if (response) {
            showToastSuccess()
            console.log('votre inscription est bien terminé' + response)
          }
        } catch (error) {
          showToastError()
          throw new Error("Echec de la création d'un admin"); 
      }  

      setUserAdmin({
      firstname: "",
      lastname: "",
      email: "",
      address: "",
      city: "",
      phone: "",
      type: ""
    })   
    }
    
  return (
    <>
      <div>
        <Link to="/">
          <Button variant="outline-secondary float-start" type="submit">Retour</Button> 
        </Link>
    </div>
  <h3 className='text-center mt-5 w-100 mb-2 m-auto rounded-pill'>Veuillez renseignez les différents intitulés :</h3>
    <div className='p-5'>
      <form className="needs-validation " onSubmit={handleFormAdmin}>
        <div className="card bg-info d-flex">
          <h4 className="text-center mt-2">Partie Administrateur:</h4>
          <div className="row ">        
            <div className="col-md-4 m-auto">
              <label htmlFor="lastname" className="form-label w-100 text-center text-white">Nom</label>
              <input 
                type="text" 
                name='lastname'
                className="form-control font-weight-bold" 
                id="lastname" 
                value={userAdmin.lastname} 
                onChange={(e) => handleChange(e)} 
                required
                />
                <div className="invalid-feedback">
                  Rentrer un nom.
                </div>
            </div>   
            <div className="col-md-4 m-auto">
              <label htmlFor="firstname" className="form-label w-100 text-center text-white">Prenom</label>
              <input 
                type="text" 
                name='firstname'
                className="form-control font-weight-bold" 
                id="firstname" 
                value={userAdmin.firstname} 
                onChange={(e) => handleChange(e)}
                required
                />
                <div className="invalid-feedback">
                  Rentrer un prenom
                </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 m-auto ">
              <label htmlFor="email" className="form-label w-100 text-center text-white mt-4">Email</label>
                <input 
                  type="text" 
                  name='email'
                  className="form-control font-weight-bold" 
                  id="email"
                  value={userAdmin.email}       
                  aria-describedby="inputGroupPrepend"
                  onChange={(e) => handleChange(e)} 
                  required
                  />
                  <div className="invalid-feedback">
                    Svp rentrer une adresse email.
                  </div>
            </div>   
            <div className="col-md-4 mt-4 m-auto">
              <label htmlFor="address" className="form-label w-100 text-center text-white">Adresse</label>
              <input 
                type="text" 
                name='address'
                className="form-control font-weight-bold" 
                id="address"
                value={userAdmin.address}       
                onChange={(e) => handleChange(e)} 
                required
              />
                <div className="invalid-feedback">
                  Svp rentrer une adresse.
                </div>
            </div>
          </div>
          <div className="row">         
            <div className="col-md-4 m-auto mb-4 mt-4">
              <label htmlFor="city" className="form-label w-100 text-center text-white">Ville</label>
              <input 
                type="text" 
                name='city'
                className="form-control font-weight-bold" 
                id="city"
                onChange={(e) => handleChange(e)}
                value={userAdmin.city}      
                required
                />
                <div className="invalid-feedback">
                  Rentrer une ville.
                </div>
            </div>
            <div className="col-md-4 m-auto mb-4">
              <label htmlFor="phone" className="form-label w-100 text-center text-white">Telephone</label>
              <input 
                type="text" 
                name='phone'
                className="form-control font-weight-bold" 
                id="phone"
                value={userAdmin.phone}  
                onChange={(e) => handleChange(e)} 
                required
                />
                <div className="invalid-feedback">
                  Rentrer un numero de telephone.
                </div>
            </div>
          </div>
        </div>     
        <div className="row mt-4">           
          <div className="col-md-4 m-auto ">
            <div className="form-check">
              <input className="form-check-input " type="checkbox" value="" id="invalidCheck" required />
                <TermsModal/>
                <Modal 
                show={showModal} 
                onClose={handleCloseModal}/>
                <div className="invalid-feedback">
                  Vous devez validez les conditions générales
                </div>
            </div>
          </div>
          <div className="col-md-4 m-auto">
            <Button variant="outline-primary float-end" type="submit">Inscription</Button>
            <ToastContainer/>
          </div>
        </div>
      </form>
    </div>
    </>
  );
}