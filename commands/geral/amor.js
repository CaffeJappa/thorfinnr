const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let pessoa = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

  if(!pessoa || message.author.id === pessoa.id) {
    pessoa = message.guild.members.cache
      .filter(m => m.id !== message.author.id)
      .random();
  }

  const amor = Math.random() * 100;
  const indexAmor = Math.floor(amor / 10);
  const nivelAmor = "💖".repeat(indexAmor) + " **/** " + "💔".repeat(10 - indexAmor);

  const embed = new Discord.MessageEmbed()
  .setColor("FFB2D8")
  .setTitle(`:cloud: **${pessoa.tag}** ama **${message.member.displayName}** este tanto`)
  .setDescription(`💟 **${indexAmor}/10**\n\n${nivelAmor}`);
  message.channel.send(embed);
}

module.exports.help = {
  name: "amor",
  aliases: ["ship", "amr"],
  description: "Verificará o teu nível de amor com alguém!",
  use: "[Usuário]",
  category: "geral"
}
