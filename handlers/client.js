let client = require("..");
let chalk = require("chalk");
let dsc = require("discord.js");

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
      chalk.greenBright("Welcome To Service Handler - client")
  );

  client.cooldowns = new dsc.Collection();
  client.commands = new dsc.Collection();
  client.slash = new dsc.Collection();
	client.music = require("@koenie06/discord.js-music");
  client.log = function log(a) {
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
    return console.log(
      chalk.cyanBright(`[${datetime}] `) +
        chalk.magentaBright("| ") +
        chalk.greenBright(a)
    );
  };

  client.login(process.env.Token);

  client.log("Successfully Loaded Client Event");
};
