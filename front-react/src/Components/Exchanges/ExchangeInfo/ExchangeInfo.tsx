import { Card, Row, Col, ProgressBar } from 'react-bootstrap'

export default function ExchangeInfo() {
  return (
    <>
  <Card className='mt-5'>
    <Card.Body>
    <Row>
        <Card.Title>Récapitulatif de ma demande</Card.Title>
    </Row>
    <Row>
      <Col sm={4}>
        <Row>Status:</Row>
        <Row>
          <ProgressBar variant="info" animated now={50} label='En cours' />
        </Row>
      </Col>
      <Col sm={4}>
        <Card.Text>Propose: 1 place</Card.Text>
      </Col>
      <Col sm={4}>
        <Card.Text>Aller/Retour</Card.Text>
      </Col>
    </Row>
    </Card.Body>
  </Card>
  </>
  )
}
