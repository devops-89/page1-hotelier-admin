import axios from 'axios';
import { APIURL } from "./serverConstant";

export const securedApi = axios.create({
  baseURL: APIURL.authenticationUrl,
});

export const userSecuredApi = axios.create({
  baseURL: APIURL.userUrl,
});

export const securedHotlierApi=axios.create({
  baseURL: APIURL.hotlierUrl
})

userSecuredApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  config.headers.accessToken = token;
  return config;
});

securedApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  config.headers.accessToken = token;
  return config;
});

securedHotlierApi.interceptors.request.use((config)=>{
  const token=localStorage.getItem("access_token");
  config.headers.accesstoken= token;
  return config;
})

export const flightPublicApi = axios.create({
  baseURL: APIURL.flightUrl,
});

export const publicApi = axios.create({
  baseURL: APIURL.authenticationUrl,
});

