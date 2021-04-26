import axios from 'axios'

import {config} from '../config/config'
window.axios = axios

export const userRequest = axios.create({
    baseURL: config.userServiceAddress
})

export const streamsAndCategoriesRequest = axios.create({
    baseURL: config.streamsServiceAddress
})