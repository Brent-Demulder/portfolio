/* global React, EdCard, ThumbPlaceholder, useReveal, Marquee, PROJECTS, FILTERS */
const { useState, useMemo } = React;

/* ───────────────────────── HOME ───────────────────────── */
function HomePage() {
  const titleRef = useReveal();
  const subRef = useReveal();
  const cueRef = useReveal();
  const reelRef = useReveal();
  const featured = PROJECTS.filter((p) => p.featured);

  return (
    <div className="page" style={{ paddingTop: 0 }}>
      {/* Hero */}
      <section className="vignette" style={{ position: "relative", height: "100vh", minHeight: 600, overflow: "hidden" }}>
        <div className="hero-stage" aria-hidden="true">
          <div className="hero-orb a"></div>
          <div className="hero-orb b"></div>
          <div className="hero-orb c"></div>
          <div style={{
            position: "absolute", bottom: 24, right: 32,
            fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.18em",
            textTransform: "uppercase", color: "rgba(244, 236, 216, 0.32)", zIndex: 2,
          }}>
            ◇ Spline 3D scene mounts here
          </div>
        </div>

        <div className="container" style={{
          position: "relative", height: "100%",
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          paddingBottom: 96, zIndex: 5,
        }}>
          <div ref={subRef} className="fade-up" style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
            <span className="accent-dot"></span>
            <span className="eyebrow">Portfolio · 2025 — 2026</span>
          </div>

          <h1 ref={titleRef} className="fade-up hero-title" style={{
            fontSize: "clamp(64px, 13vw, 220px)", margin: 0, transitionDelay: "120ms",
          }}>
            Brent <span style={{ fontStyle: "italic", color: "var(--accent)" }}>Demulder</span>
          </h1>

          <div ref={cueRef} className="fade-up" style={{
            display: "flex", justifyContent: "space-between", alignItems: "flex-end",
            marginTop: 32, gap: 24, flexWrap: "wrap", transitionDelay: "240ms",
          }}>
            <p style={{
              fontFamily: "var(--sans)", fontWeight: 300,
              fontSize: "clamp(15px, 1.4vw, 19px)", maxWidth: 460,
              color: "var(--ink-dim)", margin: 0, lineHeight: 1.55,
            }}>
              Graphic designer working at the seams of
              <span style={{ color: "var(--ink)" }}> film, music, and machines that think</span>.
              Currently in stage at JUNE20.
            </p>
            <div style={{
              display: "flex", gap: 12, fontFamily: "var(--mono)", fontSize: 11,
              letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-dim)",
            }}>
              <span>Design</span><span style={{ color: "var(--ink-faint)" }}>·</span>
              <span>Film</span><span style={{ color: "var(--ink-faint)" }}>·</span>
              <span>Music</span><span style={{ color: "var(--ink-faint)" }}>·</span>
              <span style={{ color: "var(--accent)" }}>AI</span>
            </div>
          </div>
        </div>

        {/* scroll cue */}
        <div style={{
          position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
          zIndex: 5, display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
          color: "var(--ink-dim)", fontFamily: "var(--mono)", fontSize: 10,
          letterSpacing: "0.22em", textTransform: "uppercase",
        }}>
          <span>Scroll</span>
          <div style={{ width: 1, height: 40, background: "var(--rule)", position: "relative", overflow: "hidden" }}>
            <div className="scroll-cue-line" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 16, background: "var(--accent)" }}></div>
          </div>
        </div>
      </section>

      <Marquee />

      {/* Featured Reel */}
      <section style={{ padding: "140px 0 100px" }}>
        <div className="container">
          <div ref={reelRef} className="fade-up" style={{
            display: "flex", justifyContent: "space-between", alignItems: "flex-end",
            marginBottom: 64, gap: 24, flexWrap: "wrap",
          }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 18 }}>
                <span className="accent-dot" style={{ marginRight: 12 }}></span>
                Featured Work · 01
              </div>
              <h2 style={{ fontSize: "clamp(40px, 6vw, 88px)", margin: 0, lineHeight: 0.95 }}>
                Four <span style={{ fontStyle: "italic", color: "var(--ink-dim)" }}>recent</span> pieces.
              </h2>
            </div>
            <a href="#/work" className="btn">
              <span>View all work</span>
              <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", textTransform: "none", letterSpacing: 0 }}>→</span>
            </a>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "48px 32px" }}>
            {featured.map((p) => <EdCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>

      {/* About teaser */}
      <AboutTeaser />

      {/* Contact teaser */}
      <ContactTeaser />
    </div>
  );
}

