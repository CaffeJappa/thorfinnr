const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Não tens permissão, pequeno gafanhoto.");
if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Eu preciso de permissão para mutar membros! (Gerenciar Canais)");

let pessoa = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0])
if(!pessoa) return message.channel.send("Não consegui encontrar este membro ou não mencionaste ninguém.");

let cargo = message.guild.roles.cache.find(role => role.name === "Muted");

if(!cargo) {
  message.guild.roles.create({ data: { name: 'Muted', permissions: ['READ_MESSAGE_HISTORY', 'SEND_MESSAGES'] } }).then(createdRole => {
    message.channel.send(`Não encontrei o cargo de mutado. O cargo de ${createdRole} foi criado.`);
  });
}
let razão = args.slice(1).join(' ');
if(!razão) {
  let razão = "Sem motivo";
}
let log = "703339563049025616";

pessoa.roles.remove(cargo.id);

const embed = new Discord.MessageEmbed()
.setTitle("Desmute - Usuário Desmutado")
.addField(`Usuário:`, `${pessoa}`, true)
.addField(`Moderador:`, `${message.author}`, true)
.addField(`Motivo:`, `${razão}`)
.setColor("#00ff00");

message.channel.send(`${pessoa} foi desmutado por ${message.author}`);
bot.channels.cache.get(log).send(embed);

}

module.exports.help = {
  name: "desmute",
  aliases: ["dm"],
  description: "Desmutará alguém.",
  category: "moderação",
  use: "[Usuário] [Motivo]"
}
