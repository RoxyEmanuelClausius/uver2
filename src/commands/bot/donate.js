const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    let row = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
                .setLabel("Uverseni")
                .setURL("https://discord.gg/uverseni")
                .setStyle(Discord.ButtonStyle.Link),
        );

    client.embed({
        title: `${client.user.username}・Donate`,
        desc: '_____ \n\n**No doante TY**',
        thumbnail: client.user.avatarURL({ dynamic: true }),
        url: "https://discord.gg/uverseni",
        components: [row],
        type: 'editreply'
    }, interaction)
}

 