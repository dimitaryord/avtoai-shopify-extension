class API {
    constructor() {
        this.staticUrl = "/apps/server"

        this.config = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Shopify-Store-Domain": ""
            },
            body: JSON.stringify({})
        }
    }

    async get(url) {
        try{
            this.config.method = "GET"

            const res = await fetch(`${this.staticUrl}${url}`, this.config)

            if(res.ok){
                const data = await res.json()
                return data
            }
            console.error({ error: await res.json() });
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

            console.error({ error: await res.json() });
        }
        catch(error) {
            console.log(error)
            console.error(error.message)
        }
    }
}

const api = new API()

export default api