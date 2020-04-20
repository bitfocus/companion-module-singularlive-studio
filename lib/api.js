const fetch = require('node-fetch')

const url = 'https://app.singular.live/apiv1/appinstances/'

class SingularLive {
    constructor(email, password) {
        this.credentials = Buffer.from(email + ':' + password).toString('base64')
        this.showID = -1
    }

    Connect() {
        return new Promise((resolve, reject) => {
            fetch(url, this.GETOption())
                .then(res => {
                    if (res.status == 200) {
                        resolve(res.json())
                    } else {
                        reject(res.statusText)
                    }
                })
                .catch(err => {
                    reject(err)
                })

        })
    }

    async validateShow() {
        return new Promise((resolve, reject) => {
            fetch(url, this.GETOption())
                .then(res => {
                    if (res.status == 200) {
                        return res.json()
                    } else {
                        reject(res.statusText)
                    }
                })
                .then(res => {
                    if (res.find(show => show.id == this.showID)) {
                        resolve(res)
                    } else {
                        reject('Cannot find Control App')
                    }
                })
                .catch(err => {
                    reject(err)
                })

        })
    }

    setShow(id) {
        this.showID = id
    }

    getElements() {
        return new Promise((resolve, reject) => {
            fetch(url + this.showID + '/control', this.GETOption())
                .then(res => res.json())
                .then((data) => {
                    const elements = []
                    for (let i = 0; i < data.length; i++) {
                        elements.push({
                            id: data[i].compositionId,
                            name: data[i].compositionName,
                            nodes: data[i].controlNode
                        })
                    }
                    resolve(elements)
                })
                .catch((err) => reject(err))
        })
    }

    animateIn(composition) {
        const body = [{
            compositionName: composition,
            animation: {
                action: 'play',
                to: 'In'
            }
        }]
        fetch(url + this.showID + '/control', this.PUTOption(body));
    }

    animateOut(composition) {
        const body = [{
            compositionName: composition,
            animation: {
                action: 'play',
                to: 'Out'
            }
        }]
        fetch(url + this.showID + '/control', this.PUTOption(body));
    }

    updateControlNode(controlnode, value) {
        const body = [{
            compositionName: controlnode.split('&!&!&')[0],
            controlNode: {
                payload: {
                    [controlnode.split('&!&!&')[1]]: value
                }
            }
        }]

        fetch(url + this.showID + '/control', this.PUTOption(body));
    }

    BaseOption() {
        return {
            contentType: 'application/json',
            mode: 'cors',
            headers: {
                Authorization: 'Basic ' + this.credentials,
                'content-type': 'application/json',
            }
        }
    }

    GETOption() {
        return Object.assign({}, this.BaseOption(), { method: 'GET' })
    }

    PUTOption(body) {
        return Object.assign({}, this.BaseOption(), { method: 'PUT', body: JSON.stringify(body) })
    }
}

exports = module.exports = SingularLive