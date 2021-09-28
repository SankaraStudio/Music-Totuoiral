module.exports = async function(client) {
  client.log("Loggeed In As " + client.user.tag + " - DiscordApi");

  await client.user.setPresence({
    activities: [
      {
        name: "мαєω gяιℓℓ тєαм тн",
        type: "WATCHING"
      }
    ],
    status: "idle"
  });
};
