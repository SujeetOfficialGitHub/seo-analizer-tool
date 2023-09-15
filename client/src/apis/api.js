import axios from 'axios'
import config from '../config'


const apiClient = axios.create({
    baseURL: config.apiUrl,
    headers: {
        "Content-Type" : "application/json"
    }
})

export const sendUrl = async(url) => {
    try {
        const res = await apiClient.post('/api/send-url', {url});
        return res.data
    } catch (error) {
        throw error
    }
}
export const getAnalizedData = async(task_id) => {
    try {
        const res = await apiClient.post('/api/get-data', {task_id});
        return res.data
    } catch (error) {
        throw error
    }
}