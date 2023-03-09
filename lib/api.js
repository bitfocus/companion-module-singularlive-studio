import fetch from 'node-fetch'

const url = 'https://app.singular.live/apiv2/controlapps/'

export default class SingularLive {
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
					let data = result[0].subcompositions
					const elements = []
					for (let i = 0; i < data.length; i++) {
						let element = {
							id: data[i].id,
							name: data[i].name,
							nodes: [],
						}

						if (data[i].model) {
							element.nodes = Object.entries(data[i].model).map((entry) => {
								return {
									[entry[1].title]: {
										id: entry[1].id,
										type: entry[1].type,
										selections: entry[1].selections,
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
		if (!composition) return

		const body = [
			{
				subCompositionName: composition,
				state: 'In',
			},
		]
		fetch(url + this.token + '/control', this.PATCHOption(body))
	}

	animateOut(composition) {
		if (!composition) return

		const body = [
			{
				subCompositionName: composition,
				state: 'Out',
			},
		]

		fetch(url + this.token + '/control', this.PATCHOption(body))
	}

	updateControlNode(controlnode, value) {
		if (!controlnode) return

		const body = [
			{
				subCompositionName: controlnode.split('&!&!&')[0],
				payload: {
					[controlnode.split('&!&!&')[1]]: value,
				},
			},
		]

		fetch(url + this.token + '/control', this.PATCHOption(body))
	}

	updateButtonNode(controlnode) {
		if (!controlnode) return

		const body = [
			{
				subCompositionName: controlnode.split('&!&!&')[0],
				payload: {
					[controlnode.split('&!&!&')[1]]: 'execute',
				},
			},
		]

		fetch(url + this.token + '/control', this.PATCHOption(body))
	}

	updateCheckboxNode(controlnode, value) {
		if (!controlnode) return

		const body = [
			{
				subCompositionName: controlnode.split('&!&!&')[0],
				payload: {
					[controlnode.split('&!&!&')[1]]: value,
				},
			},
		]

		fetch(url + this.token + '/control', this.PATCHOption(body))
	}

	updateTimer(controlnode, value) {
		if (!controlnode || !value) return

		const body = [
			{
				subCompositionName: controlnode.split('&!&!&')[0],
				payload: {
					[controlnode.split('&!&!&')[1]]: {
						command: value,
					},
				},
			},
		]

		fetch(url + this.token + '/control', this.PATCHOption(body))
	}

	takeOutAllOutput() {
		const body = {
			action: 'TakeOutAllOutput',
		}

		fetch(url + this.token + '/command', this.POSTOption(body))
	}

	refreshComposition() {
		const body = {
			action: 'RefreshComposition',
		}

		fetch(url + this.token + '/command', this.POSTOption(body))
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

	PATCHOption(body) {
		return Object.assign({}, this.BaseOption(), {
			method: 'PATCH',
			body: JSON.stringify(body).replace(/\\\\n/g, '\\n'),
		})
	}

	POSTOption(body) {
		return Object.assign({}, this.BaseOption(), { method: 'POST', body: JSON.stringify(body).replace(/\\\\n/g, '\\n') })
	}
}
