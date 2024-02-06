import { useApi } from "../../Hooks/useApi";

// eslint-disable-next-line react-hooks/rules-of-hooks
const api = useApi();

// function find group by id
export async function getGroupById(id:string | undefined) {  
    try {
        const getGroupById = await api.get(`group/${id}`)
        return getGroupById.data.datas;
    } catch (error) {
        throw new Error("echec de la recherche d'un groupe par id " + error);
    }
}


// function find group by name
export async function getGroupByName(name:string) {  
    try {
        const getGroupByName = await api.get(`group/ByName/${name}`)
        return getGroupByName;
    } catch (error) {
        throw new Error("echec de la recherche d'un groupe par nom " + error);
    }
}

// function find all group
export async function getAllGroups() {  
    try {
        const getAllGroups = await api.get('groups')
        return getAllGroups.data.datas;
    } catch (error) {
        throw new Error("echec de la recherche de tous les groupes " + error);
    }
}

// function find all groups BY ASSO ID 
export async function getAllGroupsByAsso(id: string | undefined) {  
    try {
        const getAllGroupsByAsso = await api.get(`groups/ByAsso/${id}`)
        return getAllGroupsByAsso.data.datas;
    } catch (error) {
        throw new Error("echec de la recherche de tous les groupes par association " + error);
    }
}
// function find all groups BY ASSO ID BY USER ID
export async function getAllGroupsByAssoByUserId(id: string | undefined) {  
    try {
        const getAllGroupsByAssoByUserId = await api.get(`groups/ByAsso/ByUser/${id}`)
        return getAllGroupsByAssoByUserId.data.datas;
    } catch (error) {
        throw new Error("echec de la recherche de tous les groupes par association par userId " + error);
    }
}

// function create group 
export async function createGroup(body:any) {  
    try {
        const createGroup = await api.post('group/create', body)
        return createGroup;
    } catch (error) {
        throw new Error("echec de la creation d'un groupe " + error);
    }
}

// function update group
export async function updateGroup(id: string, body: any) {  
    try {
        const updateGroup = await api.put(`group/update/${id}`, body)
        return updateGroup;
    } catch (error) {
        throw new Error("echec de la mise à jour du groupe " + error);
    }
}

// function delete group
export async function deleteGroup(id:string) {
    try {
        const deleteGroup = await api.delete(`group/delete/${id}`)
        return deleteGroup;
    } catch (error) {
        throw new Error("echec de la suppression du groupe " + error);
    }
}