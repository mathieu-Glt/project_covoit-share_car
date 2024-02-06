import { Row } from 'react-bootstrap'
import RequestNewInfo from '../../../Components/Requests/RequestNewInfo/RequestNewInfo';
import ResponseRequest from '../../../Components/Requests/ResponseRequest/ResponseRequest';

export default function ExchangeAddPage() {
  return (
    <>
    <div className="container">       
      <Row>
          <Row>
            <RequestNewInfo/>
          </Row>
          <Row className='mt-4'>
            <h3 className='text-center'>Répondre à l'Annonce</h3>
            <ResponseRequest/>
          </Row> 
      </Row>          
    </div>
    </>
  )
}
