# L7-M6-S3 全要件の受入仕様・Traceability対応表

## 目的と適用範囲

L7-M6-S1 の規範台帳に登録された原典・派生要件を、L7-M1〜M5 の受入基準を参照する中央受入行へ対応付ける。各行は S2 の共通行形式に従い、要件・Owner・客観的方法・証跡計画・L8受渡し領域を一箇所で追跡可能にする。

本書は受入仕様の定義である。すべての MVP 内行の試験実行状態は `未実施`、証跡計画は `計画済み` とし、実装、実測、合格又は Gate 通過を導かない。

## 対応とCardinalityの規則

- 各 `ACC-xxxx` は1件以上の原典又は派生根拠を持つ（Acceptance→根拠 = 1..N）。各規範IDは、その意味を確認する1件以上の受入行を持つ（根拠→Acceptance = 1..N）。
- 一つの受入行が複数分野の基準を参照しても、結果・標本・閾値・実施状態を平均化、代替又は相殺しない。数値、Case、Profile、手順及び集約は M1〜M5 の参照先だけが所有する。
- 派生ID集合の各IDは、下表の集合内で同じ対応先へ割り当てる。集合範囲外のID、L8子ID、Case、Run、Evidence又はDataset実体を推測追加しない。
- MVP外は `ACC-9001` に保持するが、MVP内の受入・総合合否には算入しない。

## S2共通行形式による中央受入仕様表

この表をS2の必須13列を持つ正規の中央表とする。次節の概要表は可読な要約であり、列の省略又は別の受入行を意味しない。

