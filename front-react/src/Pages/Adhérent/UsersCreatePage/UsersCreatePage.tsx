import UserKidForm from "../../../Components/UserKid/UserKidForm";

export default function UsersCreatePage() {
  

  return (
     <div className="container-groupsPage">
      <h3 className="text-center mt-4 bg-info w-50 m-auto rounded-top rounded-bottom">Crée ou Ajouter un Enfant</h3> 
      <div>
        <UserKidForm/>
      </div>
    </div>
  );
}