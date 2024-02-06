import { ChangeEvent,useEffect,useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { createEvent } from '../../../services/api/event';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Multiselect from 'multiselect-react-dropdown';
import Select from 'react-select';
import { Link, useParams } from 'react-router-dom';
import React from 'react';
import { indexAssoByUserId } from '../../../services/api/association';
import { getAllGroupsByAsso, getAllGroupsByAssoByUserId } from '../../../services/api/group';

export default function EventAddForm() {
    // const { handleAddEvent } = props;props: any
    const [associationByUserId, setAssociationByUserId]:any = useState([]);
    const [groupAssociationByUserId, setGroupAssociationByUserId]: any = useState([])
    const [groupByAssoId, setGroupByAssoId]: any = useState([]);
    console.log("🚀 ~ file: EventAddForm.tsx:18 ~ EventAddForm ~ groupByAssoId:", groupByAssoId)
    
    // je stocke dans un tableau d'objet avec une value et un label les informations récupérer dans mon UseEffect
    const dataGroupByAsso: { value: string; label: string; }[] = [];
    console.log("🚀 ~ file: EventAddForm.tsx:22 ~ EventAddForm ~ dataGroupByAsso:", dataGroupByAsso)
    for (const data of groupByAssoId) {
        dataGroupByAsso.push({
            value: data._id,
            label: data.name
        })
    }
 
    // je stocke dans un tableau d'objet avec une value et un label les informations récupérer dans mon UseEffect
    const dataAssociation: { value: string; label: string; }[] = [];
    for (const data of associationByUserId) {
        dataAssociation.push({
            value: data.association.id,
            label: data.association.name
        })
    }

    // je stocke dans un tableau d'objet avec une value et un label les informations récupérer dans mon UseEffect
    const dataGroup: { value: string; label: string; }[] = [];
    for (const data of groupAssociationByUserId) {
        dataGroup.push({
            value: data._id,
            label: data.name
        })
    }

    const params = useParams();
    // vien directement de l'association assoId
    const assoId = params.id
    // vien directement de l'utilisateur userId
    const userId = params.id

    // j'isole l'id du group sélectionnez par l'utilisateur dans un tableau
    const groupId: string[] = [];
    
  // function qui prend en charge la modifications du select group
    function handleSelectGroup(data:any) {
    for (const dataId of data) {
        groupId.push(
        dataId.value,
        )
    }
        // dataId(data);
        setEvent({
            ...event, groups: groupId,
        });
    }

    // version quand associationId et un tableau
    // j'isole l'id de l'association sélectionnez par l'utilisateur dans un tableau
    // const associationId:string[] = [];
    
    // function qui prend en charge la modification du select association
    // function handleSelectAssociation(data: any) {
    //     for (const dataId of data) {
    //     associationId.push(
    //         dataId.value,
    //     )
    // }
    //     setEvent({
    //         ...event, association_id: associationId,
    //     });
    // }

    // version associationId type string
    function handleSelectAssociation(data: any) {
        setEvent({
            ...event, association_id: data.value,
        });
    }

    // on récupère les datas user dans une const
    const user = localStorage.getItem('user');
    // on convertit le localStorage en object JS
    const data = JSON.parse(user);
    const [event, setEvent] = useState({
        name: "",
        startDate:"",
        startTime:"",
        endDate:"",
        endTime: "",
        event_address: "",
        description:"",
        image:"",
        groups: groupId,
        participant: "",
        association_id: data._id === userId ? "" : assoId
    })

    // function qui prend en charge la modifications des input
    function handleChange(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement | undefined>) {
        const { name, value }: any = e.target;
        setEvent({ ...event, [name]: value})
    }
  
    const showToastSuccess = () => {
        toast.success('Evènement crée !!', {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    const showToastError = () => {
        toast.error('Evènement invalide !!', {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    //Envoi du formulaire //
    async function  handleSubmit(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault(); 
        // const currentDate = new Date().toString();
        try {
            const response = await createEvent(event);
            console.log("🚀 ~ file: EventAddForm.tsx:33 ~ handleSubmit ~ response:", response)
        if (response) {
            console.log('Formulaire soumis avec succès !' + response);
            showToastSuccess();
        } else {
            console.log('Le formulaire n\'est pas valide');
            showToastError();
        }
       } catch (error) {
        throw new Error("Echec de la création d'un évènement " + error);
        }
        setEvent({
        name: "",
        startDate:"",
        startTime:"",
        endDate:"",
        endTime: "",
        event_address: "",
        description:"",
        image:"",
        groups: [],
        participant: "",
        association_id: ""
        })
    }
    
    useEffect(() => {
        if (data._id === userId) {
            // eslint-disable-next-line no-inner-declarations
            async function loadAssociationByUserId() {
              const associationByUserId = await indexAssoByUserId(userId);
              console.log("🚀 ~ file: EventAddForm.tsx:113 ~ loadAssociationByUserId ~ associationByUserId:", associationByUserId)
              setAssociationByUserId(associationByUserId); 
            }
            loadAssociationByUserId();    
        }
    }, [data._id, userId]);
    
    useEffect(() => {
        if (data._id === userId) {
            // eslint-disable-next-line no-inner-declarations
            async function loadGroupAssociationByUserId() {
              const groupAssociationByUserId = await getAllGroupsByAssoByUserId(userId);
              console.log("🚀 ~ file: EventAddForm.tsx:125 ~ loadGroupAssociationByUserId ~ groupAssociationByUserId:", groupAssociationByUserId)
              setGroupAssociationByUserId(groupAssociationByUserId); 
            }
            loadGroupAssociationByUserId();     
        }
    }, [data._id, userId]);
    
    useEffect(() => {
        if (data._id !== userId) {
            // eslint-disable-next-line no-inner-declarations
            async function loadGroupByAssoId() {
              const groupByAssoId = await getAllGroupsByAsso(assoId);
              console.log("🚀 ~ file: EventAddForm.tsx:174 ~ loadGroupByAssoId ~ groupByAssoId:", groupByAssoId)
              setGroupByAssoId(groupByAssoId); 
            }
            loadGroupByAssoId();     
        }
    }, [assoId, data._id, userId]);
    
    useEffect(() => {
        if (event.association_id != "") {
            // eslint-disable-next-line no-inner-declarations
            async function loadGroupByAssoId() {
               const idAssoString = event.association_id.toString(); 
              const groupByAssoId = await getAllGroupsByAsso(idAssoString);
              console.log("🚀 ~ file: EventAddForm.tsx:174 ~ loadGroupByAssoId ~ groupByAssoId:", groupByAssoId)
              setGroupByAssoId(groupByAssoId); 
            }
            loadGroupByAssoId();     
        }
  }, [assoId, data._id, event.association_id, userId]);


    return (
    <>
        <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2" className='text-black'>Nom :</Form.Label>
                <Col>
                    <input 
                    type='text' 
                    name='name' 
                    placeholder='Exemple => Coupe du monde U20'
                    className='form-control'        
                    id='name'
                    value={event.name}
                    onChange={(e) => handleChange(e)}
                    required
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2"className='text-black'>Date et heure de Départ :</Form.Label>
                <Col sm="5">
                <input
                type="date" 
                name="startDate"
                id="startDate"
                className='form-control'            
                value={event.startDate}
                onChange={(e) => handleChange(e)}
                required
                />
                </Col> 
                <Col sm="5">
                <input
                type="time" 
                name="startTime"
                id="startTime"
                className='form-control'            
                value={event.startTime}
                onChange={(e) => handleChange(e)}
                required            
                />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2"className='text-black'>Date et heure de fin :</Form.Label>
                <Col sm="5">
                    <input
                    type="date" 
                    name="endDate"
                    id="endDate"
                    className='form-control'        
                    value={event.endDate}        
                    onChange={(e) => handleChange(e)}
                    required        
                    />
                    </Col> 
                <Col sm="5">
                    <input
                    type="time" 
                    name="endTime"
                    id="endTime"
                    className='form-control'        
                    value={event.endTime}
                    onChange={(e) => handleChange(e)}
                    required        
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2" htmlFor='event_address'className='text-black'>Adresse :</Form.Label>
                <Col sm="10">
                    <input
                    type='text'
                    name='event_address'
                    id='event_address'
                    className='form-control'
                    value={event.event_address}
                    onChange={(e) => handleChange(e)}
                    required
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2"className='text-black'>Description :</Form.Label>
                <Col sm="10">
                <textarea 
                rows={3} 
                name='description' 
                id='description'
                className='form-control'
                value={event.description}
                onChange={(e) => handleChange(e)}
                required
                />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2"className='text-black'>Image :</Form.Label>
                <Col sm="10" >
                    <input
                    type='file'
                    name='image'
                    id='image'
                    className='form-control'
                    value={event.image}
                    onChange={(e) => handleChange(e)}
                    />
                    </Col>
                </Form.Group>
                
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2"className='text-black'>Participant :</Form.Label>
                <Col sm="10" className='m-auto'>
                    <input
                    type='number'
                    name='participant'
                    id='participant'
                    className='form-control'
                    value={event.participant}
                    onChange={(e) => handleChange(e)}
                    />
                </Col>
            </Form.Group>
                {data._id === userId ? (
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2"className='text-black'>Association :</Form.Label>
                <Col sm="10" className='m-auto'>
                    <Select
                        options={dataAssociation}
                        name="association_id"
                        id="association_id"
                        // value={event.association_id}
                        onChange={handleSelectAssociation}
                        // isMulti
                        isSearchable={true}
                        placeholder="Selectionner Association"
                    />               
                </Col>
            </Form.Group>  
                ): (
                <input name="type" value={event.association_id} type="hidden" />      
                )}
                {/* {data._id === userId ? (
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2"className='text-black'>Groupes rataché :</Form.Label>
                <Col sm="10" className='m-auto'>
                        <Select
                        options={dataGroup}
                        name="group"
                        id="group"
                        // value={event.group}
                        onChange={handleSelectGroup}
                        isMulti
                        isSearchable={true}
                        placeholder="Selectionner Groupes"
                    />               
                </Col>
            </Form.Group>
                ): (
                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2"className='text-black'>Groupes rataché :</Form.Label>
                <Col sm="10" className='m-auto'>
                    <Select
                        options={dataGroupByAsso}
                        name="group"
                        id="groupId"            
                        // value={event.group}
                        onChange={handleSelectGroup}
                        isMulti
                        isSearchable={true}
                        placeholder="Selectionner Groupes"
                    />               
                </Col>
            </Form.Group> 
            )} */}
                {event.association_id != "" ? (
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2"className='text-black'>Groupes rataché :</Form.Label>
                <Col sm="10" className='m-auto'>
                        <Select
                        options={dataGroupByAsso}
                        name="groups"
                        id="groups"
                        // value={event.group}
                        onChange={handleSelectGroup}
                        isMulti
                        isSearchable={true}
                        placeholder="Selectionner Groupes"
                    />               
                </Col>
            </Form.Group>
                ): (
            <>       
                <p className='text-center'>Pour rajouter un groupe veuillez sélectionnez une association</p>
            </>
            )}
        <Link to="/events">
           <Button variant="outline-secondary">Retour</Button>         
        </Link>
        <Button variant="outline-primary float-end" type="submit">Créer un évènement</Button>
        <ToastContainer/>
        </Form>   
    </>
  )
}
