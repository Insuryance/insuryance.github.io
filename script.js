<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Suryansham's Terminal</title>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tsparticles/2.12.0/tsparticles.bundle.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Fira Code', monospace;
            background-color: #1e1e2e;
            color: #9ece6a;
            overflow-x: hidden;
            min-height: 100vh;
            transition: background-color 0.5s ease, color 0.5s ease;
        }

        #tsparticles {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
        }

        #app {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
            position: relative;
            z-index: 1;
        }

        #terminal-title {
            font-size: 2.5rem;
            margin-bottom: 30px;
            text-align: center;
            font-weight: 300;
            letter-spacing: 2px;
        }

        .fall-container {
            display: inline-block;
        }

        .fall {
            display: inline-block;
            transition: all 0.3s ease;
        }

        .stay {
            display: inline-block;
            transition: all 1s ease;
            margin-left: 0.5rem;
        }

        .stay.moved {
            transform: translateX(-150px);
        }

        @keyframes fallDown {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(300px) rotate(180deg);
                opacity: 0;
            }
        }

        #terminal-output {
            width: 100%;
            max-width: 700px;
            min-height: 200px;
            max-height: 400px;
            overflow-y: auto;
            background-color: rgba(30, 30, 46, 0.9);
            border: 1px solid #414868;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 20px;
            backdrop-filter: blur(10px);
            scrollbar-width: thin;
            scrollbar-color: #414868 rgba(30, 30, 46, 0.9);
        }

        #terminal-output::-webkit-scrollbar {
            width: 6px;
        }

        #terminal-output::-webkit-scrollbar-track {
            background: rgba(30, 30, 46, 0.9);
        }

        #terminal-output::-webkit-scrollbar-thumb {
            background: #414868;
            border-radius: 3px;
        }

        #terminal-output p {
            margin: 8px 0;
            line-height: 1.4;
            word-wrap: break-word;
        }

        .prompt {
            color: #f38ba8;
            font-weight: 500;
        }

        .user-command {
            color: #74c7ec;
        }

        #terminal-input-container {
            display: flex;
            align-items: center;
            width: 100%;
            max-width: 700px;
            background-color: rgba(30, 30, 46, 0.9);
            border: 1px solid #414868;
            border-radius: 8px;
            padding: 10px 15px;
            backdrop-filter: blur(10px);
        }

        #terminal-input {
            flex: 1;
            background: transparent;
            border: none;
            color: #9ece6a;
            font-family: 'Fira Code', monospace;
            font-size: 14px;
            outline: none;
            margin-left: 10px;
        }

        #terminal-input::placeholder {
            color: #6c7086;
        }

        .send-command-btn {
            background: #f38ba8;
            color: #1e1e2e;
            border: none;
            padding: 5px 10px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            margin-left: 10px;
            transition: background-color 0.3s ease;
        }

        .send-command-btn:hover {
            background: #eba0ac;
        }

        a {
            color: #74c7ec;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        /* Normal mode styles */
        .normal-mode-container {
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 40px 20px;
            max-width: 800px;
            margin: 0 auto;
            line-height: 1.6;
        }

        .normal-mode-container h1 {
            font-size: 2.5rem;
            margin-bottom: 20px;
            color: #333;
            font-weight: 600;
        }

        .normal-mode-container h2 {
            font-size: 1.8rem;
            margin: 30px 0 15px 0;
            color: #444;
            font-weight: 500;
        }

        .normal-mode-container p {
            font-size: 1.1rem;
            margin-bottom: 15px;
            color: #666;
            max-width: 600px;
            text-align: center;
        }

        .action-buttons {
            margin-top: 30px;
        }

        .mode-switch-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 500;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .mode-switch-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
            #terminal-title {
                font-size: 2rem;
            }

            #terminal-output {
                max-height: 300px;
                font-size: 14px;
            }

            #terminal-input-container {
                font-size: 14px;
            }

            .normal-mode-container h1 {
                font-size: 2rem;
            }

            .normal-mode-container h2 {
                font-size: 1.5rem;
            }

            .normal-mode-container p {
                font-size: 1rem;
            }
        }
    </style>
