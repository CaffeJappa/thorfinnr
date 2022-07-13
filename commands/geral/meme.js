// const escolhas = require("../../json/memes.json");
const memes = require("random-memes");

module.exports.run = async (bot, message, args) => {

//  let choices = escolhas
//  let response = choices[Math.floor(Math.random() * choices.length)]

//  message.channel.send("Aqui jaz um meme", { files: [ response ] });
	memes.fromReddit("en").then((meme) => {
		message.channel.send(meme.image);
	})

}

module.exports.help = {
  name: "meme",
  aliases: [""],
  description: "Enviará um meme qualquer.",
  category: "geral",
  use: ""
}
