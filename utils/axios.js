import axios from "axios"

let apiURL = import.meta.env.VITE_API_URL;
if (apiURL && !apiURL.startsWith('http://') && !apiURL.startsWith('https://')) {
    apiURL = `https://${apiURL}`;
}

const instance = axios.create({
    baseURL: apiURL,
    withCredentials: true
})

export default instance