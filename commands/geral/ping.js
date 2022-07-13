module.exports.run = async (bot, message, args) => {

  const m = await message.channel.send("Ping?")
  m.edit(`:ping_pong: - Pong! ${m.createdTimestamp - message.createdTimestamp}ms`);

}

module.exports.help = {
  name: "ping",
  aliases: ["p"],
  description: "Exibirá o ping do bot.",
  category: "geral"
}
