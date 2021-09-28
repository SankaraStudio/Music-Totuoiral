let { CommandInteraction, Client } = require("discord.js");
let { joinVoiceChannel } = require("@discordjs/voice")

module.exports = {
  name: "join",
  description: "order to join your voice channel",
  type: "CHAT_INPUT",
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  start: async function(client, interaction) {
    await interaction.reply({
      content: "Waiting...",
      fetchReply: true,
      ephemeral: false
    });
    let channel = interaction.member.voice.channel;

    if (channel) {
      await joinVoiceChannel({
				channelId: channel.id,
				guildId: interaction.guild.id,
				adapterCreator: interaction.guild.voiceAdapterCreator
			});

      await interaction.editReply({
        content: "Joining the audio channel : " + channel.name
      });
    } else {
      await interaction.editReply({
        content: "Please join the audio channel."
      });
    }
  }
};
