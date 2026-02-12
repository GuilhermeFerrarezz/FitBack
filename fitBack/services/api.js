import axios from 'axios';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
let baseUrl = null
// http://192.168.100.216:5000
// 10.2.2.0
if (Platform.OS == 'android') {
    baseUrl = 'https://fitback-api.onrender.com'

} else {
    baseUrl = 'https://fitback-api.onrender.com'

}


const api = axios.create({
    baseURL: baseUrl,
    timeout: 5000,

})

api.interceptors.request.use(
    async (config) => {
        const userJson = await AsyncStorage.getItem('user')
        if (userJson) {
            const userData = JSON.parse(userJson);
            const token = userData.token;
            console.log('Token interceptado: ', token)
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }

        }
        return config

    },
    (error) => Promise.reject(error)
)

api.interceptors.response.use(

    (response) => response,

    async (error) => {
        const originalRequest = error.config;
        const isAuthRequest = originalRequest.url.includes('/auth/');

        if (error?.response?.status === 401 && !originalRequest._retry && !isAuthRequest) {
            originalRequest._retry = true
            try {
                const userJson = await AsyncStorage.getItem('user')
                const data_user = JSON.parse(userJson);
                const refreshToken = data_user?.refreshToken
                console.log('REFRESH_ TOKEN: ', refreshToken)
                //if (!refreshToken) throw new Error("Sem refresh token");
                const data = await api.post('/fitback/auth/refresh-token', {
                    requestToken: refreshToken
                })
                console.log('DATA: ', data)



                const newAccessToken = data.data.accessToken
                const newRefreshToken = data.data.refreshToken
                //const user = data_user.user
                const newUser = {
                    refreshToken: newRefreshToken,
                    token: newAccessToken,
                    user: data_user.user
                }
                await AsyncStorage.setItem('user', JSON.stringify(newUser))
                api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return api(originalRequest)


            } catch (error) {
                await AsyncStorage.removeItem('user');
            }
        }
        return Promise.reject(error);
    }
)
export default api;