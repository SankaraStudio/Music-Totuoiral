let { Client, Intents, Collection } = require("discord.js"),
  voice = require("@discordjs/voice"),
  { readdirSync } = require("fs");
let client = new Client({
  allowedMentions: {
    parse: [],
    repliedUser: false
  },
  presence: {
    activities: [
      {
        name: "мαєω gяιℓℓ тєαм тн",
        type: "WATCHING"
      }
    ]
  },
  intents: 32767,
  partials: ["MESSAGE", "CHANNEL", "REACTION"]
});

module.exports = client;

["client", "event", "command", "slash", "music"].forEach(f =>
  require(`./handlers/${f}`)()
);
