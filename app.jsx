/* global React, ReactDOM, Nav, Footer, HomePage, AboutPage, PortfolioPage, ContactPage, TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakColor, TweakSlider, TweakToggle */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#c8862a",
  "typePair": "instrument-grotesk",
  "depth": "noir",
  "wash": 0.6,
  "grain": 0.09
}/*EDITMODE-END*/;

const ACCENT_MAP = {
  "#c8862a": { fg: "oklch(0.72 0.14 60)",  hueA: 60,  hueB: 45,  hueC: 75  }, // amber gold
  "#e8a040": { fg: "oklch(0.78 0.16 72)",  hueA: 72,  hueB: 55,  hueC: 88  }, // warm gold
  "#b53049": { fg: "oklch(0.65 0.19 18)",  hueA: 18,  hueB: 8,   hueC: 28  }, // crimson red
  "#7a3aa8": { fg: "oklch(0.62 0.18 310)", hueA: 310, hueB: 290, hueC: 330 }, // royal purple
};

const TYPE_PAIRS = {
  "instrument-grotesk": {
    serif: `"Instrument Serif", "Cormorant Garamond", serif`,
    sans:  `"Space Grotesk", "DM Sans", system-ui, sans-serif`,
  },
  "cormorant-dm": {
    serif: `"Cormorant Garamond", "Instrument Serif", serif`,
    sans:  `"DM Sans", "Space Grotesk", system-ui, sans-serif`,
  },
};

const DEPTH_PRESETS = {
  noir:      { bg: "#0e0c0a", bg2: "#161310", bg3: "#1e1a16", rule: "#2a2420", ruleSoft: "#1e1a16", inkFaint: "#6a5e50", heroBase: "#0e0c0a", heroTop: "#181410" },
  cinema:    { bg: "#1a1410", bg2: "#241d17", bg3: "#322820", rule: "#3a342c", ruleSoft: "#2e2820", inkFaint: "#7a7160", heroBase: "#1a1410", heroTop: "#221a13" },
  editorial: { bg: "#2b211a", bg2: "#3a2d22", bg3: "#4a3a2c", rule: "#5a4a3a", ruleSoft: "#4a3a2c", inkFaint: "#948770", heroBase: "#2b211a", heroTop: "#3a2d22" },
};

function useRoute() {
  const valid = ["#/home", "#/about", "#/work", "#/contact"];
  const norm = (h) => valid.includes(h) ? h : "#/home";
  const [route, setRoute] = React.useState(norm(window.location.hash));
  React.useEffect(() => {
    if (!valid.includes(window.location.hash)) {
      window.history.replaceState(null, "", "#/home");
    }
    const onHash = () => {
      setRoute(norm(window.location.hash));
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route;
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const route = useRoute();

  React.useEffect(() => {
    const r = document.documentElement.style;
    const a = ACCENT_MAP[t.accent] || ACCENT_MAP["#b53049"];
    r.setProperty("--accent", a.fg);
    r.setProperty("--hero-hue-a", String(a.hueA));
    r.setProperty("--hero-hue-b", String(a.hueB));
    r.setProperty("--hero-hue-c", String(a.hueC));

    const pair = TYPE_PAIRS[t.typePair] || TYPE_PAIRS["instrument-grotesk"];
    r.setProperty("--serif", pair.serif);
    r.setProperty("--sans", pair.sans);

    r.setProperty("--grain-opacity", String(t.grain));
    r.setProperty("--color-wash", String(t.wash));

    const d = DEPTH_PRESETS[t.depth] || DEPTH_PRESETS.editorial;
    r.setProperty("--bg", d.bg);
    r.setProperty("--bg-2", d.bg2);
    r.setProperty("--bg-3", d.bg3);
    r.setProperty("--rule", d.rule);
    r.setProperty("--rule-soft", d.ruleSoft);
    r.setProperty("--ink-faint", d.inkFaint);
    r.setProperty("--hero-base", d.heroBase);
    r.setProperty("--hero-top", d.heroTop);
  }, [t]);

  // Page component keyed so each route remount triggers the entry transition
  let Page = HomePage;
  if (route === "#/about")   Page = AboutPage;
  if (route === "#/work")    Page = PortfolioPage;
  if (route === "#/contact") Page = ContactPage;

  return (
    <React.Fragment>
      <Nav route={route} />
      <main key={route}>
        <Page />
      </main>
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Accent">
          <TweakColor
            label="Color"
            value={t.accent}
            options={["#c8862a", "#e8a040", "#b53049", "#7a3aa8"]}
            onChange={(v) => setTweak("accent", v)}
          />
        </TweakSection>

        <TweakSection label="Typography">
          <TweakRadio
            label="Pairing"
            value={t.typePair}
            options={[
              { value: "instrument-grotesk", label: "Instrument" },
              { value: "cormorant-dm", label: "Cormorant" },
            ]}
            onChange={(v) => setTweak("typePair", v)}
          />
        </TweakSection>

        <TweakSection label="Mood">
          <TweakRadio
            label="Depth"
            value={t.depth}
            options={[
              { value: "noir", label: "Noir" },
              { value: "cinema", label: "Cinema" },
              { value: "editorial", label: "Editorial" },
            ]}
            onChange={(v) => setTweak("depth", v)}
          />
          <TweakSlider
            label="Color wash"
            value={t.wash}
            min={0}
            max={2}
            step={0.05}
            onChange={(v) => setTweak("wash", v)}
          />
          <TweakSlider
            label="Film grain"
            value={t.grain}
            min={0}
            max={0.2}
            step={0.005}
            onChange={(v) => setTweak("grain", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
