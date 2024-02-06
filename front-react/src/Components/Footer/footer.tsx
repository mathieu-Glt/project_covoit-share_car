import { NavLink } from "react-router-dom";



export default function Footer() {
  return (
    <footer className="bg-primary text-center text-lg-start rounded-top rounded-bottom">
          <div className="text-center p-3 fs-5 text-white">
            © 2023 Copyright : 
              <li style={{ listStyle: "none"}}>
            <NavLink to="/" className="text-white fs-5" >
             Covoit.com
            </NavLink> 
              </li>
        </div>
    </footer>
  );
}