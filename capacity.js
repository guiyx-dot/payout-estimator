const CHANNELS = [
  { id: "caikang", supplier: "财康", name: "支付宝-新车", method: "支付宝", scheme: "非税方案", scenes: ["新车"], perTxn: null, personDaily: null, capTxn: 2000, capAmount: 500000, usedTxn: 412, usedAmount: 186000, note: "每人原不限制，日产能按模拟结算上限" },
  { id: "liuliu-1", supplier: "六六猴", name: "微信-①", method: "微信", scheme: "连续劳务", scenes: ["续保"], perTxn: 200, personDaily: 2000, capTxn: 400, capAmount: 80000, usedTxn: 260, usedAmount: 52000 },
  { id: "liuliu-2", supplier: "六六猴", name: "微信-②", method: "微信", scheme: "连续劳务", scenes: ["续保"], perTxn: 200, personDaily: 2000, capTxn: 400, capAmount: 80000, usedTxn: 305, usedAmount: 61000 },
  { id: "liuliu-3", supplier: "六六猴", name: "微信-③", method: "微信", scheme: "连续劳务", scenes: ["续保"], perTxn: 200, personDaily: 2000, capTxn: 300, capAmount: 60000, usedTxn: 270, usedAmount: 54000 },
  { id: "jishifa-wx-1", supplier: "及时发", name: "微信-①", method: "微信", scheme: "连续劳务", scenes: ["续保", "新车"], perTxn: 200, personDaily: 2000, capTxn: 500, capAmount: 100000, usedTxn: 365, usedAmount: 73000 },
  { id: "jishifa-wx-2", supplier: "及时发", name: "微信-②", method: "微信", scheme: "连续劳务", scenes: ["续保", "新车"], perTxn: 200, personDaily: 2000, capTxn: 500, capAmount: 100000, usedTxn: 440, usedAmount: 88000 },
  { id: "jishifa-wx-3", supplier: "及时发", name: "微信-③", method: "微信", scheme: "连续劳务", scenes: ["续保", "新车"], perTxn: 200, personDaily: 2000, capTxn: 400, capAmount: 80000, usedTxn: 400, usedAmount: 80000 },
  { id: "jishifa-ali", supplier: "及时发", name: "支付宝", method: "支付宝", scheme: "非税方案", scenes: ["续保", "新车"], perTxn: 1000, personDaily: 1000, capTxn: 120, capAmount: 120000, usedTxn: 46, usedAmount: 46000 },
  { id: "nashang-1", supplier: "纳尚", name: "微信-①", method: "微信", scheme: "连续劳务", scenes: ["续保"], perTxn: 200, personDaily: 500, capTxn: 200, capAmount: 40000, usedTxn: 145, usedAmount: 29000 },
  { id: "nashang-2", supplier: "纳尚", name: "微信-②", method: "微信", scheme: "连续劳务", scenes: ["续保"], perTxn: 200, personDaily: 500, capTxn: 200, capAmount: 40000, usedTxn: 185, usedAmount: 37000 },
  { id: "nashang-3", supplier: "纳尚", name: "微信-③", method: "微信", scheme: "连续劳务", scenes: ["续保"], perTxn: 200, personDaily: 500, capTxn: 150, capAmount: 30000, usedTxn: 60, usedAmount: 12000 },
  { id: "ganen-ali", supplier: "感恩", name: "支付宝", method: "支付宝", scheme: "非税方案", scenes: ["事故车"], perTxn: null, personDaily: null, capTxn: null, capAmount: null, usedTxn: null, usedAmount: null, unknown: true },
  { id: "ganen-bank", supplier: "感恩", name: "银行卡", method: "银行卡", scheme: "非税方案", scenes: ["事故车"], perTxn: null, personDaily: null, capTxn: null, capAmount: null, usedTxn: null, usedAmount: null, unknown: true },
  { id: "luxi", supplier: "鹿喜", name: "微信", method: "微信", scheme: "连续劳务", scenes: ["续保"], perTxn: 200, personDaily: 2000, capTxn: 450, capAmount: 90000, usedTxn: 205, usedAmount: 41000 },
  { id: "jiji", supplier: "季积", name: "支付宝", method: "支付宝", scheme: "非税方案", scenes: ["续保", "新车"], perTxn: 500, personDaily: 1000, capTxn: 160, capAmount: 80000, usedTxn: 66, usedAmount: 33000 },
  { id: "lushutong-wx", supplier: "鹿数通", name: "微信", method: "微信", scheme: "连续劳务", scenes: ["续保", "新车"], perTxn: 200, personDaily: 1000, capTxn: 350, capAmount: 70000, usedTxn: 275, usedAmount: 55000 },
  { id: "lushutong-ali", supplier: "鹿数通", name: "支付宝", method: "支付宝", scheme: "非税方案", scenes: ["续保", "新车"], perTxn: 200, personDaily: 1000, capTxn: 350, capAmount: 70000, usedTxn: 110, usedAmount: 22000 },
];

