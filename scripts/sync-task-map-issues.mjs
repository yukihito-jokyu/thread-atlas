#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";

const REPO = "yukihito-jokyu/thread-atlas";
const TASK_MAP_PATH = "docs/task-map.md";
const MANIFEST_PATH = "docs/task-issue-map.json";
const ROOT_ISSUE = { requirements: 1, design: 2 };

const args = new Set(process.argv.slice(2));
const snapshotIndex = process.argv.indexOf("--snapshot");
const snapshot = snapshotIndex >= 0 ? process.argv[snapshotIndex + 1] : "";
const apply = args.has("--apply");

if (!snapshot) {
  throw new Error("--snapshot <commit SHA> が必要です");
}

function run(command, commandArgs, options = {}) {
  return execFileSync("rtk", [command, ...commandArgs], {
    cwd: process.cwd(),
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
    ...options,
  }).trim();
}

function gh(args) {
  return run("gh", args);
}

function parseTaskMap(markdown) {
  const lines = markdown.split("\n");
  const start = lines.findIndex((line) => line === "## タスク台帳");
  const end = lines.findIndex((line, index) => index > start && line === "## 依存関係");
  if (start < 0 || end < 0) throw new Error("Task Mapのタスク台帳を特定できません");

  const tasks = [];
  for (let index = start + 1; index < end; index += 1) {
    const line = lines[index];
    if (!/^\| L\d+(?:-M\d+)?(?:-S\d+)? \|/.test(line)) continue;
    const cells = line.split("|").slice(1, -1).map((value) => value.trim());
    if (cells.length !== 6) throw new Error(`台帳列数が不正です: ${index + 1}`);
    const [id, name, planningStatus, executionStatus, artifact, dependency] = cells;
    const level = id.includes("-S") ? "S" : id.includes("-M") ? "M" : "L";
    const parentId = level === "S"
      ? id.replace(/-S\d+$/, "")
      : level === "M"
        ? id.replace(/-M\d+$/, "")
        : null;
    tasks.push({ id, name, planningStatus, executionStatus, artifact, dependency, level, parentId, line: index + 1 });
  }
  return tasks;
}

function taskType(id) {
  if (/^L[1-6]-/.test(id)) return "requirements";
  if (/^L7-/.test(id)) return "evaluation";
  return "design";
}

function originalIssueNumber(id) {
  return id === "L8" || id.startsWith("L8-") ? ROOT_ISSUE.design : ROOT_ISSUE.requirements;
}

function taskLink(task) {
  return `https://github.com/${REPO}/blob/${snapshot}/${TASK_MAP_PATH}#L${task.line}`;
}

function issueLink(number) {
  return `https://github.com/${REPO}/issues/${number}`;
}

function range(start, end, render) {
  return Array.from({ length: end - start + 1 }, (_, index) => render(start + index)).join("、");
}

function expandShorthandRanges(value) {
  return value
    .replace(/L(\d+)-M(\d+)-S(\d+)〜(?:L\d+-M\d+-)?S(\d+)/g, (_, l, m, start, end) => range(Number(start), Number(end), (s) => `L${l}-M${m}-S${s}`))
    .replace(/L(\d+)-M(\d+)〜(?:L\d+-)?M(\d+)/g, (_, l, start, end) => range(Number(start), Number(end), (m) => `L${l}-M${m}`))
    .replace(/L(\d+)〜L(\d+)/g, (_, start, end) => range(Number(start), Number(end), (l) => `L${l}`))
    .replace(/L(\d+)-M(\d+)-S(\d+)／S(\d+)/g, (_, l, m, first, second) => `L${l}-M${m}-S${first}、L${l}-M${m}-S${second}`)
    .replace(/L(\d+)-M(\d+)／M(\d+)/g, (_, l, first, second) => `L${l}-M${first}、L${l}-M${second}`);
}

