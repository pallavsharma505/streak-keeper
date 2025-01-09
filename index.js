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
	console.log("Fetching Article");
    const groqApiKey = process.env.GROQ_API_KEY;
    const modelId = "llama3-8b-8192";
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
console.log(JSON.stringify(data, null, 4));
    const output = data.choices[0].message.content;
    writeFileSync("./data/" + new Date().getTime() + ".md", output);
	console.log("Article Ready, pushing to git");
    await exec("git add .", (err, stdout, stderr) => {console.log(stdout)});
    await exec('git commit -m "'+ new Date().getTime() + ".md" +'"', (err, stdout, stderr) => {console.log(stdout)});
    await exec("git push", (err, stdout, stderr) => {console.log(stderr)});
	const time = Math.random() * 3600000 * 2;
    setTimeout(init, time);
	console.log("Scheduled Next for:", time/60000, "mins");
}

init();
