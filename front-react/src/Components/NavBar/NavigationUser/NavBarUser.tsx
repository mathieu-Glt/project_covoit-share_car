import { NavLink } from 'react-router-dom';
import './NavBarUser.css';
import Logout from '../../Logout/logout';
import imageUser from '../../../assets/img/user.png';
import imageAssociation from '../../../assets/img/association.png';
import imageMessage from '../../../assets/img/message.png';
import imageEvenement from '../../../assets/img/evènement.png';
import imageProfil from '../../../assets/img/profil.png';

export default function NavBarUser() {
    
  return (
    <>
<nav className="navbar navbar-expand-lg bg-primary rounded-top rounded-bottom" data-bs-theme="dark">
        <div className="container-fluid">
          <div className='d-flex justify-content-center ms-5'>
            <li className='fs-5 item' style={{ listStyle: "none"}}>
              <NavLink to="/user/dashboard" className={({ isActive }) => (isActive ? "activeLink " : "")} >
                User
                <img
                src={imageUser}
                alt="user"
                className="user-img ms-2"
                />
              </NavLink>
            </li> 
          </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
    <div className="collapse navbar-collapse " id="navbarColor01 d-flex justify-content-center">
        <ul className="navbar-nav me-1 d-flex justify-content-center w-75 p-3 ms-5">
          <li className="nav-item me-2 fs-5 ms-5 mt-2 item" >
            <NavLink to="/admin/associations" className={({isActive}) => (isActive ? "activeLink": "")}>
            Association
            <img
            src={imageAssociation}
            alt="association"
            className="association-img ms-2"
            />
            </NavLink>    
          </li>
        <li className="nav-item me-2 fs-5 ms-3 mt-2 item">
          <NavLink to="/exchanges" className={({isActive}) => (isActive ? "activeLink": "")}>
            Annonces
            <img
            src={imageMessage}
            alt="message"
            className="message-img ms-2"
            />
          </NavLink>
        </li>
        <li className="nav-item me-2 fs-5 ms-3 mt-2 item">
          <NavLink to="/events" className={({isActive}) => (isActive ? "activeLink": "")}>
            Actualité
            <img
            src={imageEvenement}
            alt="evenement"
            className="evenement-img ms-2"
            />
          </NavLink>
        </li>
        <li className="nav-item me-2 fs-5 ms-3 mt-2 item">
          <NavLink to="/profil" className={({isActive}) => (isActive ? "activeLink": "")} >
            Profil
            <img
            src={imageProfil}
            alt="profil"
            className="profil-img ms-2"
            />
          </NavLink>
        </li>
        </ul>
        <div className='d-flex justify-content-center w-25'>
          <NavLink to="/" className={({isActive}) => (isActive ? "activeLink": "")}>
            <Logout/>
          </NavLink>  
        </div> 
    </div>
  </div>
</nav>
  </>
  )
}
