import { NavLink } from 'react-router-dom';
import './NavBarAdmin.css';
import Logout from '../../Logout/logout';
import imageAdmin from '../../../assets/img/Administration-PNG-Photo.png';
import imageAssociation from '../../../assets/img/association.png';
import imageGroupe from '../../../assets/img/groupe.png';
import imageEvenement from '../../../assets/img/evènement.png';
import imageProfil from '../../../assets/img/profil.png';



export default function NavBarAdmin() {
  return (
    <>
<nav className="navbar navbar-expand-lg bg-primary rounded-top rounded-bottom" data-bs-theme="dark">
    <div className="container-fluid">
        <div className='d-flex justify-content-center ms-5 mt-1' >
            <li className='fs-5 item ' style={{ listStyle: "none"}}>
                <NavLink to="/admin/dashboard" className={({ isActive }) => (isActive ? "activeLink " : "")} >
                    Admin
                    <img
                    src={imageAdmin}
                    alt="admin"
                    className="admin-img ms-2"
                    />
                </NavLink>
            </li>     
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarColor01 d-flex justify-content-center">
            <ul className="navbar-nav me-1 d-flex justify-content-center w-75 p-3 ms-5 ">
            <li className="nav-item me-2 fs-5 ms-5 mt-1 item" >
                <NavLink to="/admin/associations" className={({isActive}) => (isActive ? "activeLink": "")}>
                        Association
                        <img
                        src={imageAssociation}
                        alt="association"
                        className="association-img ms-2"
                        />
                </NavLink>    
            </li>
            {/* <li className="nav-item me-2 fs-5 ms-3">
                <NavLink to="/exchanges" className={({isActive}) => (isActive ? "activeLink": "")}>
                        Messages
                        <img
                        src={imageAdmin}
                        alt="admin"
                        className="admin-img ms-1"
                        />
                </NavLink>
            </li> */}
            <li className="nav-item me-2 fs-5 ms-3 mt-2 item">
                <NavLink to="/events" className={({isActive}) => (isActive ? "activeLink": "")}>
                    Evènement
                    <img
                    src={imageEvenement}
                     alt="evenement"
                    className="evenement-img ms-2"
                    />
                </NavLink>
            </li>
            <li className="nav-item me-2 fs-5 ms-3 mt-2 item">
                <NavLink to="/admin/groups" className={({isActive}) => (isActive ? "activeLink": "")}>
                Groupes
                    <img
                    src={imageGroupe}
                    alt="groupe"
                    className="groupe-img ms-2"
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
            <div className='d-flex justify-content-end w-25 me-5 mt-2'>
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