function parseDependency(value) {
  if (value === "なし") return { prefix: "", taskIds: [], gates: [], formattedParts: [] };
  const prefixMatch = value.match(/^([^:]+:\s*)/);
  const prefix = prefixMatch?.[1] || "";
  const payload = prefix ? value.slice(prefix.length) : value;
  const taskIds = [];
  const gates = [];
  const formattedParts = [];
  for (const part of payload.split("、").map((item) => item.trim()).filter(Boolean)) {
    if (part.includes("Gate")) {
      gates.push(part);
      formattedParts.push({ type: "gate", value: part });
      continue;
    }
    const expanded = expandShorthandRanges(part).split("、").map((item) => item.trim()).filter(Boolean);
    for (const item of expanded) {
      const ids = item.match(/L\d+(?:-M\d+)?(?:-S\d+)?/g) || [];
      taskIds.push(...ids);
      formattedParts.push({ type: "task", value: item });
    }
  }
  return { prefix, taskIds: [...new Set(taskIds)], gates, formattedParts };
}

function linkTaskRefs(value, issueByTask) {
  const parsed = parseDependency(value);
  if (value === "なし") return "なし";
  const parts = parsed.formattedParts.map((part) => {
    if (part.type === "gate") return part.value;
    return part.value.replace(/L\d+(?:-M\d+)?(?:-S\d+)?/g, (id) => {
      const number = issueByTask.get(id);
      return number ? `[${id}](${issueLink(number)})` : `\`${id}\``;
    });
  });
  return `${parsed.prefix}${parts.join("、")}`;
}

function parentIssueNumber(task, issueByTask) {
  if (task.level === "L") return originalIssueNumber(task.id);
  return issueByTask.get(task.parentId);
}

function markerBlock(name, body) {
  return `<!-- ${name}:start -->\n${body.trim()}\n<!-- ${name}:end -->`;
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function countMarker(body, marker) {
  return body.split(marker).length - 1;
}

function extractBlock(body, name) {
  const pattern = new RegExp(`<!-- ${name}:start -->[\\s\\S]*?<!-- ${name}:end -->`);
  return body.match(pattern)?.[0] ?? "";
}

function replaceBlock(body, name, content) {
  const block = markerBlock(name, content);
  const pattern = new RegExp(`<!-- ${name}:start -->[\\s\\S]*?<!-- ${name}:end -->`);
  return pattern.test(body) ? body.replace(pattern, block) : `${body.trim()}\n\n${block}\n`;
}

function ensureSingleMarker(body, marker) {
  const count = countMarker(body, marker);
  if (count > 1) throw new Error(`Markerが重複しています: ${marker}`);
  return count === 1 ? body : `${marker}\n${body.trim()}`;
}

function composeTaskBody(task, generated, existingBody = "") {
  const idMarker = `<!-- task-map-id: ${task.id} -->`;
  let body = ensureSingleMarker(existingBody, idMarker);
  if (countMarker(body, "<!-- generated-content:start -->") > 1 || countMarker(body, "<!-- generated-content:end -->") > 1) {
    throw new Error(`${task.id} のgenerated-content Markerが重複しています`);
  }
  if (countMarker(body, "<!-- human-progress:start -->") > 1 || countMarker(body, "<!-- human-progress:end -->") > 1) {
    throw new Error(`${task.id} のhuman-progress Markerが重複しています`);
  }
  body = replaceBlock(body, "generated-content", generated);
  if (!extractBlock(body, "human-progress")) body = `${body.trim()}\n\n${humanProgress()}\n`;
  return body;
}

function dependencyRows(task, issueByTask) {
  const linked = linkTaskRefs(task.dependency, issueByTask);
  const parsed = parseDependency(task.dependency);
  const none = task.dependency === "なし";
  const startDependency = /着手/.test(task.dependency) ? linked : "なし（Task Mapに明示なし）";
  const mergeDependency = none
    ? "なし"
    : /完了|確定|Merge/.test(task.dependency)
      ? linked
      : "なし（Task Mapに明示なし）";
  const gateDependency = parsed.gates.length > 0
    ? `${parsed.gates.join("、")}（[Gate Registry](https://github.com/${REPO}/blob/${snapshot}/${TASK_MAP_PATH}#L562)）`
    : "該当なし（Task Mapの依存関係節を参照）";
  const taskOnly = parsed.taskIds
    .map((id) => issueByTask.get(id) ? `[${id}](${issueLink(issueByTask.get(id))})` : `\`${id}\``)
    .join("、") || "なし";
  return { linked, startDependency, mergeDependency, gateDependency, taskOnly };
}

function humanProgress(existingBody = "") {
  return extractBlock(existingBody, "human-progress") || markerBlock("human-progress", `## 実施記録

- [ ] 着手
- [ ] 成果物Review
- [ ] 完了

### Evidence

- worktree／Branch: TBD
- Commit／PR: TBD
- 検証結果: TBD`);
}

function trackingBody(task, tasks, issueByTask, existingBody = "") {
  const parentNumber = parentIssueNumber(task, issueByTask);
  const children = tasks.filter((candidate) => candidate.parentId === task.id);
  const childLines = children.map((child) => {
    const number = issueByTask.get(child.id);
    return number ? `- [ ] #${number}` : `- [ ] \`${child.id}\`（Issue番号未確定）`;
  }).join("\n") || "- [ ] 直下子なし";
  const dependency = dependencyRows(task, issueByTask);
  const generated = `<!-- planning-snapshot: ${snapshot} -->

## タスク情報

- Task ID: \`${task.id}\`
- 親Task ID: ${task.parentId ? `\`${task.parentId}\`` : "原典Issue"}
- 親Issue: #${parentNumber}
- Planning snapshot commit SHA: \`${snapshot}\`
- Task Map固定リンク: [${task.id} 台帳行](${taskLink(task)})
- 原典Issue: [#${originalIssueNumber(task.id)}](${issueLink(originalIssueNumber(task.id))})
- 計画状態／実行状態: ${task.planningStatus}／${task.executionStatus}

## 目的・主成果物

${task.artifact}

## 直接依存

${dependency.linked}

## 直下の子Issue

${childLines}

## 完了条件

- [ ] 直下の子Issueがすべて完了している
- [ ] 親の主成果物・到達状態が子成果物の総和として成立している
- [ ] Task Mapで対応するGate／Release条件を満たしている
- [ ] 未解決の契約差異がない

## 境界

このIssueは進捗と統合条件を追跡する。子Issueと重複する要件・設計・評価成果物を独自に作成しない。`;
  return composeTaskBody(task, generated, existingBody);
}

