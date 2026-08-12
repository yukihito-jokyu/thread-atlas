# L4-M4-S4: Undo適用後のライフサイクル整合と履歴非削除

## 目的と共通前提

`L4-M4-S1`から`S3`までを満たすUndo計画を適用できるのは、適用後もL2の状態・遷移・構造不変条件及びL3のUndo基準権限・Guardを満たす場合だけである。適用を記録するUndoは新しいEvent／ChangeSetとして元対象と関連付け、元のEvent、ChangeSet、旧内容及び根拠会話を削除・上書きしない。

本書は論理上の適用可否と追跡Relationを定める。Undoの操作、Actorの具体化、UI、API、物理Transaction、Rollback、補償、保存・復元方式は定めない。

## Rule

| Rule ID | 規則 | 後続Owner・非導出事項 |
| --- | --- | --- |
| `L4-M4-S4-R-01` | S1の分類、S2の計画原子性及びS3の依存閉包を満たす計画でも、適用後にL2の有効な状態組合せ、現在地・親子・復帰先の構造不変条件又は通常進行の整合を失うなら、計画全体を拒否する。 | 状態・遷移・完了可否・構造不変条件の意味はL2が所有する。本書は逆遷移を定義しない。 |
| `L4-M4-S4-R-02` | L3が定めるUndoの基準権限又はGuardを満たさない場合、計画全体を拒否する。理解停止、要確認、未承認Proposalその他のGuardをUndoの理由だけで解除、確定、論点化又は通常進行へ移行させない。 | Actor・承認・Guardの成立／維持／解除はL3が所有する。 |
| `L4-M4-S4-R-03` | 計画を適用する場合、Undoを表す新しいEvent及びそれが所属する新しいChangeSetを記録し、各元対象ChangeSetへのUndo Relationを保持する。Relationは同一Session内の新Undo ChangeSetから別の元対象ChangeSetへ向かい、自己Relationを禁止する。新Undo ChangeSetは計画の元対象を`1..N`件、元対象ChangeSetはUndo Relationの終点を`0..1`件持つ。Undo Event／ChangeSetはS1に従い再度Undo対象にしない。 | 各Eventは既存M3規則に従いちょうど一つのChangeSetへ所属する。Event／ChangeSetのID、順序、因果、Undo Eventの詳細な対象・粒度はL4-M3又はL4-M4-S2〜S3が所有する。Redoを導入しない。 |
| `L4-M4-S4-R-04` | Undoの適用後も、元対象のEvent、ChangeSet、旧内容、新旧Relation、起点発言・操作・Actor・Rule及び根拠会話を保持する。Undo Relationは元対象を削除、隠蔽、上書き又は由来経路の補完根拠にしない。 | 現行値の所属はL4-M2、旧内容・由来RelationはL4-M3、表示・検索・保存方式はL5／L6／L8が所有する。 |
| `L4-M4-S4-R-05` | 適用又は拒否のどちらでも、Undoだけから正常完了、親復帰、現在地変更、Decision訂正、Proposalの3判断・論点化、Guard解除又は訂正・再判断・業務上取消を導かない。必要な効果は対応するL2/L3の許可経路と後続ChangeSetに従う。 | Undoと通常遷移、訂正、再判断、業務上取消を混同しない。 |

## 適用後の整合・追跡表

| 確認対象 | 適用に必要な条件 | 満たせない場合 | 適用後に保持するもの |
| --- | --- | --- | --- |
| L2状態・構造 | 有効な状態組合せ、単一現在地、親子・復帰先及び到達経路の不変条件を維持できる | 計画全体を拒否 | 元対象と新Undo ChangeSetのRelation。状態遷移はL2の正本に従う |
| L3権限・Guard | Undo基準権限と全ての該当Guardを満たし、Guardの暗黙解除・確定を生じない | 計画全体を拒否 | Guardに関わる元Event・文脈・Rule及び新Undo Event |
| Undoの履歴 | 新Undo Event／ChangeSetを元対象へ関連付けられ、既Undo対象・Undo自身を再対象化しない | 計画全体を拒否 | 元Event／ChangeSet、旧内容、新旧Relation及びUndo Relation |
| 会話由来 | 元対象の起点発言・操作・Actor・Ruleと根拠会話を削除せず追跡できる | 計画全体を拒否 | 元の双方向由来経路及び新Undo Eventの追跡情報 |

## 責務境界

- S4は論理的な事後条件、全拒否及びUndo Event／ChangeSetと元対象のRelationを所有する。Undoの選択・連動集合の原子性はS2、依存閉包はS3が所有する。
- L2は状態・遷移・構造不変条件、L3は基準権限・Actor・Guard、L4-M2は現行情報、L4-M3はEvent・ChangeSet・旧内容・由来を所有する。
- L5は表示、L6は操作・API、L7は受入、L8はTransaction・Rollback・補償・保存／復元の物理方式を所有する。Redo、時間制限、履歴削除又は物理Rollbackを追加しない。

## Task固有Review

- [x] L2の状態・構造不変条件又はL3の権限・Guardを満たさない計画を全拒否とした。
- [x] Undoを新Event／ChangeSetとして元対象に関連付け、元Event・会話・旧内容・由来を非削除とした。
- [x] Undoから通常遷移、訂正、再判断、提案判断又はGuard解除を導かない。
- [x] 原子性・依存閉包・表示・操作・物理実装を各Ownerへ残した。
