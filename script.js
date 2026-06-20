/* ============================================================
   Renders content from config.js, the animated background,
   the "Save contact" vCard, and the hidden Snake game
   (Konami code on desktop, tap-to-play + swipe on mobile).
   You normally don't need to edit this file.
   ============================================================ */
(function () {
  "use strict";
  const S = window.SITE || {};
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Text content ---------- */
  function setText(sel, val) { const el = $(sel); if (el && val != null && val !== "") el.textContent = val; }
  document.title = S.name || "Personal Site";
  setText("#nav-name", (S.name || "").split(" ")[0]);
  setText("#hero-name", S.name);
  setText("#hero-role", S.role);
  setText("#hero-bio", S.bio);
  setText("#footer-name", S.name);
  setText("#footer-domain", S.domain);
  const avatar = $("#avatar");
  if (avatar) {
    if (S.photo) {
      avatar.classList.add("avatar--photo");
      avatar.innerHTML = `<img src="${esc(S.photo)}" alt="${esc(S.name)}" />`;
    } else if (S.initials) {
      avatar.textContent = S.initials;
    }
  }
  const cta = $("#hero-cta");
  if (cta) { cta.textContent = S.heroCtaLabel || "See my work"; cta.href = S.heroCtaHref || "#projects"; }

  /* ---------- Projects ---------- */
  const STATUS_CLASS = { live: "status--live", building: "status--building", beta: "status--beta", "coming soon": "status--soon" };
  const grid = $("#projects-grid");
  if (grid && Array.isArray(S.projects)) {
    grid.innerHTML = "";
    S.projects.forEach((p) => {
      const hasLink = p.link && p.link.trim();
      const card = document.createElement(hasLink ? "a" : "div");
      card.className = "project";
      if (hasLink) { card.href = p.link; card.target = "_blank"; card.rel = "noopener"; }

      const tags = (p.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("");
      const statusCls = STATUS_CLASS[(p.status || "").toLowerCase()] || "status--soon";
      const statusEl = p.status ? `<span class="status ${statusCls}">${esc(p.status)}</span>` : "";
      const icon = p.logo
        ? `<img class="project__icon" src="${esc(p.logo)}" alt="${esc(p.name)} icon" loading="lazy" />`
        : `<div class="project__icon" style="display:grid;place-items:center;font-weight:800;color:#5b5bf0">${esc((p.name||"?")[0])}</div>`;
      const linkRow = hasLink
        ? `<span class="project__link">${esc(p.linkLabel || "Visit")} <span class="arrow">↗</span></span>`
        : (p.linkLabel ? `<span class="project__link" style="color:var(--text-faint)">${esc(p.linkLabel)} — soon</span>` : "");

      card.innerHTML = `
        ${icon}
        <div class="project__body">
          <div class="project__top">
            <span class="project__name">${esc(p.name || "Untitled")}</span>
            ${statusEl}
          </div>
          <p class="project__blurb">${esc(p.blurb || "")}</p>
          <div class="project__meta">${tags}</div>
          ${linkRow}
        </div>`;
      grid.appendChild(card);
    });
  }

  /* ---------- Contact ---------- */
  const ICONS = {
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1a11 11 0 0 0-3.5 21.4c.55.1.75-.24.75-.53v-1.9c-3 .65-3.7-1.4-3.7-1.4-.5-1.3-1.2-1.6-1.2-1.6-1-.67.07-.66.07-.66 1.1.08 1.7 1.13 1.7 1.13 1 1.7 2.6 1.2 3.2.92.1-.72.4-1.2.7-1.5-2.4-.27-5-1.2-5-5.3 0-1.18.42-2.14 1.1-2.9-.1-.27-.48-1.36.1-2.84 0 0 .9-.3 3 1.1a10.4 10.4 0 0 1 5.5 0c2.1-1.4 3-1.1 3-1.1.6 1.48.22 2.57.1 2.84.7.76 1.1 1.72 1.1 2.9 0 4.1-2.6 5-5 5.3.4.35.76 1.02.76 2.06v3.05c0 .3.2.64.76.53A11 11 0 0 0 12 1Z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.34 18.34V9.99H5.67v8.35h2.67ZM7 8.8a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1Zm11.34 9.54v-4.57c0-2.45-1.3-3.59-3.05-3.59-1.4 0-2.03.77-2.38 1.31v-1.12h-2.67c.04.75 0 8.35 0 8.35h2.67v-4.66c0-.24.02-.48.09-.65.18-.48.62-.97 1.35-.97.96 0 1.34.73 1.34 1.8v4.48h2.65Z"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 1.9h3.5l-7.6 8.7 8.9 11.8h-7l-5.5-7.2-6.3 7.2H1.4l8.1-9.3L1 1.9h7.2l5 6.6 5.7-6.6Zm-1.2 18.4h1.9L6.6 3.9H4.5l13.2 16.4Z"/></svg>',
    website: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20"/></svg>',
  };
  const LABELS = { email: "Email", github: "GitHub", linkedin: "LinkedIn", x: "X / Twitter", website: "Website" };
  function subLabel(key, val) {
    if (key === "email") return val;
    try { return new URL(val).pathname.replace(/^\/+|\/+$/g, "") || new URL(val).hostname; } catch { return ""; }
  }
  const contactWrap = $("#contact-links");
  if (contactWrap && S.contact) {
    ["email", "github", "linkedin", "x", "website"].forEach((key) => {
      const val = S.contact[key];
      if (!val) return;
      const a = document.createElement("a");
      a.href = key === "email" ? "mailto:" + val : val;
      if (key !== "email") { a.target = "_blank"; a.rel = "noopener"; }
      a.innerHTML = `${ICONS[key] || ""}<span>${LABELS[key]}</span><span class="c-sub">${esc(subLabel(key, val))}</span>`;
      contactWrap.appendChild(a);
    });
  }

  /* ---------- Save contact (vCard download) ---------- */
  function buildVCard() {
    const c = S.contact || {};
    const parts = (S.name || "").trim().split(" ");
    const last = parts.length > 1 ? parts.pop() : "";
    const first = parts.join(" ");
    const lines = [
      "BEGIN:VCARD", "VERSION:3.0",
      `N:${last};${first};;;`,
      `FN:${S.name || ""}`,
      S.role ? `TITLE:${S.role}` : "",
      c.email ? `EMAIL;TYPE=INTERNET:${c.email}` : "",
      S.domain ? `URL:https://${S.domain}` : "",
      c.linkedin ? `URL:${c.linkedin}` : "",
      c.github ? `URL:${c.github}` : "",
      "END:VCARD",
    ].filter(Boolean);
    return lines.join("\r\n");
  }
  function saveContact() {
    const blob = new Blob([buildVCard()], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = (S.name || "contact").replace(/\s+/g, "_") + ".vcf";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  }
  ["#save-contact", "#save-contact-2"].forEach((sel) => { const b = $(sel); if (b) b.addEventListener("click", saveContact); });

  /* ---------- Animated background (light, subtle dots) ---------- */
  const bg = $("#bg-canvas");
  if (bg && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const ctx = bg.getContext("2d");
    let w, h, dots, raf;
    const COUNT = window.innerWidth < 700 ? 34 : 56;
    const resize = () => { w = bg.width = window.innerWidth; h = bg.height = window.innerHeight; };
    const init = () => {
      dots = Array.from({ length: COUNT }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.7,
      }));
    };
    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(91,91,240,0.32)"; ctx.fill();
        for (let j = i + 1; j < dots.length; j++) {
          const e = dots[j];
          const dist = Math.hypot(d.x - e.x, d.y - e.y);
          if (dist < 120) {
            ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(e.x, e.y);
            ctx.strokeStyle = `rgba(120,120,200,${0.14 * (1 - dist / 120)})`;
            ctx.lineWidth = 1; ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(frame);
    };
    resize(); init(); frame();
    window.addEventListener("resize", () => { cancelAnimationFrame(raf); resize(); init(); frame(); });
  }

  /* ---------- Konami code → Snake ---------- */
  const CODE = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  let pos = 0;
  window.addEventListener("keydown", (e) => {
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    pos = (k === CODE[pos]) ? pos + 1 : (k === CODE[0] ? 1 : 0);
    if (pos === CODE.length) { pos = 0; openGame(); }
  });
  const hintEl = $("#game-hint");
  if (hintEl) hintEl.addEventListener("click", openGame);

  const overlay = $("#game-overlay");
  $("#game-close").addEventListener("click", closeGame);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeGame(); });
  window.addEventListener("keydown", (e) => { if (e.key === "Escape" && !overlay.hidden) closeGame(); });

  let game = null;
  function openGame() { overlay.hidden = false; startSnake(); }
  function closeGame() { overlay.hidden = true; if (game) { game.stop(); game = null; } }

  function startSnake() {
    const c = $("#game-canvas");
    const g = c.getContext("2d");
    const GRID = 18, CELLS = c.width / GRID;
    let snake, dir, next, score, running, dead, timer;
    const accent = "#5b5bf0";

    function spawn() {
      let f;
      do { f = { x: (Math.random() * CELLS) | 0, y: (Math.random() * CELLS) | 0 }; }
      while (snake.some((s) => s.x === f.x && s.y === f.y));
      return f;
    }
    let food;

    function reset() {
      snake = [{ x: 9, y: 9 }]; dir = { x: 0, y: 0 }; next = { x: 0, y: 0 };
      score = 0; dead = false; running = false; food = spawn();
      $("#game-score").textContent = "Score: 0";
      $("#game-status").textContent = "Swipe / arrows to start";
      draw(false);
    }

    function steer(nd) {
      if (dead) { reset(); return; }
      if (nd.x === -dir.x && nd.y === -dir.y && snake.length > 1) return;
      next = nd;
      if (!running) { running = true; $("#game-status").textContent = "Go!"; tick(); }
    }

    function onKey(e) {
      const map = {
        ArrowUp: { x: 0, y: -1 }, w: { x: 0, y: -1 }, ArrowDown: { x: 0, y: 1 }, s: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 }, a: { x: -1, y: 0 }, ArrowRight: { x: 1, y: 0 }, d: { x: 1, y: 0 },
      };
      const nd = map[e.key] || map[String(e.key).toLowerCase()];
      if (!nd) return;
      e.preventDefault(); steer(nd);
    }
    window.addEventListener("keydown", onKey);

    // Touch / swipe controls
    let tStart = null;
    function onTouchStart(e) { const t = e.touches[0]; tStart = { x: t.clientX, y: t.clientY }; }
    function onTouchMove(e) { if (tStart) e.preventDefault(); }
    function onTouchEnd(e) {
      if (!tStart) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - tStart.x, dy = t.clientY - tStart.y;
      tStart = null;
      if (Math.abs(dx) < 18 && Math.abs(dy) < 18) { if (dead) reset(); return; }
      if (Math.abs(dx) > Math.abs(dy)) steer({ x: dx > 0 ? 1 : -1, y: 0 });
      else steer({ x: 0, y: dy > 0 ? 1 : -1 });
    }
    c.addEventListener("touchstart", onTouchStart, { passive: true });
    c.addEventListener("touchmove", onTouchMove, { passive: false });
    c.addEventListener("touchend", onTouchEnd, { passive: true });

    function tick() {
      dir = next;
      const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
      if (head.x < 0 || head.y < 0 || head.x >= CELLS || head.y >= CELLS ||
          snake.some((s) => s.x === head.x && s.y === head.y)) {
        dead = true; running = false;
        $("#game-status").textContent = "Game over — go again!";
        draw(true); return;
      }
      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        score++; $("#game-score").textContent = "Score: " + score; food = spawn();
      } else snake.pop();
      draw(false);
      timer = setTimeout(tick, Math.max(70, 130 - score * 2));
    }

    function roundRect(x, y, w, h, r) {
      g.beginPath();
      g.moveTo(x + r, y);
      g.arcTo(x + w, y, x + w, y + h, r);
      g.arcTo(x + w, y + h, x, y + h, r);
      g.arcTo(x, y + h, x, y, r);
      g.arcTo(x, y, x + w, y, r);
      g.closePath();
    }
    function draw(over) {
      g.fillStyle = "#14141f"; g.fillRect(0, 0, c.width, c.height);
      g.fillStyle = "#9b59f6";
      g.beginPath(); g.arc(food.x * GRID + GRID / 2, food.y * GRID + GRID / 2, GRID / 2.6, 0, Math.PI * 2); g.fill();
      snake.forEach((s, i) => {
        g.fillStyle = i === 0 ? "#fff" : accent;
        g.globalAlpha = over ? 0.4 : (i === 0 ? 1 : Math.max(0.5, 0.9 - i * 0.02));
        roundRect(s.x * GRID + 1, s.y * GRID + 1, GRID - 2, GRID - 2, 4); g.fill();
      });
      g.globalAlpha = 1;
    }

    if (game) game.stop();
    game = { stop: () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
      c.removeEventListener("touchstart", onTouchStart);
      c.removeEventListener("touchmove", onTouchMove);
      c.removeEventListener("touchend", onTouchEnd);
    } };
    reset();
  }
})();
