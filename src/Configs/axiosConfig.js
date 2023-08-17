import axios from 'axios'
const urlFakeBackend = "http://localhost:5000"
const axiosInstance = axios.create({
    baseURL: urlFakeBackend,
});

export default axiosInstance;