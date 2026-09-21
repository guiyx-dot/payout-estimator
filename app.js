const CHANNELS = [
  { id: "caikang", supplier: "财康", methods: ["支付宝"], perTxn: null, daily: null, scenes: ["新车"], tableOrder: 1, unknownLimit: false },
  { id: "liuliu-wx", supplier: "六六猴", methods: ["微信"], perTxn: 200, daily: 2000, scenes: ["续保"], tableOrder: 2, unknownLimit: false },
  { id: "jishifa-wx", supplier: "及时发", methods: ["微信"], perTxn: 200, daily: 2000, scenes: ["续保", "新车"], tableOrder: 3, unknownLimit: false },
  { id: "jishifa-ali", supplier: "及时发", methods: ["支付宝"], perTxn: 1000, daily: 1000, scenes: ["续保", "新车"], tableOrder: 4, unknownLimit: false },
  { id: "nashang", supplier: "纳尚", methods: ["微信"], perTxn: 200, daily: 500, scenes: ["续保"], tableOrder: 5, unknownLimit: false },
  { id: "ganen", supplier: "感恩", methods: ["支付宝", "银行卡"], perTxn: null, daily: null, scenes: ["事故车"], tableOrder: 6, unknownLimit: true },
  { id: "luxi", supplier: "鹿喜", methods: ["微信"], perTxn: 200, daily: 2000, scenes: ["续保"], tableOrder: 7, unknownLimit: false },
  { id: "jiji", supplier: "季积", methods: ["支付宝"], perTxn: 500, daily: 1000, scenes: ["续保", "新车"], tableOrder: 8, unknownLimit: false },
  { id: "lushutong", supplier: "鹿数通", methods: ["微信", "支付宝"], perTxn: 200, daily: 1000, scenes: ["续保", "新车"], tableOrder: 9, unknownLimit: false },
];

const GRANTS = [
  {
    id: "GF-09218021",
    merchant: "杭州滨江丰田",
    user: "陈*婷",
    phone: "138****2167",
    scene: "新车",
    amount: 10000,
    grantedAt: "2026-09-18 14:22",
    withdrawn: false,
  },
  {
    id: "GF-09190314",
    merchant: "宁波海曙人保",
    user: "王*杰",
    phone: "159****8802",
    scene: "续保",
    amount: 5000,
    grantedAt: "2026-09-19 09:07",
    withdrawn: false,
  },
  {
    id: "GF-09151208",
    merchant: "温州鹿城吉利",
    user: "林*",
    phone: "186****4410",
    scene: "新车",
    amount: 10000,
    grantedAt: "2026-09-15 16:40",
    withdrawn: true,
    method: "微信",
    lockedChannelId: "jishifa-wx",
    withdrawnAt: "2026-09-16 10:03",
  },
  {
    id: "GF-09200855",
    merchant: "绍兴柯桥一汽",
    user: "赵*敏",
    phone: "137****6621",
    scene: "新车",
    amount: 8000,
    grantedAt: "2026-09-20 08:55",
    withdrawn: true,
    method: "支付宝",
    lockedChannelId: "caikang",
    withdrawnAt: "2026-09-20 11:18",
  },
  {
    id: "GF-09171102",
    merchant: "台州路桥平安",
    user: "周*浩",
    phone: "151****0933",
    scene: "续保",
    amount: 5000,
    grantedAt: "2026-09-17 11:02",
    withdrawn: true,
    method: "微信",
    lockedChannelId: "liuliu-wx",
    withdrawnAt: "2026-09-17 19:26",
  },
  {
    id: "GF-09211044",
    merchant: "金华婺城公估",
    user: "孙*",
    phone: "188****7754",
    scene: "事故车",
    amount: 3200,
    grantedAt: "2026-09-21 10:44",
    withdrawn: false,
  },
  {
    id: "GF-09140630",
    merchant: "嘉兴南湖大众",
    user: "钱*萱",
    phone: "130****2288",
    scene: "续保",
    amount: 800,
    grantedAt: "2026-09-14 15:16",
    withdrawn: false,
  },
];

const METHOD_ORDER = ["微信", "支付宝", "银行卡"];
const $ = (id) => document.getElementById(id);

const state = {
  filter: "all",
  selectedId: GRANTS[0].id,
};

function round2(n) {
  return Math.round(n * 100) / 100;
}

