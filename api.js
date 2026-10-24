/**
 * api.js — 异步服务层（当前全部走本地 mock）
 * 接入真实后端时，保持签名与返回结构不变，只替换函数体即可。
 */

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * POST /api/rounds/:index/judge — 判定本轮猜测
 * request: { pickedId }
 * response: { code, data: { correct, truthId } }
 */
async function apiJudgeGuess(roundIndex, pickedId) {
  await sleep(820);
  // TODO: replace with fetch(`/api/rounds/${roundIndex}/judge`, { method: 'POST', body })
  const round = window.Store.activeRounds()[roundIndex];
  if (!round) return { code: 404, message: '轮次不存在' };
  return {
    code: 0,
    data: {
      correct: pickedId === round.truthId,
      truthId: round.truthId
    }
  };
}

/**
 * PATCH /api/profile — 修改两位玩家昵称
 * request: { a, b }
 */
async function apiUpdatePlayers(players) {
  await sleep(240);
  // TODO: replace with fetch('/api/profile', { method: 'PATCH', body })
  window.Store.updatePlayers(players);
  return { code: 0, data: window.Store.get().players };
}

/**
 * GET /api/report — 生成可分享的默契报告纯文本
 * response: { code, data: { text } }
 */
async function apiGenerateReport() {
  await sleep(280);
  // TODO: replace with fetch('/api/report')
  const s = window.Store.get();
  const G = window.GameData;
  const list = window.Store.activeRounds();
  const total = list.length;
  const max = total * 100;
  const correct = s.results.filter((r) => r.correct).length;
  const ratio = total ? correct / total : 0;
  const titleIdx = ratio >= 1 ? 0 : ratio >= 0.6 ? 1 : ratio >= 0.3 ? 2 : 3;
  const title = G.titles[titleIdx];
  const lines = s.results.map((r, i) => {
    const round = list[r.roundIndex];
    return `${i + 1}. ${round.scene} ${r.correct ? '✓' : '✗'}｜${round.behavior}`;
  });
  const text = [
    '《这到底为啥啊》默契报告',
    `${s.players.a} × ${s.players.b} · 猜中 ${correct}/${total} · 默契值 ${s.score}/${max}`,
    `称号：${title.name}`,
    ...lines
  ].join('\n');
  return { code: 0, data: { text } };
}
