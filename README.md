# Roshan Premil — Rosh City

A playable, dependency-free portfolio: a red pixel-art city where every building is a project, plus a printable résumé.

## Run locally

```sh
python3 -m http.server 5173
```

Open `http://localhost:5173`. Deploy the directory as a static website; no build step is needed.

## Play

- Press **New game** on the title screen. Walk with WASD or the arrow keys, or click anywhere to walk there.
- Press **E** (or Enter) at a glowing door to step inside. Each new project gives +100 XP; find all seven to finish the quest.
- **Q** opens the quest log, which can fast travel to any project or landmark. **M** toggles sound.
- Roshan's House is the About page, the Post Office has contact links, Résumé Hall links to the résumé, the Library opens the blog, and the GitHub Portal leads to GitHub.
- On touchscreens, use the on-screen pad and the **A** button, or tap a building.

## Personalize

The site is a small canvas game. Project text lives in the `PROJECTS` array and building positions in the `PLACES` array, both in `game.js`. Progress and sound settings are saved in `localStorage`. ParkSmart uses a drawn parking scene instead of a screenshot.

Blog posts live in `blog/` (styles in `blog/blog.css`); list a new post in `blog/index.html` and in the `POSTS` array in `game.js` so the Library shows it.

Edit biography and contact details in `game.js` (`openAbout` and `openContact`) and the hidden text summary in `index.html`, and résumé content in `resume.html`. Main site styles are in `style.css`; résumé theme overrides are in `resume-theme.css`. Google Fonts is optional; local fallback fonts remain available offline. Reduced-motion preferences disable ambient and walking animation.
