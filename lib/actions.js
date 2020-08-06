module.exports = {
	async animateIn ({ comp }) {
		await this.SingularLive.animateIn(comp);
	},
	async animateOut ({ comp }) {
		await this.SingularLive.animateOut(comp);
	},
	async updateControlNode ({ controlnode, value }) {
		await this.SingularLive.updateControlNode(controlnode, value);
	},
	async updateButtonNode({ controlnode }) {
		await this.SingularLive.updateButtonNode(controlnode);
	},
	async updateCheckboxNode({ controlnode, value }) {
		await this.SingularLive.updateCheckboxNode(controlnode, value);
	}
}