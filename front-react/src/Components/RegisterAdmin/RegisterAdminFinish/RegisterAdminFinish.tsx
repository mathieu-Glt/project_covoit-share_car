import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { findTokenByToken } from "../../../services/api/auth";
import { useParams } from "react-router-dom";
import { updateUserParentAdmin } from "../../../services/api/user";

export default function RegisterAdminFinish() {
    const [userAdmin, setUserAdmin]:any = useState({});
    console.log("🚀 ~ file: RegisterAdminFinish.tsx:8 ~ RegisterAdminFinish ~ userAdmin:", userAdmin)
    const [userAdminData, setUserAdminData]: any = useState({});
    console.log("🚀 ~ file: RegisterAdminFinish.tsx:13 ~ RegisterAdminFinish ~ userAdminData:", userAdminData)
    const userId = userAdmin.user_id;
    console.log("🚀 ~ file: RegisterAdminFinish.tsx:15 ~ RegisterAdminFinish ~ userId:", userId)
    const params = useParams();
    const token = params.token;
    const [userAdminConfirm, setUserAdminConfirm] = useState({
        password: "",
        confirmPassword: ""
    })

    // Function set the values of the inputs
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        setUserAdminConfirm({ ...userAdminConfirm, [name]: value })
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

    
    // Function sends register form
    const handleFormAdmin = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
        console.log('btn clické');
      const response = await updateUserParentAdmin(userId,userAdminConfirm);
        try {
          if (response && userAdminConfirm.password === userAdminConfirm.confirmPassword) {
            showToastSuccess()
            window.location.href = "/";  
            console.log('votre inscription est bien terminé' + response)
          } else {
              showToastError()    
          }
        } catch (error) {
            throw new Error("Echec de la finalisation d'un admin " + error);
        }   
    }

    useEffect(() => {
    async function loadUserAdminToken() {
        const response:any = await findTokenByToken(token);
        if (response) {
            console.log("🚀 ~ file: GroupsListPage.tsx:28 ~ loadGroup ~ response:", response)
            setUserAdmin(response);
            // userKid.group_id = response._id;
        }
    }
    loadUserAdminToken();
    }, [token]);
    
  return (
    <>
  <h3 className='text-center mt-5 w-100 mb-2 m-auto rounded-pill'>Terminer votre inscription :</h3>
    <div className='p-5'>
        <form className="needs-validation" onSubmit={handleFormAdmin}>
            <div className="card bg-info d-flex ">
                <div className="row bg-primary w-75 m-auto mt-4 mb-4 rounded-top rounded-bottom">
                    <h4 className="text-center mt-4">A Compléter :</h4>      
                    <div className="col-md-4 m-auto mb-4">
                        <label htmlFor="password" className="form-label w-100 text-center text-white">Mot de passe</label>
                        <input 
                            type="password" 
                            name='password'
                            className="form-control font-weight-bold" 
                            id="password" 
                            value={userAdminConfirm.password} 
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        <div className="invalid-feedback">
                            Rentrer un Mot de passe
                        </div>
                    </div>
                    <div className="col-md-4 m-auto">
                        <label htmlFor="confirmPassword" className="form-label w-100 text-center text-white">Confirmer Mot de passe</label>
                        <input 
                            type="password" 
                            name='confirmPassword'
                            className="form-control font-weight-bold" 
                            id="confirmPassword" 
                            value={userAdminConfirm.confirmPassword} 
                            onChange={(e) => handleChange(e)} 
                            required
                        />
                        <div className="invalid-feedback">
                            Rentrer un mot de passe similaire.
                        </div>
                    </div>   
                </div>   
            </div>     
            <div className="mt-4">             
                <Button variant="outline-primary float-end" type="submit">Finaliser l'inscription</Button>
                <ToastContainer/>
            </div>
          </form>
        </div>
    </>
  );
}