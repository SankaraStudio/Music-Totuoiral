let {
  CommandInteraction,
  Client,
  MessageEmbed,
  MessageActionRow,
  MessageButton
} = require("discord.js");

module.exports = {
  name: "delay",
  description: "Get the delay of client",
  type: "CHAT_INPUT",
	permissions: {
		bot: [],
		channel: []
	},
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  start: async function(client, interaction) {
    let button1 = new MessageButton()
      .setLabel("Api")
      .setStyle("SUCCESS")
      .setCustomId("a")
      .setEmoji("💛");

    let button2 = new MessageButton()
      .setLabel("Bot")
      .setStyle("SUCCESS")
      .setCustomId("b")
      .setEmoji("💛");

    let row_ = new MessageActionRow().addComponents([button1, button2]);

    let embed1 = new MessageEmbed()
      .setColor("#f507f1")
      .addFields([
        {
          name: "API",
          value: `${client?.ws?.ping}ms`
        }
      ])
      .setTimestamp(new Date());

    let embed2 = new MessageEmbed()
      .setColor("#f507f1")
      .setTimestamp(new Date())
      .addFields([
        {
          name: "Bot",
          value: `${Date.now() - interaction.createdTimestamp}ms`
        }
      ]);

    let msg = await interaction.reply({
      content: null,
      embeds: [embed1, embed2],
			ephemeral: true
    });

    let filter = x => {
      if (x.user.id === interaction.user.id) return true;
      return false;
    };
	}
};