function leafBody(task, issueByTask, existingBody = "") {
  const parentNumber = parentIssueNumber(task, issueByTask);
  const rootNumber = originalIssueNumber(task.id);
  const dependency = dependencyRows(task, issueByTask);
  const type = taskType(task.id);
  const requirementsInput = rootNumber === ROOT_ISSUE.design
    ? `\n- 要件入力Issue: [#${ROOT_ISSUE.requirements}](${issueLink(ROOT_ISSUE.requirements)})`
    : "";
  const generated = `<!-- planning-snapshot: ${snapshot} -->

## タスク情報

- Task ID: \`${task.id}\`
- 親Task ID: \`${task.parentId}\`
- 親Issue: #${parentNumber}
- タスク名: ${task.name}
- タスク種別: ${type}
- Planning snapshot commit SHA: \`${snapshot}\`
- Task Map固定リンク: [${task.id} 台帳行](${taskLink(task)})
- 原典Issue: [#${rootNumber}](${issueLink(rootNumber)})${requirementsInput}
- 関連する原典章: 原典IssueおよびTask Mapの当該Task・依存関係節
- 関連する決定ID: 該当Taskの承認履歴、Gate Registry

## 目的

${task.artifact}

## 原典との差分

- 固定入力: 原典Issue、Planning snapshot、Task Mapに記載された直接依存の成果物
- 原典で決定済みだが未実施の成果物: ${task.artifact}
- このleafで決める未確定事項: 主成果物の成立に必要で、Task MapがこのTaskへ割り当てた事項
- 選び直さない事項: 親・兄弟Taskの責務、確定済みの横断境界、Gate条件

## 実施内容

- [ ] 固定入力、直接依存、Owner境界を確認する
- [ ] ${task.artifact}を作成し、Task固有Reviewを行う

## 成果物と所有

| 項目 | 内容 |
| --- | --- |
| 主成果物 | ${task.artifact} |
| 書込み可能なPath／Glob | TBD（Ready判定までに確定） |
| 単一Owner | \`${task.id}\` |
| read-only入力 | 原典Issue、Planning snapshot、直接依存Taskの成果物 |
| 共有資産と単一Owner | Task Mapのworktree Owner規則に従い、Ready判定までに固定 |
| Gate通過記録 | ${dependency.gateDependency} |

書込み可能なのは、上表の所有Pathと承認済みの明示例外だけとする。

## 完了条件

- [ ] ${task.artifact}が作成され、Task Mapの到達状態を満たしている
- [ ] 主成果物が指定Pathに存在する
- [ ] 単一Ownerと書込みPathの境界を守っている
- [ ] Task固有の検証結果またはReview EvidenceをIssueへ記録した
- [ ] 未解決の契約差異とTBDがない

## 対象外

- Task Mapにない設計判断・依存・成果物の追加
- 親・兄弟Taskが所有する成果物

## 依存関係

| 種別 | Task／Milestone | 必要な成果物・状態 |
| --- | --- | --- |
| 着手依存 | ${dependency.startDependency} | Task Map記載の着手条件を満たす |
| 完了・Merge依存 | ${dependency.mergeDependency} | 依存成果物が確定・Merge済みである |
| Gateへの入力 | Task Mapの該当中分類内Gate | 本Task成果物がGate入力としてReview可能である |
| Gate通過依存 | ${dependency.gateDependency} | Gate記録を固定リンクで確認できる |
| Release条件 | 後続実装のRelease条件は本Taskの対象外 | 該当なし |

依存欄の原文: ${dependency.linked}

## 着手判定

| 確認項目 | 結果・Evidence |
| --- | --- |
| Planning snapshot SHAとTask Map固定リンクが一致する | TBD |
| 着手依存TaskのMerge commit | TBD／該当なし |
| 必要なGateの通過記録、またはGate前Taskであること | TBD |
| worktree起点SHA | TBD |
| 必須値に未解決TBDがない | TBD |
| 並行Taskと書込みPathが競合しない | TBD |

- [ ] 上表を確認し、このTaskは着手可能である

## worktree・Merge

| 項目 | 内容 |
| --- | --- |
| planning baseline SHA | \`${snapshot}\` |
| worktree起点SHA | TBD |
| Branch | TBD |
| 所有Path／Glob | TBD |
| 共有物と単一Owner | Task Mapのworktree Owner規則に従いReady判定までに固定 |
| 並行可能Task | Task Mapの該当中分類内節を参照 |
| 直列化するTaskと理由 | Task Mapの該当中分類内節を参照 |
| Merge前提 | 直接依存と必要Gateを満たす |
| Merge順 | Task Mapの該当中分類内節を参照 |
| 統合先 | 親Task \`${task.parentId}\` |

## 検証

| 種別 | 方法・Command | 合格条件 | Evidence |
| --- | --- | --- | --- |
| 静的確認 | Planning snapshotと成果物を照合 | Task ID、責務、依存、用語が一致する | TBD |
| Task固有テスト／Review | 成果物Review | 主成果物・到達状態を満たす | TBD |
| 契約・統合確認 | 親Taskと該当Gateで照合 | 未解決の契約差異がない | TBD |
| 後続評価 | Task Mapの後続Taskを参照 | 重複実施せず受渡し可能である | TBD |

## 差異を発見した場合

- [ ] 作業を停止する
- [ ] Issue内で新しい依存、Path、設計判断を決めない
- [ ] Task MapまたはGate記録の修正案を議論記録へ残す
- [ ] 必要な再承認後、Planning snapshotとIssueを同期する

## 関連Issue・PR

- 親Issue: #${parentNumber}
- Blocked by: ${dependency.taskOnly}
- 関連PR: TBD`;
  return composeTaskBody(task, generated, existingBody);
}