const METHOD_ORDER = ["微信", "支付宝", "银行卡"];
const SCENE_ORDER = ["新车", "续保", "事故车"];
const STATUS_ORDER = ["充足", "紧张", "耗尽", "未知"];
const SCHEME_ORDER = ["连续劳务", "非税方案"];
const CHART_VIEWS = ["channel", "goods"];
const GOODS = [
  { id: "wx-coin", name: "微信通用币", line1: "微信", line2: "通用币", method: "微信", cap: 420000, used: 336000 },
  { id: "wx-minus", name: "微信立减金", line1: "微信", line2: "立减金", method: "微信", cap: 180000, used: 126000 },
  { id: "ali-coin", name: "支付宝通用币", line1: "支付宝", line2: "通用币", method: "支付宝", cap: 380000, used: 228000 },
  { id: "ali-quan", name: "支付宝通用券", line1: "支付宝", line2: "通用券", method: "支付宝", cap: 260000, used: 182000 },
  { id: "ali-plus", name: "支付宝通用券Plus", line1: "支付宝", line2: "通用券Plus", method: "支付宝", cap: 150000, used: 45000 },
  { id: "ygf", name: "因公付", line1: "因公付", line2: "企业权益", method: "", cap: 90000, used: 27000 },
  { id: "wjl", name: "万佳乐", line1: "万佳乐", line2: "京东E卡", method: "", cap: 70000, used: 14000 },
];

const TODAY = "2026-11-05";
const DATE_MIN = "2026-10-01";
const BASE_DAY = "2026-11-02";

const $ = (id) => document.getElementById(id);
const state = { scene: "", method: "", status: "", scheme: "", chart: "channel", from: BASE_DAY, to: BASE_DAY };

function clampDate(s) {
  if (!s || s < DATE_MIN) return DATE_MIN;
  if (s > TODAY) return TODAY;
  return s;
}
function shiftDate(s, days) {
  const d = new Date(s + "T00:00:00");
  d.setDate(d.getDate() + days);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return clampDate(`${y}-${m}-${day}`);
}
function dayList() {
  let from = clampDate(state.from);
  let to = clampDate(state.to);
  if (from > to) [from, to] = [to, from];
  state.from = from;
  state.to = to;
  const out = [];
  let cur = from;
  while (cur <= to) {
    out.push(cur);
    const next = shiftDate(cur, 1);
    if (next === cur) break;
    cur = next;
  }
  return out;
}
function hash01(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619);
  return (h >>> 0) / 4294967296;
}
function scaleDay(base, cap, key, date) {
  if (base == null || cap == null) return base;
  if (date === BASE_DAY) return Math.min(cap, base);
  const dow = new Date(date + "T00:00:00").getDay();
  const weekend = dow === 0 || dow === 6 ? 0.7 : 1;
  const f = (0.42 + hash01(key + "|" + date) * 0.58) * weekend;
  return Math.min(cap, Math.max(0, Math.round(base * f)));
}
function datedChannels() {
  const days = dayList();
  const n = days.length;
  return CHANNELS.map((ch) => {
    if (ch.unknown || ch.capAmount == null) return { ...ch };
    const usedAmount = days.reduce((s, d) => s + scaleDay(ch.usedAmount, ch.capAmount, ch.id, d), 0);
    const usedTxn = ch.capTxn == null ? ch.usedTxn : days.reduce((s, d) => s + scaleDay(ch.usedTxn, ch.capTxn, ch.id + "-txn", d), 0);
    return {
      ...ch,
      capAmount: ch.capAmount * n,
      capTxn: ch.capTxn == null ? ch.capTxn : ch.capTxn * n,
      usedAmount,
      usedTxn,
    };
  });
}
function datedGoods() {
  const days = dayList();
  const n = days.length;
  return GOODS.map((g) => {
    const used = days.reduce((s, d) => s + scaleDay(g.used, g.cap, g.id, d), 0);
    return { ...g, cap: g.cap * n, used };
  });
}

function yuan(n) {
  return n.toLocaleString("zh-CN", { maximumFractionDigits: 0 });
}
function money(n) {
  return "¥" + yuan(n);
}
function wan(n) {
  if (n >= 10000) {
    const v = n / 10000;
    return (Number.isInteger(v) ? v : v.toFixed(1)) + " 万";
  }
  return money(n);
}
function pct(t) {
  return t.cap ? Math.round(t.rate * 100) + "%" : "—";
}
function statusOf(ch) {
  if (ch.unknown || ch.capAmount == null) return "未知";
  if (ch.capAmount - ch.usedAmount <= 0) return "耗尽";
  if (ch.usedAmount / ch.capAmount >= 0.8) return "紧张";
  return "充足";
}
function barClass(st) {
  return st === "耗尽" ? "empty" : st === "紧张" ? "tight" : st === "未知" ? "unk" : "ok";
}
function scoped() {
  return datedChannels().filter((ch) => {
    if (state.scene && !ch.scenes.includes(state.scene)) return false;
    if (state.method && ch.method !== state.method) return false;
    return true;
  });
}
function visible() {
  return scoped().filter((ch) => {
    if (state.scheme && ch.scheme !== state.scheme) return false;
    return true;
  });
}
function schemeBadge(ch) {
  const short = ch.scheme === "非税方案" ? "非税" : "劳务";
  return `<i class="scheme-tag sch-${ch.scheme}">${short}</i>`;
}
function schemeStats(list) {
  return SCHEME_ORDER.map((scheme) => {
    const subset = list.filter((ch) => ch.scheme === scheme);
    return { scheme, n: subset.length, ...sumKnown(subset) };
  });
}
function sumKnown(list) {
  const known = list.filter((ch) => !ch.unknown && ch.capAmount != null);
  const cap = known.reduce((s, ch) => s + ch.capAmount, 0);
  const used = known.reduce((s, ch) => s + ch.usedAmount, 0);
  const capTxn = known.reduce((s, ch) => s + (ch.capTxn || 0), 0);
  const usedTxn = known.reduce((s, ch) => s + (ch.usedTxn || 0), 0);
  return {
    cap,
    used,
    left: cap - used,
    rate: cap ? used / cap : 0,
    capTxn,
    usedTxn,
    leftTxn: capTxn - usedTxn,
    known: known.length,
    unknown: list.length - known.length,
  };
}
function leftOf(ch) {
  if (ch.unknown || ch.capAmount == null) return null;
  return Math.max(0, ch.capAmount - ch.usedAmount);
}

