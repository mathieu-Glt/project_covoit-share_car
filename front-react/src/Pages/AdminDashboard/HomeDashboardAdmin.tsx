import './homeDasboardAdmin.style.css';
import { Link } from 'react-router-dom';
import { Button} from 'react-bootstrap';
import EventInfo from '../../Components/Event/EventInfo/EventInfo';
import GroupList from '../../Components/Groups/GroupList/GroupList';
import { useEffect, useState } from 'react';
import { userConnected } from '../../services/api/user';
import { getAllGroups } from '../../services/api/group';
import { getAllEvents } from '../../services/api/event';
import { getAllAssociations } from '../../services/api/association';
import AssociationList from '../../Components/Association/AssociationList/AssociationList';

export default function HomeDashboardAdmin() {
  const [associations, setAssociations] = useState([])
  const [groups, setGroups] = useState([]);
  const [events, setEvents] = useState([]);
  const [user, setUser]:any = useState({});
    console.log("🚀 ~ file: HomeDashboardAdmin.tsx:18 ~ HomeDashboardAdmin ~ user:", user)
    
useEffect(() => {
    async function loadUser() {
      const connected = await userConnected();
      setUser(connected);
    }
    loadUser()
}, [])
    
  useEffect(() => {
    async function loadAssociation() {
    const association = await getAllAssociations();
    setAssociations(association);
}
    loadAssociation();
  }, []);
  
    useEffect(() => {
    async function loadGroup() {
      const group = await getAllGroups();
      setGroups(group); 
    }
    loadGroup();
    }, []);
    
    useEffect(() => {
    async function loadEvent() {
      const event = await getAllEvents();
      setEvents(event);  
    }
    loadEvent();
    }, []);
    
  return (
      <>
        <h2 className='text-center mt-4 bg-info w-50 m-auto rounded-top rounded-bottom'>Bienvenue sur COVOIT  (Pseudo) </h2>
        <section className='mt-5 d-flex flex-column'>
              <div className='d-flex flex-column-reverse flex-md-row d-grid justify-content-between gap-3'>
                <div className='lists col-md-8'>
                    <div className='col-md-12 associationListEvents'>
                        <h4 className='text-center mt-4 mb-3 bg-info w-75 m-auto rounded-top rounded-bottom'>Liste des Associations</h4>
                    {associations && associations.slice(0,3).sort((a: { date: number; }, b: { date: number; }) => b.date - a.date).map((association:any) => {
                        return (
                        <AssociationList key={association._id} association={association}/>
                      )
                    })} 
                    </div>
                    <div className='col-md-12 associationListEvents'>
                        <h4 className='text-center mt-4 bg-info w-75 m-auto rounded-top rounded-bottom'>Liste des évenements</h4>
                         {events && events.slice(0,2).sort((a: { date: number; }, b: { date: number; }) => b.date - a.date).map((evenement: any) => (
                          <EventInfo key={evenement._id} evenement={evenement}/>
                        ))}
                    </div>
                    <div className='col-md-12 associationListGroups mt-4'>
                          <h4 className='text-center mt-4 bg-info w-75 m-auto rounded-top rounded-bottom'>Liste des groupes</h4>
                         {groups && groups.slice(0,2).sort((a: { date: number; }, b: { date: number; }) => b.date - a.date).map((group: any) => (
                          <GroupList key={group._id} group={group}/>
                        ))}   
                    </div>
                  </div>
                <div className='col-md-4 mt-4'>
            <div className='col-12 d-grid gap-3 d-flex flex-column flex-md-row flex-wrap align-items-center justify-content-center mt-4'>
              <div className='w-75 text-center'>
                <Link to={"/admin/association/create/" + user._id}>
                  <Button variant="outline-primary">Créer une Association</Button>
                </Link>
              </div>
              <div className=' w-75 text-center '>
                <Link to={"/admin/events/create/" + user._id}>
                  <Button variant="outline-primary">Créer un évenement</Button>
                </Link>
              </div>
              <div className='w-75 text-center'>
                <Link to={"/admin/groups/create/" + user._id}>
                  <Button variant="outline-primary">Créer un groupe</Button>
                </Link>
              </div>
                    </div>
                    <div className='col-12 card float-start mt-5 p-3'>
                        <div className='card kidWithoutGroup p-2'>
                            <h4>Enfants sans groupe</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum aperiam quisquam ad laboriosam incidunt id excepturi possimus, dolore ea unde?</p>
                            
                        </div>
                        <div className='card parentAccountNotValidated mt-3 p-2'>
                            <h4>Parents dont le compte n'est pas validé</h4>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia sapiente vero aperiam accusantium error quibusdam, iure tempore officiis veniam repudiandae?</p>
                        </div>
                    </div>
                </div>
            </div>   
        </section>
    </>
  )
}



// {contact && contact.slice(0,1).sort((a: { date: number; }, b: { date: number; }) => b.date - a.date).map((card: any,index: any) => (
//             <Card card={card} key={index}>
//               {card}
//             </Card>
//           ))}