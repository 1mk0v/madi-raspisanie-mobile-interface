export default class Cookie {
    constructor() {
        this.cookie = {}
        let cookieList = document.cookie.split('; ')
        for (let cookie of cookieList) {
            let nameValue = cookie.split('=');
            this.cookie[nameValue[0]] = nameValue[1];
        }
    }

    get(string) {
        return this.cookie[string]
    }

    append(name, value) {
        document.cookie = `${name}=${value}`
    }

    remove(name) {
        document.cookie = `${name}=`
    }
}