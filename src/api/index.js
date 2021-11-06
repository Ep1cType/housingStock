import axios from "axios";


const instance = axios.create({
  baseURL: 'https://dispex.org/api/vtest/',
});

export default instance;
