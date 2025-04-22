document.addEventListener("DOMContentLoaded", function () {
    const app = document.getElementById("app");
    if (!app) {
        console.error("#app element not found. Ensure your HTML contains <div id='app'></div>");
        return;
    }

    console.log("Script loaded successfully"); // Debugging log

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
        "<a href='#' onclick='switchToNormalMode()' style='color: lightblue; text-decoration: none;'>Visit Normal website</a>",
        "",
    ];

    function showBootText() {
        terminalOutput.innerHTML = "";
        bootText.forEach(line => {
            let bootLine = document.createElement("p");
            bootLine.innerHTML = line;
            terminalOutput.appendChild(bootLine);
        });
    }

    showBootText();

    // Falling animation for InSuryance letters
    setTimeout(() => {
        document.querySelectorAll(".fall").forEach((letter, index) => {
            setTimeout(() => {
                letter.style.animation = "fallDown 1s ease-out forwards";
            }, index * 200); // Each letter drops 200ms apart
        });

        // Move "'s" closer to "Surya"
        setTimeout(() => {
            const staySpan = document.querySelector(".stay");
            if (staySpan) {
                staySpan.classList.add("moved");
            }
        }, 3000);
    }, 2000); // Wait 2s before starting the drop effect

    // Handle user input
    terminalInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            let inputValue = terminalInput.value.trim().toLowerCase();
            terminalInput.value = "";

            if (inputValue === "clear") {
                clearTerminal();
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
                    " Available commands: about, portfolio, contact, media_coverage, patents, hackathons, articles, clear <br>" +
                    " Use clear command to clear the screen. <br>"
                );
            case "about":
                return (
                    " Hi, I'm Suryansham, a NIT A / IIT D alum. I was an early bird for Insurance at PhonePe. <br>" + 
                    " Before that, I had my own company BlueVelocity Technologies Private Limited. <br>" +
                    " Before that, I was busy building a bunch of products, <br>" +
                    " Winning hackathons (passive income during my college days) and enjoying life. <br>" +
                    " Currently, I'm more focused towards the FinTech space. Aiming to connect the fintech dots with the AI eco-sphere."
                );
            case "portfolio":
                return (
                    " I kinda have my portfolio spilled out in various spaces, places and domains. <br>" +
                    " I've made products both in the hardware and the software space. <br>" +
                    " I have three pending patents in the hardware space and have received grants for multiple software products as well. <br>" +
                    " If you're lurking, let's connect! <br>" +
                    'Check me out on <a href="https://www.linkedin.com/in/suryanshamtiwari" style="color: lightblue; target="_blank">LinkedIn</a>'
                );
            case "contact":
                return (
                    'Email: <a href="mailto:insuryance@gmail.com" style="color: lightblue;">insuryance@gmail.com</a>'
                );
            case "switch":
                document.body.classList.toggle("normal-mode");
                return "Switched to normal mode!";
            case "media_coverage":
                return (
                   "<a href='https://www.northeasttoday.in/2022/04/09/tripura-suryansham-t-sonali-rastogi-from-nit-agartala-tops-in-hyundai-social-creator-awards-2021/' target='_blank' style='color:#a79dcf;'>NorthEastToday</a> <br>" +
                   "<a href='https://tripuranet.com/tnet/hyundai-awards-two-nit-%E2%80%93agt-students-top-10-finalists-1871.html' target='_blank' style='color:#a79dcf;'>TripuraNet</a> <br>" +
                   "<a href='https://www.theweek.in/wire-updates/business/2021/03/23/pwr1-hyundai-motor-india-foundation.html' target='_blank' style='color:#a79dcf;'>TheWeek</a> <br>" +
                   "<a href='https://www.devdiscourse.com/article/education/1506202-hyundai-motor-india-foundation-announces-the-winner-of-h-social-creator-2020' target='_blank' style='color:#a79dcf;'>RandomMediaOutlet</a> <br>" +
                   "<a href='https://www.businessworld.in/article/hyundai-motor-india-foundation-announces-winner-of-h-social-creator-2020-384562' target='_blank' style='color:#a79dcf;'>BusinessWorld</a> <br>" +
                   "<a href='https://chennaiglitz.com/hyundai-motor-india-foundation-announces-the-winners-of-h-social-creator-2021/' target='_blank' style='color:#a79dcf;'>ChennaiGlitz</a> and More."
                            );
                
            case "hackathons":
                return (
                    " It all started when I came third in the 1st year of my college in an inter-year coding hackathon :D <br>" + 
                    " Where we made a compact email scrapper analyser. (pretty simple stuff but great analytics). <br>" +
                    " Post that, Hyundai's HSC Cup, x2 (one finalist, one regional winner). <br>" +
                    " TechGIUM, International Finalist and Regional Winner for developing curved solar panels with 21.7% higher efficiency. <br>" +
                    " UiPath's Automathon Winner for developing automatic air-pollution detection architecture using smog density and socio-activity of birds. <br>" +
                    " Winner Observer Research Foundation and Unleash Global Hackathon for developing rural vayurakshak concept to reduce air pollution. <br>" +
                    " Winner Oxford University's Global Hackathon for XR based solution to reduce collateral damages of fast floods. <br>" +
                    " Huawei AI Award Winner by MLH and McHacks and the list goes on and on....."
                );
            case "patents":
                return (
                    "Now, I was all about innovation, thinking the unthinkable and so are my patents. <br>" +
                    "Patent Number 1: <span style='color: lightblue;'>202211031547</span> [ A simple device to extract shellac ] <br>" +
                    "Patent Number 2: <span style='color: lightblue;'>202211013032</span> [ A simple device to create artificial shellac on trees ] <br>" +
                    "Patent Number 3: <span style='color: lightblue;'>202211013031</span> [ Fluid based Speed Breakers that does not give any jerk and reduces speed automatically ]" 
                       );
                
            case "articles":
                return (
                    'Development of Deep Reinforcement Learning models in a Ball Balancing Environment [sponsored by iHub and HCL] :: <a href="https://www.researchgate.net/publication/390231443_Development_of_Deep_Reinforcement_Learning_models_in_a_Ball_Balancing_Environment_using_Unity3D " target="_blank" style="color: lightblue;">ResearchGate</a>' +
                    "<br>" +
                    'I write blogs on Medium, you can follow me there :: <a href="https://medium.com/@insuryance" target="_blank" style="color: lightblue;">Medium</a>'
                );
            default:
                return (
                    `Command not recognized. Type 'help' for a list of commands.`
                );
        }
    }
    
    function clearTerminal() {
        // Clear all user-added content but preserve boot text
        terminalOutput.innerHTML = ""; 
        showBootText(); // Redisplay initial boot text after clearing           
    }