function kpiHtml(list) {
  const t = sumKnown(list);
  return `
    <article class="kpi-card"><span>今日产能</span><strong>${t.known ? wan(t.cap) : "无法计量"}</strong><em>${t.known ? t.capTxn.toLocaleString("zh-CN") + " 笔" : "限额未知"}</em></article>
    <article class="kpi-card"><span>今日已用</span><strong>${t.known ? wan(t.used) : "—"}</strong><em>${t.known ? t.usedTxn.toLocaleString("zh-CN") + " 笔" : ""}</em></article>
    <article class="kpi-card remain"><span>还可打款</span><strong>${t.known ? wan(Math.max(0, t.left)) : "—"}</strong><em>${t.known ? Math.max(0, t.leftTxn).toLocaleString("zh-CN") + " 笔" : ""}</em></article>
    <article class="kpi-card"><span>使用率</span><strong>${t.known ? pct(t) : "—"}</strong><em>${t.unknown ? t.unknown + " 条未计入" : "可计量 " + t.known + " 条"}</em></article>`;
}

function breakRow(label, t) {
  if (!t.known && t.unknown) return `<tr><td>${label}</td><td colspan="4" class="muted">限额未知，无法计量</td></tr>`;
  if (!t.known) return `<tr><td>${label}</td><td colspan="4" class="muted">无通道</td></tr>`;
  return `<tr><td>${label}</td><td class="num">${wan(t.cap)}</td><td class="num">${wan(t.used)}</td><td class="num amt">${wan(Math.max(0, t.left))}</td><td class="num">${pct(t)}</td></tr>`;
}

function methodRows(list) {
  return METHOD_ORDER.map((method) => {
    const subset = list.filter((ch) => ch.method === method);
    return subset.length ? breakRow(method, sumKnown(subset)) : "";
  }).join("");
}

function sceneRows() {
  return SCENE_ORDER.map((scene) => {
    const subset = datedChannels().filter((ch) => {
      if (!ch.scenes.includes(scene)) return false;
      if (state.method && ch.method !== state.method) return false;
      if (state.scene && scene !== state.scene) return false;
      return true;
    });
    if (!subset.length) return breakRow(scene, { known: 0, unknown: 0 });
    return breakRow(scene, sumKnown(subset));
  }).join("");
}

function bar(ch, wide) {
  const st = statusOf(ch);
  if (st === "未知") return `<div class="bar${wide ? " wide" : ""}"><i class="unk"></i></div>`;
  const p = Math.min(100, Math.round((ch.usedAmount / ch.capAmount) * 100));
  return `<div class="bar${wide ? " wide" : ""}"><i class="${barClass(st)}" style="width:${p}%"></i></div>`;
}

function splitBar(ch) {
  const st = statusOf(ch);
  if (st === "未知") return `<div class="split-bar"><i class="unk"></i></div>`;
  const usedPct = Math.min(100, (ch.usedAmount / ch.capAmount) * 100);
  const restPct = Math.max(0, 100 - usedPct);
  const restCls = st === "耗尽" ? "rest gone" : st === "紧张" ? "rest tight" : "rest";
  return `<div class="split-bar"><i class="used" style="flex-grow:${usedPct}"></i><i class="${restCls}" style="flex-grow:${restPct}"></i></div>`;
}

function donutSvg(rate) {
  const p = Math.max(0, Math.min(100, Math.round((rate || 0) * 100)));
  return `<svg class="donut" viewBox="0 0 36 36" aria-hidden="true">
    <circle class="donut-bg" cx="18" cy="18" r="14" pathLength="100"></circle>
    <circle class="donut-val" cx="18" cy="18" r="14" pathLength="100" stroke-dasharray="${p} ${100 - p}"></circle>
  </svg>`;
}

