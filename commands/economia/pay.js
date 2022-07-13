const Discord = require("discord.js");
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
  let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
  if(!user) return message.reply("Não encontrei ninguém.");
  if(message.mentions.users.first() === message.author) return message.channel.send("Não é possível pagar para sí.");

  // Verificar Qtd
  if(!args[2]) return message.channel.send("Especifique uma quantia.");
  if(isNaN(parseInt(args[2]))) return message.channel.send("Isto não é um número.");

  if(args[1] === "dinheiro") {
  Data.findOne({
    userID: message.author.id
  }, (err, authorData)=> {
    if(err) console.log(err);
    if(!authorData) {
      return message.channel.send("Estás sem dinheiro!");
    } else {
      Data.findOne({
        userID: user.id
      }, (err, userData) => {
        if(err) console.log(err);
        if(parseInt(args[2]) > authorData.dinheiro) return message.channel.send("Estás sem dinheiro.");
        if(parseInt(args[2]) < 1) return message.channel.send("Não é possível pagar.");

        if(!userData) {
          let valor = parseInt(args[2]) + 20000;
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
          authorData.dinheiro -= parseInt(args[2]);
          newData.save().catch(err => console.log(err));
          authorData.save().catch(err => console.log(err));
        } else {
          userData.dinheiro += parseInt(args[2]);
          authorData.dinheiro -= parseInt(args[2]);
          userData.save().catch(err => console.log(err));
          authorData.save().catch(err => console.log(err));
        }

        return message.channel.send(`${message.author} pagou R$${args[2]} para ${user}`);
        })
      }

    });
  } else if(args[1] === "banco") {
    Data.findOne({
      userID: message.author.id
    }, (err, authorData)=> {
      if(err) console.log(err);
      if(!authorData) {
        return message.channel.send("Tu não tens dinheiro!");
      } else {
        Data.findOne({
          userID: user.id
        }, (err, userData) => {
          if(err) console.log(err);
          if(parseInt(args[2]) > authorData.dinheiro) return message.channel.send("Tu não tens esse dinheiro.");
          if(parseInt(args[2]) < 1) return message.channel.send("Ué, 0 não paga nada.");

          if(!userData) {
            const newData = new Data({
              nome: bot.users.cache.get(user.id).username,
              userID: user.id,
              lb: "all",
              dinheiro: 0,
              banco: parseInt(args[2]),
              data: 0,
              robData: 0,
            })
            authorData.dinheiro -= parseInt(args[2]);
            newData.save().catch(err => console.log(err));
            authorData.save().catch(err => console.log(err));
          } else {
            userData.banco += parseInt(args[2]);
            authorData.dinheiro -= parseInt(args[2]);
            userData.save().catch(err => console.log(err));
            authorData.save().catch(err => console.log(err));
          }

          return message.channel.send(`${message.author} acaba de pagar R$${args[2]} para ${user}`);
          })
        }

      });
  }

}

module.exports.help = {
  name: "pay",
  aliases: ["pagar", "pg"],
  description: "Enviará uma certa quantia de dinheiro para o usuário marcado.",
  category: "economia",
  use: "[Usuário] [Dinheiro/Banco] [Dinheiro]"
}
