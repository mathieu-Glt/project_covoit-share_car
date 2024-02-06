import { Button, Card, Nav, } from "react-bootstrap";
import RequestInfo from "../RequestInfo/RequestInfo";
import { Link } from "react-router-dom";

export default function RequestList({updateEventById , setUpdateEventById}:any) {
  console.log("🚀 ~ file: RequestList.tsx:6 ~ RequestList ~ setUpdateEventById:", setUpdateEventById)
  console.log("🚀 ~ file: RequestList.tsx:6 ~ RequestList ~ updateEventById:", updateEventById)
  return (
    <>
    <div className="container mt-4">
      <Card className="bg-primary">
        <Card.Header className="bg-white">
          <Card.Title>Liste des Annonces</Card.Title>
          <Nav variant="tabs" defaultActiveKey="#first">
            <Nav.Item>
              <Nav.Link href="#all">Toute vos Annonces</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#propositions"> Vos Proposition</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#requests">Vos Demande</Nav.Link>
            </Nav.Item>
            <div className="m-auto">
                <Link to={"/requests/add/" + updateEventById._id}>
                <Button variant="outline-primary" className=" mt-2 mb-2">Poster une annonce</Button>
              </Link> 
            </div>
          </Nav>
        </Card.Header>
        <Card.Body>
          <RequestInfo/>
        </Card.Body>
      </Card>
    </div>
  </>
  )
}
