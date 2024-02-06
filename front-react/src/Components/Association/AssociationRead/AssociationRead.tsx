import { ChangeEvent, useState } from "react";
import { Button, Card, Col, ListGroup } from "react-bootstrap"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { updateAssociation } from "../../../services/api/association";
import { Link } from "react-router-dom";

//PAGE TO Read Association
export default function AssociationRead({updateAssociationById, setUpdateAssociationById}:any) {
console.log("🚀 ~ file: AssociationRead.tsx:4 ~ AssociationRead ~ setUpdateAssociationById:", setUpdateAssociationById)
console.log("🚀 ~ file: AssociationRead.tsx:4 ~ AssociationRead ~ updateAssociationById:", updateAssociationById)
    const [isEditing, setEditing] = useState(false);
    const [updatedAssociation, setUpdatedAssociation] = useState({
    image: "",
    name:"",
    description: "",
    })
    
  // Set input changes
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setUpdatedAssociation({ ...updatedAssociation, [name]: value })
    console.log(value)
  }

  const showToastSuccess = () => {
    toast.success('Association modifier !!', {
      position: toast.POSITION.TOP_RIGHT
        });
    };
    
    const showToastError = () => {
      toast.error('Echec modification Association !!', {
        position: toast.POSITION.TOP_RIGHT
      });
  };
 

    async function handleEdit(e: { preventDefault: () => void; }) {
      e.preventDefault();
      try {
        const response = await updateAssociation(updateAssociationById._id, updatedAssociation);
        console.log("🚀 ~ file: EventAddForm.tsx:33 ~ handleSubmit ~ response:", response)
        if (response) {
          console.log("🚀 ~ file: EventPresentation.tsx:52 ~ handleEdit ~ response:", response)    
          setUpdatedAssociation(updatedAssociation);
          showToastSuccess();
        } else {
          console.log('Le formulaire n\'est pas valide');
          showToastError();
        }
      } catch (error) {
        console.log(error)
      }
      setEditing(false);
  }
  
  const dateFormaterDay = (date:any) => {
    return new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
    });
  };


    return (
    <>
    <div className="container mt-4">
        <Card >
        {isEditing ? (
        <input
            type="file"
            name="image"
            className="img-fluid mt-2"
            defaultValue={updateAssociationById.image}
            accept="image/*"
            onChange={(e) => handleChange(e)}
            />
        ) : (
        <>
        <Card.Img variant="top" src="https://placehold.co/100x20" alt="Picture association" />
        {/* <img className='img-fluid' src={association.image} alt="Picture association" /> */}
        </>    
        )}            
        <div className='text-center fs-4'>Nom de l'association:</div>
      <Card.Body>
        <Card.Title className='groupName'>
          {isEditing ? (
            <input
                type="text"
                name='name'
                className='form-control groupNameEdit w-50 m-auto'
                defaultValue={updateAssociationById.name}
                onChange={(e) => handleChange(e)}
                placeholder='Nom'
            />
            ) : (
            <p className='text-center w-50 m-auto fs-6 '>{updatedAssociation.name ? updatedAssociation.name : updateAssociationById.name}</p>                       
            )}
        </Card.Title>
      </Card.Body>
        <ListGroup.Item>
              <Card.Text>
              <Col className="text-center fs-4 mt-2">Description:</Col>
            {isEditing ? (
              <textarea
              className="form-control description-change mt-4 text-center w-75 m-auto"
              defaultValue={updateAssociationById.description}
              name='description'
              onChange={(e) => handleChange(e)}
              placeholder='description'
              />
              ) : (
                <p className='text-center mt-2 '>{updatedAssociation.description ? updatedAssociation.description : updateAssociationById.description}</p>                   
            )}
            </Card.Text>
            </ListGroup.Item>
        <ListGroup.Item>
              <Card.Text>
                <Col className="text-center fs-4 mt-2">Date de création:</Col>
                <p className='text-center mt-2 '>{dateFormaterDay(updateAssociationById.createdAt)}</p>            
            </Card.Text>
            </ListGroup.Item>              
        <ListGroup.Item>
              <Card.Text>
                <Col className="text-center fs-4 mt-2">Date de modification:</Col>
                <p className='text-center mt-2 '>{dateFormaterDay(updateAssociationById.updatedAt)}</p>            
            </Card.Text>
            </ListGroup.Item>              
      <Card.Body>
        {isEditing ? (
          <>
          <Button variant="outline-primary ms-4 float-end" type='submit' onClick={handleEdit}>Modifier</Button>
          <Button variant="outline-secondary " onClick={() => setEditing(false)}>Annuler</Button>
          </>
            ) : (
          <>
          <Button variant="outline-warning float-end" onClick={() => setEditing(true)}>Modifier</Button>
            <Link to="/admin/associations">
              <Button variant="outline-secondary" onClick={() => setEditing(true)}>Retour</Button>   
            </Link>        
          </>     
        )}
        <ToastContainer/>
      </Card.Body>
    </Card>
    </div>
    </>
    )
  }