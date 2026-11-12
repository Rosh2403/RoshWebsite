(() => {
  "use strict";

  /* ─── Content ─── */

  const GITHUB = "https://github.com/Rosh2403";
  const LINKEDIN = "https://linkedin.com/in/roshan-premil";
  const EMAIL = "rohanroshan2403@gmail.com";
  const NUS_EMAIL = "p_roshan@u.nus.edu";

  const PROJECTS = [
    {
      name: "Counsel",
      type: "AI legal research copilot",
      category: "AI AGENTS",
      image: "screenshots/counsel.png",
      repo: "Counsel",
      description:
        "An autonomous legal research agent for Singapore law, built at the TinyFish Hackathon. A 4-stage agentic pipeline analyses the question, searches AGC statutes, MAS regulations, and SingaporeLawWatch in parallel, evaluates what it finds, and writes a cited legal brief. The live demo streams 3 browser sessions side by side.",
      tags: ["Next.js", "TypeScript", "Convex", "GPT-4o", "AI Agents"],
    },
    {
      name: "LP Radar",
      type: "Institutional investor intelligence",
      category: "AI + FINTECH",
      image: "screenshots/lpradar.png",
      repo: "LDRadar",
      description:
        "An AI agent that monitors endowments, sovereign wealth funds, and pension funds, surfacing intelligence as it happens. Built for the TinyFish Accelerator, with a live dashboard and real-time SSE streaming.",
      tags: ["TypeScript", "Next.js", "Prisma", "SSE", "AI Agents"],
    },
    {
      name: "GravityGuard",
      type: "Embedded fall detection",
      category: "HARDWARE",
      image: "screenshots/gravityguard.png",
      repo: "Fall-detector",
      description:
        "A real-time fall detection system built on the STM32L4S5. Accelerometer and gyroscope sensing, custom ARM assembly filtering, and Wi-Fi telemetry connect embedded intelligence to a live dashboard.",
      tags: ["C", "ARM Assembly", "STM32", "Embedded Systems"],
    },
    {
      name: "ParkSmart",
      type: "A smarter way to park in Singapore",
      category: "FULL-STACK",
      image: null,
      art: "P",
      repo: "ParkSmart",
      description:
        "A Singapore parking optimizer with real-time carpark availability. A smart scoring engine balances cost, distance, and availability, with an interactive Leaflet map and one-tap Google Maps navigation.",
      tags: ["JavaScript", "Next.js", "LTA API", "Leaflet", "Gemini"],
    },
    {
      name: "Memspace",
      type: "Shared memory for AI assistants",
      category: "AI + GRAPHS",
      image: "screenshots/memspace.png",
      repo: "memspace-falkordb-blog",
      live: "https://memspace-falkordb-blog.vercel.app",
      description:
        "One memory that Dot, Muse, Grok Bot, and other MCP assistants share. Built at Graph Hacks on an ontology of 13 types and 49 relationships, stored in FalkorDB and queried with Cypher, with in-graph search and a job queue.",
      tags: ["FalkorDB", "Cypher", "MCP", "Ontology", "Knowledge Graphs"],
    },
    {
      name: "FunctionGemma",
      type: "Cactus × DeepMind hackathon",
      category: "AI EXPERIMENTS",
      image: "screenshots/cactus.png",
      repo: "functiongemma-hackathon",
      description:
        "A hackathon exploration of agentic function-calling pipelines built on FunctionGemma, as part of the Cactus Compute × DeepMind collaboration. Turning language-model decisions into useful tool calls.",
      tags: ["Python", "FunctionGemma", "AI Agents", "Cactus"],
    },
    {
      name: "AgentKey",
      type: "Portable agent identity",
      category: "SECURITY + AI",
      image: null,
      art: "ID",
      repo: "AgentKey",
      description:
        "An identity service for AI agents, available over HTTP, MCP, and an SDK. It issues verifiable agent IDs with Ed25519 ownership proofs, fail-closed typed verification, public-handle and private-subject IDs, revocation, and durable storage. A parallel Rust verification core shares conformance fixtures with the TypeScript version, and CI runs the crypto and persistence tests.",
      tags: ["TypeScript", "Rust", "Ed25519", "MCP"],
    },
  ];

  const SKILLS = [
    "C++",
    "C",
    "Rust",
    "Python",
    "Java",
    "TypeScript",
    "SQL",
    "Docker",
    "Kubernetes",
    "Terraform",
    "ASP.NET Core",
    "CI/CD",
  ];

  /* ─── World layout ─── */

  const W = 1600;
  const H = 1260;
  const ROAD_A = 470; // main street (north row faces it)
  const ROAD_B = 900; // south street (south row faces it)
  const PLAZA = { x: 800, y: 720, r: 100 };
  const SPAWN = { x: 800, y: 852 };
  const MM_H = Math.round((160 * H) / W);

  const PLACES = [
    { id: "counsel", kind: "court", project: 0, x: 80, y: 246, w: 250, h: 210 },
    {
      id: "lpradar",
      kind: "tower",
      project: 1,
      x: 420,
      y: 150,
      w: 200,
      h: 306,
    },
    {
      id: "records",
      kind: "hall",
      label: "RÉSUMÉ HALL",
      x: 700,
      y: 300,
      w: 200,
      h: 156,
    },
    { id: "gravity", kind: "lab", project: 2, x: 960, y: 236, w: 230, h: 220 },
    {
      id: "memspace",
      kind: "graph",
      project: 4,
      x: 1270,
      y: 226,
      w: 250,
      h: 230,
    },
    {
      id: "parksmart",
      kind: "carpark",
      project: 3,
      x: 80,
      y: 676,
      w: 270,
      h: 210,
    },
    {
      id: "gemma",
      kind: "greenhouse",
      project: 5,
      x: 430,
      y: 696,
      w: 240,
      h: 190,
    },
    {
      id: "home",
      kind: "house",
      label: "ROSHAN'S HOUSE",
      x: 960,
      y: 676,
      w: 220,
      h: 210,
    },
    {
      id: "post",
      kind: "post",
      label: "POST OFFICE",
      x: 1280,
      y: 696,
      w: 230,
      h: 190,
    },
    {
      id: "agentkey",
      kind: "vault",
      project: 6,
      x: 1120,
      y: 1000,
      w: 230,
      h: 170,
    },
  ];
  PLACES.forEach((p) => {
    p.label = p.label || PROJECTS[p.project].name.toUpperCase();
    p.door = { x: p.x + p.w / 2, y: p.y + p.h + 14 };
  });
  const PORTAL = {
    id: "github",
    kind: "portal",
    label: "GITHUB PORTAL",
    x: 752,
    y: 994,
    w: 96,
    h: 72,
    door: { x: 800, y: 1078 },
  };
  const SPOTS = [...PLACES, PORTAL];

  /* ─── Palette ─── */

  const C = {
    ground: "#2a0a11",
    ground2: "#330d16",
    ground3: "#22070d",
    tuft: "#46141e",
    walk: "#4a1d25",
    seam: "#3a141b",
    curb: "#6d2c37",
    road: "#160a0d",
    road2: "#1f0e12",
    lane: "#e8c9b9",
    plaza: "#3f1821",
    plazaSeam: "#33121a",
    shadow: "rgba(0,0,0,0.4)",
    cream: "#f1ddd2",
    cream2: "#cfb2a6",
    red: "#e02a3c",
    red2: "#b3192b",
    red3: "#7a1020",
    dark: "#1a060a",
    gold: "#ffbf5e",
    lit: "#ffcf9a",
    water: "#14050a",
    green: "#4f8a5b",
    green2: "#78b885",
  };

  /* ─── Helpers ─── */

  const $ = (selector) => document.querySelector(selector);
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const coarse = matchMedia("(pointer: coarse)");

  function rng(seed) {
    return () => {
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function r(c, x, y, w, h, color) {
    c.fillStyle = color;
    c.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
  }

  function ellipse(c, cx, cy, rx, ry, color) {
    for (let dy = -ry; dy <= ry; dy++) {
      const half = Math.round(rx * Math.sqrt(1 - (dy / ry) ** 2));
      r(c, cx - half, cy + dy, half * 2, 1, color);
    }
  }

  function pline(c, x0, y0, x1, y1, color, size = 2) {
    const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) / size;
    for (let i = 0; i <= steps; i++) {
      const t = steps ? i / steps : 0;
      r(c, x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, size, size, color);
    }
  }

  function h(tag, attrs = {}, ...children) {
    const el = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs)) {
      if (value === false || value == null) continue;
      if (key === "class") el.className = value;
      else if (key.startsWith("on")) el.addEventListener(key.slice(2), value);
      else el.setAttribute(key, value === true ? "" : value);
    }
    for (const child of children.flat(Infinity)) {
      if (child == null || child === false) continue;
      el.append(child instanceof Node ? child : document.createTextNode(child));
    }
    return el;
  }

  const store = {
    get(key, fallback) {
      try {
        const value = localStorage.getItem(key);
        return value == null ? fallback : JSON.parse(value);
      } catch {
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch {
        /* storage unavailable */
      }
    },
  };

  /* ─── Scenery (drawn once) ─── */

  const scenery = document.createElement("canvas");
  scenery.width = W;
  scenery.height = H;
  const S = scenery.getContext("2d");

  const trees = [];
  const lamps = [];
  const solids = [];

  function addTree(x, y, variant = 0, size = 1) {
    trees.push({ x, y, variant, size });
    solids.push({ x: x - 6, y: y - 6, w: 12, h: 8 });
  }

  function addLamp(x, y) {
    lamps.push({ x, y });
    solids.push({ x: x - 3, y: y - 4, w: 6, h: 6 });
  }

  function bench(x, y) {
    r(S, x + 2, y + 18, 40, 4, C.shadow);
    r(S, x, y, 40, 5, "#8a4a40");
    r(S, x, y + 7, 40, 5, "#6e3a33");
    r(S, x - 2, y + 13, 44, 4, "#8a4a40");
    r(S, x + 3, y + 17, 4, 7, C.dark);
    r(S, x + 33, y + 17, 4, 7, C.dark);
    solids.push({ x: x - 2, y: y + 8, w: 44, h: 14 });
  }

  function flowerBed(x, y, w, h) {
    r(S, x - 2, y - 2, w + 4, h + 4, C.curb);
    r(S, x, y, w, h, "#1f080c");
    const rand = rng(x * 7 + y);
    for (let i = 0; i < (w * h) / 40; i++) {
      const fx = x + 2 + rand() * (w - 6);
      const fy = y + 2 + rand() * (h - 6);
      r(
        S,
        fx,
        fy,
        3,
        3,
        rand() < 0.5 ? "#ff5a6a" : rand() < 0.5 ? C.cream : C.gold,
      );
    }
  }

  function hRoad(y) {
    const rand = rng(y);
    r(S, 0, y - 14, W, 14, C.walk);
    for (let x = 0; x < W; x += 22) r(S, x, y - 14, 1, 14, C.seam);
    r(S, 0, y - 3, W, 3, C.curb);
    r(S, 0, y, W, 70, C.road);
    for (let i = 0; i < 500; i++)
      r(S, rand() * W, y + rand() * 70, 2, 1, C.road2);
    for (let x = 10; x < W; x += 56) r(S, x, y + 34, 26, 3, C.lane);
    r(S, 0, y + 70, W, 3, C.curb);
    r(S, 0, y + 73, W, 12, C.walk);
    for (let x = 11; x < W; x += 22) r(S, x, y + 73, 1, 12, C.seam);
  }

  function zebra(x, y, w) {
    for (let i = 0; i < 6; i++)
      r(S, x + 4 + i * (w / 6), y + 6, w / 12, 58, "#d9b8aa");
  }

  function windowTile(c, x, y, w, h, lit = true) {
    r(c, x - 3, y - 3, w + 6, h + 6, C.dark);
    r(c, x, y, w, h, lit ? C.lit : "#3a0d15");
    if (lit) r(c, x + 2, y + 2, w - 4, Math.max(2, h / 3), "#ffe6c8");
    r(c, x + w / 2 - 1, y, 2, h, C.dark);
    r(c, x, y + h / 2 - 1, w, 2, C.dark);
  }

  function door(c, cx, by, w = 28, h = 40, color = "#5a1018") {
    r(c, cx - w / 2 - 4, by - h - 4, w + 8, h + 4, C.dark);
    r(c, cx - w / 2, by - h, w, h, color);
    r(c, cx - w / 2 + 3, by - h + 3, w - 6, h / 2 - 4, "#ffb38a");
    r(c, cx + w / 2 - 7, by - h / 2 + 2, 3, 3, C.gold);
    r(c, cx - w / 2 - 6, by, w + 12, 5, "#3a141b");
  }

  function shadow(p) {
    r(S, p.x + 10, p.y + 16, p.w, p.h, C.shadow);
  }

  const buildingPainters = {
    court(c, { x, y, w, h }) {
      const cx = x + w / 2;
      const by = y + h;
      for (let i = 0; i < 12; i++) {
        const ww = 50 + ((w + 8 - 50) * i) / 11;
        r(c, cx - ww / 2, y + i * 4, ww, 4, i % 3 === 0 ? C.red2 : C.red3);
      }
      r(c, cx - 1, y + 14, 2, 24, C.gold);
      r(c, cx - 14, y + 18, 28, 2, C.gold);
      r(c, cx - 14, y + 20, 1, 7, C.gold);
      r(c, cx + 13, y + 20, 1, 7, C.gold);
      r(c, cx - 18, y + 27, 9, 2, C.gold);
      r(c, cx + 9, y + 27, 9, 2, C.gold);
      r(c, cx - 6, y + 37, 12, 2, C.gold);
      r(c, x - 6, y + 48, w + 12, 12, C.cream);
      r(c, x - 6, y + 57, w + 12, 3, C.cream2);
      r(c, x, y + 60, w, h - 78, "#3a0d15");
      const n = 6;
      const cols = [];
      for (let i = 0; i < n; i++) cols.push(x + 8 + (i * (w - 30)) / (n - 1));
      for (let i = 0; i < n - 1; i++) {
        const gx = cols[i] + 14;
        const gw = cols[i + 1] - gx;
        if (i === 2) continue;
        windowTile(c, gx + 6, y + 84, gw - 12, 46, i % 2 === 0);
        r(c, gx + 4, y + 66, gw - 8, 10, C.red);
        r(c, gx + gw / 2 - 2, y + 76, 4, 4, C.red);
      }
      cols.forEach((px) => {
        r(c, px, y + 60, 14, h - 78, C.cream);
        r(c, px + 10, y + 60, 4, h - 78, C.cream2);
        r(c, px - 3, y + 60, 20, 5, "#fff3ea");
        r(c, px - 3, by - 23, 20, 5, C.cream2);
      });
      door(c, cx, by - 18, 22, 46, "#4a0d14");
      r(c, x - 10, by - 18, w + 20, 6, "#e0c6bb");
      r(c, x - 16, by - 12, w + 32, 6, "#c9aca1");
      r(c, x - 22, by - 6, w + 44, 6, "#ad9086");
    },

    tower(c, { x, y, w, h }) {
      const cx = x + w / 2;
      const by = y + h;
      r(c, x - 4, y, w + 8, 28, "#3d0d16");
      r(c, x + 4, y + 4, w - 8, 20, "#4a111b");
      r(c, cx - 14, y + 6, 28, 16, "#2a0910");
      r(c, cx - 8, y + 9, 3, 10, C.cream2);
      r(c, cx + 5, y + 9, 3, 10, C.cream2);
      r(c, cx - 5, y + 13, 10, 2, C.cream2);
      r(c, x - 6, y + 26, w + 12, 6, "#22070c");
      r(c, x, y + 32, w, h - 32, "#5a1320");
      r(c, x + w - 18, y + 32, 18, h - 32, "#470e19");
      r(c, x, y + 32, w, 3, C.red);
      const rand = rng(11);
      for (let wy = y + 46; wy < by - 76; wy += 22) {
        for (let wx = x + 14; wx < x + w - 26; wx += 26) {
          const v = rand();
          r(c, wx - 2, wy - 2, 22, 18, "#2b0910");
          r(
            c,
            wx,
            wy,
            18,
            14,
            v < 0.45 ? C.lit : v < 0.7 ? "#ff6b6b" : "#250810",
          );
          r(c, wx, wy, 18, 2, "rgba(255,255,255,0.15)");
        }
      }
      r(c, x + 16, by - 64, w - 32, 64, "#1d0609");
      for (let lx = x + 20; lx < x + w - 36; lx += 24)
        r(c, lx, by - 60, 20, 56, "rgba(255,150,120,0.25)");
      r(c, x + 10, by - 70, w - 20, 6, C.red);
      door(c, cx, by, 36, 44, "#2a0b12");
      r(c, cx - 2, y - 26, 4, 28, "#22070c");
    },

    hall(c, { x, y, w, h }) {
      const cx = x + w / 2;
      const by = y + h;
      for (let i = 0; i < 10; i++) {
        const ww = 40 + ((w + 12 - 40) * i) / 9;
        r(c, cx - ww / 2, y + i * 4, ww, 4, i % 2 ? C.red3 : "#8e1b2b");
      }
      r(c, cx - 8, y + 12, 16, 20, C.cream);
      r(c, cx - 5, y + 16, 10, 2, C.red3);
      r(c, cx - 5, y + 21, 10, 2, C.red3);
      r(c, cx - 5, y + 26, 7, 2, C.red3);
      r(c, x - 6, y + 40, w + 12, 8, C.cream2);
      r(c, x, y + 48, w, h - 60, C.cream);
      r(c, x + w - 12, y + 48, 12, h - 60, C.cream2);
      [x + 22, x + w - 52].forEach((wx) => {
        r(c, wx - 3, y + 62, 36, 54, C.dark);
        r(c, wx, y + 70, 30, 44, C.lit);
        r(c, wx + 4, y + 66, 22, 4, C.lit);
        r(c, wx + 14, y + 66, 2, 48, C.dark);
        r(c, wx, y + 90, 30, 2, C.dark);
      });
      door(c, cx, by - 12, 30, 48, "#5a1018");
      r(c, x - 8, by - 12, w + 16, 6, "#d8bfb4");
      r(c, x - 14, by - 6, w + 28, 6, "#b89c92");
    },

    lab(c, { x, y, w, h }) {
      const cx = x + w / 2;
      const by = y + h;
      r(c, x - 4, y, w + 8, 42, "#3a0c14");
      r(c, x + 14, y + 8, 36, 22, "#5c1b26");
      r(c, x + 18, y + 13, 28, 3, "#2a0910");
      r(c, x + 18, y + 20, 28, 3, "#2a0910");
      r(c, x + 64, y + 10, 24, 20, "#5c1b26");
      r(c, x + 68, y + 14, 16, 12, "#2a0910");
      r(c, x + 150, y + 12, 50, 14, "#4a1520");
      r(c, x - 6, y + 40, w + 12, 6, "#22070c");
      r(c, x, y + 46, w, h - 46, C.red2);
      r(c, x + w - 16, y + 46, 16, h - 46, "#951424");
      r(c, x, y + 58, w, 8, C.cream);
      const ex = x + 24;
      const ey = y + 84;
      r(c, ex, ey, 54, 54, C.dark);
      for (let i = 0; i < 5; i++) {
        r(c, ex + 7 + i * 9, ey - 6, 4, 6, C.cream2);
        r(c, ex + 7 + i * 9, ey + 54, 4, 6, C.cream2);
        r(c, ex - 6, ey + 7 + i * 9, 6, 4, C.cream2);
        r(c, ex + 54, ey + 7 + i * 9, 6, 4, C.cream2);
      }
      r(c, ex + 12, ey + 12, 30, 30, "#3a0d15");
      windowTile(c, x + 146, y + 86, 24, 34, true);
      windowTile(c, x + 184, y + 86, 24, 34, false);
      for (let i = 0; i < 6; i++)
        r(c, cx - 24 + i * 8, by - 54, 4, 6, i % 2 ? C.gold : C.dark);
      door(c, cx, by, 34, 44, "#2a0b12");
      r(c, x + w - 26, y - 28, 3, 30, "#22070c");
    },

    graph(c, p) {
      const { x, y, w, h } = p;
      const cx = x + w / 2;
      const by = y + h;
      r(c, x - 4, y, w + 8, 36, "#2a0910");
      for (let i = 0; i < 4; i++)
        r(c, x + 18 + i * 56, y + 9, 40, 16, "rgba(255,77,94,0.25)");
      r(c, x - 6, y + 34, w + 12, 6, "#120408");
      r(c, x, y + 40, w, h - 40, "#1e070c");
      r(c, x, y + 40, w, 3, C.red);
      const px = x + 20;
      const py = y + 56;
      const pw = w - 40;
      const ph = 92;
      r(c, px - 4, py - 4, pw + 8, ph + 8, "#3a0d15");
      r(c, px, py, pw, ph, "#0c0205");
      const rel = [
        [0.1, 0.3],
        [0.3, 0.72],
        [0.42, 0.22],
        [0.6, 0.6],
        [0.78, 0.25],
        [0.9, 0.75],
        [0.22, 0.4],
      ];
      p.nodes = rel.map(([nx, ny]) => ({ x: px + nx * pw, y: py + ny * ph }));
      p.edges = [
        [0, 6],
        [6, 1],
        [6, 2],
        [2, 3],
        [3, 1],
        [2, 4],
        [4, 3],
        [3, 5],
        [4, 5],
      ];
      p.edges.forEach(([a, b]) =>
        pline(
          c,
          p.nodes[a].x,
          p.nodes[a].y,
          p.nodes[b].x,
          p.nodes[b].y,
          "#6a1a28",
        ),
      );
      r(c, x + 12, by - 62, w - 24, 62, "#2b0a12");
      for (let lx = x + 16; lx < x + w - 30; lx += 30)
        r(c, lx, by - 58, 26, 54, "rgba(255,90,110,0.18)");
      r(c, x + 12, by - 64, w - 24, 3, C.red);
      door(c, cx, by, 36, 44, "#140408");
    },

    carpark(c, { x, y, w, h }) {
      const cx = x + w / 2;
      const by = y + h;
      r(c, x - 4, y, w + 8, 32, "#4c2830");
      for (let i = 0; i < 9; i++) r(c, x + 8 + i * 30, y + 5, 2, 22, C.cream2);
      r(c, x + 14, y + 9, 18, 14, C.red);
      r(c, x + 104, y + 9, 18, 14, C.cream);
      r(c, x + 194, y + 9, 18, 14, "#7a1020");
      r(c, x - 6, y + 30, w + 12, 6, "#2e1419");
      const colors = [C.red, C.cream, "#ff8a72", "#7a1020", C.gold];
      const rand = rng(31);
      for (let l = 0; l < 3; l++) {
        const ly = y + 36 + l * 50;
        r(c, x, ly, w, 10, "#8a5960");
        r(c, x, ly + 10, w, 40, "#1a0a0d");
        for (let sx = x + 12; sx < x + w - 30; sx += 34) {
          if (rand() < 0.3) continue;
          const col = colors[Math.floor(rand() * colors.length)];
          const carY = ly + 34;
          r(c, sx, carY, 24, 9, col);
          r(c, sx + 4, carY - 6, 15, 6, col);
          r(c, sx + 6, carY - 5, 11, 4, "rgba(255,230,210,0.55)");
          r(c, sx + 3, carY + 8, 5, 4, "#000");
          r(c, sx + 16, carY + 8, 5, 4, "#000");
        }
        for (let pxx = x; pxx < x + w; pxx += 54)
          r(c, pxx, ly + 10, 8, 40, "#6e434a");
      }
      r(c, x, y + 186, w, h - 186, "#8a5960");
      r(c, cx - 26, by - 30, 52, 30, "#0c0406");
      for (let i = 0; i < 8; i++)
        r(c, cx - 32 + i * 8, by - 26, 8, 4, i % 2 ? C.cream : C.red);
      const sx = x + w - 48;
      const sy = y + 46;
      r(c, sx, sy, 36, 44, C.cream);
      r(c, sx + 3, sy + 3, 30, 38, C.red);
      r(c, sx + 11, sy + 9, 5, 26, C.cream);
      r(c, sx + 11, sy + 9, 14, 5, C.cream);
      r(c, sx + 22, sy + 9, 5, 15, C.cream);
      r(c, sx + 11, sy + 20, 14, 5, C.cream);
    },

    greenhouse(c, { x, y, w, h }) {
      const cx = x + w / 2;
      const by = y + h;
      for (let i = 0; i < 14; i++) {
        const ww =
          w * (0.5 + 0.5 * Math.sin(((i + 1) / 14) * (Math.PI / 2))) + 8;
        r(c, cx - ww / 2, y + i * 5, ww, 5, i % 2 ? "#5c2630" : "#52202a");
      }
      for (let i = 1; i < 6; i++)
        pline(c, cx, y, x + (w * i) / 6, y + 70, C.cream2, 2);
      r(c, x - 4, y + 68, w + 8, 4, C.cream);
      r(c, x, y + 72, w, h - 72, "#2e1016");
      const cactus = (cx2, base, ch) => {
        r(c, cx2 - 8, base - 9, 16, 9, C.red2);
        r(c, cx2 - 4, base - 9 - ch, 8, ch, C.green);
        r(c, cx2 - 3, base - 8 - ch, 2, ch - 2, C.green2);
        r(c, cx2 - 11, base - 9 - ch * 0.6, 7, 4, C.green);
        r(c, cx2 - 11, base - 18 - ch * 0.6, 4, 10, C.green);
        r(c, cx2 + 4, base - 9 - ch * 0.4, 7, 4, C.green);
        r(c, cx2 + 7, base - 16 - ch * 0.4, 4, 8, C.green);
      };
      [
        [x + 26, 40],
        [x + 62, 58],
        [x + 176, 50],
        [x + 212, 34],
      ].forEach(([cx2, ch]) => cactus(cx2, by - 12, ch));
      for (let gx = x; gx <= x + w; gx += 30)
        r(c, gx, y + 72, 3, h - 72, C.cream2);
      r(c, x, y + 120, w, 3, C.cream2);
      for (let i = 0; i < 6; i++)
        pline(
          c,
          x + 8 + i * 40,
          y + 110,
          x + 28 + i * 40,
          y + 80,
          "rgba(255,255,255,0.12)",
          2,
        );
      r(c, x - 2, by - 12, w + 4, 12, "#6e2c36");
      door(c, cx, by, 34, 46, "#2a0b12");
    },

    house(c, { x, y, w, h }) {
      const cx = x + w / 2;
      const by = y + h;
      r(c, x + w - 62, y - 16, 20, 44, "#5a1a24");
      r(c, x + w - 65, y - 20, 26, 6, "#3a0d15");
      for (let i = 0; i < 18; i++) {
        const ww = w * 0.4 + ((w + 20 - w * 0.4) * i) / 17;
        r(c, cx - ww / 2, y + i * 5, ww, 5, i % 2 ? C.red3 : C.red2);
      }
      r(c, cx - 12, y + 36, 24, 24, C.dark);
      r(c, cx - 9, y + 39, 18, 18, C.lit);
      r(c, cx - 1, y + 39, 2, 18, C.dark);
      r(c, cx - 9, y + 47, 18, 2, C.dark);
      r(c, x - 12, y + 88, w + 24, 6, "#4a0c16");
      r(c, x, y + 94, w, h - 94, C.cream);
      r(c, x + w - 12, y + 94, 12, h - 94, C.cream2);
      for (let row = y + 104; row < by - 6; row += 10)
        r(c, x, row, w - 12, 1, "rgba(120,40,50,0.18)");
      [x + 26, x + w - 66].forEach((wx) => {
        windowTile(c, wx, y + 112, 40, 36, true);
        r(c, wx - 4, y + 150, 48, 8, "#6a2a2e");
        for (let f = 0; f < 6; f++)
          r(c, wx - 2 + f * 8, y + 146, 4, 4, f % 2 ? "#ff5a6a" : C.gold);
      });
      door(c, cx, by, 30, 50, "#7a2e2a");
      r(c, x + w + 6, by - 26, 4, 26, C.dark);
      r(c, x + w, by - 36, 16, 12, C.red);
      r(c, x + w + 2, by - 32, 12, 2, C.dark);
    },

    vault(c, { x, y, w, h }) {
      const cx = x + w / 2;
      const by = y + h;
      r(c, x - 4, y, w + 8, 34, "#3a0d15");
      for (let i = 0; i < 5; i++)
        r(c, x + 10 + i * 44, y + 8, 30, 4, "#55202a");
      r(c, x - 6, y + 32, w + 12, 6, "#22070c");
      r(c, x, y + 38, w, h - 38, "#6d2c37");
      r(c, x + w - 14, y + 38, 14, h - 38, "#5a222c");
      for (let row = y + 50, k = 0; row < by - 8; row += 14, k++) {
        r(c, x, row, w - 14, 1, "rgba(0,0,0,0.25)");
        for (let sx = x + (k % 2) * 18; sx < x + w - 14; sx += 36)
          r(c, sx, row - 13, 1, 13, "rgba(0,0,0,0.2)");
      }
      ellipse(c, cx, y + 80, 34, 34, C.dark);
      ellipse(c, cx, y + 80, 30, 30, "#c9b3aa");
      ellipse(c, cx, y + 80, 22, 22, "#9a857d");
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        r(
          c,
          cx + Math.cos(a) * 26 - 2,
          y + 80 + Math.sin(a) * 26 - 2,
          4,
          4,
          C.dark,
        );
      }
      [x + 18, x + w - 50].forEach((wx) => {
        windowTile(c, wx, y + 62, 30, 30, false);
        for (let b = 0; b < 4; b++)
          r(c, wx + 3 + b * 7, y + 62, 2, 30, "#9a857d");
      });
      door(c, cx, by, 34, 44, "#2a0b12");
      r(c, cx - 30, by - 54, 60, 6, C.gold);
    },

    post(c, { x, y, w, h }) {
      const cx = x + w / 2;
      const by = y + h;
      r(c, x - 4, y, w + 8, 36, "#5a0f1a");
      r(c, x + 20, y + 10, 60, 14, "#3a0810");
      r(c, x - 6, y + 34, w + 12, 6, "#3a0810");
      r(c, x, y + 40, w, h - 40, "#d42b3c");
      r(c, x + w - 14, y + 40, 14, h - 40, "#b01f30");
      r(c, x, y + 52, w, 10, C.cream);
      r(c, x, y + 56, w, 2, C.red);
      r(c, cx - 34, y + 70, 68, 42, C.dark);
      r(c, cx - 31, y + 73, 62, 36, C.cream);
      pline(c, cx - 31, y + 73, cx, y + 94, C.red, 3);
      pline(c, cx + 29, y + 73, cx, y + 94, C.red, 3);
      windowTile(c, x + 22, y + 126, 34, 30, true);
      windowTile(c, x + w - 58, y + 126, 34, 30, true);
      door(c, cx, by, 32, 46, "#3a0810");
      r(c, x - 26, by - 36, 18, 36, C.red);
      r(c, x - 29, by - 40, 24, 6, C.red3);
      r(c, x - 22, by - 28, 8, 3, C.dark);
      r(c, x - 26, by - 4, 18, 4, C.red3);
    },
  };

  function drawScenery() {
    const rand = rng(7);
    r(S, 0, 0, W, H, C.ground);
    for (let i = 0; i < 4200; i++) {
      r(
        S,
        rand() * W,
        rand() * H,
        rand() < 0.7 ? 2 : 3,
        2,
        rand() < 0.5 ? C.ground2 : C.ground3,
      );
    }
    for (let i = 0; i < 700; i++) {
      const x = rand() * W;
      const y = rand() * H;
      r(S, x, y, 1, 3, C.tuft);
      r(S, x + 2, y + 1, 1, 2, C.tuft);
    }
    for (let i = 0; i < 160; i++) {
      r(
        S,
        rand() * W,
        150 + rand() * (H - 150),
        2,
        2,
        rand() < 0.6 ? "#ff5a6a" : C.cream,
      );
    }

    // northern fence and skyline
    r(S, 0, 0, W, 60, "#170408");
    for (let x = 0; x < W; x += 34) {
      const bh = 20 + ((x * 13) % 40);
      r(S, x, 60 - bh, 30, bh, "#22060c");
      for (let wy = 64 - bh; wy < 56; wy += 9) {
        if ((x + wy) % 3) r(S, x + 6, wy, 3, 4, "rgba(255,120,110,0.35)");
      }
    }
    r(S, 0, 132, W, 3, "#5a2a33");
    r(S, 0, 140, W, 3, "#5a2a33");
    for (let x = 6; x < W; x += 24) r(S, x, 126, 4, 20, "#6d2c37");

    // streets
    hRoad(ROAD_A);
    hRoad(ROAD_B);
    r(S, 756, ROAD_A + 85, 14, ROAD_B - ROAD_A - 99, C.walk);
    r(S, 830, ROAD_A + 85, 14, ROAD_B - ROAD_A - 99, C.walk);
    r(S, 770, ROAD_A + 70, 60, ROAD_B - ROAD_A - 70, C.road);
    for (let y = ROAD_A + 90; y < ROAD_B - 10; y += 48)
      r(S, 799, y, 3, 22, C.lane);
    zebra(770, ROAD_A, 60);
    zebra(770, ROAD_B, 60);

    // plaza + fountain
    ellipse(S, PLAZA.x, PLAZA.y, PLAZA.r + 6, PLAZA.r + 6, C.curb);
    ellipse(S, PLAZA.x, PLAZA.y, PLAZA.r, PLAZA.r, C.plaza);
    for (let ring = 20; ring < PLAZA.r; ring += 14) {
      for (let a = 0; a < Math.PI * 2; a += 8 / ring) {
        r(
          S,
          PLAZA.x + Math.cos(a) * ring,
          PLAZA.y + Math.sin(a) * ring,
          2,
          2,
          C.plazaSeam,
        );
      }
    }
    flowerBed(712, 650, 30, 18);
    flowerBed(858, 650, 30, 18);
    flowerBed(712, 776, 30, 18);
    flowerBed(858, 776, 30, 18);
    ellipse(S, 800, 722, 42, 26, "#7b3a44");
    ellipse(S, 800, 720, 36, 21, C.water);
    r(S, 794, 698, 12, 22, "#8a4550");
    r(S, 786, 696, 28, 5, "#a35562");
    solids.push({ x: 758, y: 702, w: 84, h: 40 });

    // path to the portal
    for (let y = ROAD_B + 86; y < 1050; y += 14) {
      r(S, 790, y, 10, 8, "#5a2a33");
      r(S, 802, y + 6, 10, 8, "#5a2a33");
    }

    // portal frame
    ellipse(S, 800, 1068, 54, 12, "#4a1f27");
    ellipse(S, 800, 1066, 44, 8, "#3a141c");
    r(S, 748, 1000, 14, 68, "#5a2a33");
    r(S, 838, 1000, 14, 68, "#5a2a33");
    r(S, 752, 1000, 4, 66, "#7b3a44");
    r(S, 842, 1000, 4, 66, "#7b3a44");
    r(S, 742, 988, 116, 14, "#6d2c37");
    r(S, 742, 988, 116, 3, "#8a4550");
    r(S, 790, 991, 20, 8, C.dark);
    r(S, 793, 993, 3, 4, C.red);
    r(S, 804, 993, 3, 4, C.red);
    solids.push(
      { x: 746, y: 1056, w: 18, h: 12 },
      { x: 836, y: 1056, w: 18, h: 12 },
    );

    // pond
    ellipse(S, 300, 1052, 196, 42, "#5a2a33");
    ellipse(S, 300, 1050, 186, 36, C.water);
    for (let i = 0; i < 14; i++)
      r(S, 150 + i * 22, 1036 + (i % 3) * 12, 12, 2, "#3a1019");
    [
      [200, 1044],
      [380, 1060],
      [300, 1030],
    ].forEach(([lx, ly]) => {
      ellipse(S, lx, ly, 10, 5, "#3e6b48");
      r(S, lx - 2, ly - 3, 4, 3, "#ff8a9a");
    });
    solids.push({ x: 110, y: 1016, w: 380, h: 70 });

    // benches
    bench(560, 1000);
    bench(630, 596);
    bench(930, 596);

    // path from the south street round to the AgentKey vault door
    r(S, 1360, ROAD_B + 70, 26, 230, C.walk);
    r(S, 1230, 1186, 156, 22, C.walk);

    // buildings
    PLACES.forEach((p) => {
      shadow(p);
      buildingPainters[p.kind](S, p);
      solids.push({ x: p.x, y: p.y, w: p.w, h: p.h });
    });

    // walkway mats to every door
    PLACES.forEach((p) =>
      r(S, p.door.x - 12, p.y + p.h + 4, 24, 4, "rgba(255,191,94,0.25)"),
    );
  }

  function plantWorld() {
    const rand = rng(99);
    for (let x = 12; x < W; x += 40)
      addTree(x + rand() * 10, 112 + rand() * 18, Math.floor(rand() * 3));
    [210, 290, 370, 610, 690, 770, 840, 1050].forEach((y, i) => {
      if (Math.abs(y - (ROAD_A + 35)) < 70 || Math.abs(y - (ROAD_B + 35)) < 70)
        return;
      addTree(38, y, i % 3);
      addTree(1564, y + 20, (i + 1) % 3);
    });
    [
      [375, 300],
      [375, 420],
      [660, 360],
      [930, 400],
      [1232, 310],
      [1232, 420],
      [300, 205],
      [700, 260],
      [880, 270],
      [1110, 205],
      [1450, 200],
      [150, 640],
      [300, 650],
      [560, 662],
      [1050, 640],
      [1220, 650],
      [1390, 660],
      [1500, 645],
      [392, 790],
      [392, 872],
      [1230, 780],
      [1230, 872],
      [700, 590],
      [900, 590],
      [40, 1080],
      [560, 1078],
      [690, 1040],
      [920, 1050],
      [1000, 1086],
      [1080, 1036],
      [1500, 1036],
    ].forEach(([x, y], i) => addTree(x, y, i % 3, i % 4 === 0 ? 1.15 : 1));
    for (let x = 20; x < W; x += 46) {
      if (x > 1090 && x < 1380) continue;
      addTree(x + rand() * 10, 1236 + rand() * 10, Math.floor(rand() * 3));
    }
    [
      [560, 1150],
      [660, 1180],
      [940, 1160],
      [1030, 1130],
      [1530, 1130],
      [240, 1160],
      [420, 1180],
    ].forEach(([x, y], i) => addTree(x, y, (i + 1) % 3));
    [50, 370, 660, 935, 1230, 1550].forEach((x) => addLamp(x, ROAD_A - 2));
    [200, 560, 1050, 1400].forEach((x) => addLamp(x, ROAD_A + 84));
    [380, 690, 910, 1230, 1550].forEach((x) => addLamp(x, ROAD_B - 2));
    [200, 560, 1050, 1400].forEach((x) => addLamp(x, ROAD_B + 84));
  }

  /* ─── Sprites (drawn every frame) ─── */

  const TREE_COLORS = [
    ["#8e1426", "#b81e34", "#ef5b6b"],
    ["#6e0f20", "#93192b", "#d64a5a"],
    ["#b52a3f", "#d9475a", "#ff8f9a"],
  ];

  function drawTree(c, { x, y, variant, size }) {
    const [dark, mid, light] = TREE_COLORS[variant];
    const s = size;
    r(c, x - 16 * s, y - 2, 32 * s, 5, "rgba(0,0,0,0.35)");
    r(c, x - 3 * s, y - 20 * s, 6 * s, 21 * s, "#2e1416");
    r(c, x - 22 * s, y - 48 * s, 44 * s, 26 * s, dark);
    r(c, x - 26 * s, y - 42 * s, 52 * s, 16 * s, dark);
    r(c, x - 18 * s, y - 56 * s, 36 * s, 12 * s, mid);
    r(c, x - 22 * s, y - 46 * s, 30 * s, 14 * s, mid);
    r(c, x - 12 * s, y - 60 * s, 20 * s, 6 * s, mid);
    r(c, x - 14 * s, y - 54 * s, 14 * s, 6 * s, light);
    r(c, x + 6 * s, y - 40 * s, 10 * s, 5 * s, light);
    r(c, x - 18 * s, y - 26 * s, 36 * s, 4 * s, "rgba(0,0,0,0.25)");
  }

  function drawLamp(c, { x, y }) {
    r(c, x - 5, y - 2, 10, 4, "rgba(0,0,0,0.4)");
    r(c, x - 1, y - 48, 3, 48, "#1f080c");
    r(c, x - 3, y - 4, 7, 4, "#1f080c");
    r(c, x - 6, y - 58, 13, 10, "#2a0b10");
    r(c, x - 4, y - 55, 9, 6, "#ffd7a8");
  }

  const SKIN = "#c68a64";
  const HAIR = "#1a0d0d";
  const HOODIE = "#e02a3c";
  const HOODIE_DARK = "#9e1426";

  function drawPlayer(c, p, time) {
    const x = Math.round(p.x);
    const y = Math.round(p.y);
    const walking = p.moving && !reduced.matches;
    const phase = walking ? Math.sin(p.step / 6) : 0;
    const bob = walking ? Math.abs(phase) * -1 : 0;
    const legA = Math.round(phase * 3);
    r(c, x - 9, y - 1, 18, 4, "rgba(0,0,0,0.4)");
    if (p.dir === "left" || p.dir === "right") {
      const f = p.dir === "right" ? 1 : -1;
      r(c, x - 3 + legA, y - 10, 5, 10, "#2a1a22");
      r(c, x - 2 - legA, y - 10, 5, 10, "#3a2630");
      r(c, x - 3 + legA, y - 2, 6, 2, C.cream);
      r(c, x - 6, y - 23 + bob, 12, 14, HOODIE);
      r(c, x - 6 * f - (f > 0 ? 0 : 0), y - 22 + bob, 3, 12, HOODIE_DARK);
      r(c, x - 1 + legA, y - 20 + bob, 4, 10, HOODIE_DARK);
      r(c, x - 6, y - 36 + bob, 12, 13, SKIN);
      r(c, x - 7, y - 38 + bob, 13, 5, HAIR);
      r(c, x - 7 * f - (f > 0 ? 0 : -1), y - 36 + bob, 5, 8, HAIR);
      r(c, x + 2 * f, y - 31 + bob, 2, 2, "#1a0608");
    } else {
      const back = p.dir === "up";
      r(
        c,
        x - 5,
        y - 10 - Math.max(0, legA),
        4,
        10 + Math.max(0, legA),
        "#2a1a22",
      );
      r(
        c,
        x + 1,
        y - 10 - Math.max(0, -legA),
        4,
        10 + Math.max(0, -legA),
        "#2a1a22",
      );
      r(c, x - 6, y - 2, 5, 2, C.cream);
      r(c, x + 1, y - 2, 5, 2, C.cream);
      r(c, x - 8, y - 23 + bob, 16, 14, HOODIE);
      r(c, x + 4, y - 23 + bob, 4, 14, HOODIE_DARK);
      r(c, x - 10, y - 21 + bob - legA, 3, 10, HOODIE);
      r(c, x + 7, y - 21 + bob + legA, 3, 10, HOODIE_DARK);
      if (!back) {
        r(c, x - 3, y - 22 + bob, 1, 5, C.cream);
        r(c, x + 2, y - 22 + bob, 1, 5, C.cream);
        r(c, x - 4, y - 14 + bob, 8, 3, HOODIE_DARK);
      } else {
        r(c, x - 6, y - 24 + bob, 12, 6, HOODIE_DARK);
      }
      r(c, x - 7, y - 37 + bob, 14, 14, back ? HAIR : SKIN);
      r(c, x - 8, y - 39 + bob, 16, 6, HAIR);
      r(c, x - 8, y - 36 + bob, 3, 7, HAIR);
      r(c, x + 5, y - 36 + bob, 3, 7, HAIR);
      if (!back) {
        r(c, x - 4, y - 31 + bob, 2, 3, "#1a0608");
        r(c, x + 2, y - 31 + bob, 2, 3, "#1a0608");
        r(c, x - 2, y - 26 + bob, 4, 1, "#8a4a3a");
      }
    }
    void time;
  }

  function drawPortrait(canvas) {
    const c = canvas.getContext("2d");
    r(c, 0, 0, 16, 16, C.red3);
    r(c, 2, 12, 12, 4, HOODIE);
    r(c, 10, 12, 4, 4, HOODIE_DARK);
    r(c, 6, 13, 1, 3, C.cream);
    r(c, 9, 13, 1, 3, C.cream);
    r(c, 4, 4, 8, 9, SKIN);
    r(c, 3, 2, 10, 3, HAIR);
    r(c, 3, 4, 2, 4, HAIR);
    r(c, 11, 4, 2, 4, HAIR);
    r(c, 5, 7, 2, 2, "#1a0608");
    r(c, 9, 7, 2, 2, "#1a0608");
    r(c, 7, 10, 2, 1, "#8a4a3a");
  }

  /* ─── State ─── */

  const canvas = $("#world");
  const ctx = canvas.getContext("2d");
  const minimap = $("#minimap");
  const mctx = minimap.getContext("2d");
  const panel = $("#panel");
  const panelBody = $("#panel-body");
  const gameEl = $("#game");
  const titleScreen = $("#title-screen");
  const promptEl = $("#prompt");
  const talkEl = $("#talk");
  const talkText = $("#talk-text");
  const toastsEl = $("#toasts");
  const aBtn = $("#a-btn");

  const player = { x: SPAWN.x, y: SPAWN.y, dir: "up", moving: false, step: 0 };
  const cam = { x: 0, y: 0 };
  const keys = new Set();
  const touchDirs = new Set();
  const discovered = new Set(
    store
      .get("rp-discovered", [])
      .filter((n) => PROJECTS.some((p) => p.name === n)),
  );
  let soundOn = store.get("rp-sound", true);
  let mode = "title";
  let nearby = null;
  let target = null;
  let pending = null;
  let stuckTime = 0;
  let zoom = 1;
  let dpr = 1;
  let viewW = 0;
  let viewH = 0;
  let last = 0;
  let talking = false;
  let petals = [];
  let confetti = [];

  /* ─── Sound ─── */

  let audio;
  function tone(
    freq,
    dur,
    { type = "square", vol = 0.035, slide = 0, delay = 0 } = {},
  ) {
    if (!soundOn) return;
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      if (audio.state === "suspended") audio.resume();
      const t0 = audio.currentTime + delay;
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, t0);
      if (slide) osc.frequency.exponentialRampToValueAtTime(slide, t0 + dur);
      gain.gain.setValueAtTime(vol, t0);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      osc.connect(gain).connect(audio.destination);
      osc.start(t0);
      osc.stop(t0 + dur + 0.02);
    } catch {
      /* audio unavailable */
    }
  }
  const sfx = {
    start: () =>
      [392, 523, 659, 784].forEach((f, i) =>
        tone(f, 0.12, { delay: i * 0.07 }),
      ),
    open: () =>
      [440, 587, 784].forEach((f, i) => tone(f, 0.09, { delay: i * 0.05 })),
    close: () => tone(440, 0.1, { slide: 220 }),
    blip: () => tone(900, 0.025, { vol: 0.012 }),
    near: () => tone(660, 0.05, { vol: 0.02 }),
    discover: () =>
      [523, 659, 784, 1047].forEach((f, i) =>
        tone(f, 0.15, { delay: i * 0.09 }),
      ),
    complete: () =>
      [523, 523, 523, 659, 784, 659, 784, 1047].forEach((f, i) =>
        tone(f, 0.16, { delay: i * 0.11, type: i % 2 ? "square" : "triangle" }),
      ),
    portal: () => tone(200, 0.5, { slide: 1200, type: "sawtooth", vol: 0.02 }),
  };

  /* ─── HUD ─── */

  function updateHud() {
    const found = discovered.size;
    $("#found-count").textContent = `${found}/${PROJECTS.length}`;
    $("#xp-fill").style.width = `${(found / PROJECTS.length) * 100}%`;
    $("#xp-text").textContent = `${found * 100}/${PROJECTS.length * 100}`;
    $("#hud-level").textContent = `LV ${found + 1}`;
    $("#start-label").textContent =
      found || store.get("rp-intro", false) ? "CONTINUE" : "NEW GAME";
    const sb = $("#sound-btn");
    sb.setAttribute("aria-pressed", String(soundOn));
    $("#sound-icon").textContent = soundOn ? "♪ ON" : "♪ OFF";
  }

  function toast(title, text, big = false) {
    const el = h(
      "div",
      { class: `toast${big ? " big" : ""}` },
      h("strong", {}, title),
      h("span", {}, text),
    );
    toastsEl.append(el);
    setTimeout(
      () => {
        el.classList.add("out");
        setTimeout(() => el.remove(), 320);
      },
      big ? 4200 : 2800,
    );
  }

  function announce(text) {
    $("#live").textContent = text;
  }

  /* ─── Dialogue ─── */

  let talkQueue = [];
  let talkDone = null;
  let typing = null;
  let fullLine = "";

  function say(lines, done) {
    talkQueue = lines.slice();
    talkDone = done;
    talking = true;
    talkEl.hidden = false;
    promptEl.hidden = true;
    keys.clear();
    nextLine();
  }

  function nextLine() {
    if (typing) {
      clearInterval(typing);
      typing = null;
      talkText.textContent = fullLine;
      return;
    }
    if (!talkQueue.length) {
      talkEl.hidden = true;
      talking = false;
      const done = talkDone;
      talkDone = null;
      done?.();
      return;
    }
    fullLine = talkQueue.shift();
    if (reduced.matches) {
      talkText.textContent = fullLine;
      return;
    }
    let i = 0;
    talkText.textContent = "";
    typing = setInterval(() => {
      i += 1;
      talkText.textContent = fullLine.slice(0, i);
      if (i % 3 === 0) sfx.blip();
      if (i >= fullLine.length) {
        clearInterval(typing);
        typing = null;
      }
    }, 22);
  }

  talkEl.addEventListener("click", nextLine);

  /* ─── Panels ─── */

  function showPanel(kicker, ...nodes) {
    $("#panel-kicker").textContent = kicker;
    panelBody.replaceChildren(...nodes.flat(Infinity).filter(Boolean));
    keys.clear();
    touchDirs.clear();
    if (!panel.open) panel.showModal();
    panel.scrollTop = 0;
    sfx.open();
  }

  function closeButton(label = "◀ BACK TO CITY") {
    return h("button", { class: "btn", "data-close": true }, label);
  }

  function extLink(href, label, primary) {
    return h(
      "a",
      {
        class: `btn${primary ? " btn-primary" : ""}`,
        href,
        target: "_blank",
        rel: "noopener noreferrer",
      },
      label,
    );
  }

  function openProject(index) {
    const p = PROJECTS[index];
    showPanel(
      `STAGE 0${index + 1} · ${p.category}`,
      h("h2", { id: "panel-title" }, p.name),
      h("p", { class: "panel-sub" }, p.type),
      p.image
        ? h(
            "figure",
            { class: "screen" },
            h("img", { src: p.image, alt: `${p.name} screenshot` }),
          )
        : h(
            "div",
            { class: "screen" },
            h(
              "div",
              {
                class: `parking-art${p.art === "P" ? "" : " id-art"}`,
                "aria-hidden": "true",
              },
              p.art,
            ),
          ),
      h("p", { class: "panel-text" }, p.description),
      h("p", { class: "loot-label" }, "LOOT · TECH STACK"),
      h(
        "ul",
        { class: "loot" },
        p.tags.map((t) => h("li", {}, t)),
      ),
      h(
        "div",
        { class: "panel-actions" },
        extLink(`${GITHUB}/${p.repo}`, "VIEW SOURCE ↗", true),
        p.live && extLink(p.live, "VISIT LIVE SITE ↗"),
        closeButton(),
      ),
    );
    if (!discovered.has(p.name)) discover(p);
  }

  function discover(p) {
    discovered.add(p.name);
    store.set("rp-discovered", [...discovered]);
    updateHud();
    setTimeout(() => {
      sfx.discover();
      toast("★ PROJECT DISCOVERED", `${p.name} · +100 XP`);
    }, 250);
    if (discovered.size === PROJECTS.length) {
      setTimeout(() => {
        sfx.complete();
        toast(
          "QUEST COMPLETE!",
          "You found every project. Drop by the Post Office to say hi.",
          true,
        );
        burst();
      }, 1600);
    }
  }

  function openAbout() {
    showPanel(
      "ROSHAN'S HOUSE · PLAYER PROFILE",
      h("h2", { id: "panel-title" }, "Hi, I’m Roshan."),
      h(
        "p",
        { class: "panel-sub" },
        "Computer Engineering · NUS · now in Silicon Valley",
      ),
      h(
        "p",
        { class: "panel-text" },
        "I’m a Computer Engineering student at the National University of Singapore, spending 2026–27 in Silicon Valley with NUS Overseas Colleges. Right now I’m a compiler engineering intern at TetraMem, building virtual platforms for RISC-V chips.",
      ),
      h(
        "p",
        { class: "panel-text" },
        "Outside work I build AI agents, identity systems, and embedded devices. I also play for the Singapore National Cricket Team as a Sport Singapore carded athlete.",
      ),
      h(
        "p",
        { class: "panel-text" },
        "Different tools. Same instinct: make something useful.",
      ),
      h("p", { class: "loot-label" }, "ABILITIES"),
      h(
        "ul",
        { class: "skills" },
        SKILLS.map((s) => h("li", {}, s)),
      ),
      h(
        "div",
        { class: "panel-actions" },
        h(
          "a",
          { class: "btn btn-primary", href: "resume.html" },
          "READ MY RÉSUMÉ",
        ),
        closeButton(),
      ),
    );
  }

  function openContact() {
    showPanel(
      "POST OFFICE · SEND A MESSAGE",
      h("h2", { id: "panel-title" }, "Let’s build something good."),
      h(
        "p",
        { class: "panel-sub" },
        "An idea, a collaboration, or just a hello",
      ),
      h(
        "div",
        { class: "contact-list" },
        h(
          "a",
          { class: "btn btn-primary", href: `mailto:${EMAIL}` },
          h("span", {}, "✉ EMAIL"),
          h("span", {}, EMAIL),
        ),
        h(
          "a",
          { class: "btn", href: `mailto:${NUS_EMAIL}` },
          h("span", {}, "✉ NUS EMAIL"),
          h("span", {}, NUS_EMAIL),
        ),
        h(
          "a",
          {
            class: "btn",
            href: LINKEDIN,
            target: "_blank",
            rel: "noopener noreferrer",
          },
          h("span", {}, "LINKEDIN"),
          h("span", {}, "↗"),
        ),
        h(
          "a",
          {
            class: "btn",
            href: GITHUB,
            target: "_blank",
            rel: "noopener noreferrer",
          },
          h("span", {}, "GITHUB"),
          h("span", {}, "↗"),
        ),
      ),
      h(
        "div",
        { class: "panel-actions", style: "margin-top:22px" },
        closeButton(),
      ),
    );
  }

  const RECORDS = [
    [
      "WORK EXPERIENCE",
      [
        [
          "⚙",
          "TetraMem · Compiler Engineering Intern",
          "QEMU/SystemC virtual platforms for 3 RISC-V chip lines, 1,000x–100,000x faster than RTL testing",
          "AUG 2026–MAY 2027",
        ],
        [
          "$",
          "SonicBoom Solutions · Software Engineering Intern",
          "Invoice reconciliation system handling 7,000+ transactions a day",
          "MAY–AUG 2025",
        ],
        [
          "▤",
          "Joe Tech Engineering · Software Engineering Intern",
          "Python automation for Atlassian reporting, cutting manual effort 20%",
          "JAN 2024–JUL 2026",
        ],
      ],
    ],
    [
      "EDUCATION",
      [
        [
          "◆",
          "National University of Singapore",
          "B.Eng (Honours), Computer Engineering",
          "2024–2028",
        ],
        [
          "✈",
          "NUS Overseas Colleges, Silicon Valley",
          "Year-long entrepreneurship and industry immersion",
          "2026–2027",
        ],
      ],
    ],
    [
      "ATHLETICS",
      [
        [
          "★",
          "Singapore National Cricket Team",
          "Carded Athlete, Sport Singapore",
          "",
        ],
      ],
    ],
  ];

  function openResume() {
    showPanel(
      "RÉSUMÉ HALL · THE RECORDS",
      h("h2", { id: "panel-title" }, "The full record."),
      h("p", { class: "panel-sub" }, "Experience, education, and athletics"),
      RECORDS.map(([section, rows]) => [
        h("p", { class: "log-section" }, section),
        h(
          "ul",
          { class: "log-list" },
          rows.map(([icon, name, desc, date]) =>
            h(
              "li",
              {},
              h(
                "div",
                { class: "log-item found record" },
                h("span", { class: "log-icon", "aria-hidden": "true" }, icon),
                h(
                  "span",
                  {},
                  h("span", { class: "log-name" }, name),
                  h("span", { class: "log-desc" }, desc),
                ),
                h("span", { class: "log-status" }, date),
              ),
            ),
          ),
        ),
      ]),
      h(
        "div",
        { class: "panel-actions" },
        h(
          "a",
          { class: "btn btn-primary", href: "resume.html" },
          "OPEN FULL RÉSUMÉ",
        ),
        closeButton(),
      ),
    );
  }

  function openPortal() {
    sfx.portal();
    showPanel(
      "GITHUB PORTAL · WARP ZONE",
      h("h2", { id: "panel-title" }, "Warp to GitHub?"),
      h(
        "p",
        { class: "panel-sub" },
        "More code, experiments, and works in progress",
      ),
      h(
        "p",
        { class: "panel-text" },
        "This portal leads to everything else I’ve built, including projects that haven’t got a building yet.",
      ),
      h(
        "div",
        { class: "panel-actions" },
        extLink(GITHUB, "WARP TO GITHUB ↗", true),
        closeButton("STAY HERE"),
      ),
    );
  }

  function openQuestLog() {
    const item = (spot, icon, name, desc, status, found) =>
      h(
        "li",
        {},
        h(
          "button",
          {
            class: `log-item${found ? " found" : ""}`,
            onclick: () => travel(spot),
          },
          h("span", { class: "log-icon", "aria-hidden": "true" }, icon),
          h(
            "span",
            {},
            h("span", { class: "log-name" }, name),
            h("span", { class: "log-desc" }, desc),
          ),
          h("span", { class: "log-status" }, status),
        ),
      );
    const projectItems = PROJECTS.map((p, i) => {
      const spot = PLACES.find((s) => s.project === i);
      const found = discovered.has(p.name);
      return item(
        spot,
        found ? "★" : "?",
        `0${i + 1} ${p.name}`,
        p.type,
        found ? "FOUND" : "TRAVEL ▶",
        found,
      );
    });
    const places = [
      [PLACES.find((s) => s.id === "home"), "⌂", "ROSHAN'S HOUSE", "About me"],
      [
        PLACES.find((s) => s.id === "post"),
        "✉",
        "POST OFFICE",
        "Get in touch",
      ],
      [
        PLACES.find((s) => s.id === "records"),
        "▤",
        "RÉSUMÉ HALL",
        "The full résumé",
      ],
      [PORTAL, "◎", "GITHUB PORTAL", "Everything else"],
    ].map(([spot, icon, name, desc]) =>
      item(spot, icon, name, desc, "TRAVEL ▶", false),
    );
    showPanel(
      "QUEST LOG",
      h("h2", { id: "panel-title" }, "Find all seven projects."),
      h(
        "p",
        { class: "panel-sub" },
        `${discovered.size} of ${PROJECTS.length} discovered · pick one to fast travel`,
      ),
      h("p", { class: "log-section" }, "MAIN QUESTS"),
      h("ul", { class: "log-list" }, projectItems),
      h("p", { class: "log-section" }, "LANDMARKS"),
      h("ul", { class: "log-list" }, places),
      h(
        "div",
        { class: "log-foot" },
        h("span", {}, `XP ${discovered.size * 100}/${PROJECTS.length * 100}`),
        h(
          "button",
          {
            class: "link-btn",
            onclick: () => {
              discovered.clear();
              store.set("rp-discovered", []);
              updateHud();
              openQuestLog();
            },
          },
          "RESET PROGRESS",
        ),
      ),
    );
  }

  function travel(spot) {
    panel.close();
    if (mode !== "play") startGame(true);
    player.x = spot.door.x;
    player.y = spot.door.y;
    player.dir = "up";
    target = null;
    pending = null;
    snapCamera();
    setTimeout(() => enter(spot), 120);
  }

  function enter(spot) {
    if (spot.project != null) openProject(spot.project);
    else if (spot.id === "home") openAbout();
    else if (spot.id === "post") openContact();
    else if (spot.id === "records") openResume();
    else if (spot.id === "github") openPortal();
  }

  panel.addEventListener("click", (event) => {
    if (event.target.closest("[data-close]")) {
      panel.close();
      return;
    }
    if (event.target === panel) {
      const b = panel.getBoundingClientRect();
      if (
        event.clientX < b.left ||
        event.clientX > b.right ||
        event.clientY < b.top ||
        event.clientY > b.bottom
      )
        panel.close();
    }
  });
  panel.addEventListener("close", () => {
    sfx.close();
    keys.clear();
    touchDirs.clear();
    if (mode === "play") gameEl.focus({ preventScroll: true });
    else $("#start-btn").focus({ preventScroll: true });
  });

  /* ─── Game flow ─── */

  function startGame(skipIntro = false) {
    if (mode === "play") return;
    mode = "play";
    sfx.start();
    titleScreen.classList.add("leaving");
    setTimeout(() => (titleScreen.hidden = true), 400);
    $("#hud").hidden = false;
    $("#hint").hidden = coarse.matches;
    $("#touch").hidden = !coarse.matches;
    snapCamera();
    gameEl.focus({ preventScroll: true });
    if (!skipIntro && !store.get("rp-intro", false)) {
      const walk = coarse.matches
        ? "Use the pad to walk, or just tap a building. Tap A at a door to step inside."
        : "Walk with WASD or the arrow keys, or click anywhere. Press E at a door to step inside.";
      say(
        [
          "Hey, I’m Roshan! I study Computer Engineering at NUS, and right now I’m in Silicon Valley as a compiler engineering intern at TetraMem.",
          "Welcome to Rosh City. Every building here is something I’ve built.",
          walk,
          "Find all seven projects to finish the quest. My house and the Post Office are open too. Have fun!",
        ],
        () => {
          store.set("rp-intro", true);
          updateHud();
        },
      );
    } else if (!skipIntro) {
      toast(
        "WELCOME BACK",
        `${discovered.size}/${PROJECTS.length} projects found so far.`,
      );
    }
  }

  $("#start-btn").addEventListener("click", () => startGame());
  $("#log-btn").addEventListener("click", openQuestLog);
  $("#quest-btn").addEventListener("click", openQuestLog);
  $("#sound-btn").addEventListener("click", toggleSound);

  function toggleSound() {
    soundOn = !soundOn;
    store.set("rp-sound", soundOn);
    updateHud();
    if (soundOn) tone(784, 0.08);
  }

  /* ─── Input ─── */

  const KEYMAP = {
    arrowup: "up",
    w: "up",
    arrowdown: "down",
    s: "down",
    arrowleft: "left",
    a: "left",
    arrowright: "right",
    d: "right",
  };

  function held(dir) {
    if (touchDirs.has(dir)) return true;
    for (const k of keys) if (KEYMAP[k] === dir) return true;
    return false;
  }

  document.addEventListener("keydown", (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const key = event.key.toLowerCase();
    if (panel.open) {
      if (key === "q" && $("#panel-kicker").textContent === "QUEST LOG")
        panel.close();
      return;
    }
    if (mode === "title") {
      const items = [...document.querySelectorAll(".menu-item")];
      const index = items.indexOf(document.activeElement);
      if (key === "arrowdown" || key === "arrowup") {
        event.preventDefault();
        const next =
          (index + (key === "arrowdown" ? 1 : -1) + items.length) %
          items.length;
        items[index < 0 ? 0 : next].focus();
        tone(660, 0.04, { vol: 0.02 });
      } else if (key === "enter" && index < 0) {
        event.preventDefault();
        startGame();
      }
      return;
    }
    if (talking) {
      if (["enter", " ", "e"].includes(key)) {
        event.preventDefault();
        if (!event.repeat) nextLine();
      }
      return;
    }
    if (KEYMAP[key]) {
      event.preventDefault();
      keys.add(key);
      return;
    }
    const onControl = event.target.closest?.("button, a");
    if ((key === "e" || key === "enter" || key === " ") && !onControl) {
      event.preventDefault();
      if (nearby && !event.repeat) enter(nearby);
    } else if (key === "q") {
      openQuestLog();
    } else if (key === "m") {
      toggleSound();
    }
  });
  document.addEventListener("keyup", (event) =>
    keys.delete(event.key.toLowerCase()),
  );
  window.addEventListener("blur", () => {
    keys.clear();
    touchDirs.clear();
  });

  function screenToWorld(event) {
    const b = canvas.getBoundingClientRect();
    return {
      x: cam.x + (event.clientX - b.left) / zoom,
      y: cam.y + (event.clientY - b.top) / zoom,
    };
  }

  function spotAt(pt) {
    return SPOTS.find(
      (s) =>
        pt.x >= s.x - 8 &&
        pt.x <= s.x + s.w + 8 &&
        pt.y >= s.y - 28 &&
        pt.y <= s.y + s.h + 22,
    );
  }

  canvas.addEventListener("pointerdown", (event) => {
    if (mode !== "play" || panel.open) return;
    if (talking) {
      nextLine();
      return;
    }
    const pt = screenToWorld(event);
    const spot = spotAt(pt);
    if (spot) {
      if (nearby === spot) {
        enter(spot);
        return;
      }
      target = { ...spot.door };
      pending = spot;
    } else {
      target = pt;
      pending = null;
    }
    stuckTime = 0;
  });

  canvas.addEventListener("pointermove", (event) => {
    if (mode !== "play" || event.pointerType !== "mouse") return;
    canvas.style.cursor = spotAt(screenToWorld(event))
      ? "pointer"
      : "crosshair";
  });

  document.querySelectorAll(".dpad button").forEach((btn) => {
    const dir = btn.dataset.dir;
    const release = () => {
      touchDirs.delete(dir);
      btn.classList.remove("held");
    };
    btn.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      btn.setPointerCapture(event.pointerId);
      touchDirs.add(dir);
      btn.classList.add("held");
      target = null;
      pending = null;
    });
    btn.addEventListener("pointerup", release);
    btn.addEventListener("pointercancel", release);
    btn.addEventListener("lostpointercapture", release);
    btn.addEventListener("contextmenu", (event) => event.preventDefault());
  });

  aBtn.addEventListener("click", () => {
    if (talking) nextLine();
    else if (nearby) enter(nearby);
  });

  /* ─── Simulation ─── */

  function blocked(x, y) {
    if (x < 18 || x > W - 18 || y < 152 || y > H - 12) return true;
    const bx = x - 7;
    const by = y - 5;
    return solids.some(
      (s) => bx < s.x + s.w && bx + 14 > s.x && by < s.y + s.h && by + 6 > s.y,
    );
  }

  function update(dt) {
    let dx = (held("right") ? 1 : 0) - (held("left") ? 1 : 0);
    let dy = (held("down") ? 1 : 0) - (held("up") ? 1 : 0);
    if (dx || dy) {
      target = null;
      pending = null;
    } else if (target) {
      const tx = target.x - player.x;
      const ty = target.y - player.y;
      const dist = Math.hypot(tx, ty);
      if (dist < 3) {
        const spot = pending;
        target = null;
        pending = null;
        if (spot) enter(spot);
      } else {
        dx = tx / dist;
        dy = ty / dist;
      }
    }
    const len = Math.hypot(dx, dy);
    const speed = 160;
    const ox = player.x;
    const oy = player.y;
    if (len) {
      const mx = (dx / len) * speed * dt;
      const my = (dy / len) * speed * dt;
      if (!blocked(player.x + mx, player.y)) player.x += mx;
      if (!blocked(player.x, player.y + my)) player.y += my;
      if (Math.abs(dx) > Math.abs(dy)) player.dir = dx > 0 ? "right" : "left";
      else player.dir = dy > 0 ? "down" : "up";
    }
    const moved = Math.hypot(player.x - ox, player.y - oy);
    player.moving = moved > 0.05;
    player.step += moved;
    if (target && len && moved < speed * dt * 0.2) {
      stuckTime += dt;
      if (stuckTime > 0.25) {
        const spot = pending;
        target = null;
        pending = null;
        stuckTime = 0;
        if (spot) enter(spot);
      }
    } else stuckTime = 0;
    updateNearby();
  }

  function updateNearby() {
    let best = null;
    let bestDist = 46;
    SPOTS.forEach((s) => {
      let d = Math.hypot(s.door.x - player.x, s.door.y - player.y);
      // walking right up to any wall also counts, so no building is a dead end
      const ex = Math.max(s.x - player.x, 0, player.x - (s.x + s.w));
      const ey = Math.max(s.y - player.y, 0, player.y - (s.y + s.h));
      const edge = Math.hypot(ex, ey);
      if (edge < 12) d = Math.min(d, 30 + edge);
      if (d < bestDist) {
        best = s;
        bestDist = d;
      }
    });
    if (best === nearby) return;
    nearby = best;
    aBtn.classList.toggle("ready", Boolean(nearby));
    if (nearby && !talking) {
      sfx.near();
      const key = coarse.matches ? "A" : "E";
      const p = nearby.project != null ? PROJECTS[nearby.project] : null;
      promptEl.replaceChildren(
        ...[
          h("kbd", {}, key),
          `ENTER ${nearby.label}`,
          p ? h("small", {}, p.type) : null,
        ].filter(Boolean),
      );
      promptEl.hidden = false;
      announce(`You’re at ${nearby.label}. Press ${key} to enter.`);
    } else {
      promptEl.hidden = true;
    }
  }

  /* ─── Camera and rendering ─── */

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    canvas.width = Math.round(vw * dpr);
    canvas.height = Math.round(vh * dpr);
    zoom = Math.max(0.6, Math.min(vw / (vw < 700 ? 440 : 980), vh / 600));
    viewW = vw / zoom;
    viewH = vh / zoom;
    snapCamera();
  }

  function cameraTarget(time) {
    if (mode === "title") {
      return {
        x: 800 + Math.sin(time / 7000) * 420,
        y: 560 + Math.cos(time / 9000) * 220,
      };
    }
    return { x: player.x, y: player.y - 20 };
  }

  function clampCam(x, y) {
    const cx =
      viewW >= W
        ? (W - viewW) / 2
        : Math.max(0, Math.min(W - viewW, x - viewW / 2));
    const cy =
      viewH >= H
        ? (H - viewH) / 2
        : Math.max(0, Math.min(H - viewH, y - viewH / 2));
    return { x: cx, y: cy };
  }

  function snapCamera() {
    const t = clampCam(...Object.values(cameraTarget(performance.now())));
    cam.x = t.x;
    cam.y = t.y;
  }

  function drawAnimated(c, time) {
    const still = reduced.matches;
    const t = still ? 0 : time;

    // fountain
    for (let i = 0; i < 2; i++) {
      const k = ((t / 1600 + i / 2) % 1) * 30;
      c.strokeStyle = `rgba(255,107,122,${0.5 - k / 70})`;
      c.lineWidth = 1.5;
      c.beginPath();
      c.ellipse(800, 720, 6 + k, (6 + k) * 0.55, 0, 0, Math.PI * 2);
      c.stroke();
    }
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      const s = (t / 700 + i / 10) % 1;
      const dx = Math.cos(a) * s * 24;
      const dy = Math.sin(a) * s * 12 - Math.sin(s * Math.PI) * 22;
      r(c, 799 + dx, 696 + dy, 2, 2, "#ffb3bd");
    }

    // LP Radar dish
    const tower = PLACES[1];
    const tx = tower.x + tower.w / 2;
    const ty = tower.y - 26;
    const dish = Math.cos(t / 600) * 18;
    r(
      c,
      tx - Math.abs(dish),
      ty - 12,
      Math.abs(dish) * 2 + 1,
      12,
      dish > 0 ? C.cream : C.cream2,
    );
    r(c, tx - 2, ty - 8, 4, 4, C.red3);
    if (Math.floor(t / 500) % 2 === 0) r(c, tx - 1, ty - 18, 3, 3, C.red);
    const ping = (t / 2200) % 1;
    c.strokeStyle = `rgba(255,46,67,${0.6 * (1 - ping)})`;
    c.lineWidth = 2;
    c.beginPath();
    c.arc(tx, ty - 6, 10 + ping * 70, 0, Math.PI * 2);
    c.stroke();

    // GravityGuard chip core + antenna
    const lab = PLACES[3];
    const glow = 0.5 + 0.5 * Math.sin(t / 300);
    r(
      c,
      lab.x + 24 + 18,
      lab.y + 84 + 18,
      18,
      18,
      `rgba(255,46,67,${0.4 + glow * 0.6})`,
    );
    if (Math.floor(t / 400) % 3 === 0)
      r(c, lab.x + lab.w - 27, lab.y - 32, 5, 5, C.gold);

    // Memspace graph nodes
    const mem = PLACES[4];
    if (mem.nodes) {
      mem.nodes.forEach((n, i) => {
        const pulse = 0.5 + 0.5 * Math.sin(t / 400 + i);
        r(c, n.x - 4, n.y - 4, 9, 9, "#0c0205");
        r(c, n.x - 3, n.y - 3, 7, 7, i % 3 === 0 ? C.gold : C.red);
        if (pulse > 0.7) r(c, n.x - 1, n.y - 1, 3, 3, "#fff");
      });
      const [a, b] = mem.edges[Math.floor(t / 900) % mem.edges.length];
      const f = (t / 900) % 1;
      const na = mem.nodes[a];
      const nb = mem.nodes[b];
      r(
        c,
        na.x + (nb.x - na.x) * f - 1,
        na.y + (nb.y - na.y) * f - 1,
        4,
        4,
        "#fff",
      );
    }

    // AgentKey vault wheel
    const vault = PLACES.find((p) => p.id === "agentkey");
    const vx = vault.x + vault.w / 2;
    const vy = vault.y + 80;
    for (let i = 0; i < 3; i++) {
      const a = t / 1800 + (i * Math.PI) / 3;
      pline(
        c,
        vx - Math.cos(a) * 18,
        vy - Math.sin(a) * 18,
        vx + Math.cos(a) * 18,
        vy + Math.sin(a) * 18,
        "#3a1a20",
        3,
      );
    }
    ellipse(c, vx, vy, 7, 7, C.red);
    r(c, vx - 2, vy - 3, 4, 4, C.gold);
    r(c, vx - 1, vy + 1, 2, 4, C.gold);

    // chimney smoke
    const house = PLACES[7];
    for (let i = 0; i < 4; i++) {
      const s = (t / 2600 + i / 4) % 1;
      const size = 5 + s * 8;
      c.fillStyle = `rgba(200,160,160,${0.35 * (1 - s)})`;
      c.fillRect(
        house.x + house.w - 54 + Math.sin(s * 6 + i) * 6 - size / 2,
        house.y - 22 - s * 60,
        size,
        size,
      );
    }

    // portal swirl
    const rings = ["#ff2e43", "#7a1020", "#ff6b7a", "#3a0810", "#ffbf5e"];
    for (let i = 0; i < 5; i++) {
      const idx = (i + Math.floor(t / 140)) % rings.length;
      ellipse(c, 800, 1033, 34 - i * 6, 32 - i * 6, rings[idx]);
    }
    for (let i = 0; i < 6; i++) {
      const a = t / 500 + i;
      r(c, 800 + Math.cos(a) * 26, 1033 + Math.sin(a) * 24, 3, 3, "#fff");
    }

    // nearby door highlight
    if (nearby) {
      const pulse = 0.4 + 0.4 * Math.sin(t / 160);
      c.fillStyle = `rgba(255,191,94,${pulse})`;
      c.fillRect(nearby.door.x - 22, nearby.door.y - 6, 44, 4);
    }
  }

  function drawGlows(c, time) {
    c.globalCompositeOperation = "lighter";
    lamps.forEach((l) => {
      if (!visible(l.x, l.y, 80)) return;
      const flicker = reduced.matches
        ? 1
        : 0.92 + 0.08 * Math.sin(time / 90 + l.x);
      const g = c.createRadialGradient(l.x, l.y - 52, 2, l.x, l.y - 30, 70);
      g.addColorStop(0, `rgba(255,170,120,${0.32 * flicker})`);
      g.addColorStop(1, "rgba(255,80,60,0)");
      c.fillStyle = g;
      c.fillRect(l.x - 70, l.y - 120, 140, 150);
    });
    const g = c.createRadialGradient(800, 1033, 4, 800, 1033, 90);
    g.addColorStop(0, "rgba(255,60,80,0.35)");
    g.addColorStop(1, "rgba(255,60,80,0)");
    c.fillStyle = g;
    c.fillRect(700, 940, 200, 180);
    c.globalCompositeOperation = "source-over";
  }

  function visible(x, y, pad) {
    return (
      x > cam.x - pad &&
      x < cam.x + viewW + pad &&
      y > cam.y - pad &&
      y < cam.y + viewH + pad * 1.5
    );
  }

  function drawLabels(c, time) {
    c.font = '8px "Press Start 2P", monospace';
    c.textAlign = "center";
    c.textBaseline = "middle";
    const bob = reduced.matches ? 0 : Math.round(Math.sin(time / 260) * 2);
    SPOTS.forEach((s) => {
      const cx = s.x + s.w / 2;
      const ly = s.kind === "portal" ? s.y - 14 : s.y - 18;
      if (!visible(cx, ly, 120)) return;
      const tw = c.measureText(s.label).width;
      r(c, cx - tw / 2 - 8, ly - 9, tw + 16, 18, "#000");
      r(
        c,
        cx - tw / 2 - 6,
        ly - 7,
        tw + 12,
        14,
        s === nearby ? C.red : "#2a0910",
      );
      c.fillStyle = C.cream;
      c.fillText(s.label, cx, ly + 1);
      if (s.project != null) {
        const found = discovered.has(PROJECTS[s.project].name);
        const my = ly - 22 + (found ? 0 : bob);
        r(c, cx - 7, my - 7, 14, 14, "#000");
        r(c, cx - 5, my - 5, 10, 10, found ? C.red : C.gold);
        c.fillStyle = found ? C.cream : "#000";
        c.fillText(found ? "✓" : "!", cx + 0.5, my + 1);
      }
    });
  }

  function drawPetals(c, dt) {
    if (reduced.matches) return;
    while (petals.length < 46) {
      petals.push({
        x: cam.x + Math.random() * viewW,
        y: cam.y - 10 - Math.random() * viewH,
        vx: 8 + Math.random() * 14,
        vy: 18 + Math.random() * 18,
        p: Math.random() * 6,
        c: Math.random() < 0.6 ? "#ff5a6a" : "#c41e3a",
      });
    }
    petals.forEach((p) => {
      p.p += dt * 3;
      p.x += (p.vx + Math.sin(p.p) * 10) * dt;
      p.y += p.vy * dt;
      r(c, p.x, p.y, Math.sin(p.p) > 0 ? 3 : 2, 2, p.c);
    });
    petals = petals.filter(
      (p) =>
        p.y < cam.y + viewH + 10 &&
        p.x < cam.x + viewW + 20 &&
        p.x > cam.x - 40,
    );
  }

  function burst() {
    if (reduced.matches) return;
    const colors = ["#ff2e43", "#ffbf5e", "#ffe9e0", "#ff6b7a"];
    for (let i = 0; i < 160; i++) {
      confetti.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 3,
        vx: (Math.random() - 0.5) * 700,
        vy: -Math.random() * 600,
        life: 2 + Math.random(),
        c: colors[i % colors.length],
      });
    }
  }

  function drawConfetti(c, dt) {
    if (!confetti.length) return;
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    confetti.forEach((p) => {
      p.vy += 900 * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= dt;
      r(c, p.x, p.y, 6, 6, p.c);
    });
    confetti = confetti.filter((p) => p.life > 0);
  }

  function drawTargetMarker(c, time) {
    if (!target) return;
    const s = 4 + Math.round(Math.sin(time / 120) * 1.5);
    c.strokeStyle = C.gold;
    c.lineWidth = 2;
    c.strokeRect(target.x - s, target.y - s / 2, s * 2, s);
  }

  const miniBase = document.createElement("canvas");
  function buildMinimap() {
    miniBase.width = 160;
    miniBase.height = MM_H;
    const m = miniBase.getContext("2d");
    m.imageSmoothingEnabled = true;
    m.drawImage(scenery, 0, 0, 160, MM_H);
    m.fillStyle = "rgba(20,0,5,0.35)";
    m.fillRect(0, 0, 160, MM_H);
  }

  function drawMinimap(time) {
    mctx.drawImage(miniBase, 0, 0);
    const blink = Math.floor(time / 300) % 2 === 0;
    SPOTS.forEach((s) => {
      const x = (s.door.x / W) * 160;
      const y = (s.door.y / H) * MM_H;
      let color = C.cream2;
      if (s.project != null)
        color = discovered.has(PROJECTS[s.project].name)
          ? C.red
          : blink
            ? C.gold
            : "#a06a20";
      r(mctx, x - 2, y - 2, 5, 5, "#000");
      r(mctx, x - 1, y - 1, 3, 3, color);
    });
    mctx.strokeStyle = "rgba(255,233,224,0.6)";
    mctx.lineWidth = 1;
    mctx.strokeRect(
      (cam.x / W) * 160 + 0.5,
      (cam.y / H) * MM_H + 0.5,
      (viewW / W) * 160,
      (viewH / H) * MM_H,
    );
    const px = (player.x / W) * 160;
    const py = (player.y / H) * MM_H;
    r(mctx, px - 2, py - 2, 5, 5, "#000");
    r(mctx, px - 1, py - 1, 3, 3, "#fff");
  }

  function render(time) {
    const dt = Math.min((time - last) / 1000, 0.05) || 0;
    last = time;

    if (mode === "play" && !panel.open && !talking) update(dt);
    else player.moving = false;

    const want = clampCam(...Object.values(cameraTarget(time)));
    const ease = reduced.matches
      ? 1
      : Math.min(1, dt * (mode === "title" ? 2 : 7));
    cam.x += (want.x - cam.x) * ease;
    cam.y += (want.y - cam.y) * ease;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = "#0b0204";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const s = zoom * dpr;
    ctx.setTransform(
      s,
      0,
      0,
      s,
      -Math.round(cam.x * s),
      -Math.round(cam.y * s),
    );
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(scenery, 0, 0);
    drawAnimated(ctx, time);

    const sprites = [];
    trees.forEach(
      (t) =>
        visible(t.x, t.y, 70) &&
        sprites.push({ y: t.y, draw: () => drawTree(ctx, t) }),
    );
    lamps.forEach(
      (l) =>
        visible(l.x, l.y, 70) &&
        sprites.push({ y: l.y, draw: () => drawLamp(ctx, l) }),
    );
    sprites.push({
      y: player.y,
      draw: () => {
        ctx.save();
        ctx.translate(player.x, player.y);
        ctx.scale(1.5, 1.5);
        ctx.translate(-player.x, -player.y);
        drawPlayer(ctx, player, time);
        ctx.restore();
      },
    });
    sprites.sort((a, b) => a.y - b.y).forEach((sp) => sp.draw());

    drawTargetMarker(ctx, time);
    drawGlows(ctx, time);
    drawLabels(ctx, time);
    drawPetals(ctx, dt);
    drawConfetti(ctx, dt);
    drawMinimap(time);

    requestAnimationFrame(render);
  }

  /* ─── Boot ─── */

  plantWorld();
  drawScenery();
  buildMinimap();
  document.querySelectorAll("canvas.portrait").forEach(drawPortrait);
  $("#year").textContent = new Date().getFullYear();
  resize();
  updateHud();
  window.addEventListener("resize", resize);
  coarse.addEventListener?.("change", () => {
    if (mode === "play") {
      $("#touch").hidden = !coarse.matches;
      $("#hint").hidden = coarse.matches;
    }
  });
  $("#start-btn").focus({ preventScroll: true });
  requestAnimationFrame(render);
})();
