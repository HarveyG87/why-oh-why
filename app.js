/* ============================================================
   这到底为啥啊 · app.js
   双人轮流出题 / 线索封锁 / 揭晓 / 默契报告
   ============================================================ */

(function () {
  'use strict';

  const G = window.GameData;

  /* ---------------- icons ---------------- */

  const ICONS = {
    'settings': '<path d="M4 21v-7"/><path d="M4 10V3"/><path d="M12 21v-9"/><path d="M12 8V3"/><path d="M20 21v-5"/><path d="M20 12V3"/><path d="M1 14h6"/><path d="M9 8h6"/><path d="M17 16h6"/>',
    'eye': '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    'eye-off': '<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c6.5 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.5 13.5 0 0 0 2 12s3.5 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><path d="m2 2 20 20"/>',
    'lock': '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    'sparkles': '<path d="m12 3-1.9 5.8L4 10.7l5.8 1.9L12 18.4l1.9-5.8 5.8-1.9-5.8-1.9z"/><path d="M5 3v3"/><path d="M19 18v3"/><path d="M3.5 4.5h3"/><path d="M17.5 19.5h3"/>',
    'hand': '<path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2 2 2 0 0 0-2-2 2 2 0 0 0-2 2v5"/><path d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v6"/><path d="M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>',
    'x': '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    'share': '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98"/><path d="m15.41 6.51-6.82 3.98"/>',
    'refresh': '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
    'lightbulb': '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>',
    'message-circle': '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    'moon': '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    'utensils': '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Z"/>',
    'broom': '<path d="m13 11 9-9"/><path d="M14.6 12.6c.8.8.9 2.1.2 3L10 22l-8-8 6.4-4.8c.9-.7 2.2-.6 3 .2Z"/><path d="m6.8 10.4 6.8 6.8"/>',
    'heart': '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    'wallet': '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
    'briefcase': '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',
    'book-open': '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
    'arrow-left': '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
    'plus': '<path d="M5 12h14"/><path d="M12 5v14"/>',
    'trash': '<path d="M3 6h18"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>',
    'check': '<path d="M20 6 9 17l-5-5"/>',
    'copy': '<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
    'users': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    'trophy': '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
    'chevron-right': '<path d="m9 18 6-6-6-6"/>'
  };

  function icon(name) {
    return '<span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || '') + '</svg></span>';
  }

  function hydrate(root) {
    (root || document).querySelectorAll('.ic[data-icon]').forEach(function (el) {
      el.innerHTML = icon(el.dataset.icon).replace(/^<span[^>]*>/, '').replace(/<\/span>$/, '');
    });
  }

  /* ---------------- helpers ---------------- */

  const $ = function (sel, root) { return (root || document).querySelector(sel); };
  const $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  let toastTimer = null;
  function toast(msg, ms) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.add('is-show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('is-show'); }, ms || 2000);
  }

  function withLoading(btn, label, task) {
    const old = btn.innerHTML;
    btn.classList.add('is-loading');
    btn.innerHTML = label;
    return task().then(function (r) {
      btn.classList.remove('is-loading');
      btn.innerHTML = old;
      hydrate(btn);
      return r;
    }).catch(function (err) {
      btn.classList.remove('is-loading');
      btn.innerHTML = old;
      hydrate(btn);
      toast('出了点小问题，再试一次');
      throw err;
    });
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).catch(function () { return fallbackCopy(text); });
    }
    return Promise.resolve(fallbackCopy(text));
  }

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.top = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) { /* 忽略 */ }
    ta.remove();
  }

  function pad(n) { return String(n).padStart(2, '0'); }

  function animateNumber(el, to, dur) {
    const start = performance.now();
    const d = dur || 760;
    function frame(t) {
      const p = Math.min(1, (t - start) / d);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---------------- store ---------------- */

  const KEY = 'why-game-v2';

  const Store = {
    data: null,

    load: function () {
      let saved = null;
      try { saved = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { saved = null; }
      this.data = saved || {
        players: Object.assign({}, G.defaultPlayers),
        roundIndex: 0,
        phase: 'lobby',
        clues: [],
        custom: '',
        picked: null,
        score: 0,
        results: [],
        best: 0,
        bests: {},
        newBest: false,
        customRounds: [],
        useCustom: false
      };
      if (!this.data.players) this.data.players = Object.assign({}, G.defaultPlayers);
      if (!Array.isArray(this.data.clues)) this.data.clues = [];
      if (!Array.isArray(this.data.results)) this.data.results = [];
      if (!Array.isArray(this.data.customRounds)) this.data.customRounds = [];
      if (!this.data.bests || typeof this.data.bests !== 'object') this.data.bests = {};
      if (this.data.best > 0 && !this.data.bests.builtin) this.data.bests.builtin = this.data.best;
      if (typeof this.data.useCustom !== 'boolean') this.data.useCustom = false;
      if (typeof this.data.best !== 'number') this.data.best = 0;
      if (typeof this.data.score !== 'number') this.data.score = 0;
      if (!this.data.phase) this.data.phase = 'lobby';
      if (typeof this.data.roundIndex !== 'number') this.data.roundIndex = 0;
      if (this.data.useCustom && !this.data.customRounds.length) this.data.useCustom = false;
      if (this.data.roundIndex >= this.activeRounds().length) {
        this.data.roundIndex = 0;
        this.data.phase = 'lobby';
        this.data.results = [];
        this.data.score = 0;
        this.data.clues = [];
        this.data.custom = '';
        this.data.picked = null;
      }
      return this.data;
    },

    get: function () {
      if (!this.data) this.load();
      return this.data;
    },

    activeRounds: function () {
      const d = this.get();
      return (d.useCustom && d.customRounds.length) ? d.customRounds : G.rounds;
    },

    save: function () {
      try { localStorage.setItem(KEY, JSON.stringify(this.data)); } catch (e) { /* 隐私模式忽略 */ }
    },

    updatePlayers: function (players) {
      this.data.players = Object.assign({}, this.data.players, players);
      this.save();
      return this.data.players;
    },

    resetAll: function () {
      const keepRounds = this.data.customRounds.slice();
      const keepUse = this.data.useCustom;
      this.data = {
        players: Object.assign({}, G.defaultPlayers),
        roundIndex: 0,
        phase: 'lobby',
        clues: [],
        custom: '',
        picked: null,
        score: 0,
        results: [],
        best: 0,
        bests: {},
        newBest: false,
        customRounds: keepRounds,
        useCustom: keepUse
      };
      this.save();
    }
  };

  window.Store = Store;

  /* ---------------- ui ---------------- */

  const ui = { screen: 'lobby', editingId: null, editScene: '家务' };

  function state() { return Store.get(); }

  function rounds() { return Store.activeRounds(); }

  function bankKey() {
    const s = state();
    return s.useCustom && s.customRounds.length
      ? 'custom:' + s.customRounds.map(function (r) { return r.id; }).join(',')
      : 'builtin';
  }

  function currentBest() {
    const b = state().bests || {};
    return b[bankKey()] || 0;
  }

  function round(index) {
    return rounds()[index == null ? state().roundIndex : index];
  }

  function roles(index) {
    const i = index == null ? state().roundIndex : index;
    return i % 2 === 0 ? { describer: 'a', guesser: 'b' } : { describer: 'b', guesser: 'a' };
  }

  function playerName(key) {
    return state().players[key] || (key === 'a' ? '我' : 'TA');
  }

  function hasForbidden(text) {
    if (!text) return '';
    const r = round();
    if (!r) return '';
    return r.forbidden.filter(function (w) { return text.indexOf(w) > -1; })[0] || '';
  }

  function titleFor(correct, total) {
    const ratio = total ? correct / total : 0;
    if (ratio >= 1) return G.titles[0];
    if (ratio >= 0.6) return G.titles[1];
    if (ratio >= 0.3) return G.titles[2];
    return G.titles[3];
  }

  /* ---------------- screens ---------------- */

  function show(name) {
    ui.screen = name;
    document.body.dataset.screen = name;
    $$('.screen').forEach(function (s) {
      s.classList.toggle('is-active', s.id === 'screen-' + name);
    });
    $('#screens').scrollTop = 0;
    hydrate();
    if (name !== 'reveal') $('#confetti').innerHTML = '';
  }

  /* ---------------- lobby ---------------- */

  function renderLobby() {
    const s = state();
    const total = rounds().length;
    const max = total * 100;
    const inProgress = s.phase !== 'lobby' && s.phase !== 'result' && s.results.length < total;

    $('#pairStrip').innerHTML =
      '<div class="pair-strip__player"><span class="pair-strip__ava">' + esc(s.players.a.slice(0, 1)) + '</span>' +
        '<span class="pair-strip__name">' + esc(s.players.a) + '</span></div>' +
      '<span class="pair-strip__x">×</span>' +
      '<div class="pair-strip__player"><span class="pair-strip__ava pair-strip__ava--b">' + esc(s.players.b.slice(0, 1)) + '</span>' +
        '<span class="pair-strip__name">' + esc(s.players.b) + '</span></div>' +
      '<span class="pair-strip__tag">轮流出题</span>';

    $('#bankName').textContent = s.useCustom
      ? '我的题库 · ' + s.customRounds.length + ' 题'
      : '内置题库 · ' + G.rounds.length + ' 题';
    $('#ruleRounds').textContent = total;
    $('#ruleSub').textContent = total + ' 轮 · 共享默契值';

    const best = currentBest();
    $('#bestLine').textContent = best > 0
      ? '历史最佳：' + best + ' 默契值 / ' + max
      : '历史最佳：还没有记录';

    const main = $('#btnMain');
    if (inProgress) {
      main.textContent = '继续第 ' + (s.roundIndex + 1) + ' 轮';
    } else {
      main.textContent = '开始一局';
    }
    $('#btnRestart').hidden = !inProgress;
    $('#btnLastReport').hidden = !(s.results.length === total);
  }

  function startGame() {
    const s = state();
    s.roundIndex = 0;
    s.phase = 'cover';
    s.clues = [];
    s.custom = '';
    s.picked = null;
    s.score = 0;
    s.results = [];
    s.newBest = false;
    Store.save();
    showCover();
  }

  /* ---------------- cover ---------------- */

  function showCover() {
    const s = state();
    const r = round();
    const role = roles();
    const describer = playerName(role.describer);
    const guesser = playerName(role.guesser);

    $('#coverRound').textContent = pad(s.roundIndex + 1) + ' / ' + pad(rounds().length);
    $('#screen-cover .eyebrow').textContent = '第 ' + (s.roundIndex + 1) + ' 轮';
    $('#coverDescriber').textContent = describer;
    $('#coverHint').textContent = guesser + ' 请先别偷看屏幕。';
    $('#btnBegin').innerHTML = '我是 ' + esc(describer) + '，开始';

    show('cover');
  }

  /* ---------------- describe ---------------- */

  function showDescribe() {
    const s = state();
    const r = round();
    const role = roles();
    const describer = playerName(role.describer);

    $('#descRound').textContent = '第 ' + (s.roundIndex + 1) + ' 轮 · 出题';
    $('#descWho').textContent = describer;
    $('#descName').textContent = describer;
    $('#descTag').innerHTML = icon(r.sceneIcon) + esc(r.scene);
    $('#descBehavior').textContent = r.behavior;
    $('#descTruth').textContent = truthText();
    $('#forbiddenChips').innerHTML = r.forbidden.map(function (w) {
      return '<span class="forbidden-chip">' + esc(w) + '</span>';
    }).join('');

    $('#clueBank').innerHTML = r.clues.map(function (c) {
      return '<button type="button" class="clue-chip' + (s.clues.indexOf(c) > -1 ? ' is-on' : '') + '" data-clue="' + esc(c) + '">' + esc(c) + '</button>';
    }).join('');

    $('#inputCustom').value = s.custom;
    syncCustomState();

    $('#btnSeal').innerHTML = icon('lock') + '封好，交给 ' + esc(playerName(role.guesser));

    syncDescribe();
    show('describe');
  }

  function syncCustomState() {
    const bad = hasForbidden(state().custom);
    const hint = $('#customHint');
    const input = $('#inputCustom');
    if (bad) {
      hint.textContent = '「' + bad + '」不能说，换个说法';
      hint.classList.add('is-error');
      input.classList.add('is-error');
    } else {
      hint.textContent = '别直接把答案说出来';
      hint.classList.remove('is-error');
      input.classList.remove('is-error');
    }
  }

  function truthText() {
    const r = round();
    const m = r.motives.filter(function (x) { return x.id === r.truthId; })[0];
    return m ? m.text : '';
  }

  function syncDescribe() {
    const s = state();
    $$('#clueBank .clue-chip').forEach(function (c) {
      const on = s.clues.indexOf(c.dataset.clue) > -1;
      c.classList.toggle('is-on', on);
      c.classList.toggle('is-dim', !on && s.clues.length >= 3);
    });
    $('#clueCount').textContent = s.clues.length + ' / 3';
    renderCluePreview();
    updateSeal();
  }

  function renderCluePreview() {
    const s = state();
    const role = roles();
    const tokens = s.clues.map(function (c) { return '<span class="clue-token">' + esc(c) + '</span>'; }).join('');
    const custom = s.custom.trim();
    $('#cluePreview').innerHTML =
      '<div class="clue-card__head">' + icon('sparkles') + esc(playerName(role.describer)) + ' 的线索卡</div>' +
      '<div class="clue-chips">' + (tokens || '<span class="clue-card__empty">还没选描述词，先挑三个吧。</span>') + '</div>' +
      (custom ? '<p class="clue-card__custom">「' + esc(custom) + '」</p>' : '');
  }

  function updateSeal() {
    const s = state();
    const bad = hasForbidden(s.custom);
    $('#btnSeal').disabled = s.clues.length !== 3 || !!bad;
  }

  /* ---------------- pass ---------------- */

  function showPass() {
    const s = state();
    const role = roles();
    const guesser = playerName(role.guesser);

    $('#passGuesser').textContent = guesser;
    $('#passGuesser2').textContent = guesser;
    $('#sealedPeek').innerHTML =
      '<span class="sealed__dots"><i></i><i></i><i></i></span>' +
      '<span><strong>已封好 ' + s.clues.length + ' 个描述词</strong><br/>猜的人只能看到线索，看不到真实原因。</span>';

    show('pass');
  }

  /* ---------------- guess ---------------- */

  function showGuess() {
    const s = state();
    const r = round();
    const role = roles();
    const describer = playerName(role.describer);
    const guesser = playerName(role.guesser);

    $('#guessRound').textContent = '第 ' + (s.roundIndex + 1) + ' 轮 · 来猜';
    $('#guessWho').textContent = guesser;
    $('#guessTag').innerHTML = icon(r.sceneIcon) + esc(r.scene);
    $('#guessBehavior').textContent = r.behavior;
    $('#clueFrom').textContent = describer + ' 给的线索';

    $('#guessClues').innerHTML = s.clues.map(function (c) {
      return '<span class="clue-token">' + esc(c) + '</span>';
    }).join('');

    const custom = s.custom.trim();
    $('#guessCustom').textContent = custom ? '「' + custom + '」' : '';
    $('#guessCustom').style.display = custom ? 'block' : 'none';

    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    $('#optionList').innerHTML = r.motives.map(function (m, i) {
      return '<button type="button" class="option' + (s.picked === m.id ? ' is-on' : '') + '" data-option="' + esc(m.id) + '">' +
        '<span class="option__letter">' + (letters[i] || (i + 1)) + '</span>' +
        '<span class="option__text">' + esc(m.text) + '</span>' +
      '</button>';
    }).join('');

    $('#btnJudge').disabled = !s.picked;

    show('guess');
  }

  /* ---------------- reveal ---------------- */

  function showReveal() {
    const s = state();
    const r = round();
    const res = s.results[s.results.length - 1];
    const role = roles();
    const guesser = playerName(role.guesser);
    const truth = truthText();
    const picked = r.motives.filter(function (m) { return m.id === (res && res.pickedId); })[0];

    const stamp = $('#revealStamp');
    stamp.textContent = res && res.correct ? '猜对了！' : '猜歪了';
    stamp.classList.toggle('is-fail', !(res && res.correct));
    $('#revealSub').textContent = res && res.correct ? '你们想到一块去了' : '你们想的，不是同一件事';
    $('#revealScore').textContent = '+' + (res && res.correct ? 100 : 25);
    $('#revealTruth').textContent = truth;

    const pickBlock = $('#revealPickBlock');
    if (res && !res.correct) {
      pickBlock.hidden = false;
      $('#revealPickLabel').innerHTML = icon('sparkles') + esc(guesser) + ' 猜的是';
      $('#revealPick').textContent = picked ? picked.text : '';
    } else {
      pickBlock.hidden = true;
    }

    $('#revealTip').textContent = r.tip;
    $('#btnNext').textContent = s.roundIndex < rounds().length - 1
      ? '进入第 ' + (s.roundIndex + 2) + ' 轮'
      : '看默契报告';

    show('reveal');
    if (res && res.correct) burstConfetti();
  }

  function burstConfetti() {
    const box = $('#confetti');
    const colors = ['#D6402A', '#2E9DB8', '#A8CE4A', '#FFCF5C', '#F08A5D'];
    box.innerHTML = '';
    for (let i = 0; i < 16; i++) {
      const el = document.createElement('i');
      el.style.left = (Math.random() * 96 + 2) + '%';
      el.style.background = colors[i % colors.length];
      el.style.animationDuration = (0.9 + Math.random() * 0.7) + 's';
      el.style.animationDelay = (Math.random() * 0.25) + 's';
      el.style.width = (6 + Math.random() * 5) + 'px';
      el.style.height = (10 + Math.random() * 8) + 'px';
      box.appendChild(el);
    }
    setTimeout(function () { box.innerHTML = ''; }, 2000);
  }

  /* ---------------- result ---------------- */

  function finishGame() {
    const s = state();
    s.phase = 'result';
    const key = bankKey();
    if (!s.bests) s.bests = {};
    if (s.score > (s.bests[key] || 0)) {
      s.bests[key] = s.score;
      s.newBest = true;
    } else {
      s.newBest = false;
    }
    Store.save();
    showResult();
  }

  function showResult() {
    const s = state();
    const total = rounds().length;
    const max = total * 100;
    const correct = s.results.filter(function (r) { return r.correct; }).length;
    const title = titleFor(correct, total);

    $('#resultTitle').textContent = title.name;
    $('#resultDesc').textContent = title.desc;
    $('#resultMaxLabel').textContent = '默契值 / ' + max;
    $('#resultMeta').textContent = '猜中 ' + correct + ' / ' + total + ' · ' + (s.newBest ? '新纪录！' : '继续保持');
    animateNumber($('#resultScore'), s.score);

    $('#resultRows').innerHTML = s.results.map(function (res, i) {
      const r = rounds()[res.roundIndex];
      const truth = (r.motives.filter(function (m) { return m.id === r.truthId; })[0] || {}).text || '';
      return '<div class="result-row">' +
        '<span class="result-row__no">' + pad(i + 1) + '</span>' +
        '<div class="result-row__body">' +
          '<div class="result-row__top">' +
            '<span class="result-row__scene">' + esc(r.scene) + '</span>' +
            '<span class="result-row__mark ' + (res.correct ? 'result-row__mark--ok' : 'result-row__mark--fail') + '">' +
              (res.correct ? '猜中' : '猜歪') +
            '</span>' +
          '</div>' +
          '<p class="result-row__behavior">' + esc(r.behavior) + '</p>' +
          '<p class="result-row__truth"><b>真实原因：</b>' + esc(truth) + '</p>' +
        '</div>' +
      '</div>';
    }).join('');

    const best = currentBest();
    $('#bestNote').textContent = best > 0
      ? '历史最佳：' + best + ' 默契值 / ' + max + (s.newBest ? ' · 这次是最高分' : '')
      : '';

    show('result');
  }

  /* ---------------- sheets ---------------- */

  function openSheet(html) {
    $('#sheetBody').innerHTML = html;
    $('#sheet').classList.add('is-open');
    $('#sheet').setAttribute('aria-hidden', 'false');
    $('#sheetBackdrop').classList.add('is-open');
    hydrate($('#sheet'));
  }

  function closeSheet() {
    $('#sheet').classList.remove('is-open');
    $('#sheet').setAttribute('aria-hidden', 'true');
    $('#sheetBackdrop').classList.remove('is-open');
  }

  function openSettings() {
    const s = state();
    openSheet(
      '<h3 class="sheet__title">玩家设置</h3>' +
      '<p class="sheet__desc">名字会出现在轮流出题和默契报告里。数据只存在这台手机。</p>' +
      '<label class="field" style="margin-bottom:12px"><span class="field__label">玩家 A</span>' +
        '<input class="input" id="setA" maxlength="8" value="' + esc(s.players.a) + '" autocomplete="off"/></label>' +
      '<label class="field" style="margin-bottom:12px"><span class="field__label">玩家 B</span>' +
        '<input class="input" id="setB" maxlength="8" value="' + esc(s.players.b) + '" autocomplete="off"/></label>' +
      '<div class="sheet__actions">' +
        '<button class="btn btn--primary btn--block" data-sheet-action="save-players">' + icon('check') + '保存</button>' +
        '<button class="btn btn--ghost btn--block" data-sheet-action="reset-all">' + icon('refresh') + '清空进度与历史最佳</button>' +
        '<button class="btn btn--ghost btn--block" data-sheet-action="close">' + icon('x') + '关掉</button>' +
      '</div>'
    );
  }

  function openShare() {
    const s = state();
    const total = rounds().length;
    const max = total * 100;
    const correct = s.results.filter(function (r) { return r.correct; }).length;
    const title = titleFor(correct, total);

    openSheet(
      '<h3 class="sheet__title">分享默契报告</h3>' +
      '<p class="sheet__desc">截图或复制文字都可以。</p>' +
      '<div class="share-card">' +
        '<div class="share-card__brand">WHY-OH-WHY</div>' +
        '<h3>' + esc(s.players.a) + ' × ' + esc(s.players.b) + ' 的默契报告</h3>' +
        '<div class="share-card__sub">' + esc(title.name) + ' · 猜中 ' + correct + ' / ' + total + '</div>' +
        '<div class="share-card__score"><b>' + s.score + '</b><span>默契值 / ' + max + '</span></div>' +
        '<div class="share-card__rows">' +
          s.results.map(function (res, i) {
            const r = rounds()[res.roundIndex];
            return '<div class="share-card__row"><b>' + pad(i + 1) + ' · ' + esc(r.scene) + '</b> ' +
              (res.correct ? '✓ 猜中' : '✗ 猜歪') + '｜' + esc(r.behavior) + '</div>';
          }).join('') +
        '</div>' +
      '</div>' +
      '<div class="sheet__actions">' +
        '<button class="btn btn--primary btn--block" data-sheet-action="copy-report">' + icon('copy') + '复制文字版</button>' +
        '<button class="btn btn--ghost btn--block" data-sheet-action="save-image">' + icon('share') + '保存长图（演示）</button>' +
        '<button class="btn btn--ghost btn--block" data-sheet-action="close">' + icon('x') + '关掉</button>' +
      '</div>'
    );
  }

  function openExit() {
    openSheet(
      '<h3 class="sheet__title">先回开场？</h3>' +
      '<p class="sheet__desc">这一轮的线索会保留，下次从封面继续。已经完成的轮次不会丢。</p>' +
      '<div class="sheet__actions">' +
        '<button class="btn btn--primary btn--block" data-sheet-action="exit-lobby">回开场</button>' +
        '<button class="btn btn--ghost btn--block" data-sheet-action="close">继续出题</button>' +
      '</div>'
    );
  }

  async function copyReport() {
    const res = await apiGenerateReport();
    await copyText(res.data.text);
    toast('报告已复制，去粘给 TA 吧');
  }

  /* ---------------- custom bank ---------------- */

  function truthOf(r) {
    const m = (r.motives || []).filter(function (x) { return x.id === r.truthId; })[0];
    return m ? m.text : '';
  }

  function resetProgressForBank() {
    const s = state();
    s.roundIndex = 0;
    s.phase = 'lobby';
    s.clues = [];
    s.custom = '';
    s.picked = null;
    s.score = 0;
    s.results = [];
    s.newBest = false;
    Store.save();
  }

  function showBank() {
    renderBank();
    show('bank');
  }

  function renderBank() {
    const s = state();
    $('#bankCount').textContent = s.customRounds.length + ' 题';
    $('#bankListCount').textContent = s.customRounds.length ? '共 ' + s.customRounds.length + ' 题' : '';
    const segs = $$('#bankSeg .seg__btn');
    if (segs[0]) segs[0].textContent = '内置题库 · ' + G.rounds.length + ' 题';
    if (segs[1]) segs[1].textContent = '我的题库' + (s.customRounds.length ? ' · ' + s.customRounds.length + ' 题' : '');
    segs.forEach(function (b) {
      b.classList.toggle('is-on', b.dataset.bank === (s.useCustom ? 'custom' : 'builtin'));
    });

    const list = $('#bankList');
    if (!s.customRounds.length) {
      list.innerHTML =
        '<div class="empty"><div class="empty__face">' + icon('book-open') + '</div>' +
        '<h3>还没有自己的题目</h3><p>点下面的「新建一题」，把你们真实遇到的迷惑行为写进去。</p></div>';
      return;
    }

    list.innerHTML = s.customRounds.map(function (r) {
      return '<button class="bank-card" data-edit="' + esc(r.id) + '">' +
        '<div class="bank-card__top">' +
          '<span class="tag">' + icon(r.sceneIcon) + esc(r.scene) + '</span>' +
          '<span class="bank-card__edit">编辑 ›</span>' +
        '</div>' +
        '<p class="bank-card__behavior">' + esc(r.behavior) + '</p>' +
        '<p class="bank-card__truth">真实动机：' + esc(truthOf(r)) + '</p>' +
      '</button>';
    }).join('');
  }

  function setBankMode(mode) {
    const s = state();
    const target = mode === 'custom';
    if (s.useCustom === target) return;
    if (target && !s.customRounds.length) {
      toast('先新建一题，再切换到我的题库');
      return;
    }
    s.useCustom = target;
    resetProgressForBank();
    renderLobby();
    renderBank();
    toast(mode === 'custom' ? '已切换到我的题库' : '已切换回内置题库');
  }

  function renderEditorScenes() {
    $('#editorScenes').innerHTML = G.scenes.map(function (sc) {
      return '<button type="button" class="chip' + (sc.key === ui.editScene ? ' is-on' : '') +
        '" data-scene="' + esc(sc.key) + '">' + icon(sc.icon) + esc(sc.key) + '</button>';
    }).join('');
  }

  function openEditor(id) {
    const s = state();
    const editing = id ? s.customRounds.filter(function (r) { return r.id === id; })[0] : null;
    ui.editingId = editing ? editing.id : null;
    ui.editScene = editing ? editing.scene : '家务';

    $('#editorKicker').textContent = editing ? '编辑题目' : '新建一题';
    $('#btnEditorDelete').hidden = !editing;
    renderEditorScenes();

    $('#editBehavior').value = editing ? editing.behavior : '';
    $('#editTruth').value = editing ? truthOf(editing) : '';
    $('#editTip').value = editing ? (editing.tip || '') : '';
    $('#editClues').value = editing ? editing.clues.join('、') : '';
    $('#editForbidden').value = editing ? editing.forbidden.join('、') : '';

    const distractors = editing
      ? editing.motives.filter(function (m) { return m.id !== editing.truthId; }).map(function (m) { return m.text; })
      : [];

    $('#distractorFields').innerHTML = [1, 2, 3, 4, 5].map(function (i) {
      return '<input class="input" id="editD' + i + '" maxlength="40" autocomplete="off" placeholder="干扰动机 ' + i + '，例：其实他只是懒得动">';
    }).join('');
    for (let i = 1; i <= 5; i++) {
      $('#editD' + i).value = distractors[i - 1] || '';
    }

    hydrate();
    show('editor');
  }

  function parseList(str) {
    const out = [];
    String(str || '').split(/[、,，\s]+/).forEach(function (w) {
      const t = w.trim();
      if (t && out.indexOf(t) < 0) out.push(t);
    });
    return out;
  }

  function validateRoundForm() {
    const scene = ui.editScene;
    const sceneMeta = G.scenes.filter(function (x) { return x.key === scene; })[0] || G.scenes[0];
    const behavior = $('#editBehavior').value.trim();
    const truth = $('#editTruth').value.trim();
    const distractors = [];
    for (let i = 1; i <= 5; i++) distractors.push($('#editD' + i).value.trim());
    const clues = parseList($('#editClues').value);
    const forbidden = parseList($('#editForbidden').value);
    const tip = $('#editTip').value.trim();

    if (behavior.length < 5) return { err: '迷惑行为再多写几个字' };
    if (truth.length < 4) return { err: '真实动机太短了' };
    if (distractors.some(function (d) { return d.length < 2; })) return { err: '5 个干扰动机都要填，至少 2 个字' };
    const all = [truth].concat(distractors);
    if (all.filter(function (t, i, arr) { return arr.indexOf(t) === i; }).length !== all.length) {
      return { err: '真实动机和干扰项不要重复' };
    }
    if (clues.length < 6) return { err: '描述词至少 6 个，用顿号分隔' };
    if (clues.length > 12) return { err: '描述词最多 12 个' };
    if (!forbidden.length) return { err: '至少写 1 个禁用词' };
    if (forbidden.length > 3) return { err: '禁用词最多 3 个' };
    const conflict = forbidden.filter(function (w) {
      return clues.some(function (c) { return c.indexOf(w) > -1; });
    })[0];
    if (conflict) return { err: '描述词和禁用词「' + conflict + '」冲突，换一个' };

    return {
      ok: {
        scene: sceneMeta.key,
        sceneIcon: sceneMeta.icon,
        behavior: behavior,
        truth: truth,
        distractors: distractors,
        clues: clues,
        forbidden: forbidden,
        tip: tip || '下次直接问：你当时到底是怎么想的？'
      }
    };
  }

  function saveRound() {
    const v = validateRoundForm();
    if (v.err) { toast(v.err, 2600); return; }
    const s = state();
    const r = v.ok;
    const rid = ui.editingId || ('c' + Date.now());

    const texts = [r.truth].concat(r.distractors);
    for (let i = texts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = texts[i];
      texts[i] = texts[j];
      texts[j] = tmp;
    }
    const motives = texts.map(function (t, i) { return { id: rid + 'm' + i, text: t }; });
    const truthId = motives.filter(function (m) { return m.text === r.truth; })[0].id;

    const roundObj = {
      id: rid,
      scene: r.scene,
      sceneIcon: r.sceneIcon,
      behavior: r.behavior,
      truthId: truthId,
      motives: motives,
      forbidden: r.forbidden,
      clues: r.clues,
      tip: r.tip
    };

    if (ui.editingId) {
      s.customRounds = s.customRounds.map(function (x) { return x.id === ui.editingId ? roundObj : x; });
    } else {
      s.customRounds.push(roundObj);
    }
    s.useCustom = true;
    ui.editingId = null;
    resetProgressForBank();
    renderLobby();
    renderBank();
    show('bank');
    toast('已保存，并切换到我的题库');
  }

  function openDeleteRound() {
    const s = state();
    const r = s.customRounds.filter(function (x) { return x.id === ui.editingId; })[0];
    if (!r) return;
    openSheet(
      '<h3 class="sheet__title">删除这道题？</h3>' +
      '<p class="sheet__desc">「' + esc(r.behavior) + '」会从我的题库里移除，删除后无法恢复。</p>' +
      '<div class="sheet__actions">' +
        '<button class="btn btn--primary btn--block" data-sheet-action="delete-round" style="background:var(--tomato)">' + icon('trash') + '确认删除</button>' +
        '<button class="btn btn--ghost btn--block" data-sheet-action="close">' + icon('x') + '算了</button>' +
      '</div>'
    );
  }

  function deleteEditingRound() {
    const s = state();
    s.customRounds = s.customRounds.filter(function (x) { return x.id !== ui.editingId; });
    if (!s.customRounds.length) s.useCustom = false;
    ui.editingId = null;
    resetProgressForBank();
    renderLobby();
    renderBank();
    show('bank');
    closeSheet();
    toast(s.customRounds.length ? '已删除这道题' : '已删除，题库切回内置');
  }

  /* ---------------- interactions ---------------- */

  function handleClue(el) {
    const s = state();
    const value = el.dataset.clue;
    const i = s.clues.indexOf(value);
    if (i > -1) {
      s.clues.splice(i, 1);
    } else {
      if (s.clues.length >= 3) { toast('最多只能选 3 个描述词'); return; }
      s.clues.push(value);
    }
    Store.save();
    syncDescribe();
  }

  function handleOption(el) {
    const s = state();
    s.picked = el.dataset.option;
    Store.save();
    $$('#optionList .option').forEach(function (o) {
      o.classList.toggle('is-on', o.dataset.option === s.picked);
    });
    $('#btnJudge').disabled = false;
  }

  function bind() {
    $('#btnSettings').addEventListener('click', openSettings);
    $('#btnBank').addEventListener('click', showBank);
    $('#btnBankBack').addEventListener('click', function () {
      renderLobby();
      show('lobby');
    });
    $('#btnNewRound').addEventListener('click', function () { openEditor(null); });
    $('#btnEditorBack').addEventListener('click', function () {
      ui.editingId = null;
      renderBank();
      show('bank');
    });
    $('#btnEditorDelete').addEventListener('click', openDeleteRound);
    $('#btnSaveRound').addEventListener('click', saveRound);

    $('#btnMain').addEventListener('click', function () {
      const s = state();
      const inProgress = s.phase !== 'lobby' && s.phase !== 'result' && s.results.length < rounds().length;
      if (inProgress) {
        if (s.phase === 'cover') showCover();
        else if (s.phase === 'describe') showDescribe();
        else if (s.phase === 'pass') showPass();
        else if (s.phase === 'guess') showGuess();
        else if (s.phase === 'reveal') showReveal();
      } else {
        startGame();
      }
    });

    $('#btnRestart').addEventListener('click', startGame);
    $('#btnLastReport').addEventListener('click', showResult);

    $('#btnBegin').addEventListener('click', function () {
      state().phase = 'describe';
      Store.save();
      showDescribe();
    });

    $('#btnSeal').addEventListener('click', function () {
      const s = state();
      if (s.clues.length !== 3) { toast('先挑满 3 个描述词'); return; }
      const bad = hasForbidden(s.custom);
      if (bad) { toast('「' + bad + '」是禁用词，换种说法'); return; }
      s.phase = 'pass';
      Store.save();
      showPass();
    });

    $('#btnHand').addEventListener('click', function () {
      state().phase = 'guess';
      Store.save();
      showGuess();
    });

    $('#btnBackDescribe').addEventListener('click', function () {
      state().phase = 'describe';
      Store.save();
      showDescribe();
    });

    $('#inputCustom').addEventListener('input', function () {
      state().custom = this.value;
      Store.save();
      syncCustomState();
      renderCluePreview();
      updateSeal();
    });

    $('#btnJudge').addEventListener('click', function () {
      const btn = this;
      const s = state();
      if (!s.picked) { toast('先选一个最像的动机'); return; }
      withLoading(btn, '正在揭晓…', function () {
        return apiJudgeGuess(s.roundIndex, s.picked).then(function (res) {
          if (res.code !== 0) { toast('这一轮出了点问题'); return; }
          s.score += res.data.correct ? 100 : 25;
          s.results.push({ roundIndex: s.roundIndex, correct: res.data.correct, pickedId: s.picked });
          s.phase = 'reveal';
          Store.save();
          showReveal();
        });
      });
    });

    $('#btnNext').addEventListener('click', function () {
      const s = state();
      if (s.roundIndex >= rounds().length - 1) {
        finishGame();
        return;
      }
      s.roundIndex += 1;
      s.clues = [];
      s.custom = '';
      s.picked = null;
      s.phase = 'cover';
      Store.save();
      showCover();
    });

    $('#btnReplay').addEventListener('click', startGame);
    $('#btnToLobby').addEventListener('click', function () {
      state().phase = 'lobby';
      Store.save();
      renderLobby();
      show('lobby');
    });
    $('#btnShare').addEventListener('click', openShare);

    document.addEventListener('click', function (ev) {
      const clue = ev.target.closest('.clue-chip[data-clue]');
      if (clue) { handleClue(clue); return; }

      const option = ev.target.closest('.option[data-option]');
      if (option) { handleOption(option); return; }

      const bankCard = ev.target.closest('[data-edit]');
      if (bankCard) { openEditor(bankCard.dataset.edit); return; }

      const bankBtn = ev.target.closest('[data-bank]');
      if (bankBtn) { setBankMode(bankBtn.dataset.bank); return; }

      const sceneBtn = ev.target.closest('[data-scene]');
      if (sceneBtn) {
        ui.editScene = sceneBtn.dataset.scene;
        renderEditorScenes();
        return;
      }

      const act = ev.target.closest('[data-act]');
      if (act) {
        if (act.dataset.act === 'exit') {
          openExit();
        }
        return;
      }

      const sheetAction = ev.target.closest('[data-sheet-action]');
      if (sheetAction) {
        const action = sheetAction.dataset.sheetAction;
        if (action === 'close') closeSheet();
        if (action === 'exit-lobby') {
          closeSheet();
          state().phase = 'cover';
          Store.save();
          renderLobby();
          show('lobby');
          toast('进度已保留，可以从封面继续');
        }
        if (action === 'copy-report') {
          copyReport().then(closeSheet);
        }
        if (action === 'save-image') {
          toast('分享长图已生成（演示，可在此接截图能力）');
        }
        if (action === 'delete-round') {
          deleteEditingRound();
        }
        if (action === 'save-players') {
          const a = $('#setA').value.trim();
          const b = $('#setB').value.trim();
          if (!a || !b) { toast('两个名字都要填'); return; }
          if (a === b) { toast('两个人的名字要不一样'); return; }
          const btn = sheetAction;
          withLoading(btn, '保存中…', function () {
            return apiUpdatePlayers({ a: a, b: b }).then(function () {
              closeSheet();
              renderLobby();
              toast('已经保存');
            });
          });
        }
        if (action === 'reset-all') {
          openSheet(
            '<h3 class="sheet__title">清空进度与历史最佳？</h3>' +
            '<p class="sheet__desc">昵称、最佳成绩和当前进度会重置；你自己出的题目会保留。</p>' +
            '<div class="sheet__actions">' +
              '<button class="btn btn--primary btn--block" data-sheet-action="reset-confirm" style="background:var(--tomato)">' + icon('refresh') + '确认清空</button>' +
              '<button class="btn btn--ghost btn--block" data-sheet-action="close">' + icon('x') + '算了</button>' +
            '</div>'
          );
        }
        if (action === 'reset-confirm') {
          Store.resetAll();
          closeSheet();
          renderLobby();
          show('lobby');
          toast('已重置，重新开始吧');
        }
      }
    });

    $('#sheetBackdrop').addEventListener('click', closeSheet);
  }

  /* ---------------- clock / boot ---------------- */

  function startClock() {
    function tick() {
      const now = new Date();
      $('#clock').textContent = pad(now.getHours()) + ':' + pad(now.getMinutes());
    }
    tick();
    setInterval(tick, 30000);
  }

  function boot() {
    Store.load();
    bind();
    hydrate();
    startClock();
    renderLobby();
    show('lobby');
  }

  boot();
})();
