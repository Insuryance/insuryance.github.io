document.addEventListener("DOMContentLoaded", function () {
    const terminalOutput = document.getElementById("terminal-output");
    const terminalInput = document.getElementById("terminal-input");

    const commands = {
        help: "Available commands: <br><span class='cmd'>about</span> - About Me <br><span class='cmd'>projects</span> - My Projects <br><span class='cmd'>contact</span> - Contact Info <br><span class='cmd'>clear</span> - Clear Terminal",
        about: "Hi, I'm [Your Name], a passionate developer building cool projects.",
        projects: "1. Portfolio Website<br>2. JavaScript Terminal<br>3. Other cool stuff",
        contact: "Email: your@email.com<br>GitHub: github.com/yourprofile",
        clear: function () {
            terminalOutput.innerHTML = "";
        },
    };

    function executeCommand(input) {
        const command = input.toLowerCase().trim();
        if (command === "") return;

        const userInputHtml = `<div class="command-line"><span class="prompt">></span> ${command}</div>`;
        terminalOutput.innerHTML += userInputHtml;

        if (commands[command]) {
            if (typeof commands[command] === "function") {
                commands[command](); // Run function (for clear)
            } else {
                terminalOutput.innerHTML += `<div class="response">${commands[command]}</div>`;
            }
        } else {
            terminalOutput.innerHTML += `<div class="error">Command not found. Type 'help' for a list of commands.</div>`;
        }

        terminalOutput.scrollTop = terminalOutput.scrollHeight; // Auto-scroll
    }

    terminalInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            executeCommand(terminalInput.value);
            terminalInput.value = ""; // Clear input
        }
    });

    // Auto-focus on terminal input
    document.addEventListener("click", function () {
        terminalInput.focus();
    });
});
