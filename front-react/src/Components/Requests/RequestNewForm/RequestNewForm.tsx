import { ChangeEvent, useState } from "react";
import { Container, Row, Col, Form, Card, Button} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { createRequest } from "../../../services/api/request";

export default function RequestNewForm() {
const params = useParams();
const event_id = params.id;
  
   // on récupère les datas user dans une const
  const user = localStorage.getItem('user');
  // on convertit le localStorage en object JS
  const data = JSON.parse(user);
  // on récupère le userId
  const user_id = data._id
  
  const [request, setRequest] = useState({
    firstname: data.firstname,
    eventId:event_id,
    userId:user_id,
    nbSeat: 0,
    direction:"",
    departureTime:"",
    pickupAddress:"",
    type:"",
})

function handleChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) {
  const { name, value }: any = e.target;
  setRequest({ ...request, [name]: value})
  }
  
  const showToastSuccess = () => {
        toast.success('Requete envoyé  !!', {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    const showToastError = () => {
        toast.error('Requete invalide !!', {
            position: toast.POSITION.TOP_RIGHT
        });
  };
  
async function handleRequest(e:React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const response = await createRequest(event_id,request);
  try {
    if (response) {
      showToastSuccess() 
      console.log('formulaire envoyer ' + response)
    }
    
  } catch (error) {
    showToastError()
  throw new Error("Echec de la création d'une request " + error);
  
  }
  setRequest({
    firstname: "",
    eventId:"",
    userId:"",
    nbSeat: 0,
    direction:"",
    departureTime:"",
    pickupAddress:"",
    type:"",
  })
}


  return (

        <Container className="mt-4">
          <Card> 
        <Form onSubmit={handleRequest} className="rounded-top bg-primary">
           <Form.Group as={Row} className="mb-3 mt-2 w-75 m-auto">
            <Col sm={3} className="m-auto mb-2">
              <Form.Label column className='text-white w-100 text-center m-auto'> Prenom :</Form.Label>
              <input
                type="text"
                className="mt-2 bg-white text-center form-control"
                name="firstname"
                id="firstname"
                placeholder={data.firstname}
                onChange={(e) => handleChange(e)}
                defaultValue={data.fisrtname}
                disabled
              /> 
              </Col>
            <Col sm={5}>
              <Form.Label column className='text-white w-100 text-center m-auto'> Evènement :</Form.Label>
              <select className="mt-2 w-100 bg-white text-center form-control"
                name="eventName" id="eventName"
                onChange={(e) => handleChange(e)}
                // value={request.eventName}
              >
                <option value="">Quel évènement?</option>
                <option value="1"> event 1</option>
                <option value="2"> event 2</option>
              </select>
              </Col>
            <Col sm={3} className="me-4">
              <Form.Label column className='text-white w-100 text-center m-auto'> Nombre de place :</Form.Label>
              <select className="mt-2 bg-white text-center form-control"
                name="nbSeat"
                id="nbSeat"
                onChange={(e) => handleChange(e)}
                value={request.nbSeat}>
                <option value="">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="2">3</option>
              </select>
              </Col>
          </Form.Group>
          <Form.Group as={Row} className="w-75 m-auto">
            <Col sm={4} className="m-auto mb-2">
            <Form.Label column sm="2"className='text-white w-100 text-center m-auto'>Direction :</Form.Label>
              <select className="mt-2 bg-white text-center form-control"
                name="direction"
                id="direction"
                onChange={(e) => handleChange(e)}
                value={request.direction}>
                <option value="">Portion prit en charge ?</option>
                <option value="complet">complet</option>
                <option value="aller">Aller</option>
                <option value="retour">Retour</option>
              </select>
            </Col>
            <Col sm={3} className="m-auto mb-2">
             <Form.Label column sm="2"className='text-white w-100 text-center m-auto'> Heure de Départ :</Form.Label>
              <input
                type="time"
                className="mt-2 bg-white text-center form-control"
                name="departureTime"
                id="departureTime"
                onChange={(e) => handleChange(e)}
                value={request.departureTime} />
              </Col>
            <Col sm={4} className="me-4">
               <Form.Label column sm="2"className='text-white w-100 text-center m-auto'>Type d'annonce :</Form.Label>
              <select className="mt-2 bg-white text-center form-control"
                name="type"
                id="type"
                onChange={(e) => handleChange(e)}
                value={request.type}>
                <option value="">Quel type d'annonce ?</option>
                <option value="Demande">Demande</option>
                <option value="Propose">Proposition</option>
              </select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-2 mt-4 w-75 m-auto ">
            <Col className="mt-2 mb-2">
              <Form.Label column sm="2"className='text-white w-100 text-center m-auto'> Adresse de Départ :</Form.Label>
              <input
                type="text"
                className=" w-75 bg-white text-center form-control m-auto"
                name="pickupAddress"
                id="pickupAddress"
                placeholder="Avenue de ...."
                onChange={(e) => handleChange(e)}
                value={request.pickupAddress} />
            </Col>
          <input name="type" value={request.userId} type="hidden" /> 
          <input name="type" value={request.eventId} type="hidden" />
          </Form.Group>
          <Form.Group as={Row} className="rounded-bottom rounded-top bg-secondary w-75 m-auto mb-2">
            <Col sm={8} className="ms-1 fs-6 text-warning pt-4 text-center">
              En cliquant sur le bouton ci-dessous, vous acceptez d'échanger vos coordonnées avec le destinataire !!!
            </Col>
            <Col sm={3} className="pt-4 ms-4">
              <Button type="submit" variant="outline-primary mt-2 mb-2 float-end">Poster une annonce</Button>
              <ToastContainer/>
            </Col>
          </Form.Group>
           </Form>
          </Card>
        </Container>
  );
}

