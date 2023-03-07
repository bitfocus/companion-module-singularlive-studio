export function getActions(compositions, controlnodes, buttons, checkboxes, timers) {
	return {
		animateIn: {
			name: 'Animate In',
			options: [
				{
					type: 'dropdown',
					label: 'Composition',
					id: 'comp',
					choices: compositions,
					default: compositions?.[0]?.id,
				},
			],
			callback: async (action) => {
				await this.SingularLive.animateIn(action.options.comp)
			},
		},
		animateOut: {
			name: 'Animate Out',
			options: [
				{
					type: 'dropdown',
					label: 'Composition',
					id: 'comp',
					choices: compositions,
					default: compositions?.[0]?.id,
				},
			],
			callback: async (action) => {
				await this.SingularLive.animateOut(action.options.comp)
			},
		},
		updateControlNode: {
			name: 'Update Control Node',
			options: [
				{
					type: 'dropdown',
					label: 'Control Node',
					id: 'controlnode',
					choices: controlnodes,
					default: controlnodes?.[0]?.id,
				},
				{
					type: 'textinput',
					useVariables: true,
					label: 'Value',
					id: 'value',
				},
			],
			callback: async (action) => {
				let parsedValue = await this.parseVariablesInString(action.options.value)
				await this.SingularLive.updateControlNode(action.options.controlnode, parsedValue)
			},
		},
		updateButtonNode: {
			name: 'Activate button',
			options: [
				{
					type: 'dropdown',
					label: 'Button',
					id: 'controlnode',
					choices: buttons,
					default: buttons?.[0]?.id,
				},
			],
			callback: async (action) => {
				await this.SingularLive.updateButtonNode(action.options.controlnode)
			},
		},
		updateCheckboxNode: {
			name: 'Update Checkbox Node',
			options: [
				{
					type: 'dropdown',
					label: 'Control Node',
					id: 'controlnode',
					choices: checkboxes,
					default: checkboxes?.[0]?.id,
				},
				{
					type: 'checkbox',
					label: 'Value',
					id: 'value',
				},
			],
			callback: async (action) => {
				await this.SingularLive.updateCheckboxNode(action.options.controlnode, action.options.value)
			},
		},
		updateTimerNode: {
			name: 'Update Timer Control',
			options: [
				{
					type: 'dropdown',
					label: 'Control Node',
					id: 'controlnode',
					choices: timers,
					default: timers?.[0]?.id,
				},
				{
					type: 'dropdown',
					label: 'Action',
					id: 'value',
					choices: [
						{
							id: 'play',
							label: 'Play',
						},
						{
							id: 'pause',
							label: 'Pause',
						},
						{
							id: 'reset',
							label: 'Reset',
						},
					],
					default: 'play',
				},
			],
			callback: async (action) => {
				await this.SingularLive.updateTimer(action.options.controlnode, action.options.value)
			},
		},
		takeOutAllOutput: {
			name: 'Take Out All Output',
			options: [],
			callback: async () => {
				await this.SingularLive.takeOutAllOutput()
			},
		},
		refreshComposition: {
			name: 'Refresh Composition',
			options: [],
			callback: async () => {
				await this.SingularLive.refreshComposition()
			},
		},
	}
}
