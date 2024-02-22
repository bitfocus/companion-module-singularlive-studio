export function getActions(compositions, controlnodes, buttons, checkboxes, timers, selections, colors) {
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
			name: 'Update Checkbox Field',
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
			name: 'Update Time Control Field',
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
		updateSelectionNode: {
			name: 'Update Selection Field',
			options: [
				{
					type: 'dropdown',
					label: 'Control Node',
					id: 'controlnode',
					choices: selections,
					default: selections?.[0]?.id,
					allowCustom: false,
				},
				...selections.map((selection) => ({
					type: 'dropdown',
					label: 'Selection',
					id: selection.id,
					choices: selection.selections,
					default: selection.selections?.[0]?.id,
					isVisible: new Function('options', `return options.controlnode == '${selection.id}'`),
				})),
			],
			callback: async (action) => {
				await this.SingularLive.updateControlNode(
					action.options.controlnode,
					action.options[action.options.controlnode]
				)
			},
		},
		updateColorNode: {
			name: 'Update Color Field',
			options: [
				{
					type: 'dropdown',
					label: 'Control Node',
					id: 'controlnode',
					choices: colors,
					default: colors?.[0]?.id,
				},
				{
					type: 'colorpicker',
					label: 'Value',
					id: 'value',
					enableAlpha: true,
					returnType: 'string',
					default: 'rgba(255, 255, 255, 1)',
				},
			],
			callback: async (action) => {
				let color = action.options.value
				let values = color.match(/\(([^()]*)\)/g)
				let colorArray = []
				if (values[0]) {
					values[0] = values[0].replace('(', '')
					values[0] = values[0].replace(')', '')
					colorArray = values[0].split(',')
				}
				if (colorArray.length == 4) {
					let colorData = {
						r: colorArray[0],
						g: colorArray[1],
						b: colorArray[2],
						a: colorArray[3],
					}
					await this.SingularLive.updateColorNode(action.options.controlnode, colorData)
				}
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
