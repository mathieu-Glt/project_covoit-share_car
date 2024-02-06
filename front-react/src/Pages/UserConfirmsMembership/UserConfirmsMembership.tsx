import { Button, Modal } from 'react-bootstrap';
import TermsModal from '../../Components/TermsModal/TermsModal';
import './userConfirmsMembership.style.css';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { updateUser } from '../../services/api/user';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { findTokenByToken } from '../../services/api/auth';
import { useParams } from 'react-router-dom';

//IL S AGIT D UN UPDATE USER PARENT PLUTOT 
export default function UserConfirmsMembership() {
  const [userParent, setUserParent]:any = useState({});
  console.log("🚀 ~ file: UserConfirmsMembership.tsx:14 ~ UserConfirmsMembership ~ userParent:", userParent)
  const userId = userParent.user_id;
  console.log("🚀 ~ file: UserConfirmsMembership.tsx:16 ~ UserConfirmsMembership ~ userId:", userId)
  const confPasswordError:any = document.querySelector(".password-conf-error");

  const [showModal, setShowModal] = useState(false)

  const handleCloseModal = () => {
        setShowModal(false)
  };

  const params = useParams();
  const token = params.token;

  const [updateUserParent, setUpdateUserParent] = useState({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      passwordConf: "" ,
      address: "",
      city: "",
      phone: "",
      type: "parent",
  })

    // Function set the values of the inputs
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        setUpdateUserParent({ ...updateUserParent, [name]: value })
        console.log(value)
  }

  const showToastSuccess = () => {
        toast.success('Donnée utilisateur crée !!', {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    const showToastError = () => {
        toast.error('Formulaire utilisateur invalide !!', {
            position: toast.POSITION.TOP_RIGHT
        });
  };
  
    
    useEffect(() => {
    async function loadUserToken() {
        const response:any = await findTokenByToken(token);
        if (response) {
            console.log("🚀 ~ file: GroupsListPage.tsx:28 ~ loadGroup ~ response:", response)
            setUserParent(response);
            // userKid.group_id = response._id;
          setUpdateUserParent({ ...updateUserParent, email: response.email})
        }
    }
    loadUserToken();
    }, [token]);
  
    
    
    // Function sends register form
    const handleConfirmsMembership = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const response = await updateUser(userId,updateUserParent);
      try {
            if (response) { 
              showToastSuccess()
              window.location.href = "/";
              console.log('votre inscription est bien terminé' + response)
          }
            else if (userParent.password === userParent.passwordConf) {
              confPasswordError.innerHTML =
            "Les mot des passes ne correspondent pas ";
          }
        } catch (error) {
          showToastError()
          throw new Error("Echec de la creation de l'utilisateur parent");
        }   
    }

  return (
    <>
    <h2 className='text-center mt-5 bg-info w-50 m-auto rounded-top rounded-bottom'>Finaliser votre inscription</h2>
        <div className='p-5'>
              <form className="row g-3 needs-validation" onSubmit={handleConfirmsMembership}>
              <div className="col-md-4">
                  <label htmlFor="firstname" className="form-label w-100 text-center">Prenom</label>
                  <input 
                    type="text" 
                    name='firstname'
                    className="form-control font-weight-bold" 
                    id="firstname" 
                    value={updateUserParent.firstname} 
                    onChange={(e) => handleChange(e)}
                    required/>
                      <div className="invalid-feedback">
                        Rentrer un prenom
                      </div>
              </div>
              <div className="col-md-4">
                  <label htmlFor="lastname" className="form-label w-100 text-center">Nom</label>
                  <input 
                    type="text" 
                    name='lastname'
                    className="form-control font-weight-bold" 
                    id="lastname" 
                    value={updateUserParent.lastname} 
                    onChange={(e) => handleChange(e)} 
                    required/>
                      <div className="invalid-feedback">
                        Rentrer un nom.
                      </div>
              </div>
              <div className="col-md-4">
                  <label htmlFor="email" className="form-label w-100 text-center">Email</label>
                  <div className="input-group has-validation">
                      <span className="input-group-text" id="inputGroupPrepend">@</span>
                      <input 
                        type="text" 
                        name='email'
                        className="form-control font-weight-bold" 
                        id="email"
                        defaultValue={userParent.email}
                        value={updateUserParent.email}       
                        aria-describedby="inputGroupPrepend"
                        onChange={(e) => handleChange(e)} 
                        disabled
                        required/>
                          <div className="invalid-feedback">
                            Svp rentrer une adresse email.
                          </div>
                  </div>
              </div>
              <div className="col-md-4 ">
                  <label htmlFor="password" className="form-label w-100 text-center">Mot de passe</label>
                  <input
                    type="password"
                    name='password'
                    className="form-control font-weight-bold"
                    id="password"
                    onChange={(e) => handleChange(e)}
                    value={updateUserParent.password} 
                    required />
                  <div className="valid-feedback">
                        Svp rentrer un mot de passe.
                  </div>
              </div>
              <div className="col-md-4">
                  <label htmlFor="passwordConf" className="form-label w-100 text-center">Confirmer Mot de passe</label>
                  <input
                    type="password"
                    name="passwordConf"
                    id="passwordConf"
                    className="form-control font-weight-bold"
                    onChange={(e) => handleChange(e)}
                    value={userParent.passwordConf}
                    required />
                  <div className="password-conf-error bg-danger text-center mt-4"></div>
              </div>
              <div className="col-md-4">
                  <label htmlFor="city" className="form-label w-100 text-center">Ville</label>
                  <input 
                    type="text" 
                    name='city'
                    className="form-control font-weight-bold" 
                    id="city"
                    onChange={(e) => handleChange(e)}
                    value={updateUserParent.city}      
                    required/>
                      <div className="invalid-feedback">
                        Rentrer une ville.
                      </div>
              </div>
              <div className="col-md-8">
                  <label htmlFor="address" className="form-label w-100 text-center">Adresse</label>
                  <input 
                    type="text" 
                    name='address'
                    className="form-control font-weight-bold" 
                    id="address"
                    value={updateUserParent.address}       
                    onChange={(e) => handleChange(e)} 
                    required/>
                      <div className="invalid-feedback">
                          Svp rentrer une adresse.
                      </div>
              </div>
              <div className="col-md-4">
                  <label htmlFor="phone" className="form-label w-100 text-center">Telephone</label>
                  <input 
                    type="text" 
                    name='phone'
                    value={updateUserParent.phone}  
                    className="form-control font-weight-bold" 
                    id="phone"
                    onChange={(e) => handleChange(e)} 
                    required/>
                      <div className="invalid-feedback">
                        Rentrer un numero de telephone.
                      </div>
              </div>
                  <input name="type" value={updateUserParent.type} type="hidden" />
              <div className="col-12">
                  <div className="form-check float-center">
                    <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                      <TermsModal/>
                        <Modal 
                          show={showModal} 
                          onClose={handleCloseModal}/>
                        <div className="invalid-feedback">
                          Vous devez validez les conditions général
                        </div>
                  </div>
              </div>
              <div className="col-12 mt-4">
                  <Button 
                    variant="outline-primary float-end" 
                    type="submit">Validez inscription
                  </Button>
                <ToastContainer/>
              </div>
          </form>
        </div >
    </>
  )
}