function rootTrackingSection(task, tasks, issueByTask) {
  const children = tasks.filter((candidate) => candidate.parentId === task.id);
  return `<!-- planning-snapshot: ${snapshot} -->

## Task Map tracking

- Task ID: \`${task.id}\`
- 原典Issue: [#${ROOT_ISSUE.design}](${issueLink(ROOT_ISSUE.design)})
- 要件入力Issue: [#${ROOT_ISSUE.requirements}](${issueLink(ROOT_ISSUE.requirements)})
- Planning snapshot commit SHA: \`${snapshot}\`
- Task Map固定リンク: [${task.id} 台帳行](${taskLink(task)})
- 計画状態／実行状態: ${task.planningStatus}／${task.executionStatus}
- 主成果物・到達状態: ${task.artifact}
- 直接依存: ${linkTaskRefs(task.dependency, issueByTask)}

### 直下の子Issue

${children.map((child) => `- [ ] #${issueByTask.get(child.id)}`).join("\n")}

### Tracking完了条件

- [ ] 直下の子Issueがすべて完了している
- [ ] 主成果物・到達状態が子成果物の総和として成立している
- [ ] 必要なGateを通過している
- [ ] 未解決の契約差異がない`;
}

function requirementsRootSection(tasks, issueByTask) {
  const roots = tasks.filter((task) => /^L[1-7]$/.test(task.id));
  return `<!-- planning-snapshot: ${snapshot} -->

## Task Map tracking

- Planning snapshot commit SHA: \`${snapshot}\`
- Task Map固定リンク: [タスク台帳](https://github.com/${REPO}/blob/${snapshot}/${TASK_MAP_PATH}#L327)
- Source of Truth: \`docs/task-map.md\`

### 直下の大分類Issue

${roots.map((task) => `- [ ] #${issueByTask.get(task.id)}`).join("\n")}

### 要件ベースライン完了条件

- [ ] L1〜L7のtracking Issueがすべて完了している
- [ ] G-REQ-01〜G-REQ-06を通過している
- [ ] 未解決の契約差異がない`;
}

function issueTitle(task) {
  return `[${task.id}] ${task.name}`;
}

function taskSourceHash(task) {
  return sha256(JSON.stringify({
    id: task.id,
    name: task.name,
    parentId: task.parentId,
    level: task.level,
    taskType: task.level === "S" ? taskType(task.id) : "tracking",
    artifact: task.artifact,
    dependency: expandShorthandRanges(task.dependency),
    planningStatus: task.planningStatus,
    executionStatus: task.executionStatus,
  }));
}

function loadManifest() {
  try {
    return JSON.parse(readFileSync(MANIFEST_PATH, "utf8"));
  } catch {
    return { schemaVersion: 1, repo: REPO, snapshot, tasks: {} };
  }
}

function saveManifest(tasks, issueByTask, issuesByNumber, previousManifest = {}) {
  const entries = tasks.map((task) => {
    const issueNumber = issueByTask.get(task.id) || null;
    const body = issueNumber ? issuesByNumber.get(issueNumber)?.body : "";
    const previous = previousManifest.tasks?.[task.id] || {};
    const managedBlock = task.id === "L8"
      ? extractBlock(body || "", "task-map-tracking")
      : extractBlock(body || "", "generated-content");
    return [task.id, {
      name: task.name,
      level: task.level,
      parentId: task.parentId,
      taskType: task.level === "S" ? taskType(task.id) : "tracking",
      dependency: expandShorthandRanges(task.dependency),
      sourceHash: taskSourceHash(task),
      issueNumber,
      generatedHash: managedBlock
        ? sha256(managedBlock)
        : previous.generatedHash || null,
    }];
  }).sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }));
  writeFileSync(MANIFEST_PATH, `${JSON.stringify({
    schemaVersion: 1,
    repo: REPO,
    snapshot,
    generatedAt: new Date().toISOString(),
    tasks: Object.fromEntries(entries),
  }, null, 2)}\n`);
}

function listIssues() {
  return JSON.parse(gh(["issue", "list", "--repo", REPO, "--state", "all", "--limit", "1000", "--json", "number,title,body,url"]));
}

function validate(tasks) {
  const counts = {
    L: tasks.filter((task) => task.level === "L").length,
    M: tasks.filter((task) => task.level === "M").length,
    S: tasks.filter((task) => task.level === "S").length,
  };
  if (counts.L !== 8 || counts.M !== 42 || counts.S !== 175 || tasks.length !== 225) {
    throw new Error(`Task件数が不正です: ${JSON.stringify(counts)}, total=${tasks.length}`);
  }
  const ids = new Set(tasks.map((task) => task.id));
  const dependencies = new Map();
  if (ids.size !== tasks.length) throw new Error("Task IDが重複しています");
  for (const task of tasks) {
    if (task.planningStatus !== "承認済み" || task.executionStatus !== "未着手") {
      throw new Error(`${task.id} の状態がIssue化条件を満たしません`);
    }
    if (task.parentId && !ids.has(task.parentId)) throw new Error(`${task.id} の親Taskがありません`);
    const references = parseDependency(task.dependency).taskIds;
    dependencies.set(task.id, references);
    for (const reference of references) {
      if (!ids.has(reference)) throw new Error(`${task.id} の直接依存 ${reference} がTask Mapにありません`);
      if (reference === task.id) throw new Error(`${task.id} が自己依存しています`);
    }
  }
  const visiting = new Set();
  const visited = new Set();
  function visit(id, path = []) {
    if (visiting.has(id)) throw new Error(`直接依存DAGに循環があります: ${[...path, id].join(" -> ")}`);
    if (visited.has(id)) return;
    visiting.add(id);
    for (const dependency of dependencies.get(id) || []) visit(dependency, [...path, id]);
    visiting.delete(id);
    visited.add(id);
  }
  for (const id of ids) visit(id);
  const leafTypes = {
    requirements: tasks.filter((task) => task.level === "S" && taskType(task.id) === "requirements").length,
    evaluation: tasks.filter((task) => task.level === "S" && taskType(task.id) === "evaluation").length,
    design: tasks.filter((task) => task.level === "S" && taskType(task.id) === "design").length,
  };
  if (leafTypes.requirements !== 96 || leafTypes.evaluation !== 26 || leafTypes.design !== 53) {
    throw new Error(`leaf種別件数が不正です: ${JSON.stringify(leafTypes)}`);
  }
  counts.leafTypes = leafTypes;
  return counts;
}

const markdown = readFileSync(TASK_MAP_PATH, "utf8");
const tasks = parseTaskMap(markdown);
const counts = validate(tasks);
console.log(`validated: L=${counts.L}, M=${counts.M}, S=${counts.S}, total=${tasks.length}, leaf=${JSON.stringify(counts.leafTypes)}`);

if (!apply) {
  console.log("dry-run: GitHubは変更していません");
  process.exit(0);
}

const committedMap = run("git", ["show", `${snapshot}:${TASK_MAP_PATH}`]);
if (committedMap !== markdown.trim()) {
  throw new Error("Planning snapshotのTask Mapとworking treeが一致しません");
}
gh(["api", `repos/${REPO}/commits/${snapshot}`, "--jq", ".sha"]);

const issues = listIssues();
const issuesByNumber = new Map(issues.map((issue) => [issue.number, issue]));
const candidates = new Map();
for (const issue of issues) {
  const marker = issue.body?.match(/<!-- task-map-id: (L\d+(?:-M\d+)?(?:-S\d+)?) -->/)?.[1];
  const titleId = issue.title.match(/^\[(L\d+(?:-M\d+)?(?:-S\d+)?)\]/)?.[1];
  const id = marker || titleId;
  if (!id) continue;
  const list = candidates.get(id) || [];
  list.push(issue);
  candidates.set(id, list);
}
for (const [id, matches] of candidates) {
  if (matches.length > 1) throw new Error(`${id} に対応するIssueが複数あります: ${matches.map((item) => item.number).join(", ")}`);
}

const manifest = loadManifest();
if (manifest.schemaVersion !== 1) throw new Error(`未対応のManifest schemaVersionです: ${manifest.schemaVersion}`);
if (manifest.snapshot && manifest.snapshot !== snapshot && Object.values(manifest.tasks || {}).some((task) => task.issueNumber)) {
  console.log(`manifest snapshotを ${manifest.snapshot} から ${snapshot} へ更新します`);
}
const issueByTask = new Map(Object.entries(manifest.tasks || {})
  .filter(([, task]) => task.issueNumber)
  .map(([id, task]) => [id, Number(task.issueNumber)]));
issueByTask.set("L8", ROOT_ISSUE.design);
for (const [id, matches] of candidates) issueByTask.set(id, matches[0].number);
if (issueByTask.get("L8") !== ROOT_ISSUE.design) throw new Error("L8はIssue #2に一意に割り当てる必要があります");

const createOrder = [
  ...tasks.filter((task) => task.level === "L" && task.id !== "L8"),
  ...tasks.filter((task) => task.level === "M"),
  ...tasks.filter((task) => task.level === "S"),
];

let created = 0;
for (const task of createOrder) {
  if (issueByTask.has(task.id)) continue;
  const body = task.level === "S"
    ? leafBody(task, issueByTask)
    : trackingBody(task, tasks, issueByTask);
  const url = gh(["issue", "create", "--repo", REPO, "--title", issueTitle(task), "--body", body]);
  const number = Number(url.match(/\/(\d+)$/)?.[1]);
  if (!number) throw new Error(`${task.id} のIssue番号を取得できません: ${url}`);
  issueByTask.set(task.id, number);
  issuesByNumber.set(number, { number, title: issueTitle(task), body, url });
  saveManifest(tasks, issueByTask, issuesByNumber, manifest);
  created += 1;
  console.log(`created ${task.id} -> #${number} (${created}/${createOrder.length})`);
}

