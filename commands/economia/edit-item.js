const Discord = require("discord.js");
const mongoose = require("mongoose");
const botconfig = require("../../botconfig.json");

mongoose.set('useFindAndModify', false);

mongoose.connect(botconfig.mongoPass, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

const Data = require("../../modelos/ações.js");

module.exports.run = async (bot, message, args) => {
    if(!args[0]) return message.channel.send("Por favor, específique um item pelo seu ID.");
    if(!args[1]) return message.channel.send("Por favor, específique um novo valor.");
    if(parseInt(args[1]) < 1) return message.channel.send("Não é possível alterar.");
    if(isNaN(parseInt(args[0]))) return message.channel.send("Isso não é um número ID.");
    if(isNaN(parseInt(args[1]))) return message.channel.send("Isso não é um número.");

    const filtro = { id: args[0] };
    const update = { preço: args[1] };

    let updatee = args[1]
    Data.findOne({
        id: args[0]
    }, (err, res) => {
        if(err) console.log(err);
        if(!res) return message.channel.send("O item não existe.");
    })
    let updt = await Data.findOneAndUpdate(filtro, update, {
        new: true
    });
    message.channel.send(`Valor de ${updt.nome} atualizado para R$${updt.preço}.`);
}

module.exports.help = {
    name: "edit-item",
    aliases: ["edi", "ei"],
    description: "",
    category: "economia",
    use: "[Página]"
  }
