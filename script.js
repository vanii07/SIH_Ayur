const chatInput = document.querySelector('#chat-input');
const sendButton = document.querySelector('#send-btn');
const chatContainer = document.querySelector('.chat-container');
const themeButton = document.querySelector('#theme-btn');
const deleteButton = document.querySelector('#delete-btn');

let userText = null;
const API_KEY = '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'; // Paste your API key here

const loadDataFromLocalstorage = () => {
  // Load saved chats and theme from local storage and apply/add on the page
  const themeColor = localStorage.getItem('themeColor');

  document.body.classList.toggle('light-mode', themeColor === 'light_mode');
  themeButton.innerText = document.body.classList.contains('light-mode')
    ? 'dark_mode'
    : 'light_mode';

  const defaultText = `<div class="default-text">
                            <h1>AYUR AI</h1>
                            
                            <p>Start a conversation and explore the power of AI.<br> Your chat history will be displayed here <br> Say hi/hello to begin.</p>
                        </div>`;

  chatContainer.innerHTML = localStorage.getItem('all-chats') || defaultText;
  chatContainer.scrollTo(0, chatContainer.scrollHeight); // Scroll to bottom of the chat container
};

const createChatElement = (content, className) => {
  // Create new div and apply chat, specified class and set html content of div
  const chatDiv = document.createElement('div');
  chatDiv.classList.add('chat', className);
  chatDiv.innerHTML = content;
  return chatDiv; // Return the created chat div
};


// Define the symptoms array
const symptoms = [
  "hello",
  "hi",
  "Hey",
  "ok",
  "lean",
  "Medium",
  "well build",
  "rough",
  "scanty and grey",
  "curly",
  "dry",
  "more moles or freckles",
  "smooth and moist",
  "dull or darkish",
  "fair",
  "whitish",
  "rapid and unsted",
  "Normal",
  "Less",
  "variable",
  "Strong",
  "constant",
  "fast",
  "unusual",
  "slow",
  "normal",
  "abundantly",
  "less",
  "short-term",
  "average",
  "long-term",
  "disrupted",
  "little but sound",
  "abundant",
  "cold",
  "hot",
  "not specified",
  "poor",
  "medium",
  "good",
  "Changes quickly",
  "Changes Slowly",
  "steady",
  "Ok",
];

