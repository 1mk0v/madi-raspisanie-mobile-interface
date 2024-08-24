export default class API {

    _getResponse(res) {
        return res.ok ? res.json() : Promise.reject()
    }

    constructor(path) {
        this.host = `https://api.madi-schedule.ru` + path
    }

    async get() {
        const res = await fetch(`${this.host}`);
        return this._getResponse(res);
    }
}
