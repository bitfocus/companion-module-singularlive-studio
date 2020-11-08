module.exports = {
	getActions(compositions, controlnodes, buttons, checkboxes, timers) {
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
				label: 'Activate button',
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
			},
			'updateTimerNode': {
				label: 'Update Timer Control',
				options: [
					{
						type: 'dropdown',
						label: 'Control Node',
						id: 'controlnode',
						choices: timers,
						default: 'Select timer control'
					},
					{
						type: 'dropdown',
						label: 'Action',
						id: 'value',
						choices: [
							{
								id: "play",
								label: "Play"
							},
							{
								id: "pause",
								label: "Pause"
							},
							{
								id: "reset",
								label: "Reset"
							}
						],
						default: 'Select action'
					}

				]
			}
		}
	},
}
