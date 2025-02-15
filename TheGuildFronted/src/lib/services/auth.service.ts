import { api, attachAuthToken, setAuthToken } from "../api";

import type { UserFullInformation } from "../types/UserInformation";

// Local storage tags.
const lsTokenTag = "userToken";
const lsUserInformationTag = "user";

export const register = async (name: string, username: string, email: string, password: string) => {
    return await api.post("auth/register/", {
        name,
        username,
        email,
        password,
    })
    .catch((error) => {console.log("Catch register error: " +error); throw new Error("Sign up failed");});
};

export const login = async (username: string, password: string) => {
    const response = await api
        .post("auth/user_login/", {
            username,
            password,
        })
        .then((response) => { 
            console.log(response.data); 
            if (response.data.token) {
                localStorage.setItem(lsTokenTag, JSON.stringify(response.data));
                console.log("User token: ", JSON.stringify(response.data));
                
                setAuthToken(response.data.token);

                return response.data;
            }
            throw new Error("No token in response");
        })
        .catch((error) => {console.log("Catch login error: " +error); return null;});

    if(response == null){
        throw new Error("User credentials incorrect");
    }

    const userFullInformation = await GetFullUserinfo().then((userFullInformationResponse) => {
        const fullUserData : UserFullInformation = userFullInformationResponse;
        localStorage.setItem(lsUserInformationTag, JSON.stringify(userFullInformationResponse));
        console.log("Full user info: ", JSON.stringify(userFullInformationResponse));
        return fullUserData;
    }).catch((error) => {console.log("Catch user full information error: " +error); return null;});
    return userFullInformation;
};

export const GetFullUserinfo = async () => {
    try {
        attachAuthToken();
        const getResponse = await api.get("auth/user/"+getCurrentUserToken().id+"/");

        const user : UserFullInformation = getResponse.data;
        return user;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error(String(error));
        }
    }
}

export const logout = () => {
    localStorage.removeItem(lsTokenTag);
};

export const GetCurrentUserInformationWithPromise = async () =>{
    let userStr = localStorage.getItem(lsUserInformationTag);
    if(userStr)
    {
        return JSON.parse(userStr);
    }
    else if(getCurrentUserToken() != null){
        await GetFullUserinfo().then((userFullInformationResponse) => {
            localStorage.setItem(lsUserInformationTag, JSON.stringify(userFullInformationResponse));
            console.log("Full user info: ", JSON.stringify(userFullInformationResponse));
        })
        userStr = localStorage.getItem(lsUserInformationTag);
        if(userStr) return JSON.parse(userStr);
    }

    return null;
}

export const getCurrentUserToken = () => {
    const userStr = localStorage.getItem(lsTokenTag);
    if (userStr) return JSON.parse(userStr);

    return null;
};