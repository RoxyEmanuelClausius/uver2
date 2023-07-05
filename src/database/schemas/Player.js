const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
    {
        guildId: String,
        userId: String,
        username: String,
        eco: {
            gold: Number,
            reputasi: Number,
        },
        player: {
            xp: Number,
            level: Number,
            attack: Number,
            defense: Number,
            health: Number,
            slotItem: {
                slot1: Number,
                slot2: Number,
                slot3: Number,
                slot4: Number,
                slot5: Number,
            },
            stuff: {
                stuffUnlock: Array,
                weaponID: Number,
                bootsID: Number,
                armorID: Number,
                magicItemID: Number,
            },
            other: {
                squadattack: Number,
                squadName: String,
                squadCoinGiven: Number,
                monsterKill: Number,
                box: Number,
                bossattack: Number
            },
        },
        idboss: Number,
        bossname: String,
        stats: {
            attack: Number,
            health: Number,
        },
        daily: {
            streak: Number,
            timestamp: Date,
        },
        animals: [{
            name: String,
            emoji: String,
            rate: String,
            id: String,
        }],
        SoldAnimal:
        {
            emoji: String,
            count: Number,
        },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

module.exports = mongoose.model('Player', Schema)
