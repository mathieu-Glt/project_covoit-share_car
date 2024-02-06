import { useApi } from "../../Hooks/useApi";

// eslint-disable-next-line react-hooks/rules-of-hooks
const api = useApi();

// function find exchange by requestId
export async function getExchangeByRequestId(id:string | undefined) {  
    try {
        const getExchangeByRequestId= await api.get(`exchanges/byRequest/${id}`)
        return getExchangeByRequestId.data.datas;
    } catch (error) {
        throw new Error("echec de la recherche d'un exchange par request id " + error);
    }
}

// function find exchange by userId
export async function getExchangeByUserId(id:string| undefined) {  
    try {
        const getExchangeByUserId = await api.get(`exchange/byUser/${id}`)
        return getExchangeByUserId;
    } catch (error) {
        throw new Error("echec de la recherche d'un exchange par userId " + error);
    }
}

// function find requests by exchange by userId
export async function getRequestByExchangeByUserId(id:string| undefined) {  
    try {
        const getRequestByExchangeByUserId = await api.get(`requests/byExchange/ByUser/${id}`)
        return getRequestByExchangeByUserId.data.datas;
    } catch (error) {
        throw new Error("echec de la recherche de toute les requests par exchange par userId " + error);
    }
}

// function find requests BY exchange id
export async function getRequestByExchangeId(id: string | undefined) {  
    try {
        const getRequestByExchangeId = await api.get(`request/byExchange/${id}`)
        return getRequestByExchangeId.data.datas;
    } catch (error) {
        throw new Error("echec de la recherche de toute les requests par exchange Id " + error);
    }
}

// function create response exchange par exchange Id ?
export async function createReplyExchangeByExchangeId(id:string, body:any) {  
    try {
        const createReplyExchangeByExchangeId = await api.post(`create/exchange/reply/ByExchange/${id}`, body)
        return createReplyExchangeByExchangeId;
    } catch (error) {
        throw new Error("echec de la creation d'une request " + error);
    }
}

// function create exchange par request id
export async function createExchangeByRequestId(id: string, body: any) {  
    try {
        const createExchangeByRequestId = await api.post(`create/exchange/request/${id}`, body)
        return createExchangeByRequestId;
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