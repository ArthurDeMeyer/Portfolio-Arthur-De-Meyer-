/* ==========================================================
   Portfolio Arthur De Meyer
   Tout le contenu vient de content.json (modifiable via Pages CMS).
   Ce fichier ne fait que l'afficher : pas besoin d'y toucher
   pour changer un texte, une image ou un projet.
   ========================================================== */

(() => {
  "use strict";

  /* ---------- Icônes (traits 1.5, style Lucide) ---------- */
  const ICONS = {
    "arrow-down": '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
    "arrow-up": '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
    "arrow-up-right": '<path d="M7 17 17 7"/><path d="M7 7h10v10"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    menu: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
    server: '<rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><path d="M6 6h.01"/><path d="M6 18h.01"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
    wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    terminal: '<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',
    network: '<rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/>'
  };
  const icon = (name) => ICONS[name]
    ? `<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name]}</svg>`
    : "";

  /* ---------- Outils ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = (s = "") => String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  // Mini-markdown : **gras** uniquement
  const md = (s = "") => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  const get = (obj, path) => path.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);
  const list = (v) => (Array.isArray(v) ? v.filter((x) => x !== null && x !== undefined && x !== "") : []);

  function fillIcons(root = document) {
    $$("[data-icon]", root).forEach((el) => { el.outerHTML = icon(el.dataset.icon); });
  }

  /* ---------- Rendu ---------- */
  function render(c) {
    const site = c.site || {};

    $$("[data-bind]").forEach((el) => {
      const v = get(c, el.dataset.bind);
      if (v != null) el.textContent = v;
    });

    const hrefs = {
      mailto: site.email ? `mailto:${site.email}` : "#",
      cv: site.cv || "#",
      linkedin: site.linkedin || "#",
      github: site.github || "#"
    };
    $$("[data-href]").forEach((el) => { el.href = hrefs[el.dataset.href] || "#"; });
    $("#year").textContent = new Date().getFullYear();

    // Profil
    const about = c.about || {};
    $("#about-text").innerHTML = list(about.paragraphs).map((p) => `<p>${md(p)}</p>`).join("");

    const stateLabel = { done: "atteint", current: "en cours", next: "* * *" };
    $("#roadmap").innerHTML = list(about.roadmap).map((h, i) => `
      <li class="hop is-${esc(h.status || "next")}">
        <span class="hop-n">${i + 1}</span>
        <span class="hop-title">${esc(h.title)}${h.status === "current" ? '<span class="led" aria-label="en cours"></span>' : ""}</span>
        <span class="hop-period">${esc(h.period)}</span>
        <span class="hop-text">${md(h.text)}</span>
        <span class="hop-state">${stateLabel[h.status] || ""}</span>
      </li>`).join("");

    // Compétences
    const skills = c.skills || {};
    $("#skills-featured").innerHTML = list(skills.featured).map((s) => `<li>${esc(s)}</li>`).join("");
    $("#skills-grid").innerHTML = list(skills.categories).map((cat) => `
      <div class="skill-col">
        <h3>${icon(cat.icon || "server")}${esc(cat.name)}</h3>
        <ul>${list(cat.items).map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
      </div>`).join("");

    // Projets
    const projects = list(c.projects);
    $("#projects").innerHTML = projects.map((p, i) => `
      <button class="project${i === 0 ? " is-wide" : ""}" data-project="${esc(p.id)}" aria-haspopup="dialog">
        ${p.image ? `<div class="project-shot"><img src="${esc(p.image)}" alt="" loading="lazy"></div>` : ""}
        <div class="project-info">
          <span class="project-title">${esc(p.title)}${icon("arrow-up-right")}</span>
          <span class="project-summary">${md(p.summary)}</span>
          <span class="project-stack">${list(p.techs).map(esc).join(" · ")}</span>
        </div>
      </button>`).join("");
    $$("[data-project]").forEach((b) => b.addEventListener("click", () => openProject(b.dataset.project)));

    // Expérience
    $("#experience").innerHTML = list(c.experience).map((e) => `
      <li class="entry${e.current ? " is-current" : ""}">
        <div class="entry-when">${e.current ? '<span class="led" aria-label="poste actuel"></span>' : ""}${esc(e.period)}</div>
        <div>
          <h3 class="entry-title">${esc(e.title)}</h3>
          <p class="entry-org">${esc(e.company)}${e.place ? `<span class="sep">·</span>${esc(e.place)}` : ""}</p>
          ${e.summary ? `<p class="entry-summary">${md(e.summary)}</p>` : ""}
          ${list(e.missions).length ? `<ul class="entry-missions">${list(e.missions).map((m) => `<li>${md(m)}</li>`).join("")}</ul>` : ""}
          ${list(e.tags).length ? `<p class="entry-tags">${list(e.tags).map(esc).join(" · ")}</p>` : ""}
        </div>
      </li>`).join("");

    // Formation
    $("#education").innerHTML = list(c.education).map((e) => `
      <li class="entry is-${esc(e.status || "done")}">
        <div class="entry-when">${e.status === "current" ? '<span class="led" aria-label="en cours"></span>' : ""}${esc(e.period)}</div>
        <div>
          <h3 class="entry-title">${esc(e.title)}</h3>
          <p class="entry-org">${esc(e.school)}</p>
          ${e.text ? `<p class="entry-summary">${md(e.text)}</p>` : ""}
          ${e.note ? `<span class="entry-note">${esc(e.note)}</span>` : ""}
        </div>
      </li>`).join("");

    fillIcons();
  }

  /* ---------- Fenêtre projet ---------- */
  let PROJECTS = {};
  const modal = $("#project-modal");

  function openProject(id) {
    const p = PROJECTS[id];
    if (!p || !modal) return false;
    $("#modal-title").textContent = p.title;
    $("#modal-body").innerHTML = `
      ${p.image ? `<img class="modal-img" src="${esc(p.image)}" alt="Capture : ${esc(p.title)}">` : ""}
      ${p.intro ? `<p class="modal-intro">${md(p.intro)}</p>` : ""}
      ${list(p.sections).map((s) => `
        <div class="modal-section">
          ${s.title ? `<h4>${esc(s.title)}</h4>` : ""}
          <ol>${list(s.items).map((it) => `<li>${md(it)}</li>`).join("")}</ol>
        </div>`).join("")}
      ${p.note ? `<p class="modal-note">${md(p.note)}</p>` : ""}
      ${p.code ? `<div>${p.codeLabel ? `<p class="code-label">${esc(p.codeLabel)}</p>` : ""}<pre class="code">${esc(p.code)}</pre></div>` : ""}
      ${list(p.techs).length ? `<p class="modal-techs">${list(p.techs).map(esc).join(" · ")}</p>` : ""}
      ${p.link ? `<a class="btn btn-secondary modal-link" href="${esc(p.link)}" target="_blank" rel="noopener">${icon("github")}Voir le code</a>` : ""}
    `;
    modal.showModal();
    $(".modal-body", modal).scrollTop = 0;
    return true;
  }
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal || e.target.closest("[data-close]")) modal.close();
    });
  }

  /* ---------- Terminal ---------- */
  function terminal(c) {
    const out = $("#terminal-output");
    if (!out) return;
    const site = c.site || {};
    const projects = list(c.projects);
    const history = [];
    let hIndex = 0;
    let input;

    const line = (html, cls = "") => {
      const d = document.createElement("div");
      d.className = `t-line ${cls}`.trim();
      d.innerHTML = html;
      out.appendChild(d);
      return d;
    };
    const scroll = () => { out.scrollTop = out.scrollHeight; };

    const commands = {
      help: () => {
        line("Commandes disponibles", "t-strong t-gap");
        [
          ["about", "qui je suis"],
          ["skills", "compétences par domaine"],
          ["projects", "liste des projets"],
          ["open <id>", "ouvrir un projet"],
          ["contact", "me joindre"],
          ["social", "LinkedIn et GitHub"],
          ["cv", "télécharger le CV"],
          ["clear", "vider l'écran"]
        ].forEach(([k, v]) => line(`<span class="t-key">${esc(k)}</span><span class="t-dim">${esc(v)}</span>`));
      },
      about: () => {
        line(`${esc(site.name)}`, "t-strong t-gap");
        line(esc(site.role));
        list(c.about && c.about.roadmap).forEach((h, i) => {
          const mark = h.status === "current" ? '<span class="t-ok">●</span>' : h.status === "done" ? '<span class="t-dim">✓</span>' : '<span class="t-dim">·</span>';
          line(`${mark} ${i + 1}  ${esc(h.title)} <span class="t-dim">${esc(h.period)}</span>`);
        });
        if (c.about && c.about.motto) line(esc(c.about.motto), "t-dim t-gap");
      },
      skills: () => {
        list(c.skills && c.skills.categories).forEach((cat) => {
          line(esc(cat.name), "t-strong t-gap");
          line(`<span class="t-dim">${list(cat.items).map(esc).join(" · ")}</span>`);
        });
      },
      projects: () => {
        line("Projets documentés", "t-strong t-gap");
        projects.forEach((p) => line(`<span class="t-key" style="min-width:16ch">${esc(p.id)}</span><span class="t-dim">${esc(p.title)}</span>`));
        line(`Tape <span class="t-strong">open &lt;id&gt;</span>, par exemple <span class="t-strong">open ${esc(projects[0] ? projects[0].id : "")}</span>`, "t-dim t-gap");
      },
      open: (arg) => {
        if (!arg) { line("Quel projet ? Usage : open <id>. Tape projects pour la liste.", "t-err"); return; }
        if (openProject(arg)) line(`Ouverture de <span class="t-strong">${esc(PROJECTS[arg].title)}</span>`, "t-ok");
        else line(`Projet introuvable : ${esc(arg)}. Tape projects pour la liste.`, "t-err");
      },
      contact: () => line(`<a class="t-link" href="mailto:${esc(site.email)}">${esc(site.email)}</a>`),
      social: () => {
        line(`LinkedIn  <a class="t-link" href="${esc(site.linkedin)}" target="_blank" rel="noopener">${esc((site.linkedin || "").replace(/^https?:\/\/(www\.)?/, ""))}</a>`);
        line(`GitHub    <a class="t-link" href="${esc(site.github)}" target="_blank" rel="noopener">${esc((site.github || "").replace(/^https?:\/\/(www\.)?/, ""))}</a>`);
      },
      cv: () => { line("Ouverture du CV…", "t-dim"); window.open(site.cv, "_blank", "noopener"); },
      clear: () => { out.innerHTML = ""; },
      whoami: () => line("visiteur"),
      ls: () => line("about/  skills/  projects/  experience/  cv.pdf  contact.txt"),
      sudo: () => line("visiteur n'est pas dans le fichier sudoers. Cet incident sera signalé.", "t-err"),
      rm: (arg, raw) => {
        if (!/-rf/.test(raw)) { line("rm : opérande manquant", "t-err"); return; }
        line("Suppression de System32…", "t-err");
        line("Je plaisante. Jamais en prod.", "t-ok");
      }
    };
    commands.project = commands.projects;
    commands.cls = commands.clear;
    commands.dir = commands.ls;

    const completions = () => [
      ...Object.keys(commands).filter((k) => !["cls", "dir", "project"].includes(k)),
      ...projects.map((p) => `open ${p.id}`)
    ];

    function run(raw) {
      const clean = raw.trim();
      line(`<span class="prompt">$</span> <span class="t-strong">${esc(clean)}</span>`, "t-gap");
      if (clean) { history.push(clean); hIndex = history.length; }
      const [cmd, ...rest] = clean.split(/\s+/);
      const fn = commands[(cmd || "").toLowerCase()];
      if (!cmd) { /* rien */ }
      else if (fn) fn(rest[0], clean);
      else line(`Commande inconnue : ${esc(cmd)}. Tape help.`, "t-err");
      prompt();
    }

    function prompt() {
      const row = document.createElement("div");
      row.className = "t-input-row";
      row.innerHTML = `<span class="prompt">$</span>`;
      input = document.createElement("input");
      input.className = "t-input";
      input.setAttribute("aria-label", "Commande");
      input.autocomplete = "off";
      input.spellcheck = false;
      input.setAttribute("autocapitalize", "off");
      row.appendChild(input);
      out.appendChild(row);

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const v = input.value;
          row.remove();
          run(v);
        } else if (e.key === "Tab") {
          e.preventDefault();
          const v = input.value.toLowerCase();
          const m = completions().find((k) => k.startsWith(v));
          if (m) input.value = m;
        } else if (e.key === "ArrowUp") {
          if (hIndex > 0) { hIndex--; input.value = history[hIndex]; }
          e.preventDefault();
        } else if (e.key === "ArrowDown") {
          if (hIndex < history.length - 1) { hIndex++; input.value = history[hIndex]; }
          else { hIndex = history.length; input.value = ""; }
          e.preventDefault();
        }
      });
      scroll();
    }

    // Démarrage
    line(`<span class="t-dim">Connecté à</span> portfolio <span class="t-dim">· session invité</span>`);
    line(`<span class="t-ok">●</span> link up <span class="t-dim">· ${esc(site.status || "")}</span>`);
    line("Tape une commande ou clique ci-dessous. Tab complète.", "t-hint");
    const chips = line("", "t-chips");
    ["help", "about", "projects", "skills", "contact"].forEach((k) => {
      const b = document.createElement("button");
      b.className = "t-chip";
      b.type = "button";
      b.textContent = k;
      b.addEventListener("click", (e) => {
        e.stopPropagation();
        const row = $(".t-input-row", out);
        if (row) row.remove();
        run(k);
        input.focus({ preventScroll: true });
      });
      chips.appendChild(b);
    });
    prompt();

    $("#terminal").addEventListener("click", (e) => {
      if (e.target.closest("a, button")) return;
      if (window.getSelection().toString()) return;
      input && input.focus({ preventScroll: true });
    });
  }

  /* ---------- Navigation ---------- */
  function nav() {
    const toggle = $("#nav-toggle");
    const links = $("#nav-links");
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    $$("a", links).forEach((a) => a.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }));

    // Lien actif selon la section visible
    const map = new Map($$("a", links).map((a) => [a.getAttribute("href").slice(1), a]));
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          map.forEach((a) => a.classList.remove("is-active"));
          const a = map.get(en.target.id);
          if (a) a.classList.add("is-active");
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) obs.observe(s); });
  }

  /* ---------- Lancement ---------- */
  fillIcons();
  nav();
  fetch("content.json", { cache: "no-cache" })
    .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then((c) => {
      PROJECTS = Object.fromEntries(list(c.projects).map((p) => [p.id, p]));
      render(c);
      terminal(c);
    })
    .catch((err) => {
      console.error("content.json illisible :", err);
      $("#main").insertAdjacentHTML("afterbegin",
        '<p class="wrap" style="padding-top:24px;color:#e5484d">Le contenu n\'a pas pu être chargé. Vérifie que content.json est un JSON valide.</p>');
    });
})();
