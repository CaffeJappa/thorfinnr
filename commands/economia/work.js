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

  let choices = ["210000", "180000", "120000"];
  let resposta = choices[Math.floor(Math.random() * choices.length)];
  let timeout = resposta;
  let minLimit = 30
  let maxLimit = 200;
  let calculo = Math.random() * (maxLimit - minLimit + 1);
  let reward = Math.floor(calculo) + minLimit;

  let embed = new Discord.MessageEmbed();
  embed.setTitle(":hammer_pick: - Trabalho");

  Data.findOne({
    userID: message.author.id
  }, (err, data) => {
    if(err) console.log(err);
    if(!data) {
      let valor = 20000 + reward;
      const newData = new Data({
        nome: message.author.username,
        userID: message.author.id,
        lb: "all",
        dinheiro: valor,
        banco: 0,
        data: Date.now(),
        ipData: 0,
        robData: 0,
        salData: 0,
      })
      newData.save().catch(err => console.log(err));
      embed.setDescription(`Trabalhaste por um tempo e ganhaste R$${reward}. Tens agora R$${newData.dinheiro}.`);
      embed.setColor("#FFD700");
      //return message.channel.send(`${bot.users.cache.get(user.id).username}, tu tens R$${dinheiro[user.id].dinheiro}`);
      return message.channel.send(embed);
    } else {
      if(timeout - (Date.now() - data.data) > 0) {
        let time = ms(timeout - (Date.now() - data.data))

        embed.setColor("#ff0000");
        embed.setDescription(`**Já trabalhaste, espere o tempo acabar!**`);
        embed.addField(`Poderás trabalhar denovo em:`, `**${time.hours}h ${time.minutes}m ${time.seconds}s**`);
        return message.channel.send(embed);
      } else {

        data.dinheiro += reward;
        data.data = Date.now()
        data.save().catch(err => console.log(err));

        embed.setDescription(`Trabalhaste por um tempo e ganhaste R$${reward}. Tens agora R$${data.dinheiro}.`);
        embed.setColor("#FFD700");
        return message.channel.send(embed);
      }
    }
  })


  }


module.exports.help = {
  name: "work",
  aliases: ["w", "tb", "trabalhar"],
  description: "Um comando para que se possa ganhar dinheiro.",
  category: "economia",
  use: ""
}
