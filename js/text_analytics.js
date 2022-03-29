const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");
const key = '';
const endpoint = 'https://backtoschoolcognitive.cognitiveservices.azure.com/';

const client = new TextAnalyticsClient(endpoint, 
   new AzureKeyCredential(key));

let langDetect = async function languageDetection(message) {
  const languageInputArray = [ message ];
  const languageResult = await client.detectLanguage(languageInputArray);
  let result = {};

  languageResult.forEach(document => {
      result = document.primaryLanguage;
  });
  console.log(message);
  console.log(result);
  return result;
}

let sentAnalysis = async function sentimentAnalysis(message){
  const sentimentInputArray = [ message ];
  const sentimentResult = await client.analyzeSentiment(sentimentInputArray);
  let result = {};

  sentimentResult.forEach(document => {
    result.name = document.sentiment;
    result.positiveScore = document.confidenceScores.positive;
    result.negativeScore = document.confidenceScores.negative;
    result.neutralScore = document.confidenceScores.neutral;
  });

  console.log(result);
  return result;
}

module.exports ={
    langDetect,sentAnalysis
}