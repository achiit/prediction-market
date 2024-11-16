// src/utils/openai.js

export const OPENAI_API_KEY = 'your-api-key-here'; // Store this securely in environment variables
export const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export const getAiSuggestions = async (category = 'all') => {
  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer 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`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "user",
          content: `Generate 3 yes/no prediction market questions about current real-world events in sports. 
                    Focus on upcoming events that will have clear outcomes within the next week to month. 
                    For only different categories of sports, only include actual scheduled matches or tournaments.
                    Return only the questions, each on a new line. Not the count
                    Each question must have a clear yes/no outcome that can be verified.
                    Example format:

                    Will Manchester United win their next Premier League match?
`
        }],
        temperature: 0.7,
        max_tokens: 200
      })
    });

    if (!response.ok) {
      throw new Error('Failed to get AI suggestions');
    }

    const data = await response.json();
    return data.choices[0].message.content.split('\n').filter(q => q.trim());
  } catch (error) {
    console.error('Error getting AI suggestions:', error);
    throw error;
  }
};