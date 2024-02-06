import './homePage.style.css';
import LoginForm from '../../Components/LoginForm/LoginForm';
import Caroussel from '../../Components/Caroussel/Caroussel';

export default function HomePage() {

  return (
      <div className='container-fluid row d-flex mt-5'>
        <div className='w-50'>
          <Caroussel/>
        </div>
      <div className="container-loginPage col-6">
        <h2 className='text-center'>
          Bienvenue sur Covoit votre application de co-voiturage
        </h2>
          <LoginForm/>  
      </div>
    </div> 
  )
}



