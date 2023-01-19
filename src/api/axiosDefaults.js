import axios from 'axios';

axios.defaults.baseURL='https://p5-backend.herokuapp.com/'
axios.defaults.headers.post['Contet-Type']='multipart/form-data'
axios.defaults.withCredentials = true;

