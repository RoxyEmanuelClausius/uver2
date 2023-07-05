const { getRandomInt } = require("../src/Utils");
const player = require('../src/database/schemas/Player');
const { STATS } = require('../src/config/bot');
const cooldownCache = new Map();

const xpToAdd = () => getRandomInt(1) + 1;

/**
 * @param {string} content
 * @param {import('discord.js').GuildMember} member
 * @param {number} level
 * @param {number} amount
 */
const parse = (content, member, level, amount) => {
  return content
    .replaceAll(/\\n/g, "\n")
    .replaceAll(/{server}/g, member.guild.name)
    .replaceAll(/{count}/g, member.guild.memberCount)
    .replaceAll(/{member:id}/g, member.id)
    .replaceAll(/{member:name}/g, member.displayName)
    .replaceAll(/{member:mention}/g, member.toString())
    .replaceAll(/{member:tag}/g, member.user.tag)
    .replaceAll(/{cash}/g, amount)
    .replaceAll(/{level}/g, level);
};

module.exports = {
  /**
   * This function saves stats for a new message
   * @param {import("discord.js").Message} message
   * * @param {import("discord.js").User} user
   * @param {boolean} isCommand
   * @param {object} settings
   */
  async trackMessageStats(message, isCommand, settings) {
    const user = message.author;
    const statsDb = await player.findOne({ userId: user.id });
    if (!statsDb) return;
    if (statsDb) {
      // Cooldown check to prevent Message Spamming
      const key = `${message.guildId}|${message.member.id}`;
      if (cooldownCache.has(key)) {
        const difference = (Date.now() - cooldownCache.get(key)) * 0.001;
        if (difference < STATS.XP_COOLDOWN) {
          return statsDb.save();
        }
        cooldownCache.delete(key);
      }

      // Update member's XP in DB
      statsDb.player.xp += xpToAdd();

      // Check if member has levelled up
      let { xp, level } = statsDb.player;
      const needed = level * level * 100;
      if (xp > needed) {
        level += 1;
        xp -= needed;
        statsDb.player.xp = xp;
        statsDb.player.level = level;
        statsDb.eco.gold = level;
        let lvlUpMessage = STATS.DEFAULT_LVL_UP_MSG;
        lvlUpMessage = parse(lvlUpMessage, message.member, level);
        const lvlUpChannel = message.channel;

        await lvlUpChannel.safeSend(lvlUpMessage).then(msg => setTimeout(() => msg.delete(), 60000)); // Miliseconds;
      }
      await statsDb.save();
      //  await userDb.save();
      cooldownCache.set(key, Date.now());
    }
  },

  /**
   * @param {import('discord.js').Interaction} interaction
   */
  async trackInteractionStats(interaction) {
    if (!interaction.guild) return;
    const statsDb = await player.findOne(interaction.guildId, interaction.member.id);
    if (!statsDb) return;
    await statsDb.save();
  },
};
