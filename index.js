import { InstanceBase, runEntrypoint } from '@companion-module/base'

import { getActions } from './actions.js'
import api from './lib/api.js'

class SingularInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
	}

	async init(config) {
		this.config = config
		this.updateStatus('connecting')
		this.initSingularLive(this.config)
	}

	async destroy() {
		this.log('debug', 'Singular module destroyed')
	}

	getConfigFields() {
		return [
			{
				type: 'static-text',
				id: 'info',
				width: 12,
				label: 'Information',
				value:
					'This module requires an API URL or token. This is generated in the Manage Access settings window from the Control application.',
			},
			{
				type: 'textinput',
				id: 'apiurl',
				label: 'API URL / Token',
				width: 12,
				default: '',
			},
		]
	}

	async configUpdated(config) {
		this.config = config
		this.initSingularLive(this.config)
	}

	async initSingularLive(config) {
		try {
			this.SingularLive = new api(config.apiurl)

			await this.SingularLive.Connect().catch((err) => {
				if (err.toString().toLowerCase() == 'not found') {
					const str = config.apiurl
						? 'Invalid token'
						: 'This module requires an API URL or token. See help for details.'
					this.log('warn', str)
					throw new Error(str)
				} else {
					this.log('warn', err)
					throw new Error(err)
				}
			})

			const compositions = []
			const controlnodes = []
			const buttons = []
			const checkboxes = []
			const timers = []
			const selections = []
			const colors = []

			await this.SingularLive.getElements()
				.then((res) => {
					for (let i = 0; i < res.length; i++) {
						if (res[i].name) {
							compositions.push({
								id: res[i].name,
								label: res[i].name,
							})
							if (res[i].nodes) {
								let nodes = res[i].nodes.reduce((r, c) => Object.assign(r, c), {})

								const keys = Object.keys(nodes)
								for (let j = 0; j < keys.length; j++) {
									const node = nodes[keys[j]]

									const controlNode = {
										id: res[i].name + '&!&!&' + node.id,
										label: res[i].name + ' / ' + keys[j],
									}

									switch (node.type) {
										case 'text':
										case 'number':
										case 'textarea':
										case 'image':
											controlnodes.push(controlNode)
											break
										case 'button':
											buttons.push(controlNode)
											break
										case 'timecontrol':
											timers.push(controlNode)
											break
										case 'checkbox':
											checkboxes.push(controlNode)
											break
										case 'color':
											colors.push(controlNode)
											break
										case 'selection':
											selections.push({
												...controlNode,
												selections: node.selections?.map((selection) => ({
													id: selection.id,
													label: selection.title,
												})),
											})
											break
										default:
											controlnodes.push(controlNode)
									}
								}
							}
						}
					}
				})
				.catch((err) => {
					this.log('debug', err)
					this.log('warn', err.toString())
					throw new Error(err)
				})

			this.setActionDefinitions(
				getActions.bind(this)(compositions, controlnodes, buttons, checkboxes, timers, selections, colors)
			)

			this.updateStatus('ok')
		} catch (e) {
			this.log('debug', e.message)
			this.updateStatus('connection_failure')
		}
	}

	handleConnectionError() {
		this.log('error', 'Singular.Live connection lost')
		this.updateStatus('connection_failure')
	}

	handleError(error) {
		if (error.code === 'ECONNREFUSED') {
			return this.handleConnectionError()
		} else {
			this.log('error', error.message)
			this.log('debug', error)
		}
	}

	action({ action, options }) {
		this[action](options)
			.then(() => {
				this.updateStatus('ok')
			})
			.catch((e) => {
				this.handleError(e)
			})
	}
}

runEntrypoint(SingularInstance, [])