function splitBars(title, items) {
  const max = Math.max(0, ...items.map((it) => it.left));
  const rows = items
    .map((it) => {
      const w = it.unknown ? 0 : max ? Math.round((it.left / max) * 100) : 0;
      const val = it.unknown ? "未知" : it.empty ? "—" : wan(it.left);
      const cls = it.unknown ? "未知" : it.empty ? "" : it.left <= 0 ? "耗尽" : it.rate >= 0.8 ? "紧张" : "充足";
      return `<div class="hbar st-${cls}">
        <span>${it.label}</span>
        <div class="hbar-track">${it.unknown ? `<i class="unk"></i>` : `<i style="width:${w}%"></i>`}</div>
        <strong>${val}</strong>
      </div>`;
    })
    .join("");
  return `<p class="dash-label chart-sub">${title}</p><div class="hbar-list">${rows}</div>`;
}

function renderSplit(list) {
  const schemes = SCHEME_ORDER.map((scheme) => {
    const subset = list.filter((ch) => ch.scheme === scheme);
    const s = sumKnown(subset);
    return { label: scheme === "非税方案" ? "非税" : "劳务", left: Math.max(0, s.left), rate: s.rate, unknown: !s.known && !!s.unknown, empty: !subset.length };
  });
  const scenes = SCENE_ORDER.map((scene) => {
    const subset = list.filter((ch) => ch.scenes.includes(scene));
    const s = sumKnown(subset);
    return { label: scene, left: Math.max(0, s.left), rate: s.rate, unknown: !s.known && !!s.unknown, empty: !subset.length };
  });
  const methods = METHOD_ORDER.map((method) => {
    const subset = list.filter((ch) => ch.method === method);
    const s = sumKnown(subset);
    return { label: method, left: Math.max(0, s.left), rate: s.rate, unknown: !s.known && !!s.unknown, empty: !subset.length };
  });
  return splitBars("方案剩余", schemes) + splitBars("场景剩余", scenes) + splitBars("转出剩余", methods);
}

function renderSchemePair(list) {
  const stats = schemeStats(list);
  const max = Math.max(1, ...stats.flatMap((s) => (s.known ? [s.cap, s.used, Math.max(0, s.left)] : [0])));
  const head = `<div class="pair-row pair-head"><span></span><div class="pair-bars">${SCHEME_ORDER.map((scheme) => `<em class="sch-${scheme}">${scheme}</em>`).join("")}</div></div>`;
  const rows = [
    { label: "产能", get: (s) => (s.known ? s.cap : null) },
    { label: "已用", get: (s) => (s.known ? s.used : null) },
    { label: "还可打", get: (s) => (s.known ? Math.max(0, s.left) : null) },
  ]
    .map((row) => {
      const cells = stats
        .map((s) => {
          const v = row.get(s);
          const w = v == null ? 0 : Math.round((v / max) * 100);
          const val = v == null ? (s.n ? "未知" : "—") : wan(v);
          return `<div class="pair-bar sch-${s.scheme}"><div class="hbar-track">${s.n && v == null ? `<i class="unk"></i>` : `<i style="width:${w}%"></i>`}</div><b>${val}</b></div>`;
        })
        .join("");
      return `<div class="pair-row"><span>${row.label}</span><div class="pair-bars">${cells}</div></div>`;
    })
    .join("");
  const rates = stats
    .map((s) => `<span class="sch-${s.scheme}">${s.scheme === "非税方案" ? "非税" : "劳务"} ${s.known ? pct(s) : "—"} · ${s.n} 条</span>`)
    .join("");
  return `
    <div class="scheme-block">
    <div class="chart-head">
      <p class="dash-label">方案对比</p>
    </div>
    <div class="scheme-pair">${head}${rows}</div>
    <p class="scheme-rate">${rates}</p>
    </div>`;
}

function renderSchemeCards(list) {
  return SCHEME_ORDER.map((scheme) => {
    const subset = list.filter((ch) => ch.scheme === scheme);
    const s = sumKnown(subset);
    const n = subset.length;
    const amount = !s.known ? (n ? "未知" : "—") : wan(Math.max(0, s.left));
    const capLine = s.known ? "已用 " + wan(s.used) + " / 产能 " + wan(s.cap) : n ? "限额未明确" : "—";
    const sub = !n ? "没有通道" : !s.known ? n + " 条通道" : "还可打 · 使用率 " + pct(s);
    const on = state.scheme === scheme ? " on" : "";
    const empty = n ? "" : " empty";
    const st = !s.known ? "未知" : s.left <= 0 ? "耗尽" : s.rate >= 0.8 ? "紧张" : "充足";
    return `<button type="button" class="scheme-card sch-${scheme}${on}${empty}" data-scheme="${scheme}"${n ? "" : " disabled"}>
      <span class="st-head">${scheme}<i>${n}</i></span>
      <strong>${amount}</strong>
      <em>${sub}</em>
      ${methodSplitBar(s, st)}
      <p>${capLine}</p>
    </button>`;
  }).join("");
}

function visibleGoods() {
  return datedGoods().filter((g) => {
    if (state.method === "微信" || state.method === "支付宝") {
      return !g.method || g.method === state.method;
    }
    return true;
  });
}