| Acceptance ID | 原典・派生根拠 | Owner | MVP・適用範囲 | 前提・固定入力 | 受入方法 | 期待結果・禁止 | 客観的合否 | 仕様定義状態 | 試験実行状態 | 証跡計画・参照 | 参照基準 | L8受渡し領域 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ACC-0001 | FR-001,008; NFR-001; MVP-01〜02; L1-M1-S1〜S2; L6-M1/M5 | L6／M6-S3,M1,M5／L8指定Owner | MVP内・対話/正規更新 | 正本、Actor、Guard、Capability | Scenario、意味契約 | 対話と更新を区別し、AI不足を成功へ代替しない | M1/M5 Oracle参照 | 定義済み | 未実施 | Scenario・意味結果・Capability／L8実行時に生成待ち／ACC-0001／M1-S1〜S4,M5-S1〜S4／計画済み | M1-S1〜S4; M5-S1〜S4 | Tool API、AI Adapter、UI、整合 |
| ACC-0002 | FR-002〜003; AR-001〜002; MVP-03〜05; Q1,Q3; L2-M1/M3; L4-M1; L5-M1/M5 | L2,L5／M6-S3,M1,M3／L8指定Owner | MVP内・階層/現在地 | 同一Session、ルート、親子、現在地、Projection | Inspection、Scenario | 経路を識別し、Projectionから正本を補完しない | M1/M3 Oracle参照 | 定義済み | 未実施 | 構造・表示・Oracle／L8実行時に生成待ち／ACC-0002／M1-S1〜S4,M3-S1〜S4／計画済み | M1-S1〜S4; M3-S1〜S4 | UI、永続化、整合 |
| ACC-0003 | FR-004〜007; AR-003〜004; MVP-06〜09; Q2,Q4〜Q5; L2-M2; L4-M2; L5-M1〜M2; L6-M3 | L2,L4,L5／M6-S3,M1,M3／L8指定Owner | MVP内・現在論点文脈 | 背景、目的、条件、未確認、復帰先 | Scenario、Inspection | 各情報を別に確認し、未記録値を補完しない | M1/M3 Oracle参照 | 定義済み | 未実施 | 正本・会話由来・表示／L8実行時に生成待ち／ACC-0003／M1-S1〜S4,M3-S1〜S4／計画済み | M1-S1〜S4; M3-S1〜S4 | UI、永続化、照会 |
| ACC-0004 | FR-005,007,018; AR-005; MVP-10; L2-M1〜M4; L3-M1-S3; L4-M2; L6-M2/M4 | L2／M6-S3,M1,M4／L8指定Owner | MVP内・完了/中断/再訪 | Topic、条件、状態、親、復帰先、現在地 | Scenario、契約照合 | 許可経路だけを使い、表示等で状態補正しない | M1/M4 Oracle参照 | 定義済み | 未実施 | 遷移・状態・安全停止／L8実行時に生成待ち／ACC-0004／M1-S1〜S4,M4-S1〜S5／計画済み | M1-S1〜S4; M4-S1〜S5 | Tool API、永続化、整合 |
| ACC-0005 | FR-008,014; AR-006; NFR-001; MVP-02; L3-M1; L6-M1/M4 | L3,L6／M6-S3,M1,M5／L8指定Owner | MVP内・更新/可視化 | 明示Actor、承認、Guard、確定Snapshot | 意味契約 | 最大1更新、部分到達を全体成功にしない | M1/M5 Oracle参照 | 定義済み | 未実施 | Actor・Guard・同期／L8実行時に生成待ち／ACC-0005／M1-S1〜S4,M5-S1〜S4／計画済み | M1-S1〜S4; M5-S1〜S4 | Tool API、UI、AI Adapter、整合 |
| ACC-0006 | FR-009〜011; AR-007〜008; MVP-12〜13; Q7〜Q8; L3-M2; L4-M2-S4; L5-M3〜M4 | L3／M6-S3,M1,M5／L8指定Owner | MVP内・未承認Proposal | 必須由来、三判断、通常Topicとの別Entity | Scenario、契約照合 | 暗黙承認・現在地化・スコープ化を禁止 | M1/M5 Oracle参照 | 定義済み | 未実施 | Proposal・判断・由来／L8実行時に生成待ち／ACC-0006／M1-S1〜S4,M5-S1〜S4／計画済み | M1-S1〜S4; M5-S1〜S4 | AI Adapter、Tool API、UI、永続化 |
| ACC-0007 | FR-012,015,019; AR-006; MVP-11; Q6; L3-M4; L4-M2-S3; L4-M3〜M4; L5-M3〜M4 | L2,L3,L4／M6-S3,M1,M3／L8指定Owner | MVP内・Decision/訂正/Undo | 現行正本、旧内容、ChangeSet、Undo候補 | Case、Inspection | 現行を推測せず、Undo等を混同しない | M1/M3 Oracle参照 | 定義済み | 未実施 | Relation・旧内容・Undo／L8実行時に生成待ち／ACC-0007／M1-S1〜S4,M3-S1〜S4／計画済み | M1-S1〜S4; M3-S1〜S4 | 永続化、Tool API、UI、整合 |
| ACC-0008 | FR-016〜017; L1-M3-S1〜S2; L2-M4-S4; L3-M3〜M4; L4-M2-S2; L6-M2/M4 | L3／M6-S3,M1,M5／L8指定Owner | MVP内・理解停止 | Guard、現在論点、通知時文脈、明示解除 | Scenario、契約照合 | 暗黙解除・進行・確定更新を禁止 | M1/M5 Oracle参照 | 定義済み | 未実施 | Guard・解除・入力／L8実行時に生成待ち／ACC-0008／M1-S1〜S4,M5-S1〜S4／計画済み | M1-S1〜S4; M5-S1〜S4 | AI Adapter、UI、Tool API、整合 |
| ACC-0009 | FR-013,019; AR-003; MVP-14; L4-M1/M3; L5-M4; L6-M3 | L4／M6-S3,M1,M3／L8指定Owner | MVP内・会話Traceability | 同一Session、会話、Event、ChangeSet、Actor、Rule | Inspection、Case | Event経由で追跡し、ChangeSetを直接Relationにしない | M1/M3 Oracle参照 | 定義済み | 未実施 | Event・因果・由来／L8実行時に生成待ち／ACC-0009／M1-S1〜S4,M3-S1〜S4／計画済み | M1-S1〜S4; M3-S1〜S4 | 永続化、照会、UI、整合 |
| ACC-0010 | FR-020; NFR-006; MVP-15; L4-M5; L2-M3/M4; L3-M3; L5-M4; L6-M4 | L4／M6-S3,M4／L8指定Owner | MVP内・未完了Session復元 | 7対象、現行/旧、Undo、Guard、閉包 | Profile、Oracle照合 | 復元だけで再開・昇格・解除を導かない | M4 Oracle参照 | 定義済み | 未実施 | 前後正本・閉包・停止/再開／L8実行時に生成待ち／ACC-0010／M4-S1〜S5／計画済み | M4-S1〜S5 | 永続化、整合、Tool API、UI |
| ACC-0011 | FR-002〜007,012〜014; MVP-03〜11; Q1〜Q8; L5-M1〜M5 | L5／M6-S3,M1／L8指定Owner | MVP内・情報提示 | 構造、文脈、Decision、Proposal、履歴の正本 | Scenario、Inspection | 表示から正本・状態・判断を補完しない | M1 Oracle参照 | 定義済み | 未実施 | 表示・可読性・正本／L8実行時に生成待ち／ACC-0011／M1-S1〜S4／計画済み | M1-S1〜S4 | UI、照会、AI Adapter |
| ACC-0012 | NFR-003; MVP-03〜09; Q1〜Q5; L5-M1/M2; L6-M3 | L5／M6-S3,M1／L8指定Owner | MVP内・可読性/操作負荷 | 現在論点に対応する記録済み情報 | 分野代表課題 | 別分野の合格で可読性を相殺しない | M1 Oracle参照 | 定義済み | 未実施 | M1実施・集約／L8実行時に生成待ち／ACC-0012／M1-S1〜S4／計画済み | M1-S1〜S4 | UI、計測試験 |
| ACC-0013 | NFR-002; FR-001,008,014〜020; L6-M4; L7-M2入力要件 | L6／M6-S3,M2／L8指定Owner | MVP内・結果/区間/Profile | 開始要求、観測点、結果区分、Profile | 分野測定 | 再送から追加業務変更を導かない | M2 Oracle参照 | 定義済み | 未実施 | 観測・Profile・結果／L8実行時に生成待ち／ACC-0013／M2-S1〜S4／計画済み | M2-S1〜S4 | 計測、Tool API、UI、整合 |
| ACC-0014 | NFR-004; FR-015,019; L4-M3〜M4; L6-M3; L7-M3入力要件 | L4／M6-S3,M3／L8指定Owner | MVP内・Undo可逆性 | 分類、閉包、L2/L3適合、履歴 | 分野Undo Case | 部分適用、Redo、履歴削除を成功にしない | M3 Oracle参照 | 定義済み | 未実施 | Case・原子性・Undo Relation／L8実行時に生成待ち／ACC-0014／M3-S1〜S4／計画済み | M3-S1〜S4 | 計測、永続化、Tool API、整合 |
| ACC-0015 | NFR-006; FR-020; L4-M5; L6-M4; L7-M4入力要件 | L4／M6-S3,M4／L8指定Owner | MVP内・復元安全 | Profile、閉包、正本・履歴・Undo | 分野復元実施 | 破損時は安全停止し、推測修復しない | M4 Oracle参照 | 定義済み | 未実施 | Profile・前後・停止／L8実行時に生成待ち／ACC-0015／M4-S1〜S5／計画済み | M4-S1〜S5 | 計測、永続化、整合 |
| ACC-0016 | NFR-005; FR-001,008〜011,014,016〜017; L6-M5; L7-M5入力要件 | L6／M6-S3,M5／L8指定Owner | MVP内・AI非依存 | Capability×Profile、Trigger、正本、Guard | 分野Capability照合 | P-Nを含む非相殺、任意支援は提供又は明示縮退 | M5 Oracle参照 | 定義済み | 未実施 | Capability・縮退・集約／L8実行時に生成待ち／ACC-0016／M5-S1〜S4／計画済み | M5-S1〜S4 | AI Adapter、Tool API、UI、計測 |
| ACC-9001 | S1のMVP外境界台帳にある9項目、L1-M5-S2 | 原典境界／M6-S3／対象外 | MVP外 | 原典MVP外境界 | Inspection | MVP内受入・総合合否へ混入しない | S1/S2境界参照 | MVP外 | 非該当 | 境界参照／定義段階で参照確認／ACC-9001／M6-S1/S2／計画済み | M6-S1/S2 | 対象外 |

