document.addEventListener("DOMContentLoaded", function() {
    const app = document.getElementById("app");
    
    // Create the terminal output container
    const terminalOutput = document.createElement("div");
    terminalOutput.id = "terminal-output";
    app.appendChild(terminalOutput);

    // Create the input field container
    const terminalInputContainer = document.createElement("div");
    terminalInputContainer.id = "terminal-input-container";
    terminalInputContainer.innerHTML = "<span class='prompt'>\u03BB :: ~ &gt;&gt;</span> ";
    
    // Create the input field
    const terminalInput = document.createElement("input");
    terminalInput.id = "terminal-input";
    terminalInput.type = "text";
    terminalInput.autofocus = true;  // Ensure input is active
    
    terminalInputContainer.appendChild(terminalInput);
    app.appendChild(terminalInputContainer);
    
    terminalInput.focus();

    // Boot-up welcome text
    const bootText = [
        "insuryance:$ type help to start", 
        "<a href='#' onclick='switchToNormalMode()'>Visit Normal website</a>",
        ""
    ];

    let index = 0;
    function showBootText() {
        if (index < bootText.length) {
            let bootLine = document.createElement("p");
            bootLine.innerHTML = bootText[index];
            terminalOutput.appendChild(bootLine);
            index++;
            setTimeout(showBootText, 700);
        }
    }
    showBootText();

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

    function interpretCommand(command) {
        switch (command) {
            case "help":
                return "Available commands: about, portfolio, contact, switch";
            case "about":
                return "Hi, I'm Suryansham, was tweaking with innovation at PhonePe before, currently the founder of FinLead AI.";
            case "portfolio":
                return "I kinda have my portfolio spilled out in various spaces, places and domains. \n Check me out on <a href='https://www.linkedin.com/in/suryanshamtiwari' target='_blank'>LinkedIn</a>";
            case "contact":
                return "Email: <a href='mailto:isitsuryansham@gmail.com'>isitsuryansham@gmail.com</a>";
            case "switch":
                document.body.classList.toggle("normal-mode");
                return "Switched to normal mode!";
            default:
                return "Command not recognized. Type 'help' for a list of commands.";
        }
    }

    function switchToNormalMode() {
        document.body.classList.add("normal-mode");
    }
});
