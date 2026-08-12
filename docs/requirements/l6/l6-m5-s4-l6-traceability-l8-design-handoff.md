# L6-M5-S4: L6要件成果物と未決定設計項目のL8受渡し表

## 目的

L6-M1〜M4及びL6-M5-S1〜S3で確定した意味Capabilityを、実装方式を選ばずにL8へ受け渡す。本書は既存Owner IDを追跡キーとして用い、共通のRequirement／Capability ID、用語又は索引を新設しない。全FR・AR・NFRの検証対応、合格指標及び証跡計画はL7が所有する。

## 受渡し規則

- `必須区分`、提供者及びMVP含有はL6-M5-S1の分類を参照する。本書は区分を変更しない。
- `Codex仮定`はL6-M5-S2の仮定又は未検証事項を参照する。未確認のSDK又は接続挙動を製品要件に昇格させない。
- `他AI適合`はL6-M5-S3の意味Capability適合及び対象限定の明示縮退を参照する。Provider名、SDK名又はTool Callingの名称を適合基準にしない。
- `L8設計領域`は受取先となる設計領域だけを示す。L8の子ID、Adapter、Protocol、認証方式、API、Prompt、UI又は保存方式を選定しない。
- いずれの設計でも、AI記憶、自然言語推定、過去会話又はUIローカル状態をL4正本、L2遷移、L3承認、結果区分若しくは相関の代替にしない。

## L6 TraceabilityとL8受渡し表