let updated = 0;
for (const task of createOrder) {
  const number = issueByTask.get(task.id);
  const existing = issuesByNumber.get(number) || { body: "" };
  const previousHash = manifest.tasks?.[task.id]?.generatedHash;
  const currentGenerated = extractBlock(existing.body || "", "generated-content");
  if (previousHash && currentGenerated && sha256(currentGenerated) !== previousHash) {
    throw new Error(`${task.id} #${number} の機械所有領域が前回同期後に変更されています`);
  }
  const body = task.level === "S"
    ? leafBody(task, issueByTask, existing.body)
    : trackingBody(task, tasks, issueByTask, existing.body);
  if (body.trim() !== (existing.body || "").trim()) {
    gh(["api", "--method", "PATCH", `repos/${REPO}/issues/${number}`, "-f", `body=${body}`]);
    issuesByNumber.set(number, { ...existing, number, body, title: issueTitle(task) });
    saveManifest(tasks, issueByTask, issuesByNumber, manifest);
    updated += 1;
    console.log(`updated ${task.id} -> #${number}`);
  }
}

const rootOne = issuesByNumber.get(ROOT_ISSUE.requirements);
const rootTwo = issuesByNumber.get(ROOT_ISSUE.design);
if (!rootOne || !rootTwo) throw new Error("原典Issue #1/#2を取得できません");
const rootOneBase = ensureSingleMarker(rootOne.body || "", "<!-- task-map-root: source -->");
const rootOneBody = replaceBlock(rootOneBase, "task-map-tracking", requirementsRootSection(tasks, issueByTask));
const l8 = tasks.find((task) => task.id === "L8");
const rootTwoBase = ensureSingleMarker(rootTwo.body || "", "<!-- task-map-id: L8 -->");
const rootTwoBody = replaceBlock(rootTwoBase, "task-map-tracking", rootTrackingSection(l8, tasks, issueByTask));
const previousL8Hash = manifest.tasks?.L8?.generatedHash;
const currentL8Block = extractBlock(rootTwo.body || "", "task-map-tracking");
if (previousL8Hash && currentL8Block && sha256(currentL8Block) !== previousL8Hash) {
  throw new Error("L8 #2の機械所有領域が前回同期後に変更されています");
}
if (rootOneBody.trim() !== (rootOne.body || "").trim()) {
  gh(["api", "--method", "PATCH", `repos/${REPO}/issues/${ROOT_ISSUE.requirements}`, "-f", `body=${rootOneBody}`]);
  issuesByNumber.set(ROOT_ISSUE.requirements, { ...rootOne, body: rootOneBody });
  updated += 1;
}
if (rootTwoBody.trim() !== (rootTwo.body || "").trim() || rootTwo.title !== issueTitle(l8)) {
  gh(["api", "--method", "PATCH", `repos/${REPO}/issues/${ROOT_ISSUE.design}`, "-f", `title=${issueTitle(l8)}`, "-f", `body=${rootTwoBody}`]);
  issuesByNumber.set(ROOT_ISSUE.design, { ...rootTwo, body: rootTwoBody, title: issueTitle(l8) });
  updated += 1;
}

