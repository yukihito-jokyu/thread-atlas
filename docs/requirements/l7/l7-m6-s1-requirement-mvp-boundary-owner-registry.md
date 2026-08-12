# L7-M6-S1 要件・MVP境界・Owner台帳

## 目的

L7-M6 の中央 Traceability 表（S3）が受入行を作成する前提として、原典、派生要件、MVP境界及び三種類の Owner を一つの台帳で固定する。ここでの登録は受入仕様又は試験結果を確定せず、S2 の共通行形式を用いる S3 へ根拠を渡す。

## 台帳の読み方

| 区分 | 意味 | 本書から導かないこと |
| --- | --- | --- |
| 規範 | 原典の FR／AR／NFR／MVP／Q、承認済み Scenario、又はその実現を分解した L2〜L6 の Requirement／Capability。 | 実装、試験実行又は合格。 |
| 説明 | 原典の背景・例・章、Task Map、議論記録、既存成果物の説明・重複記述。規範行の根拠を補助する。 | 独立した Requirement、MVP追加又は客観的合否。 |
| MVP外境界 | 原典で将来範囲として保持するが、MVPの受入・総合合否には含めない登録。 | 欠落、不合格又はMVP内要件。 |

同じ内容を説明と規範の双方へ重複登録しない。説明だけの文章、表示近接又は推測から規範 ID を新設しない。原典 ID・Scenario ID・Q ID・派生 ID は S2 の共通 Registry を参照し、再採番しない。

## Owner の種別

| Owner種別 | 所有すること | 主なOwner |
| --- | --- | --- |
| 要件定義Owner | 意味、状態・構造、Actor、正本、提示又はCapabilityの規範。 | L1〜L6 の該当成果物。 |
| 受入Owner | 共通受入行、固有 Oracle・基準、中央Traceability、差分監査、証跡索引。 | L7-M1〜M6（本台帳はM6-S1）。 |
| 実行Owner | 実装、Fixture／Dataset、Case／Run／Evidence、Harness、保存・計測・物理設計。 | 後続L8の指定単一Owner。 |

表中の「主」は規範を変更できる Owner、「関連」は参照だけを行う Owner である。受入 Owner が要件の意味を、実行 Owner が受入の合否を、要件定義 Owner が実装方式を奪わない。

## 原典規範台帳

### FR・AR・NFR

