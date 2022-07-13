const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Não tens permissão, pequeno gafanhoto.");
  if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("Eu preciso de permissão para banir membros!");

  let kikado = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0])
  let userroles = kikado.guild.roles.highest
  //let botroles = message.guild.me.roles.highest
  //if(userroles.position > botroles.position) {
    //return message.channel.send("Eu não posso dar warn em alguém que está acima de mim em cargos.")
  //}
  if(message.mentions.users.first() === message.author) return message.channel.send("Tu não pode se kickar.")
  let punidor = message.author;
  let razão = args.slice(1).join(' ');
  let log = "703339563049025616";
  if(!kikado) return message.channel.send("Mencione alguém para kickar!");
  kikado.kick(`${razão}`);
  const embed = new Discord.MessageEmbed()
  .setTitle("Kick - Usuário Kickado")
  .addField(`Usuário:`, `${kikado}`)
  .addField(`Moderador:`, `${punidor}`)
  .addField(`Motivo:`, `${razão}`)
  .setColor("#00ff00");

  message.channel.send(`O usuário ${kikado} foi kickado por ${razão}`);
  bot.channels.cache.get(log).send(embed);


}

module.exports.help = {
  name: "kick",
  aliases: ["k", "ex", "expulsar"],
  description: "Expulsará alguém.",
  category: "moderação",
  use: "[Usuário] [Motivo]"
}
