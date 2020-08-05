module.exports = {
	getActions(compositions, controlnodes) {
		return {
			'animateIn': {
				label: 'Animate In',
				options: [
					{
						type: 'dropdown',
						label: 'Composition',
						id: 'comp',
						choices: compositions,
						default: compositions[0]
					}
				]
			},
			'animateOut': {
				label: 'Animate Out',
				options: [
					{
						type: 'dropdown',
						label: 'Composition',
						id: 'comp',
						choices: compositions,
						default: compositions[0]
					}
				]
			},
			'updateControlNode': {
				label: 'Update Control Node',
				options: [
					{
						type: 'dropdown',
						label: 'Control Node',
						id: 'controlnode',
						choices: controlnodes,
						default: controlnodes[0]
					},
					{
						type: 'textinput',
						label: 'Value',
						id: 'value'
					}

				]
			}
		}
	},
}
