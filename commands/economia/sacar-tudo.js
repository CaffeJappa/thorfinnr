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

    Data.findOne({
      userID: message.author.id
    }, (err, data) => {
      if(err) console.log(err);
      let tudo = parseInt(data.banco);
      if(parseInt(args[0]) > data.dinheiro) return message.channel.send("Estás sem dinheiro.");
      if(parseInt(args[0]) < 1) return message.channel.send("Não podes sacar.");

      if(data.dinheiro <= 0) return message.channel.send("Estás sem dinheiro.")
      if(!data) {
        return message.channel.send("Estás sem dinheiro.")
      } else {
        data.dinheiro += tudo;
        data.banco -= tudo;
        data.save().catch(err => console.log(err));
      }
      return message.channel.send(`${message.author} sacou R$${tudo.toLocaleString()}.`);
    })

}

module.exports.help = {
  name: "sacar-all",
  aliases: ["saca"],
  description: "Sacará todo dinheiro no banco.",
  category: "economia",
  use: ""
}
