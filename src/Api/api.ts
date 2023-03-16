import axios from 'axios';

//localhost
export const api = axios.create({
  baseURL: 'http://80.249.145.220:9090/api',
  withCredentials: true,
});
