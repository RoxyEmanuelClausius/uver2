const mongoose = require('mongoose')

const squadSchema = mongoose.Schema({
    guildId: String,
    userId: String,
    numberPlayer: Number,
    numberSquad: Number,
    amoutCoin: Number,
    amoutItem: Number,
    amoutMonsterKilled: Number,
    boxOpen: Number,
})

module.exports = mongoose.model('stats', squadSchema)