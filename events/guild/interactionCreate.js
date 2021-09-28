module.exports = async function(client, interaction) {
  if (interaction.isCommand()) {
    let { commandName, guild, channel, member, reply } = interaction;

    let cmd = client.slash.get(commandName);

    if (!cmd)
      return await reply({
        content: "Something went wrong",
        ephemeral: true
      });

    if (!guild.me.permissions.has(["SEND_MESSAGES", "EMBED_LINKS"])) {
      return await reply({
        content: ":x: I Need `SEND_MESSAGES` & `EMBED_LINKS` Permission",
        ephemeral: true
      });
    }

    if (!guild.me.permissions?.has(cmd.permissions?.bot || [])) {
      return await reply({
        content: `:x: I Need these Permissions ${cmd.permissions.bot.join(
          ", "
        )}`,
        ephemeral: true
      });
    }

    let channelPerms = channel?.permissionsFor(guild.me).toArray();

    let checkArr = [];
    let chPerms = cmd.permissions?.channel || [];

    channelPerms.forEach(x =>
      chPerms.includes(x) ? checkArr.push(true) : checkArr.push(false)
    );

    if (
      checkArr.includes(false) &&
      !checkArr.includes(true) &&
      chPerms.length
    ) {
      return await reply({
        content: `I Need these Permission for ${interaction.channel.toString()} Channel \`\`\`${chPerms.join(
          ", "
        )}`,
        ephemeral: true
      });
    }

    await cmd.start(client, interaction);
  }
};
