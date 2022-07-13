module.exports.run = async (bot, message, args) => {
  const invite = await message.channel.createInvite({
    reason: "Comando Executado - Invite"
  });

  let codigo = `https://discord.gg/${invite.code}`
  message.channel.send(`**:door: - Convite do Servidor**: ${codigo}`);
}

module.exports.help = {
  name: "invite",
  aliases: ["rp", "chat"],
  description: "Envia o link de convite do servidor.",
  category: "geral",
  use: ""
}
