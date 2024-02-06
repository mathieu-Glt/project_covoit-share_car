import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoutes() {

  const authentification = localStorage.getItem('accessToken')
  
  return authentification ? <Outlet/> : <Navigate to="/" />
}
