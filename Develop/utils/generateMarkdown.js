function generateMarkdown(data) {
  var formatedStories = formatUserStories(data.userStories);
  var formatedColabs = formatColaborators(data.colaborators);
  var formatedURL = formatUrl(data.webUrl);
  var final = `
# ${data.title}

${data.description}

## Table of contents

* Usages
* Installation
* Contributors
* Creator
* Tests
* Licences

## Usages
### User Stories
${formatedStories}

## Installation

${data.installation}

## Other Contributors

${formatedColabs}

## Creator
![Git Hub profile photo](${data.imageUrl})

* ${data.username} of more formally known as ${data.author}
* Email me at ${data.email}


## Tests
${formatedURL}


## Liceses
This project is under the licenses of ${data.licenses} 

`;

 return final;
}


function formatUserStories(arr){
  var stories = ` `;
  if(arr.length === 0){
    return "There are no user stories.";
  }
  for(var i =0; i<arr.length; i++){
    stories += `
  * ${arr[i]} `
  }
  return stories;

}

function formatColaborators(arr){
  var colabs = ` `;
  if(arr.length===0){
    return "There are no other colaborators in this project"
  }
  for(var i=0; i<arr.length; i++){
    colabs += `
  * ${arr[i]} `
  }
  return colabs;

}
function formatUrl(str){
  if(str === "n"){
    var message = `
[![Website cv.lbesson.qc.to](https://img.shields.io/website-up-down-green-red/http/cv.lbesson.qc.to.svg)](#)    
Sorry right now there is no deployed website for this project, but we are working on that!
    `
    return message;
  }
  if(str !=="n"){
    var message = `
[![Website naereen.github.io](https://img.shields.io/website-up-down-green-red/https/naereen.github.io.svg)](${str})
Click the above to see the deployed website.
    `
    return message;
  }
}
module.exports = generateMarkdown;
