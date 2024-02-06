import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGroupById } from "../../../services/api/group";
import GroupsRead from "../../../Components/Groups/GroupsRead/GroupsRead";


//PAGE TO Read Group 
export default function GroupsReadPage() {
const [updateGroupById, setUpdateGroupById] = useState({});
console.log("🚀 ~ file: GroupsReadPage.tsx:9 ~ GroupsReadPage ~ updateGroupById:", updateGroupById)
const params = useParams();
  const id = params.id
  console.log("🚀 ~ file: GroupsReadPage.tsx:13 ~ GroupsReadPage ~ id:", id)
 
  
  useEffect(() => {
    
    async function findGroupById() {
      try {
        const response = await getGroupById(id);
        console.log(response)
        if (response) {
          setUpdateGroupById(response)
        } else {
          console.log("pas de groupe associer à cette ID")
        }
      } catch (error) {
          throw new Error("pas de groupe associer à cette ID " + error);
      }
    }
    findGroupById()
  }, [id])
    return (
        <div>
            <GroupsRead updateGroupById={updateGroupById} setUpdateGroupById={setUpdateGroupById} />
      </div>
    )
  }
  