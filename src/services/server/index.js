import Axios from 'axios'

export default {
    install: (Vue, { baseUrl, token }) => {
        Vue.prototype.$server = new Server(baseUrl, token)
    }
}

class Server {
    constructor(baseUrl, localStorageTokenKey) {
        this.tokenStorageKey = localStorageTokenKey
        this.baseUrl = baseUrl
        this.token = localStorage.getItem(localStorageTokenKey)
        let userString = localStorage.getItem(localStorageTokenKey + "user") 
        this.user = userString ? JSON.parse(userString) : {}
        this.loginURL = '/login'
        this.testAuthURL = '/check-auth'
        this.testLogoutURL = '/logout'
    }

    getUser() {
        return this.user
    }

    setUser(user) {
        this.user = user
        localStorage.setItem(this.tokenStorageKey + "user", JSON.stringify(this.user))
    }

    setToken(token) {
        this.token = token
        localStorage.setItem(this.tokenStorageKey, token)
    }

    login(user, password) {
        let self = this
        return self.request(self.loginURL, { user, password }, 'POST' )
    }

    testAuth() {
        let self = this
        return self.request(self.testAuthURL, {})
    }

    logout() {
        this.token = null
    }

    async request(url, data, method) {
        if (!url || typeof url != 'string') return { status: 400, msg: `Invalid url: ${url}` }
        let self = this
        method = method || 'GET'
        data = data || {}
       
        let Uri = self.baseUrl + ( url[0]!='/'? '/' : '') + url
        
        let packet = {
            method,
            url: Uri,
            headers: self.headers()
        }

        switch (method) {
            case "PUT":
            case 'POST':
                packet.data = JSON.stringify(data)
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
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token, 
        }
    }
}
