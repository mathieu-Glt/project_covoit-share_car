import { useApi } from "../../Hooks/useApi";

// eslint-disable-next-line react-hooks/rules-of-hooks
const api = useApi();

// function find association by id
export async function getAssociationById(id:string | undefined) {  
    try {
        const getAssociationById = await api.get(`association/${id}`)
        return getAssociationById.data.datas;
    } catch (error) {
        throw new Error("echec de la recherche d'une association par id " + error);
    }
}
// function find association by email
export async function getAssociationByName() {  
    try {
        const getAssociationByName = await api.get('association/ByName/:name')
        return getAssociationByName;
    } catch (error) {
        throw new Error("echec de la recherche d'une association par son nom " + error);

    }
}
// function find all associations
export async function getAllAssociations() {  
    try {
        const getAllAssociations = await api.get('associations')
        return getAllAssociations.data.datas;
    } catch (error) {
        throw new Error("echec de la recherche de la liste de toutes les associations " + error);
    }
}
// function create association
export async function createAssociation(id:string | undefined, body:any ) {  
    try {
        const createAssociation = await api.post(`association/create/byUser/${id}`, body)
        return createAssociation;
    } catch (error) {
        throw new Error("echec de la création d'une nouvelle association" + error);

    }
}
// function update association
export async function updateAssociation(id:string, body:any) {  
    try {
        const updateAssociation = await api.put(`association/update/${id}`, body)
        return updateAssociation;
    } catch (error) {
        throw new Error("echec de la modification d'une association par id " + error);
    }
}

// function delete association
export async function deleteAssociation(id:string) {
    try {
        const deleteAssociation = await api.delete(`association/delete/${id}`)
        return deleteAssociation;
    } catch (error) {
        throw new Error("echec de la suppression d'une association par id " + error);

    }
}

//find all asso by role type USER
export async function indexAssoByRoleUser(id: string |undefined) {
    try {
        const indexAssoByRoleUser = await api.get(`asso/role/user/${id}`)
        console.log("🚀 ~ All asso by USER (by role User)", indexAssoByRoleUser)
        return indexAssoByRoleUser;
    } catch (error) {
        throw new Error("echec de la recherche de la liste des associations dont l'utilisateur a un role User " + error);
    }
}

//find all asso by role type ADMIN 
export async function indexAssoByRoleAdmin(id: string) {
    try {
        const indexAssoByRoleAdmin = await api.get(`asso/role/admin/${id}`)
        console.log("🚀 ~ All asso by USER (by role Admin)", indexAssoByRoleAdmin)
        return indexAssoByRoleAdmin;
    } catch (error) {
        throw new Error("echec de la recherche de la liste des associations dont l'utilisateur a un role Admin " + error);

    }
}
//find all asso by userId
export async function indexAssoByUserId(id: string | undefined) {
    try {
        const indexAssoByUserId = await api.get(`asso/user/${id}`)       
        return indexAssoByUserId.data.datas;
    } catch (error) {
        throw new Error("echec de la recherche de la liste des associations par userId " + error);

    }
}
