const Discord = require("discord.js");
const ms = require("ms");
const mongoose = require("mongoose");
const botconfig = require("../../botconfig.json");

// CONECTAR A DATABASE
mongoose.connect(botconfig.mongoPass, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

//MODELOS
const DataW = require("../../modelos/dataW.js");

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Não tens permissão, pequeno gafanhoto.");
  if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Eu preciso de permissão para mutar membros! (Gerenciar Canais)");

  if(message.mentions.users.first() === message.author) return message.channel.send("Tu não pode se mutar.")
  let pessoa = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0])
  if(!pessoa) return message.channel.send("Não consegui encontrar este membro ou não mencionaste ninguém.");

  let cargo = message.guild.roles.cache.find(role => role.name === "Muted");

  if(!cargo) {
    message.guild.roles.create({ data: { name: 'Muted', permissions: ['READ_MESSAGE_HISTORY', 'SEND_MESSAGES'] } }).then(createdRole => {
      message.channel.send(`Não encontrei o cargo de mutado. O cargo de ${createdRole} foi criado.`);
    });
  }

  let tempo = args[1];
  let razão = args.slice(2).join(' ');
  let log = "703339563049025616";
  if(!tempo) return message.channel.send("Especifique um tempo! \`\`r!temp-mute <usuário> <tempo> <motivo>\`\`");
  if(!razão) {
    let razão = "Sem motivo";
  }

  pessoa.roles.add(cargo.id);

  const embed = new Discord.MessageEmbed()
  .setTitle("Mute - Usuário Mutado")
  .addField(`Usuário:`, `${pessoa}`, true)
  .addField(`Moderador:`, `${message.author}`, true)
  .addField(`Tempo:`, `${ms(ms(tempo))}`)
  .addField(`Motivo:`, `${razão}`)
  .setColor("#00ff00");

  message.channel.send(`${pessoa} foi mutado por ${ms(ms(tempo))}`);
  bot.channels.cache.get(log).send(embed);

  setTimeout(function(){
    if(!pessoa.roles.cache.find(r => r.name === "Muted")) return;
    pessoa.roles.remove(cargo.id);
    const embed = new Discord.MessageEmbed()
    .setTitle("Desmute - Usuário Desmutado")
    .addField(`Usuário:`, `${pessoa}`, true)
    .addField(`Moderador:`, `${bot.user}`, true)
    .addField(`Tempo:`, `${ms(ms(tempo))}`)
    .addField(`Motivo:`, `Desmute automático`)
    .setColor("#00ff00");

    bot.channels.cache.get(log).send(embed);
  }, ms(tempo));
}

module.exports.help = {
  name: "temp-mute",
  aliases: ["tm"],
  description: "Mutará alguém pelo tempo determinado.",
  category: "moderação",
  use: "[Usuário] [Tempo] [Motivo]"
}