function renderChannelBars(list) {
  const bars = list
    .filter((ch) => !ch.unknown && ch.capAmount)
    .sort((a, b) => b.usedAmount / b.capAmount - a.usedAmount / a.capAmount)
    .slice(0, 8);
  const cols = bars
    .map((ch) => {
      const rate = Math.min(100, Math.round((ch.usedAmount / ch.capAmount) * 100));
      const st = statusOf(ch);
      return `<div class="vbar st-${st} sch-${ch.scheme}">
        <span>${rate}%</span>
        <div class="vbar-col"><i style="height:${rate}%"></i></div>
        <em>${ch.supplier}</em>
        <b>${schemeBadge(ch)} ${ch.name}</b>
      </div>`;
    })
    .join("");
  return { cols, hint: "柱高是已用占日产能，最多看 8 条", goods: false };
}

function renderGoodsBars() {
  const goods = visibleGoods().slice().sort((a, b) => b.used / b.cap - a.used / a.cap);
  const cols = goods
    .map((g) => {
      const rate = Math.min(100, Math.round((g.used / g.cap) * 100));
      const tone = rate >= 80 ? "hot" : rate >= 50 ? "mid" : "low";
      const cls = g.method === "微信" ? "gd-wx" : g.method === "支付宝" ? "gd-ali" : "gd-other";
      return `<div class="vbar ${cls} ${tone}">
        <span>${rate}%</span>
        <div class="vbar-col"><i style="height:${rate}%"></i></div>
        <em>${g.line1}</em>
        <b>${g.line2}</b>
      </div>`;
    })
    .join("");
  return { cols, hint: "柱高是今日已发放占计划，模拟", goods: true };
}

function chartTitle() {
  return state.chart === "goods" ? "商品发放率" : "通道使用率";
}

function chartPaneHtml(list) {
  const view = state.chart === "goods" ? renderGoodsBars() : renderChannelBars(list);
  return `
    <div class="chart-block">
      <div class="chart-head chart-switch">
        <div class="chart-switch-title">
          <button type="button" class="chart-nav" data-chart="prev" aria-label="上一图">‹</button>
          <p class="dash-label">${chartTitle()}</p>
          <button type="button" class="chart-nav" data-chart="next" aria-label="下一图">›</button>
        </div>
        <p class="muted">${view.hint}</p>
      </div>
      <div class="vbars-wrap">
        <div class="vbars-y${view.goods ? " goods-y" : ""}"><span>100%</span><span>50%</span><span>0%</span></div>
        <div class="vbars">${view.cols || `<p class="muted">没有可计量数据</p>`}</div>
      </div>
    </div>`;
}

function renderChart(list) {
  return chartPaneHtml(list) + renderSchemePair(scoped());
}

function methodSplitBar(s, st) {
  if (!s.known) return `<div class="split-bar"><i class="unk"></i></div>`;
  const usedPct = Math.min(100, s.rate * 100);
  const restPct = Math.max(0, 100 - usedPct);
  const restCls = st === "耗尽" ? "rest gone" : st === "紧张" ? "rest tight" : "rest";
  return `<div class="split-bar"><i class="used" style="flex-grow:${usedPct}"></i><i class="${restCls}" style="flex-grow:${restPct}"></i></div>`;
}

function rankStatus(st) {
  return { 充足: 0, 紧张: 1, 耗尽: 2, 未知: 3 }[st];
}

function sortByRisk(list) {
  return list.slice().sort((a, b) => {
    const ds = rankStatus(statusOf(a)) - rankStatus(statusOf(b));
    if (ds) return ds;
    return (leftOf(a) ?? 1e12) - (leftOf(b) ?? 1e12);
  });
}

function tableHtml(list) {
  const body = list
    .map((ch) => {
      const st = statusOf(ch);
      const txn = ch.capTxn == null ? "—" : `${(ch.usedTxn || 0).toLocaleString("zh-CN")} / ${ch.capTxn.toLocaleString("zh-CN")} 笔`;
      const person = ch.personDaily == null ? (ch.unknown ? "/" : "不限制") : yuan(ch.personDaily) + "/人日";
      return `<tr class="st-${st}">
        <td>${ch.supplier} ${schemeBadge(ch)}<div class="muted">${ch.name}</div></td>
        <td>${ch.scheme}</td>
        <td>${ch.method}</td>
        <td>${ch.scenes.join("、")}</td>
        <td class="num">${person}</td>
        <td class="num">${ch.capAmount == null ? "未知" : wan(ch.capAmount)}<div class="muted">${txn}</div></td>
        <td class="num">${ch.usedAmount == null ? "—" : wan(ch.usedAmount)}</td>
        <td class="num amt">${leftOf(ch) == null ? "—" : wan(leftOf(ch))}</td>
        <td>${bar(ch)}<span class="st-label">${st}</span></td>
      </tr>`;
    })
    .join("");
  return `<table>
    <thead><tr><th>通道</th><th>方案</th><th>转出</th><th>场景</th><th>每人限额</th><th>日产能</th><th>已用</th><th>还可打</th><th>占用</th></tr></thead>
    <tbody>${body}</tbody>
  </table>`;
}

