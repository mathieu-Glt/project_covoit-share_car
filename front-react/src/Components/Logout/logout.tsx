import { logout } from "../../services/api/auth";
import './logout.css';
import imglogout from '../../../src/assets/img/logout-40.png';


export default function Logout() {
 
    
  const handleLogout = async () => {
    const result = await logout(); 
    result;
    console.log("🚀 ~ file: logout.tsx:10 ~ handleLogout ~ result:", result)
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    window.location.href = "/";    
  }

  return (
    <li className="nav-item me-2 fs-5 item " style={{ listStyle: "none" }} onClick={handleLogout}>
       Deconnexion
      <img
        src={imglogout}
        alt="logout"
        className="logout-img ms-2"
      />
    </li>
  );
}