| Requirement／Capability ID（既存Owner） | L6 Owner | 必須区分 | 意味契約・不変条件 | Codex仮定／未検証 | 他AI適合・不足時 | 要件違反を防ぐ禁止事項 | 未決定設計項目 | L8設計領域 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| L6-M1-S1 | L6-M1-S1 | 必須 | 入力・会話・参照・更新の責務を分離する。 | Tool要求の分離出力は仮定。 | 会話と正規要求を分離できること。不足時はUI／Toolの正規経路を使う。 | 会話本文だけを更新・承認・正本にしない。 | AI／UI／Toolの接続境界、Capability表明。 | AI方式、Provider接続、Tool／API境界。 |
| L6-M1-S2 | L6-M1-S2 | 必須 | 会話入力・記録・非変更参照・AI応答・UI提示を分離する。 | Context組立てと参照ID伝達は未検証。 | 記録済み正本を意味入力として参照できること。 | 会話から現在値・履歴・根拠を補完しない。 | Context選択、切詰め、Query／Projection契約。 | AI Context、Query／Projection、UI情報設計。 |
| L6-M1-S3 | L6-M1-S3 | 必須 | 変更要求、検証、正本更新、結果通知を正規経路で連結する。 | Tool登録・Call形式・結果返却は未検証。 | 要求候補とTool結果を結べること。代替なしでは更新を開始・成功扱いにしない。 | 送信又はAI発話だけを更新成功にしない。 | Operation、Command／結果、通知相関。 | Tool／API、Provider接続、処理オーケストレーション。 |
| L6-M2-S1 | L6-M2-S1 | 条件付き | 新規開始・通常更新はL2 GuardとL3権限を満たす。 | AI候補生成の利用可否は未検証。 | UI／Toolの許可経路で代替できること。 | 初期構造又は完了条件を推測補完しない。 | 構造化候補、Guard照会、更新Command。 | AI方式、Tool／API、UI Interaction。 |
| L6-M2-S2 | L6-M2-S2 | 条件付き | 状態、Decision、Proposal三判断及び再活性化は正規経路で扱う。 | AIの提案発見・結果受領は未検証。 | 明示判断とTool適用を結べること。 | 未承認Proposalを通常Topic、Decision又は現スコープへ昇格しない。 | 判断操作、承認境界、結果通知。 | Tool／API、AI方式、UI Interaction。 |
| L6-M2-S3 | L6-M2-S3 | 条件付き | 完了・親復帰・中断・再訪・理解停止・復元後再開を既存契約どおりに扱う。 | AI再説明・復元時Contextの利用可否は未検証。 | 正本確認と必要時の再説明を分離できること。 | 明示解除なしの再開、理解停止中の進行、復元だけの状態補正をしない。 | Guard Signal、再開Command、Safe Stopと再同期。 | AI方式、Tool／API、UI Interaction、同期設計。 |
| L6-M2-S4 | L6-M2-S4 | 条件付き | 訂正・再判断・業務取消・Undoは全適用／全拒否を保つ。 | AI要求候補の形式・相関は未検証。 | UI明示操作とTool原子適用を結べること。 | 部分適用、旧内容削除、暗黙Undo又は通常遷移への読み替えをしない。 | 複合Command、ChangeSet、Undo及び拒否結果。 | Tool／API、永続化・Undo、同期設計。 |
| L6-M3-S1 | L6-M3-S1 | 条件付き | 現在論点の文脈・進行情報は記録済み正本から照会し、背景再説明は状態変更を導かない。 | 再説明・要約生成は未検証。 | UI／Toolの記録済み提示を最低代替とする。 | 欠落情報の補完、理解停止解除又は状態変更をしない。 | Grounding、照会結果、再説明の提示。 | AI方式、Query／Projection、UI情報設計。 |
| L6-M3-S2 | L6-M3-S2 | 条件付き | 構造・状態・Decision・Proposal・スコープ・残り論点を現行正本で横断照会する。 | Snapshot再取得・差異検出は未検証。 | UI／Toolが記録済み範囲を照会できること。 | 会話順・近接・欠落から値を推測しない。 | Query範囲、Snapshot、Filter／Order。 | Query／Projection、UI情報設計、同期設計。 |
| L6-M3-S3 | L6-M3-S3 | 条件付き | 履歴・現行／旧結果・根拠会話は既存Relationを通じて照会する。 | 会話への相関・引用の実装は未検証。 | UI／Toolが記録済みRelationを提示できること。 | 時系列、新旧Relation又は会話だけから現行を選ばない。 | 履歴Query、由来Relation、引用・提示。 | Query／Projection、永続化・履歴、UI情報設計。 |
| L6-M3-S4 | L6-M3-S4 | 条件付き | 表示コンテキスト、フォーカス、選択及び会話参照は正本変更と分離する。 | UIとAIの参照受渡しは未検証。 | UIが表示上の操作を提供できること。 | 表示操作から現在地、状態、Decision又はProposalを更新しない。 | UI local／正本の境界、表示Projection。 | UI情報設計、Query／Projection、AI Context。 |
| L6-M3-S5 | L6-M3-S5 | 必須 | 不存在・欠落・該当なし・権限不足・部分取得・利用不能を意味結果として区別する。 | Provider固有Error写像は未検証。 | Tool又はUIが既存の意味区分を示せること。 | 欠落等を成功値、完全な空結果又は推測値にしない。 | Result／Error Schema、Provider Error写像、通知。 | Tool／API、Provider接続、UI異常表示。 |
| L6-M4-S1 | L6-M4-S1 | 必須 | 正常時は確定Snapshot又は確認点に会話・表示を整合させる。 | 応答・Call・結果・表示の接続順は未検証。 | Tool確認点をAI又はUIへ渡せること。 | 確認前に反映済み・照会成立・成功と通知しない。 | 確定点、通知相関、AI／UI同期。 | Tool／API、Provider接続、同期設計。 |
| L6-M4-S2 | L6-M4-S2 | 条件付き | 拒否・失敗・部分到達時は正本と通知の整合を維持する。 | Provider失敗の意味写像は未検証。 | Tool結果とUI通知を結べること。 | 結果未到達を適用済みと推測しない。 | Failure／部分到達契約、通知、再確認。 | Tool／API、Provider接続、同期設計、UI異常表示。 |
| L6-M4-S3 | L6-M4-S3 | 条件付き | 競合又は古い参照では再取得・再判定・再確認を行い非上書きを保つ。 | Version、差異検出、再同期は未検証。 | UI／Toolで最新正本を再確認できること。 | 古い会話・AI記憶・部分取得で再送、上書き又は承認代行をしない。 | Version、競合結果、再取得・再同期。 | Tool／API、同期設計、Provider接続。 |
| L6-M4-S4 | L6-M4-S4 | 条件付き | 同一論理要求は最大一つの業務変更に対応する。 | 相関ID・冪等Key・Retryは未検証。 | Tool側の既知結果確認又はUI相関を利用できること。 | AI再送を追加更新、二重成功又は二重通知にしない。 | Request／ChangeSet相関、冪等、Retry。 | Tool／API、同期設計、永続化・履歴。 |
| L6-M4-S5 | L6-M4-S5 | 条件付き | 途絶・復元異常後は正本確認後にAI文脈・表示を再同期する。 | 再接続・Context再構築は未検証。 | Tool再照会とUI再同期を利用できること。 | AI記憶・旧表示を正本にせず、差異未確認で再開しない。 | 再接続、再同期、Session単位Safe Stop。 | Provider接続、同期設計、永続化・復元、UI異常表示。 |
| 任意AI支援（L6-M1-S1〜S2、L6-M3-S1〜S4） | 各既存Owner | 任意 | 候補生成、要約、再説明は必須Capabilityを置換しない。 | AI生成品質・利用可否は未検証。 | 不提供時は記録済み正本のUI／Tool提示へ明示縮退する。 | AI支援の欠落を正本照会、承認、更新、再同期の省略に使わない。 | Prompt、Grounding、品質、Fallback提示。 | AI方式、Provider接続、UI情報設計。 |

