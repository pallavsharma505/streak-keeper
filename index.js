import { exec } from "child_process";
import { writeFileSync } from "fs";

// @TODO: Implement the following functionality:
// 1. Fetch article title from GROQ
// 2. Have AI generate an article based on the title
// 3. Write the article to a file
// 4. Stage the file with Git
// 5. Commit the file with Git
// 6. Push the commit to GitHub
// 7. Repeat the process every 1 hour
async function init() {
    const groqApiKey = process.env.GROQ_API_KEY;
    const modelId = "llama-3.3-70b-versatile";
    const url = "https://api.groq.com/openai/v1/chat/completions";
    const body = {
        model: modelId,
        messages: [
            {
                role: "system",
                content: "You are an intuitive and intelligent AI assistant.",
            },
            {
                role: "user",
                content: `Generate an article about a random topic regarding any programming language.`,
            },
        ],
    };
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${groqApiKey}`,
        },
        body: JSON.stringify(body),
    });
    const data = await response.json();
    const output = data.choices[0].message.content;
    writeFileSync("./data/" + new Date().getTime() + ".md", output);
    await exec("git stage .", (err, stdout, stderr) => {});
    await exec('git commit -m "Test Commit"', (err, stdout, stderr) => {});
    await exec("git push -u origin main", (err, stdout, stderr) => {});
}

init();
