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
        return (this.cookie[string]) ? decodeURI(this.cookie[string]) : this.cookie[string]
    }

    append(name, value) {
        let encodeValue = encodeURIComponent(value)
        document.cookie = `${name}=${encodeValue}; max-age=${3600*24*30*3}`
    }

    remove(name) {
        document.cookie = `${name}=`
    }
}