// Define the phenotypes array
const phenotypes = [
  { symptoms: "hello", phenotype: " Hi there , I'm  Ayur your virtual guide on the fascinating journey of phenotype detection!\n To help  you to identify your prakruti, it's important to gather information about your physical, mental, and emotional characteristics. To provide you with the most accurate information, could you please describe any specific symptoms or concerns you have related to these areas? This will help me assist you better.\n\n Enter ok to continue " },
  { symptoms: "hi", phenotype: " Hi there , I'm  Ayur your virtual guide on the fascinating journey of phenotype detection!\n I'm here to help you assess your skin, hair, complexion, body type, and more. To provide you with the most accurate information, could you please describe any specific symptoms or concerns you have related to these areas? This will help me assist you better.\n\n Enter ok to continue " },

  { symptoms: "ok", phenotype: "please enter your body type (e.g., lean , Medium or well build)" },
  { symptoms: "lean", phenotype: "Type of hair (e.g., rough , scanty and grey , curly) " },
  { symptoms: "Medium", phenotype: "Type of hair (e.g., rough , scanty and grey , curly)" },
  { symptoms: "well build", phenotype: "Type of hair (e.g., rough , scanty and grey , curly)" },
  { symptoms: "rough", phenotype: "Skin type (e.g., dry , more moles or freckles , smooth and moist)" },
  { symptoms: "scanty and grey", phenotype: "Skin type (e.g., dry , more moles or freckles , smooth and moist)" },
  { symptoms: "curly", phenotype: "Skin type (e.g., dry , more moles or freckles , smooth and moist)" },
  { symptoms: "dry", phenotype: "Complexion (e.g., dull or darkish , fair , whitish(pale))" },
  { symptoms: "more moles or freckles", phenotype: "Complexion (e.g., dull or darkish , fair , whitish(pale))" },
  { symptoms: "smooth and moist", phenotype: "Complexion (e.g., dull or darkish , fair , whitish(pale))" },
  { symptoms: "dull or darkish", phenotype: "Body movement (e.g., rapid and unstedy , Normal , Less)" },
  { symptoms: "fair", phenotype: "Body movement (e.g., rapid and unstedy , Normal , Less)" },
  { symptoms: "whitish", phenotype: "Body movement (e.g., rapid and unstedy , Normal , Less)" },
  { symptoms: "rapid and unstedy", phenotype: "Hunger/Appetite(e.g., variable , Strong , constant )" },
  { symptoms: "Normal", phenotype: "Hunger/Appetite(e.g., variable , Strong , constant )" },
  { symptoms: "Less", phenotype: "Hunger/Appetite(e.g., variable , Strong , constant )" },
  { symptoms: "variable", phenotype: "Habit of taking food (e.g., fast , unusual , slow)" },
  { symptoms: "Strong", phenotype: "Habit of taking food (e.g., fast , unusual , slow)" },
  { symptoms: "constant", phenotype: "Habit of taking food (e.g., fast , unusual , slow)" },
  { symptoms: "fast", phenotype: "Thirst (e.g., normal , abundantly , less)" },
  { symptoms: "unusual", phenotype: "Thirst (e.g., normal , abundantly , less)" },
  { symptoms: "slow", phenotype: "Thirst (e.g., normal , abundantly , less)" },
  { symptoms: "normal", phenotype: "Memory (e.g., short-term , average , long-term)" },
  { symptoms: "abundantly", phenotype: "Memory (e.g., short-term , average , long-term)" },
  { symptoms: "less", phenotype: "Memory (e.g., short-term , average , long-term)" },
  { symptoms: "short-term", phenotype: "Sleep (e.g., disrupted , little but sound , abundant)" },
  { symptoms: "average", phenotype: "Sleep (e.g., disrupted , little but sound , abundant)" },
  { symptoms: "long-term", phenotype: "Sleep (e.g., disrupted , little but sound , abundant)" },
  { symptoms: "disrupted", phenotype: "Intolerance to (e.g., cold , hot , not specified)" },
  { symptoms: "little but sound", phenotype: "Intolerance to (e.g., cold , hot , not specified)" },
  { symptoms: "abundant", phenotype: "Intolerance to (e.g., cold , hot , not specified)" },
  { symptoms: "cold", phenotype: "Resistance to disease (e.g., poor , medium , good)" },
  { symptoms: "hot", phenotype: "Resistance to disease (e.g., poor , medium , good)" },
  { symptoms: "not specified", phenotype: "Resistance to disease (e.g., poor , medium , good)" },
  { symptoms: "poor", phenotype: "Mood (e.g., Changes quickly , Changes Slowly , steady)" },
  { symptoms: "medium", phenotype: "Mood (e.g., Changes quickly , Changes Slowly , steady)" },
  { symptoms: "good", phenotype: "Mood (e.g., Changes quickly , Changes Slowly , steady)" },
  { symptoms: "Changes quickly", phenotype: " According to the symptoms provided by you 'Vata' is your dominant dosha as per ayurveda.\n\nVata is associated with the elements of air and ether (space). It is considered the most subtle and mobile of the three doshas and is responsible for functions related to movement. \n\nVata dosha can be kept balanced through dietary choices, lifestyle modifications, herbal remedies, and specific therapies tailored to the individual's constitution and current state of health. Balancing Vata dosha is thought to promote overall well-being and prevent health problems associated with its excess. It's important to note that Ayurvedic treatments are highly individualized, and what works for one person may not be suitable for another, so consulting with an Ayurvedic practitioner is advisable." },
  { symptoms: "Changes Slowly", phenotype: "According to the symptoms provided by you 'Pitta' is your dominant dosha as per ayurveda.\n\nPitta is associated with the elements of fire and water. It is considered the dosha responsible for transformation and metabolism in the body.\n\nTo keep Pitta dosha balance and promote overall well-being, Ayurvedic practitioners recommend dietary and lifestyle choices tailored to an individual's constitution and current state of health. This may include cooling foods, stress management techniques, and herbal remedies. Balancing Pitta dosha is considered essential for maintaining good health and preventing diseases associated with its excess. Ayurvedic treatments are highly individualized, so consulting with an Ayurvedic practitioner is advisable for personalized guidance." },
  { symptoms: "steady", phenotype: "According to the symptoms provided by you 'Kapha' is your dominant dosha as per ayurveda.\n\nKapha is associated with the elements of earth and water. It is considered the dosha responsible for stability, structure, and lubrication in the body.\n\nTo balance Kapha dosha and promote overall well-being, Ayurvedic practitioners recommend dietary and lifestyle choices tailored to an individual's constitution and current state of health. This may include a diet that includes lighter, drier, and warmer foods, regular exercise, and herbal remedies. Balancing Kapha dosha is considered important for maintaining good health and preventing diseases associated with its excess. Ayurvedic treatments are highly individualized, so consulting with an Ayurvedic practitioner is advisable for personalized guidance." },
  {symptoms:"Ok",phenotype:"Your satisfaction is my priority, and I hope I've met your expectations. Thank you for visiting us today , your support is cherished."}
];

