/* As Quatro Vontades · Capítulo III · motor do sonho
   Névoa que se abre ao toque, texto que se condensa, vela no lugar do número de página,
   voz do Cavaleiro com eco de pedra, e toques que nunca dão para perder. */
(() => {
  const L = window.CAP3, P = L.paginas;
  const $ = (q, el = document) => el.querySelector(q);
  const SUPA = { url: 'https://qoxvlgscpljsrybywivf.supabase.co', key: 'sb_publishable_XvoczGgXZGAezAmabNUBrQ_r25L-7ga' };
  const SAVE = 'livro_cap03';
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const uuid = () => (crypto.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => { const r = (Math.random() * 16) | 0; return (c === 'x' ? r : (r & 3) | 8).toString(16); }));
  let LANG = localStorage.getItem('livro_lang') || ((navigator.language || '').startsWith('pt') ? 'pt' : 'en');
  const U = (k) => L.ui[LANG][k];
  const tx = (o) => (typeof o === 'string' ? o : o[LANG] || o.pt);

  // ---------------------------------------------------------------- estado
  const novo = () => ({ i: 0, lidas: {}, feitos: {}, d: { passos: 0, corredor: null, tEspada: 0, correcoes: 0, tocouEspada: 0, rosto: 0 }, sessao: uuid() });
  const carregar = () => { try { const j = JSON.parse(localStorage.getItem(SAVE)); return j && j.sessao ? j : null; } catch (e) { return null; } };
  let st = carregar() || novo();
  const salvar = () => { try { localStorage.setItem(SAVE, JSON.stringify(st)); } catch (e) {} };
  const antes = () => { try { return JSON.parse(localStorage.getItem('aqv_estado') || '{}'); } catch (e) { return {}; } };

  // ---------------------------------------------------------------- som
  const A = {
    ctx: null, on: true, bufs: {}, zonaAtual: null, ambSrc: null, voz: null,
    init() {
      if (this.ctx) return; const C = window.AudioContext || window.webkitAudioContext; if (!C) return;
      const c = this.ctx = new C();
      this.master = c.createGain(); this.master.connect(c.destination);
      this.amb = c.createGain(); this.amb.gain.value = .85; this.amb.connect(this.master);
      this.vozG = c.createGain(); this.vozG.connect(this.master);
      this.fx = c.createGain(); this.fx.gain.value = .8; this.fx.connect(this.master);
      // eco de pedra: uma reverberação longa feita de ruído que se apaga
      const n = c.sampleRate * 3.6, ir = c.createBuffer(2, n, c.sampleRate);
      for (let ch = 0; ch < 2; ch++) { const d = ir.getChannelData(ch); for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 2.6); }
      this.verb = c.createConvolver(); this.verb.buffer = ir; this.verbG = c.createGain(); this.verbG.gain.value = .55;
      this.verb.connect(this.verbG); this.verbG.connect(this.master);
      this.eco = c.createGain(); this.eco.gain.value = .32; this.eco.connect(this.verb);
      this.vozG.connect(this.eco); this.fx.connect(this.eco);
      const nb = c.createBuffer(1, c.sampleRate, c.sampleRate), nd = nb.getChannelData(0); for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1; this.ruido = nb;
      this.coro();
    },
    resume() { if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume(); },
    setOn(v) { this.on = v; if (this.master) this.master.gain.setTargetAtTime(v ? 1 : 0, this.ctx.currentTime, .15); },
    buf(url) {
      if (!this.ctx) return Promise.resolve(null);
      if (!this.bufs[url]) this.bufs[url] = fetch(url).then((r) => (r.ok ? r.arrayBuffer() : null)).then((ab) => (ab ? this.ctx.decodeAudioData(ab) : null)).catch(() => null);
      return this.bufs[url];
    },
    async zona(nome) {
      if (!this.ctx || !nome || nome === this.zonaAtual) return; this.zonaAtual = nome;
      const b = await this.buf(`assets/audio/${nome}.mp3`); if (!b || this.zonaAtual !== nome) return;
      const c = this.ctx, s = c.createBufferSource(), g = c.createGain(); s.buffer = b; s.loop = true;
      g.gain.value = 0; s.connect(g); g.connect(this.amb); s.start(); g.gain.setTargetAtTime(1, c.currentTime, 1.4);
      if (this.ambSrc) { const o = this.ambSrc; o.g.gain.setTargetAtTime(0, c.currentTime, 1.2); setTimeout(() => { try { o.s.stop(); } catch (e) {} }, 5000); }
      this.ambSrc = { s, g };
    },
    async falar(url) { // a voz do Cavaleiro: o ambiente cede, o eco fica
      if (!this.ctx || !this.on) return 0; const b = await this.buf(url); if (!b) return 0;
      this.calar(); const c = this.ctx, s = c.createBufferSource(); s.buffer = b; s.connect(this.vozG);
      this.amb.gain.setTargetAtTime(.38, c.currentTime, .3); s.start(); this.voz = s;
      s.onended = () => { if (this.voz === s) { this.voz = null; this.amb.gain.setTargetAtTime(.85, c.currentTime, .8); } };
      return b.duration;
    },
    calar() { if (this.voz) { try { this.voz.stop(); } catch (e) {} this.voz = null; } if (this.ctx) this.amb.gain.setTargetAtTime(.85, this.ctx.currentTime, .8); },
    async trecho(url, ini, dur, vol = .7) {
      if (!this.ctx || !this.on) return; const b = await this.buf(url); if (!b) return;
      const c = this.ctx, s = c.createBufferSource(), g = c.createGain(); s.buffer = b; g.gain.value = vol;
      g.gain.setTargetAtTime(0, c.currentTime + dur * .75, dur * .12); s.connect(g); g.connect(this.fx); s.start(0, ini, dur);
    },
    tom(f, dur, vol = .1, tipo = 'sine', atraso = 0) {
      if (!this.ctx || !this.on) return; const c = this.ctx, t = c.currentTime + atraso, o = c.createOscillator(), g = c.createGain();
      o.type = tipo; o.frequency.value = f; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + .02); g.gain.exponentialRampToValueAtTime(.0005, t + dur);
      o.connect(g); g.connect(this.fx); o.start(t); o.stop(t + dur + .05);
    },
    sopro(dur, freq, vol = .05, q = 1.2) { // ruído filtrado: tecido, vidro, porta
      if (!this.ctx || !this.on) return; const c = this.ctx, t = c.currentTime, s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
      s.buffer = this.ruido; s.loop = true; f.type = 'bandpass'; f.frequency.value = freq; f.Q.value = q;
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + dur * .3); g.gain.linearRampToValueAtTime(0, t + dur);
      s.connect(f); f.connect(g); g.connect(this.fx); s.start(t); s.stop(t + dur + .05);
    },
    async arq(url, vol = .7, fallback) { // toca um efeito em arquivo; se faltar, cai no som sintetizado
      if (!this.ctx || !this.on) return; const b = await this.buf(url); if (!b) { fallback && fallback(); return; }
      const c = this.ctx, s = c.createBufferSource(), g = c.createGain(); s.buffer = b; g.gain.value = vol; s.connect(g); g.connect(this.fx); s.start();
    },
    sino() { [220, 553, 880, 1210, 1712].forEach((f, k) => this.tom(f, 6 - k * .8, [.08, .05, .035, .02, .012][k], 'sine', 0)); },
    brilho() { [1318, 1760, 2637].forEach((f, k) => this.tom(f, 2.4, .025, 'sine', k * .09)); },
    passo(k) { const pz = L.passos[k % L.passos.length]; this.trecho('assets/audio/sfx/passo-armadura.mp3', pz[0], pz[1], .75); },
    coro() { // o coro grave do sonho: vozes sem palavra, muito baixas
      const c = this.ctx, out = c.createGain(), lp = c.createBiquadFilter(); out.gain.value = 0; lp.type = 'lowpass'; lp.frequency.value = 900;
      lp.connect(out); out.connect(this.master); out.connect(this.eco); out.gain.setTargetAtTime(.05, c.currentTime + 1, 4);
      [110, 164.8, 220, 277.2].forEach((f, k) => {
        [-4, 4].forEach((cents) => {
          const o = c.createOscillator(), g = c.createGain(), lfo = c.createOscillator(), lg = c.createGain();
          o.type = k === 0 ? 'triangle' : 'sine'; o.frequency.value = f; o.detune.value = cents;
          g.gain.value = [.5, .32, .28, .14][k]; lfo.frequency.value = .05 + k * .023; lg.gain.value = g.gain.value * .6;
          lfo.connect(lg); lg.connect(g.gain); o.connect(g); g.connect(lp); o.start(); lfo.start();
        });
      });
    },
  };

  // ---------------------------------------------------------------- a névoa (abre onde o dedo passa) e as partículas
  const Nevoa = {
    cv: null, cx: null, alvo: .5, v: .5, px: -1, py: -1, tp: 0, lento: 1,
    init() {
      this.cv = $('#nevoa'); this.cx = this.cv.getContext('2d');
      this.blobs = Array.from({ length: 18 }, () => ({ x: Math.random(), y: Math.random(), r: .18 + Math.random() * .28, vx: (Math.random() - .5) * .006, vy: (Math.random() - .5) * .003, a: .1 + Math.random() * .12, f: Math.random() * 6 }));
      const mexe = (e) => { const t = e.touches ? e.touches[0] : e; this.px = t.clientX; this.py = t.clientY; this.tp = performance.now(); };
      addEventListener('pointermove', mexe, { passive: true }); addEventListener('pointerdown', mexe, { passive: true });
      this.tam(); addEventListener('resize', () => this.tam());
    },
    tam() { this.cv.width = Math.ceil(innerWidth / 4); this.cv.height = Math.ceil(innerHeight / 4); },
    quadro(t) {
      this.v += (this.alvo - this.v) * .02;
      const { cx, cv } = this, W = cv.width, H = cv.height, m = Math.max(W, H);
      cx.globalCompositeOperation = 'source-over'; cx.clearRect(0, 0, W, H);
      for (const b of this.blobs) {
        b.x += b.vx * .016 * this.lento; b.y += b.vy * .016 * this.lento;
        if (b.x < -.3) b.x = 1.3; if (b.x > 1.3) b.x = -.3; if (b.y < -.3) b.y = 1.3; if (b.y > 1.3) b.y = -.3;
        const a = b.a * this.v * (.75 + .25 * Math.sin(t / 3000 + b.f)), r = b.r * m;
        const g = cx.createRadialGradient(b.x * W, b.y * H, 0, b.x * W, b.y * H, r);
        g.addColorStop(0, `rgba(205,218,238,${a})`); g.addColorStop(1, 'rgba(205,218,238,0)');
        cx.fillStyle = g; cx.fillRect(0, 0, W, H);
      }
      const idade = (performance.now() - this.tp) / 1000; // o dedo abre a névoa, que volta a fechar devagar
      if (this.px >= 0 && idade < 4) {
        const x = this.px / 4, y = this.py / 4, r = Math.min(W, H) * .32, k = 1 - idade / 4;
        cx.globalCompositeOperation = 'destination-out';
        const g = cx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, `rgba(0,0,0,${.85 * k})`); g.addColorStop(1, 'rgba(0,0,0,0)');
        cx.fillStyle = g; cx.fillRect(0, 0, W, H);
      }
    },
  };
  const Part = {
    cv: null, cx: null, modo: 'po', ps: [], lento: 1,
    init() { this.cv = $('#part'); this.cx = this.cv.getContext('2d'); this.tam(); addEventListener('resize', () => this.tam()); this.ps = Array.from({ length: 90 }, () => this.nova(true)); },
    tam() { this.cv.width = innerWidth; this.cv.height = innerHeight; },
    nova(qq) { return { x: Math.random(), y: qq ? Math.random() : (this.modo === 'neve' ? -.05 : 1.05), s: Math.random(), f: Math.random() * 6 }; },
    quadro(t) {
      const { cx, cv } = this, W = cv.width, H = cv.height; cx.clearRect(0, 0, W, H);
      const neve = this.modo === 'neve', n = neve ? 90 : 46;
      for (let i = 0; i < n; i++) {
        const p = this.ps[i];
        if (neve) { p.y += (.00045 + p.s * .0007) * this.lento; p.x += Math.sin(t / 2400 + p.f) * .00025 * this.lento; }
        else { p.y -= (.00008 + p.s * .00014) * this.lento; p.x += Math.sin(t / 3000 + p.f) * .00012 * this.lento; }
        if (p.y > 1.05 || p.y < -.05) Object.assign(p, this.nova(false));
        const r = neve ? .8 + p.s * 1.9 : .6 + p.s * 1.4, a = neve ? .25 + p.s * .5 : (.15 + .35 * (Math.sin(t / 900 + p.f) * .5 + .5)) * .8;
        cx.fillStyle = neve ? `rgba(235,242,255,${a})` : (p.s > .7 ? `rgba(240,205,140,${a})` : `rgba(190,210,240,${a})`);
        cx.beginPath(); cx.arc(p.x * W, p.y * H, r, 0, Math.PI * 2); cx.fill();
      }
    },
  };
  const loop = (t) => { Nevoa.quadro(t); Part.quadro(t); requestAnimationFrame(loop); };

  // ---------------------------------------------------------------- fundos (imagem ou vídeo, em fusão lenta)
  const h264 = (() => { const v = document.createElement('video'); return !!v.canPlayType('video/mp4; codecs="avc1.42E01E"'); })();
  let fundoAtual = null, videoScrub = null;
  function setFundo(f) {
    if (!f) return; const chave = f.video || f.img; if (fundoAtual === chave) return; fundoAtual = chave;
    const box = $('#fundo'), ly = document.createElement('div'); ly.className = 'camada' + (f.video ? '' : ' respira');
    if (f.video) {
      const v = document.createElement('video'); v.muted = true; v.playsInline = true; v.preload = 'auto'; v.poster = f.img;
      v.src = h264 ? f.video : f.video.replace(/\.mp4$/, '.webm');
      v.onerror = () => { if (!v.src.endsWith('.webm')) v.src = f.video.replace(/\.mp4$/, '.webm'); };
      if (f.scrub) { videoScrub = { v, ini: f.scrub[0], fim: f.scrub[1] }; v.addEventListener('loadedmetadata', () => { v.currentTime = f.scrub[0]; }, { once: true }); }
      else { v.loop = true; v.autoplay = true; v.play().catch(() => {}); }
      ly.appendChild(v);
    } else { ly.style.backgroundImage = `url("${f.img}")`; }
    ly.style.setProperty('--foco', f.foco || '50% 50%'); box.appendChild(ly);
    requestAnimationFrame(() => requestAnimationFrame(() => ly.classList.add('on')));
    [...box.children].slice(0, -1).forEach((o) => { o.classList.remove('on'); setTimeout(() => o.remove(), 2200); });
  }
  function atmosfera(p) {
    Nevoa.alvo = p.nevoa != null ? p.nevoa : .5; Part.modo = p.part || 'po';
    document.documentElement.style.setProperty('--gelo', p.gelo != null ? p.gelo : .3);
    document.body.classList.toggle('dourada', p.luz === 'dourada');
    const prog = st.i / (P.length - 1); document.documentElement.style.setProperty('--cera', (1 - prog * .82).toFixed(3));
  }

  // ---------------------------------------------------------------- texto: palavras que se condensam, que se apagam ao reler
  const T = []; const later = (fn, ms) => { const id = setTimeout(fn, ms); T.push(id); return id; };
  const limpaTimers = () => { T.forEach(clearTimeout); T.length = 0; };
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function palavras(txt, { atraso = 0, apaga = false, passo = 55 } = {}) {
    let k = 0;
    return txt.split(/(\s+)/).map((tok) => {
      if (!tok) return ''; if (/^\s+$/.test(tok)) return tok;
      const nome = /Laura/.test(tok); const d = Math.min(atraso + k++ * passo, atraso + 2600);
      const sumir = apaga && !nome && Math.random() < .3;
      return `<span class="w${nome ? ' nome' : ''}${sumir ? ' apagada' : ''}" style="--d:${d}ms">${esc(tok)}</span>`;
    }).join('');
  }
  function paragrafo(it, opts = {}) {
    const txt = tx(it.t), fala = /^[—"“]/.test(txt.trim());
    const p = document.createElement('p'); p.className = `p ${it.k === 'm' ? 'm' : 'c'}${fala ? ' fala' : ''}${opts.ja ? ' ja' : ''}`;
    if (opts.passos) { // a caminhada: uma frase por passo
      p.innerHTML = txt.split(/(?<=[.!?])\s+/).map((f) => `<span class="frase oculta">${palavras(f, { passo: 45 })}</span>`).join(' ');
    } else p.innerHTML = palavras(txt, { apaga: opts.apaga, passo: it.k === 'm' ? 30 : 55 });
    $('#texto .corpo').appendChild(p);
    const tx2 = $('#texto'); tx2.scrollTop = tx2.scrollHeight; atualizaRola();
    return p;
  }
  const atualizaRola = () => { const t = $('#texto'); t.classList.toggle('rola', t.scrollHeight > t.clientHeight + 3); };
  const medeGesto = () => { document.documentElement.style.setProperty('--gh', ($('#gesto').offsetHeight || 0) + 'px'); setTimeout(atualizaRola, 900); };
  const gestoOn = () => { $('#gesto').className = 'on'; document.body.classList.add('gesto'); requestAnimationFrame(medeGesto); setTimeout(medeGesto, 300); };
  const gestoOff = () => { $('#gesto').className = 'feito'; document.body.classList.remove('gesto'); setTimeout(atualizaRola, 1000); };
  addEventListener('resize', () => { medeGesto(); atualizaRola(); });
  const leitura = (it) => clamp(tx(it.t).length * 40, 1600, 5600);

  // ---------------------------------------------------------------- páginas
  let fila = [], gestoLimpa = null, pagPronta = false;
  function pronta(v) { pagPronta = v; $('#prox').classList.toggle('on', v && st.i < P.length - 1); }
  function render(dir = 1) {
    limpaTimers(); if (gestoLimpa) { gestoLimpa(); gestoLimpa = null; } A.calar(); videoScrub = null;
    const p = P[st.i]; atmosfera(p); setFundo(p.fundo); A.zona(p.som);
    $('#texto .corpo').innerHTML = ''; $('#gesto').innerHTML = ''; $('#gesto').className = ''; document.body.classList.remove('gesto'); $('#titulo').className = '';
    $('#volt').classList.toggle('on', st.i > 0); pronta(false);
    document.body.dataset.pag = p.id;
    if (p.limiar) return limiar(p);
    const revisita = !!st.lidas[p.id];
    if (revisita) { // reler: o texto volta com lacunas; só "Laura" fica inteira
      (p.itens || []).forEach((it) => { if (it.fundo) setFundo(it.fundo); if (it.t) paragrafo(it, { apaga: dir !== 0, ja: true }); });
      $('#texto').scrollTop = 0; pronta(true); return;
    }
    fila = (p.itens || []).slice(); avanca(p);
  }
  function avanca(p) {
    if (!fila.length) { st.lidas[p.id] = 1; salvar(); pronta(true); return; }
    const it = fila.shift();
    if (it.fundo) setFundo(it.fundo);
    if (it.gesto) { gestoOn(); gestoLimpa = GESTOS[it.gesto](it, () => { gestoLimpa = null; gestoOff(); st.feitos[it.gesto] = 1; salvar(); later(() => avanca(p), 700); }); return; }
    if (it.passos) { paragrafo(it, { passos: true }); gestoOn(); gestoLimpa = GESTOS.andar(it, () => { gestoLimpa = null; gestoOff(); st.feitos.andar = 1; salvar(); later(() => avanca(p), 900); }); return; }
    paragrafo(it);
    if (p.nome && /Laura/.test(tx(it.t))) later(() => A.brilho(), 900);
    let dur = leitura(it);
    if (it.voz && A.on && A.ctx) { A.falar(it.voz.src); dur = Math.max(dur, it.voz.dur * 1000 + 600); }
    later(() => avanca(p), dur);
  }
  function revelaTudo() { // um toque no texto revela o resto (até o próximo gesto)
    const p = P[st.i]; if (pagPronta || p.limiar || $('#gesto').className === 'on') return;
    limpaTimers(); $('#texto').classList.add('rapido');
    while (fila.length && !fila[0].gesto && !fila[0].passos) { const it = fila.shift(); if (it.fundo) setFundo(it.fundo); paragrafo(it); }
    setTimeout(() => $('#texto').classList.remove('rapido'), 900);
    avanca(p);
  }
  function limiar(p) { // a última frase do Cap. II se desfaz, e surge o título
    const c2 = antes().cap2; const tit = $('#titulo');
    const mostraTitulo = () => { tit.innerHTML = `<p class="eyebrow">${U('cap')}</p><h1>${U('titulo')}</h1><p class="sub">${U('sub')}</p>`; tit.className = 'on'; later(() => { st.lidas[p.id] = 1; salvar(); pronta(true); }, 2200); };
    if (c2 && !st.lidas[p.id]) {
      const sof = c2.duelo ? c2.duelo.sofridos || 0 : 0, peso = c2.peso || 0;
      const k = peso >= 3 || sof >= 2 ? 'agitado' : peso === 0 ? 'leve' : 'meio';
      const el = paragrafo({ t: L.cap2fim[k] }); el.classList.add('limiar');
      later(() => el.classList.add('desfaz'), 4200); later(() => { el.remove(); mostraTitulo(); }, 7200);
    } else mostraTitulo();
  }
  function irProxima() { if (st.i < P.length - 1) { st.i++; salvar(); render(1); } }
  function voltar() { if (st.i > 0) { st.i--; salvar(); render(-1); } }

  // ---------------------------------------------------------------- os toques
  const legenda = (titulo, dica) => `<p class="g-tit">${titulo}</p><p class="g-dica">${dica}</p>`;
  function segurar(el, ms, aoFim, aoMudar) { // segurar um botão por ms (dedo, mouse ou espaço)
    let t0 = 0, raf = 0, ok = false;
    const anda = () => { const k = clamp((performance.now() - t0) / ms, 0, 1); el.style.setProperty('--prog', k); aoMudar && aoMudar(true, k); if (k >= 1) { ok = true; fim(); aoFim(); } else raf = requestAnimationFrame(anda); };
    const ini = (e) => { if (ok) return; e && e.preventDefault(); A.resume(); t0 = performance.now(); el.classList.add('segura'); raf = requestAnimationFrame(anda); };
    const fim = () => { cancelAnimationFrame(raf); el.classList.remove('segura'); if (!ok) { el.style.setProperty('--prog', 0); aoMudar && aoMudar(false, 0); } };
    const kd = (e) => { if (e.code === 'Space' && !e.repeat) { e.preventDefault(); ini(); } }, ku = (e) => { if (e.code === 'Space') fim(); };
    el.addEventListener('pointerdown', ini); ['pointerup', 'pointerleave', 'pointercancel'].forEach((ev) => el.addEventListener(ev, fim));
    addEventListener('keydown', kd); addEventListener('keyup', ku);
    return () => { cancelAnimationFrame(raf); removeEventListener('keydown', kd); removeEventListener('keyup', ku); };
  }
  function arrastar(el, { eixo = 'x', ritmo = 0, aoMudar, aoFim }) { // arrastar uma alça; ritmo = velocidade máxima (o sonho não se apressa)
    let alvo = 0, atual = 0, ativo = false, raf = 0, feito = false, x0 = 0, base = 0;
    const tam = () => (eixo === 'x' ? el.clientWidth : el.clientHeight);
    const anda = () => {
      const max = ritmo ? ritmo / 60 : 1; atual += clamp(alvo - atual, -max, max);
      el.style.setProperty('--k', atual.toFixed(4)); aoMudar && aoMudar(atual, ativo);
      if (atual >= .985 && !feito) { feito = true; aoFim(); return; }
      raf = requestAnimationFrame(anda);
    };
    const pos = (e) => (eixo === 'x' ? e.clientX : -e.clientY);
    const down = (e) => { if (feito) return; ativo = true; x0 = pos(e); base = alvo; el.setPointerCapture && el.setPointerCapture(e.pointerId); A.resume(); };
    const move = (e) => { if (!ativo) return; alvo = clamp(base + (pos(e) - x0) / tam(), 0, 1); };
    const up = () => { ativo = false; };
    el.addEventListener('pointerdown', down); el.addEventListener('pointermove', move); ['pointerup', 'pointercancel'].forEach((ev) => el.addEventListener(ev, up));
    const kd = (e) => { if (feito) return; const d = { ArrowRight: .06, ArrowUp: .06, ArrowLeft: -.06, ArrowDown: -.06 }[e.key]; if (d != null && ((eixo === 'x') === (e.key === 'ArrowRight' || e.key === 'ArrowLeft'))) { e.preventDefault(); e.stopPropagation(); ativo = true; alvo = clamp(alvo + d, 0, 1); clearTimeout(kd.t); kd.t = setTimeout(() => (ativo = false), 300); } };
    addEventListener('keydown', kd, true);
    raf = requestAnimationFrame(anda);
    return () => { cancelAnimationFrame(raf); removeEventListener('keydown', kd, true); };
  }

  const GESTOS = {
    andar(it, done) { // cada passo condensa uma frase; o primeiro passo dá voz ao Cavaleiro
      const g = $('#gesto'); g.innerHTML = `<button class="g-bt pegada" aria-label="${U('andar')}"><span></span></button>${legenda(U('andar'), U('andarDica'))}`;
      const frases = [...document.querySelectorAll('#texto .frase.oculta')]; let n = 0;
      const bt = $('.g-bt', g);
      const passo = () => {
        if (n >= frases.length) return; A.resume();
        if (n === 0 && it.voz && A.on) A.falar(it.voz.src);
        A.passo(n); frases[n].classList.remove('oculta'); st.d.passos = ++n;
        const pe = document.createElement('i'); pe.className = 'pe'; pe.style.left = `${38 + (n % 2 ? -4 : 4) + Math.random() * 3}%`; pe.style.bottom = `${10 + n * 2.2}%`; $('#pegadas').appendChild(pe); setTimeout(() => pe.remove(), 5000);
        if (n >= frases.length) { bt.disabled = true; done(); }
      };
      bt.addEventListener('click', passo);
      const kd = (e) => { if (e.code === 'Space') { e.preventDefault(); passo(); } }; addEventListener('keydown', kd);
      return () => removeEventListener('keydown', kd);
    },
    corredores(it, done) { // dois corredores: os dois dão no mesmo lugar
      const g = $('#gesto'); g.innerHTML = `<p class="g-tit">${U('corrDica')}</p><div class="g-par"><button class="g-arco" data-v="esq">← ${U('esq')}</button><button class="g-arco" data-v="dir">${U('dir')} →</button></div>`;
      g.querySelectorAll('.g-arco').forEach((b) => b.addEventListener('click', () => {
        st.d.corredor = b.dataset.v; registrar('corredor', b.dataset.v); A.passo(2); A.passo(3);
        g.querySelectorAll('.g-arco').forEach((x) => (x.disabled = true)); b.classList.add('escolhido');
        Nevoa.alvo = 1; setTimeout(() => (Nevoa.alvo = P[st.i].nevoa), 1600); done();
      }));
      return null;
    },
    esperar(it, done) { // esperar: o tempo do sonho para enquanto o leitor segura
      const g = $('#gesto'); g.innerHTML = `<button class="g-bt anel"><span>${U('esperarDica')}</span></button>${legenda(U('esperar'), '')}`;
      return segurar($('.g-bt', g), 3200, () => { A.sopro(2.4, 300, .03); done(); }, (seg) => { Part.lento = Nevoa.lento = seg ? .15 : 1; });
    },
    porta(it, done) { // a porta se abre no próprio ritmo
      const g = $('#gesto'); g.innerHTML = `<div class="g-trilho"><span class="g-alca"></span></div>${legenda(U('porta'), U('portaDica'))}`;
      let somou = false;
      return arrastar($('.g-trilho', g), { ritmo: .2, aoMudar: (k, ativo) => {
        if (videoScrub) { const { v, ini, fim } = videoScrub; const t = ini + k * (fim - ini); if (Math.abs(v.currentTime - t) > .03) v.currentTime = t; }
        if (ativo && !somou && k > .02) { somou = true; A.arq('assets/audio/sfx/porta-rangido.mp3', .8, () => A.sopro(2.4, 160, .035, 5)); }
      }, aoFim: () => { done(); if (P[st.i].auto) later(irProxima, 1600); } });
    },
    vidro(it, done) { // a menina fala para o vidro escuro; o dedo desembaça
      const g = $('#gesto'); g.innerHTML = legenda(U('vidro'), U('vidroDica'));
      const cv = document.createElement('canvas'); cv.id = 'vidro'; document.body.appendChild(cv);
      const W = cv.width = Math.ceil(innerWidth / 2), H = cv.height = Math.ceil(innerHeight / 2), cx = cv.getContext('2d');
      const gr = cx.createLinearGradient(0, 0, W, H); gr.addColorStop(0, 'rgba(200,214,232,.78)'); gr.addColorStop(1, 'rgba(160,178,205,.7)');
      cx.fillStyle = gr; cx.fillRect(0, 0, W, H); requestAnimationFrame(() => cv.classList.add('on'));
      let feito = false, ult = 0;
      const limpa = (e) => {
        if (feito) return; const x = e.clientX / 2, y = e.clientY / 2;
        cx.globalCompositeOperation = 'destination-out'; const r = Math.min(W, H) * .09, gg = cx.createRadialGradient(x, y, 0, x, y, r);
        gg.addColorStop(0, 'rgba(0,0,0,1)'); gg.addColorStop(1, 'rgba(0,0,0,0)'); cx.fillStyle = gg; cx.beginPath(); cx.arc(x, y, r, 0, 7); cx.fill();
        const t = performance.now(); if (t - ult > 1500) { ult = t; A.arq('assets/audio/sfx/vidro-dedo.mp3', .7, () => A.sopro(.4, 2600, .02, 9)); }
      };
      const mede = setInterval(() => { // quanto do vidro já está limpo
        const d = cx.getImageData(0, 0, W, H).data; let vazio = 0, tot = 0;
        for (let i = 3; i < d.length; i += 4 * 97) { tot++; if (d[i] < 40) vazio++; }
        if (!feito && vazio / tot > .26) { feito = true; st.d.vidro = 1; cv.classList.add('some'); setTimeout(() => cv.remove(), 2500); clearInterval(mede); done(); }
      }, 350);
      const down = (e) => { cv.dataset.ativo = 1; limpa(e); }, move = (e) => { if (cv.dataset.ativo || e.pointerType === 'mouse') limpa(e); }, up = () => { delete cv.dataset.ativo; };
      cv.addEventListener('pointerdown', down); cv.addEventListener('pointermove', move); cv.addEventListener('pointerup', up);
      return () => { clearInterval(mede); cv.remove(); };
    },
    desembainhar(it, done) { // quanto mais devagar, mais claro o risco branco no teto
      const g = $('#gesto'); g.innerHTML = `<div class="g-trilho lamina"><span class="g-alca"></span></div>${legenda(U('espada'), U('espadaDica'))}`;
      const risco = document.createElement('div'); risco.id = 'risco'; document.body.appendChild(risco);
      let t0 = 0, somou = false;
      return arrastar($('.g-trilho', g), { aoMudar: (k, ativo) => {
        if (ativo && !t0 && k > .01) t0 = performance.now();
        if (ativo && !somou && k > .02) { somou = true; A.trecho('assets/audio/sfx/espada-desembainhar.mp3', 0, 3.4, .8); }
        if (videoScrub) { const { v, ini, fim } = videoScrub; const t = ini + k * (fim - ini); if (Math.abs(v.currentTime - t) > .03) v.currentTime = t; }
        const tempo = t0 ? performance.now() - t0 : 0; risco.style.setProperty('--luz', (k * clamp(tempo / 4000, .15, 1)).toFixed(3));
      }, aoFim: () => { st.d.tEspada = t0 ? Math.round(performance.now() - t0) : 0; A.brilho(); setTimeout(() => risco.classList.add('some'), 2600); done(); } });
    },
    postura(it, done) { return Postura(done); },
    coberta(it, done) { // puxar a coberta até o queixo
      const g = $('#gesto'); g.innerHTML = `<div class="g-trilho vertical"><span class="g-alca"></span></div>${legenda(U('coberta'), U('cobertaDica'))}`;
      const pano = document.createElement('div'); pano.id = 'pano'; document.body.appendChild(pano); let somou = false;
      return arrastar($('.g-trilho', g), { eixo: 'y', aoMudar: (k, ativo) => { pano.style.setProperty('--k', k); if (ativo && !somou && k > .03) { somou = true; A.arq('assets/audio/sfx/coberta.mp3', .8, () => A.sopro(1.6, 700, .03, .8)); } },
        aoFim: () => { pano.classList.add('some'); setTimeout(() => pano.remove(), 2200); done(); } });
    },
    rosto(it, done) { return Rosto(it, done); },
  };

  // ---------------------------------------------------------------- minijogo: mão no ombro, nunca na arma
  function Postura(done) {
    const C = L.postura, ov = $('#ov'); let k = 0, ocupado = false;
    ov.className = 'on postura';
    ov.innerHTML = `<div class="po-fundo"></div><p class="po-dica">${U('posturaDica')}</p><div class="po-cena"><img class="po-menina" alt=""><img class="po-mao" alt="" src="${C.mao.img}"><button class="po-ponto"><i></i><span></span></button><div class="po-espadas"></div></div>`;
    const cena = $('.po-cena', ov), img = $('.po-menina', ov), mao = $('.po-mao', ov), ponto = $('.po-ponto', ov), espadas = $('.po-espadas', ov);
    const M = C.sprites;
    const mede = () => { // a menina ocupa 64% da altura; tudo é posicionado pela caixa dela
      const s = C.passos[k], m = M[s.pose], h = Math.min(innerHeight * .64, 560), w = h * m.w / m.h;
      return { h, w, x: innerWidth * .5 - w / 2, y: innerHeight * .9 - h };
    };
    const monta = () => {
      const s = C.passos[k], b = mede();
      img.src = `assets/images/postura/${s.pose}.webp`; Object.assign(img.style, { left: b.x + 'px', top: b.y + 'px', width: b.w + 'px', height: b.h + 'px' });
      Object.assign(ponto.style, { left: b.x + s.ponto[0] * b.w + 'px', top: b.y + s.ponto[1] * b.h + 'px' }); $('span', ponto).textContent = U(s.parte);
      ponto.classList.add('on');
      espadas.innerHTML = s.espada.map(([x, y, w, h]) => `<button class="po-espada" style="left:${b.x + x * b.w}px;top:${b.y + y * b.h}px;width:${w * b.w}px;height:${h * b.h}px" aria-hidden="true"></button>`).join('');
      espadas.querySelectorAll('.po-espada').forEach((e) => e.addEventListener('click', (ev) => quaseToca(ev.clientX, ev.clientY)));
    };
    const maoEm = (x, y, recua) => { // a manopla pousa com os dedos no ponto
      const b = mede(), mh = b.h * C.mao.altura, mw = mh * M['mao-cavaleiro'].w / M['mao-cavaleiro'].h;
      Object.assign(mao.style, { width: mw + 'px', height: mh + 'px', left: x - C.mao.dedos[0] * mw + 'px', top: y - C.mao.dedos[1] * mh + 'px' });
      mao.className = 'po-mao vem' + (recua ? ' recua' : '');
    };
    const quaseToca = (x, y) => { // nunca na arma: a mão para um dedo antes e recua
      if (ocupado) return; ocupado = true; st.d.tocouEspada++;
      maoEm(x - 26, y - 26, true); A.sopro(.3, 900, .02, 3);
      setTimeout(() => { mao.className = 'po-mao'; ocupado = false; }, 1500);
    };
    ponto.addEventListener('click', () => {
      if (ocupado) return; ocupado = true; ponto.classList.remove('on'); A.resume();
      const r = ponto.getBoundingClientRect(); maoEm(r.left + r.width / 2, r.top + r.height / 2, false); A.sopro(.6, 520, .03, 1.5);
      st.d.correcoes = Math.max(st.d.correcoes, k + 1);
      if (k < C.passos.length - 1) {
        setTimeout(() => { img.classList.add('troca'); }, 900);
        setTimeout(() => { mao.className = 'po-mao'; k++; monta(); img.classList.remove('troca'); ocupado = false; }, 1600);
      } else { // o ombro: a mão fica pousada, a menina firme, e a cena se desfaz devagar
        setTimeout(() => { A.brilho(); }, 1100);
        setTimeout(() => { ov.classList.add('sai'); }, 3200);
        setTimeout(() => { ov.className = ''; ov.innerHTML = ''; registrar('espada', st.d.tocouEspada ? 'tocou' : 'respeitou'); done(); }, 4500);
      }
    });
    monta(); const rs = () => monta(); addEventListener('resize', rs);
    return () => { removeEventListener('resize', rs); ov.className = ''; ov.innerHTML = ''; };
  }

  // ---------------------------------------------------------------- o rosto que se apaga
  function Rosto(it, done) {
    const ov = $('#ov'); ov.className = 'on rosto';
    ov.innerHTML = `<div class="ro-rosto" style="background-image:url('assets/images/rosto-menina.jpg')"></div><div class="ro-dica">${legenda(U('rosto'), U('rostoDica'))}</div><p class="ro-nome"></p>`;
    const face = $('.ro-rosto', ov); let k = 0, segura = false, t = performance.now(), held = 0, raf = 0, fim = false;
    Nevoa.alvo = .85;
    const anda = (agora) => {
      const dt = (agora - t) / 1000; t = agora; if (segura) held += dt;
      k = clamp(k + dt / (segura ? 25 : 12), 0, 1);
      face.style.opacity = (1 - Math.pow(k, 1.8)).toFixed(3); face.style.filter = `blur(${(k * 16).toFixed(1)}px) brightness(${(1 - k * .25).toFixed(3)})`; face.style.transform = `scale(${(1 + k * .1).toFixed(3)})`;
      ov.classList.toggle('segurando', segura); // o rosto fica visível por mais tempo e some de vez no fim
      if (k >= 1 && !fim) { fim = true; st.d.rosto = Math.round(held * 10) / 10; termina(); return; }
      raf = requestAnimationFrame(anda);
    };
    const termina = () => {
      $('.ro-dica', ov).classList.add('some'); A.arq('assets/audio/sfx/sino-longe.mp3', .85, () => A.sino());
      const n = $('.ro-nome', ov); n.textContent = tx(it.fim); setTimeout(() => n.classList.add('on'), 600);
      setTimeout(() => { done(); fimCapitulo(); }, 4200);
    };
    const on = (e) => { e && e.preventDefault && e.preventDefault(); segura = true; A.resume(); }, off = () => { segura = false; };
    ov.addEventListener('pointerdown', on); ['pointerup', 'pointercancel', 'pointerleave'].forEach((ev) => ov.addEventListener(ev, off));
    const kd = (e) => { if (e.code === 'Space') { e.preventDefault(); on(); } }, ku = (e) => { if (e.code === 'Space') off(); };
    addEventListener('keydown', kd); addEventListener('keyup', ku);
    raf = requestAnimationFrame(anda);
    return () => { cancelAnimationFrame(raf); removeEventListener('keydown', kd); removeEventListener('keyup', ku); };
  }

  // ---------------------------------------------------------------- fim: o que ficou, e a jornada
  function pontos() {
    const d = st.d, f = st.feitos; let p = 0;
    ['andar', 'corredores', 'esperar', 'porta', 'vidro'].forEach((g) => { if (f[g]) p += 500; });
    p += Math.round(5000 * clamp((d.tEspada || 0) / 4000, 0, 1));
    p += 3500 * Math.min(4, d.correcoes || 0); if (f.postura && !d.tocouEspada) p += 6000;
    p += Math.round(7000 * clamp((d.rosto || 0) / 12, 0, 1));
    return p;
  }
  const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  function jogador() {
    try {
      let j = localStorage.getItem('aqv_jogador');
      if (!j || !UUID.test(j)) { const c1 = JSON.parse(localStorage.getItem('livro_cap01') || 'null'); j = c1 && UUID.test(c1.sessao || '') ? c1.sessao : UUID.test(st.sessao) ? st.sessao : uuid(); localStorage.setItem('aqv_jogador', j); }
      return j;
    } catch (e) { return UUID.test(st.sessao) ? st.sessao : null; }
  }
  function anteriores() {
    const e = antes(); let c1 = null, c2 = null;
    try { if (e.cap1 && Number.isFinite(e.cap1.pontos)) c1 = e.cap1.pontos; else { const s = JSON.parse(localStorage.getItem('livro_cap01') || 'null'); if (s && s.jogo && Number.isFinite(Number(s.jogo.score))) c1 = Math.round(Number(s.jogo.score)); } } catch (x) {}
    if (e.cap2 && e.cap2.pontos && Number.isFinite(e.cap2.pontos.total)) c2 = e.cap2.pontos.total;
    return { c1, c2 };
  }
  async function enviaPontos(p3, ant) {
    const j = jogador(); if (!j) return null;
    const rpc = (cap, pts, det) => fetch(`${SUPA.url}/rest/v1/rpc/livro_salva_pontos`, { method: 'POST', headers: { apikey: SUPA.key, 'Content-Type': 'application/json' }, body: JSON.stringify({ p_jogador: j, p_capitulo: cap, p_pontos: Math.min(2000000, Math.round(pts)), p_detalhes: det }) }).then((r) => (r.ok ? r.json() : null)).catch(() => null);
    if (ant.c1 != null) await rpc('cap01', ant.c1, { origem: 'cap03' });
    if (ant.c2 != null) await rpc('cap02', ant.c2, { origem: 'cap03' });
    const r = await rpc('cap03', p3, { ...st.d });
    return r && r[0] ? r[0] : null;
  }
  function registrar(escolha, opcao) {
    fetch(`${SUPA.url}/rest/v1/livro_escolhas?on_conflict=sessao,capitulo,escolha`, { method: 'POST', headers: { apikey: SUPA.key, 'Content-Type': 'application/json', Prefer: 'resolution=ignore-duplicates,return=minimal' }, body: JSON.stringify({ capitulo: L.id, escolha, opcao, sessao: st.sessao }) }).catch(() => {});
  }
  function fimCapitulo() {
    const p3 = pontos(), ant = anteriores();
    try { const e = antes(); e.cap3 = { ...st.d, pontos: p3, quando: new Date().toISOString() }; localStorage.setItem('aqv_estado', JSON.stringify(e)); } catch (x) {}
    const loc = LANG === 'en' ? 'en-US' : 'pt-BR', n = (x) => Number(x).toLocaleString(loc);
    const desenha = (srv) => {
      const local = (ant.c1 || 0) + (ant.c2 || 0) + p3, temAnt = ant.c1 != null || ant.c2 != null;
      const jornada = srv && srv.total != null ? Number(srv.total) : temAnt ? local : null;
      const pos = srv && srv.posicao ? `<em>${U('posicao').replace('{p}', n(srv.posicao)).replace('{n}', n(srv.leitores))}</em>` : '';
      $('#fim').innerHTML = `<div class="fim-in"><p class="fim-nome">Laura.</p><p class="eyebrow">${U('fim')}</p>
        <div class="fim-pts"><p class="eyebrow">${U('ficou')}</p><p><span>${U('presenca')}</span><b>${n(p3)}</b></p>
        ${jornada != null ? `<p class="jornada"><span>${U('jornada')}</span><b>${n(jornada)}</b>${pos}</p>` : `<p class="sem">${U('semJornada')}</p>`}</div>
        <div class="fim-bts"><button class="fim-reler">${U('reler')}</button><a class="fim-prox" href="https://marcelomartinsjorge.github.io/the4willschapter4V2/">${U('prox4')} →</a></div></div>`;
      $('#fim .fim-reler').onclick = () => { $('#fim').className = ''; st.i = 0; st.lidas = {}; salvar(); render(1); };
    };
    desenha(null); $('#fim').className = 'on'; $('#ov').classList.add('sai'); setTimeout(() => { $('#ov').className = ''; $('#ov').innerHTML = ''; }, 1400); // o "Laura." do rosto dá lugar ao da tela final enviaPontos(p3, ant).then((srv) => { if (srv) desenha(srv); });
  }

  // ---------------------------------------------------------------- capa, idioma, som, navegação
  function textosFixos() {
    document.documentElement.lang = LANG === 'pt' ? 'pt-BR' : 'en';
    $('#capa .c-livro').textContent = U('livro'); $('#capa .c-cap').textContent = U('cap'); $('#capa h1').textContent = U('titulo'); $('#capa .c-sub').textContent = U('sub');
    $('#capa .c-fones').textContent = U('fones'); $('#cvGo').textContent = st.i > 0 ? U('continuar') : U('entrar'); $('#cvNovo').textContent = U('recomecar'); $('#cvNovo').hidden = !(st.i > 0);
    $('#prox').textContent = U('prox') + ' →'; $('#volt').setAttribute('aria-label', U('volt')); $('#lang').textContent = LANG === 'pt' ? 'EN' : 'PT'; $('#cap-tag').textContent = U('cap');
  }
  function trocaLingua() {
    LANG = LANG === 'pt' ? 'en' : 'pt'; localStorage.setItem('livro_lang', LANG); textosFixos();
    if (!$('#capa').classList.contains('fora')) return;
    const p = P[st.i]; if (p.limiar) return render(0);
    limpaTimers(); $('#texto .corpo').innerHTML = '';
    const mostrados = (p.itens || []).filter((it) => it.t && !fila.includes(it)); mostrados.forEach((it) => paragrafo(it, { ja: true }));
    if (pagPronta) pronta(true); else if ($('#gesto').className !== 'on') avanca(p);
  }
  function entrar(recomeca) {
    if (recomeca) { st = novo(); salvar(); }
    A.init(); A.resume(); $('#capa').classList.add('fora'); setTimeout(() => ($('#capa').style.display = 'none'), 1800); render(1);
  }
  function inicia() {
    Nevoa.init(); Part.init(); requestAnimationFrame(loop); textosFixos();
    $('#cvGo').onclick = () => entrar(false); $('#cvNovo').onclick = () => entrar(true);
    $('#lang').onclick = trocaLingua;
    $('#som').onclick = () => { A.init(); A.setOn(!A.on); $('#som').classList.toggle('off', !A.on); if (!A.on) A.calar(); };
    $('#prox').onclick = () => pagPronta && irProxima(); $('#volt').onclick = voltar;
    $('#texto').addEventListener('click', revelaTudo);
    addEventListener('keydown', (e) => {
      if (!$('#capa').classList.contains('fora') || $('#ov').classList.contains('on') || $('#fim').classList.contains('on')) return;
      if ((e.key === 'ArrowRight' || e.key === 'Enter') && pagPronta) irProxima();
      else if (e.key === 'ArrowLeft') voltar();
      else if (e.key === 'Enter') revelaTudo();
    });
    setFundo({ img: 'assets/images/hero.webp' }); Nevoa.alvo = .6;
  }
  window.__CAP3 = { get st() { return st; }, render, irProxima, A, ir: (id) => { st.i = P.findIndex((p) => p.id === id); render(1); } }; // para testes
  inicia();
})();