function yuan(n) {
  return n.toLocaleString("zh-CN", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

function money(n) {
  return "¥" + yuan(n);
}

function limitLabel(n) {
  if (n == null) return "不限制";
  return yuan(n);
}

function dailyRank(ch) {
  if (ch.unknownLimit) return null;
  if (ch.daily == null) return Infinity;
  return ch.daily;
}

function comparePriority(a, b) {
  const ra = dailyRank(a);
  const rb = dailyRank(b);
  const aFound = ra != null;
  const bFound = rb != null;
  if (aFound && bFound) {
    if (ra !== rb) return rb - ra;
    return a.tableOrder - b.tableOrder;
  }
  if (aFound !== bFound) return aFound ? -1 : 1;
  return a.tableOrder - b.tableOrder;
}

function matchChannels(scene, method) {
  return CHANNELS.filter((ch) => ch.scenes.includes(scene) && (!method || ch.methods.includes(method))).sort(
    comparePriority,
  );
}

function expandRows(channels, methodFilter) {
  const rows = [];
  channels.forEach((ch) => {
    const methods = methodFilter ? ch.methods.filter((m) => m === methodFilter) : ch.methods.slice();
    methods.sort((a, b) => METHOD_ORDER.indexOf(a) - METHOD_ORDER.indexOf(b));
    methods.forEach((method) => rows.push({ ch, method }));
  });
  rows.sort((a, b) => {
    const byCh = comparePriority(a.ch, b.ch);
    if (byCh !== 0) return byCh;
    return METHOD_ORDER.indexOf(a.method) - METHOD_ORDER.indexOf(b.method);
  });
  return rows;
}

function splitTxns(amount, perTxn) {
  if (perTxn == null) return [{ n: 1, amount }];
  const full = Math.floor((amount + 1e-9) / perTxn);
  const rest = round2(amount - full * perTxn);
  const parts = [];
  if (full > 0) parts.push({ n: full, amount: perTxn });
  if (rest > 0.0001) parts.push({ n: 1, amount: rest });
  return parts;
}

function formatTxns(parts) {
  return parts
    .map((p) => (p.n > 1 ? `${p.n} 笔 × ${yuan(p.amount)}` : `1 笔 × ${yuan(p.amount)}`))
    .join(" + ");
}

function estimate(amount, ch) {
  if (ch.unknownLimit) return { ok: false, reason: "限额未明确" };
  if (!(amount > 0)) return { ok: false, reason: "金额无效" };
  const cap = ch.daily == null ? Infinity : ch.daily;
  const schedule = [];
  let left = round2(amount);
  let day = 1;
  while (left > 0.0001) {
    const todayAmt = cap === Infinity ? left : Math.min(left, cap);
    schedule.push({
      day,
      amount: todayAmt,
      txns: splitTxns(todayAmt, ch.perTxn),
    });
    left = round2(left - todayAmt);
    day += 1;
    if (day > 4000) break;
  }
  return { ok: true, days: schedule.length, schedule, daily: ch.daily, perTxn: ch.perTxn };
}

function addDays(offset) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + offset);
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}

function methodSummary(amount, scene) {
  return METHOD_ORDER.map((method) => {
    const matched = matchChannels(scene, method);
    if (matched.length === 0) return null;
    const ok = matched.map((ch) => ({ ch, est: estimate(amount, ch) })).filter((x) => x.est.ok);
    const days = ok.map((x) => x.est.days);
    return {
      method,
      matched,
      min: days.length ? Math.min(...days) : null,
      max: days.length ? Math.max(...days) : null,
      unknownOnly: matched.length > 0 && days.length === 0,
    };
  }).filter(Boolean);
}

function rangeText(min, max) {
  if (min == null) return "无法估算";
  if (min === max) return `${min} 天`;
  return `${min}–${max} 天`;
}

function selectedGrant() {
  return GRANTS.find((g) => g.id === state.selectedId) || GRANTS[0];
}

function visibleGrants() {
  if (state.filter === "open") return GRANTS.filter((g) => !g.withdrawn);
  if (state.filter === "paid") return GRANTS.filter((g) => g.withdrawn);
  return GRANTS;
}

function payoutWindow(est) {
  const start = addDays(0);
  const end = addDays(est.days - 1);
  return est.days === 1 ? start : `${start}－${end}`;
}

