/* global React */
const { useState, useEffect, useRef, useMemo } = React;

/* ——— Intersection-observer fade-in (with mount-fallback for environments
   where IO doesn't fire, e.g. some preview iframes) ——— */
function useReveal(opts = { threshold: 0.15 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let revealed = false;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      el.classList.add("in");
    };
    let io;
    try {
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { reveal(); io.unobserve(el); }
        });
      }, opts);
      io.observe(el);
    } catch (_) { /* IO not supported */ }
    // Fallback — guarantee visibility even if IO never fires
    const t = setTimeout(reveal, 350);
    return () => { clearTimeout(t); io?.disconnect?.(); };
  }, []);
  return ref;
}

/* ——— Striped placeholder thumbnail ——— */
function ThumbPlaceholder({ label, tone = "warm" }) {
  const palettes = {
    warm:  ["#1e1612", "#3a2418", "#8a4622"],
    cool:  ["#10171c", "#1f2c38", "#3f586c"],
    moss:  ["#141a14", "#22301f", "#446e3a"],
    rose:  ["#1e1014", "#3d1820", "#8a2e3a"],
    plum:  ["#16101e", "#2a1840", "#5a2e7a"],
    sand:  ["#1c1814", "#352a1e", "#6e553a"],
    ochre: ["#1e1810", "#3a2e16", "#8a6a28"],
  };
  const p = palettes[tone] || palettes.warm;
  return (
    <div
      className="ed-thumb-inner"
      style={{
        background: `radial-gradient(70% 60% at 50% 35%, ${p[2]} 0%, ${p[1]} 50%, ${p[0]} 100%)`,
      }}
    >
      <div
        className="ed-thumb-inner"
        style={{
          position: "absolute", inset: 0,
          backgroundImage: `repeating-linear-gradient(135deg, transparent 0, transparent 18px, rgba(244,236,216,0.05) 18px, rgba(244,236,216,0.05) 36px)`,
          transition: "none",
        }}
      />
      <div className="ph-label">{label}</div>
    </div>
  );
}

/* ——— Project data — single source of truth ——— */
const PROJECTS = [
  { id: "uptx",         title: "UPTX",                 tagline: "A studio for design and code.",                category: "Web",            role: "Identity, Site, Dev",   year: "2025",        status: "Live",         featured: true,  tone: "warm",  href: "https://uptx.example" },
  { id: "eindproject",  title: "Eindproject",          tagline: "Graduation portfolio, built in React.",        category: "Web",            role: "Concept, Design, Dev", year: "2025",        status: "Live",         featured: true,  tone: "sand",  href: "https://eindproject.example" },
  { id: "lumeo",        title: "Lumeo",                tagline: "A new home for film and entertainment.",       category: "Web",            role: "Brand, Product",       year: "2026",        status: "Coming Soon",  featured: true,  tone: "plum"  },
  { id: "feline",       title: "Poezenhotel Feline",   tagline: "A small hotel for cats, designed warmly.",     category: "Web",            role: "Site, Identity",       year: "2026",        status: "Coming Soon",  featured: true,  tone: "rose"  },
  { id: "june20",       title: "JUNE20",               tagline: "Stage work — UI/UX, social, motion.",          category: "Brand & Social", role: "Stage Designer",       year: "2025",        status: "Ongoing",                       tone: "moss"  },
  { id: "motion-01",    title: "Title Sequence 01",    tagline: "Type in motion, frame by frame.",              category: "Motion",         role: "Direction, Animation", year: "2025",        status: "Released",                      tone: "cool"  },
  { id: "motion-02",    title: "Loop Studies",         tagline: "Six seconds, on repeat, on purpose.",          category: "Motion",         role: "Direction, Animation", year: "2025",        status: "Released",                      tone: "ochre" },
  { id: "brand-01",     title: "Editorial Set — Vol II", tagline: "Quiet covers for loud ideas.",                category: "Brand & Social", role: "Art Direction",        year: "2024",        status: "Print",                         tone: "sand"  },
  { id: "brand-02",     title: "Field Notes",          tagline: "A monthly social system in three weights.",    category: "Brand & Social", role: "Design System",        year: "2024 — 2025", status: "Ongoing",                       tone: "moss"  },
];

const FILTERS = ["All", "Web", "Motion", "Brand & Social"];

