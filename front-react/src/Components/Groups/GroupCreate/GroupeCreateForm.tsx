import { Button, Col, Form, Row} from 'react-bootstrap';
import { ChangeEvent, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams } from 'react-router-dom';
import { createGroup } from '../../../services/api/group';
import Select from 'react-select';
import { indexAssoByUserId } from '../../../services/api/association';

export default function GroupCreateForm() {
    const params = useParams();
    // version passe par la card asso et donc assoId
    const assoId = params.id;
    // version passe par la creation group directement et donc userId
    const userId = params.id;
    const [associationByUserId, setAssociationByUserId]:any = useState([]);
    
     // je stocke dans un tableau d'objet avec une value et un label les informations récupérer dans mon UseEffect
    const dataAssociation: { value: string; label: string; }[] = [];
    for (const data of associationByUserId) {
        dataAssociation.push({
            value: data.association.id,
            label: data.association.name
        })
    }

    // on récupère les datas user dans une const
    const user = localStorage.getItem('user');
    // on convertit le localStorage en object JS
    const data = JSON.parse(user);
    console.log("🚀 ~ file: GroupeCreateForm.tsx:25 ~ GroupCreateForm ~ data:", data)

    const [group, setGroup] = useState({
    name:"",
    headcount: "",
    description: "",
    association_id: data._id === userId ? "" : assoId
    })
    
    
    // Function set the values of the inputs
    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target
        setGroup({ ...group, [name]: value })
    }
    

    // version associationId type string
    function handleSelectAssociation(data: any) {
        setGroup({
            ...group, association_id: data.value,
        });
    }

  const showToastSuccess = () => {
        toast.success('Groupe crée !!', {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    const showToastError = () => {
        toast.error('Formulaire groupe invalide !!', {
            position: toast.POSITION.TOP_RIGHT
        });
  };
   
     // Envoie du formulaire
  const handleForm = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try { 
      const response = await createGroup(group);
      // validation 
      if (response) {
        console.log('Formulaire soumis avec succès !' + response);
        showToastSuccess()
      } else {
        console.log('Le formulaire n\'est pas valide');
        showToastError()
      }
    } catch (error) {
      throw new Error("Echec de la création d'un groupe " + error);  
    }
    setGroup({
            name: "",
            headcount:"",
            description: "",
            association_id: ""
        })
    };
    
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

  return (
    <>
        <h3 className='text-center mt-5 bg-info w-50 m-auto rounded-pill'>Créer un Groupe</h3>
        <Link to="/admin/groups">
            <Button variant="outline-secondary float-start">Retour</Button>   
        </Link>
        <div className='p-5'>
            <form className="row g-3 needs-validation" onSubmit={handleForm}>
                <div className='row mt-4 rounded-top bg-primary '>
                    <div className="col-md-4 m-auto mt-2">
                        <label htmlFor="name" className="form-label w-100 text-center text-white">Nom du Groupe : </label>
                        <input 
                        type="text" 
                        name='name'
                        className="form-control font-weight-bold" 
                        id="name" 
                        value={group.name} 
                        onChange={(e) => handleChange(e)} 
                        required
                        />
                        <div className="invalid-feedback">
                            Rentrer un nom.
                        </div>
                    </div>      
                    <div className="col-md-4 m-auto">
                        <label htmlFor="headcount" className="form-label w-100 text-center text-white">Quantité max : </label>
                        <input 
                        type="number" 
                        name='headcount'
                        className="form-control font-weight-bold" 
                        id="headcount" 
                        value={group.headcount} 
                        onChange={(e) => handleChange(e)} 
                        required
                        />
                        <div className="invalid-feedback">
                            Rentrer un nom.
                        </div>
                    </div>      
                </div>
                <div className='row bg-primary'>
                    <div className="col-md-8 m-auto mb-4">
                        <label htmlFor="description" className="form-label w-100 text-center text-white">Description :</label>
                        <textarea
                        name='description'
                        className="form-control font-weight-bold" 
                        id="description"
                        onChange={(e) => handleChange(e)}
                        value={group.description}      
                        required
                        />
                        <div className="invalid-feedback">
                            Rentrer une description.
                        </div>
                    </div>     
                  </div>
                  {data._id === assoId ? (
                   <Form.Group as={Row} className="mb-3 bg-primary rounded-bottom">
                        <Form.Label className='text-white text-center'>Association :</Form.Label>
                        <Col sm="8" className='m-auto'>
                            <Select
                             options={dataAssociation}
                            name="association_id"
                            id="association_id"
                            // value={associations}
                            className='mb-3 text-center'
                            onChange={handleSelectAssociation}
                            // isMulti
                            placeholder="Selectionner Association"
                            />               
                        </Col>
                    </Form.Group>  
                ): (
                <input name="type" value={group.association_id} type="hidden" />      
                )}
              <div className="col-12 mt-4">
                <Button variant="outline-primary float-end" type="submit">Créer Groupe</Button>
                <ToastContainer/>
              </div>
            </form>
        </div >
    </>
  )
}