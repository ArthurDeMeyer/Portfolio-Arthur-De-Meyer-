// ==========================================
// 1. EFFET MATRIX RAIN (SÉCURISÉ)
// ==========================================
let matrixCanvas, matrixCtx;

document.addEventListener('DOMContentLoaded', () => {
    matrixCanvas = document.getElementById('matrix-canvas');
    if (!matrixCanvas) {
        console.error("Canvas Matrix introuvable");
        return;
    }

    matrixCtx = matrixCanvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    setInterval(drawMatrix, 33);
});

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
const fontSize = 14;
let columns, drops;

function resizeCanvas() {
    if (matrixCanvas) {
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;
        columns = matrixCanvas.width / fontSize;
        drops = Array(Math.floor(columns)).fill(1);
    }
}

function drawMatrix() {
    if (!matrixCtx || !matrixCanvas) return;
    matrixCtx.fillStyle = "rgba(5, 5, 5, 0.05)";
    matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    matrixCtx.fillStyle = "#00ff9d";
    matrixCtx.font = fontSize + "px monospace";

    for(let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        matrixCtx.fillText(text, i * fontSize, drops[i] * fontSize);
        if(drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// ==========================================
// 2. EFFET TYPING TITRE (GLOBAL)
// ==========================================
const titleText = "Hello, I am Arthur De Meyer";
let i = 0;
function typeTitle() {
    const titleElement = document.getElementById('typing-title');
    if(titleElement && i < titleText.length) {
        titleElement.innerHTML += titleText.charAt(i);
        i++;
        setTimeout(typeTitle, 100);
    }
}
setTimeout(typeTitle, 500);


// ==========================================
// 3. TERMINAL INTERACTIF (CLI 2.0 - ULTIMATE)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    
    const terminalOutput = document.getElementById('terminal-output');
    if (!terminalOutput) return;

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const cliData = {
        system: ["Windows Server 2019/22", "Active Directory (AD DS)", "Linux (Debian/RHEL)", "VMware / Proxmox", "Intune / Entra ID"],
        network: ["TCP/IP & OSI", "VLAN / Subnetting", "Cisco Packet Tracer", "Pfsense / Firewalling", "Wireshark (Analysis)"],
        tools: ["PowerShell / Bash", "Git / GitHub", "GLPI / ServiceNow", "Centreon (Monitoring)", "Office 365 Admin"],
        soft: ["ITIL v4", "Gestion d'incidents", "Documentation", "Formation utilisateurs", "Anglais Technique"]
    };

    function printLine(htmlContent, type = "normal") {
        const div = document.createElement('div');
        div.innerHTML = htmlContent;
        div.style.marginBottom = "5px";
        
        // Petit style pour les erreurs ou succès
        if (type === "error") div.style.color = "#ff5555";
        if (type === "success") div.style.color = "#55ff55";

        terminalOutput.appendChild(div);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    // --- NOUVELLE VERSION AVEC AUTO-COMPLÉTION (TAB) ---
    function createInputLine() {
        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.marginTop = '10px';
        container.className = 'input-line'; // Ajout d'une classe pour ciblage CSS éventuel

        const prompt = document.createElement('span');
        prompt.className = 'prompt';
        prompt.innerHTML = 'root@portfolio:~$ ';
        prompt.style.marginRight = '10px';
        prompt.style.minWidth = 'fit-content';

        const input = document.createElement('input');
        input.type = 'text';
        input.autocomplete = 'off';
        input.autofocus = true;
        // Styles inline pour forcer l'apparence
        input.style.backgroundColor = 'transparent';
        input.style.border = 'none';
        input.style.color = '#fff';
        input.style.fontFamily = 'inherit';
        input.style.flexGrow = '1';
        input.style.outline = 'none';

        // --- GESTION INTELLIGENTE DES TOUCHES ---
        input.addEventListener('keydown', function(e) {
            
            // 1. SI ON APPUIE SUR ENTRÉE
            if (e.key === 'Enter') {
                const command = input.value;
                // On fige la ligne pour faire joli
                container.innerHTML = `<span class="prompt">root@portfolio:~$</span> <span style="color:#fff">${command}</span>`;
                handleCommand(command);
            }

            // 2. SI ON APPUIE SUR TAB (AUTO-COMPLÉTION)
            else if (e.key === 'Tab') {
                e.preventDefault(); // Empêche de sortir du champ
                const currentText = this.value.toLowerCase();
                
                // Liste des commandes que le terminal connait
                const knownCommands = [
                    'help', 'about', 'skills', 'projects', 'social', 'contact', 'cv', 'clear',
                    'open ad-lab', 'open pfsense', 'open sysprep-deploy', // Suggestion des projets
                    'sudo', 'rm -rf' // Suggestion des easter eggs
                ];

                // On cherche la première commande qui commence par ce qu'on a tapé
                const match = knownCommands.find(cmd => cmd.startsWith(currentText));
                if (match) {
                    this.value = match; // On remplit le champ
                }
            }
        });

        container.appendChild(prompt);
        container.appendChild(input);
        terminalOutput.appendChild(container);
        
        input.focus();
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    async function handleCommand(cmd) {
        const cleanInput = cmd.trim();
        const parts = cleanInput.split(' ');
        
        const command = parts[0].toLowerCase();
        const argument = parts[1];
        
        switch(command) {
            case 'help':
                printLine(`
                    <div style="color:#fff; margin-bottom:5px">AVAILABLE COMMANDS:</div>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; color:#ccc;">
                        <div><span class="highlight">about</span> : Who am I?</div>
                        <div><span class="highlight">skills</span> : Full technical stack</div>
                        <div><span class="highlight">projects</span> : View labs</div>
                        <div><span class="highlight">open</span> : Open a project</div>
                        <div><span class="highlight">social</span> : LinkedIn/GitHub</div>
                        <div><span class="highlight">contact</span> : Email me</div>
                        <div><span class="highlight">cv</span> : Download PDF</div>
                        <div><span class="highlight">clear</span> : Clean screen</div>
                    </div>
                `);
                break;

            case 'about':
                printLine(`
                    <div style="color:var(--accent)">> USER_PROFILE_LOADED</div>
                    <div><strong>Arthur DE MEYER</strong> - Technicien Système & Réseau</div>
                    <div style="margin-top:5px; color:#ccc">
                        "En route vers l'Administration Système.
                        Gestion d'Infrastructure & Sécurité Opérationnelle."
                    </div>
                    <div style="margin-top:5px; font-style:italic; color:var(--accent)">
                        Philosophy: Build it. Break it. Fix it.
                    </div>
                `);
                break;

            case 'skills':
                printLine(`<div style="color:var(--accent)">> READING_DATABASE_SKILLS... [OK]</div>`);
                let skillsOutput = `<div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap:15px; margin-top:10px;">`;
                const generateList = (title, items) => `
                    <div>
                        <strong style="color:#fff; text-decoration:underline">${title}</strong>
                        <ul style="list-style:none; padding-left:10px; margin-top:5px; color:#aaa; font-size:0.85rem">
                            ${items.map(i => `<li>- ${i}</li>`).join('')}
                        </ul>
                    </div>`;
                skillsOutput += generateList("SYSTEM & CLOUD", cliData.system);
                skillsOutput += generateList("NETWORK & SEC", cliData.network);
                skillsOutput += generateList("TOOLS & DEVOPS", cliData.tools);
                skillsOutput += generateList("SOFT SKILLS", cliData.soft);
                skillsOutput += `</div>`;
                printLine(skillsOutput);
                break;

            case 'projects':
            case 'project': 
                printLine("<br>");
                printLine("Listing des projets documentés...");
                printLine("---------------------------------");
                printLine("<span style='color: var(--accent);'>ad-lab</span>           : Infrastructure Active Directory (Win Server 2022)");
                printLine("<span style='color: var(--accent);'>pfsense</span>          : Network Security & Firewalling (Snort/VLANs)");
                printLine("<span style='color: var(--accent);'>sysprep-deploy</span>   : Masterisation & Déploiement Win10");
                printLine("<br>");
                printLine("Usage : Tapez <span style='color: #fff;'>open [nom-du-projet]</span> pour ouvrir le dossier.");
                printLine("Exemple : <span style='color: #888;'>open sysprep-deploy</span>");
                createInputLine();
                return;

            case 'open':
                if (!argument) {
                    printLine("Erreur : Quel projet voulez-vous ouvrir ?", "error");
                    printLine("Usage : <span style='color:#fff'>open [nom-du-projet]</span>");
                    printLine("Exemple : open ad-lab");
                } 
                else if (projectsData[argument]) {
                    printLine(`Ouverture du projet : <span style='color:var(--accent)'>${projectsData[argument].title}</span>...`);
                    openProject(argument);
                } 
                else {
                    printLine(`Erreur : Le projet '${argument}' est introuvable.`, "error");
                    printLine("Tapez <span style='color:var(--accent)'>projects</span> pour voir la liste.");
                }
                createInputLine();
                return;

            case 'social':
                printLine(`
                    <div><i class="fab fa-github"></i> GitHub: <a href="https://github.com/ArthurDeMeyer" target="_blank" style="color:var(--accent)">github.com/ArthurDeMeyer</a></div>
                    <div><i class="fab fa-linkedin"></i> LinkedIn: <a href="https://www.linkedin.com/in/arthur-de-meyer-/" target="_blank" style="color:var(--accent)">linkedin.com/in/arthur-de-meyer</a></div>
                `);
                break;

            case 'contact':
                printLine(`Opening mail client protocol...`);
                printLine(`Email: <a href="mailto:demeyer.arthur@outlook.com" style="color:var(--accent)">demeyer.arthur@outlook.com</a>`);
                break;
            
            case 'cv':
                printLine(`Downloading 'cv.pdf'...`);
                setTimeout(() => {
                    window.open('cv.pdf', '_blank'); 
                    printLine(`<span style="color:#0f0">[DOWNLOAD COMPLETE]</span>`);
                    createInputLine(); 
                }, 1000);
                return;

            case 'whoami':
                printLine(`root@portfolio (Guest Session)`);
                break;
            
            case 'ls':
            case 'dir':
                printLine(`
                    <span style="color:#00aaff">drwxr-xr-x</span>  about/
                    <span style="color:#00aaff">drwxr-xr-x</span>  skills/
                    <span style="color:#00aaff">drwxr-xr-x</span>  projects/
                    <span style="color:#00aaff">drwxr-xr-x</span>  experience/
                    <span style="color:#ccc">-rw-r--r--</span>  cv.pdf
                    <span style="color:#ccc">-rw-r--r--</span>  contact.txt
                `);
                break;

            case 'clear':
            case 'cls':
                terminalOutput.innerHTML = "";
                createInputLine(); // Relance une ligne propre
                return; 

            // --- EASTER EGG 1 : SUDO ---
            case 'sudo':
                printLine(`<span style="color:red">PERMISSION DENIED:</span> You are not in the sudoers file. This incident will be reported.`, "error");
                break;

            // --- EASTER EGG 2 : AUTODESTRUCTION ---
            case 'rm': // Juste au cas où
            case 'rm -rf':
            case 'rm -rf /':
                printLine(`⚠️ <span style="color:red">CRITICAL ALERT:</span> System deletion sequence initiated...`);
                setTimeout(() => { printLine("Deleting System32...", "error"); }, 600);
                setTimeout(() => { printLine("Formatting C: Drive...", "error"); }, 1400);
                setTimeout(() => { printLine("Deleting user profile...", "error"); }, 2400);
                setTimeout(() => { 
                    printLine("Just kidding! 😉 Don't try this on prod servers.", "success"); 
                    createInputLine(); 
                }, 3500);
                return; 
            
            case '':
                break;

            default:
                printLine(`<span style="color:red">Command not found: ${command}</span>. Type 'help' for list.`);
        }
        createInputLine();
    }

    async function runBoot() {
        terminalOutput.innerHTML = ''; 
        const bootTexts = [
            "Initializing kernel...",
            "Loading modules... [OK]",
            "Mounting file system... [OK]",
            "Welcome, Admin. System is ONLINE.",
            "Type 'help' for commands."
        ];

        for (const line of bootTexts) {
            printLine(line);
            await delay(200); 
        }
        createInputLine();
    }

    // Gestion du focus quand on clique n'importe où dans le terminal
    document.addEventListener('click', function(e) {
        if (e.target.closest('.terminal-window')) {
            const activeInput = terminalOutput.querySelector('input');
            if (activeInput) activeInput.focus();
        }
    });

    runBoot();
});


// ==========================================
// 4. GESTION DES MODALES PROJETS (GLOBAL)
// ==========================================
const projectsData = {
    "ad-lab": {
        title: "Infrastructure Active Directory",
        description: `
            <div style="margin-bottom:10px; color:#ccc;">Déploiement d'un Contrôleur de Domaine Windows Server 2022 :</div>
            <ol style="padding-left:20px; color:#aaa; line-height:1.6;">
                <li style="margin-bottom:10px;">
                    <strong style="color:#fff;">Installation & Réseau :</strong><br>
                    Configuration IP statique et DNS Loopback. Installation du rôle <em>AD DS</em> (Domain Services).
                </li>
                <li style="margin-bottom:10px;">
                    <strong style="color:#fff;">Promotion (Dcpromo) :</strong><br>
                    Création d'une nouvelle forêt. Configuration DSRM et validation NTDS/SYSVOL.
                </li>
                <li>
                    <strong style="color:#fff;">Organisation & GPO :</strong><br>
                    Structuration OUs (Services/Users) et application de GPO de sécurité.
                </li>
            </ol>
            <div style="margin-top:15px; font-size:0.85rem; color:#888;">Commande (PowerShell) :</div>
            <code style="display:block; background:#222; padding:10px; margin-top:5px; margin-bottom:25px; border-radius:4px; color:#0f0; font-family:'Fira Code', monospace;">Install-ADDSForest -DomainName "corp.local" -InstallDns</code>
        `,
        image: "assets/ad-project.png", 
        techs: ["Windows Server 2022", "AD DS", "DNS", "GPO", "PowerShell"],
        link: "#"
    },
    "pfsense": {
        title: "Sécurité Périmétrique & Firewalling",
        description: `
            <div style="margin-bottom:10px; color:#ccc;">Sécurisation réseau via Pfsense :</div>
            <ol style="padding-left:20px; color:#aaa; line-height:1.6;">
                <li style="margin-bottom:10px;">
                    <strong style="color:#fff;">Segmentation (VLANs) :</strong><br>
                    Isolation des flux : Admin (10), Users (20), IoT (99).
                </li>
                <li style="margin-bottom:10px;">
                    <strong style="color:#fff;">Filtrage Strict :</strong><br>
                    Politique "DENY ALL" par défaut. Autorisation des flux DNS/HTTPS uniquement.
                </li>
                <li>
                    <strong style="color:#fff;">Inspection (IDS) :</strong><br>
                    Mise en place de Snort pour la détection d'intrusion sur le WAN.
                </li>
            </ol>
            <div style="margin-top:15px; font-size:0.85rem; color:#888;">Audit (Shell) :</div>
            <code style="display:block; background:#222; padding:10px; margin-top:5px; margin-bottom:25px; border-radius:4px; color:#0f0; font-family:'Fira Code', monospace;">pfctl -sr | grep "block drop in on ! wan"</code>
        `,
        image: "assets/pfsense-project.png",
        techs: ["Pfsense", "VLANs", "Snort IDS", "Firewalling", "Pfctl"],
        link: "#"
    },
    "sysprep-deploy": {
        title: "Masterisation & Déploiement Win10",
        description: `
            <div style="margin-bottom:10px; color:#ccc;">Création d'un Master Gold Windows 10 LTSC :</div>
            <ol style="padding-left:20px; color:#aaa; line-height:1.6;">
                <li style="margin-bottom:10px;">
                    <strong style="color:#fff;">Fichier de réponse (WSIM) :</strong><br>
                    Configuration du fichier XML (Skip OOBE, Création Admin) via le catalogue .clg.
                </li>
                <li style="margin-bottom:10px;">
                    <strong style="color:#fff;">Mode Audit :</strong><br>
                    Installation des softs (Office, 7Zip) en mode Administrateur caché (CTRL+SHIFT+F3).
                </li>
                <li>
                    <strong style="color:#fff;">Généralisation :</strong><br>
                    Suppression des SID et extinction pour capture de l'image.
                </li>
            </ol>
            <div style="margin-top:15px; font-size:0.85rem; color:#888;">Sysprep Command :</div>
            <code style="display:block; background:#222; padding:10px; margin-top:5px; margin-bottom:25px; border-radius:4px; color:#0f0; font-family:'Fira Code', monospace;">sysprep /generalize /oobe /shutdown /unattend:unattend.xml</code>
        `,
        image: "assets/sysprep.png.png", // J'ai corrigé le .png.png ici !
        techs: ["Windows 10", "Sysprep", "WSIM", "Audit Mode", "XML"],
        link: "#"
    },
};

const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-name');
const modalDesc = document.getElementById('modal-desc');
const modalImg = document.getElementById('modal-image');
const modalTechs = document.getElementById('modal-techs');
const modalLink = document.getElementById('modal-link');

function openProject(projectId) {
    const project = projectsData[projectId];
    if(!project) return; 

    modalTitle.textContent = project.title;
    modalDesc.innerHTML = project.description;
    
    if (project.image) {
        modalImg.src = project.image;
        modalImg.style.display = 'block';
    } else {
        modalImg.style.display = 'none';
    }
    
    if (project.link) {
        modalLink.href = project.link;
    }

    modalTechs.innerHTML = project.techs.map(tech => 
        `<span class="skill-tag" style="display:inline-block; margin-right:5px; margin-bottom:5px; font-size:0.8rem; color:#fff; border:1px solid #333;">${tech}</span>`
    ).join('');

    if(modal) {
        modal.classList.add('active');
        modal.classList.remove('hidden');
    }
}

function closeModal() {
    if(modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.classList.add('hidden'), 300);
    }
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}


// ==========================================
// 5. GESTION MODALE SKILLS (GLOBAL)
// ==========================================
const skillsModal = document.getElementById('skills-modal');

function openSkillsModal() {
    if(skillsModal) {
        skillsModal.classList.remove('hidden');
        setTimeout(() => {
            skillsModal.classList.add('active');
        }, 10);
    }
}

function closeSkillsModal() {
    if(skillsModal) {
        skillsModal.classList.remove('active');
        setTimeout(() => {
            skillsModal.classList.add('hidden');
        }, 300);
    }
}

if(skillsModal) {
    skillsModal.addEventListener('click', (e) => {
        if (e.target === skillsModal) closeSkillsModal();
    });
}