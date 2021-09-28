let client = require("..");
let Discord = require("discord.js");
let chalk = require("chalk");
let path = require("path");
let { readdirSync } = require("fs");

module.exports = async () => {
  client.log("Welcome to service handler - event");
  function load(folder) {
    let event_files = readdirSync(
      path.join(__dirname, '..', "events", folder)
    ).filter(x => x.endsWith(".js"));

    event_files.forEach(file => {
      let event = require(path.join(__dirname, "..", "events", folder, file));
      let eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, client));

      client.log("Loaded " + file + " - event");
    });
  }

  await ["client", "guild"].forEach(x => load(x));
};
