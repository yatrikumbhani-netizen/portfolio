// Direction A — "Editorial": warm paper, serif display, magazine rhythm.
// Continues the look of Yatri's existing resume (cream + deep brown + condensed serif).
function DirEditorial() {
  const D = window.PORTFOLIO;
  const { openAt, modal } = useProjectModal(D.projects);
  const [hover, setHover] = useState(null);
  const prev = useRef(null);
  useReveal([]);

  useEffect(() => {
    const m = (e) => {
      if (prev.current) prev.current.style.transform = `translate(${e.clientX + 24}px, ${e.clientY - 120}px)`;
    };
    window.addEventListener('mousemove', m);
    return () => window.removeEventListener('mousemove', m);
  }, []);

  const featured = ['nova-brew', 'vigor', 'purna'].map((id) => D.projects.find((p) => p.id === id));

  return (
    <div className="dA">
      <style>{A_CSS}</style>
      <header className="a-nav">
        <a href="#top" className="a-mark">Y<i>K</i></a>
        <nav>
          <a href="#work">Work</a><a href="#about">About</a><a href="#experience">Experience</a><a href="#contact">Contact</a>
        </nav>
      </header>

      <section id="top" className="a-hero" data-screen-label="A · Hero">
        <div className="a-rule"><span>Portfolio</span><span>{D.location}</span><span>Vol. 2026</span></div>
        <h1 className="a-name">
          <span className="a-line" style={{ '--d': '0s' }}>{D.first}</span>{' '}
          <span className="a-line it" style={{ '--d': '.12s' }}>{D.last}</span>
        </h1>
        <div className="a-rule thin"></div>
        <div className="a-hero-grid">
          <img className="a-portrait" src={D.portrait} alt="Portrait of Yatri Kumbhani" />
          <p className="a-intro">{D.intro}</p>
          <ul className="a-disc">
            {D.disciplines.map((d, i) => <li key={d}><span>0{i + 1}</span>{d}</li>)}
          </ul>
        </div>
      </section>

      <section id="work" className="a-sec" data-screen-label="A · Featured">
        <div className="a-sec-head" data-reveal>
          <h2>Selected <i>work</i></h2>
          <span className="a-meta">Featured — 03</span>
        </div>
        {featured.map((p, i) => (
          <article key={p.id} className={'a-feature' + (i % 2 ? ' flip' : '')} data-reveal onClick={() => openAt(p.id)}>
            <div className="a-feature-img"><img src={p.cover} alt={p.title} /></div>
            <div className="a-feature-txt">
              <span className="a-meta">{String(i + 1).padStart(2, '0')} — {p.type}</span>
              <h3>{p.title}</h3>
              <p className="a-kick">{p.kicker}</p>
              <p>{p.summary}</p>
              <span className="a-more">Read the project →</span>
            </div>
          </article>
        ))}
      </section>

      <section className="a-sec" data-screen-label="A · Index">
        <div className="a-sec-head" data-reveal>
          <h2>The <i>index</i></h2>
          <span className="a-meta">All projects — {D.projects.length}</span>
        </div>
        <div className="a-index" onMouseLeave={() => setHover(null)}>
          {D.projects.map((p, i) => (
            <button key={p.id} className="a-row" data-reveal onMouseEnter={() => setHover(p)} onClick={() => openAt(p.id)}>
              <span className="a-n">{String(i + 1).padStart(2, '0')}</span>
              <span className="a-t">{p.title}</span>
              <span className="a-k">{p.type}</span>
              <span className="a-c">{p.cat}</span>
              <span className="a-arrow">↗</span>
            </button>
          ))}
        </div>
        <div className={'a-preview' + (hover ? ' on' : '')} ref={prev}>
          {hover && <img key={hover.id} src={hover.cover} alt="" />}
        </div>
      </section>

      <section id="about" className="a-sec a-about" data-screen-label="A · About">
        <div className="a-sec-head" data-reveal>
          <h2>About <i>me</i></h2>
          <span className="a-meta">Researcher · Designer · Storyteller</span>
        </div>
        <div className="a-about-grid">
          <figure data-reveal><img src={D.portrait} alt="Yatri Kumbhani" /><figcaption>Yatri, Ahmedabad</figcaption></figure>
          <div data-reveal>
            <p className="a-pull">“I'm drawn to stories that are socially conscious, and to the craft that makes people stop and read them.”</p>
            {D.about.map((t, i) => <p key={i} className="a-body">{t}</p>)}
            <div className="a-edu">
              {D.education.map((e) => (
                <div key={e.title}><b>{e.title}</b><span>{e.note}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="a-sec" data-screen-label="A · Skills">
        <div className="a-sec-head" data-reveal>
          <h2>Skills <i>&amp; tools</i></h2>
        </div>
        <div className="a-skills">
          {D.skills.map((s) => (
            <div key={s.group} data-reveal>
              <h4>{s.group}</h4>
              <ul>{s.items.map((it) => <li key={it}>{it}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      <section id="experience" className="a-sec" data-screen-label="A · Experience">
        <div className="a-sec-head" data-reveal>
          <h2><i>Experience</i></h2>
          <a className="a-meta a-link" href={D.resume} target="_blank" rel="noreferrer">Download résumé ↗</a>
        </div>
        {D.experience.map((x) => (
          <div key={x.org} className="a-exp" data-reveal>
            <span className="a-time">{x.time}</span>
            <div><h3>{x.org}</h3><p className="a-kick">{x.role}</p></div>
            <ul>{x.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
          </div>
        ))}
      </section>

      <footer id="contact" className="a-contact" data-screen-label="A · Contact">
        <span className="a-meta">Let's work together</span>
        <a className="a-mail" href={'mailto:' + D.email}>{D.email.split('@')[0]}<i>@gmail.com</i></a>
        <div className="a-contact-row">
          <a href={D.phoneHref}>{D.phone}</a>
          <a href={D.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <span>{D.location}</span>
          <span>© 2026 {D.name}</span>
        </div>
      </footer>
      {modal}
    </div>
  );
}

const A_CSS = `
.dA{--bg:#f6f0e2;--fg:#2e1f17;--muted:#7d6a5c;--soft:#ece3d0;--line:rgba(46,31,23,.2);--accent:oklch(0.52 0.12 40);--on-accent:#fff;
  --font-display:'Instrument Serif',Georgia,serif;--font-body:'Hanken Grotesk',system-ui,sans-serif;--font-mono:'JetBrains Mono',monospace;
  background:var(--bg);color:var(--fg);font-family:var(--font-body);min-height:100vh;transition:background .4s,color .4s}
[data-mode="dark"] .dA{--bg:#18120e;--fg:#f1e7d6;--muted:#a8978a;--soft:#241b15;--line:rgba(241,231,214,.16);--accent:oklch(0.74 0.11 55);--on-accent:#18120e}
.dA a{color:inherit}
.dA i{font-style:italic}
.a-nav{position:sticky;top:0;z-index:50;display:flex;justify-content:space-between;align-items:center;padding:18px clamp(20px,4vw,56px);background:color-mix(in oklab,var(--bg) 88%,transparent);backdrop-filter:blur(8px)}
.a-mark{font-family:var(--font-display);font-size:30px;text-decoration:none;line-height:1}
.a-nav nav{display:flex;gap:28px;font-size:15px}
.a-nav nav a{text-decoration:none;position:relative}
.a-nav nav a::after{content:'';position:absolute;left:0;right:100%;bottom:-3px;height:1px;background:currentColor;transition:right .3s}
.a-nav nav a:hover::after{right:0}
.a-hero{padding:2vh clamp(20px,4vw,56px) 80px}
.a-rule{display:flex;justify-content:space-between;border-top:1px solid var(--fg);border-bottom:1px solid var(--fg);padding:10px 0;font-family:var(--font-mono);font-size:12px;letter-spacing:.14em;text-transform:uppercase}
.a-rule.thin{border-bottom:0;padding:0}
.a-name{font-family:var(--font-display);font-weight:400;font-size:clamp(84px,17.5vw,300px);line-height:.88;letter-spacing:-.035em;margin:3vh 0 3vh;white-space:nowrap;overflow:hidden}
.a-line{display:inline-block;animation:aRise 1.1s cubic-bezier(.2,.8,.2,1) both;animation-delay:var(--d)}
@keyframes aRise{from{transform:translateY(60%);opacity:0}}
.a-hero-grid{display:grid;grid-template-columns:180px 1fr 260px;gap:clamp(24px,4vw,64px);padding-top:28px;align-items:start}
.a-portrait{width:180px;aspect-ratio:4/5;object-fit:cover;filter:sepia(.15)}
.a-intro{font-family:var(--font-display);font-size:clamp(26px,2.6vw,40px);line-height:1.15;margin:0;text-wrap:pretty}
.a-disc{list-style:none;margin:0;padding:0;border-top:1px solid var(--line)}
.a-disc li{display:flex;gap:16px;padding:12px 0;border-bottom:1px solid var(--line);font-size:17px}
.a-disc span{font-family:var(--font-mono);font-size:12px;color:var(--muted);padding-top:4px}
.a-sec{padding:72px clamp(20px,4vw,56px)}
.a-sec-head{display:flex;justify-content:space-between;align-items:baseline;border-top:1px solid var(--fg);padding-top:16px;margin-bottom:48px}
.a-sec-head h2{font-family:var(--font-display);font-weight:400;font-size:clamp(48px,6vw,96px);margin:0;line-height:1;letter-spacing:-.02em}
.a-meta{font-family:var(--font-mono);font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
.a-link{text-decoration:none}.a-link:hover{color:var(--accent)}
.a-feature{display:grid;grid-template-columns:1.5fr 1fr;gap:clamp(24px,4vw,64px);align-items:center;margin-bottom:96px;cursor:pointer}
.a-feature.flip{grid-template-columns:1fr 1.5fr}
.a-feature.flip .a-feature-img{order:2}
.a-feature-img{overflow:hidden;background:var(--soft);aspect-ratio:4/3}
.a-feature-img img{width:100%;height:100%;object-fit:cover;transition:transform 1.2s cubic-bezier(.2,.8,.2,1)}
.a-feature:hover .a-feature-img img{transform:scale(1.045)}
.a-feature h3{font-family:var(--font-display);font-weight:400;font-size:clamp(48px,5.5vw,88px);line-height:.95;margin:16px 0 8px;letter-spacing:-.02em}
.a-kick{font-family:var(--font-display);font-style:italic;font-size:22px;color:var(--muted);margin:0 0 20px}
.a-feature-txt p:not(.a-kick){font-size:17px;line-height:1.6;max-width:44ch;text-wrap:pretty}
.a-more{display:inline-block;margin-top:12px;font-weight:600;border-bottom:1px solid currentColor;padding-bottom:2px;transition:color .2s}
.a-feature:hover .a-more{color:var(--accent)}
.a-index{border-top:1px solid var(--line)}
.a-row{all:unset;box-sizing:border-box;width:100%;display:grid;grid-template-columns:60px 1fr 260px 120px 30px;align-items:baseline;gap:16px;padding:20px 0;border-bottom:1px solid var(--line);cursor:pointer;transition:padding .35s cubic-bezier(.2,.8,.2,1),color .2s}
.a-row:hover{padding-left:18px;color:var(--accent)}
.a-n,.a-c{font-family:var(--font-mono);font-size:12px;letter-spacing:.1em;color:var(--muted);text-transform:uppercase}
.a-t{font-family:var(--font-display);font-size:clamp(28px,3.2vw,48px);line-height:1.05}
.a-k{font-size:15px;color:var(--muted)}
.a-arrow{font-size:20px;opacity:0;transform:translateX(-8px);transition:.3s}
.a-row:hover .a-arrow{opacity:1;transform:none}
.a-preview{position:fixed;left:0;top:0;width:300px;pointer-events:none;z-index:60;opacity:0;transition:opacity .25s;will-change:transform}
.a-preview.on{opacity:1}
.a-preview img{width:100%;display:block;box-shadow:0 20px 50px rgba(0,0,0,.25);animation:aPop .35s cubic-bezier(.2,.8,.2,1)}
@keyframes aPop{from{transform:scale(.92) rotate(-2deg);opacity:.4}}
.a-about-grid{display:grid;grid-template-columns:minmax(260px,1fr) 1.6fr;gap:clamp(24px,5vw,80px)}
.a-about-grid figure{margin:0}
.a-about-grid figure img{width:100%;aspect-ratio:4/5;object-fit:cover}
.a-about-grid figcaption{font-family:var(--font-mono);font-size:12px;color:var(--muted);margin-top:10px;letter-spacing:.08em}
.a-pull{font-family:var(--font-display);font-size:clamp(30px,3.4vw,52px);line-height:1.1;margin:0 0 32px;text-wrap:balance}
.a-body{font-size:18px;line-height:1.65;max-width:60ch;color:var(--fg);text-wrap:pretty}
.a-edu{margin-top:36px;border-top:1px solid var(--line)}
.a-edu div{display:flex;flex-direction:column;gap:4px;padding:14px 0;border-bottom:1px solid var(--line)}
.a-edu span{font-size:14px;color:var(--muted)}
.a-skills{display:grid;grid-template-columns:repeat(4,1fr);gap:32px}
.a-skills h4{font-family:var(--font-display);font-style:italic;font-weight:400;font-size:30px;margin:0 0 14px;padding-bottom:10px;border-bottom:1px solid var(--fg)}
.a-skills ul{list-style:none;margin:0;padding:0}
.a-skills li{padding:7px 0;font-size:16px;border-bottom:1px dotted var(--line)}
.a-exp{display:grid;grid-template-columns:200px 1fr 1.2fr;gap:32px;padding:28px 0;border-bottom:1px solid var(--line)}
.a-exp h3{font-family:var(--font-display);font-weight:400;font-size:36px;margin:0 0 4px;line-height:1.05}
.a-exp .a-kick{font-size:18px;margin:0}
.a-time{font-family:var(--font-mono);font-size:13px;color:var(--muted);padding-top:10px}
.a-exp ul{margin:0;padding-left:18px;line-height:1.7;font-size:16px}
.a-contact{background:var(--fg);color:var(--bg);padding:96px clamp(20px,4vw,56px) 40px;margin-top:40px}
.a-contact .a-meta{color:color-mix(in oklab,var(--bg) 60%,transparent)}
.a-mail{display:block;font-family:var(--font-display);font-size:clamp(48px,9.5vw,170px);line-height:1;letter-spacing:-.03em;text-decoration:none;margin:24px 0 64px;word-break:break-word;transition:color .3s}
.a-mail:hover{color:var(--accent)}
.a-contact-row{display:flex;flex-wrap:wrap;gap:12px 40px;border-top:1px solid color-mix(in oklab,var(--bg) 30%,transparent);padding-top:20px;font-size:15px}
.a-contact-row a{text-decoration:none}.a-contact-row a:hover{text-decoration:underline}
@media (max-width:900px){
 .a-hero-grid{grid-template-columns:120px 1fr}.a-disc{grid-column:1/-1}.a-portrait{width:120px}
 .a-feature,.a-feature.flip{grid-template-columns:1fr}.a-feature.flip .a-feature-img{order:0}
 .a-row{grid-template-columns:40px 1fr 30px}.a-k,.a-c{display:none}
 .a-about-grid,.a-exp{grid-template-columns:1fr;gap:16px}.a-skills{grid-template-columns:1fr 1fr}
 .a-nav nav{gap:16px;font-size:14px}.a-preview{display:none}
}
`;

window.DirEditorial = DirEditorial;
