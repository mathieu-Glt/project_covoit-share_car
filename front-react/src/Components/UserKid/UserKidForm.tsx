import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Form} from "react-bootstrap";
import { createUsers } from "../../services/api/user";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams } from "react-router-dom";
import { getGroupById } from "../../services/api/group";

export default function UserKidForm() {
    const [group, setGroup]:any = useState({});
    console.log("🚀 ~ file: UserKidForm.tsx:11 ~ UserKidForm ~ group:", group)

    const params = useParams();
    const id = params.id

    const [userKid, setUserKid] = useState({
        firstname: "",
        lastname: "",
        birthday: "",
        comment: "",
        email: "",
        type: "enfant",
        group_id: "",
        asso_id: ""
    })
    
    useEffect(() => {
    async function loadGroup() {
        const response:any = await getGroupById(id);
        if (response) {
            setGroup(response);
            // userKid.group_id = response._id;
            setUserKid({ ...userKid, group_id: response._id , asso_id : response.association_id })
        }
    }
    loadGroup();
    }, [id]);

    // Function set the values of the inputs
    function handleChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = e.target
        setUserKid({ ...userKid, [name]: value })
    }

    const showToastSuccess = () => {
        toast.success('Donnée enfant crée !!', {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    const showToastError = () => {
        toast.error('Formulaire enfant invalide !!', {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    
    // Function sends register form
    const handleForm = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const responses = await createUsers(userKid);
          console.log("🚀 ~ file: UserKidForm.tsx:62 ~ handleForm ~ responses:", responses)
          if (responses) {
            console.log('votre inscription est bien terminé' + responses)
            showToastSuccess()
          }
        } catch (error) {
        showToastError()
          throw new Error("Echec de la creation d'un userKid " + error); 
        }
        // setUserKid({
        // firstname: "",
        // lastname: "",
        // birthday: "",
        // comment: "",
        // email: "",
        // type: "",
        // group_id: "",
        // asso_id:""
        // })
    }

    return (
    <>
    <div className='p-5'>
        <form className="needs-validation " onSubmit={handleForm}>
                <div className="card bg-info">
                     <h4 className="text-center mt-2">Ajouter Enfant:</h4> 
                    <div className="row">        
                        <Form.Select aria-label="Default select example" className="w-50 m-auto mt-4 mb-4 text-center">
                            <option >Selectionnez l'enfant deja enregistrer</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </div>
                </div>
            <div className="card bg-info d-flex mt-2">
                    <h4 className="text-center mt-2">Crée Enfant:</h4>
                <div className="row">
                    <div className="col-md-4 m-auto">
                        <label htmlFor="firstname" className="form-label w-100 text-center text-white">Prenom</label>
                        <input 
                            type="text" 
                            name='firstname'
                            className="form-control font-weight-bold" 
                            id="firstname" 
                            value={userKid.firstname} 
                            onChange={(e) => handleChange(e)}
                            required
                        />
                        <div className="invalid-feedback">
                            Rentrer un prenom
                        </div>          
                    </div>        
                    <div className="col-md-4 m-auto">
                        <label htmlFor="lastname" className="form-label w-100 text-center text-white">Nom</label>
                        <input 
                            type="text" 
                            name='lastname'
                            className="form-control font-weight-bold" 
                            id="lastname" 
                            value={userKid.lastname} 
                            onChange={(e) => handleChange(e)} 
                            required
                        />
                        <div className="invalid-feedback">
                            Rentrer un nom.
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                  <div className="col-md-4 m-auto">
                  <label htmlFor="email" className="form-label w-100 text-center text-white">Email Parent</label>
                      <input 
                        type="text" 
                        name='email'
                        className="form-control font-weight-bold" 
                        id="email"
                        value={userKid.email}       
                        onChange={(e) => handleChange(e)} 
                        required/>
                        <div className="invalid-feedback">
                            Svp rentrer une adresse email.
                        </div>
                  </div>
                    <div className="col-md-4 m-auto">
                        <label htmlFor="birthday" className="form-label w-100 text-center text-white">Date Anniversaire</label>
                        <input 
                            type="date" 
                            name='birthday'
                            className="form-control font-weight-bold" 
                            id="birthday"
                            value={userKid.birthday}       
                            onChange={(e) => handleChange(e)} 
                        />
                    </div>
                </div>    
                <div className="row">         
                    <div className="col-md-8 m-auto mb-4 mt-4">
                        <label htmlFor="comment" className="form-label w-100 text-center text-white">Commentaire</label>
                        <textarea
                            name='comment'
                            className="form-control font-weight-bold" 
                            id="comment"
                            onChange={(e) => handleChange(e)}
                            value={userKid.comment}      
                        />
                    </div>
                    <input name="type" value={userKid.type} type="hidden" />
                    <input name="group_id" value={userKid.group_id} type="hidden" />
                    <input name="associations" value={userKid.asso_id} type="hidden" />
                </div>     
            </div>
            <div className="row mt-4">           
                <div className="col m-auto">
                <Button variant="outline-primary float-end" type="submit">Enregistrer</Button>
                    <Link to={"/admin/groups/" + group._id}>
                        <Button variant="outline-secondary " type="submit">Retour</Button>   
                    </Link>
                    <ToastContainer/>
                </div>
            </div>       
        </form>
    </div>
</>
);
}