module.exports = async function(client, message) {
  let prefix = "ts.";

  let args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  let commadName = args.shift()?.toLowerCase();
  let command =
    client.commands.get(commadName) ||
    client.commands.find(
      cmd => cmd.aliases && cmd.aliases.includes(commadName)
    );

  if (
    message.content.startsWith(prefix) &&
    !message.author.bot &&
    message.guild
  ) {
    if (command) {
      await command.start(client, message, args);
    } else {
      return message.reply({
        content: "Unknown command."
      });
    }
  } else return;
};