| ID | 規範の要約 | 要件定義Owner（主） | 関連Owner | 受入Owner | 実行・詳細設計Owner |
| --- | --- | --- | --- | --- | --- |
| FR-001 | AIとの対話を開始・継続する。 | L6 | L2, L3, L5 | L7-M6-S3、M1/M5 | L8指定Owner |
| FR-002 | 議論マップを確認する。 | L5 | L2, L4 | L7-M6-S3、M1 | L8指定Owner |
| FR-003 | 現在地を確認する。 | L2 | L4, L5 | L7-M6-S3、M1 | L8指定Owner |
| FR-004 | 背景・目的・理由を確認する。 | L5 | L4, L6 | L7-M6-S3、M1 | L8指定Owner |
| FR-005 | 完了条件とその判断を扱う。 | L2 | L4, L5, L6 | L7-M6-S3、M1 | L8指定Owner |
| FR-006 | 既知の残り論点を確認する。 | L5 | L2, L4 | L7-M6-S3、M1 | L8指定Owner |
| FR-007 | 復帰先を確認する。 | L2 | L4, L5 | L7-M6-S3、M1 | L8指定Owner |
| FR-008 | Discussion Toolで構造を更新する。 | L6 | L2, L3, L4 | L7-M6-S3、M1/M5 | L8指定Owner |
| FR-009 | AI由来の新規提案を分離登録する。 | L3 | L2, L4, L5, L6 | L7-M6-S3、M1/M5 | L8指定Owner |
| FR-010 | 提案と現在スコープを区別する。 | L3 | L2, L4, L5 | L7-M6-S3、M1/M5 | L8指定Owner |
| FR-011 | 提案への三判断を明示承認で扱う。 | L3 | L2, L4, L5, L6 | L7-M6-S3、M1/M5 | L8指定Owner |
| FR-012 | Decisionと決定済みの状態を扱う。 | L2 | L3, L4, L5, L6 | L7-M6-S3、M1/M5 | L8指定Owner |
| FR-013 | 会話由来を追跡する。 | L4 | L5, L6 | L7-M6-S3、M1/M3 | L8指定Owner |
| FR-014 | AI更新の内容を確認可能にする。 | L3 | L4, L5, L6 | L7-M6-S3、M1/M5 | L8指定Owner |
| FR-015 | 後から訂正し履歴を保持する。 | L4 | L2, L3, L5, L6 | L7-M6-S3、M3 | L8指定Owner |
| FR-016 | 理解停止を明示し進行を止める。 | L3 | L2, L5, L6 | L7-M6-S3、M1/M5 | L8指定Owner |
| FR-017 | 理解停止中に再説明する。 | L3 | L5, L6 | L7-M6-S3、M1/M5 | L8指定Owner |
| FR-018 | 中断後に親へ戻り再訪する。 | L2 | L3, L4, L6 | L7-M6-S3、M1/M4 | L8指定Owner |
| FR-019 | 履歴を確認する。 | L4 | L5, L6 | L7-M6-S3、M3 | L8指定Owner |
| FR-020 | 未完了Sessionを復元・再開する。 | L4 | L2, L3, L5, L6 | L7-M6-S3、M4 | L8指定Owner |
| AR-001 | 親論点を保ち、親子を混同しない。 | L2 | L3, L4 | L7-M6-S3、M1/M3 | L8指定Owner |
| AR-002 | 論点変更時に現在地を更新する。 | L2 | L4, L6 | L7-M6-S3、M1/M3 | L8指定Owner |
| AR-003 | 議論理由を記録する。 | L4 | L5, L6 | L7-M6-S3、M1/M3 | L8指定Owner |
| AR-004 | 下位進入前に完了条件を設定する。 | L2 | L3, L4, L6 | L7-M6-S3、M1/M3 | L8指定Owner |
| AR-005 | 完了と親復帰を分ける。 | L2 | L3, L4, L6 | L7-M6-S3、M1/M3 | L8指定Owner |
| AR-006 | 確認なしに利用者を決定者と扱わない。 | L3 | L2, L6 | L7-M6-S3、M1/M5 | L8指定Owner |
| AR-007 | AI由来の案を通常論点と分ける。 | L3 | L2, L4, L6 | L7-M6-S3、M1/M5 | L8指定Owner |
| AR-008 | AIが自動で論点を脱線させない。 | L3 | L2, L6 | L7-M6-S3、M1/M5 | L8指定Owner |
| NFR-001 | 基本更新で過度な手入力を要求しない。 | L6 | L3, L7-M1 | L7-M6-S3、M1 | L8指定Owner |
| NFR-002 | 応答性を確認可能にする。 | L6 | L7-M2 | L7-M6-S3、M2 | L8指定Owner |
| NFR-003 | 情報を読みやすく提示する。 | L5 | L7-M1 | L7-M6-S3、M1 | L8指定Owner |
| NFR-004 | 後から確認・修正できる。 | L4 | L7-M3 | L7-M6-S3、M3 | L8指定Owner |
| NFR-005 | 特定AIに固定しない。 | L6 | L7-M5 | L7-M6-S3、M5 | L8指定Owner |
| NFR-006 | Sessionを保存し再開できる。 | L4 | L7-M4 | L7-M6-S3、M4 | L8指定Owner |

### MVPと成功確認質問

