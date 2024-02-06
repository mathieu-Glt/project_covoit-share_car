import './profilPage.style.css'
import { useState, useEffect } from 'react';
import { userConnected } from '../../services/api/user';
import Profil from '../../Components/Profil/Profil';

export default function ProfilPage() {
  const [connectedUser, setConnectedUser] = useState({})
  console.log("🚀 ~ file: ProfilPage.tsx:8 ~ ProfilPage ~ connectedUser:", connectedUser)
  
  useEffect(() => {
    async function loadUser() {
      const connected = await userConnected();
      console.log(connected)
      if (connected) {
        setConnectedUser(connected)
      }
  }
    loadUser()
  },[])

  return (
    <>
      <Profil connectedUser={connectedUser} setConnectedUser={setConnectedUser} />
    </>
  )
}
