import { ChangeEvent, useState } from "react";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function ResponseRequest() {

  // props:any // autre fasson faire props
  // const { handleAddEvent } = props;

    const [request, setRequest] = useState({
    firstname: "",
    nbSeat: "",
    direction:"",
    })
  
function handleChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) {
  const { name, value }: any = e.target;
  setRequest({ ...request, [name]: value})
}

  const showToastSuccess = () => {
        toast.success('Donnée response crée !!', {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    const showToastError = () => {
        toast.error('Formulaire response invalide !!', {
            position: toast.POSITION.TOP_RIGHT
        });
  };

function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  
 try {
   showToastSuccess();
   console.log('coucou')
 } catch (error) {
   showToastError();
  throw new Error("Echec de la response " + error);
  
 }
}


  return (

        <Container className="mt-4">
          <Card> 
            <p className="ms-3 font-weight-bold">Annonce de Paul</p>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group className="mb-3">
                  <Row className="m-auto w-75">
                    <Col >
                      <input
                        type="text"
                        className="mt-2 bg-white text-center form-control"
                        name="firstname"
                        id="firstname"
                        placeholder="Vous avez bien un nom ?"
                        onChange={(e) => handleChange(e)}
                        value={request.firstname}
                      />
                    </Col>
                    <Col >
                      <select className="mt-2 bg-white text-center form-control "
                        name="nbSeat"
                        id="nbSeat"
                        onChange={(e) => handleChange(e)}
                        value={request.nbSeat}
                      >
                        <option value="">Nombre de place ?</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                      </select>
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Row className="m-auto w-50">
                    <Col>
                      <select className="mt-2 bg-white text-center form-control "
                        name="direction"
                        id="direction"
                        onChange={(e) => handleChange(e)}
                        value={request.direction}
                      >
                        <option value="">portion ?</option>
                        <option value="Aller/Retour">Aller/Retour</option>
                        <option value="Aller seulement">Aller seulement</option>
                        <option value="Retour seulement">Retour seulement</option>
                      </select>
                    </Col>
                  </Row>
                </Form.Group>
                 <Form.Group as={Row} className="rounded-bottom rounded-top bg-secondary w-75 m-auto mb-2">
                    <Col sm={8} className="ms-1 fs-6 text-warning pt-4 text-center">
                      En cliquant sur le bouton ci-dessous, vous acceptez d'échanger vos coordonnées avec le destinataire !!!
                    </Col>
                    <Col sm={3} className="pt-4 ms-4">
                      <Button type="submit" variant="outline-primary float-end">Envoyer</Button>
                      <ToastContainer/>
                    </Col>
                  </Form.Group>
                <ToastContainer/>
            </Form>
          </Card>
        </Container>
  );
}