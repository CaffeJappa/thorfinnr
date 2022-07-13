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
  if(!args[0]) {
    var user = message.author;
  } else {
    var user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!user) return message.channel.send("Não mencionaste ninguém!")
  }

  Data.findOne({
    userID: user.id
  }, (err, data) => {
    if(err) console.log(err);
    if(!data) {
      const newData = new Data({
        nome: bot.users.cache.get(user.id).username,
        userID: user.id,
        lb: "all",
        dinheiro: 20000,
        banco: 0,
        data: 0,
        ipData: 0,
        robData: 0,
        salData: 0,
      })
      newData.save().catch(err => console.log(err));
      let embed = new Discord.MessageEmbed()
      .setAuthor(`${bot.users.cache.get(user.id).tag}`, message.author.displayAvatarURL())
      .setImage()
      .setColor("#FFD700")
      .addField("Dinheiro:", `R$20.000`, true)
      .addField("Banco:", `R$0`, true)
      .setTimestamp()
      .setFooter('Le Républicain ©', bot.user.displayAvatarURL());
      //return message.channel.send(`${bot.users.cache.get(user.id).username}, tu tens R$${dinheiro[user.id].dinheiro}`);
      return message.channel.send(embed);
    } else {
      let embed = new Discord.MessageEmbed()
      .setAuthor(`${bot.users.cache.get(user.id).tag}`, message.author.displayAvatarURL())
      .setImage()
      .setColor("#FFD700")
      .addField("Dinheiro:", `R$${data.dinheiro.toLocaleString()}`, true)
      .addField("Banco:", `R$${data.banco.toLocaleString()}`, true)
      .setTimestamp()
      .setFooter('O Monarquista ©', bot.user.displayAvatarURL());
      //return message.channel.send(`${bot.users.cache.get(user.id).username}, tu tens R$${dinheiro[user.id].dinheiro}`);
      return message.channel.send(embed);
    }
  })

}

module.exports.help = {
  name: "balance",
  aliases: ["bal", "carteira", "car"],
  description: "Comando que apresenta a tua carteira ou a de alguém.",
  category: "economia",
  use: "[Usuário]"
}
