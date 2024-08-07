import { OpenAI } from "openai"
require('dotenv').config();


const spaceShip = document.getElementById('klingonLang')
const headerImage = document.getElementById('headerImage')

spaceShip.addEventListener('change', function(){
    if(this.checked) {
        headerImage.src = "images/worf-1.png"
        setTimeout(function(){
            headerImage.src = "images/parrot.png"
        }, 2000)
    }
})



const inputBoxEntry = document.getElementById('userInput')

const submitButton = document.getElementById('submit-button')
const languageTitle = document.getElementById('selectLangTitle')
const returnedText = document.getElementById('returned-text')
const messageForGPT = ''


async function askChatGPT(input) {
    const messages = [
    {
        role: 'system',
        content: 'You translate messages to French'
    }, 
    {   
        role: 'user',
        content: input
    }
    ]

try {
    const openai = new OpenAI({
    // apiKey: 'sk-proj-QUdLGg6wJjFPDGYOaEy9T3BlbkFJuIQYbQvjDDGIgBdcjgsZ',
    // apiKey: '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',
    apiKey: process.env.API_KEY,
    dangerouslyAllowBrowser: true
    })
    
    const response = await openai.chat.completions.create ({
    model: 'gpt-4',
    messages: messages})
    
    console.log(response)
    
    returnedText.textContent = response.choices[0].message.content
} catch (err) {
    console.log(err)
}}


submitButton.addEventListener('click', function(e) {
    e.preventDefault()
    const messageForGPT = inputBoxEntry.value
    inputBoxEntry.value = ''
    languageTitle.textContent = "Your translation 👇"
    askChatGPT(messageForGPT)
})
