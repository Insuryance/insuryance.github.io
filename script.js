document.addEventListener("DOMContentLoaded", function() {
    const app = document.getElementById("app");

    // Create the terminal output container
    const terminalOutput = document.createElement("div");
    terminalOutput.id = "terminal-output";
    app.appendChild(terminalOutput);

    // Create the input field
    const terminalInput = document.createElement("input");
    terminalInput.id = "terminal-input";
    terminalInput.type = "text";
    terminalInput.placeholder = "Type a command...";
    app.appendChild(terminalInput);
    
    terminalInput.focus();

    // Handle user input
    terminalInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            let inputValue = terminalInput.value.trim().toLowerCase();
            terminalInput.value = "";

            let response = interpretCommand(inputValue);
            terminalOutput.innerHTML += `<p>> ${inputValue}</p><p>${response}</p>`;
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    });

    window.onload = function () {
    const bootText = [
        "Initializing system...",
        "Loading user environment...",
        "Checking network connection...",
        "Welcome to Insuryance Terminal!"
    ];

    const terminalOutput = document.getElementById("terminal-output");

    let index = 0;
    function showBootText() {
        if (index < bootText.length) {
            let bootLine = document.createElement("p");
            terminalOutput.appendChild(bootLine);
            typeResponse(bootText[index], bootLine);
            index++;
            setTimeout(showBootText, 700);
        } else {
            let welcomeLine = document.createElement("p");
            welcomeLine.innerHTML = "Type 'help' to get started.";
            terminalOutput.appendChild(welcomeLine);
        }
    }
    showBootText();
};

    function interpretCommand(command) {
        switch (command) {
            case "help":
                return "Available commands: about, portfolio, contact, switch";
            case "about":
                return "Hi, I'm Suryansham, was tweaking with innovation at PhonePe before, currently the founder of FinLead AI.";
            case "portfolio":
                return "I kinda have my portfolio spilled out in various spaces, places and domains. \n Check me out on Linkedin first! https://www.linkedin.com/in/suryanshamtiwari";
            case "contact":
                return "Email: isitsuryansham@gmail.com";
            case "switch":
                document.body.classList.toggle("normal-mode");
                return "Switched to normal mode!";
            default:
                return "Command not recognized. Type 'help' for a list of commands.";
        }
    }
});

