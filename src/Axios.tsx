import axios from 'axios';

export default axios.create({
  baseURL: 'http://192.168.56.101:3001',
  responseType: 'json',
  withCredentials: true,
})