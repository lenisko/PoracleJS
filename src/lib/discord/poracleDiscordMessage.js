class PoracleDiscordMessage {
	constructor(client, msg) {
		this.client = client
		this.msg = msg

		//		this.user = ctx.update.message.from || ctx.update.message.chat
		//		this.userId = this.user.id

		this.discord = msg
		this.userId = msg.author.id
	}

	getPings() {
		return [this.msg.mentions.users.array().map((u) => `<@!${u.id}>`), this.msg.mentions.roles.array().map((r) => `<@&${r.id}>`)].join('')
	}

	get isFromAdmin() {
		return (this.client.config.discord.admins.includes(this.msg.author.id))
	}

	get isDM() {
		return !(this.msg.channel.type === 'text')
	}

	async reply(message) {
		if (message.length > 1999) {
			return this.msg.reply(message, { split: true })
		}
		return this.msg.reply(message)
	}

	async replyWithAttachment(message, attachment) {
		return this.msg.reply(message, { files: [attachment] })
	}

	async react(message) {
		return this.msg.react(message)
	}

	async replyByDM(message) {
		return this.msg.author.send(message)
	}
}

module.exports = PoracleDiscordMessage