function AboutTeaser() {
  const ref = useReveal();
  return (
    <section style={{ padding: "100px 0 100px", background: "rgba(0,0,0,0.18)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
      <div className="container">
        <div ref={ref} className="fade-up" style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: 80, alignItems: "center" }}>
          <div style={{ position: "relative", aspectRatio: "4/5" }}>
            <ThumbPlaceholder label="Portrait — drop image" tone="sand" />
            <div style={{ position: "absolute", top: 14, left: 14, zIndex: 2 }}>
              <span className="chip">Portrait · 01</span>
            </div>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 24 }}>
              <span className="accent-dot" style={{ marginRight: 12 }}></span>
              About · 02
            </div>
            <p style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 3.4vw, 50px)", lineHeight: 1.15, margin: 0, letterSpacing: "-0.01em" }}>
              I'm a graphic designer who reads <span style={{ fontStyle: "italic", color: "var(--accent)" }}>film credits</span> for fun.
            </p>
            <p style={{ marginTop: 24, color: "var(--ink-dim)", fontSize: 17, lineHeight: 1.7, maxWidth: 540 }}>
              I treat a poster like a quiet kind of cinema. Currently studying Graduaat Digitale Vormgeving and on stage at JUNE20.
            </p>
            <div style={{ marginTop: 32, display: "flex", gap: 14 }}>
              <a href="#/about" className="btn">Read more</a>
              <a href="assets/CV/Brent Demulder - cv.pdf" download className="btn">
                <span>Download CV</span>
                <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", textTransform: "none", letterSpacing: 0 }}>↓</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactTeaser() {
  const ref = useReveal();
  return (
    <section style={{ padding: "120px 0" }}>
      <div className="container">
        <div ref={ref} className="fade-up" style={{ textAlign: "center" }}>
          <div className="eyebrow" style={{ marginBottom: 24 }}>Let's talk · 04</div>
          <h2 style={{ fontSize: "clamp(48px, 8vw, 120px)", margin: 0, lineHeight: 0.95 }}>
            Have a <span style={{ fontStyle: "italic", color: "var(--accent)" }}>project</span>?
          </h2>
          <p style={{ marginTop: 24, color: "var(--ink-dim)", fontSize: 18, maxWidth: 540, marginLeft: "auto", marginRight: "auto" }}>
            Open for collaborations, commissions, and curious conversations.
          </p>
          <div style={{ marginTop: 36, display: "inline-flex", gap: 14 }}>
            <a href="#/contact" className="btn btn-primary">Get in touch</a>
            <a href="#/work" className="btn">See the work</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── ABOUT ───────────────────────── */
function AboutPage() {
  const headerRef = useReveal();
  const portraitRef = useReveal();
  const bioRef = useReveal();
  const factsRef = useReveal();
  const stackRef = useReveal();

  return (
    <div className="page">
      <div className="container">
        {/* Header */}
        <div ref={headerRef} className="fade-up" style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "end", gap: 40, paddingBottom: 56, borderBottom: "1px solid var(--rule)" }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 20 }}>
              <span className="accent-dot" style={{ marginRight: 12 }}></span>
              About · 02
            </div>
            <h1 style={{ fontSize: "clamp(56px, 10vw, 160px)", margin: 0, lineHeight: 0.92, letterSpacing: "-0.02em" }}>
              The <span style={{ fontStyle: "italic", color: "var(--accent)" }}>designer</span><br />behind the work.
            </h1>
          </div>
          <div style={{ textAlign: "right", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-faint)" }}>
            <div>Ghent, BE</div>
            <div>EST. 2003</div>
          </div>
        </div>

        {/* Portrait + Bio */}
        <div style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: 80, paddingTop: 80 }}>
          <div ref={portraitRef} className="fade-up" style={{ position: "sticky", top: 120, alignSelf: "start" }}>
            <div style={{ position: "relative", aspectRatio: "4/5" }}>
              <ThumbPlaceholder label="Portrait — drop image" tone="sand" />
              <div style={{ position: "absolute", top: 14, left: 14 }}>
                <span className="chip">Portrait · 01</span>
              </div>
            </div>
            <div style={{ marginTop: 18, fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-faint)", display: "flex", justifyContent: "space-between" }}>
              <span>Brent · 22</span>
              <span>Belgium</span>
            </div>
          </div>

          <div ref={bioRef} className="fade-up">
            <p style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 3vw, 44px)", lineHeight: 1.2, margin: 0, letterSpacing: "-0.01em" }}>
              I'm a graphic designer who reads <span style={{ fontStyle: "italic", color: "var(--accent)" }}>film credits</span> for fun and treats a poster like a quiet kind of cinema.
            </p>

            <div style={{ marginTop: 40, display: "grid", gap: 22, fontSize: 16.5, lineHeight: 1.75, color: "var(--ink-dim)" }}>
              <p style={{ margin: 0 }}>
                I'm currently studying <em style={{ fontStyle: "italic", color: "var(--ink)" }}>Graduaat Digitale Vormgeving</em> and doing my stage at <strong style={{ fontWeight: 500, color: "var(--ink)" }}>JUNE20</strong>, where I get to push pixels for UI, motion, and social. The work I'm most drawn to lives at the seam between disciplines — type that moves, brands that score themselves, interfaces that feel like opening scenes.
              </p>
              <p style={{ margin: 0 }}>
                Off the clock I'm thinking about film grammar, building little side studios — <strong style={{ fontWeight: 500, color: "var(--ink)" }}>UPTX</strong> being the latest — and watching a lot of Letterboxd. I'm also figuring out how to make AI a real collaborator without losing the handmade. Less prompt, more pencil.
              </p>
              <p style={{ margin: 0 }}>
                I think the best design has a soundtrack. If you've ever paused a film just to read the credits, we'll probably get along.
              </p>
            </div>

            <div style={{ marginTop: 40, display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a href="assets/CV/Brent Demulder - cv.pdf" download className="btn btn-primary">
                <span>Download CV</span>
                <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", textTransform: "none", letterSpacing: 0 }}>↓</span>
              </a>
              <a href="#/contact" className="btn">Get in touch</a>
            </div>
          </div>
        </div>

        {/* Factsheet */}
        <div ref={factsRef} className="fade-up" style={{ marginTop: 120 }}>
          <div className="eyebrow" style={{ marginBottom: 24 }}>
            <span className="accent-dot" style={{ marginRight: 12 }}></span>
            Factsheet · 03
          </div>
          <div style={{ borderTop: "1px solid var(--rule)" }}>
            {[
              ["Currently",   "Stage Designer @ JUNE20"],
              ["Studying",    "Graduaat Digitale Vormgeving"],
              ["Side Studio", "UPTX — Design & Code"],
              ["Based In",    "Ghent, BE — available remote"],
              ["Languages",   "EN · NL · FR"],
              ["Open To",     "Freelance, collaborations, internships"],
            ].map(([k, v]) => (
              <div key={k} style={{
                display: "grid", gridTemplateColumns: "240px 1fr",
                padding: "22px 0", borderBottom: "1px solid var(--rule)", alignItems: "baseline",
              }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-faint)" }}>{k}</span>
                <span style={{ fontFamily: "var(--serif)", fontSize: "clamp(20px, 1.8vw, 28px)", color: "var(--ink)" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stack / disciplines */}
        <div ref={stackRef} className="fade-up" style={{ marginTop: 120 }}>
          <div className="eyebrow" style={{ marginBottom: 24 }}>
            <span className="accent-dot" style={{ marginRight: 12 }}></span>
            Stack · 04
          </div>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 56px)", margin: "0 0 32px", lineHeight: 1, letterSpacing: "-0.01em" }}>
            Tools, materials, <span style={{ fontStyle: "italic", color: "var(--ink-dim)" }}>habits.</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
            {[
              { title: "Design",   items: ["Figma", "Photoshop", "Illustrator", "InDesign"] },
              { title: "Motion",   items: ["After Effects", "Spline", "Cavalry", "Premiere"] },
              { title: "Code",     items: ["React", "Vite", "Tailwind", "TypeScript"] },
              { title: "AI",       items: ["Claude", "Midjourney", "RunwayML", "Suno"] },
              { title: "Off-screen", items: ["Letterboxd", "Film cameras", "Records", "Bookshops"] },
              { title: "In rotation", items: ["A24 reels", "i-D", "Dazed", "It's Nice That"] },
            ].map((g) => (
              <div key={g.title} style={{ padding: "20px 0", borderTop: "1px solid var(--rule)" }}>
                <div className="eyebrow" style={{ marginBottom: 12, color: "var(--accent)" }}>{g.title}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {g.items.map((i) => <span key={i} className="chip">{i}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── PORTFOLIO ───────────────────────── */
function PortfolioPage() {
  const [filter, setFilter] = useState("All");
  const headerRef = useReveal();

  const counts = useMemo(() => {
    const c = { All: PROJECTS.length };
    FILTERS.slice(1).forEach((f) => { c[f] = PROJECTS.filter((p) => p.category === f).length; });
    return c;
  }, []);

  const filtered = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <div className="page">
      <div className="container">
        {/* Header */}
        <div ref={headerRef} className="fade-up" style={{ paddingBottom: 56, borderBottom: "1px solid var(--rule)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "end", gap: 40 }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 20 }}>
                <span className="accent-dot" style={{ marginRight: 12 }}></span>
                Portfolio · 03
              </div>
              <h1 style={{ fontSize: "clamp(56px, 10vw, 160px)", margin: 0, lineHeight: 0.92, letterSpacing: "-0.02em" }}>
                Selected <span style={{ fontStyle: "italic", color: "var(--accent)" }}>work.</span>
              </h1>
            </div>
            <div style={{ textAlign: "right", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-faint)" }}>
              <div>{String(PROJECTS.length).padStart(2, "0")} projects</div>
              <div>2024 — 2026</div>
            </div>
          </div>
        </div>

        {/* Filter row */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "32px 0", borderBottom: "1px solid var(--rule)", gap: 24, flexWrap: "wrap",
        }}>
          <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
            {FILTERS.map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`filter-tab ${filter === f ? "active" : ""}`}>
                {f}<span className="count">{String(counts[f] || 0).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-faint)" }}>
            Showing {String(filtered.length).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
          </div>
        </div>

        {/* Grid — clean 2-col uniform */}
        <div style={{ padding: "64px 0 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "72px 40px" }}>
            {filtered.map((p) => <EdCard key={p.id} p={p} />)}
          </div>
        </div>

        {/* End note */}
        <div style={{ marginTop: 40, padding: "32px 0", borderTop: "1px solid var(--rule)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <p style={{ margin: 0, fontFamily: "var(--serif)", fontSize: 22, fontStyle: "italic", color: "var(--ink-dim)" }}>
            More archived work available on request.
          </p>
          <a href="#/contact" className="btn btn-primary">Request the archive</a>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── CONTACT ───────────────────────── */
function ContactPage() {
  const headerRef = useReveal();
  const emailRef = useReveal();
  const formRef = useReveal();
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", project: "Web", message: "" });
  const [sent, setSent] = useState(false);

  const copy = (e) => {
    e.preventDefault();
    navigator.clipboard?.writeText("hi@brentdemulder.be");
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="page">
      <div className="container">
        {/* Header */}
        <div ref={headerRef} className="fade-up" style={{ paddingBottom: 56, borderBottom: "1px solid var(--rule)" }}>
          <div className="eyebrow" style={{ marginBottom: 20 }}>
            <span className="accent-dot" style={{ marginRight: 12 }}></span>
            Contact · 04
          </div>
          <h1 style={{ fontSize: "clamp(56px, 10vw, 160px)", margin: 0, lineHeight: 0.92, letterSpacing: "-0.02em" }}>
            Let's make something <span style={{ fontStyle: "italic", color: "var(--accent)" }}>worth watching.</span>
          </h1>
        </div>

        {/* Big email */}
        <div ref={emailRef} className="fade-up" style={{ padding: "80px 0", textAlign: "center", borderBottom: "1px solid var(--rule)" }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-faint)", margin: "0 0 24px" }}>
            The shortest route ↓
          </p>
          <a href="mailto:hi@brentdemulder.be" onClick={copy} className="contact-email">
            hi<span style={{ color: "var(--accent)" }}>@</span>brentdemulder.be
          </a>
          <div style={{ marginTop: 18, height: 18, fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: copied ? "var(--accent)" : "var(--ink-faint)" }}>
            {copied ? "Copied to clipboard ✓" : "Click to copy"}
          </div>
        </div>

        {/* Form + Sidebar */}
        <div style={{ padding: "80px 0" }}>
          <div style={{ display: "grid", gridTemplateColumns: "7fr 5fr", gap: 80, alignItems: "start" }}>
            <form ref={formRef} className="fade-up" onSubmit={submit}>
              <div className="eyebrow" style={{ marginBottom: 24 }}>Or — start a brief</div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
                <Field label="Your name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Jane Doe" />
                <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="jane@studio.com" />
              </div>

              <div style={{ marginBottom: 24 }}>
                <Label>Project type</Label>
                <div style={{ display: "flex", gap: 0, marginTop: 8, border: "1px solid var(--rule)" }}>
                  {["Web", "Brand", "Motion", "AI", "Other"].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setForm({ ...form, project: p })}
                      style={{
                        flex: 1,
                        padding: "14px 12px",
                        background: form.project === p ? "var(--accent)" : "transparent",
                        color: form.project === p ? "var(--bg)" : "var(--ink-dim)",
                        border: "none",
                        borderRight: "1px solid var(--rule)",
                        fontFamily: "var(--mono)",
                        fontSize: 11,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        transition: "all 200ms ease",
                      }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 32 }}>
                <Label>Tell me about it</Label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={6}
                  placeholder="Project, timeline, budget, references — anything that helps."
                  style={{
                    width: "100%",
                    marginTop: 8,
                    padding: 16,
                    background: "rgba(0,0,0,0.18)",
                    border: "1px solid var(--rule)",
                    borderRadius: 0,
                    color: "var(--ink)",
                    fontFamily: "var(--sans)",
                    fontSize: 15,
                    resize: "vertical",
                    outline: "none",
                    transition: "border-color 200ms ease",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--rule)")}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
                <button type="submit" className="btn btn-primary" style={{ padding: "16px 32px" }}>
                  {sent ? "Sent ✓ Thanks." : "Send brief →"}
                </button>
                <span style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-faint)" }}>
                  Typical reply · within 48h
                </span>
              </div>
            </form>

            {/* Sidebar */}
            <aside style={{ position: "sticky", top: 120 }}>
              <div className="eyebrow" style={{ marginBottom: 24 }}>Other channels</div>
              <div style={{ borderTop: "1px solid var(--rule)" }}>
                {[
                  ["LinkedIn",    "/in/brentdemulder"],
                  ["GitHub",      "@brentdemulder"],
                  ["Instagram",   "@brent.demulder"],
                  ["Letterboxd",  "@brentd"],
                ].map(([label, handle]) => (
                  <a
                    key={label}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr auto",
                      padding: "20px 0",
                      borderBottom: "1px solid var(--rule)",
                      alignItems: "center",
                      textDecoration: "none",
                      color: "var(--ink)",
                      transition: "color 200ms ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink)")}
                  >
                    <span style={{ fontFamily: "var(--serif)", fontSize: 22 }}>{label}</span>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.15em", color: "var(--ink-faint)" }}>{handle} ↗</span>
                  </a>
                ))}
              </div>

              <div style={{ marginTop: 48, padding: 24, border: "1px solid var(--rule)", background: "rgba(0,0,0,0.18)" }}>
                <div className="eyebrow" style={{ marginBottom: 12, color: "var(--accent)" }}>Studio Hours</div>
                <p style={{ margin: 0, fontFamily: "var(--serif)", fontSize: 20, lineHeight: 1.4 }}>
                  Mon — Fri · 11:00 — 22:00 CET
                </p>
                <p style={{ margin: "10px 0 0", fontSize: 13, color: "var(--ink-dim)" }}>
                  Ghent, Belgium. Weekends reserved for films and field recordings.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label({ children }) {
  return (
    <span style={{ display: "block", fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-faint)" }}>
      {children}
    </span>
  );
}

function Field({ label, value, onChange, type = "text", placeholder }) {
  return (
    <label style={{ display: "block" }}>
      <Label>{label}</Label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          marginTop: 8,
          padding: "14px 16px",
          background: "rgba(0,0,0,0.18)",
          border: "1px solid var(--rule)",
          color: "var(--ink)",
          fontFamily: "var(--sans)",
          fontSize: 15,
          outline: "none",
          borderRadius: 0,
          transition: "border-color 200ms ease",
        }}
        onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
        onBlur={(e) => (e.target.style.borderColor = "var(--rule)")}
      />
    </label>
  );
}

Object.assign(window, { HomePage, AboutPage, PortfolioPage, ContactPage });