| ID | 規範の要約 | 要件定義Owner（主） | 関連Owner | 直接被覆Scenario | 受入Owner | 実行・詳細設計Owner |
| --- | --- | --- | --- | --- | --- | --- |
| MVP-01 | AIとのチャット | L6 | L3, L5 | L1-M1-S1/S2 | L7-M6-S3、M1/M5 | L8指定Owner |
| MVP-02 | Discussion Toolによる構造更新 | L6 | L2, L3, L4 | L1-M1-S2 | L7-M6-S3、M1/M5 | L8指定Owner |
| MVP-03 | 階層型議論マップ | L5 | L4, L6 | L1-M1-S1 | L7-M6-S3、M1 | L8指定Owner |
| MVP-04 | 現在地の表示 | L5 | L2, L4 | L1-M1-S1/S2 | L7-M6-S3、M1 | L8指定Owner |
| MVP-05 | ルートからの経路表示 | L5 | L2, L4 | L1-M1-S1 | L7-M6-S3、M1 | L8指定Owner |
| MVP-06 | 現在論点の背景表示 | L5 | L2, L4 | L1-M1-S1 | L7-M6-S3、M1 | L8指定Owner |
| MVP-07 | 現在論点の目的表示 | L5 | L2, L4 | L1-M1-S1 | L7-M6-S3、M1 | L8指定Owner |
| MVP-08 | 完了条件の表示 | L5 | L2, L3, L4, L6 | L1-M1-S1/S4 | L7-M6-S3、M1 | L8指定Owner |
| MVP-09 | 親復帰先の表示 | L5 | L2, L4, L6 | L1-M1-S1/S4 | L7-M6-S3、M1 | L8指定Owner |
| MVP-10 | 論点の状態管理 | L2 | L3, L4, L5, L6 | L1-M1-S2〜S4 | L7-M6-S3、M1/M3 | L8指定Owner |
| MVP-11 | Decision管理 | L2 | L3, L4, L5, L6 | L1-M1-S2〜S4 | L7-M6-S3、M1/M3 | L8指定Owner |
| MVP-12 | AI新規提案の分離 | L3 | L2, L4, L5, L6 | L1-M2-S1 | L7-M6-S3、M1/M5 | L8指定Owner |
| MVP-13 | 提案の承認・保留・却下 | L3 | L2, L4, L5, L6 | L1-M2-S2 | L7-M6-S3、M1/M5 | L8指定Owner |
| MVP-14 | 会話Traceability | L4 | L5, L6 | L1-M1-S2 | L7-M6-S3、M1/M3 | L8指定Owner |
| MVP-15 | Session保存・再開 | L4 | L2, L5, L6 | L1-M4-S3 | L7-M6-S3、M4 | L8指定Owner |
| Q1 | 現在論点 | L5-M1 | L2, L4 | L1-M1-S1 | L7-M6-S3、M1 | L8指定Owner |
| Q2 | 論点が存在する理由 | L5-M2 | L4 | L1-M1-S1 | L7-M6-S3、M1 | L8指定Owner |
| Q3 | 全体での位置 | L5-M1 | L2, L4 | L1-M1-S1 | L7-M6-S3、M1 | L8指定Owner |
| Q4 | 完了の条件 | L5-M2 | L2, L4 | L1-M1-S1/S4 | L7-M6-S3、M1 | L8指定Owner |
| Q5 | 完了後の復帰先 | L5-M2 | L2, L4 | L1-M1-S1/S4 | L7-M6-S3、M1 | L8指定Owner |
| Q6 | 決まったこと | L5-M3 | L2, L4 | L1-M1-S2〜S4 | L7-M6-S3、M1 | L8指定Owner |
| Q7 | AIが新しく提案したこと | L5-M3 | L3, L4 | L1-M2-S1 | L7-M6-S3、M1 | L8指定Owner |
| Q8 | いま扱う範囲の増加 | L5-M3 | L2, L3, L4 | L1-M2-S1/S2 | L7-M6-S3、M1 | L8指定Owner |

MVP ID は15項目を増減しない。Q ID は表示だけで値・状態・Decisionを変更する要件ではない。

## L1 Scenario台帳

