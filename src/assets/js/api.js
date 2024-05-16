export default class API {

    _getResponse(res) {
        return res.ok ? res.json() : Promise.reject()
    }

    constructor(path) {
        this.host = `http://194.87.232.107:8888` + path
    }

    async get() {
        const res = await fetch(`${this.host}`);
        return this._getResponse(res);
    }
}
