const API_KEY = "YOUR-API-HERE";

async function askGemini(userPrompt) {

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text:
`You are a command parser.

Return ONLY valid JSON.

Possible actions:
save
open
delete
rename

Examples:

Input:
Save current tabs as Study

Output:
{"action":"save","workspace":"Study"}

Input:
Open Hackathon

Output:
{"action":"open","workspace":"Hackathon"}

Input:
Delete Study

Output:
{"action":"delete","workspace":"Study"}

Input:
Rename Study to Semester 1

Output:
{"action":"rename","oldName":"Study","newName":"Semester 1"}

Input:
Add current tabs to Study

Output:
{"action":"update","workspace":"Study"}

User:
${userPrompt}`
                            }
                        ]
                    }
                ]
            })
        }
    );

    const data = await response.json();

   const text = data.candidates[0].content.parts[0].text;

const cleanText = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

return JSON.parse(cleanText);

}