import axios from 'axios'
import {config} from '../config/config'

export const userRequest = axios.create({
    baseURL: config.userServiceAddress
})

export const streamsAndCategoriesRequest = axios.create({
    baseURL: config.streamsServiceAddress
})

export const signalingRequest = axios.create({
    baseURL: config.signalingHTTPAddress
})