// Direction C — "Studio Archive": split-screen. A fixed identity column on the left,
// a scrolling masonry archive on the right, and a horizontal film reel.
function CTile({ p, onOpen, i }) {
  const { idx, bind } = useHoverCycle(p.images, 800);
  const tall = p.ratio !== '16/9';
  return (
    <button className={'c-tile' + (tall ? ' tall' : '')} data-reveal onClick={onOpen} {...bind} style={{ transitionDelay: (i % 2) * 90 + 'ms' }}>
      <div className="c-tile-img">
        {p.images.map((src, k) => <img key={src} src={src} alt={k === 0 ? p.title : ''} className={k === idx ? 'on' : ''} loading="lazy" />)}
        <div className="c-tile-hover">
          <span>{p.kicker}</span>
          <b>Open ↗</b>
        </div>
      </div>
      <div className="c-tile-cap"><b>{p.title}</b><span>{p.type}</span></div>
    </button>
  );
}

function DirStudio() {
  const D = window.PORTFOLIO;
  const all = D.projects;
  const { openAt, modal } = useProjectModal(all);
  const films = all.filter((p) => p.cat === 'Film' || p.cat === 'On-Air');
  const stills = all.filter((p) => !(p.cat === 'Film' || p.cat === 'On-Air'));
  const [sec, setSec] = useState('work');
  const reel = useRef(null);
  useReveal([]);

  useEffect(() => {
    const ids = ['c-work', 'c-films', 'c-about', 'c-exp', 'c-contact'];
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) setSec(e.target.id.slice(2)); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  const scrollReel = (d) => reel.current && reel.current.scrollBy({ left: d * reel.current.clientWidth * 0.7, behavior: 'smooth' });

  const navItems = [['work', 'Design & research'], ['films', 'Film & on-air'], ['about', 'About & skills'], ['exp', 'Experience'], ['contact', 'Contact']];

  return (
    <div className="dC">
      <style>{C_CSS}</style>
      <aside className="c-side">
        <div>
          <div className="c-avatar"><img src={D.portrait} alt="Yatri Kumbhani" /></div>
          <h1 className="c-name">Yatri<br />Kumbhani</h1>
          <p className="c-role">{D.role}</p>
          <p className="c-avail"><span></span>Open to collaborations</p>
        </div>
        <nav className="c-nav">
          {navItems.map(([k, l], i) => (
            <a key={k} href={'#c-' + k} className={sec === k ? 'on' : ''}><span>{String(i + 1).padStart(2, '0')}</span>{l}</a>
          ))}
        </nav>
        <div className="c-side-foot">
          <a href={'mailto:' + D.email}>{D.email}</a>
          <a href={D.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </div>
      </aside>

      <main className="c-main">
        <section className="c-intro" data-screen-label="C · Intro">
          <p>{D.intro}</p>
          <div className="c-stats">
            {D.disciplines.map((d) => <span key={d}>{d}</span>)}
          </div>
        </section>

        <section id="c-work" className="c-sec" data-screen-label="C · Work">
          <div className="c-head"><h2>Design &amp; research</h2><span>{stills.length} projects</span></div>
          <div className="c-masonry">
            {stills.map((p, i) => <CTile key={p.id} p={p} i={i} onOpen={() => openAt(p.id)} />)}
          </div>
        </section>

        <section id="c-films" className="c-sec" data-screen-label="C · Films">
          <div className="c-head">
            <h2>Film &amp; on-air</h2>
            <div className="c-reel-ctrl">
              <button onClick={() => scrollReel(-1)} aria-label="Scroll left">←</button>
              <button onClick={() => scrollReel(1)} aria-label="Scroll right">→</button>
            </div>
          </div>
          <div className="c-reel" ref={reel}>
            {films.map((p) => (
              <button key={p.id} className="c-frame" onClick={() => openAt(p.id)}>
                <div className="c-frame-img">
                  <img src={p.cover} alt={p.title} />
                  <span className="c-frame-play">▶</span>
                </div>
                <b>{p.title}</b>
                <span>{p.kicker}</span>
              </button>
            ))}
          </div>
        </section>

        <section id="c-about" className="c-sec" data-screen-label="C · About">
          <div className="c-head"><h2>About</h2></div>
          <div className="c-about" data-reveal>
            {D.about.map((t, i) => <p key={i}>{t}</p>)}
          </div>
          <div className="c-skillgrid">
            {D.skills.map((s) => (
              <div key={s.group} className="c-skill" data-reveal>
                <h4>{s.group}</h4>
                <p>{s.items.join(' · ')}</p>
              </div>
            ))}
          </div>
          <div className="c-edu" data-reveal>
            {D.education.map((e) => <div key={e.title}><b>{e.title}</b><span>{e.note}</span></div>)}
          </div>
        </section>

        <section id="c-exp" className="c-sec" data-screen-label="C · Experience">
          <div className="c-head"><h2>Experience</h2><a href={D.resume} target="_blank" rel="noreferrer">Résumé ↗</a></div>
          {D.experience.map((x) => (
            <details key={x.org} className="c-exp" data-reveal open>
              <summary><span className="c-t">{x.time}</span><b>{x.org}</b><span className="c-r">{x.role}</span><i>+</i></summary>
              <ul>{x.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
            </details>
          ))}
        </section>

        <section id="c-contact" className="c-sec c-contact" data-screen-label="C · Contact">
          <h2>Have a project, a story or a role in mind?</h2>
          <div className="c-contact-btns">
            <a className="c-btn primary" href={'mailto:' + D.email}>Email me</a>
            <a className="c-btn" href={D.phoneHref}>{D.phone}</a>
            <a className="c-btn" href={D.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          </div>
          <p className="c-fine">© 2026 {D.name} · {D.location}</p>
        </section>
      </main>
      {modal}
    </div>
  );
}

const C_CSS = `
.dC{--bg:#f3f2ee;--fg:#1d211c;--muted:#6f726b;--soft:#e6e5df;--line:rgba(29,33,28,.13);--accent:oklch(0.48 0.09 155);--on-accent:#fff;--radius:14px;--radius-pill:999px;
  --font-display:'Bricolage Grotesque',system-ui,sans-serif;--display-weight:600;--display-track:-.03em;--font-body:'Bricolage Grotesque',system-ui,sans-serif;--font-mono:'JetBrains Mono',monospace;
  background:var(--bg);color:var(--fg);font-family:var(--font-body);min-height:100vh;display:grid;grid-template-columns:340px 1fr;transition:background .4s,color .4s}
[data-mode="dark"] .dC{--bg:#121512;--fg:#e9ebe4;--muted:#8e938b;--soft:#1c201c;--line:rgba(233,235,228,.12);--accent:oklch(0.74 0.11 155);--on-accent:#0f1310}
.dC a{color:inherit;text-decoration:none}
.c-side{position:sticky;top:0;height:100vh;display:flex;flex-direction:column;justify-content:space-between;padding:32px 28px;border-right:1px solid var(--line);box-sizing:border-box}
.c-avatar{width:72px;height:72px;border-radius:50%;overflow:hidden;margin-bottom:24px}
.c-avatar img{width:100%;height:100%;object-fit:cover}
.c-name{font-family:var(--font-display);font-weight:600;font-size:46px;line-height:.95;letter-spacing:-.035em;margin:0 0 14px}
.c-role{font-size:16px;line-height:1.45;color:var(--muted);margin:0 0 18px;max-width:24ch}
.c-avail{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:500;padding:7px 12px;border-radius:999px;background:var(--soft);margin:0}
.c-avail span{width:8px;height:8px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 4px color-mix(in oklab,var(--accent) 25%,transparent)}
.c-nav{display:flex;flex-direction:column}
.c-nav a{display:flex;gap:14px;padding:10px 0;font-size:16px;color:var(--muted);transition:color .2s,padding .3s;border-bottom:1px solid var(--line)}
.c-nav a span{font-family:var(--font-mono);font-size:11px;padding-top:4px}
.c-nav a:hover{color:var(--fg)}
.c-nav a.on{color:var(--fg);padding-left:10px;font-weight:600}
.c-nav a.on span{color:var(--accent)}
.c-side-foot{display:flex;flex-direction:column;gap:6px;font-size:14px}
.c-side-foot a:hover{color:var(--accent)}
.c-main{padding:0 clamp(20px,3.5vw,56px) 40px;min-width:0}
.c-intro{padding:72px 0 56px;border-bottom:1px solid var(--line)}
.c-intro p{font-family:var(--font-display);font-weight:500;font-size:clamp(30px,3.6vw,56px);line-height:1.06;letter-spacing:-.03em;margin:0 0 32px;max-width:22ch;text-wrap:balance;animation:cIn 1s cubic-bezier(.2,.8,.2,1) both}
@keyframes cIn{from{opacity:0;transform:translateY(24px)}}
.c-stats{display:flex;gap:8px;flex-wrap:wrap}
.c-stats span{padding:9px 16px;border-radius:999px;border:1px solid var(--line);font-size:15px}
.c-sec{padding:64px 0 24px}
.c-head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:28px;gap:16px}
.c-head h2{font-family:var(--font-display);font-weight:600;font-size:clamp(30px,3vw,44px);letter-spacing:-.03em;margin:0}
.c-head>span,.c-head>a{font-family:var(--font-mono);font-size:12px;color:var(--muted);letter-spacing:.06em}
.c-head>a:hover{color:var(--accent)}
.c-masonry{columns:2;column-gap:20px}
.c-tile{all:unset;box-sizing:border-box;display:block;width:100%;break-inside:avoid;margin-bottom:28px;cursor:pointer}
.c-tile-img{position:relative;aspect-ratio:16/11;overflow:hidden;border-radius:var(--radius);background:var(--soft)}
.c-tile.tall .c-tile-img{aspect-ratio:4/5}
.c-tile-img img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .5s,transform 1.2s cubic-bezier(.2,.8,.2,1)}
.c-tile-img img.on{opacity:1}
.c-tile:hover .c-tile-img img.on{transform:scale(1.035)}
.c-tile-hover{position:absolute;inset:auto 12px 12px 12px;display:flex;justify-content:space-between;align-items:center;gap:12px;padding:12px 14px;border-radius:10px;background:color-mix(in oklab,var(--bg) 82%,transparent);backdrop-filter:blur(10px);font-size:14px;opacity:0;transform:translateY(10px);transition:.35s cubic-bezier(.2,.8,.2,1)}
.c-tile-hover b{color:var(--accent);white-space:nowrap}
.c-tile:hover .c-tile-hover{opacity:1;transform:none}
.c-tile-cap{display:flex;justify-content:space-between;gap:12px;padding:12px 4px 0;font-size:16px}
.c-tile-cap span{color:var(--muted);font-size:14px;text-align:right}
.c-reel-ctrl{display:flex;gap:6px}
.c-reel-ctrl button{width:44px;height:44px;border-radius:50%;border:1px solid var(--line);background:transparent;color:var(--fg);cursor:pointer;font-size:16px;transition:.2s}
.c-reel-ctrl button:hover{background:var(--fg);color:var(--bg)}
.c-reel{display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:16px;scrollbar-width:thin}
.c-frame{all:unset;box-sizing:border-box;flex:0 0 min(520px,80%);scroll-snap-align:start;cursor:pointer;display:flex;flex-direction:column;gap:4px}
.c-frame-img{position:relative;aspect-ratio:16/9;border-radius:var(--radius);overflow:hidden;background:#000;margin-bottom:10px}
.c-frame-img img{width:100%;height:100%;object-fit:cover;transition:transform 1.2s cubic-bezier(.2,.8,.2,1),filter .4s;filter:saturate(.85)}
.c-frame:hover .c-frame-img img{transform:scale(1.04);filter:none}
.c-frame-play{position:absolute;left:50%;top:50%;width:64px;height:64px;margin:-32px;border-radius:50%;background:var(--bg);color:var(--fg);display:grid;place-items:center;font-size:18px;transform:scale(.8);opacity:0;transition:.35s cubic-bezier(.2,.8,.2,1)}
.c-frame:hover .c-frame-play{transform:none;opacity:1}
.c-frame b{font-size:18px}
.c-frame span{color:var(--muted);font-size:14px}
.c-about{columns:2;column-gap:32px;font-size:18px;line-height:1.6;margin-bottom:40px}
.c-about p{margin:0 0 16px;break-inside:avoid;text-wrap:pretty}
.c-skillgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
.c-skill{background:var(--soft);border-radius:var(--radius);padding:22px}
.c-skill h4{margin:0 0 8px;font-size:18px;font-weight:600}
.c-skill p{margin:0;color:var(--muted);line-height:1.6;font-size:15px}
.c-edu{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px}
.c-edu div{border:1px solid var(--line);border-radius:var(--radius);padding:20px 22px;display:flex;flex-direction:column;gap:4px}
.c-edu span{font-size:14px;color:var(--muted)}
.c-exp{border-top:1px solid var(--line)}
.c-exp:last-of-type{border-bottom:1px solid var(--line)}
.c-exp summary{list-style:none;display:grid;grid-template-columns:170px 1fr 1fr 24px;gap:16px;padding:20px 0;cursor:pointer;align-items:baseline;font-size:18px}
.c-exp summary::-webkit-details-marker{display:none}
.c-exp summary i{font-style:normal;font-size:20px;transition:transform .3s;text-align:right}
.c-exp[open] summary i{transform:rotate(45deg)}
.c-t{font-family:var(--font-mono);font-size:12px;color:var(--muted)}
.c-r{color:var(--muted);font-size:16px}
.c-exp ul{margin:0 0 20px 186px;padding-left:18px;line-height:1.7;color:var(--muted)}
.c-contact{padding:96px 0 40px}
.c-contact h2{font-family:var(--font-display);font-weight:600;font-size:clamp(40px,5vw,80px);line-height:1;letter-spacing:-.04em;margin:0 0 36px;max-width:16ch;text-wrap:balance}
.c-contact-btns{display:flex;gap:10px;flex-wrap:wrap}
.c-btn{padding:16px 24px;border-radius:999px;border:1px solid var(--line);font-size:17px;font-weight:500;transition:.25s}
.c-btn:hover{border-color:var(--fg)}
.c-btn.primary{background:var(--accent);color:var(--on-accent);border-color:var(--accent)}
.c-btn.primary:hover{background:var(--fg);border-color:var(--fg);color:var(--bg)}
.c-fine{margin-top:72px;font-size:13px;color:var(--muted)}
@media (max-width:980px){
 .dC{grid-template-columns:1fr}.c-side{position:relative;height:auto;gap:28px;border-right:0;border-bottom:1px solid var(--line)}
 .c-masonry,.c-about{columns:1}.c-skillgrid,.c-edu{grid-template-columns:1fr}
 .c-exp summary{grid-template-columns:1fr 24px}.c-t,.c-r{grid-column:1}.c-exp ul{margin-left:0}
}
`;

window.DirStudio = DirStudio;
