import axios from 'axios';

// Configuration for different AI providers
const AI_CONFIG = {
  // You can configure different AI providers here
  OPENAI: {
    baseURL: 'https://api.openai.com/v1',
    model: 'gpt-3.5-turbo'
  },
  ANTHROPIC: {
    baseURL: 'https://api.anthropic.com/v1',
    model: 'claude-3-sonnet-20240229'
  }
};

// Mock AI responses for demo purposes
const MOCK_RESPONSES = [
  "That's an interesting question! Let me think about it...",
  "I'd be happy to help you with that. Here's what I think:",
  "Based on my understanding, I can provide you with the following insights:",
  "Great question! Here's my perspective on this topic:",
  "I see what you're asking about. Let me break this down for you:",
  "That's a fascinating topic to explore. Here are some key points:",
  "I understand your question. Here's a comprehensive answer:",
  "Excellent question! I can help clarify this for you:",
  "Let me provide you with a detailed explanation:",
  "This is an important topic. Here's what you should know:"
];

const TOPIC_RESPONSES = {
  'programming': [
    "Programming is a creative and logical process. What specific language or concept would you like to explore?",
    "Code is poetry in motion! Are you working on a particular project or learning a new technology?",
    "The world of programming is vast and exciting. What aspect interests you most?"
  ],
  'science': [
    "Science helps us understand the universe around us. What scientific field fascinates you?",
    "The scientific method is a powerful tool for discovery. What would you like to explore?",
    "From quantum physics to biology, science offers endless wonders to discover."
  ],
  'technology': [
    "Technology shapes our world in incredible ways. What technological advancement interests you?",
    "The pace of technological change is accelerating. What would you like to know more about?",
    "From AI to quantum computing, technology opens new possibilities every day."
  ],
  'ai': [
    "Artificial Intelligence is revolutionizing how we work and live. What aspect of AI interests you?",
    "AI has the potential to solve complex problems and augment human capabilities.",
    "Machine learning and neural networks are fascinating fields with endless possibilities."
  ]
};

// Simulate AI response delay
const simulateDelay = (min = 1000, max = 3000) => {
  const delay = Math.random() * (max - min) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};

// Generate contextual response based on user input
const generateContextualResponse = (userInput) => {
  const input = userInput.toLowerCase();
  
  // Check for specific topics
  for (const [topic, responses] of Object.entries(TOPIC_RESPONSES)) {
    if (input.includes(topic)) {
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  
  // Check for greetings
  if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
    return "Hello! I'm your AI assistant. How can I help you today?";
  }
  
  // Check for questions about the AI itself
  if (input.includes('what are you') || input.includes('who are you')) {
    return "I'm an AI assistant built with React and designed to help answer your questions and have meaningful conversations. What would you like to know?";
  }
  
  // Check for help requests
  if (input.includes('help') || input.includes('how to')) {
    return "I'm here to help! You can ask me about programming, science, technology, or any topic you're curious about. What would you like assistance with?";
  }
  
  // Default responses with some context awareness
  const responses = [
    `Regarding "${userInput.slice(0, 20)}${userInput.length > 20 ? '...' : ''}", here's what I think: ${MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)]}`,
    `That's an interesting point about ${userInput.split(' ')[0]}. ${MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)]}`,
    MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)]
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

// Main function to generate AI response
export const generateAIResponse = async (userInput) => {
  try {
    // Simulate network delay
    await simulateDelay();
    
    // Check if we have API key for real AI service
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY || process.env.REACT_APP_ANTHROPIC_API_KEY;
    
    if (apiKey && process.env.REACT_APP_USE_REAL_AI === 'true') {
      // Use real AI API (OpenAI example)
      return await callOpenAI(userInput, apiKey);
    } else {
      // Use mock response for demo
      return generateContextualResponse(userInput);
    }
  } catch (error) {
    console.error('Error in generateAIResponse:', error);
    throw new Error('Failed to generate AI response');
  }
};

// OpenAI API call (requires API key)
const callOpenAI = async (userInput, apiKey) => {
  try {
    const response = await axios.post(
      `${AI_CONFIG.OPENAI.baseURL}/chat/completions`,
      {
        model: AI_CONFIG.OPENAI.model,
        messages: [
          {
            role: 'system',
            content: 'You are a helpful AI assistant. Provide clear, concise, and helpful responses.'
          },
          {
            role: 'user',
            content: userInput
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
};

// Alternative: Anthropic Claude API call
const callClaude = async (userInput, apiKey) => {
  try {
    const response = await axios.post(
      `${AI_CONFIG.ANTHROPIC.baseURL}/messages`,
      {
        model: AI_CONFIG.ANTHROPIC.model,
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: userInput
          }
        ]
      },
      {
        headers: {
          'x-api-key': apiKey,
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01'
        }
      }
    );
    
    return response.data.content[0].text;
  } catch (error) {
    console.error('Claude API error:', error);
    throw error;
  }
};

// Export utility functions for testing
export { generateContextualResponse, simulateDelay };