## 受入仕様概要

| Acceptance ID | 原典・派生根拠 | Owner（要件／受入／実行・詳細設計） | MVP・適用範囲／前提・固定入力 | 受入方法／期待結果・禁止 | 客観的合否・参照基準 | 仕様定義／試験実行／証跡計画 | L8受渡し領域 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ACC-0001 | FR-001, FR-008, NFR-001, MVP-01〜02, L1-M1-S1〜S2, L6-M1, L6-M5 | L6／L7-M6-S3, M1, M5／L8指定Owner | MVP内。記録済み正本、許可されたActor・Guard・Capabilityを入力とする。 | Scenario・意味契約照合。対話と正規更新を区別し、AI支援不足を正規更新の成功へ読み替えない。 | L7-M1-S1〜S4、L7-M5-S1〜S4、L6-M1/L6-M5。 | 定義済み／未実施／計画済み（Scenario、意味結果、Capability証跡）。 | Tool API、AI Adapter、UI、実行時整合。 |
| ACC-0002 | FR-002〜003, AR-001〜002, MVP-03〜05, Q1, Q3, L1-M1-S1, L2-M1/M3, L4-M1, L5-M1/M5 | L2, L5／L7-M6-S3, M1, M3／L8指定Owner | MVP内。単一Session、既存ルート・親子・現在地・Projectionを参照する。 | Inspection・Scenario。ルート、親子、任意深度経路、現在地を識別し、Projectionから正本を補完・更新しない。 | L7-M1-S1〜S4、L7-M3-S1〜S4。 | 定義済み／未実施／計画済み（構造参照、表示確認、Oracle）。 | UI、永続化、実行時整合。 |
| ACC-0003 | FR-004〜007, AR-003〜004, MVP-06〜09, Q2, Q4〜Q5, L1-M1-S1/S4, L2-M2, L4-M2, L5-M1〜M2, L6-M3 | L2, L4, L5／L7-M6-S3, M1, M3／L8指定Owner | MVP内。同一現在論点と記録済み背景・目的・条件・未確認事項・復帰先を入力とする。 | Scenario・Inspection。各情報を別情報として確認し、未記録値、親一般又は時系列から補完しない。 | L7-M1-S1〜S4、L7-M3-S1〜S4。 | 定義済み／未実施／計画済み（正本参照、会話由来、表示確認）。 | UI、永続化、検索・照会。 |
| ACC-0004 | FR-005, FR-007, FR-018, AR-005, MVP-10, L1-M1-S4, L1-M4-S1, L2-M1〜M4, L3-M1-S3, L4-M2, L6-M2/M4 | L2／L7-M6-S3, M1, M4／L8指定Owner | MVP内。通常Topic、完了条件、状態・親・復帰先・現在地の記録済み関係を入力とする。 | Scenario・契約照合。完了、親復帰、中断、再訪を許可経路だけで扱い、表示・復元・再同期から状態補正を導かない。 | L7-M1-S1〜S4、L7-M4-S1〜S5。 | 定義済み／未実施／計画済み（遷移結果、状態参照、安全停止証跡）。 | Tool API、永続化、実行時整合。 |
| ACC-0005 | FR-008, FR-014, AR-006, NFR-001, MVP-02, L1-M1-S2, L3-M1, L6-M1/M4 | L3, L6／L7-M6-S3, M1, M5／L8指定Owner | MVP内。明示Actor・承認、Guard、同じ確定Snapshotを固定入力とする。 | 意味契約照合。更新は許可経路だけで最大1回、AI更新の内容は確認可能とし、部分到達を全体同期又は成功へ一般化しない。 | L7-M1-S1〜S4、L7-M5-S1〜S4、L6-M4。 | 定義済み／未実施／計画済み（Actor、Guard、意味結果、同期証跡）。 | Tool API、UI、AI Adapter、実行時整合。 |
| ACC-0006 | FR-009〜011, AR-007〜008, MVP-12〜13, Q7〜Q8, L1-M2-S1〜S2, L2-M4-S3/S4, L3-M2, L4-M2-S4, L5-M3〜M4, L6-M2/M4 | L3／L7-M6-S3, M1, M5／L8指定Owner | MVP内。未承認Proposal、必須由来情報、明示三判断、通常Topicとの別Entityを入力とする。 | Scenario・契約照合。登録、三判断、論点化後由来を確認し、無応答・AI推測・表示だけから承認、現在地化又は現スコープ化を導かない。 | L7-M1-S1〜S4、L7-M5-S1〜S4。 | 定義済み／未実施／計画済み（Proposal、判断、由来Relation、表示証跡）。 | AI Adapter、Tool API、UI、永続化。 |
| ACC-0007 | FR-012, FR-015, FR-019, AR-006, MVP-11, Q6, L1-M1-S2〜S3, L2-M4-S3/S4, L3-M4, L4-M2-S3, L4-M3〜M4, L5-M3〜M4, L6-M2〜M4 | L2, L3, L4／L7-M6-S3, M1, M3／L8指定Owner | MVP内。Decision、訂正・再判断・業務取消、Undo候補及び記録済み現行正本を入力とする。 | Case・Inspection。現行はL4-M2正本だけを参照し、旧内容・理由・根拠を保持する。Undo、訂正、再判断及び取消を相互に読み替えない。 | L7-M1-S1〜S4、L7-M3-S1〜S4。 | 定義済み／未実施／計画済み（ChangeSet、Relation、旧内容、Undo結果）。 | 永続化、Tool API、UI、実行時整合。 |
| ACC-0008 | FR-016〜017, L1-M3-S1〜S2, L2-M4-S4, L3-M3〜M4, L4-M2-S2, L5-M2, L6-M2/M4 | L3／L7-M6-S3, M1, M5／L8指定Owner | MVP内。有効な理解停止Guard、一意な現在論点・通知時文脈、明示解除を入力とする。 | Scenario・契約照合。再説明は許すが、AI推測、沈黙、時間経過、曖昧化又は確認要求から進行・解除・確定更新を導かない。 | L7-M1-S1〜S4、L7-M5-S1〜S4。 | 定義済み／未実施／計画済み（Guard、明示解除、入力確認証跡）。 | AI Adapter、UI、Tool API、実行時整合。 |
| ACC-0009 | FR-013, FR-019, AR-003, MVP-14, L1-M1-S3, L1-M4-S2, L4-M1/M3, L5-M4, L6-M3 | L4／L7-M6-S3, M1, M3／L8指定Owner | MVP内。同一Sessionの会話、Event、ChangeSet、Actor、Rule、結果Relationを入力とする。 | Inspection・Case。結果から根拠Eventを経て会話・Actor・Ruleを追跡し、ChangeSetを会話又は結果の直接Relationにしない。 | L7-M1-S1〜S4、L7-M3-S1〜S4。 | 定義済み／未実施／計画済み（Event、ChangeSet、由来・順序・因果証跡）。 | 永続化、検索・照会、UI、実行時整合。 |
| ACC-0010 | FR-020, NFR-006, MVP-15, L1-M4-S3, L2-M3/M4, L3-M3, L4-M5, L5-M4, L6-M4 | L4／L7-M6-S3, M4／L8指定Owner | MVP内。未完了Sessionの7対象、現行・旧、Undo、Guard、Session閉包を入力とする。 | Profile・Oracle照合。復元だけで通常進行、現在地変更、完了、Proposal昇格又はGuard解除を導かず、適合時だけ許可経路へ接続する。 | L7-M4-S1〜S5。 | 定義済み／未実施／計画済み（復元前後正本、閉包、停止・再開証跡）。 | 永続化、実行時整合、Tool API、UI。 |
| ACC-0011 | FR-002〜007, FR-012〜014, MVP-03〜11, Q1〜Q8, L5-M1〜M5 | L5／L7-M6-S3, M1／L8指定Owner | MVP内。記録済みの構造・文脈・Decision・Proposal・履歴提示情報を入力とする。 | Scenario・Inspection。全体、現在地、文脈、確定度、提案、履歴を役割別に識別し、表示の近接・順序・選択から正本・状態・判断を補完しない。 | L7-M1-S1〜S4。 | 定義済み／未実施／計画済み（表示確認、可読性Oracle、正本参照）。 | UI、検索・照会、AI Adapter。 |
| ACC-0012 | NFR-003, MVP-03〜09, Q1〜Q5, L5-M1/M2, L6-M3 | L5／L7-M6-S3, M1／L8指定Owner | MVP内。利用者向けに同一現在論点へ対応する記録済み情報を入力とする。 | 分野基準参照の代表課題。読みやすさ又は操作負荷を別分野の合格で相殺せず、具体的な数値・対象者・手順は複製しない。 | L7-M1-S1〜S4。 | 定義済み／未実施／計画済み（M1実施・集約証跡参照）。 | UI、計測試験。 |
| ACC-0013 | NFR-002, FR-001, FR-008, FR-014〜020, L6-M4, L7-M2入力要件 | L6／L7-M6-S3, M2／L8指定Owner | MVP内。結果区分、区間、Profile、開始要求及び記録済み観測点を入力とする。 | 分野基準参照の測定。拒否、競合、結果不明、再同期、再試行を意味どおりに観測し、再送から追加業務変更を導かない。 | L7-M2-S1〜S4。 | 定義済み／未実施／計画済み（観測、Profile、結果、実施証跡）。 | 計測試験、Tool API、UI、実行時整合。 |
| ACC-0014 | NFR-004, FR-015, FR-019, L4-M3〜M4, L6-M3, L7-M3入力要件 | L4／L7-M6-S3, M3／L8指定Owner | MVP内。分類済みChangeSet、依存閉包、L2/L3適合及び履歴参照を入力とする。 | 分野基準参照のUndo Case。部分適用、無条件Undo、Redo、旧内容削除又は非一意閉包を成功へ読み替えない。 | L7-M3-S1〜S4。 | 定義済み／未実施／計画済み（Case、原子性、依存、Undo Relation証跡）。 | 計測試験、永続化、Tool API、実行時整合。 |
| ACC-0015 | NFR-006, FR-020, L4-M5, L6-M4, L7-M4入力要件 | L4／L7-M6-S3, M4／L8指定Owner | MVP内。復元Profile、Session閉包、正本・履歴・Undo参照を入力とする。 | 分野基準参照の復元実施。欠落・混入・孤立・循環・現行旧逆転又は因果破損では安全停止し、推測修復しない。 | L7-M4-S1〜S5。 | 定義済み／未実施／計画済み（Profile、復元前後、停止・集約証跡）。 | 計測試験、永続化、実行時整合。 |
| ACC-0016 | NFR-005, FR-001, FR-008〜011, FR-014, FR-016〜017, L6-M5, L7-M5入力要件 | L6／L7-M6-S3, M5／L8指定Owner | MVP内。Capability×Profile、Trigger、正本、Guard及び意味結果を入力とする。 | 分野基準参照。P-Cの必須能力、成立Triggerの条件付き能力、全P-N否定ケースを非相殺で扱い、任意AI支援は提供又は明示縮退だけを確認する。 | L7-M5-S1〜S4。 | 定義済み／未実施／計画済み（Capability、縮退、意味結果、集約証跡）。 | AI Adapter、Tool API、UI、計測試験。 |
| ACC-9001 | MVP外9項目（S1台帳）、L1-M5-S2 | 原典境界／L7-M6-S3／対象外 | MVP外。原典で保持する境界のみを固定入力とする。 | Inspection。MVP外を保持し、MVP内受入・総合合否・不足の隠蔽へ混入しない。 | L7-M6-S1/S2。 | MVP外／非該当／計画済み（境界参照）。 | 対象外。L8方式を要求しない。 |

