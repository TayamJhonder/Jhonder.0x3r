const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const API_KEY = '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';

app.use(express.static(path.join(__dirname)));
app.use(express.json());

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Chat endpoint
app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        console.log('📨 User message:', message);
        
        const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
            model: 'openai/gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are Jhonder AI Assistant, created by Jhonder. Be helpful and friendly. Answer questions about Jhonder Tayam, his projects, skills, and anything else.'
                },
                {
                    role: 'user',
                    content: message
                }
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://jhonder-ai.vercel.app',
                'X-Title': 'Jhonder AI'
            }
        });

        const reply = response.data.choices[0].message.content;
        console.log('🤖 AI reply sent');
        
        res.json({ response: reply });

    } catch (error) {
        console.error('❌ Error:', error.response?.data || error.message);
        res.json({ response: 'Error: ' + (error.response?.data?.error?.message || error.message) });
    }
});

// For local development
if (require.main === module) {
    app.listen(3000, '0.0.0.0', () => {
        console.log('\n🚀 JHONDER AI SERVER RUNNING!');
        console.log('📍 http://localhost:3000');
        console.log('🤖 Using GPT-3.5-Turbo model\n');
    });
}

module.exports = app;
