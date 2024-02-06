import { NavLink } from "react-router-dom";
import './NavBarVisitor.css';
import imageLogo from '../../../assets/img/logo.png';
import imageContact from '../../../assets/img/contact-icon.png';
import imageAddAdmin from '../../../assets/img/addAdmin.png';
 
export default function NavBarVisitor() {
    return (
        <>
       <nav className="navbar navbar-expand-lg bg-primary rounded-top rounded-bottom" data-bs-theme="dark">
    <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex justify-content-end " id="navbarColor01">
            <ul className="navbar-nav me-1 w-100 p-3 ms-5 d-flex justify-content-between ">
            <li className='fs-5 w-50 ' style={{ listStyle: "none"}}>
                <NavLink to="/" className={({ isActive }) => (isActive ? "activeLink " : "")} >
                    <img
                    src={imageLogo}
                    alt="logo"
                    className="logo-img ms-2"
                    />
                </NavLink>
            </li>
            <li className="nav-item me-2 fs-5 ms-3 mt-2 item ">
                <NavLink to="/admin/create" className={({isActive}) => (isActive ? "activeLink": "")} >
                    Inscription
                    <img
                    src={imageAddAdmin}
                    alt="admin"
                    className="admin-img ms-2"
                    />
                </NavLink>
            </li>                
            <li className="nav-item me-2 fs-5 ms-3 mt-2 item ">
                <NavLink to="/contact" className={({isActive}) => (isActive ? "activeLink": "")} >
                    Contact
                    <img
                    src={imageContact}
                    alt="contact"
                    className="contact-img ms-2"
                    />
                </NavLink>
            </li>
            </ul>               
        </div>
    </div>
</nav>
  </>
    )
  }