if (issueByTask.size !== 225) throw new Error(`Issue対応数が不正です: ${issueByTask.size}`);
if (new Set(issueByTask.values()).size !== 225) throw new Error("複数Taskが同一Issueへ割り当てられています");
saveManifest(tasks, issueByTask, issuesByNumber, manifest);

const finalIssues = listIssues();
const finalByNumber = new Map(finalIssues.map((issue) => [issue.number, issue]));
const markerOwners = new Map();
for (const issue of finalIssues) {
  const matches = [...(issue.body || "").matchAll(/<!-- task-map-id: (L\d+(?:-M\d+)?(?:-S\d+)?) -->/g)];
  if (matches.length > 1) throw new Error(`#${issue.number} にtask-map-id Markerが複数あります`);
  if (matches.length === 1) {
    const id = matches[0][1];
    if (markerOwners.has(id)) throw new Error(`${id} Markerが#${markerOwners.get(id)}と#${issue.number}に重複しています`);
    markerOwners.set(id, issue.number);
  }
}
if (markerOwners.size !== 225) throw new Error(`Task Marker件数が不正です: ${markerOwners.size}`);
if (countMarker(finalByNumber.get(ROOT_ISSUE.requirements)?.body || "", "<!-- task-map-root: source -->") !== 1) {
  throw new Error("Issue #1のroot/source Markerが不正です");
}
if (finalIssues.some((issue) => /^\[G-(?:REQ|DES)-/.test(issue.title))) throw new Error("GateがIssue化されています");

let childEdges = 0;
for (const task of tasks.filter((candidate) => candidate.level !== "S")) {
  const parentBody = finalByNumber.get(issueByTask.get(task.id))?.body || "";
  for (const child of tasks.filter((candidate) => candidate.parentId === task.id)) {
    const childNumber = issueByTask.get(child.id);
    if (!parentBody.includes(`- [ ] #${childNumber}`)) throw new Error(`${task.id}→${child.id} の子Issueリンクがありません`);
    childEdges += 1;
  }
}
const rootOneFinalBody = finalByNumber.get(ROOT_ISSUE.requirements)?.body || "";
for (const task of tasks.filter((candidate) => /^L[1-7]$/.test(candidate.id))) {
  if (!rootOneFinalBody.includes(`- [ ] #${issueByTask.get(task.id)}`)) throw new Error(`Issue #1→${task.id} の子Issueリンクがありません`);
  childEdges += 1;
}
if (childEdges !== 224) throw new Error(`親子辺数が不正です: ${childEdges}`);

for (const task of tasks) {
  const body = finalByNumber.get(issueByTask.get(task.id))?.body || "";
  for (const dependencyId of parseDependency(task.dependency).taskIds) {
    if (!body.includes(issueLink(issueByTask.get(dependencyId)))) {
      throw new Error(`${task.id} の直接依存 ${dependencyId} がIssueリンクへ同期されていません`);
    }
  }
}

let pendingUpdates = 0;
for (const task of createOrder) {
  const issue = finalByNumber.get(issueByTask.get(task.id));
  const expected = task.level === "S"
    ? leafBody(task, issueByTask, issue.body)
    : trackingBody(task, tasks, issueByTask, issue.body);
  if (expected.trim() !== (issue.body || "").trim()) pendingUpdates += 1;
}
const expectedRootOne = replaceBlock(ensureSingleMarker(rootOneFinalBody, "<!-- task-map-root: source -->"), "task-map-tracking", requirementsRootSection(tasks, issueByTask));
const rootTwoFinalBody = finalByNumber.get(ROOT_ISSUE.design)?.body || "";
const expectedRootTwo = replaceBlock(ensureSingleMarker(rootTwoFinalBody, "<!-- task-map-id: L8 -->"), "task-map-tracking", rootTrackingSection(l8, tasks, issueByTask));
if (expectedRootOne.trim() !== rootOneFinalBody.trim()) pendingUpdates += 1;
if (expectedRootTwo.trim() !== rootTwoFinalBody.trim()) pendingUpdates += 1;
if (pendingUpdates !== 0) throw new Error(`再同期時に${pendingUpdates}件の更新が残ります`);

const finalIssueState = new Map(finalIssues.map((issue) => [issue.number, issue]));
saveManifest(tasks, issueByTask, finalIssueState, manifest);
console.log(`complete: task-backed issues=225, created=${created}, updated=${updated}, child-edges=224, gate-issues=0, resync-updates=0`);
