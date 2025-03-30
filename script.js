<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Insuryance Terminal</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="app">
        <div id="terminal">
            <div id="terminal-output"></div>
            <div id="terminal-input-container">
                <span>&gt;</span>
                <input type="text" id="terminal-input" autofocus>
            </div>
        </div>
    </div>
    <script src="script.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            const terminalOutput = document.getElementById("terminal-output");
            const terminalInput = document.getElementById("terminal-input");
            
            function typeResponse(text, element) {
                let index = 0;
                function type() {
                    if (index < text.length) {
                        element.innerHTML += text[index];
                        index++;
                        setTimeout(type, 30);
                    }
                }
                type();
            }
            
            const bootMessages = [
                "Initializing system...",
                "Loading user environment...",
                "Checking network connection...",
                "Welcome to Insuryance's Terminal!"
            ];
            
            let index = 0;
            function showBootMessages() {
                if (index < bootMessages.length) {
                    let line = document.createElement("p");
                    terminalOutput.appendChild(line);
                    typeResponse(bootMessages[index], line);
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
                    terminalOutput.innerHTML += `<p>&gt; ${inputValue}</p><p>${response}</p>`;
                    terminalOutput.scrollTop = terminalOutput.scrollHeight;
                }
            });
            
            function interpretCommand(command) {
                switch (command) {
                    case "help":
                        return "Available commands: about, portfolio, contact, switch";
                    case "about":
                        return "Hi, I'm Suryansham, was tweaking with innovation at PhonePe before, currently the founder of FinLead AI.";
                    case "portfolio":
                        return "I kinda have my portfolio spilled out in various spaces, places and domains.\n Check me out on Linkedin first! <a href='https://www.linkedin.com/in/suryanshamtiwari' target='_blank'>LinkedIn</a>";
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
    </script>
</body>
</html>
