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
const Data = require("../../modelos/ações.js");

module.exports.run = async (bot, message, args) => {
  // Verificar menção
  let nome = args[0]
  let valor = args[1]
  let id = args[2]
  let desc = args.slice(3).join(" ");
  if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Não tens permissões para fazer isto.");

  // Verificar Nome
  if(!nome) return message.channel.send("Por favor, especifique um nome (sem espaços).");

  // Verificar Valor e ID
  if(!valor) return message.channel.send("Por favor, especifique um valor.");
  if(isNaN(parseInt(args[1]))) return message.channel.send("Isso não é um valor.");
  if(!id) return message.channel.send("Por favor, especifique um ID.");
  if(isNaN(parseInt(args[2]))) return message.channel.send("Isso não é um ID.");
  if(!args[3]) return message.channel.send("Por favor, especifique uma descrição.")

    Data.findOne({
      id: id
    }, (err, res) => {
      if(err) console.log(err);

      if(!res) {
        const newData = new Data({
          nome: nome,
          id: id,
          preço: valor,
          tipo: "acao",
          desc: desc
        })
        newData.save().catch(err => console.log(err));
      } else {
        return message.channel.send("O item ou ID já existe.")
      }
      return message.channel.send(`${message.author} criou o item:\nNome: ${nome}\nPreço: R$${valor.toLocaleString()}\nID: ${id}\nDescrição: ${desc}`);
    })

}

module.exports.help = {
  name: "create-item",
  aliases: ["ci", "cri"],
  description: "Criará um item na loja.",
  category: "economia",
  use: "[Nome] [Valor] [ID] [Descrição]"
}
