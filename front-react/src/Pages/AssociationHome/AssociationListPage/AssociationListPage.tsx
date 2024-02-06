import { useEffect, useState } from 'react';
import { getAllAssociations } from '../../../services/api/association';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AssociationList from '../../../Components/Association/AssociationList/AssociationList';


export default function AssociationListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [associations, setAssociations] = useState([])
  const [toggleAdmin, setToggleAdmin] = useState(false);
  const [toggleUser, setToggleUser] = useState(false);

  // on récupère les datas user dans une const
  const user = localStorage.getItem('user');
  // on convertit le localStorage en object JS
  const data = JSON.parse(user);

    async function filterAssociation(idAssociation:any) {
    const updateAssociation = associations.filter((association: any) => association._id !== idAssociation);
    setAssociations(updateAssociation);
    }

    const handleSearchTerm = (e: { target: { value: any; }; }) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  useEffect(() => {
    async function createAssociationAdmin() {
      if (data.associations[0].role === "Admin" && data.associations[0]._id === "") {
      location.href = "/admin/association/create";
      }
    }
    createAssociationAdmin()
  },[data.associations])

    useEffect(() => {
    async function loadAssociation() {
    const association = await getAllAssociations();
    setAssociations(association);
    console.log("🚀 ~ file: AssociationCreate.tsx:28 ~ loadAssociation ~ association:", association) 
  }
    loadAssociation();
  }, []);

  return (
    <>
      <div className='mt-4'>
        <h2 className="text-center mt-4 bg-info w-50 m-auto rounded-top rounded-bottom">Liste des Associations</h2>
            <div className="searchBar">
                <div>
                    <input
                    type="text"
                    name="searchBar"
                    id="searchBar"
                    className='searchBars'
                    placeholder="Rechercher par date , nom ..."
                    onChange={handleSearchTerm}
                    />
                </div>
            </div> 
        <Link to={`/admin/association/create/` + data._id}>
          <Button variant="outline-primary">Créer une Association</Button>
        </Link>
        <div className='mb-5'>
          <Button variant='outline-warning float-end me-4' onClick={() => setToggleAdmin(true)}>Admin</Button>
          <Button variant='outline-primary float-end me-5' onClick={() => setToggleUser(true)}>Utilisateur</Button>
        </div>
          <div className='col-md-10 m-auto  association p-3'>
            <div>
              {associations && associations.sort((a: { date: number; }, b: { date: number; }) => b.date - a.date).map((association:any) => {
              return (
                <AssociationList key={association._id} association={association} filterAssociation={filterAssociation} />
              )
              })}  
            </div>  
          </div>
      </div>
    </>
  )
}