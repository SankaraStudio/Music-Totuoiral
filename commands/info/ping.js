let {
  Message,
  Client,
  MessageEmbed,
  MessageActionRow,
  MessageButton
} = require("discord.js");

module.exports = {
  name: "ping",
  descrition: "Get the delay of client",
  permissions: {
    bot: [],
    channel: []
  },
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  start: async function(client, message, args) {
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
          value: `${Date.now() - message.createdTimestamp}ms`
        }
      ]);

    let msg = await message.reply({
      content: "What Ping?",
      embeds: [],
      components: [row_]
    });

    let filter = x => {
      if (x.user.id === message.author.id) return true;
      return false;
    };

    let collector = msg.createMessageComponentCollector({
      filter
    });

    collector
      .on("end", async () => {
        msg.delete();
      })
      .on("collect", async function(i) {
        if (i.customId === "a") {
          button1.setDisabled(true);
          button2.setDisabled(false);

          let row = new MessageActionRow().addComponents([button1, button2]);

          await msg.edit({
            components: [row],
            embeds: [embed1]
          });
        }

        if (i.customId === "b") {
          button1.setDisabled(false);
          button2.setDisabled(true);

          let row = new MessageActionRow().addComponents([button1, button2]);

          await msg.edit({
            components: [row],
            embeds: [embed2]
          });
        }
      });
  }
};
