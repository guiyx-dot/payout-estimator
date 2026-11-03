const CHANNELS = [
  { id: "caikang", supplier: "财康", name: "支付宝-新车", method: "支付宝", scenes: ["新车"], perTxn: null, personDaily: null, capTxn: 2000, capAmount: 500000, usedTxn: 412, usedAmount: 186000, note: "每人原不限制，日产能按模拟结算上限" },
  { id: "liuliu-1", supplier: "六六猴", name: "微信-①", method: "微信", scenes: ["续保"], perTxn: 200, personDaily: 2000, capTxn: 400, capAmount: 80000, usedTxn: 260, usedAmount: 52000 },
  { id: "liuliu-2", supplier: "六六猴", name: "微信-②", method: "微信", scenes: ["续保"], perTxn: 200, personDaily: 2000, capTxn: 400, capAmount: 80000, usedTxn: 305, usedAmount: 61000 },
  { id: "liuliu-3", supplier: "六六猴", name: "微信-③", method: "微信", scenes: ["续保"], perTxn: 200, personDaily: 2000, capTxn: 300, capAmount: 60000, usedTxn: 270, usedAmount: 54000 },
  { id: "jishifa-wx-1", supplier: "及时发", name: "微信-①", method: "微信", scenes: ["续保", "新车"], perTxn: 200, personDaily: 2000, capTxn: 500, capAmount: 100000, usedTxn: 365, usedAmount: 73000 },
  { id: "jishifa-wx-2", supplier: "及时发", name: "微信-②", method: "微信", scenes: ["续保", "新车"], perTxn: 200, personDaily: 2000, capTxn: 500, capAmount: 100000, usedTxn: 440, usedAmount: 88000 },
  { id: "jishifa-wx-3", supplier: "及时发", name: "微信-③", method: "微信", scenes: ["续保", "新车"], perTxn: 200, personDaily: 2000, capTxn: 400, capAmount: 80000, usedTxn: 400, usedAmount: 80000 },
  { id: "jishifa-ali", supplier: "及时发", name: "支付宝", method: "支付宝", scenes: ["续保", "新车"], perTxn: 1000, personDaily: 1000, capTxn: 120, capAmount: 120000, usedTxn: 46, usedAmount: 46000 },
  { id: "nashang-1", supplier: "纳尚", name: "微信-①", method: "微信", scenes: ["续保"], perTxn: 200, personDaily: 500, capTxn: 200, capAmount: 40000, usedTxn: 145, usedAmount: 29000 },
  { id: "nashang-2", supplier: "纳尚", name: "微信-②", method: "微信", scenes: ["续保"], perTxn: 200, personDaily: 500, capTxn: 200, capAmount: 40000, usedTxn: 185, usedAmount: 37000 },
  { id: "nashang-3", supplier: "纳尚", name: "微信-③", method: "微信", scenes: ["续保"], perTxn: 200, personDaily: 500, capTxn: 150, capAmount: 30000, usedTxn: 60, usedAmount: 12000 },
  { id: "ganen-ali", supplier: "感恩", name: "支付宝", method: "支付宝", scenes: ["事故车"], perTxn: null, personDaily: null, capTxn: null, capAmount: null, usedTxn: null, usedAmount: null, unknown: true },
  { id: "ganen-bank", supplier: "感恩", name: "银行卡", method: "银行卡", scenes: ["事故车"], perTxn: null, personDaily: null, capTxn: null, capAmount: null, usedTxn: null, usedAmount: null, unknown: true },
  { id: "luxi", supplier: "鹿喜", name: "微信", method: "微信", scenes: ["续保"], perTxn: 200, personDaily: 2000, capTxn: 450, capAmount: 90000, usedTxn: 205, usedAmount: 41000 },
  { id: "jiji", supplier: "季积", name: "支付宝", method: "支付宝", scenes: ["续保", "新车"], perTxn: 500, personDaily: 1000, capTxn: 160, capAmount: 80000, usedTxn: 66, usedAmount: 33000 },
  { id: "lushutong-wx", supplier: "鹿数通", name: "微信", method: "微信", scenes: ["续保", "新车"], perTxn: 200, personDaily: 1000, capTxn: 350, capAmount: 70000, usedTxn: 275, usedAmount: 55000 },
  { id: "lushutong-ali", supplier: "鹿数通", name: "支付宝", method: "支付宝", scenes: ["续保", "新车"], perTxn: 200, personDaily: 1000, capTxn: 350, capAmount: 70000, usedTxn: 110, usedAmount: 22000 },
];