// Define the getChatResponse function and other code here...


const getChatResponse = async (incomingChatDiv) => {
  const API_URL = 'https://api.openai.com/v1/completions';
  const pElement = document.createElement('p');

  // Check if userText matches any of the symptoms
  const matchedSymptom = symptoms.find((item) => userText.includes(item));

  if (matchedSymptom) {
    // If a symptom is matched, get the corresponding phenotype
    const matchedPhenotype = phenotypes.find((item) => item.symptoms === matchedSymptom);

    if (matchedPhenotype) {
      // Set the phenotype as the response
      pElement.textContent = matchedPhenotype.phenotype;
    } else {
      pElement.textContent = 'No phenotype found for the matched symptom.';
    }
  } else {
    // If no symptom is matched, proceed with the original API call
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: userText,
        max_tokens: 2048,
        temperature: 0.2,
        n: 1,
        stop: null,
      }),
    };

    try {
      const response = await (await fetch(API_URL, requestOptions)).json();
      pElement.textContent = response.choices[0].text.trim();
    } catch (error) {
      pElement.classList.add('error');
      pElement.textContent =
        'Oops! Something went wrong while retrieving the response. Please try again.';
    }
  }

  incomingChatDiv.querySelector('.typing-animation').remove();
  incomingChatDiv.querySelector('.chat-details').appendChild(pElement);
  localStorage.setItem('all-chats', chatContainer.innerHTML);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
};

const copyResponse = (copyBtn) => {
  // Copy the text content of the response to the clipboard
  const reponseTextElement = copyBtn.parentElement.querySelector('p');
  navigator.clipboard.writeText(reponseTextElement.textContent);
  copyBtn.textContent = 'done';
  setTimeout(() => (copyBtn.textContent = 'content_copy'), 1000);
};

const showTypingAnimation = () => {
  // Display the typing animation and call the getChatResponse function
  // <div>Hello,I am Ayur your phenotype detector.Please provide me some of your symptoms related to your hairs,skin,complexion etc,and I will help you to identify your phenotype.</div> 
  const html = `<div class="chat-content">
                    <div class="chat-details">
                    <img src="logo.png" alt="user-img">
                        <div class="typing-animation">
                            <div class="typing-dot" style="--delay: 0.2s"></div>
                            <div class="typing-dot" style="--delay: 0.3s"></div>
                            <div class="typing-dot" style="--delay: 0.4s"></div>
                        </div>
                    </div>
                    <span onclick="copyResponse(this)" class="material-symbols-rounded">content_copy</span>
                </div>`;
  // Create an incoming chat div with typing animation and append it to chat container
  const incomingChatDiv = createChatElement(html, 'incoming');
  chatContainer.appendChild(incomingChatDiv);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
  getChatResponse(incomingChatDiv);
};

const handleOutgoingChat = () => {
  userText = chatInput.value.trim(); // Get chatInput value and remove extra spaces
  if (!userText) return; // If chatInput is empty return from here

  // Clear the input field and reset its height
  chatInput.value = '';
  chatInput.style.height = `${initialInputHeight}px`;

  const html = `<div class="chat-content">
                    <div class="chat-details">
                       
                        <p>${userText}</p>
                    </div>
                </div>`;

  // Create an outgoing chat div with user's message and append it to chat container
  const outgoingChatDiv = createChatElement(html, 'outgoing');
  chatContainer.querySelector('.default-text')?.remove();
  chatContainer.appendChild(outgoingChatDiv);
  chatContainer.scrollTo(0, chatContainer.scrollHeight);
  setTimeout(showTypingAnimation, 500);
};

deleteButton.addEventListener('click', () => {
  // Remove the chats from local storage and call loadDataFromLocalstorage function
  if (confirm('Are you sure you want to delete all the chats?')) {
    localStorage.removeItem('all-chats');
    loadDataFromLocalstorage();
  }
});

themeButton.addEventListener('click', () => {
  // Toggle body's class for the theme mode and save the updated theme to the local storage
  document.body.classList.toggle('light-mode');
  localStorage.setItem('themeColor', themeButton.innerText);
  themeButton.innerText = document.body.classList.contains('light-mode')
    ? 'dark_mode'
    : 'light_mode';
});

const initialInputHeight = chatInput.scrollHeight;

chatInput.addEventListener('input', () => {
  // Adjust the height of the input field dynamically based on its content
  chatInput.style.height = `${initialInputHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener('keydown', (e) => {
  // If the Enter key is pressed without Shift and the window width is larger
  // than 800 pixels, handle the outgoing chat
  if (e.key === 'Enter' && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleOutgoingChat();
  }
});

loadDataFromLocalstorage();
sendButton.addEventListener('click', handleOutgoingChat);