function userCopy(grant) {
  const { scene, amount, withdrawn, method } = grant;
  if (withdrawn) {
    const matched = matchChannels(scene, method);
    const locked = matched.find((ch) => ch.id === grant.lockedChannelId) || matched[0];
    if (!locked) {
      return {
        kicker: "用户将看到",
        title: "当前转出方式暂无法打款",
        detail: "已提现，但没有可承接的通道。",
      };
    }
    const est = estimate(amount, locked);
    if (!est.ok) {
      return {
        kicker: "用户将看到 · 预计打款时间",
        title: "暂无法给出",
        detail: "已锁定通道的限额未明确，无法推算打款时间。",
      };
    }
    return {
      kicker: "用户将看到 · 预计打款时间",
      title: payoutWindow(est),
      detail: est.days === 1 ? "已发起提现，预计当天打完。" : `已发起提现，按锁定通道连续打出，共 ${est.days} 天。`,
    };
  }

  const summaries = methodSummary(amount, scene);
  if (summaries.length === 0) {
    return {
      kicker: "用户将看到",
      title: "当前暂无法打款",
      detail: "该业务场景没有可走的打款通道。",
    };
  }
  const ok = summaries.filter((s) => s.min != null);
  if (ok.length === 0) {
    return {
      kicker: "用户将看到",
      title: "暂无法给出到账时间",
      detail: "可走通道的限额未明确，无法估算范围。",
    };
  }
  const min = Math.min(...ok.map((s) => s.min));
  const max = Math.max(...ok.map((s) => s.max));
  const methods = summaries.map((s) => s.method).join("、");
  const title = min === max ? `预计 ${min} 天到账` : `预计 ${min}–${max} 天到账`;
  return {
    kicker: "用户将看到",
    title,
    detail: `尚未提现，转出方式未定。该场景可走${methods}，天数按全部可走通道的最快与最慢估算。提现选定方式后会给出预计打款时间。`,
  };
}

function renderSchedule(est) {
  const rows = est.schedule
    .map((row, i) => {
      const remain = est.schedule.slice(i + 1).reduce((s, r) => s + r.amount, 0);
      return `<tr>
        <td class="nowrap">${addDays(row.day - 1)}</td>
        <td class="num amt">${money(row.amount)}</td>
        <td>${formatTxns(row.txns)}</td>
        <td class="muted">${remain > 0 ? "余 " + money(remain) : "打完"}</td>
      </tr>`;
    })
    .join("");
  return `<div class="table-wrap schedule-wrap"><table>
    <thead><tr><th>预计打款时间</th><th>当日打出</th><th>拆笔</th><th>剩余</th></tr></thead>
    <tbody>${rows}</tbody>
  </table></div>`;
}

function renderInternal(grant) {
  const { scene, amount, withdrawn, method } = grant;
  const methodFilter = withdrawn ? method : null;
  const matched = matchChannels(scene, methodFilter);
  const rows = expandRows(matched, methodFilter).map((row) => ({
    ...row,
    est: estimate(amount, row.ch),
  }));
  const okDays = rows.filter((x) => x.est.ok).map((x) => x.est.days);
  const min = okDays.length ? Math.min(...okDays) : null;
  const max = okDays.length ? Math.max(...okDays) : null;
  const locked = withdrawn ? matched.find((ch) => ch.id === grant.lockedChannelId) || matched[0] : null;
  const summaries = withdrawn ? [] : methodSummary(amount, scene);

  let html = `<h2>内部判断</h2>`;

  if (matched.length === 0) {
    return html + `<div class="warn-banner">该场景没有可走通道。用户侧只提示无法打款。</div>`;
  }

  if (withdrawn && locked) {
    const est = estimate(amount, locked);
    html += `<div class="lock-banner">
      <div>已提现，转出方式锁定为 <strong>${method}</strong>，供应商锁定为 <strong>${locked.supplier}</strong>
        <div class="meta">单笔 ${locked.unknownLimit ? "/" : limitLabel(locked.perTxn)} · 每人 ${locked.unknownLimit ? "/" : locked.daily == null ? "不限制" : yuan(locked.daily) + "/日"}。未提现时的其他转出方式不再参与。</div>
      </div>
      <div>${est.ok ? "预计打款时间 " + payoutWindow(est) : "无法估算"}</div>
    </div>`;
    if (est.ok) html += renderSchedule(est);
    else html += `<div class="warn-banner">已锁定通道限额为「/」，无法按日限额推天数。</div>`;
  } else {
    html += `<div class="lock-banner">
      <div>尚未提现。<strong>转出方式未定</strong>，供应商也不能锁。
        <div class="meta">该场景可走 ${summaries.map((s) => s.method).join("、") || "—"}。模糊日期取全部方式下所有可估算通道的最快与最慢${min != null ? "：合计 " + rangeText(min, max) : ""}。</div>
      </div>
    </div>`;
    if (summaries.length) {
      html += `<div class="method-box">`;
      summaries.forEach((s) => {
        html += `<div class="method-card">
          <span>若走${s.method}</span>
          <strong>${s.unknownOnly ? "无法估算" : rangeText(s.min, s.max)}</strong>
          <div class="meta">${s.matched.length} 条通道</div>
        </div>`;
      });
      html += `</div>`;
    }
    if (min == null) html += `<div class="warn-banner">可走通道均无法估算天数，不编造范围。</div>`;
  }

  html += `<div class="table-wrap"><table>
    <thead><tr>
      <th>转出方式</th><th>供应商</th><th>单笔</th><th>每日</th><th>天数</th><th>说明</th>
    </tr></thead><tbody>`;

  rows.forEach((row) => {
    const classes = [];
    const isLocked = withdrawn && locked && row.ch.id === locked.id && row.method === method;
    if (isLocked) classes.push("locked");
    if (row.est.ok && min != null && row.est.days === min) classes.push("fast");
    if (row.est.ok && max != null && max !== min && row.est.days === max) classes.push("slow");
    const pills = [];
    if (isLocked) pills.push('<span class="pill lock">锁定</span>');
    if (row.est.ok && min != null && row.est.days === min) pills.push('<span class="pill fast">最快</span>');
    if (row.est.ok && max != null && max !== min && row.est.days === max) pills.push('<span class="pill slow">最慢</span>');
    const dayText = row.est.ok ? row.est.days + " 天" : "无法估算";
    let note = row.est.reason || "";
    if (row.est.ok) {
      if (!withdrawn) {
        note = row.est.days === min ? "拉低整体最快（转出方式仍未知）" : row.est.days === max && max !== min ? "拉高整体最慢（转出方式仍未知）" : "未提现，计入该方式可能区间";
      } else if (isLocked) {
        note = "发放后已提现，按此通道排期";
      } else {
        note = "同转出方式下的其他通道，本单未走";
      }
    }
    html += `<tr class="${classes.join(" ")}">
      <td>${row.method}</td>
      <td>${row.ch.supplier}${pills.join("")}</td>
      <td class="num">${row.ch.unknownLimit ? "/" : limitLabel(row.ch.perTxn)}</td>
      <td class="num">${row.ch.unknownLimit ? "/" : row.ch.daily == null ? "不限制" : yuan(row.ch.daily) + "/日"}</td>
      <td class="num">${dayText}</td>
      <td>${note}</td>
    </tr>`;
  });

  html += `</tbody></table></div>`;
  return html;
}

