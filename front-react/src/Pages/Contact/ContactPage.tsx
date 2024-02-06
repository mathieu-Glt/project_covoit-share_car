import ContactForm from "../../Components/Contact/ContactForm/ContactForm";

export default function ContactPage() {
    return (
      <div>
        <h2 className='text-center mt-4 bg-info w-50 m-auto rounded-top rounded-bottom'>Pour nous Contacter</h2>
        <div>
          <ContactForm/>
        </div>
      </div>
    )
  }