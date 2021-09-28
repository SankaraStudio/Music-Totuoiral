let client = require("..");
let path = require("path");
let chalk = require("chalk");
let { readdirSync } = require("fs");

module.exports = async () => {
  client.log("Welcome to service handler - command");

  let command_folder = readdirSync(path.join(__dirname, '..', "commands"));

  command_folder.forEach(async folder => {
    let command_file = readdirSync(
      path.join(__dirname, '..', "commands", folder)
    ).filter(x => x.endsWith(".js"));
    command_file.forEach(async file => {
      let command = require(path.join(
        __dirname,
        "..",
        "commands",
        folder,
        file
      ));
      await client.commands.set(command.name, command);
      client.log("Loaded " + file);
    });
  });
};
