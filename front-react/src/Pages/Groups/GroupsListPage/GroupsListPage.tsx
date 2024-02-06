import { useEffect, useState } from "react";
import GroupList from "../../../Components/Groups/GroupList/GroupList";
import GroupeNewForm from "../../../Components/Groups/GroupNewForm/GroupeNewForm";
import { getAllGroups} from "../../../services/api/group";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function GroupsListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [groups, setGroups] = useState([]);
  const [toggleAdmin, setToggleAdmin] = useState(false);
  const [toggleUser, setToggleUser] = useState(false);

   const handleSearchTerm = (e: { target: { value: any; }; }) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  // on récupère les datas user dans une const
    const user = localStorage.getItem('user');
    // on convertit le localStorage en object JS
    const data = JSON.parse(user);
    console.log("🚀 ~ file: GroupeCreateForm.tsx:25 ~ GroupCreateForm ~ data:", data)
  
  useEffect(() => {
    async function loadGroup() {
      const group = await getAllGroups();
      console.log("🚀 ~ file: GroupsListPage.tsx:28 ~ loadGroup ~ group:", group)
      setGroups(group); 
    }
    loadGroup();
  }, []);
  

  
async function filterGroup(idGroup:any) {
 const updateGroup = groups.filter((group: any) => group._id !== idGroup);
 setGroups(updateGroup);
 }
  return (
    <div className="container-groupsPage">
      <h2 className="text-center mt-4 bg-info w-50 m-auto rounded-top rounded-bottom">Liste des groupes</h2>
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
      <div>
        <Link to={"/admin/groups/create/" + data._id}>
          <Button variant='outline-primary float-start'>Créer un Groupe</Button>
        </Link>  
      </div>
      <div className='mb-5'>
          <Button variant='outline-warning float-end me-4' onClick={() => setToggleAdmin(true)}>Admin</Button>
          <Button variant='outline-primary float-end me-5' onClick={() => setToggleUser(true)}>Utilisateur</Button>
      </div>
      <div>
        {groups && groups.map((group:any) => {
          return (
          <GroupList key={group._id} group={group} filterGroup={filterGroup} />
          )
        })}
      </div>
    </div>
  );
}
