import axios from 'axios';
import { Platform } from 'react-native';
let baseUrl = null
if (Platform.OS == 'android') {
    baseUrl = 'http://10.0.2.2:5000'
    
} else {
    baseUrl = 'http://localhost:5000'

}
    

const api = axios.create({
    baseURL: baseUrl,
    timeout: 30000,

})

export default api;