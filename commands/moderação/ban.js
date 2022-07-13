const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Não tens permissão, pequeno gafanhoto.");
  if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("Eu preciso de permissão para banir membros!");

  let banido = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0])
  if(message.mentions.users.first() === message.author) return message.channel.send("Tu não pode se banir.")
  let punidor = message.author;
  let razão = args.slice(1).join(' ');
  if(!razão) {
    let razão = "Sem motivo";
  }
  let log = "703339563049025616";
  if(!banido) return message.channel.send("Mencione alguém para banir!");
  banido.ban(`${razão}`);
  const embed = new MessageEmbed()
  .setTitle(`Ban - Usuário Banido`)
  .addField(`Usuário:`, `${banido}`)
  .addField(`Moderador:`, `${punidor}`)
  .addField(`Motivo:`, `${razão}`)
  .setColor("#00ff00");

  message.channel.send(`O usuário ${banido} foi banido por ${razão}`);
  bot.channels.cache.get(log).send(embed);


}

module.exports.help = {
  name: "ban",
  aliases: ["b", "banir", "exilar"],
  description: "Banirá alguém.",
  category: "moderação",
  use: "[Usuário] [Motivo]"
}
