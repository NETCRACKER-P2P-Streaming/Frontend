import axios from 'axios'
import {config} from '../config/config'

export const userRequestWithCookie = axios.create({
    baseURL: config.userServiceAddress,
    withCredentials: true
})

export const userRequest = axios.create({
    baseURL: config.userServiceAddress
})

export const streamsAndCategoriesRequest = axios.create({
    baseURL: config.streamsServiceAddress
})