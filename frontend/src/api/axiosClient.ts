// api/axiosClient.js
'use client'

import axios from 'axios';
import queryString from 'query-string';

const axiosAuthClient = axios.create({
    baseURL: process.env.API_AUTH_URL,
    headers: {
        'content-type': 'application/json',
        'Accept-Language': 'vi'
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosAuthClient.interceptors.request.use(async (config) => {
    config.withCredentials = true
    return config;
})

axiosAuthClient.interceptors.response.use(async (response) => {
    const config = response.config
    if ((config?.url?.indexOf('/login') ?? 0) >= 0 || (config?.url?.indexOf('/refresh-token') ?? 0) >= 0) {
        console.log(response.data.code);
        return response.data
    }
    return response.data
}, async (error) => {
    const url = error?.config?.url

    if (error?.response?.status === 401 && url !== '/refresh-token') {
        await axiosAuthClient.post('/refresh-token')
    } else if (error?.response?.status === 401) {
        console.log(error)
        window.alert('Phiên đăng nhập đã hết hạn')
        localStorage.clear()
        window.location.href = "/login";
    } else throw error;

    if (error.code === 'ERR_NETWORK') return alert('Không kết nối được tới internet');
    return Promise.reject(error);
});

export default axiosAuthClient;
