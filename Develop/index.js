const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");
const markdown = require("./utils/generateMarkdown");

const questions = [
"What is you project's name?",
"What is your project's description",
"What is the guidelines for your projects installation",
"What licenses is your project under?"
];

function writeToFile(fileName, data) {

}

async function init() {
    const { name } = await inquirer.prompt({
        input:"text",
        message: questions[0],
        name: "name"
      });
    const { description } = await inquirer.prompt({
        input:"text",
        message: questions[1],
        name: "description"
    });
    const { install } = await inquirer.prompt({
        input:"text",
        message: questions[2],
        name: "install"
      });
    const { licenses } = await inquirer.prompt({
        input:"text",
        message: questions[3],
        name: "licenses"
      });
    const {username} = await inquirer.prompt({
    message: "Enter your GitHub username",
    name: "username"
    })
    .then(function({ username }) {
    const queryUrl = `https://api.github.com/users/${username}`;
     axios.get(queryUrl).then( function(res) {
      console.log(res.data);
      });
    });
      console.log("project title:" +name);
      console.log("project description:" +description);
      console.log("project guidelines:" +install);
      console.log("project licenses:" +licenses);
      console.log("github username: ", username);



}

init();
