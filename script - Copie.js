// ==========================================
// 1. EFFET MATRIX RAIN (SÉCURISÉ)
// ==========================================
let matrixCanvas, matrixCtx; // Variables globales pour être accessibles

document.addEventListener('DOMContentLoaded', () => {
    // On initialise seulement quand la page est prête
    matrixCanvas = document.getElementById('matrix-canvas');
    
    // Sécurité : si le canvas n'existe pas, on arrête pour éviter le crash
    if (!matrixCanvas) {
        console.error("Canvas Matrix introuvable");
        return;
    }

    matrixCtx = matrixCanvas.getContext('2d');
    
    // Lancement
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    setInterval(drawMatrix, 33);
});

// Variables pour l'animation
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
const fontSize = 14;
let columns, drops;

function resizeCanvas() {
    if (matrixCanvas) {
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;
        
        // Recalcul des colonnes après redimensionnement
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
// 3. TERMINAL INTERACTIF (CLI 2.0)
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

    function printLine(htmlContent) {
        const div = document.createElement('div');
        div.innerHTML = htmlContent;
        div.style.marginBottom = "5px";
        terminalOutput.appendChild(div);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    function createInputLine() {
        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.marginTop = '10px';

        const prompt = document.createElement('span');
        prompt.className = 'prompt';
        prompt.innerHTML = 'root@portfolio:~$ ';
        prompt.style.marginRight = '10px';
        prompt.style.minWidth = 'fit-content';

        const input = document.createElement('input');
        input.type = 'text';
        input.autocomplete = 'off';
        input.autofocus = true;
        input.style.backgroundColor = 'transparent';
        input.style.border = 'none';
        input.style.color = '#fff';
        input.style.fontFamily = 'inherit';
        input.style.flexGrow = '1';
        input.style.outline = 'none';

        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const command = input.value;
                container.innerHTML = `<span class="prompt">root@portfolio:~$</span> <span style="color:#fff">${command}</span>`;
                handleCommand(command);
                createInputLine();
            }
        });

        container.appendChild(prompt);
        container.appendChild(input);
        terminalOutput.appendChild(container);
        input.focus();
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    async function handleCommand(cmd) {
        // --- 1. NOUVELLE LOGIQUE DE DÉCOUPAGE ---
        const cleanInput = cmd.trim();       // Enlève les espaces inutiles
        const parts = cleanInput.split(' '); // Coupe la phrase à chaque espace
        
        const command = parts[0].toLowerCase(); // Le 1er mot (ex: "open")
        const argument = parts[1];              // Le 2ème mot (ex: "ad-lab")
        
        // On switch uniquement sur le premier mot ("command")
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
                
                // Liste des projets
                printLine("<span style='color: var(--accent);'>ad-lab</span>           : Infrastructure Active Directory (Win Server 2022)");
                printLine("<span style='color: var(--accent);'>pfsense</span>          : Network Security & Firewalling (Snort/VLANs)");
                printLine("<span style='color: var(--accent);'>sysprep-deploy</span>   : Masterisation & Déploiement Win10");
                
                printLine("<br>");
                printLine("Usage : Tapez <span style='color: #fff;'>open [nom-du-projet]</span> pour ouvrir le dossier.");
                printLine("Exemple : <span style='color: #888;'>open sysprep-deploy</span>");
                
                createInputLine();
                return; // Return stoppe la fonction ici, pas besoin de break

            // --- 2. LE fameux CASE OPEN ---
            case 'open':
                if (!argument) {
                    // Si on tape juste "open" sans rien derrière
                    printLine("Erreur : Quel projet voulez-vous ouvrir ?", "error");
                    printLine("Usage : <span style='color:#fff'>open [nom-du-projet]</span>");
                    printLine("Exemple : open ad-lab");
                } 
                else if (projectsData[argument]) {
                    // Si le projet existe dans la liste
                    printLine(`Ouverture du projet : <span style='color:var(--accent)'>${projectsData[argument].title}</span>...`);
                    openProject(argument);
                } 
                else {
                    // Si le projet n'existe pas
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
                    // J'ai mis 'cv.pdf' en minuscule pour éviter les erreurs
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
                return; 
            
            case '':
                break;

            default:
                printLine(`<span style="color:red">Command not found: ${command}</span>. Type 'help' for list.`);
        }
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
                    Configuration IP statique et DNS Loopback. Installation du rôle <em>AD DS</em> (Domain Services) via le Gestionnaire de serveur.
                </li>
                
                <li style="margin-bottom:10px;">
                    <strong style="color:#fff;">Promotion (Dcpromo) :</strong><br>
                    Création d'une nouvelle forêt. Configuration du mode de restauration (DSRM) et validation des chemins de base de données (NTDS.dit) et des logs.
                </li>
                
                <li style="margin-bottom:10px;">
                    <strong style="color:#fff;">Organisation (OU) & GPO :</strong><br>
                    Structuration hiérarchique (Services/Utilisateurs/Ordinateurs). Création de GPO pour durcir la sécurité (Verrouillage compte, MDP complexe).
                </li>
                
                <li>
                    <strong style="color:#fff;">Intégration Client :</strong><br>
                    Jonction de postes Windows 10/11 au domaine et vérification de l'application des stratégies de groupe.
                </li>
            </ol>

            <div style="margin-top:15px; font-size:0.85rem; color:#888;">Commande de déploiement (PowerShell) :</div>
            <code style="display:block; background:#222; padding:10px; margin-top:5px; margin-bottom:25px; border-radius:4px; color:#0f0; font-family:'Fira Code', monospace; white-space: pre-wrap; word-break: break-word;">Install-ADDSForest -DomainName "corp.local" -InstallDns</code>
        `,
        image: "assets/ad-project.png", // Vérifie que tu as bien cette image (ou change le nom)
        techs: ["Windows Server 2022", "AD DS", "DNS", "GPO", "PowerShell"],
        link: "#"
    },
    "pfsense": {
        title: "Sécurité Périmétrique & Firewalling",
        description: `
            <div style="margin-bottom:10px; color:#ccc;">Sécurisation d'un réseau d'entreprise via Pfsense (Appliance virtuelle) :</div>
            
            <ol style="padding-left:20px; color:#aaa; line-height:1.6;">
                <li style="margin-bottom:10px;">
                    <strong style="color:#fff;">Segmentation Réseau (VLANs) :</strong><br>
                    Création d'interfaces virtuelles pour isoler les flux : VLAN 10 (Admin), VLAN 20 (Utilisateurs) et VLAN 99 (IoT/Invités). Configuration du Trunk vers le switch.
                </li>
                
                <li style="margin-bottom:10px;">
                    <strong style="color:#fff;">Politique de Filtrage :</strong><br>
                    Application du principe de <em>Moindre Privilège</em>. Règle "DENY ALL" par défaut. Autorisation stricte des flux nécessaires (DNS, HTTPS) et blocage du trafic inter-VLAN.
                </li>
                
                <li style="margin-bottom:10px;">
                    <strong style="color:#fff;">Services (DHCP & DNS) :</strong><br>
                    Configuration des étendues DHCP par interface. Mise en place du DNS Resolver (Unbound) pour le filtrage de domaines malveillants (DNS Sinkhole).
                </li>
                
                <li>
                    <strong style="color:#fff;">Inspection (IDS/IPS) :</strong><br>
                    Installation et configuration de <strong>Snort</strong>. Mise en place de règles de détection d'intrusion (Community Rules) sur l'interface WAN.
                </li>
            </ol>

            <div style="margin-top:15px; font-size:0.85rem; color:#888;">Vérification des règles (Shell FreeBSD) :</div>
            <code style="display:block; background:#222; padding:10px; margin-top:5px; margin-bottom:25px; border-radius:4px; color:#0f0; font-family:'Fira Code', monospace; white-space: pre-wrap; word-break: break-word;">pfctl -sr | grep "block drop in on ! wan"</code>
        `,
        image: "assets/pfsense-project.png", // Vérifie bien le nom de ton image
        techs: ["Pfsense", "VLANs", "Snort IDS", "Firewalling", "Pfctl"],
        link: "#"
    },

    "sysprep-deploy": {
        title: "Masterisation & Déploiement Win10",
        description: `
            <div style="margin-bottom:10px; color:#ccc;">Procédure de création d'un Master Gold Windows 10 Enterprise LTSC :</div>
            
            <ol style="padding-left:20px; color:#aaa; line-height:1.6;">
                <li style="margin-bottom:10px;">
                    <strong style="color:#fff;">Préparation du fichier de réponse (WSIM) :</strong><br>
                    Extraction du fichier <code>install.wim</code> de l'ISO. Import dans <em>Windows System Image Manager</em> pour générer le catalogue (.clg) et configurer le fichier XML (langue fr-FR, création compte admin, skip OOBE).
                </li>
                
                <li style="margin-bottom:10px;">
                    <strong style="color:#fff;">Installation & Mode Audit :</strong><br>
                    Installation de l'OS sur VM. Au premier démarrage, passage en <strong>Audit Mode</strong> (<code>CTRL+SHIFT+F3</code>) pour contourner l'assistant de configuration et accéder à la session Administrateur cachée.
                </li>
                
                <li style="margin-bottom:10px;">
                    <strong style="color:#fff;">Personnalisation du Master :</strong><br>
                    Installation des logiciels standards (Office, 7Zip...), configuration de l'environnement et nettoyage des fichiers temporaires.
                </li>
                
                <li>
                    <strong style="color:#fff;">Généralisation & Capture :</strong><br>
                    Lancement de la commande finale pour supprimer les SID uniques et éteindre la machine :<br>
                    <code style="display:block; background:#222; padding:10px; margin-top:5px; margin-bottom:25px; border-radius:4px; color:#0f0; font-family:'Fira Code', monospace; white-space: pre-wrap; word-break: break-word;">sysprep /generalize /oobe /shutdown /unattend:unattend.xml</code>
                </li>
            </ol>
        `,
        image: "assets/sysprep.png.png", // Utilise ton image "sys prep install.PNG" renommée
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