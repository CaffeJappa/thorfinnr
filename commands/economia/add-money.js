const Discord = require("discord.js");
const ms = require("parse-ms");
const mongoose = require("mongoose");
const botconfig = require("../../botconfig.json");

// CONECTAR A DATABASE
mongoose.connect(botconfig.mongoPass, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

//MODELOS
const Data = require("../../modelos/data.js");

module.exports.run = async (bot, message, args) => {
  // Verificar menção
  let user = message.mentions.members.first() || bot.users.cache.get(args[0]);
  if(!message.mentions.users.first()) return message.reply("Desculpa, não consegui encontrar a pessoa.");
  if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Não tens permissões para fazer isto.");

  // Verificar Qtd
  if(!args[1]) return message.channel.send("Por favor, especifique uma quantia.");
  if(isNaN(parseInt(args[1]))) return message.channel.send("Isso não é um número.");

    Data.findOne({
      userID: user.id
    }, (err, userData) => {
      if(err) console.log(err);

      if(!userData) {
        let valor = parseInt(args[1]) + 20000;
        const newData = new Data({
          nome: bot.users.cache.get(user.id).username,
          userID: user.id,
          lb: "all",
          dinheiro: valor,
          banco: 0,
          data: 0,
          ipData: 0,
          robData: 0,
          salData: 0,
        })
        newData.save().catch(err => console.log(err));
      } else {
        userData.dinheiro += parseInt(args[1]);
        userData.save().catch(err => console.log(err));
      }
      return message.channel.send(`${message.author} concedeu R$${args[1]} para ${user}`);
    })

}

module.exports.help = {
  name: "add-money",
  aliases: ["add", "am", "addmoney"],
  description: "Adicionará dinheiro na conta do mencionado.",
  category: "economia",
  use: "[Usuário] [Dinheiro]"
}
