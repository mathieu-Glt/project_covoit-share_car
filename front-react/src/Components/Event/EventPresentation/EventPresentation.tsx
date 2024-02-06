import { ChangeEvent, useState } from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import './eventPresentation.style.css'
import { toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateEvent } from '../../../services/api/event';
import { Link } from 'react-router-dom';

export default function EventPresentation({ updateEventById, setUpdateEventById }:any){
  console.log("🚀 ~ file: EventPresentation.tsx:6 ~ EventPresentation ~ setUpdateEventById:", setUpdateEventById)
  console.log("🚀 ~ file: EventPresentation.tsx:6 ~ EventPresentation ~ updateEventById:", updateEventById)
  
  const [isEditing, setEditing] = useState(false);
  const [updatedEvent, setUpdatedEvent] = useState({
    name:"",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    event_address: "",
    description: "",
    participant:"",
    groups: ""
  })

   // Set input changes
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setUpdatedEvent({ ...updatedEvent, [name]: value })
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

    
    async function handleEdit(e: { preventDefault: () => void; }) {
      e.preventDefault();
      try {
        const response = await updateEvent(updateEventById._id, updatedEvent);
        console.log("🚀 ~ file: EventAddForm.tsx:33 ~ handleSubmit ~ response:", response)
        if (response) {
          console.log("🚀 ~ file: EventPresentation.tsx:52 ~ handleEdit ~ response:", response)    
          setUpdatedEvent(updatedEvent);
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
    });
  };

  const dateFormaterHour = (date:any) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
  };

  return (
    <>
    <div className="container mt-4">
    <Card > 
        <div className='text-center bg-primary text-white rounded-top'>Nom</div>
      <Card.Body>
        <Card.Title className='eventName'>
          {isEditing ? (
            <input
                type="text"
                name='name'
                className='form-control eventNameEdit'
                defaultValue={updateEventById.name}
                onChange={(e) => handleChange(e)}
                placeholder='Nom'
            />
            ) : (
              <p className='text-center fs-6'>{updatedEvent.name ? updatedEvent.name : updateEventById.name}</p>
            )}
        </Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          <Row>
            <Col>Date de départ:</Col>
            <Col sm="7">  
            {isEditing ? (
            <input
                type="date"
                name='startDate'
                className='form-control eventStartDateEdit'
                defaultValue={updateEventById.startDate}
                onChange={(e) => handleChange(e)}
            />
            ) : (
              <p>{dateFormaterDay(updatedEvent.startDate ? updatedEvent.startDate : updateEventById.startDate)}</p>
            )}
            </Col>
          </Row>  
          <Row>
            <Col>Heure de départ:</Col>
            <Col sm="7">
            {isEditing ? (
            <input
            type="Time"
            name='startTime'
            className='form-control eventStartTimeEdit'
            defaultValue={updateEventById.startTime}
            onChange={(e) => handleChange(e)}
            />
            ) : (
              <p>{updatedEvent.startTime ? updatedEvent.startTime: updateEventById.startTime}</p>
            )}
            </Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>Date de retour:</Col>
            <Col sm="7">  
            {isEditing ? (
            <input
            type="date"
            name='endDate'
            className='form-control eventEndDateEdit'
            defaultValue={updateEventById.endDate}
            onChange={(e) => handleChange(e)}
            />
            ) : (
              <p>{dateFormaterDay(updatedEvent.endDate ? updatedEvent.endDate : updateEventById.endDate)}</p>
            )}
            </Col>
            </Row>  
            <Row>
            <Col>Heure de retour:</Col>
            <Col sm="7">
            {isEditing ? (
            <input
              type="time"
              name='endTime'
              className='form-control eventStartTimeEdit'
              defaultValue={updateEventById.endTime}
              onChange={(e) => handleChange(e)}
            />
            ) : (
              <p>{updatedEvent.endTime ? updatedEvent.endTime : updateEventById.endTime}</p>
            )}
            </Col>
            </Row>
        </ListGroup.Item>
        <ListGroup.Item>
            <Row>
            <Col>Adresse:</Col>
            <Col className='w-100 text-center mt-2' sm="10">
            {isEditing ? (
            <input
              type="text"
              className='form-control eventAddressEdit'
              name='address'
              defaultValue={updateEventById.event_address}
              onChange={(e) => handleChange(e)}
              placeholder='Adresse'
            />
            ) : (
              <p>{updatedEvent.event_address ? updatedEvent.event_address : updateEventById.event_address}</p>
            )}   
            </Col> 
            </Row>
        </ListGroup.Item>
        <ListGroup.Item>
              <Card.Text>
              <Col>Description:</Col>
            {isEditing ? (
              <textarea
              className="form-control description-change"
              defaultValue={updateEventById.description}
              name='description'
              onChange={(e) => handleChange(e)}
              placeholder='description'
              />
              ) : (
                <p className='text-center mt-2'>{updatedEvent.description ? updatedEvent.description : updateEventById.description}</p>
              )}

            </Card.Text>
        </ListGroup.Item>
        <ListGroup.Item>
              <Card.Text>
              <Col>Participant:</Col>
            {isEditing ? (
              <input
              type='number'
              className="form-control participant-change"
              defaultValue={updateEventById.participant}
              name='participant'
              onChange={(e) => handleChange(e)}
              placeholder='Participant'
              />
              ) : (
                <p className='text-center mt-2'>{updatedEvent.participant ? updatedEvent.participant : updateEventById.participant}</p>
              )}

            </Card.Text>
        </ListGroup.Item>
        <ListGroup.Item>
              <Col>Groupes:</Col>    
               {isEditing ? (
                <select name="group" id="group" defaultValue={ updateEventById.groups} onChange={(e) => handleChange(e)}>
                  <option value="">Groupes</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
              </select>
              ) : (
                <p>{updatedEvent.groups ? updatedEvent.groups : updateEventById.groups}</p>
              )}
        </ListGroup.Item>
      </ListGroup>
      <Card.Body>
        {isEditing ? (
          <>
          <Button variant="outline-secondary" onClick={() => setEditing(false)}>Annuler</Button>
          <Button variant="outline-primary ms-4" type='submit' onClick={handleEdit}>Modifier</Button>
          </>
            ) : (
          <>
            <Button variant="outline-warning float-end" onClick={() => setEditing(true)}>Modifier</Button>
            <Link to="/events">
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