function renderOverview(list) {
  return `
    <section class="kpi">${kpiHtml(list)}</section>
    <section class="break-grid">
      <article class="panel"><h2>按转出方式</h2>
        <div class="table-wrap"><table><thead><tr><th></th><th>产能</th><th>已用</th><th>还可打</th><th>使用率</th></tr></thead><tbody>${methodRows(list)}</tbody></table></div>
        <p class="muted cap-foot">同一通道只出现在一种转出方式下，可以加总。</p>
      </article>
      <article class="panel"><h2>按适用场景（可承接）</h2>
        <div class="table-wrap"><table><thead><tr><th></th><th>产能</th><th>已用</th><th>还可打</th><th>使用率</th></tr></thead><tbody>${sceneRows()}</tbody></table></div>
        <p class="muted cap-foot">及时发、季积、鹿数通同时覆盖新车和续保，两边都会出现，场景之间不能加总。</p>
      </article>
    </section>
    <section class="panel cap-table-panel">
      <h2>通道明细 · ${list.length} 条</h2>
      <div class="table-wrap">${tableHtml(list)}</div>
    </section>`;
}

function renderRemain(list) {
  const t = sumKnown(list);
  const statuses = STATUS_ORDER.map((st) => {
    const subset = list.filter((ch) => statusOf(ch) === st);
    const s = sumKnown(subset);
    const n = subset.length;
    const amount = st === "未知" || !s.known ? (n ? "未知" : "—") : wan(Math.max(0, s.left));
    const capLine = s.known ? "已用 " + wan(s.used) + " / 产能 " + wan(s.cap) : n ? "限额未明确" : "—";
    const sub = !n ? "没有通道" : st === "未知" || !s.known ? n + " 条通道" : st === "耗尽" ? "已耗尽 · " + n + " 条" : "还可打 · " + n + " 条";
    const on = state.status === st ? " on" : "";
    const empty = n ? "" : " empty";
    return `<button type="button" class="method-remain st-${st}${on}${empty}" data-status="${st}"${n ? "" : " disabled"}>
      <span class="st-head">${st}<i>${n}</i></span>
      <strong>${amount}</strong>
      <em>${sub}</em>
      ${methodSplitBar(s, st)}
      <p>${capLine}</p>
    </button>`;
  }).join("");

  const shown = state.status ? list.filter((ch) => statusOf(ch) === state.status) : list;
  const rows = sortByRisk(shown)
    .map((ch) => {
      const st = statusOf(ch);
      const left = leftOf(ch);
      const capLine = ch.unknown || ch.capAmount == null ? "限额未知" : wan(ch.usedAmount) + " / " + wan(ch.capAmount);
      return `<div class="bar-row st-${st} sch-${ch.scheme}">
        <div class="bar-left">${left == null ? "未知" : wan(left)}<em>${st}</em></div>
        <div class="bar-name">${ch.supplier} ${ch.name}${schemeBadge(ch)}<em>${ch.method} · ${ch.scenes.join("、")}</em></div>
        <div class="bar-track">${splitBar(ch)}<em>${capLine}</em></div>
      </div>`;
    })
    .join("");

  const marks = [state.scheme, state.status].filter(Boolean);
  const title = marks.length ? `通道剩余 · ${marks.join(" · ")} ${shown.length} 条` : "通道剩余";
  const clear = marks.length ? `<button type="button" class="clear-status">看全部</button>` : "";

  return `
    <section class="dash-card dash-kpis">
      <p class="dash-label">核心数据</p>
      <div class="dash-kpi-grid">
        <article>
          <span>还可打款</span>
          <strong>${t.known ? wan(Math.max(0, t.left)) : "—"}</strong>
          <em>${t.known ? Math.max(0, t.leftTxn).toLocaleString("zh-CN") + " 笔" : "限额未知"}</em>
        </article>
        <article>
          <span>${dayList().length === 1 ? "今日已用" : "区间已用"}</span>
          <strong>${t.known ? wan(t.used) : "—"}</strong>
          <em>${t.known ? t.usedTxn.toLocaleString("zh-CN") + " 笔" : ""}</em>
        </article>
        <article>
          <span>${dayList().length === 1 ? "今日产能" : "区间产能"}</span>
          <strong>${t.known ? wan(t.cap) : "—"}</strong>
          <em>${t.known ? t.capTxn.toLocaleString("zh-CN") + " 笔" : ""}</em>
        </article>
        <article class="kpi-rate">
          ${t.known ? donutSvg(t.rate) : ""}
          <div>
            <span>使用率</span>
            <strong>${t.known ? pct(t) : "—"}</strong>
            <em>${t.unknown ? t.unknown + " 条未计入" : "可计量 " + t.known + " 条"}</em>
          </div>
        </article>
      </div>
    </section>
    <section class="scheme-card-grid">${renderSchemeCards(scoped())}</section>
    <section class="method-remain-grid status-row">${statuses}</section>
    <section class="panel bar-panel dash-card">
      <h2>${title}${clear}</h2>
      <div class="bar-list">${rows || `<p class="muted">没有通道</p>`}</div>
    </section>`;
}