## 原典規範の対応表

各セルの複数IDは当該IDごとの1..N対応を表す。原典規範を近接する別IDで代替しない。Scenarioの範囲表記は「行に含まれる各Scenarioが対応先の少なくとも一つへ接続する集合被覆」を表し、範囲内の全Scenarioと全Acceptance IDの直積対応を意味しない。個別Scenarioの主要な原典根拠と直接被覆は S1 のScenario台帳を正本として参照する。

| 根拠ID | 対応Acceptance ID | 根拠ID | 対応Acceptance ID |
| --- | --- | --- | --- |
| FR-001 | ACC-0001, ACC-0013, ACC-0016 | FR-002 | ACC-0002, ACC-0011 |
| FR-003 | ACC-0002, ACC-0011 | FR-004 | ACC-0003, ACC-0011 |
| FR-005 | ACC-0003, ACC-0004, ACC-0011 | FR-006 | ACC-0003, ACC-0011 |
| FR-007 | ACC-0003, ACC-0004, ACC-0011 | FR-008 | ACC-0001, ACC-0005, ACC-0013, ACC-0016 |
| FR-009 | ACC-0006, ACC-0016 | FR-010 | ACC-0006, ACC-0016 |
| FR-011 | ACC-0006, ACC-0016 | FR-012 | ACC-0007, ACC-0011 |
| FR-013 | ACC-0009 | FR-014 | ACC-0005, ACC-0011, ACC-0013, ACC-0016 |
| FR-015 | ACC-0007, ACC-0014 | FR-016 | ACC-0008, ACC-0016 |
| FR-017 | ACC-0008, ACC-0016 | FR-018 | ACC-0004 |
| FR-019 | ACC-0007, ACC-0009, ACC-0014 | FR-020 | ACC-0010, ACC-0015 |
| AR-001 | ACC-0002 | AR-002 | ACC-0002 |
| AR-003 | ACC-0003, ACC-0009 | AR-004 | ACC-0003 |
| AR-005 | ACC-0004 | AR-006 | ACC-0005, ACC-0007 |
| AR-007 | ACC-0006 | AR-008 | ACC-0006 |
| NFR-001 | ACC-0001, ACC-0005 | NFR-002 | ACC-0013 |
| NFR-003 | ACC-0012 | NFR-004 | ACC-0014 |
| NFR-005 | ACC-0016 | NFR-006 | ACC-0010, ACC-0015 |
| MVP-01〜02 | ACC-0001 | MVP-03〜05 | ACC-0002, ACC-0011 |
| MVP-06〜09 | ACC-0003, ACC-0011, ACC-0012 | MVP-10 | ACC-0004 |
| MVP-11 | ACC-0007, ACC-0011 | MVP-12〜13 | ACC-0006 |
| MVP-14 | ACC-0009 | MVP-15 | ACC-0010, ACC-0015 |
| Q1, Q3 | ACC-0002, ACC-0011 | Q2, Q4〜Q5 | ACC-0003, ACC-0011, ACC-0012 |
| Q6 | ACC-0007, ACC-0011 | Q7〜Q8 | ACC-0006, ACC-0011 |
| L1-M1-S1〜S4 | ACC-0001〜0005, ACC-0007, ACC-0009, ACC-0011 | L1-M2-S1〜S2 | ACC-0006 |
| L1-M3-S1〜S2 | ACC-0008 | L1-M4-S1〜S3 | ACC-0004, ACC-0007, ACC-0009〜0010 |

