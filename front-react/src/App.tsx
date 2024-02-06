import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/lumen/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';

import HomePage from './Pages/Home/HomePage';
import NavBarUser from './Components/NavBar/NavigationUser/NavBarUser';
import ExchangeListPage from './Pages/Exchange/ExchangeListPage/ExchangeListPage';
import EventAddPage from './Pages/Event/EventAddPage/EventAddPage';
import EventListPage from './Pages/Event/EventListPage/EventListPage';
import EventReadPage from './Pages/Event/EventReadPage/EventReadPage';
import RequestAddPage from './Pages/Request/RequestAddPage/RequestAddPage';
import RequestReadPage from './Pages/Request/RequestReadPage/RequestReadPage';
import ExchangeAddPage from './Pages/Exchange/ExchangeAddPage/ExchangeAddPage';
import ExchangeReadPage from './Pages/Exchange/ExchangeReadPage/ExchangeReadPage';
import HomeDashboardAdmin from './Pages/AdminDashboard/HomeDashboardAdmin';
import ProfilPage from './Pages/Profile/ProfilPage';
import UserConfirmsMembership from './Pages/UserConfirmsMembership/UserConfirmsMembership';
import UserDashboardPage from './Pages/UserDashboard/UserDashboardPage';
import GroupsListPage from './Pages/Groups/GroupsListPage/GroupsListPage';
import NotFoundPage from './services/utils/NotFoundPage';
import Footer from './Components/Footer/footer';
import ResetPasswordUser from './Components/ResetPassword/resetPasswordUser';
import NavBarAdmin from './Components/NavBar/NavigationAdmin/NavBarAdmin';
import PrivateRoutes from './services/utils/PrivateRoute';
import React from 'react';
import NavBarVisitor from './Components/NavBar/NavigationVisitor/NavBarVisitor';
import ContactPage from './Pages/Contact/ContactPage';
import GroupsReadPage from './Pages/Groups/GroupsReadPage/GroupsReadPage';
import AssociationReadPage from './Pages/AssociationHome/AssociationReadPage/AssociationReadPage';
import UsersAdminsFormPage from './Pages/UsersAdmins/UsersAdminsFormPage';
import UsersCreatePage from './Pages/Adhérent/UsersCreatePage/UsersCreatePage';
import AssociationList from './Pages/AssociationHome/AssociationListPage/AssociationListPage';
import AssociationsCreateForm from './Components/Association/AssociationCreate/AssociationsCreateForm';
import UsersAdminsConfirmPage from './Pages/UsersAdminsConfirm/UsersAdminsConfirmPage';
import GroupCreateForm from './Components/Groups/GroupCreate/GroupeCreateForm';

function App() {
  // on récupère le token dans une const
  const token = localStorage.getItem('accessToken');
  // on récupère les datas user dans une const
  const user = localStorage.getItem('user');
  // on convertit le localStorage en object JS
  const data = JSON.parse(user);
  // on récupère le role de user dans une const
  let role = "";
  if (data && data.associations[0].role) {
     role = data.associations[0].role;
  }

  const UserContext = React.createContext({
    data,
    token
  })
  return (
    <>
      <div className="App">
      <UserContext.Provider value={{data, token}}>
        {/* //TODO AFFICHAGE CONDITIONNEL NAVBAR PR UTILISATEUR CONNECTES */}
        {token && role === 'Admin' ? (
          <NavBarAdmin/>
        ) : (
          ""
        )}

        {token && role === 'User' ? (
          <NavBarUser/>
        ) : (
         ""
        )}
          
        {!token ? (
          <NavBarVisitor/>
        ) : (
         ""
        )}
        
        <Routes>

          <Route path="/" element= {<HomePage/>}/>
            <Route element={<PrivateRoutes />} />
            
            <Route path="/events" element= {<EventListPage />}/>
            <Route path="/event/:id" element= {<EventReadPage />}/>
            <Route path="/admin/events/create/:id" element={<EventAddPage />} />
            
            <Route path="/exchanges" element= {<ExchangeListPage />}/>
            <Route path="/exchanges/read" element= {<ExchangeReadPage />}/>
            <Route path="/exchanges/add" element={<ExchangeAddPage />} />
            
            <Route path="/requests/read" element= {<RequestReadPage />}/>
            <Route path="/requests/add/:id" element={<RequestAddPage />} />
            
            <Route path="/admin/groups/:id" element={<GroupsReadPage />} />
            <Route path="/admin/groups" element={<GroupsListPage />} />
            <Route path="/admin/groups/create/:id" element={<GroupCreateForm />} />
            <Route path="/user/typekid/create/:id" element={<UsersCreatePage />} />

            
            
            <Route path="/admin/associations" element={<AssociationList />} />
            <Route path="/admin/association/create/:id" element={<AssociationsCreateForm />} />
            <Route path="/admin/association/:id" element={<AssociationReadPage />} />
            
            <Route path="/profil" element={<ProfilPage />} />
            <Route path="/contact" element={<ContactPage />} />

            <Route path="/admin/dashboard" element={<HomeDashboardAdmin />} />
            <Route path="/admin/create" element={<UsersAdminsFormPage />} />
            
            <Route path="/auth/create-asso/:token" element={<UsersAdminsConfirmPage />}/> 
            
            <Route path="/auth/confirm-profile/:token" element= {<UserConfirmsMembership />}/>
            <Route path="/auth/new-password/:token" element= {<ResetPasswordUser />}/>
            <Route path="/user/dashboard" element= {<UserDashboardPage />}/>
          <Route path="*" element= {<NotFoundPage/>} />
          </Routes>

        <div className='mt-5'>
          <Footer/>
        </div> 
          </UserContext.Provider>  
      </div>
    </>
  )
}
export default App;