function matrixCell(scene, method) {
  const subset = datedChannels().filter((ch) => {
    if (!ch.scenes.includes(scene) || ch.method !== method) return false;
    if (state.scene && scene !== state.scene) return false;
    if (state.method && method !== state.method) return false;
    return true;
  });
  if (!subset.length) return `<div class="mx-cell empty-cell"><span class="muted">无通道</span></div>`;
  const t = sumKnown(subset);
  if (!t.known) return `<div class="mx-cell unk-cell"><span>${scene} · ${method}</span><strong>未知</strong><em>${subset.length} 条通道限额未明确</em></div>`;
  const st = t.left <= 0 ? "耗尽" : t.rate >= 0.8 ? "紧张" : "充足";
  return `<div class="mx-cell st-${st}">
    <span>${scene} · ${method}</span>
    <strong>${wan(Math.max(0, t.left))}</strong>
    <em>还可打</em>
    <p>产能 ${wan(t.cap)} · 已用 ${wan(t.used)} · ${pct(t)}</p>
  </div>`;
}

function renderMatrix(list) {
  const head = `<div class="mx-corner"></div>` + METHOD_ORDER.map((m) => `<div class="mx-head">${m}</div>`).join("");
  const body = SCENE_ORDER.map((scene) => {
    if (state.scene && scene !== state.scene) return "";
    return `<div class="mx-head row">${scene}</div>` + METHOD_ORDER.map((method) => matrixCell(scene, method)).join("");
  }).join("");
  return `
    <section class="kpi">${kpiHtml(list)}</section>
    <section class="panel mx-panel">
      <h2>场景 × 转出方式（格内是还可打；场景列不能加总）</h2>
      <div class="mx-grid">${head}${body}</div>
    </section>
    <section class="panel cap-table-panel slim">
      <h2>通道明细 · ${list.length} 条</h2>
      <div class="table-wrap">${tableHtml(list)}</div>
    </section>`;
}

function renderBoard(list) {
  const groups = { 耗尽: [], 紧张: [], 充足: [], 未知: [] };
  list.forEach((ch) => groups[statusOf(ch)].push(ch));
  groups["充足"].sort((a, b) => (leftOf(b) ?? 0) - (leftOf(a) ?? 0));
  groups["紧张"].sort((a, b) => (leftOf(a) ?? 0) - (leftOf(b) ?? 0));
  const t = sumKnown(list);
  const cols = ["耗尽", "紧张", "充足", "未知"]
    .map((st) => {
      const items = groups[st]
        .map((ch) => {
          const left = leftOf(ch);
          return `<article class="board-card">
            <div class="g-top"><strong>${ch.supplier}</strong><span>${ch.method}</span></div>
            <p class="muted">${ch.name} · ${ch.scenes.join("、")}</p>
            <strong class="left-num">${left == null ? "未知" : wan(left)}</strong>
            <p class="left-cap">${ch.capAmount == null ? "限额未明确" : "还可打"}</p>
            ${splitBar(ch)}
            <p class="muted cap-line">${ch.capAmount == null ? "" : wan(ch.usedAmount) + " / " + wan(ch.capAmount)}</p>
          </article>`;
        })
        .join("");
      return `<section class="board-col st-${st}">
        <h2><b>${st}</b><em>${groups[st].length}</em></h2>
        <div class="board-stack">${items || `<p class="muted">没有通道</p>`}</div>
      </section>`;
    })
    .join("");
  return `
    <div class="board-sum">合计还可打 <b>${t.known ? wan(Math.max(0, t.left)) : "—"}</b><span>产能 ${t.known ? wan(t.cap) : "—"} · 已用 ${t.known ? wan(t.used) : "—"} · ${t.known ? pct(t) : ""}</span></div>
    <div class="board">${cols}</div>`;
}

function syncFilters() {
  document.querySelectorAll("#cap-filters button[data-scene]").forEach((b) => {
    b.classList.toggle("on", (b.getAttribute("data-scene") || "") === state.scene);
  });
  document.querySelectorAll("#cap-filters button[data-method]").forEach((b) => {
    b.classList.toggle("on", (b.getAttribute("data-method") || "") === state.method);
  });
  document.querySelectorAll("#cap-filters button[data-status]").forEach((b) => {
    b.classList.toggle("on", (b.getAttribute("data-status") || "") === state.status);
  });
  document.querySelectorAll("#cap-filters button[data-scheme]").forEach((b) => {
    b.classList.toggle("on", (b.getAttribute("data-scheme") || "") === state.scheme);
  });
}

function dateLabel() {
  const days = dayList();
  return days.length === 1 ? days[0] : days[0] + " ~ " + days[days.length - 1];
}
function syncDate() {
  const days = dayList();
  $("date-btn").textContent = dateLabel();
  $("date-from").value = state.from;
  $("date-to").value = state.to;
  $("used-pill").textContent = days.length === 1 ? "模拟当日已用" : "模拟 " + days.length + " 日已用";
  document.querySelectorAll("#date-pop [data-range]").forEach((b) => {
    const key = b.getAttribute("data-range");
    const on = key === "day" ? days.length === 1 && state.to === TODAY
      : key === "7" ? days.length === 7 && state.to === TODAY
      : key === "30" ? days.length === 30 && state.to === TODAY
      : false;
    b.classList.toggle("on", on);
  });
}
function applyDates(from, to) {
  state.from = clampDate(from);
  state.to = clampDate(to);
  if (state.from > state.to) [state.from, state.to] = [state.to, state.from];
  render();
}

