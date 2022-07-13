const ms = require("parse-ms");
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
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let maxLimit = 5001;
  if(!message.mentions.users.first()) return message.reply("Não encontrei ninguém.");
  if(message.mentions.users.first() === message.author) return message.channel.send("Não é possível roubar a sí.");

  // Tentativa;
  let verificar = ["feito", "nao", "nao"];
  let pegar = verificar[Math.floor(Math.random() * verificar.length)];
  if(pegar === "nao") return message.channel.send("Tu falhaste. Estás sendo preso.");
  
  let timeout = 180000;
  let calculo = Math.random() * maxLimit;
  let reward = Math.floor(calculo);

  let embed = new Discord.MessageEmbed();
  embed.setTitle(":gun: | Roubo");

  Data.findOne({
    userID: user.id
  }, (err, userData) => {
    if(err) console.log(err);
    if(!userData) {
      return message.channel.send("O usuário não pode ser roubado.")
    } else {
      Data.findOne({
        userID: message.author.id
      }, (err, authorData) => {
        if(err) console.log(err);
        if(userData.dinheiro < 101) return message.channel.send("O usuário não pode ser roubado.");

        if(!authorData) {
          let valor = 20000 + reward;
          const newData = new Data({
            nome: bot.users.cache.get(message.author.id).username,
            userID: message.author.id,
            lb: "all",
            dinheiro: valor,
            banco: 0,
            data: 0,
            ipData: 0,
            robData: Date.now(),
            salData: 0,
          })
          userData.dinheiro -= reward;
          userData.save().catch(err => console.log(err));
          newData.save().catch(err => console.log(err));
          embed.setDescription(`${message.author} roubou ${user}. O roubo foi de ${reward}`);
          embed.setColor("#00ff00");
          return message.channel.send(embed);
        } else {
          if(timeout - (Date.now() - authorData.robData) > 0) {
            let time = ms(timeout - (Date.now() - authorData.robData))

            embed.setColor("#ff0000");
            embed.setDescription(`**Já roubaste, espere o tempo terminar!**`);
            embed.addField(`Poderás roubar denovo em:`, `**${time.hours}h ${time.minutes}m ${time.seconds}s**`);
            return message.channel.send(embed);
          } else {
            authorData.dinheiro += reward;
            userData.dinheiro -= reward;
            authorData.robData = Date.now()
            authorData.save().catch(err => console.log(err));
            userData.save().catch(err => console.log(err));

            embed.setDescription(`${message.author} roubou ${user}. O roubo foi de R$${reward}`);
            embed.setColor("#00ff00");
            return message.channel.send(embed);
          }
        }
      })
    }
  })

}

module.exports.help = {
  name: "roubar",
  aliases: ["rob", "ro"],
  description: "Rouba algum jogador.",
  category: "economia",
  use: "[Usuário]"
}
