const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let embed = new MessageEmbed()
    .setTitle("CVV | Centro de Valorização da Vida")
    .setURL("https://cvv.org.br/")
    .setDescription("Leia abaixo para mais informações.")
    .setColor("#008000")
    .setImage('https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/CVV_-_logo_azul.jpg/1024px-CVV_-_logo_azul.jpg')
    .addField("Informações", "O CVV – Centro de Valorização da Vida realiza apoio emocional e prevenção do suicídio, atendendo voluntária e gratuitamente todas as pessoas que querem e precisam conversar, sob total sigilo por telefone, email e chat 24 horas todos os dias.")
    .addField("Atendimento", "Chat: https://www.cvv.org.br/chat/ \nTelefone: **188** \nE-Mail: https://www.cvv.org.br/e-mail/ \nEndereço: https://www.cvv.org.br/postos-de-atendimento/")
    .setFooter(`© ${message.guild.me.displayName}`, bot.user.avatarURL())
    .setTimestamp()

    message.channel.send(embed);
}

module.exports.help = {
    name: "suicidio",
    aliases: ["sc", "morte"],
    category: "geral",
    use: "",
    description: "..."
}
