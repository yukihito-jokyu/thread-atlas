---
name: Leaf task
about: 承認済みTask Mapのleafを実行する
title: ''
labels: ''
assignees: ''
---

<!--
タイトル形式: [Lx-My-Sz] タスク名

タスク種別は requirements / design / implementation / evaluation を使用します。
Issue本文から新しい依存、成果物、Path、設計判断を追加しません。
Task Mapとの不一致を発見した場合は作業を止め、正本を再承認・更新してから同期します。
-->

## タスク情報

- Task ID:
- 親Task ID:
- 親Issue:
- タスク名:
- タスク種別: <!-- requirements / design / implementation / evaluation -->
- Planning snapshot commit SHA:
- Task Map固定リンク:
- 原典Issue:
- 関連する原典章:
- 関連する決定ID:

## 目的


## 原典との差分

- 固定入力:
- 原典で決定済みだが未実施の成果物:
- このleafで決める未確定事項:
- 選び直さない事項:

## 実施内容

- [ ]
- [ ]

## 成果物と所有

| 項目 | 内容 |
| --- | --- |
| 主成果物 | |
| 書込み可能なPath／Glob | |
| 単一Owner | |
| read-only入力 | |
| 共有資産と単一Owner | |
| Gate通過記録 | |

## 完了条件

- [ ]
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
| 着手依存 | | |
| 完了・Merge依存 | | |
| Gateへの入力 | | |
| Gate通過依存 | | |
| Release条件 | | |

## 着手判定

| 確認項目 | 結果・Evidence |
| --- | --- |
| Planning snapshot SHAとTask Map固定リンクが一致する | |
| 着手依存TaskのMerge commit | |
| 必要なGateの通過記録、またはGate前Taskであること | |
| worktree起点SHA | |
| 必須値に未解決TBDがない | |
| 並行Taskと書込みPathが競合しない | |

- [ ] 上表を確認し、このTaskは着手可能である

## worktree・Merge

| 項目 | 内容 |
| --- | --- |
| planning baseline SHA | |
| worktree起点SHA | |
| Branch | |
| 所有Path／Glob | |
| 共有物と単一Owner | |
| 並行可能Task | |
| 直列化するTaskと理由 | |
| Merge前提 | |
| Merge順 | |
| 統合先 | |

## 検証

| 種別 | 方法・Command | 合格条件 | Evidence |
| --- | --- | --- | --- |
| 静的確認 | | | |
| Task固有テスト／Review | | | |
| 契約・統合確認 | | | |
| 後続評価 | | | |

## 差異を発見した場合

- [ ] 作業を停止する
- [ ] Issue内で新しい依存、Path、設計判断を決めない
- [ ] Task MapまたはGate記録の修正案を議論記録へ残す
- [ ] 必要な再承認後、Planning snapshotとIssueを同期する

## 関連Issue・PR

- 親Issue:
- Blocked by:
- 関連PR:
