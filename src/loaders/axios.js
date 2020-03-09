import Axios from 'axios';

export default function setInterceptors() {
  Axios.interceptors.request.use(config => {
    console.log(config);
    return config;
  });
  // Axios.interceptors.response.use(response => {
  //   response.headers['set-cookie'].forEach(cookie => {
  //     cfg;
  //   });
  //   return response;
  // });
}
