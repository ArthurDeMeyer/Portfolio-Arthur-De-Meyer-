// --- 1. EFFET MATRIX RAIN ---
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(5, 5, 5, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "#00ff9d";
    ctx.font = fontSize + "px monospace";

    for(let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}
setInterval(drawMatrix, 33);

// --- 2. EFFET TYPING TITRE ---
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

// --- 3. TERMINAL INTERACTIF (Version Améliorée 2.0) ---
document.addEventListener('DOMContentLoaded', () => {
    
    const terminalOutput = document.getElementById('terminal-output');
    if (!terminalOutput) return;

    const delay = ms => new Promise(res => setTimeout(res, ms));

    // --- DONNÉES DU CLI (SKILLS) ---
    const cliData = {
        system: ["Windows Server 2019/22", "Active Directory (AD DS)", "Linux (Debian/RHEL)", "VMware / Proxmox", "Intune / Entra ID"],
        network: ["TCP/IP & OSI", "VLAN / Subnetting", "Cisco Packet Tracer", "Pfsense / Firewalling", "Wireshark (Analysis)"],
        tools: ["PowerShell / Bash", "Git / GitHub", "GLPI / ServiceNow", "Centreon (Monitoring)", "Office 365 Admin"],
        soft: ["ITIL v4", "Gestion d'incidents", "Documentation", "Formation utilisateurs", "Anglais Technique"]
    };

    // Fonction d'affichage avec support HTML
    function printLine(htmlContent) {
        const div = document.createElement('div');
        div.innerHTML = htmlContent;
        div.style.marginBottom = "5px"; // Petit espacement pour la lisibilité
        terminalOutput.appendChild(div);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    // Création de la ligne de saisie
    function createInputLine() {
        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.marginTop = '10px'; // Un peu plus d'espace

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
            // Historique des commandes (Optionnel : flèche haut)
        });

        container.appendChild(prompt);
        container.appendChild(input);
        terminalOutput.appendChild(container);
        input.focus();
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    // --- LOGIQUE DES COMMANDES ---
    async function handleCommand(cmd) {
        const cleanCmd = cmd.trim().toLowerCase();
        let response = "";

        // Séparateur visuel pour la clarté
        const separator = "<div style='color:#333'>----------------------------------------</div>";

        switch(cleanCmd) {
            case 'help':
                printLine(`
                    <div style="color:#fff; margin-bottom:5px">AVAILABLE COMMANDS:</div>
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; color:#ccc;">
                        <div><span class="highlight">about</span> : Who am I?</div>
                        <div><span class="highlight">skills</span> : Full technical stack</div>
                        <div><span class="highlight">projects</span> : View labs</div>
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
                        "Passionné par la conception d'architectures résilientes.
                        Je construis mon parcours pour devenir <strong>Architecte Sécurité</strong>."
                    </div>
                    <div style="margin-top:5px; font-style:italic; color:var(--accent)">
                        Philosophy: Build it. Break it. Fix it.
                    </div>
                `);
                break;
            case 'projects':
                printLine(`<div style="color:var(--accent)">> SCANNING_LOCAL_LABS... [OK]</div>`);
                printLine(`
                    <div style="margin-top:10px;">
                        <div style="margin-bottom:10px;">
                            <strong style="color:#fff;">[DIR] Active Directory Lab</strong><br>
                            <span style="color:#888;">Windows Server 2022 • GPO Hardening • PowerShell Auto</span>
                        </div>
                        <div style="margin-bottom:10px;">
                            <strong style="color:#fff;">[DIR] Network Security & FW</strong><br>
                            <span style="color:#888;">Pfsense • Snort IDS • VLAN Segmentation</span>
                        </div>
                        <div style="margin-top:15px; color:#aaa; font-style:italic; border-top:1px dashed #333; padding-top:5px;">
                            > Tip: Use the graphical interface (below) to view screenshots and full reports.
                        </div>
                    </div>
                `);
                break;
            case 'skills':
                // Affichage structuré des compétences
                printLine(`<div style="color:var(--accent)">> READING_DATABASE_SKILLS... [OK]</div>`);
                
                let skillsOutput = `<div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap:15px; margin-top:10px;">`;
                
                // Fonction helper pour générer une liste
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

            case 'social':
                printLine(`
                    <div><i class="fab fa-github"></i> GitHub: <a href="https://github.com/ArthurDeMeyer" target="_blank" style="color:var(--accent)">https://github.com/ArthurDeMeyer</a></div>
                    <div><i class="fab fa-linkedin"></i> LinkedIn: <a href="https://www.linkedin.com/in/arthur-de-meyer-/" target="_blank" style="color:var(--accent)">https://www.linkedin.com/in/arthur-de-meyer-/</a></div>
                `);
                break;

            case 'contact':
                printLine(`Opening mail client protocol...`);
                printLine(`Email: <a href="mailto:demeyer.arthur@outlook.com" style="color:var(--accent)">demeyer.arthur@outlook.com</a>`);
                break;
            
            case 'cv':
                printLine(`Downloading 'CV_Arthur_De_Meyer_2025.pdf'...`);
                // Simuler un téléchargement ou ouvrir le lien
                setTimeout(() => {
                    // Remplace le # par le lien réel de ton PDF
                    window.open('#', '_blank'); 
                    printLine(`<span style="color:#0f0">[DOWNLOAD COMPLETE]</span>`);
                    createInputLine(); // On recrée la ligne car le timeout sort du flux normal
                }, 1000);
                return; // On retourne pour gérer l'input dans le timeout

            case 'whoami':
                printLine(`root@portfolio (Guest Session)`);
                break;
            
            case 'date':
                printLine(new Date().toString());
                break;

            case 'sudo':
                printLine(`<span style="color:red">Permission denied: you are not a real admin yet. ;)</span>`);
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
                return; // Pas besoin de printLine après un clear
            
            case '':
                break;

            default:
                printLine(`<span style="color:red">Command not found: ${cleanCmd}</span>. Type 'help' for list.`);
        }
    }

    // Séquence de démarrage (BOOT)
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

    // Garder le focus
    document.addEventListener('click', function(e) {
        if (e.target.closest('.terminal-window')) {
            const activeInput = terminalOutput.querySelector('input');
            if (activeInput) activeInput.focus();
        }
    });

    runBoot();

}); // Fin du DOMContentLoaded pour le terminal // <--- ICI : ON FERME LE DOMContentLoaded POUR LE TERMINAL

// --- 4. GESTION DES MODALES PROJETS ---
// Ce code est maintenant GLOBAL (accessible par le onclick du HTML)

const projectsData = {
    "ad-lab": {
        title: "Active Directory Lab",
        description: "Déploiement complet d'une infrastructure d'entreprise simulée.<br><br>• <strong>Architecture :</strong> Contrôleur de domaine principal + secondaire (Failover).<br>• <strong>Sécurité :</strong> Durcissement par GPO (blocage CMD, complexité MDP).<br>• <strong>Automatisation :</strong> Scripts PowerShell pour l'onboarding des utilisateurs.",
        image: "assets/ad-project.jpg", 
        techs: ["Windows Server 2022", "DNS/DHCP", "GPO Hardening", "PowerShell"],
        link: "https://github.com/ton-pseudo/ad-lab"
    },
    "pfsense": {
        title: "Network Security & FW",
        description: "Sécurisation périmétrique d'un réseau local.<br><br>• <strong>Segmentation :</strong> Création de VLANs étanches (ADMIN, USER, IOT).<br>• <strong>Inspection :</strong> Configuration de Snort IDS pour l'analyse de trames.<br>• <strong>Monitoring :</strong> Remontée des logs vers un serveur centralisé.",
        image: "assets/pfsense-project.jpg",
        techs: ["Pfsense", "Snort IDS", "VLANs", "Wireshark"],
        link: "#"
    }
};

// On sélectionne les éléments une fois que le script se charge (car il est en bas du body)
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-name');
const modalDesc = document.getElementById('modal-desc');
const modalImg = document.getElementById('modal-image');
const modalTechs = document.getElementById('modal-techs');
const modalLink = document.getElementById('modal-link');

// Fonction globale pour ouvrir la modale
function openProject(projectId) {
    const project = projectsData[projectId];
    
    if(!project) {
        console.error("Projet non trouvé : " + projectId);
        return; 
    }

    // 1. Remplir les infos
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

    // 2. Remplir les tags techniques
    modalTechs.innerHTML = project.techs.map(tech => 
        `<span class="skill-tag" style="display:inline-block; margin-right:5px; margin-bottom:5px; font-size:0.8rem; color:#fff; border:1px solid #333;">${tech}</span>`
    ).join('');

    // 3. Afficher la modale
    modal.classList.add('active');
    modal.classList.remove('hidden');
}

// Fonction globale pour fermer
function closeModal() {
    modal.classList.remove('active');
    setTimeout(() => modal.classList.add('hidden'), 300);
}

// Fermer si on clique en dehors
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

