import RequestNewForm from '../../../Components/Requests/RequestNewForm/RequestNewForm';
import { Row, Col } from 'react-bootstrap';

export default function RequestAddPage() {
  return (
    <>
      <div>
        <h3 className='text-center mt-4 bg-info w-50 m-auto rounded-top rounded-bottom'>Poster une annonce</h3>  
      </div>
    <div className="container-login mt-4">       
      <Row>
        <Col sm={12}> 
          <Row >
            <RequestNewForm/>
          </Row>
        </Col>
      </Row>
    </div>
    </>
  )
}
