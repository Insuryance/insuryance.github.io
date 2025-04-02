document.addEventListener("DOMContentLoaded", function () {
    const app = document.getElementById("app");

    // Create Title (InSuryance's Terminal → Surya's Terminal)
    const terminalTitle = document.createElement("h1");
    terminalTitle.id = "terminal-title";
    terminalTitle.innerHTML = `
        <span class="fall-container">
            <span class="fall">I</span>
            <span class="fall">n</span>
            <span>S</span>
            <span>u</span>
            <span>r</span>
            <span>y</span>
            <span>a</span>
            <span class="fall">n</span>
            <span class="fall">c</span>
            <span class="fall">e</span>
        </span>
        <span class="stay">'s Terminal</span>
    `;
    app.appendChild(terminalTitle);

    // Create the terminal output container
    const terminalOutput = document.createElement("div");
    terminalOutput.id = "terminal-output";
    app.appendChild(terminalOutput);

    // Create the input field container
    const terminalInputContainer = document.createElement("div");
    terminalInputContainer.id = "terminal-input-container";
    terminalInputContainer.innerHTML =
        "<span class='prompt'>\u03BB :: ~ &gt;&gt;</span> ";

    // Create the input field
    const terminalInput = document.createElement("input");
    terminalInput.id = "terminal-input";
    terminalInput.type = "text";
    terminalInput.autofocus = true;

    terminalInputContainer.appendChild(terminalInput);
    app.appendChild(terminalInputContainer);

    terminalInput.focus();

    // Boot-up welcome text
    const bootText = [
        "insuryance:$ type help to start",
        "<a href='#' onclick='switchToNormalMode()'>Visit Normal website</a>",
        "",
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

    // Falling animation for InSuryance letters
    setTimeout(() => {
        setTimeout(() => {
            document.querySelectorAll(".fall").forEach((letter) => {
                letter.style.animation = "fallDown 1s ease-out forwards";
            });

            // Move "'s" closer to "Surya"
            document.querySelector(".stay").style.transition =
                "transform 1s ease-in-out";
            document.querySelector(".stay").style.transform =
                "translateX(-10px)"; // Adjusted closer to Surya

            // Ensure smooth transition for final text
            setTimeout(() => {
                document.querySelector(".stay").style.opacity = "1"; // Final adjustment
            }, 2000);
        }, 5000); // Wait 5 seconds before starting the falling animation
    }, 2000); // Wait 2 seconds before starting the whole thing

    // Handle user input
    terminalInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            let inputValue = terminalInput.value.trim().toLowerCase();
            terminalInput.value = "";

            if (inputValue === "clear") {
                clearTerminal(); // Clear screen functionality
                return;
            }

            let response = interpretCommand(inputValue);
            const newLine = document.createElement('p');
            newLine.innerHTML = response;
            terminalOutput.appendChild(newLine);
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    });
    
    function interpretCommand(command) {
        switch (command) {
            case "help":
                return (
                    "Available commands: about, portfolio, contact, media_coverage, patents, hackathons, blogs, switch, clear <br>" +
                    "Use clear command to clear the screen. <br>"
                );
            case "about":
                return (
                    " Hi, I'm Suryansham, was an early bird for Insurance at PhonePe. <br>" + 
                    " Before that, I had my own company BlueVelocity Technologies Private Limited. <br>" +
                    " Before that, I was busy building a bunch of products, <br>" +
                    " Winning hackathons (passive income during my college days) and enjoying life. <br>" +
                    " Currently, I'm more focused towards the FinTech space. Aiming to connect the fintech dots with the AI eco-sphere."
                );
            case "portfolio":
                return (
                    " I kinda have my portfolio spilled out in various spaces, places and domains. <br>" + 
                    " I've made products both in the hardware and the software space. <br>" +
                    " I might have a few patents as well? Got multiple grants in the hardware and the software projects as well. <br>" + 
                    " If you're lurking, Google it out man! <br>" +
                    ' Check me out on <a href="https://www.linkedin.com/in/suryanshamtiwari" target="_blank">LinkedIn</a>'
                );
            case "contact":
                return (
                    'Email: <a href="mailto:insuryance@gmail.com" style="color: white;">insuryance@gmail.com</a>'
                );
            case "switch":
                document.body.classList.toggle("normal-mode");
                return "Switched to normal mode!";
            case "media_coverage":
                return (
                    "<a href='https://www.northeasttoday.in/2022/04/09/tripura-suryansham-t-sonali-rastogi-from-nit-agartala-tops-in-hyundai-social-creator-awards-2021/' target='_blank'>NorthEastToday</a> <br>" +
                    "<a href='https://tripuranet.com/tnet/hyundai-awards-two-nit-%E2%80%93agt-students-top-10-finalists-1871.html' target='_blank'>TripuraNet</a> <br>" +
                    "<a href='https://www.theweek.in/wire-updates/business/2021/03/23/pwr1-hyundai-motor-india-foundation.html' target='_blank'>TheWeek</a> <br>" +
                    "<a href='https://www.devdiscourse.com/article/education/1506202-hyundai-motor-india-foundation-announces-the-winner-of-h-social-creator-2020' target='_blank'>RandomMediaOutlet</a> <br>" +
                    "<a href='https://www.businessworld.in/article/hyundai-motor-india-foundation-announces-winner-of-h-social-creator-2020-384562' target='_blank'>BusinessWorld</a> <br>" +
                    "<a href='https://chennaiglitz.com/hyundai-motor-india-foundation-announces-the-winners-of-h-social-creator-2021/' target='_blank'>ChennaiGlitz</a> and More."
                );
            case "hackathons":
                return (
                    " Let's check the winning ones!" +
                    " It all started when I came third in the 1st year of my college in an inter-year coding hackathon <br>" + 
                    " where we made an compact email scrapper analyser. <br>" +
                    " Post that, Hyundai's HSC Cup, x2 (one finalist, one regional winner). <br>" +
                    " TechGIUM, International Finalist and Regional Winner for developing curved solar panels with 21.7% higher efficiency. <br>" +
                    " UiPath's Automathon Winner for developing automatic air-pollution detection architecture using smog density and socio-activity of birds. <br>" +
                    " Winner Observer Research Foundation and Unleash Global Hackathon for developing rural vayurakshak concept to reduce air pollution. <br>" +
                    " Winner Oxford University's Global Hackathon for XR based solution to reduce collateral damages of fast floods. <br>" +
                    " Huawei AI Award Winner by MLH and McHacks and the list continues....."
                );
            case "patents":
                return (
                    "Now, I was all about innovation, thinking the unthinkable and so are my patents. <br>" +
                    ' Patent Number 1: 202211031547 style="color: white; [ A simple device to extract shellac ] <br>' +
                    ' Patent Number 2: 202211013032 style="color: white; [ A simple device to create shellac ]  <br>' +
                    ' Patent Number 3: 202211013031 style="color: white; [ Fluid based Speed Breakers which does not give any jerk and reduces speed automatically ]'
                );
            case "blogs":
                return "Under Development";
            default:
                return (
                    `Command not recognized / Bhai dhang se type krle. Type 'help' for a list of commands.`
                );
        }
    }
    
       function clearTerminal() {
        terminalOutput.innerHTML = ""; // Clear all output content
        showBootText(); // Redisplay initial boot text after clearing
           
    }

    function switchToNormalMode() {
        document.body.classList.add("normal-mode");
    }
});
