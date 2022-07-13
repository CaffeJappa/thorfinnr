const Discord = require("discord.js");
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
  // Verificar menção
  let user = message.mentions.members.first() || bot.users.cache.get(args[0]);
  if(!user) return message.reply("Desculpe, não consegui encontrar alguém ou não mencionaste ninguém.");
  if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Não tens permissão, pequeno gafanhoto.");

  // Verificar Qtd
  let motivo = args.slice(1).join(" ")
  if(!args[1]) {
    let motivo = "Sem motivo";
  }

    DataW.findOne({
      guildID: message.guild.id,
      userID: user.id
    }, (err, userData) => {
      if(err) console.log(err);

      if(!userData) {
        const newData = new DataW({
          nome: bot.users.cache.get(user.id).username,
          guildID: message.guild.id,
          userID: user.id,
          warns:[
            {
              Tipo: "warn",
              Moderador: message.author.id,
              Motivo: motivo
            }
          ]
        })
        newData.save().catch(err => console.log(err));
        return message.channel.send(`${user} tomou um warn pois: ${motivo}. Ele agora tem 1 warn`)
      } else {
        userData.warns.unshift({
          Tipo: "warn",
          Moderador: message.author.id,
          Motivo: motivo
        })
        return message.channel.send(`${user} tomou um warn pois: ${motivo}. Ele agora tem ${userData.warns.length} warns`)
      }
    })

}

module.exports.help = {
  name: "warn",
  aliases: ["warnar", "wn", "av"],
  description: "Dará um warn na pessoa.",
  category: "moderação",
  use: "[Usuário] [Motivo]"
}
