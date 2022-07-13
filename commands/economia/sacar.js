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

  // Verificar Qtd
  if(!args[0]) return message.channel.send("Especifique uma quantia.");

  // Verificar dinheiro
  if(parseInt(args[0]) < 1) return message.channel.send("Não podes sacar.");
  if(isNaN(parseInt(args[0]))) return message.channel.send("Isto não é um número.");

    Data.findOne({
      userID: message.author.id
    }, (err, data) => {
      if(err) console.log(err);
      if(parseInt(args[0]) > data.banco) return message.channel.send("Estás sem dinheiro.");
      if(parseInt(args[0]) < 1) return message.channel.send("Não podes sacar.");

      if(!data) {
        return message.channel.send("Estás sem dinheiro.")
      } else {
        data.dinheiro += parseInt(args[0]);
        data.banco -= parseInt(args[0]);
        data.save().catch(err => console.log(err));
      }
      return message.channel.send(`${message.author} sacou R$${args[0].toLocaleString()}.`);
    })

}

module.exports.help = {
  name: "sacar",
  aliases: ["sac"],
  description: "Sacará dinheiro no banco.",
  category: "economia",
  use: "[Dinheiro]"
}
