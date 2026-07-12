import axios from "axios"

const instance = axios.create({
    baseURL: "https://sweetshop-backend-nine.vercel.app",
    withCredentials: true
})

export default instance