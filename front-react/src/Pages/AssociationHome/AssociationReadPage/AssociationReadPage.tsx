import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AssociationRead from "../../../Components/Association/AssociationRead/AssociationRead";
import { getAssociationById } from "../../../services/api/association";


//PAGE TO Read Group 
export default function AssociationReadPage() {
const [updateAssociationById, setUpdateAssociationById] = useState({});
console.log("🚀 ~ file: AssociationsReadPage.tsx:9 ~ AssociationsReadPage ~ updateAssociationById:", updateAssociationById)
const params = useParams();
  const id = params.id
  console.log("🚀 ~ file: EventReadPage.tsx:15 ~ EventPage ~ id:", id)
  
  useEffect(() => {
    
    async function findAssociationById() {
      try {
        const response = await getAssociationById(id);
        console.log(response)
        if (response) {
          setUpdateAssociationById(response)
        } else {
          console.log("pas d'association associer à cette ID")
        }
      } catch (error) {
          throw new Error("pas d'association associer à cette ID " + error);
      }
    }
    findAssociationById()
  }, [id])

    return (
        <div>
            <AssociationRead updateAssociationById={updateAssociationById} setUpdateAssociationById={setUpdateAssociationById} />
      </div>
    )
  }