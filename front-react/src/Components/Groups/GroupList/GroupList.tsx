import { ChangeEvent, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { deleteGroup, updateGroup } from "../../../services/api/group";



export default function GroupList({ group, filterGroup }:any) {
    const [isEditing, setIsEditing] = useState(false);
    
    const [updatedGroup, setUpdatedGroup] = useState({
        name: "",
        description: "",
        headcount: "",
  })
  
  // Function set the values of the inputs
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        setUpdatedGroup({ ...updatedGroup, [name]: value })
    }

     const showToastSuccess = () => {
    toast.success('Groupe modifier !!', {
      position: toast.POSITION.TOP_RIGHT
        });
    };
    
    const showToastError = () => {
      toast.error('Echec modification groupe !!', {
        position: toast.POSITION.TOP_RIGHT
      });
  };

  const showToastSuccessDelete = () => {
      toast.success('Groupe supprimé !!', {
        position: toast.POSITION.TOP_RIGHT
      });
  };
  
    const showToastErrorDelete = () => {
      toast.error('Echec suppression groupe !!', {
        position: toast.POSITION.TOP_RIGHT
      });
  };
    
    async function handleEdit(e:React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      try {
        const response = await updateGroup(group._id, updatedGroup);
        console.log("🚀 ~ file: GroupList.tsx:55 ~ handleEdit ~ response:", response)
        if (response) {
        console.log("🚀 ~ file: GroupList.tsx:57 ~ handleEdit ~ response:", response)
          setUpdatedGroup(updatedGroup);
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
      if (window.confirm('Voulez vous vraiment supprimer cette évènement ?')){  
        const response = await deleteGroup(group._id);
        if (response) {
          console.log("🚀 ~ file: EventInfo.tsx:77 ~ handleDelete ~ response:", response)
          showToastSuccessDelete();
          filterGroup(group._id)
        } else {
          showToastErrorDelete();
        }
      }
    } catch (error) {
      throw new Error("Echec de la suppression du group " + error);
      
    }
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
    <div className="container-groupsPage">
        <div>
            {isEditing ? (
                <>
                    <div className="card mt-5">       
                        <form  onSubmit={handleEdit}>      
                            <div className="w-100 d-flex mb-3">
                                <input
                                  type="text"
                                  name="name"
                                  placeholder="Nom du groupe "
                                  className="mt-4 w-25 ms-4 form-control font-weight-bold"
                                  defaultValue={group.name}
                                  onChange={(e) => handleChange(e)}
                                />
                                <input
                                  type="text"
                                  name="description"
                                  placeholder="Description"
                                  className="mt-4 w-50 ms-5 form-control font-weight-bold"
                                  defaultValue={group.description}
                                  onChange={(e) => handleChange(e)}
                                />
                                <input
                                  type="text"
                                  name="headcount"
                                  placeholder="Quantité"
                                  className="mt-4 w-25 ms-4 form-control font-weight-bold"
                                  defaultValue={group.headcount}
                                  onChange={(e) => handleChange(e)}
                                />
                            </div>
                                <Button variant="outline-secondary ms-4 mb-2 " onClick={() => setIsEditing(false)}>Annuler</Button>
                                <Button variant="outline-info float-end w-25 ms-2 me-2 mb-2" type="submit">Modifier</Button>
                                <Button variant="outline-danger float-end me-3 mb-2" onClick={handleDelete}>Supprimer</Button>
                        </form>    
                    </div>
                </>  
              ) : (
            <>     
            <Card className='mt-4'>
                    <Card.Header as="h5" className="text-center">{updatedGroup.name ? updatedGroup.name : group.name}</Card.Header>
                    <Card.Body>
                        <Card.Title>{updatedGroup.description ? updatedGroup.description : group.description}</Card.Title>
                        <Card.Text className="mt-3">
                          Quantité : {updatedGroup.headcount? updatedGroup.headcount : group.headcount} adhérents
                        </Card.Text>
                        <Card.Text className="mt-3">
                          Crée le : {dateFormaterAll(group.createdAt)}
                        </Card.Text>
                        <Link to={"/admin/groups/" + group._id}>
                          <Button variant="outline-info float-end ">Voir</Button>
                        </Link>
                          <Button variant="outline-warning float-end me-3" onClick={() => setIsEditing(true)}>Modifier</Button>
                          {/* <Button variant="outline-danger float-end me-3" onClick={handleDelete}>Supprimer</Button> */}
                          <ToastContainer/>
                    </Card.Body>
            </Card>
            </> 
              )}
        </div>
    </div>
  );
}