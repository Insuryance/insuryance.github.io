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
                return "Available commands: about, portfolio, contact, media_coverage, patents, hackathons, blogs, switch";
            case "about":
                return "Hi, I'm Suryansham, was an early bird for Insurance at PhonePe before, before that, I had my own company BlueVelocity Technologies Private Limited. <br>"
                + " Before to Before that, I was building a bunch of products, winning hackathons (passive income during my college days), enjoying life. <br>"
                + " Currently, I'm more focused towards the FinTech space. Aiming to connect the fintech dots with the AI eco-sphere.";
            case "portfolio":
                return " I kinda have my portfolio spilled out in various spaces, places and domains. I've made products both in the hardware and the software space. <br>"
                + " I might have a few patents as well? Got multiple grants in the hardware and the software projects as well. If you're lurking, Google it out man! <br>" 
                + " Check me out on <a href='https://www.linkedin.com/in/suryanshamtiwari' target='_blank'>LinkedIn</a>";
            case "contact":
                return "Email: <a href='mailto:isitsuryansham@gmail.com'>isitsuryansham@gmail.com</a>";
            case "switch":
                document.body.classList.toggle("normal-mode");
                return "Switched to normal mode!";
            case "media_coverage":
                return "<a href='https://www.northeasttoday.in/2022/04/09/tripura-suryansham-t-sonali-rastogi-from-nit-agartala-tops-in-hyundai-social-creator-awards-2021/' target='_blank'>NorthEastToday</a> <br>"
                + "<a href='https://tripuranet.com/tnet/hyundai-awards-two-nit-%E2%80%93agt-students-top-10-finalists-1871.html' target='_blank'>TripuraNet</a> <br>"
                + "<a href='https://www.theweek.in/wire-updates/business/2021/03/23/pwr1-hyundai-motor-india-foundation.html' target='_blank'>TheWeek</a> <br>"
                +"<a href='https://www.devdiscourse.com/article/education/1506202-hyundai-motor-india-foundation-announces-the-winner-of-h-social-creator-2020' target='_blank'>RandomMediaOutlet</a> <br> "
                + "<a href='https://www.businessworld.in/article/hyundai-motor-india-foundation-announces-winner-of-h-social-creator-2020-384562' target='_blank'>BusinessWorld</a> <br> "
                + "<a href='https://chennaiglitz.com/hyundai-motor-india-foundation-announces-the-winners-of-h-social-creator-2021/' target='_blank'>ChennaiGlitz</a> "
                + "and More. ";
            default:
                return "Command not recognized / Bhai dhang se type krle. Type 'help' for a list of commands.";
        }
    }

    function switchToNormalMode() {
        document.body.classList.add("normal-mode");
    }
});
