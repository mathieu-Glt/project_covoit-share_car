import { FormEvent, useState } from "react";
import { Button } from "react-bootstrap";

export default function ContactForm() {
    const [contact , setContact] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: ""
    });

    // Set value inputs contact form
    const handleChange = (e: any) => {
    const { name, value }: any = e.target;
    setContact({ ...contact, [name]: value });
  };

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Envoyé')
};
    
    return (
    <div>
    <form  onSubmit={sendEmail} className="formulaire-contact">
        <label className="text-center w-100 m-auto fs-5 mt-4 mb-2">Nom</label>
        <input
        type="text"
        name="firstname"
        required
        autoComplete="off"
        value={contact.firstname}
        onChange={(e) => handleChange(e)} 
        className="form-control w-50 m-auto "
        />
        <label className="text-center w-100 m-auto fs-5 mt-4 mb-2">Prenom</label>
        <input
        type="text"
        name="lastname"
        required
        autoComplete="off"
        value={contact.lastname}
        onChange={(e) => handleChange(e)} 
        className="form-control w-50 m-auto"
        />
        <label className="text-center w-100 m-auto fs-5 mt-4 mb-2">Email</label>
        <input
        type="email"
        name="email"
        required
        autoComplete="off"
        value={contact.email}
        onChange={(e) => handleChange(e)}           
        className="form-control w-50 m-auto"
        />
        <label className="text-center w-100 m-auto fs-5 mt-4 mb-2">Téléphone</label>
        <input
        type="text"
        name="phone"
        required
        autoComplete="off"
        value={contact.phone}
        onChange={(e) => handleChange(e)}             
        className="form-control w-50 m-auto"
        />
        <label className="text-center w-100 m-auto fs-5 mt-4 mb-3">Message</label>
        <textarea
        name="message"
        required
        autoComplete="off"
        value={contact.message}
        onChange={(e) => handleChange(e)} 
        className="form-control w-75 m-auto"
        />
        <Button variant="outline-primary me-4 mt-1 float-end mb-4 " type="submit">Envoyer</Button>
      </form>
    <div className="form-message"></div> 
    </div>
    )
}