import { Button} from 'react-bootstrap';
import { ChangeEvent, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createAssociation } from '../../../services/api/association';
import { useParams } from 'react-router-dom';


export default function AssociationsCreateForm() {
    const params = useParams();
    const userId = params.id;
    console.log("🚀 ~ file: AssociationsCreateForm.tsx:12 ~ AssociationsCreateForm ~ userId:", userId)  
    const [association, setAssociation] = useState({
    name:"",
    image: "",
    description: ""
    })

    // Function set the values of the inputs
    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target
        setAssociation({ ...association, [name]: value })
  }

  const showToastSuccess = () => {
        toast.success('Association crée !!', {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    const showToastError = () => {
        toast.error('Formulaire association invalide !!', {
            position: toast.POSITION.TOP_RIGHT
        });
  };
   
    // Envoie du formulaire
  const handleForm = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await createAssociation(userId,association);
    try { 
      // validation 
      if (response) {
        console.log('Formulaire soumis avec succès !' + response);
        showToastSuccess()
      } else {
        console.log('Le formulaire n\'est pas valide');
        showToastError()
      }
    } catch (error) {
        throw new Error("Erreur de la fonction " + error);
        
    }
    setAssociation({
            name: "",
            image:"",
            description:"",
        })
  };

  return (
    <>
    <h3 className='text-center mt-5 bg-info w-50 m-auto rounded-pill'>Crée votre Association</h3>
        <div className='p-5'>
            <form className="row g-3 needs-validation" onSubmit={handleForm}>
                <div className='row bg-info mt-2 rounded-top '>
                    <div className="col-md-4 m-auto mt-2">
                        <label htmlFor="image" className="form-label w-100 text-center text-white">Image</label>
                        <input 
                        type="file" 
                        name='image'
                        className="form-control font-weight-bold" 
                        id="image" 
                        value={association.image} 
                        onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="col-md-4 m-auto">
                        <label htmlFor="name" className="form-label w-100 text-center text-white">Nom </label>
                        <input 
                        type="text" 
                        name='name'
                        className="form-control font-weight-bold" 
                        id="name" 
                        value={association.name} 
                        onChange={(e) => handleChange(e)} 
                        required
                        />
                        <div className="invalid-feedback">
                            Rentrer un nom.
                        </div>
                    </div>      
                  </div>
                <div className='row bg-info rounded-bottom'>
                    <div className="col-md-8 m-auto mb-4">
                        <label htmlFor="description" className="form-label w-100 text-center text-white">Description</label>
                        <textarea
                        name='description'
                        className="form-control font-weight-bold" 
                        id="description"
                        onChange={(e) => handleChange(e)}
                        value={association.description}      
                        required
                        />
                        <div className="invalid-feedback">
                            Rentrer une description.
                        </div>
                    </div>     
                </div>
              <div className="col-12 mt-4">
                  <Button 
                    variant="outline-primary float-end" 
                    type="submit">Créer Association
                  </Button>
                <ToastContainer/>
              </div>
            </form>
        </div >
    </>
  )
}