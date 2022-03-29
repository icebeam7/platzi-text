const fetch = require('node-fetch');

let analyzeText = async function analyzeText(message) {
    const response = await fetch('https://picturebotluislb7.cognitiveservices.azure.com/luis/prediction/v3.0/apps//slots/staging/predict?subscription-key=&verbose=true&show-all-intents=true&log=true&query=' + message);
    const jsonResult = await response.json(); 
    console.log(jsonResult);

    let result = {};

    result.message = message;
    result.intent = jsonResult.prediction.topIntent;

    switch(result.intent)
    {
        case "SearchPictures":
            result.response = "Let's search photos";
            break;
        case "Greetings":
            result.response = "Hello there!";
            break;
        case "OrderPic":
            result.response = "Let's process your order";
            break;
        case "None":
            result.response = "I couldn't understand you";
            break;
        case "SharePic":
            result.response = "Sure. Let's share it to Twitter";
            break;
        default:
            result.response = "N/A";
            break;
    }

    if (jsonResult.prediction.entities.hasOwnProperty('facet'))
        result.entity = jsonResult.prediction.entities.facet[0];
    else
        result.entity = "N/A";
    


    return result;
}

module.exports ={
    analyzeText
}