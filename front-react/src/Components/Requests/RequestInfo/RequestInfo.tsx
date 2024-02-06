import { Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function RequestInfo() {
  return (
  <Card>
      <Card.Body>
        <Row>
          {/* User kid NAME */}
          <Col sm={3}>
            <Card.Title>Nom : Paul Mirabel</Card.Title>
          </Col>
          {/* Nb place */}
          <Col sm={3}>
            <Card.Text>Propose : 1 place</Card.Text>
          </Col>
          {/* type */}
          <Col sm={3}>
            <Card.Text>Trajet : Aller/Retour</Card.Text>
          </Col>
          <Col sm={3}>
            <Card.Text>Heure de départ : 12h</Card.Text>
          </Col>
        </Row>
        <Row>
          {/* User kid NAME */}
          <Col sm={12} className="mt-4 mb-4">
            <Card.Text>Adresse de départ : Avenue de la pastèque</Card.Text>
          </Col>
        </Row>
        <Row>
          <Col sm={4} className="">
            <Link to="/exchanges/add">
              <Button variant="outline-info float-start mt-2">Contacter</Button>
            </Link>
          </Col> 
          <Col sm={8} className="">
            <Link to="/requests/read">
              <Button variant="outline-info float-end mt-2">Voir Détail</Button>
            </Link>
          </Col>
        </Row>
      </Card.Body>
  </Card>
  )
}