## MVP外境界の個別対応

| MVP外項目 | 対応Acceptance ID | 許されない読み替え |
| --- | --- | --- |
| 複数人同時利用・共同編集 | ACC-9001 | MVP内の単独Session受入へ含めること。 |
| プロジェクト管理 | ACC-9001 | 議論管理の要件へ変換すること。 |
| Issue管理 | ACC-9001 | 論点・Decisionの要件へ変換すること。 |
| タスク管理 | ACC-9001 | 進行状態の要件へ変換すること。 |
| AI実装 | ACC-9001 | AI提案・会話Capabilityと同一視すること。 |
| コードレビュー | ACC-9001 | 議論上の訂正・確認と同一視すること。 |
| 別文書又はファイルの生成（完成要件定義書を含む） | ACC-9001 | MVPの議論由来出力要件にすること。 |
| 高度なグラフ配置編集 | ACC-9001 | 情報提示の必須要件にすること。 |
| AI出力の正確性保証 | ACC-9001 | 確認・訂正・Guard要件の代替にすること。 |

## 派生要件・Capabilityの対応表

| 派生ID集合（全ID） | 件数 | 対応Acceptance ID | 参照する分野基準 |
| --- | ---: | --- | --- |
| L2-M1-S1〜S3 | 3 | ACC-0002, ACC-0004, ACC-0006〜0007 | M1, M3, M4 |
| L2-M2-S1〜S3 | 3 | ACC-0003〜0004, ACC-0006 | M1, M4 |
| L2-M3-S1〜S4 | 4 | ACC-0002, ACC-0004, ACC-0010 | M1, M4 |
| L2-M4-S1〜S4 | 4 | ACC-0004〜0008, ACC-0010 | M1, M4, M5 |
| L3-M1-S1〜S4 | 4 | ACC-0005〜0008 | M1, M5 |
| L3-M2-S1〜S3 | 3 | ACC-0006 | M1, M5 |
| L3-M3-S1〜S3 | 3 | ACC-0008, ACC-0010 | M1, M4, M5 |
| L3-M4-S1〜S2 | 2 | ACC-0007〜0008 | M1, M5 |
| L4-M1-S1〜S3 | 3 | ACC-0002, ACC-0009〜0010 | M3, M4 |
| L4-M2-S1〜S4 | 4 | ACC-0003〜0004, ACC-0006〜0007, ACC-0010 | M3, M4 |
| L4-M3-S1〜S4 | 4 | ACC-0007, ACC-0009〜0010, ACC-0014 | M3, M4 |
| L4-M4-S1〜S4 | 4 | ACC-0007, ACC-0014 | M3 |
| L4-M5-S1〜S4 | 4 | ACC-0010, ACC-0015 | M4 |
| L5-M1-S1〜S3 | 3 | ACC-0002〜0003, ACC-0011〜0012 | M1 |
| L5-M2-S1〜S3 | 3 | ACC-0003, ACC-0008, ACC-0011〜0012 | M1 |
| L5-M3-S1〜S4 | 4 | ACC-0006〜0007, ACC-0011 | M1 |
| L5-M4-S1〜S3 | 3 | ACC-0007, ACC-0009〜0011 | M1, M3, M4 |
| L5-M5-S1〜S4 | 4 | ACC-0002, ACC-0011 | M1 |
| L6-M1-S1〜S3 | 3 | ACC-0001, ACC-0005, ACC-0016 | M1, M5 |
| L6-M2-S1〜S4 | 4 | ACC-0004〜0008 | M1, M5 |
| L6-M3-S1〜S5 | 5 | ACC-0003, ACC-0007, ACC-0009, ACC-0011〜0012 | M1, M3 |
| L6-M4-S1〜S5 | 5 | ACC-0004〜0008, ACC-0010, ACC-0013 | M1, M2, M4, M5 |
| L6-M5-S1〜S4 | 4 | ACC-0001, ACC-0016 | M5 |

