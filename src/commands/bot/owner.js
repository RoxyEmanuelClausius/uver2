const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    client.embed({
        title: `📘・Owner information`,
        desc: `____________________________`,
        thumbnail: client.user.avatarURL({ dynamic: true, size: 1024 }),
        fields: [{
            name: "👑┆Owner name",
            value: `Jeeeeeee`,
            inline: true,
        },
        {
            name: "🏷┆Discord tag",
            value: `</jeeeeeee>#0069`,
            inline: true,
        },
        {
            name: "🏢┆Organization",
            value: `Uverseni`,
            inline: true,
        },
        {
            name: "🌐┆Website",
            value: `[https://Uverseni.co.id](https://Uverseni.co.id)`,
            inline: true,
        }],
        type: 'editreply'
    }, interaction)
}

 