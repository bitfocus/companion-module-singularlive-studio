const fetch = require('node-fetch')

const url = 'https://app.singular.live/apiv1/control/'

class SingularLive {
	constructor(apiurl) {
		if (apiurl && apiurl.includes('/')) {
			let urlparts = apiurl.split('/')
			this.token = urlparts[urlparts.length - 1]
		} else {
			this.token = apiurl
		}
	}

	Connect() {
		return new Promise((resolve, reject) => {
			fetch(url + this.token, this.GETOption())
				.then((res) => {
					if (res.status == 200) {
						resolve(res.json())
					} else {
						reject(res.statusText)
					}
				})
				.catch((err) => {
					reject(err)
				})
		})
	}

	getElements() {
		return new Promise((resolve, reject) => {
			fetch(url + this.token + '/model', this.GETOption())
				.then((res) => res.json())
				.then((result) => {
					let data = result.data[0].subcompositions
					const elements = []
					for (let i = 0; i < data.length; i++) {
						let element = {
							id: data[i].id,
							name: data[i].name,
							nodes: [],
						}

						if (data[i].controlnode && data[i].controlnode.model && data[i].controlnode.model.fields) {
							element.nodes = Object.entries(data[i].controlnode.model.fields).map((entry) => {
								return {
									[entry[1].title]: {
										id: entry[1].id,
										type: entry[1].type,
									},
								}
							})
						}

						elements.push(element)
					}
					resolve(elements)
				})
				.catch((err) => reject(err))
		})
	}

	animateIn(composition) {
		if (composition === 'Select composition') return

		const body = [
			{
				compositionName: composition,
				animation: {
					action: 'play',
					to: 'In',
				},
			},
		]
		fetch(url + this.token, this.PUTOption(body))
	}

	animateOut(composition) {
		if (composition === 'Select composition') return

		const body = [
			{
				compositionName: composition,
				animation: {
					action: 'play',
					to: 'Out',
				},
			},
		]

		fetch(url + this.token, this.PUTOption(body))
	}

	updateControlNode(controlnode, value) {
		if (controlnode === 'Select control node') return

		const body = [
			{
				compositionName: controlnode.split('&!&!&')[0],
				controlNode: {
					payload: {
						[controlnode.split('&!&!&')[1]]: value,
					},
				},
			},
		]

		fetch(url + this.token, this.PUTOption(body))
	}

	updateButtonNode(controlnode) {
		if (controlnode === 'Select button node') return

		const body = [
			{
				compositionName: controlnode.split('&!&!&')[0],
				controlNode: {
					payload: {
						[controlnode.split('&!&!&')[1]]: 'execute',
					},
				},
			},
		]

		fetch(url + this.token, this.PUTOption(body))
	}

	updateCheckboxNode(controlnode, value) {
		if (controlnode === 'Select checkbox node') return

		const body = [
			{
				compositionName: controlnode.split('&!&!&')[0],
				controlNode: {
					payload: {
						[controlnode.split('&!&!&')[1]]: value,
					},
				},
			},
		]

		fetch(url + this.token, this.PUTOption(body))
	}

	updateTimer(controlnode, value) {
		if (controlnode === 'Select timer control' || value === 'Select action') return

		const body = [
			{
				compositionName: controlnode.split('&!&!&')[0],
				controlNode: {
					payload: {
						[controlnode.split('&!&!&')[1]]: {
							command: value,
						},
					},
				},
			},
		]

		fetch(url + this.token, this.PUTOption(body))
	}

	BaseOption() {
		return {
			contentType: 'application/json',
			mode: 'cors',
			headers: {
				'content-type': 'application/json',
			},
		}
	}

	GETOption() {
		return Object.assign({}, this.BaseOption(), { method: 'GET' })
	}

	PUTOption(body) {
		return Object.assign({}, this.BaseOption(), { method: 'PUT', body: JSON.stringify(body).replace(/\\\\n/g, '\\n') })
	}
}

exports = module.exports = SingularLive
