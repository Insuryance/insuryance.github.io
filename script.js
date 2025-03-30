document.addEventListener("DOMContentLoaded", function() {
    const terminalOutput = document.getElementById("terminal-output");
    const terminalInput = document.getElementById("terminal-input");
    
    function typeResponse(text, element, speed = 30) {
        let index = 0;
        function type() {
            if (index < text.length) {
                element.innerHTML += text[index];
                index++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    const bootMessages = [
        "Initializing system...",
        "Loading user environment...",
        "Checking network connection...",
        "Welcome to Insuryance Terminal!"
    ];
    
    let index = 0;
    function showBootMessages() {
        if (index < bootMessages.length) {
            let line = document.createElement("p");
            terminalOutput.appendChild(line);
            typeResponse(bootMessages[index], line, 50);
            index++;
            setTimeout(showBootMessages, 700);
        } else {
            let welcomeLine = document.createElement("p");
            welcomeLine.innerHTML = "Type 'help' to get started.";
            terminalOutput.appendChild(welcomeLine);
        }
    }
    
    showBootMessages();
    
    terminalInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            let inputValue = terminalInput.value.trim().toLowerCase();
            terminalInput.value = "";
            
            let response = interpretCommand(inputValue);
            let userInputLine = document.createElement("p");
            userInputLine.innerHTML = `&gt; ${inputValue}`;
            terminalOutput.appendChild(userInputLine);
            
            let responseLine = document.createElement("p");
            terminalOutput.appendChild(responseLine);
            typeResponse(response, responseLine, 20);
            
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    });
    
    function interpretCommand(command) {
        switch (command) {
            case "help":
                return "Available commands: about, portfolio, projects, contact, switch";
            case "about":
                return "Hi, I'm Suryansham, was tweaking with innovation at PhonePe before, currently the founder of FinLead AI.";
            case "portfolio":
                return "I kinda have my portfolio spilled out in various spaces, places and domains.\n Check me out on <a href='https://www.linkedin.com/in/suryanshamtiwari' target='_blank'>LinkedIn</a>!";
            case "projects":
                return "Here are some projects: \n - Project 1: AI Fintech Analysis \n - Project 2: Blockchain Innovations";
            case "contact":
                return "Email: <a href='mailto:isitsuryansham@gmail.com'>isitsuryansham@gmail.com</a>";
            case "switch":
                document.body.classList.toggle("normal-mode");
                return "Switched to normal mode!";
            default:
                return "Command not recognized. Type 'help' for a list of commands.";
        }
    }
});
