/* ==========================================================
   Portfolio Arthur De Meyer — moteur d'affichage
   Tout le contenu vient de content.json (modifiable via Pages CMS).
   Pas besoin de toucher ce fichier pour changer un texte ou une image.
   ========================================================== */

(() => {
  "use strict";
  document.documentElement.classList.add("js");

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  const md = (s = "") => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  const get = (o, p) => p.split(".").reduce((a, k) => (a == null ? a : a[k]), o);
  const list = (v) => (Array.isArray(v) ? v.filter((x) => x !== null && x !== undefined && x !== "") : []);
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const FINE = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const hash = (s) => { let h = 0; for (const ch of String(s)) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return h.toString(16).padStart(7, "0").slice(0, 7); };

  let C = {};
  let PROJECTS = {};

  /* ============ MATRIX RAIN ============ */
  const matrix = (() => {
    const cv = $("#matrix");
    const ctx = cv.getContext("2d");
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF<>/{}[]$#@%&*+=";
    const fs = 16;
    let w, h, cols, drops, speed = 1, raf, last = 0, running = true;
    const mouse = { x: -999, y: -999 };

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.width = innerWidth * dpr; h = cv.height = innerHeight * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.scale(dpr, dpr);
      cols = Math.ceil(innerWidth / fs);
      drops = Array.from({ length: cols }, () => Math.random() * -60);
      ctx.fillStyle = "#030504"; ctx.fillRect(0, 0, innerWidth, innerHeight);
    }
    function frame(t) {
      raf = requestAnimationFrame(frame);
      if (!running || t - last < 50 / speed) return;
      last = t;
      ctx.fillStyle = "rgba(3, 5, 4, 0.09)";
      ctx.fillRect(0, 0, innerWidth, innerHeight);
      ctx.font = `${fs}px "JetBrains Mono", monospace`;
      for (let i = 0; i < cols; i++) {
        const x = i * fs, y = drops[i] * fs;
        const near = Math.hypot(x - mouse.x, y - mouse.y) < 140;
        ctx.fillStyle = near ? "#ffffff" : Math.random() > 0.975 ? "#b6ffe0" : "#00ff9d";
        ctx.fillText(chars[(Math.random() * chars.length) | 0], x, y);
        if (y > innerHeight && Math.random() > 0.975) drops[i] = 0;
        drops[i] += near ? 0.4 : 1;
      }
    }
    function staticFrame() {
      ctx.font = `${fs}px monospace`; ctx.fillStyle = "rgba(0,255,157,0.35)";
      for (let i = 0; i < cols; i++) for (let j = 0; j < 6; j++)
        if (Math.random() > 0.7) ctx.fillText(chars[(Math.random() * chars.length) | 0], i * fs, (Math.random() * innerHeight) | 0);
    }
    resize();
    addEventListener("resize", () => { resize(); if (REDUCED) staticFrame(); });
    if (REDUCED) staticFrame(); else raf = requestAnimationFrame(frame);
    document.addEventListener("visibilitychange", () => { running = !document.hidden; });
    addEventListener("pointermove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
    return { boost(v) { speed = v; } };
  })();

  /* ============ BOOT ============ */
  async function boot() {
    const el = $("#boot");
    const done = () => { el.classList.add("is-done"); document.body.classList.remove("is-booting"); setTimeout(() => el.remove(), 600); };
    let seen = false;
    try { seen = sessionStorage.getItem("booted") === "1"; sessionStorage.setItem("booted", "1"); } catch (e) { /* stockage indispo */ }
    if (REDUCED || seen) { done(); return; }

    let skip = false;
    const skipFn = () => { skip = true; };
    el.addEventListener("click", skipFn);
    const onKey = (e) => { if (e.key === "Escape" || e.key === "Enter" || e.key === " ") skipFn(); };
    addEventListener("keydown", onKey);

    const log = $("#boot-log");
    const lines = [
      ['<span class="d">[    0.000000]</span> Linux version 6.8.0-arthur (root@portfolio)', 60],
      ['<span class="d">[    0.041337]</span> Initializing kernel modules… <span class="w">[ OK ]</span>', 90],
      ['<span class="d">[    0.120004]</span> Mounting /dev/experience… <span class="w">[ OK ]</span>', 90],
      ['<span class="d">[    0.200813]</span> Loading Active Directory, pfSense, Cisco IOS… <span class="w">[ OK ]</span>', 120],
      ['<span class="d">[    0.316220]</span> Starting firewall: DENY ALL by default… <span class="w">[ OK ]</span>', 90],
      ['<span class="d">[    0.402901]</span> Establishing secure session… <span class="w">[ OK ]</span>', 140],
      ["", 60],
      ['<span class="w">Welcome, visitor.</span> System is ONLINE.', 300]
    ];
    for (const [html, ms] of lines) {
      if (skip) break;
      log.insertAdjacentHTML("beforeend", html + "\n");
      await sleep(ms);
    }
    if (!skip) await sleep(250);
    removeEventListener("keydown", onKey);
    done();
  }

  /* ============ EFFETS TEXTE ============ */
  const GLYPHS = "!<>-_\\/[]{}—=+*^?#01ABCDEF";
  function scramble(el, finalText, dur = 900) {
    if (REDUCED) { el.textContent = finalText; return; }
    const start = performance.now();
    const step = (t) => {
      const p = Math.min((t - start) / dur, 1);
      const reveal = Math.floor(p * finalText.length);
      let out = "";
      for (let i = 0; i < finalText.length; i++) {
        const ch = finalText[i];
        out += i < reveal || ch === " " ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  async function typeLoop(el, phrases) {
    if (!phrases.length) return;
    if (REDUCED) { el.textContent = phrases[0]; return; }
    let i = 0;
    for (;;) {
      const p = phrases[i % phrases.length];
      for (let k = 1; k <= p.length; k++) { el.textContent = p.slice(0, k); await sleep(45 + Math.random() * 40); }
      await sleep(2200);
      for (let k = p.length; k >= 0; k--) { el.textContent = p.slice(0, k); await sleep(22); }
      await sleep(300);
      i++;
    }
  }

  function countUp(el, to, dur = 1400) {
    if (REDUCED) { el.textContent = to; return; }
    const s = performance.now();
    const step = (t) => { const p = Math.min((t - s) / dur, 1); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }

  /* ============ RENDU ============ */
  function render() {
    const site = C.site || {};

    $$("[data-bind]").forEach((el) => { const v = get(C, el.dataset.bind); if (v != null) el.textContent = v; });
    const hrefs = { mailto: site.email ? `mailto:${site.email}` : "#", cv: site.cv || "#", linkedin: site.linkedin || "#", github: site.github || "#" };
    $$("[data-href]").forEach((el) => { el.href = hrefs[el.dataset.href] || "#"; });
    $("#year").textContent = new Date().getFullYear();

    // Nom glitch
    const name = (site.name || "").toUpperCase();
    const h1 = $("#hero-name");
    h1.dataset.text = name; h1.textContent = name;

    // Ticker
    const feat = list(C.skills && C.skills.featured);
    const tick = feat.map((s) => `<span>${esc(s)}</span>`).join("");
    $("#ticker").innerHTML = tick + tick;

    // Profil
    const about = C.about || {};
    $("#about-text").innerHTML = list(about.paragraphs).map((p) => `<p>${md(p)}</p>`).join("");
    const hopState = { done: "✓ hop atteint", current: "en cours", next: "* * *  en attente" };
    $("#roadmap").innerHTML = list(about.roadmap).map((h, i) => `
      <li class="hop ${esc(h.status || "next")}">
        <span class="hop-n">${String(i + 1).padStart(2, "0")}</span>
        <span class="hop-t">${esc(h.title)}</span>
        <span class="hop-p">${esc(h.period)}</span>
        <span class="hop-x">${md(h.text)}</span>
        <span class="hop-s">${hopState[h.status] || ""}</span>
      </li>`).join("");

    // Skills (nmap)
    const ports = [22, 53, 88, 443, 445, 3389, 8080];
    $("#skills-grid").innerHTML = list(C.skills && C.skills.categories).map((cat, i) => `
      <div class="svc">
        <div class="svc-head">
          <span class="svc-port">${ports[i % ports.length]}/tcp</span>
          <span class="svc-name">${esc(cat.name)}</span>
          <span class="svc-state">filtered</span>
        </div>
        <ul>${list(cat.items).map((it, k) => `<li style="transition-delay:${k * 45}ms">${esc(it)}</li>`).join("")}</ul>
      </div>`).join("");

    // Projets
    const projects = list(C.projects);
    const lastWide = projects.length > 1 && (projects.length - 1) % 2 === 1;
    $("#projects").innerHTML = projects.map((p, i) => {
      const wide = i === 0 || (lastWide && i === projects.length - 1);
      return `
      <button class="proj${wide ? " wide" : ""}" data-project="${esc(p.id)}" aria-haspopup="dialog" data-reveal>
        ${p.image ? `<div class="proj-shot"><span class="proj-scan"></span><img src="${esc(p.image)}" alt="" loading="lazy"></div>` : ""}
        <div class="proj-info">
          <span class="proj-meta"><span class="perm">drwxr-xr-x</span><span>./${esc(p.id)}</span></span>
          <span class="proj-title">${esc(p.title)}</span>
          <span class="proj-sum">${md(p.summary)}</span>
          <span class="proj-tags">${list(p.techs).map((t) => `<span>${esc(t)}</span>`).join("")}</span>
          <span class="proj-cta">open ${esc(p.id)}</span>
        </div>
      </button>`;
    }).join("");
    $$("[data-project]").forEach((b) => b.addEventListener("click", () => openProject(b.dataset.project)));

    // Expérience (git log)
    $("#experience").innerHTML = list(C.experience).map((e, i) => `
      <li class="commit${e.current ? " current" : ""}">
        <div class="commit-line">
          <span class="commit-hash">${hash(e.company + e.period)}</span>
          ${e.current ? '<span class="commit-ref">HEAD → main</span>' : i === 1 ? '<span class="commit-ref old">origin/past</span>' : ""}
          <span class="commit-date">${esc(e.period)}</span>
        </div>
        <div class="commit-card">
          <h3 class="commit-title">${esc(e.title)}</h3>
          <p class="commit-org">@${esc(e.company)}${e.place ? `<span class="dim">//</span><span class="dim">${esc(e.place)}</span>` : ""}</p>
          ${e.summary ? `<p class="commit-sum">${md(e.summary)}</p>` : ""}
          ${list(e.missions).length ? `<ul class="commit-missions">${list(e.missions).map((m) => `<li>${md(m)}</li>`).join("")}</ul>` : ""}
          ${list(e.tags).length ? `<div class="commit-tags">${list(e.tags).map((t) => `<span>${esc(t)}</span>`).join("")}</div>` : ""}
        </div>
      </li>`).join("");

    // Formation (apt)
    const verb = { done: "installed", current: "unpacking", next: "queued" };
    const pct = { done: 1, current: 0.5, next: 0.04 };
    const label = { done: "100%", current: "en cours", next: "objectif" };
    $("#education").innerHTML = list(C.education).map((e) => {
      const st = e.status || "done";
      return `
      <li class="pkg ${esc(st)}">
        <div class="pkg-head">
          <span class="pkg-verb">[${verb[st] || st}]</span>
          <span class="pkg-t">${esc(e.title)}</span>
          <span class="pkg-p">${esc(e.period)}</span>
        </div>
        <p class="pkg-sub">${esc(e.school)}${e.text ? ` <span class="dim">— ${md(e.text)}</span>` : ""}</p>
        <div class="pkg-bar"><span class="bar"><i style="--p:${pct[st] ?? 1}"></i></span><span>${label[st] || ""}</span></div>
        ${e.note ? `<span class="pkg-note">${esc(e.note)}</span>` : ""}
      </li>`;
    }).join("");

    // HUD
    const since = Number(site.since) || 2021;
    const counts = {
      years: Math.max(1, new Date().getFullYear() - since),
      projects: projects.length,
      titles: list(C.education).filter((e) => e.status === "done").length
    };
    $$("[data-count]").forEach((el) => countUp(el, counts[el.dataset.count] || 0));

    typeLoop($("#typing"), list(site.taglines).length ? list(site.taglines) : [site.role || ""]);
  }

  /* ============ FENÊTRE PROJET ============ */
  const modal = $("#modal");
  function openProject(id) {
    const p = PROJECTS[id];
    if (!p) return false;
    $("#modal-file").textContent = `~/laboratoire/${p.id}/README.md`;
    $("#modal-body").innerHTML = `
      <h3 class="m-title" id="modal-title"></h3>
      ${p.image ? `<img class="m-img" src="${esc(p.image)}" alt="Capture : ${esc(p.title)}">` : ""}
      ${p.intro ? `<p class="m-intro">${md(p.intro)}</p>` : ""}
      ${list(p.sections).map((s) => `
        <div class="m-sec">
          ${s.title ? `<h4>${esc(s.title)}</h4>` : ""}
          <ol>${list(s.items).map((it, i) => `<li><span class="n">${String(i + 1).padStart(2, "0")}</span>${md(it)}</li>`).join("")}</ol>
        </div>`).join("")}
      ${p.note ? `<p class="m-note">${md(p.note)}</p>` : ""}
      ${p.code ? `<div>${p.codeLabel ? `<p class="m-code-label">// ${esc(p.codeLabel)}</p>` : ""}<div class="m-code-wrap"><pre class="m-code">${esc(p.code)}</pre><button class="m-copy" type="button">copier</button></div></div>` : ""}
      ${list(p.techs).length ? `<div class="m-tags">${list(p.techs).map((t) => `<span>${esc(t)}</span>`).join("")}</div>` : ""}
      ${p.link ? `<a class="btn btn-ghost m-link" href="${esc(p.link)}" target="_blank" rel="noopener"><span>voir le code</span></a>` : ""}
    `;
    const copy = $(".m-copy", modal);
    if (copy) copy.addEventListener("click", () => {
      navigator.clipboard.writeText(p.code).then(() => { copy.textContent = "copié ✓"; setTimeout(() => (copy.textContent = "copier"), 1500); }).catch(() => {});
    });
    modal.showModal();
    $(".modal-body", modal).scrollTop = 0;
    scramble($("#modal-title"), p.title, 600);
    return true;
  }
  modal.addEventListener("click", (e) => { if (e.target === modal || e.target.closest("[data-close]")) modal.close(); });

  /* ============ TERMINAL ============ */
  function terminal() {
    const out = $("#term-out");
    const site = C.site || {};
    const projects = list(C.projects);
    const hist = []; let hi = 0; let input; let busy = false;

    const line = (html, cls = "") => { const d = document.createElement("div"); d.className = `t-line ${cls}`.trim(); d.innerHTML = html; out.appendChild(d); out.scrollTop = out.scrollHeight; return d; };
    const slow = async (rows, ms = 70) => { for (const [h, c] of rows) { line(h, c); await sleep(REDUCED ? 0 : ms); } };

    const cmds = {
      help: () => {
        line("Commandes disponibles :", "t-w t-gap");
        [["neofetch", "fiche système"], ["about", "qui je suis"], ["skills", "stack technique"], ["projects", "liste des labs"], ["open <id>", "ouvrir un projet"],
         ["roadmap", "plan de carrière"], ["contact", "me joindre"], ["social", "LinkedIn / GitHub"], ["cv", "télécharger le CV"], ["matrix", "?"], ["clear", "vider l'écran"]]
          .forEach(([k, v]) => line(`<span class="t-key">${esc(k)}</span><span class="t-d">${esc(v)}</span>`));
      },
      neofetch: () => {
        const ascii = [
          "   █████╗ ██████╗ ",
          "  ██╔══██╗██╔══██╗",
          "  ███████║██║  ██║",
          "  ██╔══██║██║  ██║",
          "  ██║  ██║██████╔╝",
          "  ╚═╝  ╚═╝╚═════╝ "
        ].join("\n");
        const since = Number(site.since) || 2021;
        const info = [
          `<span class="t-g">arthur</span>@<span class="t-g">demeyer</span>`,
          "──────────────────",
          `<span class="t-g">Rôle</span>   ${esc(site.role || "")}`,
          `<span class="t-g">Statut</span> ${esc(site.status || "")}`,
          `<span class="t-g">Uptime</span> ${new Date().getFullYear() - since} ans dans l'IT`,
          `<span class="t-g">Shell</span>  PowerShell, Bash`,
          `<span class="t-g">Labs</span>   ${projects.length} projets documentés`,
          `<span class="t-g">Cible</span>  <span class="t-r">Expert cybersécurité</span>`
        ].join("\n");
        line(`<div class="t-neo"><pre class="t-ascii">${ascii}</pre><div>${info}</div></div>`, "t-gap");
      },
      about: () => {
        line(`${esc(site.name)}`, "t-w t-gap");
        line(`<span class="t-g">&gt;</span> ${esc(site.headline || site.role || "")}`);
        list(C.about && C.about.paragraphs).slice(0, 1).forEach((p) => line(esc(p.replace(/\*\*/g, "")), "t-d"));
        if (C.about && C.about.motto) line(`Philosophie : <span class="t-g">${esc(C.about.motto)}</span>`, "t-gap");
      },
      skills: async () => {
        line("Starting Nmap scan on arthur.local…", "t-gap t-d");
        for (const cat of list(C.skills && C.skills.categories)) {
          await sleep(REDUCED ? 0 : 160);
          line(`<span class="t-g">open</span>  <span class="t-w">${esc(cat.name)}</span>`);
          line(`      <span class="t-d">${list(cat.items).map(esc).join(" · ")}</span>`);
        }
        line(`Nmap done: ${list(C.skills && C.skills.categories).length} services up`, "t-g t-gap");
      },
      projects: () => {
        line("drwxr-xr-x  laboratoire/", "t-w t-gap");
        projects.forEach((p) => line(`<span class="t-key" style="min-width:17ch">${esc(p.id)}</span><span class="t-d">${esc(p.title)}</span>`));
        line(`Tape <span class="t-w">open ${esc(projects[0] ? projects[0].id : "<id>")}</span> pour ouvrir un projet.`, "t-d t-gap");
      },
      open: (a) => {
        if (!a) { line("Usage : open &lt;id&gt; · tape projects pour la liste", "t-r"); return; }
        if (openProject(a)) line(`Ouverture de <span class="t-w">${esc(PROJECTS[a].title)}</span>…`, "t-g");
        else line(`open: ${esc(a)}: projet introuvable`, "t-r");
      },
      roadmap: async () => {
        line("traceroute to cybersecurite, 3 hops max", "t-gap t-d");
        let i = 1;
        for (const h of list(C.about && C.about.roadmap)) {
          await sleep(REDUCED ? 0 : 300);
          const st = h.status === "next" ? '<span class="t-r">* * *</span>' : h.status === "current" ? '<span class="t-g">● en cours</span>' : '<span class="t-g">✓</span>';
          line(` ${i++}  <span class="t-w">${esc(h.title)}</span>  <span class="t-d">${esc(h.period)}</span>  ${st}`);
        }
      },
      contact: () => { line(`Email : <a class="t-link" href="mailto:${esc(site.email)}">${esc(site.email)}</a>`, "t-gap"); },
      social: () => {
        line(`LinkedIn  <a class="t-link" href="${esc(site.linkedin)}" target="_blank" rel="noopener">${esc((site.linkedin || "").replace(/^https?:\/\/(www\.)?/, ""))}</a>`, "t-gap");
        line(`GitHub    <a class="t-link" href="${esc(site.github)}" target="_blank" rel="noopener">${esc((site.github || "").replace(/^https?:\/\/(www\.)?/, ""))}</a>`);
      },
      cv: async () => {
        line("Downloading cv.pdf…", "t-gap");
        const bar = line("[                    ] 0%", "t-g");
        for (let k = 1; k <= 20; k++) { await sleep(REDUCED ? 0 : 35); bar.textContent = `[${"#".repeat(k)}${" ".repeat(20 - k)}] ${k * 5}%`; }
        window.open(site.cv, "_blank", "noopener");
        line("[DOWNLOAD COMPLETE]", "t-g");
      },
      whoami: () => line("visitor_guest", "t-gap"),
      ls: () => line("about/  skills/  projects/  experience/  cv.pdf  contact.txt", "t-gap"),
      pwd: () => line("/home/arthur/portfolio", "t-gap"),
      date: () => line(new Date().toLocaleString("fr-FR"), "t-gap"),
      ping: async (a) => {
        const host = a || "arthur-de-meyer.fr";
        line(`PING ${esc(host)}: 56 data bytes`, "t-gap");
        for (let k = 0; k < 4; k++) { await sleep(REDUCED ? 0 : 250); line(`64 bytes from ${esc(host)}: icmp_seq=${k} ttl=64 time=${(Math.random() * 9 + 2).toFixed(1)} ms`, "t-d"); }
        line("4 packets transmitted, 4 received, 0% packet loss", "t-g");
      },
      matrix: () => { toggleMatrix(); line("Wake up, visitor… The Matrix has you.", "t-g t-gap"); },
      hack: async () => {
        await slow([
          ["Initializing exploit framework…", "t-gap t-d"],
          ["[*] Scanning target… <span class=\"t-g\">done</span>", ""],
          ["[*] Bypassing firewall… <span class=\"t-r\">DENIED</span>", ""],
          ["[!] Nice try. Ce firewall, c'est moi qui l'ai configuré.", "t-a"]
        ], 400);
      },
      sudo: () => line("visitor_guest is not in the sudoers file. This incident will be reported.", "t-r t-gap"),
      rm: async (a, raw) => {
        if (!/-rf/.test(raw)) { line("rm: missing operand", "t-r t-gap"); return; }
        await slow([["CRITICAL: system deletion sequence initiated…", "t-r t-gap"], ["Deleting System32…", "t-r"], ["Formatting C:…", "t-r"], ["Just kidding. Never on prod.", "t-g"]], 500);
      },
      exit: () => line("Il n'y a pas de sortie. Seulement des projets. Tape projects.", "t-gap t-a"),
      clear: () => { out.innerHTML = ""; }
    };
    const alias = { project: "projects", cls: "clear", dir: "ls", "?": "help", man: "help" };
    const completions = () => [...Object.keys(cmds), ...projects.map((p) => `open ${p.id}`)];

    async function run(raw) {
      const clean = raw.trim();
      line(`<span class="t-g">root@portfolio:~$</span> <span class="t-w">${esc(clean)}</span>`, "t-gap");
      if (clean) { hist.push(clean); hi = hist.length; }
      const [c, ...rest] = clean.split(/\s+/);
      const key = alias[(c || "").toLowerCase()] || (c || "").toLowerCase();
      busy = true;
      if (!c) { /* rien */ } else if (cmds[key]) await cmds[key](rest[0], clean); else line(`zsh: command not found: ${esc(c)} · tape help`, "t-r");
      busy = false;
      prompt();
    }

    function prompt() {
      const row = document.createElement("div");
      row.className = "t-row";
      row.innerHTML = `<span class="t-g">root@portfolio:~$</span>`;
      input = document.createElement("input");
      input.className = "t-input"; input.setAttribute("aria-label", "Commande"); input.autocomplete = "off"; input.spellcheck = false; input.setAttribute("autocapitalize", "off");
      row.appendChild(input); out.appendChild(row); out.scrollTop = out.scrollHeight;
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") { const v = input.value; row.remove(); run(v).then(() => input.focus({ preventScroll: true })); }
        else if (e.key === "Tab") { e.preventDefault(); const v = input.value.toLowerCase(); const m = completions().find((k) => k.startsWith(v)); if (m) input.value = m; }
        else if (e.key === "ArrowUp") { e.preventDefault(); if (hi > 0) input.value = hist[--hi]; }
        else if (e.key === "ArrowDown") { e.preventDefault(); if (hi < hist.length - 1) input.value = hist[++hi]; else { hi = hist.length; input.value = ""; } }
        else if (e.key === "l" && e.ctrlKey) { e.preventDefault(); out.innerHTML = ""; prompt(); input.focus(); }
      });
    }

    (async () => {
      await slow([
        ["Last login: " + new Date().toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" }) + " from 127.0.0.1", "t-d"],
        ["Initializing kernel… <span class=\"t-g\">[OK]</span>", ""],
        ["Loading modules… <span class=\"t-g\">[OK]</span>", ""],
        ["Mounting file system… <span class=\"t-g\">[OK]</span>", ""],
        [`Welcome, visitor. System is <span class="t-g">ONLINE</span>.`, "t-w"]
      ], 160);
      cmds.neofetch();
      line("Tape <span class=\"t-w\">help</span> ou clique une commande · Tab complète · ↑ historique", "t-d t-gap");
      const chips = line("", "t-chips");
      ["help", "about", "projects", "skills", "roadmap", "hack"].forEach((k) => {
        const b = document.createElement("button");
        b.className = "t-chip"; b.type = "button"; b.textContent = k;
        b.addEventListener("click", async (e) => {
          e.stopPropagation();
          if (busy) return;
          const r = $(".t-row", out); if (r) r.remove();
          await run(k);
        });
        chips.appendChild(b);
      });
      prompt();
    })();

    $("#terminal").addEventListener("click", (e) => {
      if (e.target.closest("a, button") || window.getSelection().toString()) return;
      if (input) input.focus({ preventScroll: true });
    });
  }

  /* ============ INTERACTIONS ============ */
  let matrixOn = false;
  function toggleMatrix(force) {
    matrixOn = force ?? !matrixOn;
    document.body.classList.toggle("matrix-max", matrixOn);
    matrix.boost(matrixOn ? 2.5 : 1);
  }

  function interactions() {
    // Nav
    const nav = $("#nav"); const toggle = $("#nav-toggle"); const links = $("#nav-links");
    const onScroll = () => nav.classList.toggle("is-scrolled", scrollY > 20);
    addEventListener("scroll", onScroll, { passive: true }); onScroll();
    toggle.addEventListener("click", () => { const o = links.classList.toggle("is-open"); toggle.setAttribute("aria-expanded", String(o)); });
    $$("a", links).forEach((a) => a.addEventListener("click", () => { links.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); }));
    const map = new Map($$("a", links).map((a) => [a.getAttribute("href").slice(1), a]));
    const navObs = new IntersectionObserver((en) => en.forEach((x) => {
      if (x.isIntersecting) { map.forEach((a) => a.classList.remove("is-active")); const a = map.get(x.target.id); if (a) a.classList.add("is-active"); }
    }), { rootMargin: "-45% 0px -50% 0px" });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) navObs.observe(s); });

    // Révélations + scramble des titres
    const revObs = new IntersectionObserver((en) => en.forEach((x) => {
      if (!x.isIntersecting) return;
      x.target.classList.add("is-in");
      $$("[data-scramble]", x.target).forEach((h) => { if (!h.dataset.done) { h.dataset.done = 1; scramble(h, h.dataset.final || h.textContent, 800); } });
      revObs.unobserve(x.target);
    }), { threshold: 0.12 });
    $$("[data-scramble]").forEach((h) => { h.dataset.final = h.textContent; });
    $$("[data-reveal], .commit").forEach((el, i) => { if (el.classList.contains("commit") || el.classList.contains("proj")) el.style.transitionDelay = `${(i % 3) * 80}ms`; revObs.observe(el); });

    // Scan nmap
    const nmap = $(".nmap");
    const scanObs = new IntersectionObserver(async (en) => {
      if (!en[0].isIntersecting) return;
      scanObs.disconnect();
      const svcs = $$(".svc", nmap); const bar = $("#scan-bar"); const pct = $("#scan-pct");
      const total = svcs.length || 1;
      for (let i = 0; i < svcs.length; i++) {
        await sleep(REDUCED ? 0 : 380);
        svcs[i].classList.add("is-open"); $(".svc-state", svcs[i]).textContent = "open";
        const p = Math.round(((i + 1) / total) * 100);
        bar.style.transform = `scaleX(${p / 100})`; bar.style.transition = "transform 360ms"; pct.textContent = `${p}%`;
      }
      const items = $$(".svc li", nmap).length;
      $("#scan-foot").innerHTML = `Nmap done: 1 IP address (1 host up) · <span class="accent">${total} services, ${items} compétences détectées</span> · scanned in ${(Math.random() * 2 + 1.2).toFixed(2)}s`;
    }, { threshold: 0.25 });
    if (nmap) scanObs.observe(nmap);

    // Barres apt
    const apt = $(".apt");
    const aptObs = new IntersectionObserver((en) => { if (en[0].isIntersecting) { apt.classList.add("is-in"); aptObs.disconnect(); } }, { threshold: 0.2 });
    if (apt) aptObs.observe(apt);

    // Effets souris (desktop)
    if (FINE && !REDUCED) {
      const glow = $("#glow-cursor");
      addEventListener("pointermove", (e) => { glow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`; }, { passive: true });

      const term = $("#terminal");
      term.addEventListener("pointermove", (e) => {
        const r = term.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        term.style.setProperty("--ry", `${x * 6}deg`); term.style.setProperty("--rx", `${-y * 6}deg`);
      });
      term.addEventListener("pointerleave", () => { term.style.removeProperty("--ry"); term.style.removeProperty("--rx"); });

      document.addEventListener("pointermove", (e) => {
        const card = e.target.closest && e.target.closest(".proj");
        if (!card) return;
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        card.style.setProperty("--mx", `${x * 100}%`); card.style.setProperty("--my", `${y * 100}%`);
        card.style.setProperty("--ry", `${(x - 0.5) * 5}deg`); card.style.setProperty("--rx", `${-(y - 0.5) * 5}deg`);
      }, { passive: true });
      document.addEventListener("pointerout", (e) => {
        const card = e.target.closest && e.target.closest(".proj");
        if (card && !card.contains(e.relatedTarget)) { card.style.setProperty("--rx", "0deg"); card.style.setProperty("--ry", "0deg"); }
      });
    }

    // Glitch du nom au survol
    const h1 = $("#hero-name");
    h1.addEventListener("pointerenter", () => scramble(h1, h1.dataset.text, 500));

    // Horloge
    const clock = $("#clock");
    const tickClock = () => { clock.textContent = new Date().toLocaleTimeString("fr-FR", { timeZone: "Europe/Paris" }) + " (Paris)"; };
    tickClock(); setInterval(tickClock, 1000);

    // Konami
    const code = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    let pos = 0;
    addEventListener("keydown", (e) => {
      if (e.target.matches && e.target.matches("input, textarea")) return;
      pos = e.key.toLowerCase() === code[pos].toLowerCase() ? pos + 1 : (e.key === code[0] ? 1 : 0);
      if (pos === code.length) {
        pos = 0;
        const a = $("#access"); a.classList.add("is-on"); toggleMatrix(true);
        setTimeout(() => { a.classList.remove("is-on"); }, 1800);
        setTimeout(() => toggleMatrix(false), 6000);
      }
    });
  }

  /* ============ LANCEMENT ============ */
  boot();
  fetch("content.json", { cache: "no-cache" })
    .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then((c) => {
      C = c;
      PROJECTS = Object.fromEntries(list(c.projects).map((p) => [p.id, p]));
      render();
      interactions();
      terminal();
    })
    .catch((err) => {
      console.error("content.json illisible :", err);
      $("#main").insertAdjacentHTML("afterbegin", '<p class="wrap" style="padding-top:24px;color:#ff3b5c">ERREUR : content.json n\'a pas pu être chargé. Vérifie que c\'est un JSON valide.</p>');
    });
})();
