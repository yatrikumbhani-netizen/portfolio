// Direction B — "Broadcast": newsroom energy. Condensed type, live ticker, signal red.
// Plays to her anchoring / input-desk background. Filterable work grid with hover image cycling.
function BCard({ p, i, onOpen }) {
  const { idx, bind } = useHoverCycle(p.images, 750);
  return (
    <button className={'b-card b-span-' + (p.ratio === '16/9' ? 'w' : 't')} data-reveal onClick={onOpen} {...bind}>
      <div className="b-card-img">
        {p.images.map((src, k) => (
          <img key={src} src={src} alt={k === 0 ? p.title : ''} className={k === idx ? 'on' : ''} loading="lazy" />
        ))}
        {p.video && <span className="b-play">▶ Film</span>}
        {p.images.length > 1 && (
          <span className="b-dots">{p.images.map((_, k) => <i key={k} className={k === idx ? 'on' : ''}></i>)}</span>
        )}
      </div>
      <div className="b-card-meta">
        <span className="b-num">{String(i + 1).padStart(2, '0')}</span>
        <div>
          <h3>{p.title}</h3>
          <span>{p.type}</span>
        </div>
        <span className="b-cat">{p.cat}</span>
      </div>
    </button>
  );
}

function DirBroadcast() {
  const D = window.PORTFOLIO;
  const [filter, setFilter] = useState('All');
  const list = filter === 'All' ? D.projects : D.projects.filter((p) => p.cat === filter);
  const { openAt, modal } = useProjectModal(list);
  useReveal([filter]);
  const cats = ['All', 'Design', 'Film', 'On-Air', 'Research'];
  const ticker = ['Visual design', 'Film & edit', 'News anchoring', 'CSR research', 'Brand identity', 'Editorial layout', 'Scriptwriting', 'Event media'];
  const [clock, setClock] = useState('');
  useEffect(() => {
    const t = () => setClock(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata', hour12: false }));
    t(); const id = setInterval(t, 15000); return () => clearInterval(id);
  }, []);

  return (
    <div className="dB">
      <style>{B_CSS}</style>
      <header className="b-nav">
        <a href="#b-top" className="b-logo"><span className="b-live">●</span> YK<span>/NEWSROOM</span></a>
        <nav><a href="#b-work">Work</a><a href="#b-about">About</a><a href="#b-exp">Experience</a><a href="#b-contact" className="b-cta">Contact</a></nav>
      </header>

      <section id="b-top" className="b-hero" data-screen-label="B · Hero">
        <div className="b-hero-top">
          <span className="b-tag"><span className="b-blink"></span> On air</span>
          <span>AHMEDABAD · IST {clock}</span>
        </div>
        <h1 className="b-name">
          <span>Yatri</span>
          <span className="b-outline">Kumbhani</span>
        </h1>
        <div className="b-hero-grid">
          <p className="b-lede">{D.intro}</p>
          <div className="b-portrait">
            <img src={D.portrait} alt="Yatri Kumbhani" />
            <div className="b-lower-third">
              <b>YATRI KUMBHANI</b>
              <span>Media researcher · Visual designer</span>
            </div>
          </div>
        </div>
      </section>

      <div className="b-ticker" aria-hidden="true">
        <div className="b-ticker-label"></div>
        <div className="b-ticker-track">
          {[0, 1].map((k) => (
            <div key={k} className="b-ticker-run">
              {ticker.map((t) => <span key={t}>{t}<i>◆</i></span>)}
            </div>
          ))}
        </div>
      </div>

      <section id="b-work" className="b-sec" data-screen-label="B · Work">
        <div className="b-sec-head">
          <h2>Selected work <sup>{list.length}</sup></h2>
          <div className="b-filters">
            {cats.map((c) => (
              <button key={c} className={c === filter ? 'on' : ''} onClick={() => setFilter(c)}>{c}</button>
            ))}
          </div>
        </div>
        <div className="b-grid" key={filter}>
          {list.map((p, i) => <BCard key={p.id} p={p} i={i} onOpen={() => openAt(p.id)} />)}
        </div>
      </section>

      <section id="b-about" className="b-sec b-about" data-screen-label="B · About">
        <div className="b-about-l" data-reveal>
          <span className="b-label">About</span>
          <h2>Research first.<br />Then the <em>story.</em></h2>
        </div>
        <div className="b-about-r" data-reveal>
          {D.about.map((t, i) => <p key={i}>{t}</p>)}
          <div className="b-edu">
            {D.education.map((e) => <div key={e.title}><b>{e.title}</b><span>{e.note}</span></div>)}
          </div>
        </div>
      </section>

      <section className="b-sec" data-screen-label="B · Skills">
        <span className="b-label">Skills &amp; tools</span>
        <div className="b-skills">
          {D.skills.map((s, i) => (
            <div key={s.group} className="b-skill" data-reveal style={{ transitionDelay: i * 80 + 'ms' }}>
              <h4><span>0{i + 1}</span>{s.group}</h4>
              <div className="b-chips">{s.items.map((it) => <span key={it}>{it}</span>)}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="b-exp" className="b-sec" data-screen-label="B · Experience">
        <div className="b-sec-head">
          <h2>Experience</h2>
          <a href={D.resume} target="_blank" rel="noreferrer" className="b-resume">Résumé ↗</a>
        </div>
        <div className="b-timeline">
          {D.experience.map((x) => (
            <div key={x.org} className="b-exp" data-reveal>
              <span className="b-time">{x.time}</span>
              <h3>{x.org}</h3>
              <p className="b-role">{x.role}</p>
              <ul>{x.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      <footer id="b-contact" className="b-contact" data-screen-label="B · Contact">
        <span className="b-label">Got a story? Let's talk.</span>
        <a className="b-big" href={'mailto:' + D.email}>Say hello <span>→</span></a>
        <div className="b-contact-grid">
          <a href={'mailto:' + D.email}><small>Email</small>{D.email}</a>
          <a href={D.phoneHref}><small>Phone</small>{D.phone}</a>
          <a href={D.linkedin} target="_blank" rel="noreferrer"><small>LinkedIn</small>yatri-kumbhani ↗</a>
          <div><small>Based in</small>{D.location}</div>
        </div>
      </footer>
      {modal}
    </div>
  );
}

const B_CSS = `
.dB{--bg:#0e0e10;--fg:#f2f0ec;--muted:#8d8a86;--soft:#1a1a1d;--line:rgba(242,240,236,.14);--accent:oklch(0.63 0.22 27);--on-accent:#fff;
  --font-display:'Archivo',system-ui,sans-serif;--display-weight:800;--display-track:-.02em;--font-body:'Archivo',system-ui,sans-serif;--font-mono:'JetBrains Mono',monospace;
  background:var(--bg);color:var(--fg);font-family:var(--font-body);min-height:100vh;transition:background .4s,color .4s}
[data-mode="light"] .dB{--bg:#efede8;--fg:#121214;--muted:#6b6862;--soft:#e2dfd8;--line:rgba(18,18,20,.14)}
.dB a{color:inherit;text-decoration:none}
.b-nav{position:sticky;top:0;z-index:50;display:flex;justify-content:space-between;align-items:center;padding:14px clamp(16px,3vw,40px);background:var(--bg);border-bottom:1px solid var(--line)}
.b-logo{font-family:var(--font-mono);font-weight:700;font-size:14px;letter-spacing:.06em}
.b-logo span:last-child{color:var(--muted)}
.b-live{color:var(--accent)}
.b-nav nav{display:flex;gap:6px;font-size:14px;font-weight:600}
.b-nav nav a{padding:9px 14px;border-radius:999px;transition:background .2s}
.b-nav nav a:hover{background:var(--soft)}
.b-nav .b-cta{background:var(--accent);color:#fff}.b-nav .b-cta:hover{background:var(--fg);color:var(--bg)}
.b-hero{padding:28px clamp(16px,3vw,40px) 56px}
.b-hero-top{display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:12px;letter-spacing:.12em;color:var(--muted)}
.b-tag{display:inline-flex;align-items:center;gap:8px;color:var(--accent);font-weight:700;text-transform:uppercase}
.b-blink{width:9px;height:9px;border-radius:50%;background:var(--accent);animation:bBlink 1.4s infinite}
@keyframes bBlink{50%{opacity:.2}}
.b-name{font-family:var(--font-display);font-weight:900;font-stretch:75%;text-transform:uppercase;font-size:clamp(80px,15.5vw,270px);line-height:.82;letter-spacing:-.02em;margin:24px 0 32px;display:flex;flex-direction:column}
.b-name span{animation:bSlide 1s cubic-bezier(.2,.8,.2,1) both}
.b-name span:nth-child(2){animation-delay:.1s}
@keyframes bSlide{from{transform:translateX(-6%);opacity:0;clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
.b-outline{color:transparent;-webkit-text-stroke:2px var(--fg)}
.b-hero-grid{display:grid;grid-template-columns:1fr 420px;gap:40px;align-items:end}
.b-lede{font-size:clamp(22px,2.2vw,32px);line-height:1.3;font-weight:500;max-width:30ch;margin:0;text-wrap:pretty}
.b-portrait{position:relative;aspect-ratio:4/3;overflow:hidden;background:var(--soft)}
.b-portrait img{width:100%;height:100%;object-fit:cover;object-position:50% 25%}
.b-lower-third{position:absolute;left:0;bottom:18px;display:flex;flex-direction:column;animation:bL3 .8s .6s cubic-bezier(.2,.8,.2,1) both}
.b-lower-third b{background:var(--accent);color:#fff;padding:7px 14px;font-size:15px;letter-spacing:.04em}
.b-lower-third span{background:#fff;color:#111;padding:5px 14px;font-size:13px;font-weight:600;align-self:flex-start}
@keyframes bL3{from{transform:translateX(-100%)}}
.b-ticker{display:flex;background:var(--accent);color:#fff;overflow:hidden;font-weight:700;text-transform:uppercase;font-size:15px;letter-spacing:.04em}
.b-ticker-label{background:#fff;color:#111;padding:12px 18px;flex:none;z-index:1}
.b-ticker-track{display:flex;animation:bTick 30s linear infinite;white-space:nowrap}
.b-ticker-run{display:flex;flex:none}
.b-ticker-run span{padding:12px 0 12px 24px}
.b-ticker-run i{font-style:normal;padding-left:24px;opacity:.6}
@keyframes bTick{to{transform:translateX(-50%)}}
.b-sec{padding:80px clamp(16px,3vw,40px)}
.b-sec-head{display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:20px;margin-bottom:36px}
.b-sec-head h2,.b-about h2{font-family:var(--font-display);font-weight:800;font-stretch:80%;text-transform:uppercase;font-size:clamp(48px,6vw,96px);line-height:.9;margin:0;letter-spacing:-.01em}
.b-sec-head sup{font-family:var(--font-mono);font-size:14px;color:var(--accent);vertical-align:top;font-weight:500}
.b-filters{display:flex;gap:6px;flex-wrap:wrap}
.b-filters button{font:600 14px var(--font-body);padding:10px 16px;border-radius:999px;border:1px solid var(--line);background:transparent;color:var(--fg);cursor:pointer;transition:.2s}
.b-filters button:hover{border-color:var(--fg)}
.b-filters button.on{background:var(--fg);color:var(--bg);border-color:var(--fg)}
.b-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:16px;grid-auto-flow:dense}
.b-card{all:unset;box-sizing:border-box;cursor:pointer;display:flex;flex-direction:column;gap:12px}
.b-span-w{grid-column:span 3}.b-span-t{grid-column:span 2}
.b-card-img{position:relative;overflow:hidden;background:var(--soft);aspect-ratio:4/3}
.b-span-t .b-card-img{aspect-ratio:3/4}
.b-span-w .b-card-img{aspect-ratio:auto;height:calc(100% - 0px);min-height:280px}
.b-card-img img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transform:scale(1.04);transition:opacity .5s,transform 1.2s cubic-bezier(.2,.8,.2,1)}
.b-card-img img.on{opacity:1;transform:scale(1)}
.b-card:hover .b-card-img img.on{transform:scale(1.03)}
.b-play{position:absolute;top:12px;left:12px;background:var(--accent);color:#fff;font:700 12px var(--font-mono);padding:6px 10px;letter-spacing:.06em}
.b-dots{position:absolute;bottom:12px;right:12px;display:flex;gap:4px;opacity:0;transition:opacity .3s}
.b-card:hover .b-dots{opacity:1}
.b-dots i{width:18px;height:3px;background:rgba(255,255,255,.45)}
.b-dots i.on{background:#fff}
.b-card-meta{display:grid;grid-template-columns:32px 1fr auto;gap:10px;align-items:start;border-top:1px solid var(--line);padding-top:12px}
.b-num{font-family:var(--font-mono);font-size:12px;color:var(--muted);padding-top:4px}
.b-card-meta h3{font-size:20px;font-weight:700;margin:0 0 2px;line-height:1.15;transition:color .2s}
.b-card:hover h3{color:var(--accent)}
.b-card-meta span{font-size:14px;color:var(--muted)}
.b-cat{font-family:var(--font-mono);font-size:11px !important;text-transform:uppercase;letter-spacing:.1em;border:1px solid var(--line);padding:4px 8px;border-radius:999px}
.b-about{display:grid;grid-template-columns:1fr 1fr;gap:48px;border-top:1px solid var(--line)}
.b-about em{font-style:normal;color:var(--accent)}
.b-label{display:block;font-family:var(--font-mono);font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);margin-bottom:18px}
.b-about-r p{font-size:19px;line-height:1.6;margin:0 0 18px;text-wrap:pretty}
.b-edu{margin-top:28px;display:grid;gap:10px}
.b-edu div{background:var(--soft);padding:16px 18px;display:flex;flex-direction:column;gap:4px}
.b-edu span{font-size:14px;color:var(--muted)}
.b-skills{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.b-skill{background:var(--soft);padding:22px;min-height:220px}
.b-skill h4{font-size:22px;font-weight:800;text-transform:uppercase;margin:0 0 18px;display:flex;gap:10px;align-items:baseline}
.b-skill h4 span{font-family:var(--font-mono);font-size:12px;color:var(--accent);font-weight:500}
.b-chips{display:flex;flex-wrap:wrap;gap:6px}
.b-chips span{font-size:14px;padding:6px 11px;border:1px solid var(--line);border-radius:999px;transition:.2s}
.b-chips span:hover{background:var(--accent);border-color:var(--accent);color:#fff}
.b-resume{font-weight:700;padding:12px 18px;border:1px solid var(--fg);border-radius:999px}
.b-resume:hover{background:var(--fg);color:var(--bg)}
.b-timeline{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.b-exp{border-top:3px solid var(--accent);padding-top:18px}
.b-time{font-family:var(--font-mono);font-size:13px;color:var(--muted)}
.b-exp h3{font-size:26px;font-weight:800;margin:10px 0 4px;line-height:1.1}
.b-role{margin:0 0 14px;color:var(--muted);font-weight:600}
.b-exp ul{margin:0;padding-left:18px;line-height:1.65;font-size:15px}
.b-contact{background:var(--accent);color:#fff;padding:80px clamp(16px,3vw,40px) 48px}
.b-contact .b-label{color:#fff;opacity:.8}
.b-big{display:flex;align-items:center;gap:.2em;font-family:var(--font-display);font-weight:900;font-stretch:75%;text-transform:uppercase;font-size:clamp(72px,14vw,240px);line-height:.85;margin-bottom:56px}
.b-big span{transition:transform .4s cubic-bezier(.2,.8,.2,1)}
.b-big:hover span{transform:translateX(.25em)}
.b-contact-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;border-top:1px solid rgba(255,255,255,.4);padding-top:20px;font-size:17px;font-weight:600}
.b-contact-grid small{display:block;font:500 11px var(--font-mono);letter-spacing:.14em;text-transform:uppercase;opacity:.7;margin-bottom:6px}
.b-contact-grid a:hover{text-decoration:underline}
@media (max-width:900px){
 .b-hero-grid,.b-about{grid-template-columns:1fr}.b-grid{grid-template-columns:1fr 1fr}.b-span-w{grid-column:span 2}.b-span-t{grid-column:span 1}
 .b-skills,.b-timeline,.b-contact-grid{grid-template-columns:1fr 1fr}.b-nav nav a:not(.b-cta){display:none}
}
`;

window.DirBroadcast = DirBroadcast;