## 未決定事項の扱い

- 表の未決定事項はL8が方式を比較・選定する入力であり、L6の意味契約を変更する根拠ではない。
- Capability検出、適合可否の交渉、Provider Adapter、SDK、Model、Tool登録、Transport、Protocol、認証、Error写像、相関、通知、再同期、UI又は保存実装はL8の設計対象である。
- 必須又はTrigger中の条件付きCapabilityに正規代替がない場合の対象限定禁止、及び任意AI支援の明示縮退は、設計後も保持する。方式選定により自然言語だけの更新・成功偽装へ変更してはならない。

## 責務境界

- L6-M1〜M4は表の意味契約・不変条件を所有し、L6-M5-S1〜S3は分類、Codex論理プロファイル、他AI適合を所有する。本書はそれらを再定義しない。
- L7は全FR・AR・NFR・MVPの検証対応、合格指標、受入方法及び証跡を所有する。本書のTraceabilityはL6からL8への設計受渡しだけであり、受入表ではない。
- L8は方式選定、詳細設計及び実装を所有する。本書はL8子ID、外部Issue、技術採否又は設計順を確定しない。

## 要件対応とTask固有Review

- Issue #1 §7、§12、§19、§22〜§23、FR-001、FR-008、FR-013、FR-015〜FR-020及びNFR-005に関するL6 Capabilityを、既存OwnerごとにL8設計領域へ受け渡す。
- [x] L6-M1〜M4の全17 Capabilityと任意AI支援について、L6 Owner、必須区分、意味契約、Codex仮定、他AI適合、禁止事項、未決定設計項目及びL8設計領域を対応付けた。
- [x] Capability ID、用語又は索引を新設せず、既存Owner IDだけを追跡キーとして用いた。
- [x] L8子ID、SDK、Adapter、Protocol、認証、Prompt、API、UI、保存又は実装方式を選定していない。
- [x] 必須不足時の対象限定禁止、条件付きCapabilityのTrigger時禁止、任意AI支援の明示縮退及び正本代替禁止を受渡した。
- [x] 全FR・AR・NFRの検証対応表、合格指標、証跡計画及び外部Issue作成をL7又は後続Ownerへ残した。
