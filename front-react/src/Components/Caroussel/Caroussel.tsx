import { Carousel } from "react-bootstrap";
import ImageBasketball from '../../assets/carroussel/basket.jpg';
import ImageFootball from '../../assets/carroussel/football.jpg';
import ImageTennis from '../../assets/carroussel/tennis.jpg';
import ImageCovoiturage from '../../assets/carroussel/co-voiturage-1.jpg';
import ImageCovoitEnfant from '../../assets/carroussel/covoit-enfant.jpg';
import ImageCovoit from '../../assets/carroussel/co-voiturage-deux.jpg';

export default function Caroussel() {
  return (
      <Carousel className="w-100">
          <Carousel.Item interval={1000}>
        <img
          className="d-block w-100"
          src={ImageCovoiturage}
          alt="First slide"
        />
        <Carousel.Caption >
          <h3 className="text-black">COVOIT</h3>
          <p className="text-black fs-4">Application de covoiturage pour association dans votre région.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
        <img
          className="d-block w-100"
          src={ImageFootball}
          alt="First slide"
        />
        <Carousel.Caption >
          <h3 className="text-info">Football</h3>
          <p className="text-info fs-4">Organiser les déplacement de vos enfants pour leur sport favoris.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
        <img
          className="d-block w-100"
          src={ImageBasketball}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3 className="text-black">BasketBall</h3>
          <p className="text-black fs-4">Toute les associations sportive de votre région utilise notre application.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={ImageCovoit}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3 className="text-white mb-4">Confiance && Sécurité</h3>
          {/* <p className="text-white fs-5">
            Faites nous confiance notre application et cent pour cent sécurisé que se soit au niveau des données ou des utilisateurs.
          </p> */}
        </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={1000}>
        <img
          className="d-block w-100"
          src={ImageTennis}
          alt="First slide"
        />
        <Carousel.Caption >
          <h3 className="text-black">Passion</h3>
          <p className="text-black fs-5">Pour que vos enfants puisse vivre leur passion</p>
        </Carousel.Caption>
      </Carousel.Item>
          <Carousel.Item interval={1000}>
        <img
          className="d-block w-100"
          src={ImageCovoitEnfant}
          alt="First slide"
        />
        <Carousel.Caption >
          {/* <h3 className="text-black">Responsabilité</h3>
          <p className="text-black fs-5">Cette application vous engage à ètre responsable auprés pour votre bien ètre et celui de notre communauté</p> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}