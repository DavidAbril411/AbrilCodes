/* eslint-disable */
// @ts-nocheck
'use client';
// AbrilCodes 2026 site. Generated from the "AbrilCodes 2026" design; the whole page is one
// client component because the preloader, x-ray, scroll scenes and cursor share timing state.
import React from 'react';
import './AbrilSite.css';

class AbrilSiteView extends React.Component {
  state = { lang: this.props.locale === 'es' ? 'es' : 'en', booted: false, copied: false, narrow: false };
  rootRef = React.createRef(); navRef = React.createRef(); heroRef = React.createRef(); heroInnerRef = React.createRef();
  frameRef = React.createRef(); xrayRef = React.createRef(); marqRef = React.createRef(); pinRef = React.createRef();
  bentoRef = React.createRef(); bootRef = React.createRef(); clockRef = React.createRef(); xhRef = React.createRef();

  static D = 'M17.9831 2.73458L1.42929 30.9537C-3.75614 39.2258 6.66652 31.4371 8.91984 34.8139L16.0399 23.0668C17.1627 21.2143 19.8186 21.126 21.062 22.8998L27.0464 31.4371L34.7479 27.2287C36.7318 26.1446 37.4246 23.6347 36.28 21.6851C32.7205 15.6218 27.5699 6.78344 25.3471 2.73458C22.6281 -2.21801 19.3049 0.671002 17.9831 2.73458Z M39.5085 26.9347C44.2679 36.865 36.6306 40.4382 30.7085 36.3192C28.7506 34.9575 29.4637 32.1623 31.5792 31.0613L39.5085 26.9347Z';

  hex() {
    if (this._hex) return this._hex;
    let s = 411; const r = () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
    const b = () => Math.floor(r() * 256).toString(16).toUpperCase().padStart(2, '0');
    const row = n => Array.from({ length: n }, b).join(' ');
    const dump = (n, off) => Array.from({ length: n }, (_, i) => (off + i * 16).toString(16).toUpperCase().padStart(4, '0') + '  ' + row(8)).join('\n');
    const block = n => Array.from({ length: n }, () => row(10)).join('\n');
    this._hex = { run: 'ABRIL.CODES  ' + row(90), dump: dump(40, 0), dump2: dump(40, 0x2a0), a: block(5), b: block(5) };
    return this._hex;
  }

