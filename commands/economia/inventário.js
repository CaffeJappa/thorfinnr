const Discord = require("discord.js");
const mongoose = require("mongoose");
const botconfig = require("../../botconfig.json");

mongoose.connect(botconfig.mongoPass, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

const Data = require("../../modelos/inventario.js");

module.exports.run = async (bot, message, args) => {
  Data.find({
    userID: message.author.id
  }).sort([
    ['preço', 'descending']
  ]).exec((err, res) => {
    if(err) console.log(err);

    var pagina = Math.ceil(res.length / 10);

    let embed = new Discord.MessageEmbed()
    embed.setTitle(`Inventário de ${message.author.username}`, message.author.displayAvatarURL());
    embed.setColor("#FFD700");

    let pg = parseInt(args[0]);
    if(pg != Math.floor(pg)) pg = 1;
    if(!pg) pg = 1;
    let fim = pg * 10;
    let inicio = (pg * 10) - 10;

    if(res.length === 0) {
      embed.addField("Erro", "Nenhuma página encontrada");
    } else if(res.length <= inicio) {
      embed.addField("Erro", "Página não encontrada");
    } else if(res.length <= fim) {
      embed.setFooter(`Página ${pg}/${pagina} •  Le Républicain ©`);
      for(i = inicio; i < res.length; i++) {
        embed.addField(`${i + 1}. ${res[i].nome} (ID: ${res[i].itemID})`, `QTD: ${res[i].qtd}\n${res[i].desc}`);
      }
    } else {
      embed.setFooter(`Página ${pg}/${pagina} •  Le Républicain ©`);
      for(i = inicio; i < fim; i++) {
        embed.addField(`${i + 1}. ${res[i].nome} (ID: ${res[i].itemID})`, `QTD: ${res[i].qtd}\n${res[i].desc}`  );
      }
    }
    message.channel.send(embed);

  })
}

module.exports.help = {
  name: "inventário",
  aliases: ["inv"],
  description: "",
  category: "economia",
  use: "[Página]"
}