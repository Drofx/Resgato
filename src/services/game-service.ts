import { BaseService } from "./base-service";

export class GameService extends BaseService {
    constructor() {
        super()
    }

    public getGames() {
        const result = this.axios.get(`${this.api}/get-games`,this.axiosConfig)
            .then(response => {
                return response.data
            })
            .catch((error) => {
                throw error
            })
        return result
    }

    public answerRound(id,data) {
        const body = {
            ...data,
            gameId:id,
            dateCastration:`2000-${data.dateCastration.monthCastrate}-${data.dateCastration.dayCastrate}T00:00:00.000Z`,
        }
        data.dateCastration = null
        console.log(body)
        const result = this.axios.post(`${this.api}/answer-round`,body,this.axiosConfig)
        .then(response => {
            return response.data
        })
        .catch((error) => {
            throw error
        })
        return result
    }

    public getPlayers(id) {
        const result = this.axios.get(`${this.api}/get-players?id=${id}`,this.axiosConfig)
        .then(response => {
            return response.data
        })
        .catch((error) => {
            throw error
        })
        return result
    }

    public getGameInformation(id){
        const result = this.axios.get(`${this.api}/get-game-information?id=${id}`,this.axiosConfig)
        .then(response => {
            return response.data
        })
        .catch((error) => {
            throw error
        })
        return result
    }

    public getAnswers(id){
        const result = this.axios.get(`${this.api}/get-answers?id=${id}`,this.axiosConfig)
        .then(response => {
            return response.data
        })
        .catch((error) => {
            throw error
        })
        return result
    }
}