  componentDidMount() {
    this.fine = window.matchMedia && matchMedia('(pointer:fine)').matches;
    this.img = new Image();
    this.img.onload = () => { this.sample(); this.layout(); };
    this.img.src = '/images/david-cutout.webp';
    window.addEventListener('mousemove', this.onMove, { passive: true });
    window.addEventListener('mouseup', this.onUp);
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onResize);
    document.addEventListener('mouseleave', this.onLeave);
    this.onResize();
    this.applyXh();
    this.setupLoops();
    this.setupReveal();
    this.clock(); this.clockT = setInterval(this.clock, 20000);
    this.reelT = setInterval(this.tickReel, 1700);
    if (document.fonts) document.fonts.ready.then(() => this.layout());
    this.raf = requestAnimationFrame(this.loop);
    if (this.props.preloader ?? true) requestAnimationFrame(() => this.runBoot());
    else { this.setState({ booted: true }); this.enterHero(0); }
  }
  componentWillUnmount() {
    window.removeEventListener('mousemove', this.onMove); window.removeEventListener('mouseup', this.onUp);
    window.removeEventListener('scroll', this.onScroll); window.removeEventListener('resize', this.onResize);
    document.removeEventListener('mouseleave', this.onLeave);
    clearInterval(this.clockT); clearInterval(this.reelT); cancelAnimationFrame(this.raf);
    document.documentElement.classList.remove('xh'); document.documentElement.style.overflow = '';
  }
  componentDidUpdate() {
    const p = this.props, s = this.state;
    if (this._px !== p.crosshair) { this._px = p.crosshair; this.applyXh(); }
    if (this._pl !== s.lang || this._pn !== s.narrow) { this._pl = s.lang; this._pn = s.narrow; requestAnimationFrame(() => { this.layout(); this.cacheProj(); this.scene(); }); }
    if (this._ps !== p.showStatus) { this._ps = p.showStatus; requestAnimationFrame(() => this.setupReveal()); }
  }
  applyXh = () => document.documentElement.classList.toggle('xh', !!((this.props.crosshair ?? true) && this.fine));

  // ---------- boot ----------
  runBoot = () => {
    const b = this.bootRef.current, hero = this.heroInnerRef.current, nav = this.navRef.current;
    if (!b || !hero) { this.setState({ booted: true }); return; }
    const q = s => b.querySelector(s), qa = s => [...b.querySelectorAll(s)];
    document.documentElement.style.overflow = 'hidden';
    hero.style.opacity = '0'; nav.style.opacity = '0';
    const E = 'cubic-bezier(.65,0,.35,1)', K = 1.85;
    q('[data-k=p1]').animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: 980 * K, delay: 60 * K, easing: E, fill: 'forwards' });
    q('[data-k=p2]').animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: 480 * K, delay: 640 * K, easing: E, fill: 'forwards' });
    qa('[data-n]').forEach((n, i) => n.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 160, delay: (90 + i * 44) * K, fill: 'forwards' }));
    qa('[data-k=p1],[data-k=p2]').forEach(p => p.animate([{ fillOpacity: 0 }, { fillOpacity: 1 }], { duration: 420, delay: 1130 * K, easing: 'ease-out', fill: 'forwards' }));
    ['handles', 'nodes', 'guides'].forEach(k => q(`[data-k=${k}]`).animate([{ opacity: 1 }, { opacity: 0 }], { duration: 260, delay: 1240 * K + 140, fill: 'forwards' }));
    const steps = qa('[data-step]'), at = [0, 140, 600, 820, 1130, 1380].map(v => v * K);
    const hexEl = q('[data-k=hex]'), pathEl = q('[data-k=path]'), D = AbrilSiteView.D, t0 = performance.now();
    const tick = now => {
      const t = now - t0;
      hexEl.textContent = '0x' + Math.round(Math.min(1, t / (1300 * K)) * 255).toString(16).toUpperCase().padStart(2, '0');
      pathEl.textContent = D.slice(0, Math.floor(Math.min(1, t / (1150 * K)) * D.length));
      steps.forEach((s, i) => {
        if (t >= at[i] && !s.dataset.on) { s.dataset.on = '1'; s.style.opacity = '1'; if (i > 0) steps[i - 1].querySelector('[data-ok]').style.opacity = '1'; }
      });
      if (t < F) requestAnimationFrame(tick); else steps[5].querySelector('[data-ok]').style.opacity = '1';
    };
    requestAnimationFrame(tick);
    const F = 1460 * K + 280;
    setTimeout(() => {
      q('[data-k=hud]').animate([{ opacity: 1 }, { opacity: 0 }], { duration: 140, fill: 'forwards' });
      q('[data-k=grid]').animate([{ opacity: 1 }, { opacity: 0 }], { duration: 320, fill: 'forwards' });
      q('[data-k=logo]').animate([{ transform: 'scale(1)' }, { transform: 'scale(1.18)', offset: .28 }, { transform: 'scale(95)' }], { duration: 1080, easing: 'cubic-bezier(.55,0,.85,.15)', fill: 'forwards' });
      q('[data-k=bg]').animate([{ opacity: 1 }, { opacity: 0 }], { duration: 620, delay: 400, easing: 'ease-in', fill: 'forwards' });
      this.enterHero(320);
      nav.style.opacity = '';
      nav.animate([{ opacity: 0, transform: 'translateY(-12px)' }, { opacity: 1, transform: 'none' }], { duration: 600, delay: 700, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' });
    }, F);
    setTimeout(() => {
      document.documentElement.style.overflow = '';
      this.setState({ booted: true });
    }, F + 1120);
  };

  enterHero = delay => {
    const hero = this.heroInnerRef.current; if (!hero) return;
    const ez = 'cubic-bezier(.16,1,.3,1)';
    hero.style.opacity = '';
    const dolly = hero.animate([{ opacity: 0, transform: 'scale(.8)', filter: 'blur(14px)' }, { opacity: 1, transform: 'scale(1)', filter: 'blur(0px)' }], { duration: 1150, delay, easing: ez, fill: 'backwards' });
    dolly.onfinish = () => setTimeout(() => { this.layout(); this.demoMarquee(); }, 250);
    ['label', 'n1', 'n2', 'line', 'cta'].forEach((id, i) => {
      const el = hero.querySelector(`[data-id="${id}"]`);
      if (el) el.animate([{ opacity: 0, transform: 'translateY(40px)' }, { opacity: 1, transform: 'none' }], { duration: 900, delay: delay + 140 + i * 60, easing: ez, fill: 'backwards' });
    });
    const f = this.frameRef.current;
    if (f) {
      f.querySelector('[data-k=fig]').animate([{ opacity: 0, transform: 'translateY(9%)' }, { opacity: 1, transform: 'none' }], { duration: 1300, delay: delay + 100, easing: ez, fill: 'backwards' });
      f.querySelector('[data-k=shadow]').animate([{ opacity: 0 }, { opacity: .14 }], { duration: 1500, delay: delay + 750, easing: 'ease-out', fill: 'backwards' });
    }
  };

  // ---------- photo / ascii ----------
  sample() {
    const cols = 64, rows = Math.round(cols * (888 / 700) * 0.6);
    const c = document.createElement('canvas'); c.width = cols; c.height = rows;
    const x = c.getContext('2d'); x.drawImage(this.img, 0, 0, cols, rows);
    const d = x.getImageData(0, 0, cols, rows).data, v = new Float32Array(cols * rows);
    for (let i = 0; i < cols * rows; i++) { if (d[i * 4 + 3] < 128) { v[i] = -1; continue; } const l = (0.299 * d[i * 4] + 0.587 * d[i * 4 + 1] + 0.114 * d[i * 4 + 2]) / 255; v[i] = Math.max(0, Math.min(0.9, (l - 0.04) / 0.8)); }
    this.grid = { cols, rows, v };
  }
  fit(c) {
    const r = c.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
    const W = Math.max(1, Math.round(r.width * dpr)), H = Math.max(1, Math.round(r.height * dpr));
    if (c.width !== W || c.height !== H) { c.width = W; c.height = H; }
    return { W, H, ctx: c.getContext('2d') };
  }
  ascii(ctx, W, H, color, bg, jitter) {
    const g = this.grid; if (!g) return;
    if (bg) { ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H); } else ctx.clearRect(0, 0, W, H);
    const R = ' .:-=+*#%@', cw = W / g.cols, ch = H / g.rows;
    ctx.font = `${ch * 1.02}px "Geist Mono", ui-monospace, monospace`; ctx.textBaseline = 'top'; ctx.textAlign = 'center'; ctx.fillStyle = color;
    for (let y = 0; y < g.rows; y++) for (let x = 0; x < g.cols; x++) {
      const gv = g.v[y * g.cols + x]; if (gv < 0) continue;
      let i = Math.max(1, Math.min(R.length - 1, Math.floor((1 - gv) * R.length)));
      if (jitter && i > 0 && Math.random() < 0.25) i = Math.max(1, Math.min(R.length - 1, i + (Math.random() < 0.5 ? -1 : 1)));
      if (i > 0) ctx.fillText(R[i], x * cw + cw / 2, y * ch);
    }
  }
  // ---------- x-ray layout ----------
  layout = () => {
    const hero = this.heroRef.current, x = this.xrayRef.current; if (!hero || !x) return;
    const pars = [...hero.querySelectorAll('[data-id=left],[data-id=frame]'), ...x.querySelectorAll('[data-par]')];
    pars.forEach(p => p.style.transform = '');
    const H = hero.getBoundingClientRect();
    x.querySelectorAll('[data-for]').forEach(el => {
      const t = hero.querySelector(`[data-id="${el.dataset.for}"]`); if (!t) return;
      const r = t.getBoundingClientRect();
      Object.assign(el.style, { left: r.left - H.left + 'px', top: r.top - H.top + 'px', width: r.width + 'px', height: r.height + 'px' });
      if (el.hasAttribute('data-font')) {
        const cs = getComputedStyle(t); el.style.fontSize = cs.fontSize; el.style.lineHeight = cs.lineHeight;
        const lab = el.querySelector('[data-lab]'); if (lab) lab.textContent = lab.dataset.lab + ' · ' + Math.round(parseFloat(cs.fontSize)) + 'px';
      }
    });
    const ac = x.querySelector('[data-k=ascii]');
    if (ac && this.grid) { const { W, H: h, ctx } = this.fit(ac); this.ascii(ctx, W, h, '#8E8EFF', null, false); }
    this.onScroll();
  };

  // ---------- marquee ----------
  onHeroDown = e => {
    if (e.button !== 0 || e.target.closest('a,button')) return;
    const r = this.heroRef.current.getBoundingClientRect();
    this.stopDemo();
    if (!this.mq) this.layout();
    this.drag = { x0: e.clientX - r.left, y0: e.clientY - r.top };
    this.setMarq(this.drag.x0, this.drag.y0, this.drag.x0, this.drag.y0);
    e.preventDefault();
  };
  onUp = () => { if (!this.drag) return; this.drag = null; this.collapse(); };
  setMarq(x0, y0, x1, y1) {
    const hero = this.heroRef.current, m = this.marqRef.current, x = this.xrayRef.current; if (!hero || !m) return;
    const W = hero.clientWidth, H = hero.clientHeight;
    const l = Math.max(0, Math.min(x0, x1)), t = Math.max(0, Math.min(y0, y1)), r = Math.min(W, Math.max(x0, x1)), b = Math.min(H, Math.max(y0, y1));
    this.mq = { l, t, r, b };
    m.style.opacity = r - l > 2 ? '1' : '0';
    m.style.transform = `translate(${l}px,${t}px)`; m.style.width = r - l + 'px'; m.style.height = b - t + 'px';
    x.style.clipPath = `inset(${t}px ${W - r}px ${H - b}px ${l}px)`;
    m.querySelector('[data-k=tl]').textContent = `[${Math.round(l)},${Math.round(t)}]`;
    m.querySelector('[data-k=br]').textContent = `[${Math.round(r)},${Math.round(b)}]`;
    m.querySelector('[data-k=sz]').textContent = `${Math.round(r - l)} × ${Math.round(b - t)}`;
  }
  animMarq(from, to, dur, done) {
    const t0 = performance.now(), ease = k => 1 - Math.pow(1 - k, 4);
    const f = now => {
      const k = Math.min(1, (now - t0) / dur), e = ease(k), L = (a, b) => a + (b - a) * e;
      this.setMarq(L(from.l, to.l), L(from.t, to.t), L(from.r, to.r), L(from.b, to.b));
      if (k < 1) this.mqRaf = requestAnimationFrame(f); else done && done();
    };
    cancelAnimationFrame(this.mqRaf); this.mqRaf = requestAnimationFrame(f);
  }
  collapse = () => {
    const q = this.mq; if (!q) return;
    const cx = (q.l + q.r) / 2, cy = (q.t + q.b) / 2;
    this.animMarq(q, { l: cx, t: cy, r: cx, b: cy }, 320, () => { this.marqRef.current && (this.marqRef.current.style.opacity = '0'); this.mq = null; });
  };
  demoMarquee = () => {
    const f = this.frameRef.current, hero = this.heroRef.current; if (!f || !hero || this.drag || this.demoDone) return;
    this.demoDone = true;
    const H = hero.getBoundingClientRect(), r = f.getBoundingClientRect();
    const to = { l: r.left - H.left + r.width * .1, t: r.top - H.top + r.height * .14, r: r.left - H.left + r.width * .9, b: r.top - H.top + r.height * .6 };
    const cx = (to.l + to.r) / 2, cy = (to.t + to.b) / 2;
    this.animMarq({ l: cx, t: cy, r: cx, b: cy }, to, 650, () => { this.demoT = setTimeout(this.collapse, 1100); });
  };
  stopDemo() { clearTimeout(this.demoT); cancelAnimationFrame(this.mqRaf); this.demoDone = true; }

  // ---------- pointer ----------
  onMove = e => {
    this.mx = e.clientX; this.my = e.clientY; this.tgt = e.target;
    if (this.drag) { const r = this.heroRef.current.getBoundingClientRect(); this.setMarq(this.drag.x0, this.drag.y0, e.clientX - r.left, e.clientY - r.top); }
    if (!this.mvRaf) this.mvRaf = requestAnimationFrame(this.moveFrame);
  };
  onLeave = () => { const xh = this.xhRef.current; if (xh) xh.style.opacity = '0'; };
  moveFrame = () => {
    this.mvRaf = null;
    const x = this.mx, y = this.my, xh = this.xhRef.current;
    if (xh && this.fine) { xh.style.opacity = '1'; this.hot = !!(this.tgt && this.tgt.closest && this.tgt.closest('a,button,[data-mag],[data-tile]')); }
    const root = this.rootRef.current; if (!root || !this.fine) return;
    root.querySelectorAll('[data-mag]').forEach(el => {
      const r = el.getBoundingClientRect(), ox = el._ox || 0, oy = el._oy || 0;
      const cx = r.left + r.width / 2 - ox, cy = r.top + r.height / 2 - oy, dx = x - cx, dy = y - cy;
      const R = Math.max(r.width, r.height) / 2 + 50, near = Math.hypot(dx, dy) < R;
      const nx = near ? dx * 0.3 : 0, ny = near ? dy * 0.3 : 0;
      if (nx !== ox || ny !== oy) { el._ox = nx; el._oy = ny; el.style.transform = nx || ny ? `translate(${nx}px,${ny}px)` : ''; }
    });
  };
  loop = now => {
    this.raf = requestAnimationFrame(this.loop);
    const mx = this.mx ?? innerWidth * .86, my = this.my ?? innerHeight * .1, xh = this.xhRef.current;
    if (xh && this.fine && this.mx != null) {
      const c = this.cur || (this.cur = { x: mx, y: my, s: .43, pts: [] });
      c.x += (mx - c.x) * .3; c.y += (my - c.y) * .3;
      const ts = this.drag ? .25 : this.hot ? 1 : .43; c.s += (ts - c.s) * .18;
      const b = xh.querySelector('[data-k=b]'), l = xh.querySelector('[data-k=l]'), cv = xh.querySelector('[data-k=trail]');
      b.style.transform = `translate3d(${c.x}px,${c.y}px,0) translate(-50%,-50%) scale(${c.s})`;
      const flip = c.x > innerWidth - 180, off = 22.4 * c.s + 8;
      l.style.transform = `translate3d(${flip ? c.x - off - 150 : c.x + off}px,${c.y + off - 6}px,0)`;
      l.textContent = `X:${String(Math.round(c.x)).padStart(4, '0')}PX  Y:${String(Math.round(c.y)).padStart(4, '0')}PX`;
      const last = c.pts[c.pts.length - 1];
      if (!last || Math.hypot(last.x - c.x, last.y - c.y) > .5) c.pts.push({ x: c.x, y: c.y, t: now });
      while (c.pts.length && now - c.pts[0].t > 560) c.pts.shift();
      const dpr = Math.min(2, devicePixelRatio || 1), W = Math.round(innerWidth * dpr), H = Math.round(innerHeight * dpr);
      if (cv.width !== W || cv.height !== H) { cv.width = W; cv.height = H; }
      const ctx = cv.getContext('2d'); ctx.clearRect(0, 0, W, H);
      if (c.pts.length > 1) {
        ctx.lineWidth = 1 * dpr; ctx.lineCap = 'round';
        for (let i = 1; i < c.pts.length; i++) {
          const p0 = c.pts[i - 1], p1 = c.pts[i], a = Math.max(0, 1 - (now - p1.t) / 560);
          ctx.strokeStyle = `rgba(10,10,228,${(a * .9).toFixed(3)})`;
          ctx.beginPath(); ctx.moveTo(p0.x * dpr, p0.y * dpr); ctx.lineTo(p1.x * dpr, p1.y * dpr); ctx.stroke();
        }
      }
    }
    const f = this.frameRef.current, sh = f && f.querySelector('[data-k=shadow]');
    if (sh) {
      const r = f.getBoundingClientRect();
      if (r.bottom > 0 && r.top < innerHeight) {
        const cx = r.left + r.width * .5, cy = r.top + r.height * .3;
        const tx = Math.max(-1, Math.min(1, (cx - mx) / (innerWidth * .55))), ty = Math.max(-1, Math.min(1, (cy - my) / (innerHeight * .8)));
        const q = this.shd || (this.shd = { x: tx, y: ty });
        q.x += (tx - q.x) * .07; q.y += (ty - q.y) * .07;
        const d = Math.min(1.2, Math.hypot(q.x, q.y));
        sh.style.transform = `translate(${4 + q.x * 6}%,${-Math.abs(q.y) * 1.2}%) skewX(${-5 - q.x * 5}deg)`;
        sh.style.filter = `blur(${7 + d * 3}px)`;
      }
    }
  };
  onBentoMove = e => {
    const g = this.bentoRef.current; if (!g) return;
    g.querySelectorAll('[data-tile]').forEach(t => { const r = t.getBoundingClientRect(); t.style.setProperty('--mx', e.clientX - r.left + 'px'); t.style.setProperty('--my', e.clientY - r.top + 'px'); });
  };

  // ---------- scroll ----------
  onResize = () => {
    const narrow = innerWidth < 760;
    if (narrow !== this.state.narrow) this.setState({ narrow });
    clearTimeout(this.rzT); this.rzT = setTimeout(() => { this.layout(); this.cacheProj(); this.scene(); }, 120);
  };
  onScroll = () => { if (!this.scRaf) this.scRaf = requestAnimationFrame(this.scrollFrame); };
  scrollFrame = () => {
    this.scRaf = null;
    const y = window.scrollY, vh = innerHeight, nav = this.navRef.current;
    if (nav) { const on = y > 40; nav.style.background = on ? 'rgba(229,229,229,.8)' : 'transparent'; nav.style.backdropFilter = on ? 'blur(14px)' : 'none'; nav.style.borderBottomColor = on ? 'rgba(8,8,157,.1)' : 'transparent'; }
    const hp = Math.max(0, Math.min(1, y / vh)), hero = this.heroRef.current, x = this.xrayRef.current;
    if (hero && x && !this.drag && !this.mq) {
      const lt = `translateY(${-hp * 90}px)`, ft = `translateY(${-hp * 40}px)`;
      hero.querySelector('[data-id=left]').style.transform = lt; x.querySelector('[data-par=left]').style.transform = lt;
      hero.querySelector('[data-id=frame]').style.transform = ft; x.querySelector('[data-par=frame]').style.transform = ft;
    }
    this.scene();
  };
  cacheProj() {
    const pin = this.pinRef.current; if (!pin) return;
    this.projEls = [...pin.querySelectorAll('[data-proj]')].map(el => {
      const k = n => el.querySelector(`[data-k=${n}]`);
      return { el, txt: k('txt'), rig: k('rig'), l0: k('l0'), l1: k('l1'), l2: k('l2'), sl: k('sl'), sr: k('sr'), labs: [...el.querySelectorAll('[data-k=lab]')] };
    });
    this.bar = pin.querySelector('[data-k=bar]');
  }
  scene() {
    const pin = this.pinRef.current; if (!pin) return;
    if (!this.projEls || !this.projEls.length || !this.projEls[0].el.isConnected) this.cacheProj();
    const r = pin.getBoundingClientRect(), total = Math.max(1, r.height - innerHeight);
    const P = Math.max(0, Math.min(1, -r.top / total)), n = this.projEls.length, seg = P * n;
    const cl = v => Math.max(0, Math.min(1, v)), io = k => k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2, oc = k => 1 - Math.pow(1 - k, 3);
    this.projEls.forEach((p, i) => {
      const L = seg - i;
      let vis = i === 0 ? 1 : cl((L + 0.08) / 0.1), ex = 0;
      if (i < n - 1 && L > 0.86) { ex = cl((L - 0.86) / 0.12); vis *= 1 - ex; }
      p.el.style.opacity = vis; p.el.style.pointerEvents = vis > 0.5 ? 'auto' : 'none';
      const a = io(cl(L / 0.5)), f = oc(cl((L - 0.52) / 0.24)), ia = 1 - a;
      p.rig.style.transform = `translateY(${-ex * 90}px) rotateX(${56 * ia}deg) rotateZ(${-34 * ia}deg) scale(${0.76 + 0.24 * a})`;
      p.l0.style.transform = `translateZ(${-200 * ia}px)`; p.l0.style.opacity = ia;
      p.l1.style.opacity = ia;
      p.l2.style.transform = `translateZ(${200 * ia}px)`;
      p.labs.forEach(lb => lb.style.opacity = cl(1 - a * 1.7));
      p.sl.style.transform = `translateX(${-64 * f}%) translateZ(${-90 * f}px) rotateZ(${-5 * f}deg)`; p.sl.style.opacity = f;
      p.sr.style.transform = `translateX(${64 * f}%) translateZ(${-90 * f}px) rotateZ(${5 * f}deg)`; p.sr.style.opacity = f;
      p.txt.style.transform = `translateY(${(1 - oc(cl((L + 0.1) / 0.35))) * 40 - ex * 40}px)`;
    });
    if (this.bar) this.bar.style.width = P * 100 + '%';
  }
  tickReel = () => {
    if (!this.projEls) return;
    this.reelK = (this.reelK || 0) + 1;
    this.projEls.forEach((p, i) => {
      const imgs = this.featuredImgs && this.featuredImgs[i]; if (!imgs || !p.el.isConnected) return;
      const k = this.reelK, set = (sel, j) => { const im = p.el.querySelector(sel); if (im) { im.src = imgs[(k + j) % imgs.length]; im.animate([{ opacity: .35 }, { opacity: 1 }], { duration: 220 }); } };
      set('[data-k=slimg]', 0); set('[data-k=srimg]', 1);
    });
  };

  // ---------- loops & reveal ----------
  setupLoops() {
    const root = this.rootRef.current; if (!root) return;
    const hr = root.querySelector('[data-k=hexrun]'); hr && hr.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }], { duration: 60000, iterations: Infinity });
    root.querySelectorAll('[data-reel]').forEach((el, i) => el.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-50%)' }], { duration: 9000 + i * 1400, iterations: Infinity }));
    root.querySelectorAll('[data-k=pulse]').forEach(el => el.animate([{ boxShadow: '0 0 0 0 rgba(10,10,228,.55)' }, { boxShadow: '0 0 0 7px rgba(10,10,228,0)' }], { duration: 1400, iterations: Infinity }));
    root.querySelectorAll('[data-k=caret]').forEach(el => el.animate([{ opacity: 1 }, { opacity: 1, offset: .5 }, { opacity: 0, offset: .51 }, { opacity: 0 }], { duration: 1000, iterations: Infinity }));
  }
  setupReveal() {
    const root = this.rootRef.current; if (!root) return;
    if (this.io) this.io.disconnect();
    const ez = 'cubic-bezier(.16,1,.3,1)';
    this.io = new IntersectionObserver(es => es.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target; this.io.unobserve(el);
      if (el.dataset.rv === 'line') {
        const sib = [...el.parentNode.querySelectorAll(':scope > [data-rv=line]')], i = sib.indexOf(el);
        el.animate([{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0 0 0)' }], { duration: 280, delay: 80 + i * 45, easing: 'steps(14,end)', fill: 'backwards' });
      } else {
        const sib = el.dataset.tile ? [...el.parentNode.querySelectorAll('[data-tile]')].indexOf(el) : 0;
        el.animate([{ opacity: 0, transform: 'translateY(36px)' }, { opacity: 1, transform: 'none' }], { duration: 800, delay: sib * 60, easing: ez, fill: 'backwards' });
      }
      const ln = el.querySelector && el.querySelector('[data-k=clline]');
      if (ln) ln.animate([{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], { duration: 900, delay: 200, easing: ez, fill: 'backwards' });
    }), { threshold: 0.12 });
    root.querySelectorAll('[data-rv]').forEach(el => {
      if (el.dataset.seen) return; el.dataset.seen = '1';
      el.style.opacity = ''; const r = el.getBoundingClientRect();
      if (r.top > innerHeight) this.io.observe(el);
    });
  }

  // ---------- misc ----------
  clock = () => { const el = this.clockRef.current; if (el) el.textContent = new Intl.DateTimeFormat('en-GB', { timeZone: 'America/Argentina/Cordoba', hour: '2-digit', minute: '2-digit' }).format(new Date()) + ' ART'; };
  go = id => e => { e && e.preventDefault(); const el = document.getElementById(id); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: 'smooth' }); };
  setLang = l => { if (l === this.state.lang) return; this.setState({ lang: l }); document.documentElement.lang = l; try { window.history.replaceState(null, '', '/' + l + window.location.hash); } catch (e) {} };
  copyEmail = () => { try { navigator.clipboard.writeText('davidabril411@gmail.com'); } catch (e) {} this.setState({ copied: true }); clearTimeout(this.cpT); this.cpT = setTimeout(() => this.setState({ copied: false }), 1600); };
  replay = () => {
    window.scrollTo({ top: 0 });
    this.demoDone = false;
    this.setState({ booted: false }, () => requestAnimationFrame(() => (this.props.preloader ?? true) ? this.runBoot() : this.enterHero(0)));
  };

  renderVals() {
    const es = this.state.lang === 'es', h = this.hex();
    const t = es ? {
      navWork: 'Proyectos', navContact: 'Contacto', status: 'Disponible', heroLabel: 'Ingeniero de software — Córdoba, AR',
      heroLine: 'Conecto procesos de negocio con software.', cta: 'Hablemos', seeWork: 'Ver proyectos', hint: 'Clic + arrastrar para descompilar',
      workTitle: 'Proyectos, descompilados.', workHint: 'Scrolleá para ensamblar', moreTitle: 'Más proyectos',
      whoTitle: 'Disponible.', whoRoles: 'Implementación, análisis funcional y de sistemas, soporte técnico. Presencial en Córdoba, remoto o en cualquier país de la UE.',
      stack: 'Stack', core: 'Base', learning: 'Aprendiendo', builds: 'Construyo con', ai: 'Desarrollo asistido por IA (Claude Code)', changelog: 'Changelog', nextStep: 'Mudanza a España / UE',
      talk: 'Hablemos', email: 'Email', social: 'Redes', replay: 'Repetir intro', copy: 'Copiar', copied: 'Copiado'
    } : {
      navWork: 'Work', navContact: 'Contact', status: 'Open to work', heroLabel: 'Software engineer — Córdoba, AR',
      heroLine: 'I connect business processes with software.', cta: "Let's talk", seeWork: 'See work', hint: 'Click + drag to decompile',
      workTitle: 'Projects, decompiled.', workHint: 'Scroll to assemble', moreTitle: 'More builds',
      whoTitle: 'Open to work.', whoRoles: 'Implementation, functional and systems analysis, technical support. On-site in Córdoba, remote, or anywhere in the EU.',
      stack: 'Stack', core: 'Core', learning: 'Learning', builds: 'Builds with', ai: 'AI-assisted development (Claude Code)', changelog: 'Changelog', nextStep: 'Relocating to Spain / EU',
      talk: "Let's talk", email: 'Email', social: 'Elsewhere', replay: 'Replay boot', copy: 'Copy', copied: 'Copied'
    };
    const O = '/images/OrionLogistics/orion-', C = '/images/Cappy/cappy-';
    const oImgs = ['01', '02', '03', '04', '06', '07', '09', '10', '11', '12'].map(n => O + n + '.webp');
    const cImgs = ['02', '03', '04'].map(n => C + n + '.webp');
    this.featuredImgs = [oImgs, cImgs];
    const featured = [
      { idx: '01', kind: es ? 'SaaS · logística' : 'SaaS · logistics', title: 'OrionLogistics', logo: O + 'logo.webp', url: 'https://calei.com.ar/', urlLabel: 'calei.com.ar',
        line: es ? 'Plataforma de reparto offline-first que una distribuidora usa todos los días.' : 'Offline-first delivery platform a distributor runs on every day.',
        facts: es ? ['Cálculo de rutas 95% más rápido', 'La app de choferes funciona sin señal'] : ['95% faster route calculation', 'Driver app keeps working without signal'],
        stack: ['C++20', 'Kotlin', 'NestJS', 'MySQL', 'OSRM', 'Next.js'], file: 'sync/Queue.kt',
        code: '// offline-first queue\nsuspend fun flush() =\n  dao.pending()\n    .sortedBy { it.createdAt }\n    .forEach { op ->\n      api.push(op)\n      dao.markSent(op.id)\n    }', hex: h.a,
        img0: O + 'welcome.webp', img1: oImgs[0], img2: oImgs[1] },
      { idx: '02', kind: es ? 'Marketplace · mobile' : 'Marketplace · mobile', title: 'Cappy', logo: C + 'logo.webp', url: 'https://cappy.com.ar/', urlLabel: 'cappy.com.ar',
        line: es ? 'Marketplace para contratar oficios cerca tuyo, con pagos dentro de la app.' : 'Marketplace to hire tradespeople nearby, with in-app payments.',
        facts: es ? ['Búsqueda por cercanía con PostGIS', 'Pagos con MercadoPago'] : ['Proximity search on PostGIS', 'Payments through MercadoPago'],
        stack: ['React Native', 'Expo', 'Node.js', 'PostgreSQL', 'PostGIS', 'Mapbox'], file: 'workers.sql',
        code: '-- workers near the user\nSELECT id, trade, rating\nFROM workers\nWHERE ST_DWithin(\n  geom,\n  ST_MakePoint($1,$2)\n    ::geography,\n  coverage_m\n)\nORDER BY rating DESC;', hex: h.b,
        img0: C + '01.webp', img1: cImgs[0], img2: cImgs[1] }
    ];
    const dbl = a => a.concat(a);
    const bento = [
      { idx: '03', span: 2, title: 'Nightdesk', tech: ['Python 3.11', 'Pydantic v2', 'SQLite FTS5'], line: es ? 'Redacción multiagente que rechaza cualquier cita que no esté en la fuente.' : "Multi-agent newsroom that rejects any quote it can't find in the source.",
        reel: dbl(['agent.research   → 14 sources', 'corpus.index     fts5 ✓', 'draft#212        written', 'verify quote#1   match ✓', 'verify quote#2   match ✓', 'verify quote#3   not found ✗', 'draft#212        rejected', 'scheduler        next: breaking']) },
      { idx: '04', span: 1, title: 'POS B2B', tech: ['Java 21', 'Spring Boot', 'MySQL'], line: es ? 'Punto de venta e inventario en tiempo real para un comercio.' : 'Point of sale and live inventory for a retail client.',
        reel: dbl(['BEGIN;', 'INSERT INTO sales …', 'UPDATE stock SET qty=qty-1', 'INSERT INTO audit …', 'COMMIT; ✓', 'GET /api/products?q=', '200 OK']) },
      { idx: '05', span: 1, title: 'Hipólito', tech: ['Transformers.js', 'WebAssembly', 'RenPyWeb'], line: es ? 'Tutor con IA que corre entero en el navegador del alumno.' : "AI tutor that runs entirely in the student's browser.",
        reel: dbl(['load LaMini-Flan-T5', 'runtime   wasm ✓', 'server    none', 'cost/msg  $0.00', '> ¿por qué llueve?', '< el agua se evapora…']) },
      { idx: '06', span: 1, title: 'SimpleLoc', tech: ['Swift', 'SwiftUI', 'CoreLocation'], line: es ? 'GPS offline para la montaña. iOS y Android.' : 'Offline GPS tracker for the mountains. iOS and Android.',
        reel: dbl(['fix  -31.4201 -64.1888', 'fix  -31.4198 -64.1893', 'gps  throttle 30s', 'map  cached tiles ✓', 'net  offline', 'gpx  import ok']) },
      { idx: '07', span: 1, title: 'MisCuentas', url: 'https://cuentas.abrilcodes.com', urlLabel: 'cuentas.abrilcodes.com', tech: ['Python', 'Flask', 'SQLAlchemy 2'], line: es ? 'Finanzas multimoneda guardadas con la cotización de cada día.' : "Multi-currency finances stored at each day's exchange rate.",
        reel: dbl(['USD→ARS @ 2024-03-01', 'EUR→ARS @ 2024-03-02', 'CHECK amount > 0 ✓', 'trigger balance ✓', 'pytest  29 passed']) },
      { idx: '08', span: 2, title: 'Web Épica', url: 'https://me.abrilcodes.com/', urlLabel: 'me.abrilcodes.com', tech: ['Three.js', 'React Three Fiber', 'GSAP'], line: es ? 'Experimentos 3D en el navegador sostenidos a 60 FPS.' : '3D browser experiments held at 60 FPS.',
        reel: dbl(['fps 60   frame 16.6ms', 'r3f      scene mounted', 'gsap     timeline ok', 'fps 60   draw calls 212', 'astro    island hydrated']) },
      { idx: '09', span: 1, title: es ? 'Scanner EAN' : 'EAN Scanner', url: 'https://scanner.calei.com.ar', urlLabel: 'scanner.calei.com.ar', tech: ['Web', 'Barcode', 'API'], line: es ? 'Escáner de productos por código de barras desde el navegador.' : 'Barcode product scanner that runs in the browser.',
        reel: dbl(['camera   stream ok', 'decode   EAN-13', '7790070 012345 ✓', 'GET /products/7790070…', '200 OK  stock 48', 'scan     next']) },
      { idx: '10', span: 1, title: 'Calei Mensajes', url: 'https://panel.abrilcodes.com', urlLabel: 'panel.abrilcodes.com', tech: ['Panel', 'Messaging', 'Queue'], line: es ? 'Panel para gestionar y enviar mensajes a clientes.' : 'Panel to manage and send customer messages.',
        reel: dbl(['queue    214 pending', 'send     batch#18', 'delivered 198 ✓', 'failed   3 → retry', 'template "pedido_listo"', 'panel    synced']) },
      { idx: '11', span: 2, title: es ? 'Smoke test · clínicas de estética' : 'Smoke test · beauty clinics', url: 'https://dermayuii.abrilcodes.com/', urlLabel: 'dermayuii.abrilcodes.com', tech: ['Landing', 'Analytics', 'A/B'], line: es ? 'Landing para validar demanda de un sistema para clínicas de estética.' : 'Landing page to validate demand for a beauty-clinic system.',
        reel: dbl(['variant  A  cta "Reservá"', 'variant  B  cta "Probá gratis"', 'visits   1.2k', 'signups  A 3.1% · B 4.6%', 'winner   B ✓']) }
    ];
    const S = v => `"${v}"`;
    const vals = es
      ? { status: 'disponible', roles: ['Implementación', 'Analista funcional', 'Analista de sistemas', 'Soporte técnico'], based: 'Córdoba, AR · remoto · UE', citizen: 'UE · pasaporte italiano', next: 'España · 07/2027', degree: 'Ing. en Informática · UBP · 12/2026', english: 'B2 · EF SET' }
      : { status: 'open_to_work', roles: ['Implementation', 'Functional Analyst', 'Systems Analyst', 'Technical Support'], based: 'Córdoba, AR · remote · EU', citizen: 'EU · Italian passport', next: 'Spain · 07/2027', degree: 'Computer Engineering · UBP · 12/2026', english: 'B2 · EF SET' };
    const kv = (k, v, end = ',') => ({ ind: '  ', key: S(k), col: ': ', val: v, end });
    const json = [{ ind: '', key: '', col: '', val: '{', end: '' }, kv('status', S(vals.status)), kv('roles', '[', '')]
      .concat(vals.roles.map((r, i) => ({ ind: '    ', key: '', col: '', val: S(r), end: i < vals.roles.length - 1 ? ',' : '' })))
      .concat([{ ind: '  ', key: '', col: '', val: ']', end: ',' }, kv('based', S(vals.based)), kv('citizen', S(vals.citizen)), kv('next', S(vals.next)), kv('degree', S(vals.degree)), kv('english', S(vals.english), ''), { ind: '', key: '', col: '', val: '}', end: '' }]);
    const changelog = es ? [
      { ver: 'v2014', title: 'Técnico electrónico', place: 'Instituto Villada' },
      { ver: 'v2022', title: 'Ingeniería en Informática', place: 'UBP' },
      { ver: 'v2024.06', title: 'Desarrollador', place: 'Mindfactory · 1 año' },
      { ver: 'v2025', title: 'Cofundador y director operativo', place: 'Calei' },
      { ver: 'v2026.12', title: 'Graduación', place: 'UBP' }
    ] : [
      { ver: 'v2014', title: 'Electronics technician', place: 'Instituto Villada' },
      { ver: 'v2022', title: 'Computer Engineering', place: 'UBP' },
      { ver: 'v2024.06', title: 'Developer', place: 'Mindfactory · 1 year' },
      { ver: 'v2025', title: 'Co-founder & operations director', place: 'Calei' },
      { ver: 'v2026.12', title: 'Graduation', place: 'UBP' }
    ];
    const narrow = this.state.narrow;
    return {
      rootRef: this.rootRef, navRef: this.navRef, heroRef: this.heroRef, heroInnerRef: this.heroInnerRef, frameRef: this.frameRef,
      xrayRef: this.xrayRef, marqRef: this.marqRef, pinRef: this.pinRef, bentoRef: this.bentoRef, bootRef: this.bootRef, clockRef: this.clockRef, xhRef: this.xhRef,
      t, featured, bento: bento.map(b => ({ ...b, span: narrow ? 1 : b.span, url: b.url || null, urlLabel: b.urlLabel || '' })), bentoCount: String(bento.length).padStart(2, '0'), json, changelog,
      core: es ? ['SQL', 'Relevamiento y UML', 'Java y POO', 'HTML / CSS', 'React (UI)'] : ['SQL', 'Requirements & UML', 'Java & OOP', 'HTML / CSS', 'React (UI)'],
      learning: es ? ['Spring Boot', 'APIs REST', 'Angular', 'SAP'] : ['Spring Boot', 'REST APIs', 'Angular', 'SAP'],
      hexRun: h.run, hexDump: h.dump, hexDump2: h.dump2,
      showBoot: !this.state.booted && (this.props.preloader ?? true),
      crosshair: (this.props.crosshair ?? true),
      showStatus: (this.props.showStatus ?? true),
      heroCols: narrow ? 'minmax(0,1fr)' : 'minmax(0,1.3fr) minmax(0,1fr)',
      stageCols: narrow ? 'minmax(0,1fr)' : 'minmax(0,.9fr) minmax(0,1.1fr)',
      pinH: narrow ? '520vh' : '660vh', wide: !narrow, showPill: !narrow && (this.props.showStatus ?? true),
      frameJustify: narrow ? 'center' : 'flex-end', frameH: narrow ? 'min(64vh,calc((100vw - 40px) * 1.27))' : 'min(calc(100vh - 84px),920px)', frameMin: narrow ? '0px' : '420px',
      stageGap: narrow ? '18px' : 'clamp(24px,4vw,64px)', stagePad: narrow ? '76px 20px 56px' : '84px clamp(20px,3vw,40px) 64px', txtGap: narrow ? '12px' : '22px', rigH: narrow ? '38vh' : 'min(66vh,620px)',
      tileCols: narrow ? 'minmax(0,1fr)' : 'repeat(4,minmax(0,1fr))', fSpan: narrow ? 2 : 1,
      bentoCols: narrow ? 'repeat(2,minmax(0,1fr))' : 'repeat(4,minmax(0,1fr))',
      enBg: es ? 'transparent' : '#08089D', enFg: es ? '#08089D' : '#fff', esBg: es ? '#08089D' : 'transparent', esFg: es ? '#fff' : '#08089D',
      setEn: () => this.setLang('en'), setEs: () => this.setLang('es'),
      copyLabel: this.state.copied ? t.copied : t.copy, copyIcon: this.state.copied ? 'ph ph-check' : 'ph ph-copy', copyEmail: this.copyEmail,
      goTop: this.go('top'), goWork: this.go('work'), goWho: this.go('whoami'), goContact: this.go('contact'),
      onHeroDown: this.onHeroDown, onBentoMove: this.onBentoMove, replay: this.replay
    };
  }

  render() {
    const { rootRef, showBoot, bootRef, navRef, goTop, wide, goWork, t, showStatus, goWho, goContact, showPill, setEn, enBg, enFg, setEs, esBg, esFg, heroRef, onHeroDown, heroInnerRef, heroCols, frameJustify, frameRef, frameH, frameMin, xrayRef, hexDump, hexDump2, marqRef, hexRun, pinRef, pinH, featured, stageCols, stageGap, stagePad, txtGap, rigH, bentoCount, bentoRef, onBentoMove, tileCols, bento, json, core, learning, changelog, bentoCols, copyEmail, copyIcon, copyLabel, fSpan, clockRef, replay, crosshair, xhRef } = this.renderVals();
    return (
<main ref={rootRef} style={{ position: "relative", minHeight: "100vh" }}><div style={{ position: "fixed", inset: "0", pointerEvents: "none", zIndex: "0", backgroundImage: "linear-gradient(rgba(8,8,157,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(8,8,157,.05) 1px,transparent 1px)", backgroundSize: "96px 96px" }} />{showBoot ? (<><div ref={bootRef} style={{ position: "fixed", inset: "0", zIndex: "10000" }}><div data-k="bg" style={{ position: "absolute", inset: "0", background: "#E5E5E5" }} /><div data-k="grid" style={{ position: "absolute", inset: "0", backgroundImage: "linear-gradient(rgba(8,8,157,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(8,8,157,.06) 1px,transparent 1px)", backgroundSize: "24px 24px" }} /><div data-k="hud" style={{ position: "absolute", inset: "0", padding: "22px clamp(20px,3vw,40px)", font: "500 11px/1.6 'Geist Mono',monospace", letterSpacing: ".06em", textTransform: "uppercase", color: "#23232D" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}><div style={{ display: "flex", flexDirection: "column", gap: "2px" }}><span>abril.codes</span><span style={{ color: "#08089D" }}>boot · v26.10</span></div><div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}><span data-k="hex" style={{ font: "500 44px/1 'Geist Mono',monospace", color: "#08089D", letterSpacing: "-.02em" }}>0x00</span><span style={{ opacity: ".5" }}>/ 0xFF</span></div></div><div style={{ position: "absolute", left: "clamp(20px,3vw,40px)", top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: "6px" }}><div data-step="1" style={{ opacity: ".22", display: "flex", gap: "14px" }}><span style={{ color: "#08089D" }}>001</span><span>Parse icon-blue.svg</span><span data-ok="1" style={{ color: "#0A0AE4", opacity: "0" }}>ok</span></div><div data-step="1" style={{ opacity: ".22", display: "flex", gap: "14px" }}><span style={{ color: "#08089D" }}>002</span><span>Trace path[0] · 9 nodes</span><span data-ok="1" style={{ color: "#0A0AE4", opacity: "0" }}>ok</span></div><div data-step="1" style={{ opacity: ".22", display: "flex", gap: "14px" }}><span style={{ color: "#08089D" }}>003</span><span>Trace path[1] · 3 nodes</span><span data-ok="1" style={{ color: "#0A0AE4", opacity: "0" }}>ok</span></div><div data-step="1" style={{ opacity: ".22", display: "flex", gap: "14px" }}><span style={{ color: "#08089D" }}>004</span><span>Resolve bézier handles</span><span data-ok="1" style={{ color: "#0A0AE4", opacity: "0" }}>ok</span></div><div data-step="1" style={{ opacity: ".22", display: "flex", gap: "14px" }}><span style={{ color: "#08089D" }}>005</span><span>Fill #08089D</span><span data-ok="1" style={{ color: "#0A0AE4", opacity: "0" }}>ok</span></div><div data-step="1" style={{ opacity: ".22", display: "flex", gap: "14px" }}><span style={{ color: "#08089D" }}>006</span><span>Mount /hero</span><span data-ok="1" style={{ color: "#0A0AE4", opacity: "0" }}>ok</span></div></div><div data-k="path" style={{ position: "absolute", left: "clamp(20px,3vw,40px)", bottom: "22px", width: "min(560px,58vw)", height: "3.2em", overflow: "hidden", font: "400 11px/1.6 'Geist Mono',monospace", textTransform: "none", letterSpacing: "0", color: "#08089D", wordBreak: "break-all" }} /><div style={{ position: "absolute", right: "clamp(20px,3vw,40px)", bottom: "22px", textAlign: "right", display: "flex", flexDirection: "column", gap: "2px" }}><span>decompiling vector</span><span style={{ color: "#08089D" }}>viewBox 0 0 41 38</span></div></div><div style={{ position: "absolute", inset: "0", display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}><div data-k="logo" style={{ width: "min(30vw,300px)", transformOrigin: "47.8% 73.3%", willChange: "transform" }}><svg viewBox="-5 -3 50 45" style={{ display: "block", width: "100%", height: "auto", overflow: "visible" }}><g data-k="guides"><rect x="0" y="0" width="41" height="38" fill="none" stroke="rgba(8,8,157,.35)" strokeWidth=".07" strokeDasharray=".5 .5" /><text x="20.5" y="-1.1" fontSize="1.25" textAnchor="middle" fill="#08089D" fontFamily="Geist Mono, monospace">41.00</text><text x="42.4" y="19" fontSize="1.25" fill="#08089D" fontFamily="Geist Mono, monospace">38.00</text><line x1="17.9" y1="30" x2="19.9" y2="30" stroke="#0A0AE4" strokeWidth=".07" /><line x1="18.9" y1="29" x2="18.9" y2="31" stroke="#0A0AE4" strokeWidth=".07" /></g><path data-k="p1" pathLength="1" d="M17.9831 2.73458L1.42929 30.9537C-3.75614 39.2258 6.66652 31.4371 8.91984 34.8139L16.0399 23.0668C17.1627 21.2143 19.8186 21.126 21.062 22.8998L27.0464 31.4371L34.7479 27.2287C36.7318 26.1446 37.4246 23.6347 36.28 21.6851C32.7205 15.6218 27.5699 6.78344 25.3471 2.73458C22.6281 -2.21801 19.3049 0.671002 17.9831 2.73458Z" fill="#08089D" fillOpacity="0" stroke="#08089D" strokeWidth=".2" strokeDasharray="1" strokeDashoffset="1" /><path data-k="p2" pathLength="1" d="M39.5085 26.9347C44.2679 36.865 36.6306 40.4382 30.7085 36.3192C28.7506 34.9575 29.4637 32.1623 31.5792 31.0613L39.5085 26.9347Z" fill="#08089D" fillOpacity="0" stroke="#08089D" strokeWidth=".2" strokeDasharray="1" strokeDashoffset="1" /><g data-k="handles" stroke="#0A0AE4" strokeWidth=".08" fill="#E5E5E5"><g data-n="1" opacity="0"><line x1="1.43" y1="30.95" x2="-3.76" y2="39.23" /><circle cx="-3.76" cy="39.23" r=".38" /></g><g data-n="1" opacity="0"><line x1="8.92" y1="34.81" x2="6.67" y2="31.44" /><circle cx="6.67" cy="31.44" r=".38" /></g><g data-n="1" opacity="0"><line x1="16.04" y1="23.07" x2="17.16" y2="21.21" /><circle cx="17.16" cy="21.21" r=".38" /></g><g data-n="1" opacity="0"><line x1="21.06" y1="22.9" x2="19.82" y2="21.13" /><circle cx="19.82" cy="21.13" r=".38" /></g><g data-n="1" opacity="0"><line x1="34.75" y1="27.23" x2="36.73" y2="26.14" /><circle cx="36.73" cy="26.14" r=".38" /></g><g data-n="1" opacity="0"><line x1="36.28" y1="21.69" x2="32.72" y2="15.62" /><circle cx="32.72" cy="15.62" r=".38" /></g><g data-n="1" opacity="0"><line x1="25.35" y1="2.73" x2="27.57" y2="6.78" /><circle cx="27.57" cy="6.78" r=".38" /></g><g data-n="1" opacity="0"><line x1="25.35" y1="2.73" x2="22.63" y2="-2.22" /><circle cx="22.63" cy="-2.22" r=".38" /></g><g data-n="1" opacity="0"><line x1="39.51" y1="26.93" x2="44.27" y2="36.87" /><circle cx="44.27" cy="36.87" r=".38" /></g><g data-n="1" opacity="0"><line x1="30.71" y1="36.32" x2="36.63" y2="40.44" /><circle cx="36.63" cy="40.44" r=".38" /></g></g><g data-k="nodes" fill="#fff" stroke="#08089D" strokeWidth=".12"><rect data-n="1" opacity="0" x="17.48" y="2.23" width="1" height="1" /><rect data-n="1" opacity="0" x=".93" y="30.45" width="1" height="1" /><rect data-n="1" opacity="0" x="8.42" y="34.31" width="1" height="1" /><rect data-n="1" opacity="0" x="15.54" y="22.57" width="1" height="1" /><rect data-n="1" opacity="0" x="20.56" y="22.4" width="1" height="1" /><rect data-n="1" opacity="0" x="26.55" y="30.94" width="1" height="1" /><rect data-n="1" opacity="0" x="34.25" y="26.73" width="1" height="1" /><rect data-n="1" opacity="0" x="35.78" y="21.19" width="1" height="1" /><rect data-n="1" opacity="0" x="24.85" y="2.23" width="1" height="1" /><rect data-n="1" opacity="0" x="39.01" y="26.43" width="1" height="1" /><rect data-n="1" opacity="0" x="30.21" y="35.82" width="1" height="1" /><rect data-n="1" opacity="0" x="31.08" y="30.56" width="1" height="1" /></g></svg></div></div></div></>) : null}<nav ref={navRef} style={{ position: "fixed", top: "0", left: "0", right: "0", zIndex: "60", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", padding: "16px clamp(20px,3vw,40px)", borderBottom: "1px solid transparent", transition: "background .3s,border-color .3s" }}><a href="#top" onClick={goTop} data-mag="1" style={{ display: "flex", alignItems: "center", gap: "8px", transition: "transform .25s cubic-bezier(.16,1,.3,1)" }}><img src="/images/icon-blue.svg" alt="Abril Codes" style={{ width: "30px", height: "auto", display: "block" }} /><img src="/images/icon-text.svg" alt="" style={{ width: "112px", height: "auto", display: "block" }} /></a>{wide ? (<><div style={{ display: "flex", alignItems: "center", gap: "clamp(16px,3vw,40px)", font: "500 12px/1 'Geist Mono',monospace", letterSpacing: ".08em", textTransform: "uppercase" }}><a className="ac-h1" href="#work" onClick={goWork} style={{ color: "#23232D", display: "flex", gap: "8px" }}><span style={{ color: "#0A0AE4" }}>01</span>{t.navWork}</a>{showStatus ? (<><a className="ac-h2" href="#whoami" onClick={goWho} style={{ color: "#23232D", display: "flex", gap: "8px", textTransform: "none" }}><span style={{ color: "#0A0AE4" }}>02</span>whoami</a></>) : null}<a className="ac-h3" href="#contact" onClick={goContact} style={{ color: "#23232D", display: "flex", gap: "8px" }}><span style={{ color: "#0A0AE4" }}>03</span>{t.navContact}</a></div></>) : null}<div style={{ display: "flex", alignItems: "center", gap: "12px" }}>{showPill ? (<><a href="#whoami" onClick={goWho} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 12px", border: "1px solid rgba(8,8,157,.25)", borderRadius: "999px", font: "500 11px/1 'Geist Mono',monospace", letterSpacing: ".06em", textTransform: "uppercase", color: "#08089D", background: "rgba(240,240,240,.6)" }}><span data-k="pulse" style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#0A0AE4" }} />{t.status}
      </a></>) : null}<div style={{ display: "flex", alignItems: "center", border: "1px solid rgba(8,8,157,.25)", borderRadius: "999px", padding: "3px", font: "500 11px/1 'Geist Mono',monospace" }}><button onClick={setEn} style={{ border: "0", borderRadius: "999px", padding: "6px 10px", font: "inherit", background: enBg, color: enFg, transition: "background .2s" }}>EN</button><button onClick={setEs} style={{ border: "0", borderRadius: "999px", padding: "6px 10px", font: "inherit", background: esBg, color: esFg, transition: "background .2s" }}>ES</button></div></div></nav><section id="top" ref={heroRef} onMouseDown={onHeroDown} style={{ position: "relative", zIndex: "1", minHeight: "100vh", userSelect: "none", overflow: "hidden" }}><div ref={heroInnerRef} style={{ position: "relative", display: "grid", gridTemplateColumns: heroCols, gap: "clamp(24px,4vw,64px)", alignItems: "end", maxWidth: "1440px", minHeight: "100vh", margin: "0 auto", padding: "clamp(96px,14vh,140px) clamp(20px,3vw,40px) clamp(40px,7vh,64px)", transformOrigin: "50% 45%" }}><div data-id="left" style={{ position: "relative", zIndex: "2", display: "flex", flexDirection: "column", gap: "28px", paddingBottom: "30px", minWidth: "0" }}><span data-id="label" style={{ alignSelf: "flex-start", font: "500 12px/1 'Geist Mono',monospace", letterSpacing: ".08em", textTransform: "uppercase", color: "#08089D" }}>{t.heroLabel}</span><h1 style={{ fontWeight: "500", fontSize: "clamp(48px,7.6vw,148px)", lineHeight: ".88", letterSpacing: "-.05em", display: "flex", flexDirection: "column", margin: "0" }}><span data-id="n1" style={{ color: "#23232D", alignSelf: "flex-start" }}>David</span><span data-id="n2" style={{ color: "#08089D", fontWeight: "600", alignSelf: "flex-start", whiteSpace: "nowrap" }}>Abril Perrig</span></h1><p data-id="line" style={{ alignSelf: "flex-start", fontSize: "clamp(18px,1.6vw,24px)", lineHeight: "1.35", color: "#332F2B", maxWidth: "24ch", textWrap: "pretty" }}>{t.heroLine}</p><div style={{ display: "flex", alignItems: "center", gap: "22px", flexWrap: "wrap" }}><a className="ac-h4" data-id="cta" data-mag="1" href="#contact" onClick={goContact} style={{ display: "inline-flex", alignItems: "center", gap: "10px", height: "56px", padding: "0 24px 0 28px", borderRadius: "999px", background: "#08089D", color: "#fff", fontWeight: "500", fontSize: "17px", transition: "background .2s,transform .25s cubic-bezier(.16,1,.3,1)" }}>{t.cta}<i className="ph ph-arrow-up-right" style={{ fontSize: "18px" }} /></a><a className="ac-h5" href="#work" onClick={goWork} style={{ display: "inline-flex", alignItems: "center", gap: "8px", font: "500 12px/1 'Geist Mono',monospace", letterSpacing: ".08em", textTransform: "uppercase", color: "#23232D" }}><i className="ph ph-arrow-down" style={{ fontSize: "14px" }} />{t.seeWork}</a><span style={{ display: "inline-flex", alignItems: "center", gap: "6px", font: "500 10px/1 'Geist Mono',monospace", letterSpacing: ".06em", textTransform: "uppercase", color: "#08089D" }}><i className="ph ph-selection-plus" style={{ fontSize: "13px", color: "#0A0AE4" }} />{t.hint}</span></div></div><div style={{ display: "flex", justifyContent: frameJustify, alignItems: "flex-end", minWidth: "0", marginBottom: "calc(-1 * clamp(40px,7vh,64px))" }}><div data-id="frame" ref={frameRef} style={{ position: "relative", flex: "none", height: frameH, minHeight: frameMin, aspectRatio: "700/888", maxWidth: "100%" }}><img data-k="shadow" src="/images/david-shadow.webp" alt="" draggable="false" style={{ position: "absolute", left: "0", top: "0", width: "100%", height: "100%", zIndex: "0", opacity: ".14", mixBlendMode: "multiply", filter: "blur(8px)", transformOrigin: "50% 100%", transform: "translate(4%,0) skewX(-5deg)", WebkitMaskImage: "linear-gradient(#000 58%,transparent 84%)", maskImage: "linear-gradient(#000 58%,transparent 84%)", willChange: "transform,filter", pointerEvents: "none" }} /><img data-k="fig" src="/images/david-cutout.webp" alt="David Abril Perrig" draggable="false" style={{ position: "relative", zIndex: "1", WebkitMaskImage: "linear-gradient(#000 66%,transparent 90%)", maskImage: "linear-gradient(#000 66%,transparent 90%)", display: "block", width: "100%", height: "100%", objectFit: "contain", objectPosition: "center bottom" }} /><div style={{ position: "absolute", left: "-4%", right: "-4%", bottom: "clamp(40px,7vh,64px)", zIndex: "3", display: "flex", flexDirection: "column", gap: "9px", pointerEvents: "none" }}><div style={{ height: "1px", background: "#08089D", position: "relative" }}><span style={{ position: "absolute", left: "0", top: "-4px", width: "1px", height: "9px", background: "#08089D" }} /><span style={{ position: "absolute", left: "25%", top: "-3px", width: "1px", height: "7px", background: "#08089D" }} /><span style={{ position: "absolute", left: "50%", top: "-5px", width: "1px", height: "11px", background: "#0A0AE4" }} /><span style={{ position: "absolute", left: "75%", top: "-3px", width: "1px", height: "7px", background: "#08089D" }} /><span style={{ position: "absolute", right: "0", top: "-4px", width: "1px", height: "9px", background: "#08089D" }} /></div><div style={{ display: "flex", justifyContent: "space-between", gap: "12px", font: "500 10px/1 'Geist Mono',monospace", letterSpacing: ".08em", textTransform: "uppercase", color: "#08089D" }}><span>david_abril.bin</span><span style={{ color: "#0A0AE4" }}>31.42°S · 64.18°W</span><span>0x00 — 0xFF</span></div></div></div></div></div><div ref={xrayRef} style={{ position: "absolute", inset: "0", zIndex: "5", pointerEvents: "none", clipPath: "inset(50% 50% 50% 50%)", background: "#030318", color: "#8E8EFF" }}><div style={{ position: "absolute", inset: "0", backgroundImage: "linear-gradient(rgba(142,142,255,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(142,142,255,.12) 1px,transparent 1px)", backgroundSize: "24px 24px" }} /><pre style={{ position: "absolute", left: "clamp(20px,3vw,40px)", top: "84px", font: "400 10px/1.6 'Geist Mono',monospace", color: "#6969EC", opacity: ".32" }}>{hexDump}</pre><pre style={{ position: "absolute", right: "clamp(20px,3vw,40px)", top: "84px", font: "400 10px/1.6 'Geist Mono',monospace", color: "#6969EC", opacity: ".32", textAlign: "right" }}>{hexDump2}</pre><div data-par="left" style={{ position: "absolute", inset: "0" }}><div data-for="label" style={{ position: "absolute", outline: "1px dashed rgba(142,142,255,.6)", font: "500 12px/1 'Geist Mono',monospace", letterSpacing: ".08em", textTransform: "uppercase", color: "#8E8EFF", whiteSpace: "nowrap" }}>{t.heroLabel}</div><span data-for="n1" data-font="1" style={{ position: "absolute", display: "block", fontFamily: "'Geist',sans-serif", fontWeight: "500", letterSpacing: "-.05em", color: "transparent", WebkitTextStroke: "1px #8E8EFF", outline: "1px dashed rgba(142,142,255,.6)", whiteSpace: "nowrap" }}>David<span data-lab="h1 › span[0] · Geist 500" style={{ position: "absolute", left: "-1px", bottom: "100%", marginBottom: "5px", font: "500 10px/1.4 'Geist Mono',monospace", letterSpacing: ".04em", color: "#030318", background: "#8E8EFF", padding: "1px 6px", whiteSpace: "nowrap", WebkitTextStroke: "0" }}>h1 › span[0]</span></span><span data-for="n2" data-font="1" style={{ position: "absolute", display: "block", fontFamily: "'Geist',sans-serif", fontWeight: "600", letterSpacing: "-.05em", color: "transparent", WebkitTextStroke: "1px #8E8EFF", outline: "1px dashed rgba(142,142,255,.6)", whiteSpace: "nowrap" }}>Abril Perrig<span data-lab="h1 › span[1] · Geist 600" style={{ position: "absolute", right: "-1px", top: "100%", marginTop: "5px", font: "500 10px/1.4 'Geist Mono',monospace", letterSpacing: ".04em", color: "#030318", background: "#8E8EFF", padding: "1px 6px", whiteSpace: "nowrap", WebkitTextStroke: "0" }}>h1 › span[1]</span></span><div data-for="line" data-font="1" style={{ position: "absolute", fontFamily: "'Geist',sans-serif", color: "#8E8EFF", outline: "1px dashed rgba(142,142,255,.6)", textWrap: "pretty" }}>{t.heroLine}</div><div data-for="cta" style={{ position: "absolute", border: "1px dashed #8E8EFF", borderRadius: "999px", display: "flex", alignItems: "center", justifyContent: "center", font: "500 11px/1 'Geist Mono',monospace", color: "#8E8EFF" }}>a.cta[data-mag]</div></div><div data-par="frame" style={{ position: "absolute", inset: "0" }}><canvas data-for="frame" data-k="ascii" style={{ position: "absolute" }} /><div data-for="frame" style={{ position: "absolute", outline: "1px dashed rgba(142,142,255,.6)" }}><span style={{ position: "absolute", left: "-1px", bottom: "100%", marginBottom: "5px", font: "500 10px/1.4 'Geist Mono',monospace", color: "#030318", background: "#8E8EFF", padding: "1px 6px", whiteSpace: "nowrap" }}>img → ascii · 64 cols</span></div></div><span style={{ position: "absolute", right: "clamp(20px,3vw,40px)", bottom: "20px", font: "500 10px/1 'Geist Mono',monospace", letterSpacing: ".1em", color: "#6969EC" }}>SOURCE VIEW</span></div><div ref={marqRef} style={{ position: "absolute", zIndex: "6", left: "0", top: "0", width: "0", height: "0", border: "1px solid #0A0AE4", pointerEvents: "none", opacity: "0" }}><span style={{ position: "absolute", left: "-4px", top: "-4px", width: "7px", height: "7px", background: "#fff", border: "1px solid #0A0AE4" }} /><span style={{ position: "absolute", right: "-4px", top: "-4px", width: "7px", height: "7px", background: "#fff", border: "1px solid #0A0AE4" }} /><span style={{ position: "absolute", left: "-4px", bottom: "-4px", width: "7px", height: "7px", background: "#fff", border: "1px solid #0A0AE4" }} /><span style={{ position: "absolute", right: "-4px", bottom: "-4px", width: "7px", height: "7px", background: "#fff", border: "1px solid #0A0AE4" }} /><span data-k="tl" style={{ position: "absolute", left: "-1px", bottom: "100%", marginBottom: "6px", font: "500 10px/1.4 'Geist Mono',monospace", color: "#fff", background: "#0A0AE4", padding: "1px 6px", whiteSpace: "nowrap" }}>[0,0]</span><span data-k="sz" style={{ position: "absolute", right: "-1px", bottom: "100%", marginBottom: "6px", font: "500 10px/1.4 'Geist Mono',monospace", color: "#8E8EFF", background: "#030318", padding: "1px 6px", whiteSpace: "nowrap" }}>0 × 0</span><span data-k="br" style={{ position: "absolute", right: "-1px", top: "100%", marginTop: "6px", font: "500 10px/1.4 'Geist Mono',monospace", color: "#fff", background: "#0A0AE4", padding: "1px 6px", whiteSpace: "nowrap" }}>[0,0]</span></div></section><section id="work" style={{ position: "relative", zIndex: "1", paddingTop: "clamp(80px,12vh,140px)" }}><div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 clamp(20px,3vw,40px)", display: "flex", flexDirection: "column", gap: "18px" }}><span style={{ font: "500 12px/1 'Geist Mono',monospace", letterSpacing: ".08em", textTransform: "uppercase", color: "#08089D" }}>[ 01 ] {t.navWork}</span><div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "24px", flexWrap: "wrap" }}><h2 data-rv="1" style={{ fontWeight: "500", fontSize: "clamp(44px,6.4vw,112px)", lineHeight: ".92", letterSpacing: "-.045em", maxWidth: "13ch" }}>{t.workTitle}</h2><span style={{ display: "flex", alignItems: "center", gap: "8px", font: "500 12px/1 'Geist Mono',monospace", letterSpacing: ".08em", textTransform: "uppercase", color: "#23232D" }}><i className="ph ph-mouse-scroll" style={{ fontSize: "16px", color: "#0A0AE4" }} />{t.workHint}</span></div></div><div style={{ overflow: "hidden", marginTop: "36px", borderTop: "1px solid rgba(8,8,157,.15)", borderBottom: "1px solid rgba(8,8,157,.15)", padding: "10px 0" }}><div data-k="hexrun" style={{ display: "flex", width: "max-content", whiteSpace: "nowrap", font: "400 12px/1 'Geist Mono',monospace", color: "#08089D", opacity: ".7" }}><span style={{ paddingRight: "24px" }}>{hexRun}</span><span style={{ paddingRight: "24px" }}>{hexRun}</span></div></div><div ref={pinRef} style={{ position: "relative", height: pinH }}><div style={{ position: "sticky", top: "0", height: "100vh", overflow: "hidden" }}>{(featured || []).map((p, $index) => (<React.Fragment key={$index}><div data-proj="1" style={{ position: "absolute", inset: "0", display: "grid", gridTemplateColumns: stageCols, alignItems: "center", gap: stageGap, alignContent: "center", maxWidth: "1440px", margin: "0 auto", padding: stagePad }}><div data-k="txt" style={{ display: "flex", flexDirection: "column", gap: txtGap, minWidth: "0" }}><div style={{ display: "flex", alignItems: "center", gap: "14px", font: "500 12px/1 'Geist Mono',monospace", letterSpacing: ".08em", color: "#0A0AE4" }}><span>{p.idx} / 02</span><span style={{ flex: "1", maxWidth: "120px", height: "1px", background: "rgba(8,8,157,.3)" }} /><span style={{ color: "#23232D", textTransform: "uppercase" }}>{p.kind}</span></div>{wide ? (<><img src={p.logo} alt="" style={{ height: "60px", width: "auto", alignSelf: "flex-start", borderRadius: "14px", display: "block" }} /></>) : null}<h3 style={{ fontWeight: "600", fontSize: "clamp(40px,4.6vw,80px)", lineHeight: ".95", letterSpacing: "-.04em" }}>{p.title}</h3><p style={{ fontSize: "clamp(17px,1.4vw,21px)", lineHeight: "1.4", color: "#332F2B", maxWidth: "32ch", textWrap: "pretty" }}>{p.line}</p><div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>{(p.facts || []).map((f, $index) => (<React.Fragment key={$index}><div style={{ display: "flex", gap: "10px", alignItems: "center", fontSize: "16px", color: "#23232D" }}><i className="ph ph-arrow-right" style={{ color: "#0A0AE4", fontSize: "15px" }} /><span>{f}</span></div></React.Fragment>))}</div>{wide ? (<><div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>{(p.stack || []).map((s, $index) => (<React.Fragment key={$index}><span style={{ padding: "6px 10px", border: "1px solid rgba(8,8,157,.25)", borderRadius: "999px", font: "500 11px/1 'Geist Mono',monospace", color: "#08089D" }}>{s}</span></React.Fragment>))}</div></>) : null}{p.url ? (<><a className="ac-h6" href={p.url} target="_blank" data-mag="1" style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: "8px", height: "44px", padding: "0 18px", borderRadius: "999px", border: "1px solid #08089D", font: "500 12px/1 'Geist Mono',monospace", letterSpacing: ".04em", color: "#08089D", transition: "background .2s,color .2s,transform .25s cubic-bezier(.16,1,.3,1)" }}>{p.urlLabel}<i className="ph ph-arrow-up-right" /></a></>) : null}</div><div style={{ position: "relative", height: rigH, display: "flex", alignItems: "center", justifyContent: "center", perspective: "1800px", minWidth: "0" }}><div data-k="rig" style={{ position: "relative", height: "100%", aspectRatio: "9/19.5", transformStyle: "preserve-3d" }}><div data-k="sl" style={{ position: "absolute", inset: "0", borderRadius: "26px", overflow: "hidden", opacity: "0", border: "1px solid rgba(8,8,157,.2)", background: "#f0f0f0" }}><img data-k="slimg" src={p.img1} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /></div><div data-k="sr" style={{ position: "absolute", inset: "0", borderRadius: "26px", overflow: "hidden", opacity: "0", border: "1px solid rgba(8,8,157,.2)", background: "#f0f0f0" }}><img data-k="srimg" src={p.img2} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /></div><div data-k="l0" style={{ position: "absolute", inset: "0", borderRadius: "26px", background: "#030318", padding: "22px 20px", display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "visible", boxShadow: "0 0 0 1px rgba(142,142,255,.25)" }}><pre style={{ font: "400 11px/1.6 'Geist Mono',monospace", color: "#8E8EFF", whiteSpace: "pre", overflow: "hidden" }}>{p.code}</pre><pre style={{ font: "400 9px/1.6 'Geist Mono',monospace", color: "#6969EC", opacity: ".6", overflow: "hidden", whiteSpace: "pre" }}>{p.hex}</pre><span data-k="lab" style={{ position: "absolute", left: "calc(100% + 18px)", top: "18px", font: "500 10px/1.4 'Geist Mono',monospace", color: "#08089D", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "8px" }}><span style={{ width: "14px", height: "1px", background: "#08089D" }} />L0 · {p.file}</span></div><div data-k="l1" style={{ position: "absolute", inset: "0", borderRadius: "26px", border: "1.5px dashed #0A0AE4", background: "rgba(240,240,240,.55)", padding: "16px", display: "flex", flexDirection: "column", gap: "10px" }}><div style={{ height: "30px", border: "1px dashed #0A0AE4", borderRadius: "8px" }} /><div style={{ flex: "1", border: "1px dashed #0A0AE4", borderRadius: "12px", background: "repeating-linear-gradient(45deg,rgba(10,10,228,.06) 0 6px,transparent 6px 12px)" }} /><div style={{ height: "38px", border: "1px dashed #0A0AE4", borderRadius: "8px" }} /><div style={{ height: "38px", border: "1px dashed #0A0AE4", borderRadius: "8px" }} /><div style={{ height: "44px", border: "1px solid #0A0AE4", borderRadius: "999px" }} /><span data-k="lab" style={{ position: "absolute", left: "calc(100% + 18px)", top: "18px", font: "500 10px/1.4 'Geist Mono',monospace", color: "#08089D", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "8px" }}><span style={{ width: "14px", height: "1px", background: "#08089D" }} />L1 · wireframe</span></div><div data-k="l2" style={{ position: "absolute", inset: "0", borderRadius: "26px", boxShadow: "0 30px 60px -24px rgba(3,3,55,.45),0 0 0 1px rgba(8,8,157,.18)" }}><div style={{ position: "absolute", inset: "0", borderRadius: "26px", overflow: "hidden", background: "#f0f0f0" }}><img data-k="ui" src={p.img0} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /></div><span data-k="lab" style={{ position: "absolute", left: "calc(100% + 18px)", top: "18px", font: "500 10px/1.4 'Geist Mono',monospace", color: "#08089D", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "8px" }}><span style={{ width: "14px", height: "1px", background: "#08089D" }} />L2 · ui build</span></div></div></div></div></React.Fragment>))}<div style={{ position: "absolute", left: "clamp(20px,3vw,40px)", right: "clamp(20px,3vw,40px)", bottom: "26px", display: "flex", alignItems: "center", gap: "16px", font: "500 11px/1 'Geist Mono',monospace", color: "#08089D" }}><span>01</span><div style={{ flex: "1", height: "2px", background: "rgba(8,8,157,.15)", position: "relative" }}><div data-k="bar" style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "0", background: "#08089D" }} /></div><span>02</span></div></div></div><div style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(40px,8vh,96px) clamp(20px,3vw,40px) 0" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "20px", font: "500 12px/1 'Geist Mono',monospace", letterSpacing: ".08em", textTransform: "uppercase", color: "#08089D" }}><span>[ 01.b ] {t.moreTitle}</span><span>{bentoCount}</span></div><div ref={bentoRef} onMouseMove={onBentoMove} style={{ display: "grid", gridTemplateColumns: tileCols, gridAutoRows: "minmax(250px,auto)", gap: "12px" }}>{(bento || []).map((b, $index) => (<React.Fragment key={$index}><article className="ac-h7" data-rv="1" data-tile="1" style={{ gridColumn: `span ${b.span}`, position: "relative", overflow: "hidden", borderRadius: "18px", border: "1px solid rgba(8,8,157,.14)", background: "radial-gradient(420px circle at var(--mx,-999px) var(--my,-999px),rgba(10,10,228,.13),transparent 60%),#f0f0f0", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "18px", transition: "border-color .25s" }}><div style={{ position: "relative", height: "112px", borderRadius: "10px", background: "#030318", overflow: "hidden" }}><div style={{ position: "absolute", inset: "0", WebkitMaskImage: "linear-gradient(transparent,#000 28%,#000 72%,transparent)", maskImage: "linear-gradient(transparent,#000 28%,#000 72%,transparent)" }}><div data-reel="1" style={{ display: "flex", flexDirection: "column", padding: "0 14px", font: "400 11px/1.4 'Geist Mono',monospace", color: "#8E8EFF" }}>{(b.reel || []).map((ln, $index) => (<React.Fragment key={$index}><span style={{ whiteSpace: "nowrap", padding: "3px 0" }}>{ln}</span></React.Fragment>))}</div></div></div><div style={{ display: "flex", flexDirection: "column", gap: "8px" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "12px" }}><h4 style={{ fontWeight: "600", fontSize: "24px", letterSpacing: "-.02em" }}>{b.title}</h4><span style={{ font: "500 11px/1 'Geist Mono',monospace", color: "#0A0AE4" }}>{b.idx}</span></div><p style={{ color: "#332F2B", fontSize: "15px", lineHeight: "1.4", maxWidth: "42ch", textWrap: "pretty" }}>{b.line}</p><div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "4px" }}>{(b.tech || []).map((s, $index) => (<React.Fragment key={$index}><span style={{ padding: "5px 9px", border: "1px solid rgba(8,8,157,.22)", borderRadius: "999px", font: "500 10px/1 'Geist Mono',monospace", color: "#08089D" }}>{s}</span></React.Fragment>))}</div>{b.url ? (<><a className="ac-h8" href={b.url} target="_blank" rel="noopener" data-mag="1" style={{ alignSelf: "flex-start", marginTop: "6px", display: "inline-flex", alignItems: "center", gap: "7px", font: "500 11px/1 'Geist Mono',monospace", letterSpacing: ".04em", color: "#0A0AE4", borderBottom: "1px solid rgba(10,10,228,.35)", paddingBottom: "4px" }}>{b.urlLabel}<i className="ph ph-arrow-up-right" style={{ fontSize: "12px" }} /></a></>) : null}</div></article></React.Fragment>))}</div></div></section>{showStatus ? (<><section id="whoami" style={{ position: "relative", zIndex: "1", padding: "clamp(100px,16vh,180px) 0 clamp(80px,12vh,140px)" }}><div style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 clamp(20px,3vw,40px)", display: "flex", flexDirection: "column", gap: "44px" }}><div style={{ display: "flex", flexDirection: "column", gap: "18px" }}><span style={{ font: "500 12px/1 'Geist Mono',monospace", letterSpacing: ".08em", color: "#08089D" }}>[ 02 ] WHOAMI</span><h2 data-rv="1" style={{ fontWeight: "500", fontSize: "clamp(48px,7vw,128px)", lineHeight: ".9", letterSpacing: "-.05em", display: "flex", alignItems: "baseline", gap: ".14em" }}>{t.whoTitle}<span data-k="caret" style={{ display: "inline-block", width: ".4em", height: ".74em", background: "#0A0AE4" }} /></h2><p data-rv="1" style={{ fontSize: "clamp(18px,1.6vw,24px)", lineHeight: "1.4", color: "#332F2B", maxWidth: "46ch", textWrap: "pretty" }}>{t.whoRoles}</p></div><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,440px),1fr))", gap: "12px" }}><div data-rv="1" style={{ borderRadius: "20px", background: "#030318", color: "#f0f0f0", padding: "28px clamp(20px,3vw,36px)", font: "400 clamp(12px,1.05vw,14px)/1.8 'Geist Mono',monospace", overflow: "hidden" }}><div style={{ color: "#6969EC", marginBottom: "10px" }}>$ whoami --json</div>{(json || []).map((l, $index) => (<React.Fragment key={$index}><div data-rv="line" style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}><span>{l.ind}</span><span style={{ color: "#8E8EFF" }}>{l.key}</span><span style={{ color: "#6969EC" }}>{l.col}</span><span style={{ color: "#f0f0f0" }}>{l.val}</span><span style={{ color: "#6969EC" }}>{l.end}</span></div></React.Fragment>))}</div><div style={{ display: "flex", flexDirection: "column", gap: "12px", minWidth: "0" }}><div data-rv="1" style={{ borderRadius: "20px", background: "#f0f0f0", border: "1px solid rgba(8,8,157,.14)", padding: "24px 26px", display: "flex", flexDirection: "column", gap: "18px" }}><span style={{ font: "500 11px/1 'Geist Mono',monospace", letterSpacing: ".08em", textTransform: "uppercase", color: "#08089D" }}>{t.stack}</span><div style={{ display: "grid", gridTemplateColumns: "96px minmax(0,1fr)", gap: "14px", alignItems: "start" }}><span style={{ font: "500 11px/30px 'Geist Mono',monospace", letterSpacing: ".06em", textTransform: "uppercase", color: "#23232D" }}>{t.core}</span><div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>{(core || []).map((c, $index) => (<React.Fragment key={$index}><span style={{ padding: "8px 13px", borderRadius: "999px", background: "#08089D", color: "#fff", fontSize: "14px", lineHeight: "1" }}>{c}</span></React.Fragment>))}</div><span style={{ font: "500 11px/30px 'Geist Mono',monospace", letterSpacing: ".06em", textTransform: "uppercase", color: "#23232D" }}>{t.learning}</span><div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>{(learning || []).map((c, $index) => (<React.Fragment key={$index}><span style={{ padding: "7px 12px", borderRadius: "999px", border: "1px dashed #0A0AE4", color: "#08089D", fontSize: "14px", lineHeight: "1" }}>{c}</span></React.Fragment>))}</div><span style={{ font: "500 11px/30px 'Geist Mono',monospace", letterSpacing: ".06em", textTransform: "uppercase", color: "#23232D" }}>{t.builds}</span><span style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "15px", lineHeight: "30px", color: "#23232D" }}><i className="ph ph-sparkle" style={{ color: "#0A0AE4", fontSize: "16px" }} />{t.ai}</span></div></div><div data-rv="1" style={{ borderRadius: "20px", background: "#f0f0f0", border: "1px solid rgba(8,8,157,.14)", padding: "24px 26px", display: "flex", flexDirection: "column", gap: "16px", flex: "1" }}><span style={{ font: "500 11px/1 'Geist Mono',monospace", letterSpacing: ".08em", textTransform: "uppercase", color: "#08089D" }}>{t.changelog}</span><div style={{ position: "relative", display: "flex", flexDirection: "column" }}><span data-k="clline" style={{ position: "absolute", left: "97px", top: "10px", bottom: "10px", width: "1px", background: "#08089D", transformOrigin: "top" }} />{(changelog || []).map((r, $index) => (<React.Fragment key={$index}><div data-rv="line" style={{ display: "grid", gridTemplateColumns: "84px 28px minmax(0,1fr)", alignItems: "baseline", padding: "7px 0" }}><span style={{ font: "500 12px/1.4 'Geist Mono',monospace", color: "#0A0AE4" }}>{r.ver}</span><span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#08089D", justifySelf: "center", transform: "translateY(1px)", boxShadow: "0 0 0 3px #f0f0f0" }} /><span style={{ fontSize: "15px", lineHeight: "1.4", color: "#23232D" }}>{r.title} <span style={{ color: "#6b6b78" }}>· {r.place}</span></span></div></React.Fragment>))}<div data-rv="line" style={{ display: "grid", gridTemplateColumns: "84px 28px minmax(0,1fr)", alignItems: "baseline", padding: "7px 0" }}><span style={{ font: "500 12px/1.4 'Geist Mono',monospace", color: "#0A0AE4" }}>v2027.07</span><span style={{ width: "9px", height: "9px", borderRadius: "50%", border: "1.5px dashed #0A0AE4", background: "#f0f0f0", justifySelf: "center", transform: "translateY(1px)" }} /><span style={{ fontSize: "15px", lineHeight: "1.4", color: "#0A0AE4", fontWeight: "500" }}>→ {t.nextStep}</span></div></div></div></div></div></div></section></>) : null}<footer id="contact" style={{ position: "relative", zIndex: "1", maxWidth: "1440px", margin: "0 auto", padding: "clamp(40px,8vh,96px) clamp(20px,3vw,40px) 22px" }}><div style={{ display: "grid", gridTemplateColumns: bentoCols, gridAutoRows: "minmax(160px,auto)", gap: "12px" }}><a className="ac-h9" href="mailto:davidabril411@gmail.com" style={{ gridColumn: "span 2", gridRow: "span 2", position: "relative", overflow: "hidden", borderRadius: "24px", background: "#08089D", color: "#fff", padding: "26px 28px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "340px", transition: "background .25s" }}><img src="/images/icon-white.svg" alt="" style={{ position: "absolute", right: "-60px", top: "-50px", width: "340px", opacity: ".07", pointerEvents: "none" }} /><span style={{ font: "500 12px/1 'Geist Mono',monospace", letterSpacing: ".08em", textTransform: "uppercase", color: "#C5C5FF" }}>[ 03 ] {t.navContact}</span><div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "16px" }}><span style={{ fontWeight: "500", fontSize: "clamp(52px,6.6vw,124px)", lineHeight: ".88", letterSpacing: "-.05em" }}>{t.talk}</span><i className="ph-thin ph-arrow-up-right" style={{ fontSize: "clamp(52px,6vw,112px)", lineHeight: "1" }} /></div></a><div style={{ gridColumn: "span 2", borderRadius: "20px", background: "#f0f0f0", border: "1px solid rgba(8,8,157,.14)", padding: "22px 24px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "16px" }}><span style={{ display: "flex", alignItems: "center", gap: "8px", font: "500 11px/1 'Geist Mono',monospace", letterSpacing: ".08em", textTransform: "uppercase", color: "#08089D" }}><i className="ph ph-envelope-simple" style={{ fontSize: "15px" }} />{t.email}</span><div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}><a className="ac-h10" href="mailto:davidabril411@gmail.com" style={{ fontWeight: "500", fontSize: "clamp(20px,2.2vw,34px)", letterSpacing: "-.02em", color: "#23232D", wordBreak: "break-all" }}>davidabril411@gmail.com</a><button className="ac-h11" onClick={copyEmail} data-mag="1" style={{ display: "inline-flex", alignItems: "center", gap: "8px", height: "40px", padding: "0 16px", borderRadius: "999px", border: "1px solid #08089D", background: "transparent", color: "#08089D", font: "500 11px/1 'Geist Mono',monospace", letterSpacing: ".06em", textTransform: "uppercase", transition: "transform .25s cubic-bezier(.16,1,.3,1),background .2s" }}><i className={copyIcon} style={{ fontSize: "14px" }} />{copyLabel}</button></div></div><a className="ac-h12" href="https://wa.me/543512362542" target="_blank" style={{ gridColumn: `span ${fSpan}`, borderRadius: "20px", background: "#f0f0f0", border: "1px solid rgba(8,8,157,.14)", padding: "22px 24px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "16px", color: "#23232D", transition: "border-color .25s" }}><span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", font: "500 11px/1 'Geist Mono',monospace", letterSpacing: ".08em", textTransform: "uppercase", color: "#08089D" }}><span style={{ display: "flex", alignItems: "center", gap: "8px" }}><i className="ph ph-whatsapp-logo" style={{ fontSize: "15px" }} />WhatsApp</span><i className="ph ph-arrow-up-right" style={{ fontSize: "14px" }} /></span><span style={{ fontWeight: "500", fontSize: "clamp(17px,1.5vw,22px)", letterSpacing: "-.01em" }}>+54 351 236 2542</span></a><div style={{ gridColumn: `span ${fSpan}`, borderRadius: "20px", background: "#f0f0f0", border: "1px solid rgba(8,8,157,.14)", padding: "22px 24px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "12px" }}><span style={{ font: "500 11px/1 'Geist Mono',monospace", letterSpacing: ".08em", textTransform: "uppercase", color: "#08089D" }}>{t.social}</span><div style={{ display: "flex", flexDirection: "column", gap: "10px" }}><a className="ac-h13" href="https://www.linkedin.com/in/david-abril-perrig/" target="_blank" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontWeight: "500", fontSize: "18px", color: "#23232D" }}><span style={{ display: "flex", alignItems: "center", gap: "10px" }}><i className="ph ph-linkedin-logo" style={{ fontSize: "20px" }} />LinkedIn</span><i className="ph ph-arrow-up-right" style={{ fontSize: "14px" }} /></a><a className="ac-h14" href="https://github.com/DavidAbril411" target="_blank" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontWeight: "500", fontSize: "18px", color: "#23232D" }}><span style={{ display: "flex", alignItems: "center", gap: "10px" }}><i className="ph ph-github-logo" style={{ fontSize: "20px" }} />GitHub</span><i className="ph ph-arrow-up-right" style={{ fontSize: "14px" }} /></a></div></div></div><div style={{ marginTop: "28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", flexWrap: "wrap", font: "500 11px/1 'Geist Mono',monospace", letterSpacing: ".06em", textTransform: "uppercase", color: "#23232D" }}><div style={{ display: "flex", alignItems: "center", gap: "8px" }}><img src="/images/icon-blue.svg" alt="" style={{ width: "22px", display: "block" }} /><img src="/images/icon-text.svg" alt="Abril Codes" style={{ width: "88px", display: "block" }} /></div><span style={{ display: "flex", alignItems: "center", gap: "8px" }}><i className="ph ph-map-pin" style={{ fontSize: "13px", color: "#0A0AE4" }} />Córdoba, AR · <span ref={clockRef}>--:--</span></span><button onClick={replay} style={{ display: "inline-flex", alignItems: "center", gap: "8px", border: "0", background: "transparent", padding: "0", font: "inherit", letterSpacing: "inherit", textTransform: "inherit", color: "#08089D" }}><i className="ph ph-arrow-counter-clockwise" style={{ fontSize: "13px" }} />{t.replay}</button><span style={{ textTransform: "none", letterSpacing: "0", color: "#6b6b78" }}>© 2026 David Ignacio Abril Perrig — Abril Codes</span></div></footer>{crosshair ? (<><div ref={xhRef} style={{ position: "fixed", inset: "0", pointerEvents: "none", zIndex: "10050", opacity: "0", transition: "opacity .2s" }}><canvas data-k="trail" style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }} /><div data-k="b" style={{ position: "absolute", left: "0", top: "0", width: "2.8rem", height: "2.8rem", border: "1.25px solid #0A0AE4", background: "rgba(10,10,228,.06)", WebkitBackdropFilter: "saturate(0) contrast(1.08)", backdropFilter: "saturate(0) contrast(1.08)", transform: "translate3d(-100px,-100px,0)", willChange: "transform" }}><span style={{ position: "absolute", inset: "0", backgroundImage: "radial-gradient(circle,rgba(10,10,228,.55) .8px,transparent 1.1px)", backgroundSize: "4px 4px" }} /></div><div data-k="l" style={{ position: "absolute", left: "0", top: "0", font: "500 10px/1.5 'Geist Mono',monospace", letterSpacing: ".06em", color: "#fff", background: "#0A0AE4", padding: "2px 6px", whiteSpace: "nowrap" }}>X:0000PX  Y:0000PX</div></div></>) : null}</main>
    );
  }
}

export default function AbrilSite({ locale = 'en', preloader = true, crosshair = true, showStatus = true }: { locale?: string; preloader?: boolean; crosshair?: boolean; showStatus?: boolean }) {
  return <AbrilSiteView locale={locale} preloader={preloader} crosshair={crosshair} showStatus={showStatus} />;
}
