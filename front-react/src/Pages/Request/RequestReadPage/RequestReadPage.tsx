import { Row, Col } from "react-bootstrap";
import RequestNewInfo from "../../../Components/Requests/RequestNewInfo/RequestNewInfo";

export default function RequestPage() {
  return (
    <>
    <div className="container">
    <Row>
      <Col sm={12}> 
        <Row>
          <RequestNewInfo/>
        </Row>
      </Col>
      </Row>
    </div>
    </>
  )
}
