const os = require("os");
const cpuStat = require("cpu-stat");
const { Client, CommandInteraction, MessageEmbed, version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
  name: "stats",
  description: "Get the bot status",
  type: "CHAT_INPUT",
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  start: async (client, interaction) => {
    let uptime = moment
      .duration(client.uptime)
      .format(" D[days], H[hours], m[minutes], s[seconds]");

    await interaction.reply({
      content: "Waiting...",
      fetchReply: false,
			ephemeral: true
    });

    cpuStat.usagePercent(async function(err, percent, seconds) {
      let embed = new MessageEmbed()
        .setTimestamp(new Date())
        .addField(
          "Total memory",
          `┗ ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`,
          true
        )
        .addField(
          "Memory Usage",
          `┗ ${(
            process.memoryUsage().rss / 1024 / 1024 +
            process.memoryUsage().heapUsed / 1024 / 1024 +
            process.memoryUsage().heapTotal / 1024 / 1024 +
            process.memoryUsage().external / 1024 / 1024 +
            process.memoryUsage().arrayBuffers / 1024 / 1024
          ).toFixed(2)} MB`,
          true
        )
        .addField("Cpu Usage", `┗ ${percent.toFixed(2)}%`, true)
        .addField("ServerUptime", `┗ ${uptime}`, true)
        .addField("Websocket", `┗ ${client.ws.ping}ms`, true)
        .addField("Library", `┗ Discord.js@v${version}`, true)
        .addField("Runtime", `┗ Node.js@${process.version}`, true)
        .addField(
          "Members",
          `┗ ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`,
          true
        )
        .setColor("GREEN");

      await interaction.editReply({
        embeds: [embed],
        ephemeral: true,
        content: null
      });
    });
  }
};
