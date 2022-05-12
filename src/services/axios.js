import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://apifashion.ikaart.org',
});

export default instance;
