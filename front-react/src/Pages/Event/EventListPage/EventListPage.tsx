import { useEffect, useState } from 'react';
import EventInfo from '../../../Components/Event/EventInfo/EventInfo';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllEvents } from '../../../services/api/event';

export default function EventListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState([]);
  const [toggleAdmin, setToggleAdmin] = useState(false);
  const [toggleUser, setToggleUser] = useState(false);
  

  // on récupère les datas user dans une const
    const user = localStorage.getItem('user');
    // on convertit le localStorage en object JS
    const data = JSON.parse(user);
  
  
  useEffect(() => {
    async function loadEvent() {
      const event = await getAllEvents();
      setEvents(event);
      console.log("🚀 ~ file: EventListPage.tsx:26 ~ loadEvent ~ event:", event)  
    }
    loadEvent();
  }, []);
  
  
  const handleSearchTerm = (e: { target: { value: any; }; }) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  async function filterEvent(idEvent:any) {
  const updateEvent = events.filter((event: any) => event._id !== idEvent);
  setEvents(updateEvent);
  }
  
  return (
    <>
      <div>
        <h2 className='text-center mt-4 bg-info w-50 m-auto rounded-top rounded-bottom'>Liste des Evènements</h2>
        <div className="searchBar">
          <div>
            <input
              type="text"
              name="searchBar"
              id="searchBar"
              className='searchBars'
              placeholder="Rechercher par date , titre ..."
              onChange={handleSearchTerm}
          />
        </div>
      </div>  
      </div>
      <Link to={"/admin/events/create/" + data._id}>
        <Button variant="outline-primary mt-4">Créer Evènement</Button>
      </Link>
      <div className='mb-5'>
          <Button variant='outline-warning float-end me-4' onClick={() => setToggleAdmin(true)}>Admin</Button>
          <Button variant='outline-primary float-end me-5' onClick={() => setToggleUser(true)}>Utilisateur</Button>
      </div>
      <div className='col-md-10 m-auto  association p-3'>
        <div>
          {events && events.map((evenement:any) => {
            return (
              <EventInfo key={evenement._id} evenement={evenement} filterEvent={filterEvent} />
            )
          })}
        </div>
      </div>
    </>
  )
}


// {datas[0].Homme.filter((articles) => {
//           return articles.name.includes(searchTerm);
//         }).map((articles) => {
//           return (
//             <ArticlesHomme key={articles.id} articles={articles}>
//               {articles}
//             </ArticlesHomme>
//           );
//         })}