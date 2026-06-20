# wemik.com — Jorge Elizalde

A clean, **light-mode**, **mobile-first** personal site / digital business card.
Static files only — no build step, no server. Hosts free on Cloudflare Pages.
Designed phone-first so it looks great when people scan your QR code.

## Features
- 📱 Mobile-first responsive layout (scales up to tablet/desktop)
- 🪪 **Save my contact** button → downloads a vCard (`.vcf`) straight into the visitor's phone
- 🧩 App-style project cards (rounded icons, status badges, tech tags)
- 🎮 Hidden **Snake** game — Konami code `↑ ↑ ↓ ↓ ← → ← → B A` on desktop,
  or tap the **"tap to play"** hint on mobile. Steer with arrow keys / WASD / swipe.

## Edit your content
Everything lives in **`config.js`** — name, role, bio, projects, contact links, domain.
That's the only file you need to touch. Save and refresh.

- **Add the PartyTab App Store link** once it's approved: set `link:` on the PartyTab project.
- Change the accent color in `styles.css` → `:root` (`--accent`, `--accent-2`).

## Project logos
The three logos in `assets/` (`yabi.svg`, `partytab.svg`, `pmfc.svg`) are crisp recreations
so they always load sharp. To use your exact artwork instead, drop a PNG into `assets/`
and point that project's `logo:` in `config.js` at it (e.g. `logo: "assets/pmfc.png"`).
Square images look best (they're auto-rounded like app icons).

## Preview locally
```bash
cd /Users/jorge/Desktop/WEMIK
python3 -m http.server 8000
# open http://localhost:8000  (use your browser's device toolbar to see the phone layout)
```

## Deploy free on Cloudflare Pages

### Option A — drag & drop (fastest, no GitHub)
1. https://dash.cloudflare.com → **Workers & Pages** → **Create** → **Pages** → **Upload assets**.
2. Name it (e.g. `wemik`), drag this whole folder in, **Deploy**.
3. You get a free `wemik.pages.dev` URL instantly.

### Option B — connect GitHub (auto-deploys on push)
Pages → **Connect to Git** → pick the repo. Framework preset = **None**,
build command = **(empty)**, output directory = **`/`**.

## Point wemik.com (GoDaddy) at it
1. Pages project → **Custom domains** → **Set up a domain** → enter `wemik.com`.
2. Easiest path: add `wemik.com` as a **site in Cloudflare**, then in GoDaddy
   (**My Products → Domain → Nameservers → Change**) replace the nameservers with the
   two Cloudflare gives you. DNS + free SSL are then managed in Cloudflare and just work.
3. Wait for propagation (minutes–couple hours). HTTPS is automatic.

## Files
- `index.html` — structure
- `config.js` — **your content (edit this)**
- `styles.css` — light theme & responsive layout
- `script.js` — rendering, vCard, animated background, Snake game
- `assets/` — project logo icons
- `_headers`, `robots.txt` — Cloudflare niceties
