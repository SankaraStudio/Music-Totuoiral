let { CommandInteraction, Client } = require("discord.js");

module.exports = {
  name: "play",
  description: "play music",
  type: "CHAT_INPUT",
  options: [
    {
      name: "song",
      description: "the song you want to play",
      type: 3,
      required: true
    }
  ],
  permission: {
    bot: [],
    channel: []
  },
  /*
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  start: async function(client, interaction) {
    let options = interaction.options._hoistedOptions;

    let channel = interaction.member.voice.channel;
    let song = options.find(x => x.name === "song").value;

    client.music.play({
      interaction: interaction,
      channel: channel,
      song: song
    });

	  await interaction.reply({
      content: `Searching ${song}...`
    });
	}
};