function renderList() {
  const grants = visibleGrants();
  if (!grants.some((g) => g.id === state.selectedId) && grants[0]) {
    state.selectedId = grants[0].id;
  }
  $("grant-list").innerHTML = grants
    .map((g) => {
      const on = g.id === state.selectedId ? " on" : "";
      const st = g.withdrawn ? '<span class="status paid">已提现</span>' : '<span class="status open">未提现</span>';
      return `<button type="button" class="grant${on}" data-id="${g.id}">
        <div class="g-top"><strong>${g.merchant}</strong>${st}</div>
        <div class="g-meta">${g.user} · ${g.scene} · ${money(g.amount)}</div>
      </button>`;
    })
    .join("");
}

function renderSource() {
  $("source-body").innerHTML = CHANNELS.map((ch) => {
    const daily = ch.unknownLimit ? "/" : ch.daily == null ? "不限制" : yuan(ch.daily) + "/日";
    const per = ch.unknownLimit ? "/" : ch.perTxn == null ? "不限制" : yuan(ch.perTxn);
    return `<tr>
      <td>${ch.supplier}</td>
      <td>${ch.methods.join("、")}</td>
      <td class="num">${per}</td>
      <td class="num">${daily}</td>
      <td>${ch.scenes.join("、")}</td>
      <td class="num">${ch.tableOrder}</td>
    </tr>`;
  }).join("");
}

function render() {
  renderList();
  const grant = selectedGrant();
  const copy = userCopy(grant);
  $("user-kicker").textContent = copy.kicker || "用户将看到";
  $("user-title").textContent = copy.title;
  $("user-detail").textContent = copy.detail;
  $("internal").innerHTML = renderInternal(grant);
}

function bind() {
  $("grant-list").addEventListener("click", (e) => {
    const btn = e.target.closest(".grant");
    if (!btn) return;
    state.selectedId = btn.dataset.id;
    render();
  });
  $("grant-filter").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-filter]");
    if (!btn) return;
    state.filter = btn.dataset.filter;
    $("grant-filter").querySelectorAll("button").forEach((b) => b.classList.toggle("on", b === btn));
    render();
  });
  $("open-source").addEventListener("click", () => $("source-modal").showModal());
  $("close-source").addEventListener("click", () => $("source-modal").close());
}

renderSource();
bind();
render();