function render() {
  const list = visible();
  if (state.status && !list.some((ch) => statusOf(ch) === state.status)) state.status = "";
  if (state.scheme && !scoped().some((ch) => ch.scheme === state.scheme)) state.scheme = "";
  document.body.dataset.style = "remain";
  $("view").innerHTML = renderRemain(list);
  $("cap-chart").innerHTML = renderChart(list);
  $("cap-split").innerHTML = renderSplit(list);
  syncFilters();
  syncDate();
}

$("view").addEventListener("click", (e) => {
  if (e.target.closest(".clear-status")) {
    state.status = "";
    state.scheme = "";
    render();
    return;
  }
  const schemeCard = e.target.closest(".scheme-card[data-scheme]");
  if (schemeCard && !schemeCard.disabled) {
    const scheme = schemeCard.dataset.scheme;
    state.scheme = state.scheme === scheme ? "" : scheme;
    render();
    return;
  }
  const card = e.target.closest(".method-remain[data-status]");
  if (!card || card.disabled) return;
  const st = card.dataset.status;
  state.status = state.status === st ? "" : st;
  render();
});

let chartTimer = 0;
let chartBusy = false;
let chartAuto = true;
let pendingDir = 0;
function stopChartTimer() {
  chartAuto = false;
  pendingDir = 0;
  clearInterval(chartTimer);
  chartTimer = 0;
}
function startChartTimer() {
  chartAuto = true;
  clearInterval(chartTimer);
  chartTimer = setInterval(() => {
    if (!chartAuto || chartBusy) return;
    stepChart(1);
  }, 3000);
}
function once(fn) {
  let done = false;
  return () => {
    if (done) return;
    done = true;
    fn();
  };
}
function onBlockEnd(el, fn) {
  const run = once(fn);
  const onEnd = (e) => {
    if (e.target !== el) return;
    el.removeEventListener("animationend", onEnd);
    run();
  };
  el.addEventListener("animationend", onEnd);
  setTimeout(run, 320);
}
function stepChart(dir) {
  if (chartBusy) {
    pendingDir = dir;
    return;
  }
  const i = CHART_VIEWS.indexOf(state.chart);
  state.chart = CHART_VIEWS[(i + dir + CHART_VIEWS.length) % CHART_VIEWS.length];
  const block = document.querySelector("#cap-chart .chart-block");
  if (!block) {
    render();
    return;
  }
  chartBusy = true;
  const outCls = dir > 0 ? "chart-out-left" : "chart-out-right";
  const inCls = dir > 0 ? "chart-in-right" : "chart-in-left";
  onBlockEnd(block, () => {
    const wrap = document.createElement("div");
    wrap.innerHTML = chartPaneHtml(visible()).trim();
    const next = wrap.firstElementChild;
    next.classList.add(inCls);
    block.replaceWith(next);
    onBlockEnd(next, () => {
      next.classList.remove(inCls);
      chartBusy = false;
      const queued = pendingDir;
      pendingDir = 0;
      if (queued) stepChart(queued);
    });
  });
  block.classList.add(outCls);
}

$("cap-chart").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-chart]");
  if (!btn) return;
  stopChartTimer();
  const dir = btn.getAttribute("data-chart") === "next" ? 1 : -1;
  stepChart(dir);
});

$("date-btn").addEventListener("click", (e) => {
  e.stopPropagation();
  $("date-pop").hidden = !$("date-pop").hidden;
});
$("date-pop").addEventListener("click", (e) => {
  e.stopPropagation();
  const preset = e.target.closest("[data-range]");
  if (!preset) return;
  const key = preset.getAttribute("data-range");
  if (key === "day") applyDates(TODAY, TODAY);
  else if (key === "7") applyDates(shiftDate(TODAY, -6), TODAY);
  else if (key === "30") applyDates(shiftDate(TODAY, -29), TODAY);
  $("date-pop").hidden = true;
});
$("date-from").addEventListener("change", () => applyDates($("date-from").value, $("date-to").value));
$("date-to").addEventListener("change", () => applyDates($("date-from").value, $("date-to").value));
document.addEventListener("click", () => {
  $("date-pop").hidden = true;
});

$("cap-filters").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  if (btn.hasAttribute("data-scene")) state.scene = btn.getAttribute("data-scene") || "";
  if (btn.hasAttribute("data-method")) state.method = btn.getAttribute("data-method") || "";
  if (btn.hasAttribute("data-status")) state.status = btn.getAttribute("data-status") || "";
  if (btn.hasAttribute("data-scheme")) state.scheme = btn.getAttribute("data-scheme") || "";
  render();
});

render();
startChartTimer();
