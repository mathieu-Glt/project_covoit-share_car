import { Card, Row, Col } from 'react-bootstrap'

export default function RequestNewInfo() {
  return (
    <>
    <h3 className='text-center mt-4 w-50 m-auto rounded-pill w-100'>Détail de la Demande / proposition</h3>
    <Card className='mt-5 bg-primary'>
        <Card.Body>
          <Row className='m-auto'>
            <Col sm={4}>
              <p className='text-white'>Nom :</p>
            </Col>
            <Col sm={4}>
              <p className='text-white'>Parent de :</p>
            </Col>
            <Col sm={4}>
              <p className='text-white'>Groupe :</p>
            </Col>
          </Row>
          <Row className='mt-4 m-auto'>
            <Col sm={4}>
              <p className='text-white'>Demande / Propose : </p>
            </Col>
            <Col sm={4}>
              <p className='text-white'>Nombre de Place : </p>
            </Col>
            <Col sm={4}>
              <p className='text-white'>Trajet: </p>
            </Col>
          </Row>
          <Row className='mt-4 mb-2 w-100 m-auto'>
            <Col sm={6}>
              <p className='text-white'>Heure de départ: </p>
            </Col>
            <Col sm={6}>
              <p className='text-white'>Heure de retour: </p>
            </Col>
          </Row>
          <Row className='m-auto'>
            <Col sm={12}>
              <p className='text-white'>Adresse de départ: </p>
            </Col>
          </Row>  
        </Card.Body>
    </Card>
    </>
  )
}
