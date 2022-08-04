import axios from "axios"
// axios: to link frontend and api
const api = axios.create({
    baseURL: "http://127.0.0.1:8000"
})

export default api