</head>
<body>
    <div id="app"></div>

    <script>
        document.addEventListener("DOMContentLoaded", function () {
            const app = document.getElementById("app");
            if (!app) {
                console.error("#app element not found. Ensure your HTML contains <div id='app'></div>");
                return;
            }

            console.log("Script loaded successfully");
            
            // Create a div for tsParticles if it doesn't exist
            if (!document.getElementById("tsparticles")) {
                const particlesDiv = document.createElement("div");
                particlesDiv.id = "tsparticles";
                document.body.prepend(particlesDiv);
            }
            
            // Only load particles on desktop (screen width > 768px)
            if (window.innerWidth > 768) {
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
                            onClick: {
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
            } else {
                console.log("Mobile device detected, particles disabled");
                document.body.style.backgroundColor = "#1e1e2e";
            }

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
            terminalInput.setAttribute("autocomplete", "off");
            terminalInput.setAttribute("autocorrect", "off");
            terminalInput.setAttribute("spellcheck", "false");

            terminalInputContainer.appendChild(terminalInput);
            app.appendChild(terminalInputContainer);

            // Focus the input field (with mobile compatibility)
            terminalInput.focus();
            document.addEventListener("click", function() {
                terminalInput.focus();
            });

            // Boot-up welcome text
            const bootText = [
                "insuryance:$ type help to start",
                "<a href='https://insuryance.github.io/NormalPage/' onclick='switchToNormalMode()' style='color: lightblue; text-decoration: none;'>Visit Normal website</a>",
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
                    }, index * 200);
                });

                // Move "'s" closer to "Surya"
                setTimeout(() => {
                    const staySpan = document.querySelector(".stay");
                    if (staySpan) {
                        staySpan.classList.add("moved");
                    }
                }, 3000);
            }, 2000);

            // Handle user input with improved mobile support
            terminalInput.addEventListener("keydown", function (event) {
                if (event.key === "Enter") {
                    processCommand();
                }
            });
            
            // For mobile touch devices, add a send button
            if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
                const sendButton = document.createElement("button");
                sendButton.id = "send-button";
                sendButton.textContent = "➤";
                sendButton.classList.add("send-command-btn");
                sendButton.addEventListener("click", processCommand);
                terminalInputContainer.appendChild(sendButton);
            }
            
            function processCommand() {
                let inputValue = terminalInput.value.trim().toLowerCase();
                terminalInput.value = "";

                // Show the command that was entered
                const commandLine = document.createElement('p');
                commandLine.innerHTML = `<span class='prompt'>\u03BB :: ~ &gt;&gt;</span> <span class="user-command">${inputValue}</span>`;
                terminalOutput.appendChild(commandLine);

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
                            'Check me out on <a href="https://www.linkedin.com/in/suryanshamtiwari" style="color: lightblue;" target="_blank">LinkedIn</a>'
                        );
                    case "contact":
                        return (
                            'Email: <a href="mailto:insuryance@gmail.com" style="color: lightblue;">insuryance@gmail.com</a>'
                        );
                    case "switch":
                        switchToNormalMode();
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
                terminalOutput.innerHTML = ""; 
                showBootText();          
            }

            // Add global function for switching to normal mode
            window.switchToNormalMode = function() {
                const body = document.body;
                const terminalContainer = document.getElementById('app');
                
                // Check if normal-mode-container exists, create if not
                let normalContainer = document.querySelector('.normal-mode-container');
                if (!normalContainer) {
                    normalContainer = document.createElement('div');
                    normalContainer.className = 'normal-mode-container';
                    normalContainer.style.display = 'none';
                    normalContainer.innerHTML = `
                        <h1>Suryansham Tiwari</h1>
                        <p>Welcome to my personal website. This is the normal view of my portfolio.</p>
                        <h2>About Me</h2>
                        <p>I'm a NIT A [Gold Medallist] alum with experience in FinTech, especially in Insurance at PhonePe and Hardware. 
                           Previously, I founded BlueVelocity Technologies Private Limited and have been involved in 
                           creating various products and winning hackathons.</p>
                           <p> I've been working on a lot of hardware products and spending time with the FinTech evolution as well. </p>
                        <h2>Skills & Expertise</h2>
                        <p>My expertise spans across hardware and software, with a current focus on 
                           connecting FinTech with AI technologies. I carry Innovation as a forte and I'm pretty much focused into disruption.</p>
                        <div class="action-buttons">
                            <button onclick="switchToTerminalMode()" class="mode-switch-btn">Switch to Terminal Mode</button>
                        </div>
                    `;
                    document.body.appendChild(normalContainer);
                }

                // Step 1: Fade out terminal mode
                terminalContainer.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                terminalContainer.style.opacity = '0';
                terminalContainer.style.transform = 'scale(0.95)';

                // Step 2: After fade, hide terminal and show normal mode
                setTimeout(() => {
                    terminalContainer.style.display = 'none';

                    // Apply light theme
                    body.style.backgroundColor = '#f5f6fa';
                    body.style.color = '#333';
                    body.style.fontFamily = "'Inter', sans-serif";
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
            };

            // Add function to switch back to terminal mode
            window.switchToTerminalMode = function() {
                const body = document.body;
                const terminalContainer = document.getElementById('app');
                const normalContainer = document.querySelector('.normal-mode-container');

                // Step 1: Fade out normal mode
                normalContainer.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                normalContainer.style.opacity = '0';
                normalContainer.style.transform = 'translateY(20px)';

                // Step 2: After fade, hide normal mode and show terminal
                setTimeout(() => {
                    normalContainer.style.display = 'none';

                    // Apply dark theme back
                    body.style.backgroundColor = '#1e1e2e';
                    body.style.color = '#9ece6a';
                    body.style.fontFamily = "'Fira Code', monospace";

                    // Show terminal container
                    terminalContainer.style.display = 'flex';
                    terminalContainer.style.opacity = '0';
                    terminalContainer.style.transform = 'scale(0.95)';

                    setTimeout(() => {
                        terminalContainer.style.opacity = '1';
                        terminalContainer.style.transform = 'scale(1)';
                        terminalInput.focus();
                    }, 50);
                }, 600);
            };

            // Handle window resize for responsive behavior
            window.addEventListener('resize', function() {
                if (window.innerWidth <= 768) {
                    if (document.getElementById('tsparticles')) {
                        const particles = document.getElementById('tsparticles');
                        if (particles && particles.parentNode) {
                            particles.parentNode.removeChild(particles);
                        }
                    }
                }
            });
        });
    </script>
</body>
</html>
