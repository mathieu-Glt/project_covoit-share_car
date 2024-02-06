import { useEffect, useState } from 'react';
import './userDashboardPage.style.css';
import EventInfo from '../../Components/Event/EventInfo/EventInfo';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllEvents } from '../../services/api/event';

export default function UserDashboardPage() {
  const [events, setEvents] = useState([]);

  
   useEffect(() => {
    async function loadEvent() {
      const event = await getAllEvents();
      setEvents(event);
      console.log("🚀 ~ file: EventListPage.tsx:26 ~ loadEvent ~ event:", event)  
    }
    loadEvent();
    }, []);
  return (
<>
  <h2 className='text-center mt-4 bg-info w-50 m-auto rounded-top rounded-bottom'>Bienvenue sur COVOIT  (Pseudo) </h2>
  <section className='d-flex justify-content-between p-3'>
        <div className='associationMembership w-100'>
          <div className=' mt-4 me-3'>
            <h3 className='ms-3 mt-4 text-center bg-info w-50 m-auto rounded-top rounded-bottom'>Nom d'Association</h3>
            <div className='container-event mt-4'>
                <h4 className='text-center mt-4 bg-info w-75 m-auto rounded-top rounded-bottom'>Liste des évenements</h4>
                {events && events.slice(0,2).sort((a: { date: number; }, b: { date: number; }) => b.date - a.date).map((evenement: any) => (
                <EventInfo key={evenement._id} evenement={evenement}/>
                ))}      
            </div>
          </div>
        </div>
        <div>
        <Card className='mt-5 h-30'>
        <Card.Header>Liste de tout vos Echanges</Card.Header>
        <Card.Body>
          <Card.Title>Voir l'ensemble de vos messages , ceux Envoyer et ceux Reçu</Card.Title>
        {/* <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text> */}
          <Link to="/exchanges/read">
              <Button variant="outline-info" className="float-end">Voir</Button>
          </Link>
      </Card.Body>
    </Card>
      <Card className='mt-5 h-30'>
        <Card.Header>Voir votre profil</Card.Header>
        <Card.Body>
          <Card.Title>Voir l'ensemble de votre profil</Card.Title>
        {/* <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text> */}
          <Link to="/profil">
              <Button variant="outline-info" className="float-end">Voir</Button>
          </Link>
      </Card.Body>
    </Card>
    </div> 
  </section>
    </>
  )
}
