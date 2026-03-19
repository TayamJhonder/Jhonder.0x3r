const express = require('express');
const OpenAI = require('openai');
const app = express();
const path = require('path');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// OpenRouter configuration para kay Jhonder AI
const openrouter = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: "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",
    defaultHeaders: {
        "HTTP-Referer": "http://localhost:3000", 
        "X-Title": "Jhonder AI"
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/chat', async (req, res) => {
    try {
        console.log("📨 User:", req.body.message);
        
        // Jhonder AI - personalized na response
        const completion = await openrouter.chat.completions.create({
            model: "deepseek/deepseek-chat",
            messages: [
                { 
                    role: "system", 
                    content: `You are Jhonder AI, a friendly and helpful AI assistant created by Jhonder Tayam. 
                    You are integrated into Jhonder's personal portfolio website. Here's information about Jhonder:
                    
                    - Full Name: Jhonder Tayam
                    - Education: 2nd Year College, BSCS
                    - Institution: CCDI Computer Communication Development Institute, Sorsogon City
                    - Location: Sorsogon City, Philippines
                    - Height: 5'7", Weight: 54 kg
                    - Favorite Colors: Crimson, Floral, Maroon
                    
                    Favorite Songs: Marilag, Sining, Beat It, Star Boy, Replay, Wet The Bed, 
                    Heart Attack (Demi Lovato), A Thousand Miles (Vanessa Carlton), One Thing (One Direction)
                    
                    Skills: HTML/CSS, JavaScript, Python, Database Management, C++, C#, Windows Forms, Arduino
                    
                    Projects: 
                    1. Arduino Radar Object Detector (C++) - real-time radar system
                    2. Student Grading System (C# Windows Forms)
                    3. Milo Marathon Registration System (C# Windows Forms)
                    4. Home Credit Calculator (C# Windows Forms)
                    5. Mouse Trail Animation (HTML/CSS/JavaScript)
                    
                    You should answer questions about Jhonder, his projects, skills, and help visitors 
                    navigate his portfolio. Be warm, friendly, and conversational. Use "Jhonder AI" as your name.`
                },
                { 
                    role: "user", 
                    content: req.body.message 
                }
            ],
            temperature: 0.7,
            max_tokens: 1000
        });

        const response = completion.choices[0].message.content;
        console.log("🤖 Jhonder AI responded");
        
        res.json({ response: response });

    } catch (error) {
        console.error("❌ Error:", error);
        
        // Backup response kung mag-error ang API
        res.json({ 
            response: "Hi! I'm Jhonder AI. I'm having a little trouble connecting right now, but feel free to explore Jhonder's portfolio! You can check out his projects, skills, or use the contact form to reach out directly. 😊" 
        });
    }
});

app.listen(3000, '0.0.0.0', () => {
    console.log('\n🚀 JHONDER AI IS RUNNING!');
    console.log('📍 http://localhost:3000');
    console.log('🤖 Your personal AI assistant is ready!\n');
});
