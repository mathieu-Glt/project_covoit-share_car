import { useApi } from "../../Hooks/useApi";

// eslint-disable-next-line react-hooks/rules-of-hooks
const api = useApi();


// function user Connected show me
export async function userConnected() {  
    try {
        const userConnected = await api.get('user/show/me')
        console.log("🚀 ~ api/user ~ userConnected:", userConnected)
        return userConnected.data.datas;
    } catch (error) {
        throw new Error("echec de l'affichage de l'utilisateur connecté " + error);

    }
}

// function update user connected
export async function updateUserConnected(body:any , id:string) {  
    try {
        const updateUserConnected = await api.put('user/update/me', body)
        return updateUserConnected;
    } catch (error) {
        throw new Error("echec de la modification de l'utilisateur connecté " + error);
    }
}

// function find user by id
export async function getUserById(id:string) {  
    try {
        const getUserById = await api.get(`user/${id}`)
        return getUserById;
    } catch (error) {
        throw new Error("echec de la recherche de l'utilisateur par son ID' " + error);
    }
}

// function find user by email
export async function getUserByEmail(email:string) {  
    try {
        const getUserByEmail = await api.get(`user/byEmail/${email}`)
        return getUserByEmail.data.datas;
    } catch (error) {
        throw new Error("echec de la recherche de l'utilisateur par son email' " + error);
    }
}

// function find all users
export async function getAllUsers() {  
    try {
        const getAllUsers = await api.get('users')
        return getAllUsers;
    } catch (error) {
        throw new Error("echec de la recherche de tous les utilisateurs " + error);
    }
}

// function find all users
// PARENTS 
export async function getAllUsersByAsso(id: string) {  
    try {
        const getAllUsers = await api.get(`users/byAsso/${id}`)
        return getAllUsers;
    } catch (error) {
        throw new Error("echec de la recherche de tous les utilisateurs d'une association' " + error);
    }
}

// find all users KID by ASSO 
// RETURN USERDOCUMENT[]
export async function getAllUsersKidByAsso(id: string) {  
    try {
        const getAllUsersKidsByAsso = await api.get(`users/kid/byAsso/${id}`)
        return getAllUsersKidsByAsso;
    } catch (error) {
        throw new Error("echec de la recherche de tous les utilisateurs d'une association' " + error);
    }
}

// function find all users
// ENFANTS 
export async function getAllUsersByGroup(id: string) {
    try {
        const getAllUsers = await api.get(`users/byGroup/${id}`)
        console.log("🚀 ~ api/user ~ getAllUsers:", getAllUsers)
        return getAllUsers;
    } catch (error) {
        throw new Error("echec de la recherche de tous les utilisateurs d'un groupe' " + error);
    }
}

// function update user
export async function updateUser(id:string, body:any) {  
    try {
        const updateUser = await api.put(`user/update/${id}`, body)
        return updateUser.data;
    } catch (error) {
        throw new Error("echec de la modification de l'utilisateur " + error);
    }
}
// function update user
export async function updateUserParentAdmin(id:string, body:any) {  
    try {
        const updateUserAdmin = await api.put(`userAdmin/update/${id}`, body)
        return updateUserAdmin.data;
    } catch (error) {
        throw new Error("echec de la modification de l'utilisateur " + error);
    }
}

// function delete user
export async function deleteUser(id:string) {  
    try {
        const deleteUser = await api.delete(`user/delete/${id}`)
        return deleteUser;
    } catch (error) {
        throw new Error("echec de la suppression de l'utilisateur" + error);
    }
}

//function create user type kid+parent+relation 
//ETAPE 1
export async function createUsers(body:any) {  
    try {
        const createUsers = await api.post('users/create', body)
        return createUsers;
    } catch (error) {
        throw new Error("echec de la création d'un enfant et de son parent " + error);
    }
}

//once token verified in auth (confirmProfileUser) 
//form to update other parent info 
export async function updateParentProfileUser(id:string, body: any) {
    try {
        const updateParentProfileUser = await api.post(`user/update-profile/${id}`, body)
        return updateParentProfileUser
    } catch (error) {
        throw new Error("echec de la mise à jour d'un profile parent après vérification du token " + error);
    }
}
