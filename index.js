const instance_skel = require('../../instance_skel')

const api = require('./lib/api')

const actions = require('./lib/actions')
const actionUI = require('./lib/actionsUI')

class instance extends instance_skel {
	constructor(system, id, config) {
		super(system, id, config)
		Object.assign(this, {
			...actionUI,
			...actions
		})


		return this
	}

	init() {
		this.initSingularLive(this.config)
	}

	updateConfig(config) {
		this.config = config
		this.initSingularLive(this.config)
	}

	async initSingularLive(config) {
		try {
			this.SingularLive = new api(config.apiurl)

			await this.SingularLive.Connect()
				.catch(err => {
					if (err.toLowerCase() == 'not found') {
						const str = 'Invalid url/token'
						this.log('warn', str)
						throw new Error(str)
					} else {
						this.log('warn', err)
						throw new Error(err)
					}
				})

			const compositions = []
			const controlnodes = []
			await this.SingularLive.getElements()
				.then(res => {
					for (let i = 0; i < res.length; i++) {
						if (res[i].name) {
							compositions.push({
								id: res[i].name,
								label: res[i].name
							})

							if (res[i].nodes) {
								const keys = Object.keys(res[i].nodes.payload)
								for (let j = 0; j < keys.length; j++) {
									controlnodes.push({
										id: res[i].name + '&!&!&' + keys[j],
										label: res[i].name + ' / ' + keys[j]
									})
								}
							}
						}
					}
				})
				.catch(err => {
					this.log('warn', err)
					throw new Error(err)
				})

			this.system.emit('instance_actions', this.id, this.getActions(compositions, controlnodes))

			this.status(this.STATUS_OK, 'OK')
		} catch (e) {
			this.debug(e.message)
			this.status(this.STATUS_WARNING, e.message)
		}
	}

	destroy() {
		this.debug('destroy', this.id)
	}

	config_fields() {
		return [
			{
				type: 'text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: 'This module requires an API key to be filled in. This is generated in the Manage Access settings window from the Control application. \ni.e. https://app.singular.live/apiv1/control/172pQ2N1HLagEeayAci0Z4'
			},
			{
				type: 'textinput',
				id: 'apiurl',
				label: 'API URL',
				width: 12,
				default: '',
			}
		]
	}

	handleConnectionError() {
		this.log('error', 'Singular.Live connection lost')
		this.status(this.STATUS_ERROR, 'Connection error')
	}

	handleError(error) {
		if (error.code === 'ECONNREFUSED') {
			return this.handleConnectionError()
		} else {
			this.log('error', error.message)
			this.debug(error)
		}
	}

	action({ action, options }) {
		this[action](options)
			.then(() => { this.status(this.STATUS_OK, 'Ready') })
			.catch((e) => { this.handleError(e) })
	}
}

exports = module.exports = instance