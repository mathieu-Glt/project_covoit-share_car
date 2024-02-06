import { useApi } from "../../Hooks/useApi";

// eslint-disable-next-line react-hooks/rules-of-hooks
const api = useApi();

// function find request by id
export async function getRequestById(id:string | undefined) {  
    try {
        const getRequestById = await api.get(`request/${id}`)
        return getRequestById.data.datas;
    } catch (error) {
        throw new Error("echec de la recherche d'une request par id " + error);
    }
}

// function find request by userId
export async function getRequestByUserId(id:string| undefined) {  
    try {
        const getRequestByUserId = await api.get(`requests/user/${id}`)
        return getRequestByUserId;
    } catch (error) {
        throw new Error("echec de la recherche d'une request par userId " + error);
    }
}

// function find requests by assoId
export async function getRequestByAssoId(id:string| undefined) {  
    try {
        const getRequestByAssoId = await api.get(`requests/asso/${id}`)
        return getRequestByAssoId.data.datas;
    } catch (error) {
        throw new Error("echec de la recherche de toute les requests par assoId " + error);
    }
}

// function find requests BY eventId
export async function getRequestByEventId(id: string | undefined) {  
    try {
        const getRequestByEventId = await api.get(`requests/event/${id}`)
        return getRequestByEventId.data.datas;
    } catch (error) {
        throw new Error("echec de la recherche de toute les requests par eventId " + error);
    }
}
// function find all requests
export async function getAllRequests() {  
    try {
        const getAllRequests = await api.get(`requests`)
        return getAllRequests.data.datas;
    } catch (error) {
        throw new Error("echec de la recherche de tous les requests " + error);
    }
}

// function create request par eventId ?
export async function createRequest(id: string |undefined, body:any) {  
    try {
        const createRequest = await api.post(`request/create/${id}`, body)
        return createRequest;
    } catch (error) {
        throw new Error("echec de la creation d'une request " + error);
    }
}

// function update request
export async function updateRequest(id: string, body: any) {  
    try {
        const updateRequest = await api.put(`request/update/${id}`, body)
        return updateRequest;
    } catch (error) {
        throw new Error("echec de la mise à jour d'une request " + error);
    }
}

// function delete request
export async function deleteRequest(id:string| undefined) {
    try {
        const deleteRequest = await api.delete(`requests/delete/${id}`)
        return deleteRequest;
    } catch (error) {
        throw new Error("echec de la suppression du groupe " + error);
    }
}