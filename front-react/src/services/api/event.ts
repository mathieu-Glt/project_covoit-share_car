import { useApi } from "../../Hooks/useApi";

// eslint-disable-next-line react-hooks/rules-of-hooks
const api = useApi();

// Call API BACK-END GET an  event function
export async function getEventById(id: string | undefined) {
    console.log(id);
    try {
        const response = await api.get(`event/${id}`);
        return response.data.datas;
    } catch (error) {
        throw new Error("echec de la recherche d'un event par id " + error);
    }
}

//PEUT ETRE A NE PAS UTILISER 
// Call API BACK-END GET all  events function
export async function getAllEvents() {
    try {
        const response = await api.get(`events`)
        return response.data.datas;
    } catch (error) {
        throw new Error("echec de la recherche de tous les events " + error);
    }
}

//call API - ALL events by GROUP 
export async function getAllEventsByGroup(groupId: string) {
    try {
        const response = await api.get(`events/byGroup/${groupId}`)
        return response.data.datas;
    } catch (error) {
        throw new Error("echec de la recherche de tous les events par groupe" + error);
    }
}

//call API - all events by asso 
export async function getAllEventsByAsso(assoId: string) {
    try {
        const response = await api.get(`events/byAsso/${assoId}`)
        return response.data.datas;
    } catch (error) {
        throw new Error("echec de la recherche de tous les events par asso" + error);
    }
}

//call API - all events by user 
export async function getAllEventsByUser(userId: string) {
    try {
        const response = await api.get(`events/byUser/${userId}`)
        return response.data.datas;
    } catch (error) {
        throw new Error("echec de la recherche de tous les events par utilisateur" + error);
    }
}

// Call API BACK-END POST an event function
export async function createEvent(body: any) {
    console.log("🚀 ~ api/event - body create event", body) 
    try {
        const response = await api.post(`event/create`, body)
        return response.data.datas;
    } catch (error) {
        throw new Error("echec de la creation d'un évènement " + error); 
    }   
}

// Call API BACK-END PUT an event function
export async function updateEvent(id: string, body: any) {
    try {
        const response = await api.put(`event/update/${id}`, body)
        return response.data.datas;

    } catch (error) {
        throw new Error("echec de la mise à jour d'un évènement " + error);
    }
}

// Call API BACK-END DELETE an event function
export async function deleteEvent(id: string) { 
    try {
        const response = await api.delete(`event/delete/${id}`)
        return response.data.datas;

    } catch (error) {
        throw new Error("echec de la suppression d'un évènement " + error);
    }
}
