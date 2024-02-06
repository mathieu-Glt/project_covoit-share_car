import { NavLink } from "react-router-dom";

export default function DefaultPage() {
    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1 className="display-1 fw-bold">404</h1>
                <p className="fs-3"> <span className="text-danger">Opps!</span> Page non trouvé.</p>
                <p className="lead">
                    Dsl la page que vous regardé n'éxiste pas
                  </p>
                <li style={{ listStyle: "none"}}>
                <NavLink to="/" className="btn btn-primary fs-5" >
                    Go Page home
                </NavLink> 
                </li>
            </div>
        </div>
    )
}