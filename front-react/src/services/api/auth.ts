import axios from "axios";
import { useApi } from "../../Hooks/useApi";
import Login from "../../interface/login.interface";

// eslint-disable-next-line react-hooks/rules-of-hooks
const api = useApi();

// function login
export async function loginUser(body: Login) {
    console.log("🚀 ~ file: auth.ts:9 ~ loginUser ~ body:", body)
    try {
        const login = await api.post('auth/login', body)
        console.log("🚀 ~ file: auth.ts:12 ~ loginUser ~ login:", login)
        return login;
    } catch (error) {
        console.log("🚀 ~ file: auth.ts:15 ~ loginUser ~ error:", error)
        throw new Error("echec de la connection " + error);
    }
}

// function logout
export async function logout() {
    try {
        const logout = await api.get('auth/logout');
        return logout;
    } catch (error) {
        throw new Error("echec de la déconnection" + error);
    }
}

//CREATION PROFILE PARENT ADMIN
export async function registerAdmin(body: any) {
    try {
        const register = await api.post('auth/register', body)
        return register;
    } catch (error) {
        throw new Error("echec de la création d'un utilisateur " + error);

    }
}

//CREATION PROFILE PARENT ADMIN - PART 2 
//link to form to create asso (token)
export async function confirmProfileAdmin(token: string) {
    try {
        const confirmAdmin = await api.get(`auth/create/asso/${token}`)
        return confirmAdmin
    } catch (error) {
        throw new Error("echec de la confirmation d'un utilisateur " + error);

    }
}

//when a user forgots its password 
export async function forgotPassword(body: {email: string}) {
    try {
        const forgotPassword = await api.post(`auth/forgot-password`, body)
        return forgotPassword
    } catch (error) {
        throw new Error("echec de l'envoi d'email pour oubli de mot de passe" + error);
    }
}

//update the password after verification with token (emai)
export async function newPassword(token: string) {
    try {
        const newPassword = await api.post(`auth/new-password/${token}`) 
        return newPassword
    } catch (error) {
        throw new Error("echec de la création d'un nouveau mot de passe " + error);
    }
}

// function refreshTokens
export async function refreshTokens(){
    
    const token = localStorage.getItem('refreshToken');
    const headers = {
        'Authorization': 'Bearer ' + token,
    }
   
    try {
        const refreshResponse = await axios.get(
            import.meta.env.VITE_API_BASE_URL+ 'auth/refresh-token',
            { headers }
        );
        console.log(":rocket: ~ file: auth.tsx:55 ~ refreshToken ~ refreshToken:", refreshResponse)
        return refreshResponse;
    } catch (error) {
        throw new Error("Echec du refreshToken " + error);  
    }
}

// function destroytoken && user
export async function destroyTokenUser(){
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
}

//CONFIRM PROFILE PARENT USER (when created by kid) 
//verify token when creating parent account (kinked to a kid)
export async function confirmProfileUser(token:string) {
    try {
        const confirmParentUser = await api.get(`auth/confirm-profile/${token}`)
        return confirmParentUser
    } catch (error) {
        throw new Error("echec de la vérification d'un profil d'un utilisateur parent " + error);

    }
}

//RECUPERER LE AUTH TOKEN A PARTIR DU TOKEN DANS URL 
export async function findTokenByToken(token: string | undefined) {
    try {
        const findAuthTokenByToken = await api.get(`auth/token/${token}`)
        return findAuthTokenByToken.data.datas
    } catch (error) {
        throw new Error("echec de la répération d'un auth token " + error);
    }    
}
