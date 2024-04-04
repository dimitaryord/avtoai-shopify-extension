class API {
    constructor() {
        this.staticUrl = "/apps/server"

        this.config = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true"
            },
        }
    }

    async get(url) {
        try{
            this.config.method = "GET"
            this.config.body = null

            const res = await fetch(`${this.staticUrl}${url}`, this.config)

            if(res.ok){
                const data = await res.json()
                return data
            }

            const error = await res.json()
            console.error({ error: error })
        }
        catch(error) {
            console.log(error)
            console.error(error.message)
        }
    }

    async post(url, body={}) {
        try{
            this.config.method = "POST"
            this.config.body = JSON.stringify(body)

            const res = await fetch(`${this.staticUrl}${url}`, this.config)

            if(res.ok){
                const data = await res.json()
                return data
            }

            const error = await res.json()
            console.error({ error: error })
        }
        catch(error) {
            console.log(error)
            console.error(error.message)
        }
    }

}

const api = new API()

export default api