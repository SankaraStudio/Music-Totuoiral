const client = require("..");
const events = client.music.event;
const { MessageEmbed } = require("discord.js");

module.exports = async () => {
  events.on("playSong", async (channel, songInfo, requester) => {
    const embed = new MessageEmbed()
      .setColor("#f507f1")
      .setAuthor(
        `${songInfo.title}`,
        `https://images-ext-1.discordapp.net/external/DkPCBVBHBDJC8xHHCF2G7-rJXnTwj_qs78udThL8Cy0/%3Fv%3D1/https/cdn.discordapp.com/emojis/859459305152708630.gif`,
        `${songInfo.url}`
      )
      .setTimestamp(new Date())
      .addFields([
        {
          name: "Request By",
          value: `>>> ${requester}`
        },
        {
          name: "Music By",
          value: `>>> ${songInfo.author}`
        }
      ]);

    channel.send({
      embeds: [embed]
    });
  });

  events.on("addSong", async (channel, songInfo, requester) => {
    const embed = new MessageEmbed()
      .setColor("#f507f1")
      .setAuthor(
        `${songInfo.title}`,
        `https://images-ext-1.discordapp.net/external/DkPCBVBHBDJC8xHHCF2G7-rJXnTwj_qs78udThL8Cy0/%3Fv%3D1/https/cdn.discordapp.com/emojis/859459305152708630.gif`,
        `${songInfo.url}`
      )
      .setTimestamp(new Date())
      .addFields([
        {
          name: "Request By",
          value: `>>> ${requester}`
        },
        {
          name: "Music By",
          value: `>>> ${songInfo.author}`
        }
      ]);

    channel.send({
      embeds: [embed]
    });
  });

  events.on("playList", async (channel, playlist, songInfo, requester) => {
    /* See all the 'songInfo' and 'playlist' options by logging it.. */

    channel.send({
      content: `Started playing the song [${songInfo.title}](${songInfo.url}) by \`${songInfo.author}\` of the playlist ${playlist.title}.
        This was requested by ${requester.tag} (${requester.id})`
    });
  });

  events.on("addList", async (channel, playlist, requester) => {
    /* See all the 'playlist' options by logging it.. */

    channel.send({
      content: `Added the playlist [${playlist.title}](${playlist.url}) with ${playlist.videos.length} amount of videos to the queue.
        Added by ${requester.tag} (${requester.id})`
    });
  });

  events.on("finish", async channel => {
    channel.send({
      content: "Party has been ended!"
    });
  });
};
