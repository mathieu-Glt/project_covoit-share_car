import { useState, ChangeEvent, useEffect } from 'react';
import { Button, Col } from 'react-bootstrap';
import { userConnected } from '../../services/api/user';

export default function Profil({connectedUser, setConnectedUser}:any) {
  console.log("🚀 ~ file: Profil.tsx:6 ~ Profil ~ setConnectedUser:", setConnectedUser)
  console.log("🚀 ~ file: Profil.tsx:6 ~ Profil ~ connectedUser:", connectedUser)
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const [updateUser, setUpdateUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        birthday: "",
        comment: "",
        address: "",
  })
  
  // Function set the values of the inputs
    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target
        setUpdateUser({ ...updateUser, [name]: value })
        console.log(value)
    }

  useEffect(() => {
    async function loadUser() {
      const connected = await userConnected();
      console.log(connected)
  }
    loadUser()
  }, [])
    
    async function handleEdit() {
        try {
            console.log("caca")
        } catch (error) {
           throw new Error("Echec de la modification du profil userConnected");  
        }
    }

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer votre profil definitivement ?')
    if (confirmDelete) {
      try {
        console.log("Prout")
      } catch (error) {
          throw new Error("Une erreur s'est produite lors de la suppression de votre profil." + error);
          
      }
    }
  }
  
  // Upload new avatar
  function handleAvatarUpload(e: ChangeEvent<HTMLInputElement>): void {
    setImageUrl(e.target.value)
  }

    const dateFormaterDay = (date:any) => {
    return new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
    });
    };
    
  return (
    <>
    <h3 className='text-center mt-4 bg-info w-50 m-auto rounded-top rounded-bottom'>Voici votre profil</h3>
    <section className='mt-5 d-flex flex-column align-self-start container-fluid'>
         <div className='d-flex flex-column flex-md-row'>
          <div className='d-none d-md-block userPicture'>
            <div className='d-flex flex-column'>
              {isEditingImage ? (
                <>
                <input
                  type="file"
                  className="img-fluid"
                  defaultValue={imageUrl}
                  accept="image/*"
                  onChange={handleAvatarUpload}
                />
                <div>
                  <Button variant="outline-secondary mt-4 mb-2 fs-6" onClick={() => setIsEditingImage(false)}>Annuler</Button>
                  <Button variant="outline-warning float-end ms-5 mb-2 mt-4" onClick={() => setIsEditingImage(true)}>Modifier</Button>
                </div>
                </>
              ) : (
                <>
                  <Col xs={6} md={4}>
                    <img className='img-fluid' src={imageUrl} alt="Photo utilisateur"/>
                  </Col>
                  <Button variant="outline-warning me-4 mt-4 " onClick={() => setIsEditingImage(true)}>Modifier</Button>
                </>
              )}
            </div>
          </div>
         </div> 
        <div className='parent-kid mt-5'>
          <div className='card'>
            {isEditing ? (
              <>
                <div>
                  <form className=' g-3 needs-validation bg-info rounded-top rounded-bottom'>
                    <div className='row'>
                      <div className='col-md-3 m-auto'>
                        <label htmlFor="firstname" className="form-label w-100 text-center text-white">Prenom</label>
                        <input 
                        type="text" 
                        name='firstname'
                        className="form-control font-weight-bold" 
                        id="firstname" 
                        defaultValue={connectedUser.firstname}
                        onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <div className='col-md-3 m-auto' >
                        <label htmlFor="lastname" className="form-label w-100 text-center text-white">Nom</label>
                        <input 
                        type="text" 
                        name="lastname"
                        className="form-control font-weight-bold" 
                        id="lastname" 
                        defaultValue={connectedUser.lastname}
                        onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <div className='col-md-3 m-auto'>
                        <label htmlFor="phone" className="form-label w-100 text-center text-white">Téléphone</label>
                        <input 
                          type="text" 
                          name="phone"
                          className="form-control font-weight-bold" 
                          id="phone" 
                          value={updateUser.phone}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-md-3 m-auto'>
                        <label htmlFor="email" className="form-label w-100 text-center text-white">Email</label>
                        <input 
                          type="text" 
                          name="email"
                          className="form-control font-weight-bold" 
                          id="email" 
                          defaultValue={connectedUser.email}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <div className='col-md-4 m-auto'>
                        <label htmlFor="birthday" className="form-label w-100 text-center text-white">Anniversaire de l'enfant</label>
                        <input 
                          type="date" 
                          name="birthday"
                          className="form-control font-weight-bold" 
                          id="birthday" 
                          value={updateUser.birthday}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <div className='col-md-4 mb-2'>
                        <label htmlFor="address" className="form-label w-100 text-center text-white">Adresse</label>
                        <input 
                          type="text" 
                          name="address"
                          className="form-control font-weight-bold" 
                          id="address" 
                          value={updateUser.address}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-md-8 m-auto mb-4'>
                        <label htmlFor="comment" className="form-label w-100 text-center text-white">Commentaire</label>
                        <textarea 
                          name="comment"
                          className="form-control font-weight-bold" 
                          id="comment" 
                          value={updateUser.comment}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                    <div className='bg-white'>
                      <Button variant="outline-secondary ms-4 mt-4 mb-2 " onClick={() => setIsEditing(false)}>Annuler</Button>
                      <Button variant="outline-warning me-2 mt-4 mb-2 float-end " type='submit' onClick={handleEdit}>Modifier</Button>
                      <Button variant="outline-danger me-2 mt-4 mb-2 float-end " type='submit' onClick={handleDelete}>Supprimer</Button>
                    </div>
              </form>
              </div>
              </>
            ) : (
            <>
            <div className='d-flex flex-wrap '>
              <div className='bg-info card w-50'>
                  <h4 className='text-center mt-2'>Information Utilisateur:</h4>
                <p className="card-text ms-3 mt-4">Prénom : <span className='text-white ms-4'>{ connectedUser.firstname }</span> </p>
                <p className="card-text ms-3">Nom : <span className='text-white ms-4'>{ connectedUser.lastname }</span> </p>
                <p className="card-text ms-3">Email : <span className='text-white ms-4'>{ connectedUser.email }</span> </p>
                <p className="card-text ms-3">Téléphone : <span className='text-white ms-4'>{ connectedUser.phone }</span> </p>
                <p className="card-text ms-3">Ville : <span className='text-white ms-4'>{ connectedUser.city }</span> </p>
                <p className="card-text ms-3 mb-4">Adresse : <span className='text-white ms-4'>{ connectedUser.address }</span> </p>
              </div>
                <div className='card bg-info w-50'>
                    <h4 className='text-center mt-2'>Enfant rattaché: <span className='text-white ms-4'></span> </h4>
                  <p className="card-text ms-3">Parent de : <span className='text-white ms-4'></span> </p>
                  <p className="card-text ms-3">Anniversaire : <span className='text-white ms-4'></span> </p>
                  <p className="card-text ms-3">Commentaire : <span className='text-white ms-4'></span> </p>
                </div>
                <div className='bg-primary w-100  d-flex flex-wrap'>
                  <h4 className='text-center mt-2 w-100'>Création de Compte:</h4>    
                  <p className="card-text w-50 text-center">Date de création de Compte : <span className='text-white ms-4'>{dateFormaterDay(connectedUser.createdAt)}</span></p>
                  <p className="card-text w-50 text-center">Date de mise à jour du Compte : <span className='text-white ms-4'>{dateFormaterDay(connectedUser.updatedAt)}</span> </p>
                </div>  
              <div className='w-100'>
                  {/* <Button variant="outline-danger ms-4 me-2 mt-4 mb-2 float-end" onClick={handleDelete}>Supprimer</Button> */}
                  <Button variant="outline-warning me-2 mt-4 mb-2 float-end" onClick={() => setIsEditing(true)}>Modifier</Button>
              </div> 
            </div>
            </>
            )}
          </div>
        </div>
    </section> 
    </>
  )
}