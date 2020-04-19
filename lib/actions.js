module.exports = {
	async animateIn ({ comp }) {
		await this.SingularLive.animateIn(comp);
	},
	async animateOut ({ comp }) {
		await this.SingularLive.animateOut(comp);
	},
	async updateControlNode ({ controlnode, value }) {
		await this.SingularLive.updateControlNode(controlnode, value);
	}
}