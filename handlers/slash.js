let client = require("..");
let chalk = require("chalk");
let path = require("path");
let array = [];
let { readdirSync } = require("fs");

module.exports = () => {
  let currentdate = new Date();
  let datetime =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();
  console.log(
    chalk.cyanBright(`[${datetime}] `) +
      chalk.magentaBright("| ") +
      chalk.greenBright("Welcome To Service Handler - Slash")
  );

  try {
    let command_folder = readdirSync(path.join(__dirname, '..', "slash"));

    command_folder.forEach(folder => {
      let command_files = readdirSync(
        path.join(__dirname, '..', "slash", folder)
      ).filter(x => x.endsWith(".js"));

      command_files.forEach(async file => {
        let command = require(path.join(
          __dirname,
          "..",
          "slash",
          folder,
          file
        ));
        await client.slash.set(command.name, command);
        console.log(
          chalk.cyanBright(`[${datetime}] `) +
            chalk.magentaBright("| ") +
            chalk.greenBright(`Loaded ${file} - Slash`)
        );
        array.push(command);
      });
    });

    client.on("ready", async () => {
      await client.user?.setPresence({
        status: "idle",
        activities: [
          {
            name: "мαєω gяιℓℓ тєαм тн",
            type: "WATCHING"
          }
        ]
      });

      array.forEach(async command => {
        await client?.guilds?.cache?.forEach(async guild => {
          await guild?.commands?.create(command).catch(err => {
            console.log(chalk.red(err));
          });
        });
      });
    });
  } catch (e) {
    console.log(chalk.red(e));
  }
};
