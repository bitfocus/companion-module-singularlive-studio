module.exports = {
	getActions(compositions, controlnodes, buttons, checkboxes) {
		return {
			'animateIn': {
				label: 'Animate In',
				options: [
					{
						type: 'dropdown',
						label: 'Composition',
						id: 'comp',
						choices: compositions,
						default: 'Select composition'
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
						default: 'Select composition'
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
						default: 'Select control node'
					},
					{
						type: 'textinput',
						label: 'Value',
						id: 'value'
					}

				]
			},
			'updateButtonNode': {
				label: 'Active button',
				options: [
					{
						type: 'dropdown',
						label: 'Button',
						id: 'controlnode',
						choices: buttons,
						default: 'Select button node'
					}

				]
			},
			'updateCheckboxNode': {
				label: 'Update Checkbox Node',
				options: [
					{
						type: 'dropdown',
						label: 'Control Node',
						id: 'controlnode',
						choices: checkboxes,
						default: 'Select checkbox node'
					},
					{
						type: 'checkbox',
						label: 'Value',
						id: 'value'
					}

				]
			}
		}
	},
}
