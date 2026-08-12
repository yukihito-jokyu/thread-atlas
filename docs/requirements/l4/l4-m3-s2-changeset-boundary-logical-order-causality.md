# L4-M3-S2: ChangeSet境界と論理順序・因果関係

## 目的

一つの意味上の操作に由来する論理変更EventをChangeSetとして関連付け、単独Event、複数Eventのまとまり、論理順序および原因関係を定める。

本書はTransaction、時刻、実行順、Event Sourcing、API、Actor・承認、状態遷移またはUndo実行を定めない。

## ChangeSet辞書とCardinality

| 項目 | 定義・Cardinality | 非導出事項・Owner |
| --- | --- | --- |
| ChangeSet | 一つの意味上の操作により生じた一つ以上のEventの集合。各ChangeSetは一つのSessionに属する。 | 物理ID、Commit/Transaction、保存形式はL8。 |
| Event所属 | 各Eventはちょうど一つのChangeSetに所属する。各ChangeSetは1..N Eventを含む。 | Eventの対象・前後・Actor／Rule・起点はS1。Eventをどの操作が許可するかはL2/L3。 |
| 単独Event | 一つの意味上の操作が一つの論理変更だけを生じる場合も、1 Eventを含むChangeSetとして扱う。 | EventをChangeSetなしで孤立させず、複数Eventを必須化しない。 |
| 複数Event | 一つの意味上の操作が複数のEntity／Relationを変える場合、同じChangeSetに所属させる。 | Undoの原子性・部分適用禁止はL4-M4。 |
| 論理順序 | 同じChangeSet内のEvent間に、意味上の前後が必要な場合だけ順序Relationを置く。各Eventの前件・後件はそれぞれ 0..N 件とする。 | 時刻、並列実行、実行順序、DB順序はL8。 |
| 直接原因 | EventまたはChangeSetを端点として、別のEventまたはChangeSetを意味上必要とする場合、原因から結果への直接原因Relationを置く。各端点の原因・結果はそれぞれ 0..N 件とする。 | Rule、Actor、Guard、状態効果および会話根拠の詳細はL2/L3/S4。 |
| 派生原因 | 直接原因の連鎖で説明される端点間を、直接原因と区別して派生原因として参照可能にする。端点はEventまたはChangeSetで、各端点の派生原因・派生結果はそれぞれ 0..N 件とする。 | 訂正・再判断・取消と旧内容のRelationはS3。派生原因を直接原因の二重正本にしない。 |

## 順序・因果の整合表

| 観点 | 規則 | 禁止・委譲 |
| --- | --- | --- |
| Session境界 | 同一ChangeSetの全Eventは同一Sessionに属する。原因・結果Relationも同一Session内のEvent／ChangeSetへ限る。 | Sessionをまたぐ暗黙因果・所属を作らない。Session識別はL4-M1。 |
| 順序と因果の分離 | 論理順序は前後関係、原因Relationは必要性を表す。順序だけから因果を、因果だけから実行時刻を導かない。 | 物理実行・時刻・同期はL8。 |
| 順序の有向非循環 | 論理順序は同じChangeSet内の別Eventだけを端点とし、自己Relationと順序循環を禁止する。 | 循環検出方式はL8。 |
| 因果の有向非循環 | 直接原因・派生原因の連鎖は循環しない。Event／ChangeSetは原因Relationだけで自己自身を根拠にしない。 | 循環検出方式はL8。 |
| 孤立なし | 各Eventは一つのChangeSetへ所属し、ChangeSetは少なくとも一つのEventを持つ。原因を持たない起点Eventは許容する。 | 起点Eventに人工的な原因を補わない。会話由来の双方向追跡はS4。 |
| 現行正本との分離 | 因果・順序Relationは現行状態、Decision、Proposalの値を単独で決めない。 | 現行RelationはL4-M2、状態・遷移はL2、権限はL3。 |

## 責務境界

- S1はEvent辞書と対象被覆、S3は訂正・再判断・業務上取消と旧内容保持、S4は会話から論点・判断結果への双方向由来追跡を所有する。
- L4-M4はUndo対象・原子性・依存変更へのUndo規則を、L4-M5は復元時の採用・整合を所有する。本書はChangeSetをUndo可能と決めない。
- L5は表示順、L6は操作/API、L7は検証Traceability、L8は時刻・Transaction・Event Sourcing・永続化・因果検出実装を所有する。

## 要件対応とTask固有Review

- Issue #1 §9〜15、FR-008〜015、FR-018〜019、NFR-004およびAR-001〜008に対し、変更の集合、順序・因果、履歴確認可能性の論理境界を対応付ける。
- [x] ChangeSet、単独／複数Event、Eventの一意所属とCardinalityを定義した。
- [x] 論理順序と直接／派生原因を分離し、循環・孤立を禁止した。
- [x] Undo原子性、訂正履歴、会話由来、物理実行・保存を後続Ownerへ残した。