const METHOD_ORDER = ["微信", "支付宝", "银行卡"];
const SCENE_ORDER = ["新车", "续保", "事故车"];
const STATUS_ORDER = ["充足", "紧张", "耗尽", "未知"];

const $ = (id) => document.getElementById(id);
const state = { scene: "", method: "", status: "" };

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
function visible() {
  return CHANNELS.filter((ch) => {
    if (state.scene && !ch.scenes.includes(state.scene)) return false;
    if (state.method && ch.method !== state.method) return false;
    return true;
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
    const subset = CHANNELS.filter((ch) => {
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
        <td>${ch.supplier}<div class="muted">${ch.name}</div></td>
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
    <thead><tr><th>通道</th><th>转出</th><th>场景</th><th>每人限额</th><th>日产能</th><th>已用</th><th>还可打</th><th>占用</th></tr></thead>
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
      return `<div class="bar-row st-${st}">
        <div class="bar-left">${left == null ? "未知" : wan(left)}<em>${st}</em></div>
        <div class="bar-name">${ch.supplier} ${ch.name}<em>${ch.method} · ${ch.scenes.join("、")}</em></div>
        <div class="bar-track">${splitBar(ch)}<em>${capLine}</em></div>
      </div>`;
    })
    .join("");

  const title = state.status
    ? `通道剩余 · ${state.status} ${shown.length} 条`
    : "通道剩余";
  const clear = state.status ? `<button type="button" class="clear-status">看全部</button>` : "";

  return `
    <section class="remain-hero">
      <p class="hero-kicker">今天还可打款</p>
      <p class="hero-num">${t.known ? wan(Math.max(0, t.left)) : "无法计量"}</p>
      <p class="hero-sub">${t.known ? Math.max(0, t.leftTxn).toLocaleString("zh-CN") + " 笔 · 已用 " + wan(t.used) + " / 产能 " + wan(t.cap) + " · " + pct(t) : "限额未知"}</p>
      <p class="hero-legend"><i class="lg-used"></i>已用 <i class="lg-rest"></i>剩余</p>
    </section>
    <section class="method-remain-grid status-row">${statuses}</section>
    <section class="panel bar-panel">
      <h2>${title}${clear}</h2>
      <div class="bar-list">${rows || `<p class="muted">没有通道</p>`}</div>
    </section>`;
}

function matrixCell(scene, method) {
  const subset = CHANNELS.filter((ch) => {
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
}

function render() {
  const list = visible();
  if (state.status && !list.some((ch) => statusOf(ch) === state.status)) state.status = "";
  document.body.dataset.style = "remain";
  $("view").innerHTML = renderRemain(list);
  syncFilters();
}

$("view").addEventListener("click", (e) => {
  if (e.target.closest(".clear-status")) {
    state.status = "";
    render();
    return;
  }
  const card = e.target.closest(".method-remain[data-status]");
  if (!card || card.disabled) return;
  const st = card.dataset.status;
  state.status = state.status === st ? "" : st;
  render();
});

$("cap-filters").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  if (btn.hasAttribute("data-scene")) state.scene = btn.getAttribute("data-scene") || "";
  if (btn.hasAttribute("data-method")) state.method = btn.getAttribute("data-method") || "";
  if (btn.hasAttribute("data-status")) state.status = btn.getAttribute("data-status") || "";
  render();
});

render();
