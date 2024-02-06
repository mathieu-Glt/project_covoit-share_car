import {  Col, Row } from "react-bootstrap";
import RequestList from "../../../Components/Requests/RequestList/RequestList";
import EventPresentation from "../../../Components/Event/EventPresentation/EventPresentation";
import EventBanner from "../../../Components/Event/EventBanner/EventBanner";
import { useParams } from "react-router-dom";
import { getEventById } from "../../../services/api/event";
import { useEffect, useState } from "react";

export default function EventPage() {

  const [updateEventById, setUpdateEventById] = useState({});
  console.log("🚀 ~ file: EventReadPage.tsx:12 ~ EventPage ~ updateEventById:", updateEventById)
  const params = useParams();
  const id = params.id
  console.log("🚀 ~ file: EventReadPage.tsx:15 ~ EventPage ~ id:", id)
  
  useEffect(() => {
    
    async function findEventById() {
      try {
        const response = await getEventById(id);
        console.log(response)
        if (response) {
          setUpdateEventById(response)
        } else {
          console.log("pas d'évènement associer à cette ID")
        }
      } catch (error) {
        console.log(error)
      }
    }
    findEventById()
  }, [id])


  return (
      <div>
          <h2 className='text-center mt-4 bg-info w-50 m-auto rounded-top rounded-bottom'>Detail Evènement</h2>
          <div className="container-login mt-4">
            <Row>
          <EventBanner updateEventById={updateEventById } setUpdateEventById={setUpdateEventById} />
            </Row>
            <Row>
              <Col sm={4}>
                <EventPresentation updateEventById={updateEventById } setUpdateEventById={setUpdateEventById}/>
              </Col>
              <Col sm={8}> 
                <RequestList updateEventById={updateEventById } setUpdateEventById={setUpdateEventById}/>
              </Col>
            </Row>     
          </div>
    </div>
  )
}