| Scenario ID | 主要な原典根拠 | 要件定義Owner（主） | 関連Owner | 受入Owner | 実行・詳細設計Owner |
| --- | --- | --- | --- | --- | --- |
| L1-M1-S1 | FR-001〜007 | L2 | L5, L6 | L7-M6-S3、M1 | L8指定Owner |
| L1-M1-S2 | FR-001,008,012〜014 | L3 | L4, L5, L6 | L7-M6-S3、M1/M5 | L8指定Owner |
| L1-M1-S3 | FR-001,013〜015,019 | L3 | L2, L4, L5, L6 | L7-M6-S3、M1/M3 | L8指定Owner |
| L1-M1-S4 | FR-005,007〜008,012〜014 | L2 | L3, L4, L5, L6 | L7-M6-S3、M1 | L8指定Owner |
| L1-M2-S1 | FR-009〜010,014 | L3 | L2, L4, L5, L6 | L7-M6-S3、M1/M5 | L8指定Owner |
| L1-M2-S2 | FR-011,014 | L3 | L2, L4, L5, L6 | L7-M6-S3、M1/M5 | L8指定Owner |
| L1-M3-S1 | FR-003〜007,014,016 | L3 | L2, L5, L6 | L7-M6-S3、M1/M5 | L8指定Owner |
| L1-M3-S2 | FR-003〜007,014,016〜017 | L3 | L2, L5, L6 | L7-M6-S3、M1/M5 | L8指定Owner |
| L1-M4-S1 | FR-018 | L2 | L3, L4, L5, L6 | L7-M6-S3、M1/M4 | L8指定Owner |
| L1-M4-S2 | FR-018〜019 | L4 | L2, L5, L6 | L7-M6-S3、M3/M4 | L8指定Owner |
| L1-M4-S3 | FR-020 | L4 | L2, L3, L5, L6 | L7-M6-S3、M4 | L8指定Owner |

## 派生 Requirement／Capability 台帳

以下は承認済み派生成果物をID集合として漏れなく登録する。各集合の個々のIDは、対応する成果物名の `Lx-My-Sz` をそのまま用いる。要件の詳細は各主Ownerだけが変更し、S3 はこの集合から必要な1:N／N:1受入対応を明示する。

| 派生ID集合 | 種別 | 要件定義Owner（主） | 受入Owner | 実行Owner |
| --- | --- | --- | --- | --- | --- |
| L2-M1-S1〜S3、L2-M2-S1〜S3、L2-M3-S1〜S4、L2-M4-S1〜S4 | 派生Requirement（状態・完了・構造・遷移） | L2 | L7-M6-S3（関連M1/M3/M4/M5） | L8指定Owner |
| L3-M1-S1〜S4、L3-M2-S1〜S3、L3-M3-S1〜S3、L3-M4-S1〜S2 | 派生Requirement（Actor・承認・Guard） | L3 | L7-M6-S3（関連M1/M5） | L8指定Owner |
| L4-M1-S1〜S3、L4-M2-S1〜S4、L4-M3-S1〜S4、L4-M4-S1〜S4、L4-M5-S1〜S4 | 派生Requirement（Entity・正本・履歴・復元） | L4 | L7-M6-S3（関連M3/M4） | L8指定Owner |
| L5-M1-S1〜S3、L5-M2-S1〜S3、L5-M3-S1〜S4、L5-M4-S1〜S3、L5-M5-S1〜S4 | 派生Requirement（情報提示・文脈・表示連続性） | L5 | L7-M6-S3（関連M1） | L8指定Owner |
| L6-M1-S1〜S3、L6-M2-S1〜S4、L6-M3-S1〜S5、L6-M4-S1〜S5、L6-M5-S1〜S4 | 派生Capability | L6 | L7-M6-S3（関連M1/M2/M5） | L8指定Owner |

派生IDを原典FR等の代替IDにしない。また、存在しない範囲ID、将来のL8子ID、又はファイル名以外の推測IDを追加しない。

## MVP外境界台帳

