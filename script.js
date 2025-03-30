document.addEventListener("DOMContentLoaded", function() {
    const app = document.getElementById("app");

    // Create the terminal output container
    const terminalOutput = document.createElement("div");
    terminalOutput.id = "terminal-output";
    app.appendChild(terminalOutput);

    // Create the input field container
    const inputContainer = document.createElement("div");
    inputContainer.id = "terminal-input-container";
    inputContainer.innerHTML = `<span>&gt; </span>`;

    // Create the input field
    const terminalInput = document.createElement("input");
    terminalInput.id = "terminal-input";
    terminalInput.type = "text";
    terminalInput.autofocus = true;
    inputContainer.appendChild(terminalInput);
    app.appendChild(inputContainer);
    
    terminalInput.focus();

    // Fake boot-up animation
    const bootText = [
        "Initializing system...",
        "Loading user environment...",
        "Checking network connection...",
        "Welcome to Insuryance's Terminal!"
    ];

    function showBootText(index = 0) {
        if (index < bootText.length) {
            typeResponse(bootText[index], () => showBootText(index + 1));
        } else {
            typeResponse("Type 'help' to get started.");
        }
    }
    showBootText();

    // Handle user input
    terminalInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            let inputValue = terminalInput.value.trim().toLowerCase();
            terminalInput.value = "";

            if (inputValue) {
                terminalOutput.innerHTML += `<p>&gt; ${inputValue}</p>`;
                typeResponse(interpretCommand(inputValue));
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }
        }
    });

    function typeResponse(text, callback) {
        const responseElement = document.createElement("p");
        responseElement.className = "typed-text";
        terminalOutput.appendChild(responseElement);

        let i = 0;
        function type() {
            if (i < text.length) {
                responseElement.textContent += text[i];
                i++;
                setTimeout(type, 50);
            } else if (callback) {
                setTimeout(callback, 500);
            }
        }
        type();
    }

    function interpretCommand(command) {
        switch (command) {
            case "help":
                return "Available commands: about, portfolio, contact, switch";
            case "about":
                return "Hi, I'm Suryansham, was tweaking with innovation at PhonePe before, currently the founder of FinLead AI.";
            case "portfolio":
                return "I kinda have my portfolio spilled out in various spaces, places and domains. \n Check me out on Linkedin first! <a href='https://www.linkedin.com/in/suryanshamtiwari' target='_blank'>LinkedIn</a>";
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
