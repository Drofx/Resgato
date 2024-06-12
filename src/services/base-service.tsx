import axios, { Axios } from 'axios'
import Cookies from 'js-cookie'
import { api } from './api'

export class BaseService {
    constructor() {
        this.token = `Bearer ${Cookies.get('jwtApplicationToken')}`
        this.axios = axios
        this.api = api
        this.axiosConfig = {
            headers:{
                authorization: this.token
            }
        }
    }

    protected axios: Axios
    protected token: any
    protected api: any
    protected axiosConfig: any
}