import { useState, ChangeEvent } from 'react';
import { Button, Card} from 'react-bootstrap';
import { ToastContainer,toast } from 'react-toastify';
import { deleteAssociation, updateAssociation } from '../../../services/api/association';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';


export default function AssociationList({ association, filterAssociation }:any) {
const [isEditing, setIsEditing] = useState(false);
const [updatedAssociation, setUpdatedAssociation] = useState({
    name: "",
    image: "",
    description: ""
})

    
  // Set input changes
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setUpdatedAssociation({ ...updatedAssociation, [name]: value })
  }
  
    const showToastSuccess = () => {
    toast.success('Association modifier !!', {
      position: toast.POSITION.TOP_RIGHT
        });
    };
    
    const showToastError = () => {
      toast.error('Echec modification association !!', {
        position: toast.POSITION.TOP_RIGHT
      });
  };

  const showToastSuccessDelete = () => {
      toast.success('Association supprimé !!', {
        position: toast.POSITION.TOP_RIGHT
      });
  };
  
    const showToastErrorDelete = () => {
      toast.error('Echec suppression association!!', {
        position: toast.POSITION.TOP_RIGHT
      });
  };
    
    async function handleEdit(e: { preventDefault: () => void; }) {
      e.preventDefault();
      try {
        const response = await updateAssociation(association._id,updatedAssociation);
        if (response) {
          console.log("🚀 ~ file: AssociationList.tsx:55 ~ handleEdit ~ response:", response)
          setUpdatedAssociation(updatedAssociation);
          showToastSuccess();
        } else {
          console.log('Le formulaire n\'est pas valide');
          showToastError();
        }
      } catch (error) {
        console.log(error)
      }
      setIsEditing(false);
    }

    async function handleDelete() {
    try {
      if (window.confirm('Voulez vous vraiment supprimer cette Association ?')){  
        const response = await deleteAssociation(association._id);
        if (response) {
         console.log("🚀 ~ file: AssociationList.tsx:73 ~ handleDelete ~ response:", response)
          showToastSuccessDelete();
          filterAssociation(association._id)
        } else {
          showToastErrorDelete();
        }
      }
    } catch (error) {
        throw new Error("supprésion n'a pas fonctionné " + error)
        }
    setIsEditing(false);
    }
    
    const dateFormaterAll = (date:any) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      // second: "numeric",
    });
  };
       

return (
<>
  <div className='card mb-2'>
      <form>
              <div className=''>
                {isEditing ? (
                  <>
                    <input
                      type="file"
                      name="image"
                      className="form-control mt-2 bg-primary text-white w-50 m-auto"
                      defaultValue={association.image}
                      accept="image/*"
                      onChange={(e) => handleChange(e)}
                    />
                  </>
                      ) : (
                        <>
                        <Card.Img variant="top" src="https://placehold.co/100x20" alt="Picture association" />
                        {/* <img className='img-fluid' src={association.image} alt="Picture association" /> */}
                        </>    
                )}
              </div>
            <div className='association-description mt-3'>
                {isEditing ? (
                        <input
                        type="text"
                        name="name"
                        className="form-control name-change bg-primary text-white w-75 m-auto"
                        placeholder='Nom'
                        defaultValue={association.name}
                        onChange={(e) => handleChange(e)}
                        />
                        ) : (
                            <>
                <Card.Title className='ms-3 mt-4' >
                     <p className='text-center mt-5'><span>{updatedAssociation.name ? updatedAssociation.name : association.name}</span></p>
                </Card.Title>
               
                </>
                )}
            </div>
            <div className='association-description mt-3'>
                {isEditing ? (
                    <textarea
                    name="description"
                    className="form-control description-change bg-primary text-white text-center w-75 m-auto"
                    placeholder='Description'
                    defaultValue={association.description}
                    onChange={(e) => handleChange(e)}
                    />
                    ) : (
                        <>
                <Card.Text><p className='ms-2'>Description :<span className="ms-1">{updatedAssociation.description ? updatedAssociation.description : association.description}</span></p></Card.Text>
                </>
                )}
                </div>
                <div>
                <Card.Text><p className='ms-2 mt-2'>Crée le : {dateFormaterAll(association.createdAt)}</p></Card.Text>
                </div>
            {isEditing ? (
                <>
                <div>
                    <Button variant="outline-secondary ms-2 mt-2 " onClick={() => setIsEditing(false)}>Annuler</Button>
                    <Button variant="outline-primary float-end w-25 me-2 mb-2 mt-2 " type='submit' onClick={handleEdit}>Modifier</Button>
                    <Button variant="outline-danger float-end mt-2 me-4" onClick={handleDelete}>Supprimer</Button>
                </div>
            </>
        ) : (
            <>
              <div className=''>
              <div>
                <Link to={"/admin/association/" + association._id}>
                  <Button variant="outline-info mt-5 float-end  me-3 mb-2">Voir</Button>
                </Link>
              </div>
              <div className='bg-info'>
                <Button variant="outline-warning mt-5 float-end me-3 mb-2" onClick={() => setIsEditing(true)}>Modifier</Button>
              </div>
              <div>
                <Link to={"/admin/groups/create/" + association._id}>
                  <Button variant="outline-primary mt-5 float-start  ms-3 mb-2">Créer un Groupe</Button>
                </Link>
              </div>
              <div>
                <Link to={"/admin/events/create/" + association._id}>
                  <Button variant="outline-primary mt-5 float-start  ms-3 mb-2">Créer un Evènement</Button>
                </Link>
              </div>
            <ToastContainer />
            </div>
            </>
        )} 
    </form>
  </div>  
</>
)}