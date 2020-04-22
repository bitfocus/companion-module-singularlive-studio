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
						choices: compositions
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
						choices: compositions
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
						choices: controlnodes
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
