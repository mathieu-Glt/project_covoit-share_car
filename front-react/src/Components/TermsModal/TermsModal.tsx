import './termsModal.style.css'

import { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'

export default function TermsModal() {

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true);
  return (
<>
    <Link className="primary font-weight-bold" onClick={handleShow} to={''}>
        Acceptez les conditions générales
    </Link>

<Modal 
        show={show} 
        onHide={handleClose} 
        animation={false}>
    <Modal.Header closeButton>
        <Modal.Title className='modal-title'>
            <h3>Charte & conditions general</h3>  
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <p className='title'>Transporter un enfant en voiture:</p><br />
        <p className='text'>
            Un enfant de moins de dix ans doit obligatoirement voyager dans un siège adapté à son âge, son poids et sa morphologie.
            Le port de la ceinture de sécurité homologuée pour toutes les personnes présentes dans le véhicule,
            qu’elles soient conductrices ou passagères, à l’avant comme à l’arrière, est également obligatoire pour les enfants.  
        </p><br />

        <p className='title'>Trajets:</p><br />
        <p className='text'>A la mise en place du covoiturage, les covoitureurs conviennent librement entre eux des horaires, du lieu de rencontre.
            Les covoitureurs s’engagent à respecter les horaires fixés au préalable. En cas d’annulation ou de changement d’horaires, le passager, comme le conducteur, doit prévenir ses covoitureurs le plus rapidement possible.
            Le conducteur comme le passager doivent être en état physique d’effectuer le trajet.
            En outre, ils s’engagent à adopter un comportement conforme aux règles de courtoisie, de politesse,
            de tolérance et de bonnes mœurs.
        </p><br />

        <p className='title'>Respect Des Lois Et Du Code De La Route.</p><br/>
        <p className='title'>Les conducteurs s’engagent à :</p><br/>
                  
        <p className='text'>Le conducteur déclare être titulaire d’un permis de conduire en cours de validité, conforme à la catégorie de son véhicule, et accepte d’en justifier à tout passager. Il certifie ne pas être sous le coup d’une suspension ou d’un retrait de permis.
            Adopter une conduite prudente et respecter scrupuleusement le code de la route.
            Le conducteur prend la responsabilité de conduire les passagers
        </p><br />

        <p className='title'>Le conducteur garantit :</p><br/>
                  
        <p className='text'>Que le véhicule est conforme et en parfait état de fonctionnement par rapport aux règles de mise en circulation (contrôle technique à jour) et plus généralement aux règles de sécurité ;
            se conformer aux lois et règlements relatifs à la circulation des véhicules terrestres à moteur, et restera seul responsable de toute infraction ou accident engageant sa responsabilité
            ne pas faire courir de risques à ses compagnons de
            route en ayant bu de l’alcool ou absorbé des produits illicites ni de
            traitement médicamenteux pouvant diminuer ses capacités de conduite.
        </p><br />
                 
        <p className='title'>Le passager s’engage à :</p> <br/>
                 
        <p className='text'>Ne pas faire courir de risques à ses compagnons de route en ayant bu de l’alcool ou absorbé des produits illicites afin de ne pas perturber le conducteur lors du trajet.
            respecter les prescriptions et règles de sécurité qui pourront être exigées par la loi, notamment en ce qui concerne le port de la ceinture de sécurité, et à adopter une attitude courtoise et polie.
            Ne pas gêner la conduite du conducteur.
        </p><br />
                  
        <p className='title'>Respecter la propreté du véhicule dans lequel ils sont transportés.</p><br />
                 
        <p className='text'>La présente charte a pour vocation à dicter les principes régissant les bonnes pratiques inhérentes aux trajets effectués en covoiturage.<br />
            Chaque participant covoitureur, conducteur ou passager, s’engage, en signant cette charte,
            à tout mettre en œuvre pour que les trajets s’effectuent en toute sécurité et dans le respect d’autrui.
        </p>
    </Modal.Body>
    <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Fermer
            </Button>
    </Modal.Footer>
</Modal>
</>
  )
}