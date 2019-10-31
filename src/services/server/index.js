import Axios from 'axios'

export default class  Server {
    constructor(baseUrl, localStorageTokenKey) {
        this.tokenStorageKey = localStorageTokenKey
        this.baseUrl = baseUrl

        let userString = localStorage.getItem(localStorageTokenKey + "user") 
        this.user = userString ? JSON.parse(userString) : {}
        this.token = localStorage.getItem(localStorageTokenKey)
        this.locale = localStorage.getItem(localStorageTokenKey + "locale")
    }

    getUser() {
        return this.user
    }

    getLocale() {
        return this.locale
    }

    setUser(user) {
        this.user = user
        localStorage.setItem(this.tokenStorageKey + "user", JSON.stringify(this.user))
    }

    setToken(token) {
        this.token = token
        localStorage.setItem(this.tokenStorageKey, token)
    }

    setLocale(locale) {
        this.locale = locale
        localStorage.setItem(this.tokenStorageKey + "locale", locale)
    }

    logout() {
        this.token = null
        localStorage.clear()
    }

    async request( url, data, method, custom_headers ) {
        if (!url || typeof url != 'string') return { status: 400, msg: `Invalid url: ${url}` }
        let self = this
        method = method || 'GET'
        data = data || {}

        let Uri = self.baseUrl + ( url[0]!='/'? '/' : '') + url
        
        let hds = self.headers()
        custom_headers && Object.assign(hds, custom_headers)

        let packet = {
            method,
            url: Uri,
            headers: hds
        }

        switch (method) {
            case "PUT":
            case "PATCH":
            case 'POST':
                packet.data =  data
                // packet.data =  JSON.stringify(data)
                break
            case 'GET':
                packet.params = data
        }
        try {
            let response = await Axios(packet) 
            return response.data
        } catch(error) {
            return (error.response) ?  
                { status: (error.response.status) ? error.response.status : 0, message: error.response.data } 
                : { status: 0, message: "Undifined error" }
        }
    }

    headers() {
        return {
            'Cache-Control': 'no-cache',
            'X-Language': this.locale || '', 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token, 
        }
    }
}
