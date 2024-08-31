// script.js
let pyodideReadyPromise = loadPyodide().then(() => {
    console.log("Pyodide loaded!");
    // Optionally, you can load additional packages here if needed.
});

async function runPythonCode() {
    let pyodide = await pyodideReadyPromise; // Ensure Pyodide is loaded
    let code = document.getElementById('code').value; // Get code from textarea
    
    try {
        let result = await pyodide.runPythonAsync(code); // Run Python code
        document.getElementById('output').innerText = result; // Display result
        sendToDiscord(result);  // Send output to your Discord webhook
    } catch (e) {
        document.getElementById('output').innerText = "Error: " + e; // Handle errors
    }
}

function sendToDiscord(content) {
    const webhookURL = 'https://discord.com/api/webhooks/1278601551769899039/I89lOy1BzTEzkwCBM8nKLi2CqpTQiogCY9gW3qFOmBT-c7p2M00D11nOZSHEKjqsIuH8'; // Replace with your actual webhook URL
    
    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: content })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        console.log('Message sent to Discord:', content);
    })
    .catch(error => {
        console.error('There was a problem sending to Discord:', error);
    });
}

document.getElementById('run-button').addEventListener('click', runPythonCode);
