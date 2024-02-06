import { ChangeEvent, useState } from "react";
import { Button, Card, Col, Form, ListGroup} from "react-bootstrap";
import { updateGroup } from "../../../services/api/group";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link, NavLink} from "react-router-dom";

//PAGE TO Read Group 
export default function GroupsRead({ updateGroupById, setUpdateGroupById }:any) {
console.log("🚀 ~ file: GroupsRead.tsx:3 ~ GroupsRead ~ setUpdateGroupById:", setUpdateGroupById)
console.log("🚀 ~ file: GroupsRead.tsx:3 ~ GroupsRead ~ updateGroupById:", updateGroupById)
    const [isEditing, setEditing] = useState(false);
    const [updatedGroup, setUpdatedGroup] = useState({
    name:"",
    headcount: "",
    description: "",
    user: "",
    })
    
      // Set input changes
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setUpdatedGroup({ ...updatedGroup, [name]: value })
    console.log(value)
  }

  const showToastSuccess = () => {
    toast.success('Group modifier !!', {
      position: toast.POSITION.TOP_RIGHT
        });
    };
    
    const showToastError = () => {
      toast.error('Echec modification group !!', {
        position: toast.POSITION.TOP_RIGHT
      });
  };

    async function handleEdit(e: { preventDefault: () => void; }) {
      e.preventDefault();
      try {
        const response = await updateGroup(updateGroupById._id, updatedGroup);
        console.log("🚀 ~ file: EventAddForm.tsx:33 ~ handleSubmit ~ response:", response)
        if (response) {
          console.log("🚀 ~ file: EventPresentation.tsx:52 ~ handleEdit ~ response:", response)    
          setUpdatedGroup(updatedGroup);
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
        <div className='text-center fs-4'>Nom du groupe :</div>
      <Card.Body>
        <Card.Title className='groupName'>
          {isEditing ? (
            <input
                type="text"
                name='name'
                className='form-control groupNameEdit w-50 m-auto'
                defaultValue={updateGroupById.name}
                onChange={(e) => handleChange(e)}
                placeholder='Nom'
            />
            ) : (
            <p className='text-center w-50 m-auto fs-6 '>{updatedGroup.name ? updatedGroup.name : updateGroupById.name}</p>                       
            )}
        </Card.Title>
        <div className='text-center fs-4 mt-4'>Capacité :</div>
        <Card.Title className='groupHeadcount'>
          {isEditing ? (
            <input
                type="text"
                name='headcount'
                className='form-control groupNameEdit w-50 m-auto mt-2'
                defaultValue={updateGroupById.headcount}
                onChange={(e) => handleChange(e)}
                placeholder='Nombre'
            />
            ) : (
            <p className='text-center w-50 m-auto fs-6 mt-2'>{updatedGroup.headcount ? updatedGroup.headcount : updateGroupById.headcount} Membres</p>                      
            )}
        </Card.Title>
      </Card.Body>
        <ListGroup.Item>
              <Card.Text>
              <Col className="text-center fs-4 mt-2">Description :</Col>
            {isEditing ? (
              <textarea
              className="form-control description-change mt-4 text-center w-75 m-auto"
              defaultValue={updateGroupById.description}
              name='description'
              onChange={(e) => handleChange(e)}
              placeholder='description'
              />
              ) : (
              <p className='text-center mt-2 '>{updatedGroup.description ? updatedGroup.description : updateGroupById.description}</p>                   
            )}
            </Card.Text>
        </ListGroup.Item>    
            <ListGroup.Item>
              <Col className="text-center fs-4 mt-4">Liste du groupe : </Col>    
               {isEditing ? (
                <Form.Select name="group" id="group" className="text-center mt-4 w-50 m-auto" defaultValue={updatedGroup.user} onChange={(e) => handleChange(e)}>
                  <option value="">Listes</option>
                  <option value="1">Camille</option>
                  <option value="2">Benoit</option>
                  <option value="3">George</option>
                  <option value="4">Fred</option>
                  <option value="5">Eric</option>
                  <option value="6">Lilou</option>
                </Form.Select>
                    ) : (
                <Form.Select name="group" id="group" className="text-center w-50 m-auto mt-4" defaultValue={updatedGroup.user} onChange={(e) => handleChange(e)}>
                  <option value="">Listes</option>
                  <option value="1">Camille</option>
                  <option value="2">Benoit</option>
                  <option value="3">George</option>
                  <option value="4">Fred</option>
                  <option value="5">Eric</option>
                  <option value="6">Lilou</option>
              </Form.Select>
                // <p>{updatedGroup.user ? updatedGroup.user : updateGroupById.user}</p>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
            <Card.Text>
            <Col className="text-center fs-4 mt-3">Date de création :</Col>
                <p className='text-center mt-2 '>{dateFormaterDay(updateGroupById.createdAt)}</p>            
            </Card.Text>
            </ListGroup.Item>              
            <ListGroup.Item>
              <Card.Text>
                <Col className="text-center fs-4 mt-3">Date de modification :</Col>
                <p className='text-center mt-2 '>{dateFormaterDay(updateGroupById.updatedAt)}</p>            
            </Card.Text>
            </ListGroup.Item>   
        <Card.Body>
        {isEditing ? (
        <>
          <Button variant="outline-warning ms-4 float-end" type='submit' onClick={handleEdit}>Modifier</Button>
          <Button variant="outline-secondary float-end" onClick={() => setEditing(false)}>Annuler</Button>
        </>
        ) : (
        <>
          <NavLink to={"/user/typekid/create/" + updateGroupById._id}>
            <Button variant="outline-primary ms-4 float-end">Rajouter ou crée un adhérent</Button>
          </NavLink>
              <Button variant="outline-warning float-end" onClick={() => setEditing(true)}>Modifier</Button>
           <Link to="/admin/groups">
            <Button variant="outline-secondary ms-4">Retour</Button>
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