| MVP外項目 | 原典根拠 | 扱い | 要件定義Owner | 受入Owner | 実行・詳細設計Owner |
| --- | --- | --- | --- | --- | --- |
| 複数人同時利用・共同編集 | Issue #1 MVP外 | 保持のみ。MVP受入・総合合否から除外。 | 原典境界 | L7-M6-S1/S3 | 対象外 |
| プロジェクト管理 | Issue #1 MVP外 | 同上。議論管理へ推測変換しない。 | 原典境界 | L7-M6-S1/S3 | 対象外 |
| Issue管理 | Issue #1 MVP外 | 同上。議論論点と混同しない。 | 原典境界 | L7-M6-S1/S3 | 対象外 |
| タスク管理 | Issue #1 MVP外 | 同上。議論の進行状態と混同しない。 | 原典境界 | L7-M6-S1/S3 | 対象外 |
| AI実装 | Issue #1 MVP外 | 同上。AIの提案・会話機能と混同しない。 | 原典境界 | L7-M6-S1/S3 | 対象外 |
| コードレビュー | Issue #1 MVP外 | 同上。議論上の訂正・確認と混同しない。 | 原典境界 | L7-M6-S1/S3 | 対象外 |
| 議論から別文書またはファイルを生成する機能（完成要件定義書を含む） | Issue #1 MVP外、L1-M5-S2 | 同上。議論由来の文書生成をMVP要件にしない。 | L1-M5-S2 | L7-M6-S1/S3 | 対象外 |
| 高度なグラフ配置編集 | Issue #1 MVP外 | 同上。L5の情報提示と混同しない。 | 原典境界 | L7-M6-S1/S3 | 対象外 |
| AI出力の正確性保証 | Issue #1 MVP外 | 同上。確認・訂正・Guard要件の代替にしない。 | 原典境界 | L7-M6-S1/S3 | 対象外 |

MVP外行は S2 の状態語彙では `MVP外` として保持する。MVP内の未実施・未検証・不合格をMVP外へ移して解消したように扱わない。

## 説明・重複記述の参照台帳

| 参照 | 用途 | 規範化しない内容 |
| --- | --- | --- |
| Issue #1 の背景、利用像、例、章見出し | FR／AR／NFR／MVP／Qの意図確認。 | 新しい機能、保証又は実装方法。 |
| `docs/task-map.md` | DAG、単一Owner、成果物・Gateの配置確認。 | 原典IDの意味変更、数値・試験方法の複製。 |
| `docs/task-decomposition-discussion.md` | 承認済み責務境界・非混同の確認。 | 未承認の設計又は追加要件。 |
| L1〜L6成果物の説明節・Review | 派生IDの根拠、重複・矛盾の発見。 | 原典にない受入結果又はL8方式。 |

## 完全性・受渡し規則

- S3 は本台帳の規範IDを全件参照し、MVP内行・MVP外行・説明参照を同じ受入行へ混在させない。受入行のCardinality、方法、期待結果、Oracle、証跡計画は S3 が定める。
- M1〜M5 の数値、標本、Profile、Case、手順、集約は各分野Ownerを参照するだけに留める。本書は基準を複製しない。
- Requirement／Acceptance／Datasetの共通Registryは統合担当の管理対象であり、Fixture、Case、Run、Evidence及び物理採番・保存・HarnessはL8の指定単一Ownerへ渡す。
- 実装後の試験実行状態、実測合否、差分の解消、証跡索引はそれぞれS2、S3、S4、S5の後続Ownerが扱う。本書の「登録済み」は定義済み又は実施済みを意味しない。

## Task固有Review

- [x] FR-001〜020、AR-001〜008、NFR-001〜006、MVP 15項目、Q1〜Q8及びL1 Scenario IDを規範台帳へ登録した。
- [x] L2〜L6の全派生 `Lx-My-Sz` 集合を、主Owner・受入Owner・実行Ownerと分けて登録した。
- [x] 原典のMVP外境界を保持し、MVP受入・総合合否への混入を禁止した。
- [x] 原典・Task Map・議論記録・成果物説明を規範と混同せず、L8の実装方式を先取りしていない。