/* ——— Editorial project card — clean magazine-index style ——— */
function EdCard({ p, large = false }) {
  const ref = useReveal({ threshold: 0.1 });
  return (
    <article ref={ref} className="fade-up">
      <a
        href={p.status === "Coming Soon" ? "#" : (p.href || "#")}
        target={p.href && p.status !== "Coming Soon" ? "_blank" : undefined}
        rel="noopener"
        className="ed-card"
        onClick={(e) => { if (!p.href || p.status === "Coming Soon") e.preventDefault(); }}
      >
        <div className="ed-thumb" style={{ aspectRatio: large ? "5/4" : "4/5" }}>
          <ThumbPlaceholder label={`${p.title} — drop artwork`} tone={p.tone} />

          {/* top-right status */}
          <div style={{ position: "absolute", top: 14, right: 14, display: "flex", gap: 8, zIndex: 3 }}>
            {p.featured && <span className="chip" style={{ color: "var(--accent)", borderColor: "var(--accent)" }}>★ Featured</span>}
            {p.status === "Coming Soon" && <span className="chip" style={{ color: "var(--accent)", borderColor: "var(--accent)" }}>Soon</span>}
          </div>

          {/* hover CTA */}
          <div className="ed-hover">
            <span style={{
              fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.22em",
              textTransform: "uppercase", color: "var(--ink)",
              padding: "8px 14px", border: "1px solid var(--ink)",
              background: "rgba(0,0,0,0.3)",
              backdropFilter: "blur(8px)",
            }}>
              {p.status === "Coming Soon" ? "Preview Soon" : "View Project ↗"}
            </span>
            <span style={{
              fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.22em",
              textTransform: "uppercase", color: "var(--ink-dim)",
            }}>
              {p.role}
            </span>
          </div>
        </div>

        {/* meta below */}
        <div className="ed-meta">
          <div>
            <h3 style={{ margin: 0, fontSize: large ? "clamp(28px, 3vw, 40px)" : "clamp(22px, 2vw, 30px)", lineHeight: 1.05 }}>
              {p.title}
            </h3>
            <p style={{ margin: "6px 0 0", fontSize: 13, color: "var(--ink-dim)" }}>
              {p.tagline}
            </p>
          </div>
          <div style={{ textAlign: "right", fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-faint)" }}>
            <div>{p.category}</div>
            <div style={{ marginTop: 4 }}>{p.year}</div>
          </div>
        </div>
      </a>
    </article>
  );
}

/* ——— Navigation — router-aware ——— */
function Nav({ route }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    { href: "#/home",    num: "01", label: "Home" },
    { href: "#/about",   num: "02", label: "About" },
    { href: "#/work",    num: "03", label: "Portfolio" },
    { href: "#/contact", num: "04", label: "Contact" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: "22px 0",
        backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
        background: scrolled ? "rgba(43, 33, 26, 0.78)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--rule)" : "1px solid transparent",
        transition: "background 300ms ease, border-color 300ms ease, backdrop-filter 300ms ease",
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a
          href="#/home"
          style={{
            fontFamily: "var(--serif)",
            fontSize: 22,
            letterSpacing: "-0.01em",
            color: "var(--ink)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ fontStyle: "italic" }}>Brent</span>
          <span style={{ color: "var(--ink-faint)" }}>Demulder</span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {items.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`nav-link ${route === l.href ? "active" : ""}`}
            >
              <span className="num">{l.num}</span>{l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ——— Marquee strip ——— */
function Marquee() {
  const items = ["DESIGN", "✺", "FILM", "✺", "MUSIC", "✺", "AI", "✺", "MOTION", "✺", "TYPE", "✺", "BRAND", "✺"];
  return (
    <div style={{
      position: "relative", padding: "32px 0",
      borderTop: "1px solid var(--rule)",
      borderBottom: "1px solid var(--rule)",
      overflow: "hidden",
    }}>
      <div style={{ display: "flex", gap: 64, whiteSpace: "nowrap", animation: "marquee 38s linear infinite" }}>
        {[...items, ...items, ...items].map((it, i) => (
          <span key={i} style={{
            fontFamily: "var(--serif)",
            fontStyle: it === "✺" ? "normal" : "italic",
            fontSize: 64,
            color: i % 14 === 0 ? "var(--accent)" : "var(--ink)",
            letterSpacing: "-0.01em",
          }}>
            {it}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}

/* ——— Footer shown on every page ——— */
function Footer({ navigate }) {
  return (
    <footer style={{ borderTop: "1px solid var(--rule)", marginTop: 120, padding: "48px 0 32px", background: "rgba(0,0,0,0.15)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, alignItems: "start" }}>
          <div>
            <a href="#/home" style={{ fontFamily: "var(--serif)", fontSize: 28, color: "var(--ink)", textDecoration: "none" }}>
              <span style={{ fontStyle: "italic" }}>Brent</span> <span style={{ color: "var(--ink-faint)" }}>Demulder</span>
            </a>
            <p style={{ marginTop: 12, color: "var(--ink-dim)", fontSize: 14, maxWidth: 360 }}>
              Graphic designer working at the seams of film, music, and machines that think.
            </p>
          </div>
          {[
            ["Pages",   [["Home", "#/home"], ["About", "#/about"], ["Portfolio", "#/work"], ["Contact", "#/contact"]]],
            ["Elsewhere", [["LinkedIn", "#"], ["GitHub", "#"], ["Instagram", "#"], ["Letterboxd", "#"]]],
            ["Reach",  [["hi@brentdemulder.be", "mailto:hi@brentdemulder.be"], ["Ghent, BE", "#"]]],
          ].map(([title, links]) => (
            <div key={title}>
              <div className="eyebrow" style={{ marginBottom: 14 }}>{title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {links.map(([label, href]) => (
                  <a key={label} href={href} style={{
                    fontFamily: "var(--sans)", fontSize: 14, color: "var(--ink)",
                    textDecoration: "none",
                  }}>{label}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="hairline" style={{ marginTop: 48 }}></div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "20px 0 0", fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-faint)" }}>
          <span>© 2026 Brent Demulder</span>
          <span>Composed in Ghent · ◇</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  Nav, Marquee, Footer, EdCard, ThumbPlaceholder, useReveal,
  PROJECTS, FILTERS,
});
