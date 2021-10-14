module.exports = {
	async animateIn({ comp }) {
		await this.SingularLive.animateIn(comp)
	},
	async animateOut({ comp }) {
		await this.SingularLive.animateOut(comp)
	},
	async updateControlNode({ controlnode, value }) {
		if (value.includes('$(')) {
			system.emit('variable_parse', value, function (str) {
				value = str.trim()
			})
		}
		await this.SingularLive.updateControlNode(controlnode, value)
	},
	async updateButtonNode({ controlnode }) {
		await this.SingularLive.updateButtonNode(controlnode)
	},
	async updateCheckboxNode({ controlnode, value }) {
		await this.SingularLive.updateCheckboxNode(controlnode, value)
	},
	async updateTimerNode({ controlnode, value }) {
		await this.SingularLive.updateTimer(controlnode, value)
	},
}
