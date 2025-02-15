import axios from "axios";

const lsTokenTag = "userToken";

const api = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

const Get = async (url: string)=>{
    const response = await api.get(url);
    console.log(response);
    console.log(response.headers["Set-Cookie"]);
    return response;
}

const setAuthToken = (token: string) =>{
    if (token) {
        api.defaults.headers['Authorization'] = `Token ${token}`;
      } else {
        delete api.defaults.headers['Authorization'];
      }
};

const attachAuthToken = () => {
    const token = localStorage.getItem(lsTokenTag);
    if (token) {
        setAuthToken(JSON.parse(token).token);
    }
};


export { api, Get, setAuthToken, attachAuthToken };