const mongoose = require("mongoose");
const botconfig = require("../../botconfig.json");
const { MessageEmbed } = require("discord.js");

// CONECTAR A DATABASE
mongoose.connect(botconfig.mongoPass, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

//MODELOS
const DataW = require("../../modelos/dataW.js");

module.exports.run = async (bot, message, args) => {
  if(!args[0]) {
    var user = message.author;
  } else {
    var user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!user) return message.channel.send("Mencione alguém!")
  }

  DataW.find({ guildID: message.guild.id, userID: user.id }, async (err, data) => {
    if(err) console.log(err);
    if(!data.length) return message.channel.send(`${user} não tem warns por aqui.`)
    let embed = new MessageEmbed()
    .setTitle(`Warns de ${user.user.tag} em ${message.guild.name}`)
    .setColor("#00ff00")
    .setDescription(data.map(d=>{
      return d.warns.map((w, i)=>`\`\`#${i}\`\` - Warn\n Moderador: <@${w.Moderador}>\nMotivo: \`\`${w.Motivo}\`\`\n`).join("\n");
    }))
    return message.channel.send(embed);
  })
}

module.exports.help = {
  name: "warns",
  aliases: [""],
  description: "Mostrará os warns de determinado usuário",
  use: "[Usuário]",
  category: "moderação"
}
