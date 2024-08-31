let pyodideReadyPromise = loadPyodide();

async function runPythonCode() {
    let pyodide = await pyodideReadyPromise; // Ensure Pyodide is loaded
    let code = document.getElementById('code').value; // Get code from textarea
    
    try {
        let result = await pyodide.runPythonAsync(code); // Run Python code
        document.getElementById('output').innerText = result; // Display result
    } catch (e) {
        document.getElementById('output').innerText = "Error: " + e; // Handle errors
    }
}

document.getElementById('run-button').addEventListener('click', runPythonCode);