## 完全性・責務境界

- ACC-0001〜0016は MVP 内規範、ACC-9001は MVP 外境界だけを対象にする。MVP外を未実施、不合格又は正当非該当の代替にしない。
- 仕様定義・試験実行・証跡の状態語彙は S2 に従う。全MVP内必須行が未実施等のままでは総合合格を導かないが、総合集約、監査上の差分・解消及び証跡索引はそれぞれ S3、S4、S5 の後続責務に残す。
- L1〜L6 は意味、状態、Actor、正本、提示及びCapabilityを、M1〜M5 は固有Oracle、閾値、Profile、手順及び集約を所有する。本書は参照先の値・手順・実行結果を複製しない。
- L8 は共通Registryを用いる具体的なDataset、Fixture、Case、Run、Evidence、Harness、保存、検索、計測及び実装方式を指定単一Ownerとして定める。本書はL8子ID、物理Schema又はProviderを指定しない。

## Task固有Review

- [x] S2の共通行形式により、原典・派生根拠、Owner、客観的方法、合否参照、証跡計画及びL8領域を各受入行へ記録した。
- [x] FR-001〜020、AR-001〜008、NFR-001〜006、MVP-01〜15、Q1〜Q8、L1 Scenario及びL2〜L6の83派生IDを1..N／N..1対応へ割り当てた。
- [x] MVP外9項目を ACC-9001 として保持し、MVP内の受入・総合合否から分離した。
- [x] M1〜M5の数値・標本・Profile・Case・手順・集約を参照に留め、L8の実装方式を先取りしていない。
