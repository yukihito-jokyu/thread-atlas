# L4-M3-S4: 現行論点・判断結果と根拠会話の双方向由来追跡

## 目的と共通前提

論点、Decision、未承認Proposal、現行／旧結果について、根拠となる会話から結果へ、また結果から根拠会話へ相互にたどれる論理由来Relationを定める。由来Relationは、会話内容から状態、判断、構造又は現行結果を推測して補完せず、記録済みの論理変更Eventを介する根拠だけを結ぶ。各Eventはちょうど1つのChangeSetに所属するため、経路上ではその所属ChangeSetも確認できる。

全端点は同一Sessionに所属する。発言・ターンと論点の関連Cardinalityは`L4-M1-S2`、親子・派生とマップProjectionは`L4-M1-S3`、現行状態・Decision・Proposal／生成Topicは`L4-M2`、Event・ChangeSetと新旧Relationは`L4-M3-S1`〜`S3`に従う。本書は表示順、検索、物理索引、保存方式又は会話の自動解釈を定めない。

## 共通Relation・Cardinality

| Relation | Cardinality・制約 |
| --- | --- |
| 発言／ターン ↔ Eventの起点参照 | 発言又はターンは起点Eventを`0..N`持ち、Eventは起点となる発言又はターンを`0..N`持てる。ユーザー要求、AI提案、既存論理情報もEventの起点参照を`0..N`持てるが、起点の不在を推測補完しない。 |
| Event ↔ ChangeSet | Eventはちょうど1つのChangeSetへ所属し、ChangeSetは`1..N`のEventを持つ。ChangeSetは起点会話を直接参照しない。 |
| Event ↔ Actor／Rule | EventはActor及びRuleの参照を各`0..N`持てる。Actor又はRuleが未記録であっても、会話又は結果から補わない。 |
| Event ↔ 影響結果 | 有効な論理変更Eventは影響結果を`1..N`持ち、Topic、Decision、Proposal、現行／旧結果は根拠Eventを`0..N`持てる。読取、失敗、no-opはEvent対象外であり、由来Relationを作らない。 |

したがって、会話からの経路は「発言又はターン → 起点Event → 影響結果（当該Eventの所属ChangeSetを併記）」、結果からの逆経路は「影響結果 → 根拠Event → Eventの起点発言又はターン・Actor・Rule（当該Eventの所属ChangeSetを併記）」とする。Eventが起点会話及び影響結果を直接参照し、ChangeSetはそのEventの一意所属を確認するだけで、起点会話又は結果を直接結ばない。

## 双方向由来追跡表

| 追跡対象 | 根拠会話から対象への経路 | 対象から根拠会話への逆経路 | Cardinality・整合条件 | 非導出事項・詳細Owner |
| --- | --- | --- | --- | --- |
| 現行Topic | 発言又はターン → 起点Event → 現行Topicに反映された変更（Eventの所属ChangeSetを併記） | 現行Topic → 根拠Event → Eventの起点発言又はターン・Actor・Rule（Eventの所属ChangeSetを併記） | 共通Cardinalityに従い、現行Topicは根拠Eventを`0..N`持つ。 | 親子、現在地、状態、完了は由来だけで変更しない。現行正本はL4-M2、構造・遷移はL2、ActorはL3が所有する。 |
| 現行Decision・保留／対象外の判断結果 | 発言又はターン → 判断を記録したEvent → 現行Decision又は判断結果（Eventの所属ChangeSetを併記） | 現行Decision又は判断結果 → 根拠Event → Eventの起点会話・Actor・Rule（Eventの所属ChangeSetを併記） | 共通Cardinalityに従い、各現行結果は根拠Eventを`0..N`持つ。 | 判断の意味、優先、状態効果、再判断はL2/L3、現行RelationはL4-M2-S3が所有する。 |
| 未承認Proposal・3判断・生成Topic由来 | 発言又はターン → Proposal登録又は3判断のEvent → Proposal、現行判断又は生成Topic由来（Eventの所属ChangeSetを併記） | Proposal、現行判断又は生成Topic由来 → 根拠Event → Eventの起点会話・Actor・Rule（Eventの所属ChangeSetを併記） | 共通Cardinalityに従う。Proposal／判断／生成Topicの分離と必須情報はL4-M2-S4に従う。 | 登録、3判断、論点化承認、再判断・取消はL2/L3が所有する。 |
| 旧結果・訂正・再判断・業務上取消 | 発言又はターン → 後続変更のEvent → 新旧Relationで結ばれた旧結果（Eventの所属ChangeSetを併記） | 旧結果又は新旧Relation → 新旧Event → Eventの起点会話・Actor・Rule（各Eventの所属ChangeSetを併記） | 新旧Relationの端点、同粒度、有向DAG、旧内容保持はL4-M3-S3に従い、旧結果は根拠Eventを`0..N`持つ。 | 訂正の適用はL3-M4-S2、業務上取消とUndoの分離・Undo詳細はL4-M4が所有する。 |

## 被覆・非孤立条件

- EventがChangeSetに所属しない孤立を禁止する。会話を起点参照として記録した有効変更Eventは、少なくとも一つの影響結果への由来Relationを持つ。会話以外の起点を持つ有効Eventも同じく影響結果へ接続するが、会話由来を作らない。
- 追跡対象に根拠会話、操作、Actor又はRuleが存在しないことは、不在を観測する結果であって、AI又は利用者がそれらを推測生成する根拠にはならない。
- 会話から影響結果へ、影響結果から会話へは、同じEvent／ChangeSetを中継して相互に確認できる。逆経路の存在は表示方法又は検索操作を要求せず、L5／L6がそれぞれ所有する。

## 責務境界とTask固有Review

- 由来Relationは論理正本のRelationであり、議論マップProjection又は表示上の近接から更新しない。
- L2は状態・遷移・不変条件、L3はActor・承認・Guard、L4-M1/M2は概念Entityと現行Relation、L4-M3-S1〜S3はEvent・ChangeSet・旧内容、L4-M4はUndoを所有する。
- L5は提示、L6は照会・検索操作、L7はTraceability検証、L8は物理索引・保存・会話解析を所有する。
- [x] Topic、Decision、Proposal、現行／旧結果の各方向について、根拠会話とEvent／ChangeSetを介する経路を定めた。
- [x] 会話又は表示からの推測補完、Proposalの暗黙論点化、履歴削除、Undoとの混同を禁止した。
- [x] L4-M3履歴・由来整合Gateへ、双方向経路と孤立防止の確認材料を渡した。
