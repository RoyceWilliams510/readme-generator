const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");
const markdown = require("./utils/generateMarkdown");

const questions = [
"What is you project's name?",
"What is your project's description",
"What is the guidelines for your projects installation",
"What licenses is your project under?",
"How many colaborators were there on this project (outside of yourself)?",
"Hpw many user stories do you want?"
];
const prompts = ["As a <role> I can <capability>, so that <receive benefit>", 
"In order to <receive benefit> as a <role>, I can <goal/desire>",
"As <who> <when> <where>, I <want> because <why>"
]
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

    // User stories

    const{ storyCount} = await inquirer.prompt({
        input:"number",
        message: questions[5],
        name: "storyCount"
    })
    const userStories = [];
    if(storyCount>0){
        for(var j =0; j<storyCount; j++){
            const{storyType} = await inquirer.prompt({
                type: "list",
                message:"Which user story format do you want?",
                name: "storyType",
                choices: prompts
            })
            console.log(storyType);
            if(storyType === prompts[1]){
                console.log("Fill in the following user story prompt")
                console.log(prompts[1])
                const {benefit} = await inquirer.prompt({
                    input:"text",
                    message: "<recieve benefits>",
                    name: "benefit"
                })
                const {role} = await inquirer.prompt({
                    input:"text",
                    message: "<role>",
                    name: "role"
                })
                const {goal} = await inquirer.prompt({
                    input:"text",
                    message: "<goal/desire>",
                    name: "goal"
                })
                const completedStory = "In order to " +  benefit+ "  as a " +role+ ",  I can " + goal;
                userStories.push(completedStory);

            }
            if(storyType === prompts[0]){
                console.log("Fill in the following user story prompt");
                console.log(prompts[0]);
                const {role} = await inquirer.prompt({
                    input:"text",
                    message: "<role>",
                    name: "role"
                })
                const {capability} = await inquirer.prompt({
                    input:"text",
                    message: "<capability>",
                    name: "capability"
                })
                const {benefit} = await inquirer.prompt({
                    input:"text",
                    message: "<recieve benefits>",
                    name: "benefit"
                })
                const completedStory = "As a "+ role + ", I can "+ capability+ ", so that " +benefit;
                userStories.push(completedStory);

            }
            if(storyType === prompts[2]){
                console.log("Fill in the following user story prompt");
                console.log(prompts[2]);
                const {who} = await inquirer.prompt({
                    input:"text",
                    message: "<who>",
                    name: "who"
                })
                const {when} = await inquirer.prompt({
                    input:"text",
                    message: "<when>",
                    name: "when"
                })
                const {where} = await inquirer.prompt({
                    input:"text",
                    message: "<where>",
                    name: "where"
                })
                const {want} = await inquirer.prompt({
                    input:"text",
                    message: "<want>",
                    name: "want"
                })
                const {why} = await inquirer.prompt({
                    input:"text",
                    message: "<why>",
                    name: "why"
                })
                const completedStory = "As " + who +" "+ when +" "+ where+ ", I " + want+ "because " +why;
                userStories.push(completedStory);
            }

        }
    }
    console.log(userStories);
    
    // generates an array of colaborators
    const {colaboratorNumber} = await inquirer.prompt({
        input:"number",
        message: questions[4],
        name: "colaboratorNumber"
    })
    const colaborators = [];
    if(colaboratorNumber>1){
        for(var i =0; i<colaboratorNumber; i++){
            let index = i +1;
            const {collaborator} = await inquirer.prompt({
                    message: "Colaborator #"+ index +" name: ",
                    name: "collaborator"
            })
            colaborators.push(collaborator);
        }
    }
    console.log(colaborators);
    // for the github stuff
    const {username} = await inquirer.prompt({
        message: "Enter your GitHub username",
        name: "username"
        })
    const queryUrl = `https://api.github.com/users/${username}`;
    const userImage = axios.get(queryUrl).then( await function(res) {
        console.log(res.data.avatar_url);
        return res.data.avatar_url;
    });
    const userEmail = axios.get(queryUrl).then( await function(res) {
        console.log(res.data.email);
        return res.data.email;
    });
    
    const data = {
        title: name,
        installation: install,
        licenses: licenses,
        username: username,
        ImageUrl: userImage,
        email: userEmail,
        colaborators: colaborators,
        description: description,
        userStories: userStories
    }
    console.log(data);

}

init();
