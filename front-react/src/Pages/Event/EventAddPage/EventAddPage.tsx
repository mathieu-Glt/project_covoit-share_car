import EventAddForm from "../../../Components/Event/EventAddForm/EventAddForm";

//PAGE TO CREATE NEW EVENT 
export default function EventAddPage() {
    return (
        <div>
            <h2 className='text-center mt-4 bg-info w-50 m-auto rounded-top rounded-bottom'>Créer un Evènement</h2>
            <div className="container mt-4">       
              <EventAddForm/>
            </div>
      </div>
    )
  }
  