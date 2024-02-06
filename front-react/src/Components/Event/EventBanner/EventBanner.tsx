import { ChangeEvent, useState } from "react";
import { Button } from "react-bootstrap";

export default function EventBanner({updateEventById, setUpdateEventById}:any) {
console.log("🚀 ~ file: EventBanner.tsx:5 ~ EventBanner ~ setUpdateEventById:", setUpdateEventById)
console.log("🚀 ~ file: EventBanner.tsx:5 ~ EventBanner ~ updateEventById:", updateEventById)

  const [isEditing, setIsEditing] = useState(false);
  const [updateEventImage, setUpdateEventImage] = useState({
    image:""
  });

  // Save new modification
  const handleEditImage = () => {
  setIsEditing(false)
  // Effectuer des opérations de sauvegarde ou de mise à jour des données si nécessaire
  }

   function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setUpdateEventImage({ ...updateEventImage, [name]: value })
    console.log(value)
  }


  return (
   <>
   <div className="associationPicture">
    {isEditing ? (
      <input
          type="file"
          className="img-fluid"
          defaultValue={updateEventById.image}
          accept="image/*"
          onChange={(e) => handleChange(e)}
      />
      ) : (
        <img src="https://placehold.co/1000x250" alt="default" />
      )}

    {isEditing ? (
      <>
      <Button variant="outline-secondary ms-4" onClick={() => setIsEditing(false)}>Annuler</Button>
      <Button variant="outline-primary ms-4" onClick={handleEditImage}>Confirmer</Button>
      </>
      ) : (
      <Button variant="outline-warning ms-5"  onClick={() => setIsEditing(true)}>Modifier</Button>
      )}
   </div>
   </>
  )
}
