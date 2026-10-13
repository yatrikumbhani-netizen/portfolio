// Shared building blocks used by all three directions.
const { useState, useEffect, useRef, useCallback } = React;

// Scroll reveal: adds .is-in to [data-reveal] elements when they enter the viewport.
function useReveal(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]:not(.is-in)');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, deps);
}

// Cycles through a project's images while hovered.
function useHoverCycle(images, ms = 900) {
  const [i, setI] = useState(0);
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!on || images.length < 2) { setI(0); return; }
    const t = setInterval(() => setI((v) => (v + 1) % images.length), ms);
    return () => clearInterval(t);
  }, [on, images.length]);
  return { idx: i, bind: { onMouseEnter: () => setOn(true), onMouseLeave: () => setOn(false) } };
}

// Project detail overlay. Styled by the CSS variables of the active direction.
function ProjectModal({ project, onClose, onNav, index, total }) {
  const [img, setImg] = useState(0);
  const [play, setPlay] = useState(false);
  const scroller = useRef(null);
  useEffect(() => { setImg(0); setPlay(false); if (scroller.current) scroller.current.scrollTop = 0; }, [project && project.id]);
  useEffect(() => {
    const k = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNav(1);
      if (e.key === 'ArrowLeft') onNav(-1);
    };
    window.addEventListener('keydown', k);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = ''; };
  }, [onClose, onNav]);
  if (!project) return null;
  const p = project;
  return (
    <div className="pm-backdrop" onClick={onClose}>
      <div className="pm-sheet" ref={scroller} onClick={(e) => e.stopPropagation()}>
        <div className="pm-top">
          <span className="pm-count">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
          <div className="pm-top-actions">
            <button className="pm-btn" onClick={() => onNav(-1)} aria-label="Previous project">←</button>
            <button className="pm-btn" onClick={() => onNav(1)} aria-label="Next project">→</button>
            <button className="pm-btn" onClick={onClose} aria-label="Close">✕</button>
          </div>
        </div>
        <div className="pm-body">
          <div className="pm-media">
            {play && p.video ? (
              <div className="pm-video">
                <iframe src={`https://drive.google.com/file/d/${p.video}/preview`} allow="autoplay; fullscreen" allowFullScreen title={p.title}></iframe>
              </div>
            ) : (
              <div className="pm-hero" style={{ aspectRatio: p.ratio === '2/3' || p.ratio === '3/4' ? '4/5' : '16/10' }}>
                <img src={p.images[img]} alt={p.title} />
                {p.video && (
                  <button className="pm-play" onClick={() => setPlay(true)}>▶ Play film</button>
                )}
              </div>
            )}
            {p.images.length > 1 && (
              <div className="pm-thumbs">
                {p.images.map((src, i) => (
                  <button key={src} className={'pm-thumb' + (i === img && !play ? ' on' : '')} onClick={() => { setImg(i); setPlay(false); }}>
                    <img src={src} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <aside className="pm-info">
            <div className="pm-type">{p.type}</div>
            <h2 className="pm-title">{p.title}</h2>
            <div className="pm-kicker">{p.kicker}</div>
            <p className="pm-summary">{p.summary}</p>
            <div className="pm-tools">
              {p.tools.map((t) => <span key={t}>{t}</span>)}
            </div>
            <a className="pm-link" href={p.link} target="_blank" rel="noreferrer">View full project ↗</a>
          </aside>
        </div>
      </div>
    </div>
  );
}

const PM_CSS = `
.pm-backdrop{position:fixed;inset:0;z-index:200;background:color-mix(in oklab, var(--bg) 70%, transparent);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);display:flex;align-items:stretch;justify-content:center;padding:3vh 3vw;animation:pmFade .3s ease}
.pm-sheet{background:var(--bg);color:var(--fg);width:min(1280px,100%);border:1px solid var(--line);overflow:auto;animation:pmUp .45s cubic-bezier(.2,.8,.2,1);border-radius:var(--radius,0)}
.pm-top{position:sticky;top:0;z-index:2;display:flex;justify-content:space-between;align-items:center;padding:16px 24px;background:var(--bg);border-bottom:1px solid var(--line);font-family:var(--font-mono);font-size:12px;letter-spacing:.08em}
.pm-top-actions{display:flex;gap:8px}
.pm-btn{width:40px;height:40px;border:1px solid var(--line);background:transparent;color:var(--fg);cursor:pointer;font-size:15px;border-radius:var(--radius,0);transition:background .2s,color .2s}
.pm-btn:hover{background:var(--fg);color:var(--bg)}
.pm-body{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(280px,1fr);gap:40px;padding:32px 32px 48px}
.pm-hero{position:relative;background:var(--soft);overflow:hidden;border-radius:var(--radius,0)}
.pm-hero img{width:100%;height:100%;object-fit:contain;display:block}
.pm-video{aspect-ratio:16/9;background:#000;border-radius:var(--radius,0);overflow:hidden}
.pm-video iframe{width:100%;height:100%;border:0}
.pm-play{position:absolute;left:20px;bottom:20px;padding:12px 18px;background:var(--accent);color:var(--on-accent,#fff);border:0;font:600 14px var(--font-body);cursor:pointer;border-radius:var(--radius,0)}
.pm-thumbs{display:flex;gap:8px;margin-top:10px;overflow-x:auto}
.pm-thumb{flex:0 0 88px;height:64px;padding:0;border:1px solid transparent;background:var(--soft);cursor:pointer;opacity:.55;transition:opacity .2s;border-radius:var(--radius,0);overflow:hidden}
.pm-thumb.on,.pm-thumb:hover{opacity:1;border-color:var(--fg)}
.pm-thumb img{width:100%;height:100%;object-fit:cover;display:block}
.pm-info{position:sticky;top:96px;align-self:start}
.pm-type{font-family:var(--font-mono);font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--accent)}
.pm-title{font-family:var(--font-display);font-weight:var(--display-weight,400);font-size:clamp(34px,4vw,56px);line-height:1;margin:14px 0 10px;letter-spacing:var(--display-track,-.01em);text-wrap:balance}
.pm-kicker{color:var(--muted);font-size:16px;margin-bottom:24px}
.pm-summary{font-size:17px;line-height:1.6;margin:0 0 24px;text-wrap:pretty}
.pm-tools{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:32px}
.pm-tools span{font-family:var(--font-mono);font-size:12px;padding:6px 10px;border:1px solid var(--line);border-radius:var(--radius-pill,0)}
.pm-link{display:inline-block;padding:14px 20px;background:var(--fg);color:var(--bg);text-decoration:none;font-weight:600;font-size:15px;border-radius:var(--radius,0)}
.pm-link:hover{background:var(--accent);color:var(--on-accent,#fff)}
@keyframes pmFade{from{opacity:0}}
@keyframes pmUp{from{opacity:0;transform:translateY(40px)}}
@media (max-width:860px){.pm-body{grid-template-columns:1fr;padding:20px}.pm-info{position:static}}
[data-reveal]{opacity:0;transform:translateY(28px);transition:opacity .9s cubic-bezier(.2,.8,.2,1),transform .9s cubic-bezier(.2,.8,.2,1)}
[data-reveal].is-in{opacity:1;transform:none}
`;

// Modal controller hook
function useProjectModal(projects) {
  const [open, setOpen] = useState(-1);
  const nav = useCallback((d) => setOpen((i) => (i + d + projects.length) % projects.length), [projects.length]);
  const close = useCallback(() => setOpen(-1), []);
  const modal = open >= 0 ? (
    <ProjectModal project={projects[open]} index={open} total={projects.length} onClose={close} onNav={nav} />
  ) : null;
  return { openAt: (id) => setOpen(projects.findIndex((p) => p.id === id)), modal };
}

Object.assign(window, { useReveal, useHoverCycle, ProjectModal, PM_CSS, useProjectModal });
