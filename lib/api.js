const fetch = require('node-fetch')

const url = 'https://app.singular.live/apiv1/control/'

class SingularLive {
    constructor(apiurl) {
        if (apiurl.includes("/")) {
            let urlparts = apiurl.split('/')
            this.token = urlparts[urlparts.length - 1]
        } else {
            this.token = apiurl
        }
    }

    Connect() {
        return new Promise((resolve, reject) => {
            fetch(url + this.token, this.GETOption())
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

    getElements() {
        return new Promise((resolve, reject) => {
            fetch(url + this.token, this.GETOption())
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
        if (composition === 'Select composition')
            return
        
        const body = [{
            compositionName: composition,
            animation: {
                action: 'play',
                to: 'In'
            }
        }]
        fetch(url + this.token, this.PUTOption(body));
    }

    animateOut(composition) {
        if (composition === 'Select composition')
            return

        const body = [{
            compositionName: composition,
            animation: {
                action: 'play',
                to: 'Out'
            }
        }]

        fetch(url + this.token, this.PUTOption(body));
    }
    
    updateControlNode(controlnode, value) {
        if (controlnode === 'Select control node')
            return

        console.log(controlnode, "11111111111")
        const body = [{
            compositionName: controlnode.split('&!&!&')[0],
            controlNode: {
                payload: {
                    [controlnode.split('&!&!&')[1]]: value
                }
            }
        }]

        fetch(url + this.token, this.PUTOption(body));
    }

    updateButtonNode(controlnode) {
        if (controlnode === 'Select button node')
            return

        console.log(controlnode, "11111111111")
        const body = [{
            compositionName: controlnode.split('&!&!&')[0],
            controlNode: {
                payload: {
                    [controlnode.split('&!&!&')[1]]: true
                }
            }
        }]

        fetch(url + this.token, this.PUTOption(body));
    }

    updateCheckboxNode(controlnode, value) {
        if (controlnode === 'Select checkbox node')
            return

        console.log(controlnode, "11111111111")
        const body = [{
            compositionName: controlnode.split('&!&!&')[0],
            controlNode: {
                payload: {
                    [controlnode.split('&!&!&')[1]]: value
                }
            }
        }]

        fetch(url + this.token, this.PUTOption(body));
    }

    BaseOption() {
        return {
            contentType: 'application/json',
            mode: 'cors',
            headers: {
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