function switchToNormalMode() {
  const body = document.body;
  const terminalContainer = document.querySelector('.terminal-container');
  const normalContainer = document.querySelector('.normal-mode-container');

  // Step 1: Fade out terminal mode
  terminalContainer.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  terminalContainer.style.opacity = '0';
  terminalContainer.style.transform = 'scale(0.95)';

  // Step 2: After fade, hide terminal and show normal mode
  setTimeout(() => {
    terminalContainer.style.display = 'none';

    // Apply light theme
    body.style.backgroundColor = '#f5f6fa'; // soft pastel background
    body.style.color = '#333'; // subtle dark text
    body.style.fontFamily = "'Inter', sans-serif"; // modern font
    body.style.transition = 'background-color 0.5s ease, color 0.5s ease';

    // Show normal container
    normalContainer.style.display = 'flex';
    normalContainer.style.opacity = '0';
    normalContainer.style.transform = 'translateY(20px)';
    normalContainer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

    setTimeout(() => {
      normalContainer.style.opacity = '1';
      normalContainer.style.transform = 'translateY(0)';
    }, 50);
  }, 600);
}

    }
);
// Particle background with repulsion effect and soft purple color
tsParticles.load("tsparticles", {
    background: {
        color: {
            value: "#00000000" // transparent
        }
    },
    fpsLimit: 60,
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: "repulse"
            },
            resize: true
        },
        modes: {
            repulse: {
                distance: 100,
                duration: 0.4
            }
        }
    },
    particles: {
        color: {
            value: "#c8a2c8" // soft purple
        },
        links: {
            color: "#c8a2c8",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1
        },
        collisions: {
            enable: true
        },
        move: {
            direction: "none",
            enable: true,
            outModes: {
                default: "bounce"
            },
            random: false,
            speed: 1,
            straight: false
        },
        number: {
            density: {
                enable: true,
                area: 800
            },
            value: 60
        },
        opacity: {
            value: 0.5
        },
        shape: {
            type: "circle"
        },
        size: {
            value: { min: 1, max: 5 }
        }
    },
    detectRetina: true
});
