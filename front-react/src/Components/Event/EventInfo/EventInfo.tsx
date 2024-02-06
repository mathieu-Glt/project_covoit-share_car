import { ChangeEvent, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteEvent, updateEvent } from "../../../services/api/event";

export default function EventInfo({evenement , filterEvent}:any) {
  console.log("🚀 ~ file: EventInfo.tsx:6 ~ EventInfo ~ evenement:", evenement)
  const [isEditing, setIsEditing] = useState(false);

  const [updateEvents, setUpdateEvents] = useState({
        name: "",
        description: "",
        startDate: "",
        participant: "",
        image: "",
  })
  
  // Function set the values of the inputs
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setUpdateEvents({ ...updateEvents, [name]: value })
    console.log(value)
  }
  
  const showToastSuccess = () => {
    toast.success('Evènement modifier !!', {
      position: toast.POSITION.TOP_RIGHT
        });
    };
    
    const showToastError = () => {
      toast.error('Echec modification evènement !!', {
        position: toast.POSITION.TOP_RIGHT
      });
  };

  const showToastSuccessDelete = () => {
      toast.success('Evenement supprimé !!', {
        position: toast.POSITION.TOP_RIGHT
      });
  };
  
    const showToastErrorDelete = () => {
      toast.error('Echec suppression evènement !!', {
        position: toast.POSITION.TOP_RIGHT
      });
  };
    
    async function handleEdit(e:React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      try {
        const response = await updateEvent(evenement._id, updateEvents);
        if (response) {
        console.log("🚀 ~ file: EventInfo.tsx:57 ~ handleEdit ~ response:", response)
          setUpdateEvents(updateEvents);
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

  console.log(updateEvents);


  async function handleDelete() {
    try {
      if (window.confirm('Voulez vous vraiment supprimer cette évènement ?')){  
        const response = await deleteEvent(evenement._id);
        if (response) {
          console.log("🚀 ~ file: EventInfo.tsx:77 ~ handleDelete ~ response:", response)
          showToastSuccessDelete();
          filterEvent(evenement._id)
        } else {
          showToastErrorDelete();
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const dateFormater = (date:any) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      // hour: "numeric",
      // minute: "numeric",
      // second: "numeric",
    });
  };
  
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
      <div className="container-event">
        {isEditing ? (
        <>
          <div className=" card mt-5 ">                   
            <form className="w-100 " onSubmit={handleEdit}>      
                <div className="w-100 d-flex flex-column">
                  <div className="d-flex flex-row mb-2">
                        <input
                          type="file"
                          name="image"
                          className="mt-4 w-25 ms-2 form-control font-weight-bold"
                          defaultValue={evenement.image}
                          onChange={(e) => handleChange(e)}
                        />
                        <input
                          type="text"
                          name="name"
                          placeholder="Nom "
                          className="mt-4 w-25 ms-2 form-control font-weight-bold"
                          defaultValue={evenement.name}
                          onChange={(e) => handleChange(e)}
                        />
                        <input
                          type="text"
                          name="description"
                          placeholder="Description"
                          className="mt-4 w-50 ms-3 form-control font-weight-bold"
                          defaultValue={evenement.description}
                          onChange={(e) => handleChange(e)}
                        />
                        <input
                          type="date"
                          name="startDate"
                          placeholder="Participant"
                          className="mt-4 w-25 ms-3 me-1 form-control font-weight-bold"
                          defaultValue={evenement.startDate}
                          onChange={(e) => handleChange(e)}
                        />
                        <input
                          type="number"
                          name="participant"
                          placeholder="Participant"
                          className="mt-4 w-25 ms-3 me-1 form-control font-weight-bold"
                          defaultValue={evenement.participant}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                  <div>
                    <Button variant="outline-info float-end ms-3 w-25 ms-2 mb-2 mt-1 me-2 " type="submit">Modifier</Button>
                    <Button variant="outline-danger me-1 ms-3 mt-1 float-start" onClick={handleDelete} className="float-end">Supprimer</Button>
                    <Button variant="outline-secondary ms-2 mt-1 "onClick={() => setIsEditing(false)}>Annuler</Button>   
                  </div>
                  <ToastContainer/>
              </div>
            </form>    
          </div>
        </>  
        ) : (
             <Card className="mt-4">
              <Card.Img variant="top" src="https://placehold.co/100x20" />
              <Card.Title className='ms-3 mt-4' >
                <p className="text-center fs-4"><span>{updateEvents.name ? updateEvents.name : evenement.name}</span></p>
              </Card.Title>
        <Card.Body>
          <Card.Text>
              <p>
                Date :
                <span className="ms-1">{dateFormater(updateEvents.startDate ? updateEvents.startDate : evenement.startDate)}</span>
              </p>  
          </Card.Text>
          <Card.Text>
          <p>Description : <span className="ms-1">{ updateEvents.description ? updateEvents.description : evenement.description}</span></p>  
          </Card.Text>
          <Card.Text>
            <p>Nombre de Participant : <span className="ms-1">{ updateEvents.participant ? updateEvents.participant : evenement.participant}</span></p> 
          </Card.Text>
          <Card.Text>
            <p>Posté le : <span className="ms-1">{dateFormaterAll(evenement.createdAt)}</span></p> 
          </Card.Text>
            <Link to={"/event/" + evenement._id}>
              <Button variant="outline-info" className="float-end">voir</Button>
            </Link>
              <Button variant="outline-warning float-end me-3" onClick={() => setIsEditing(true)}>Modifier</Button>
              {/* <Button variant="outline-danger me-3" onClick={handleDelete} className="float-end">Supprimer</Button> */}
            <ToastContainer/>
        </Card.Body>
      </Card>
    )}
    </div>
    </>
  )
}
