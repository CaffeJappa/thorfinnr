const mongoose = require("mongoose");
const botconfig = require("../../botconfig.json");


// CONECTAR A DATABASE
mongoose.connect(botconfig.mongoPass, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

const Data = require("../../modelos/data.js");

module.exports.run = async (bot, message, args) => {
  if(!message.author.id === "499712331861721095") return message.channel.send("Não podes utilizar esse comando.")
  let usuariosEmPres = message.guild.roles.cache.get('737838244728930406').members.map(m=>m.user.id);
  let usuariosEmPres2 = usuariosEmPres.json;
  console.log(usuariosEmPres);
  Data.find({
    userID: [ usuariosEmPres ]
  }, (err, multiData) => {
    console.log(multiData);
    if(err) console.log(err);

    return message.channel.send("Sucesso, mas nem tanto.");
  })
}

module.exports.help = {
  name: "teste",
  aliases: [],
  description: "Testes.",
  category: "moderação",
  use: ""
}
