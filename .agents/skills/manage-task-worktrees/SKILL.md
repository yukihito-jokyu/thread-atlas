---
name: manage-task-worktrees
description: GitHub Task Issueごとに隔離したGit worktreeとブランチを作成し、VS Codeで別Codexセッションへ引き継ぎ、状態確認、完了準備、安全な削除まで管理する。依存Task・Gate・基準Commit・書込みPathを確認しながら並行作業を始める場合や、worktreeを再開・整理する場合に使用する。
---

# Task Worktree管理

Task Issueを1つのブランチ、worktree、VS Codeウィンドウ、Codexセッションへ対応付ける。

## 必須手順

1. 変更操作の前に[ライフサイクル](references/lifecycle.md)を全文読む。
2. Primary checkoutから `plan` を実行し、Issue、依存Task、Gate、基準ref、Path競合を確認する。
3. `plan` が合格したら `start` を実行する。ユーザーが実装を依頼済みの場合、worktree作成やVS Code起動について追加承認を求めない。
4. VS Codeが開いたら、ユーザーへCodexの開始と引継ぎファイルの読込みを依頼する。
5. 作業完了時は `finish` とIssue固有の検証を実行する。
6. 作業主担当とは別の相互に独立した2名の読み取り専用サブエージェントで独立完了監査を行い、原典、現Issue終了条件、親・兄弟・後続Issue、未解決TBDを実差分・検証結果と照合する。
7. 監査指摘を整理し、必要な修正とIssue固有の再検証を行う。初回監査の2名とは別の読み取り専用サブエージェントで全項目を再確認し、残る指摘も監査結果へ記録する。
8. 変更内容、検証結果、独立監査結果に加え、内容上の質問項目と運用上の差異・承認事項を区別してユーザーへ提示する。
9. `git add`、Commit、push、PR作成は、対象操作についてユーザーの明示承認を得た後に限り実行する。Commit時は`.agents/skills/commit/SKILL.md`、PR作成時は`.agents/skills/pr/SKILL.md`を全文読み、そのSkillを使って実行し、IssueへEvidenceを残す。
10. Merge後に限り、明示承認を得て `remove` を実行する。

`start` はworktree作成とVS Code起動を一連の開始操作として扱う。実行環境が要求する権限確認を除き、Skill独自の承認Gateを設けない。GitHub Issue更新、push、PR、削除を伴う操作では、それぞれ既存の承認規則に従う。

## Commit・PR承認Gate

- `finish`、Task固有の検証、独立完了監査、必要な修正・再検証、独立再確認を行い、変更Path、差分概要、検証結果、監査結果、予定するCommitメッセージとPR概要をユーザーへ提示する。
- ユーザーが対象操作を明示承認するまで、`git add`、`git commit`、`git push`、PR作成を実行しない。
- Commitの承認後、`git add`または`git commit`を実行する前に`.agents/skills/commit/SKILL.md`を全文読み、Commit Skillの規則と手順に従う。
- PR作成の承認後、PRを作成する前に`.agents/skills/pr/SKILL.md`を全文読み、PR Skillの規則と手順に従う。
- Commit SkillとPR Skillの利用は本節の明示承認Gateを代替しない。
- 「続けて」「対応して」「完了まで進めて」などの一般的な作業継続指示を、Commit・push・PR作成の承認とみなさない。
- Commitだけの承認をpushやPR作成の承認へ拡張しない。複数操作をまとめて実行する場合は、承認対象にCommit・push・PR作成が明記されていることを確認する。
- 承認前は成果物と検証結果をworktreeへ保持し、Commit・PR待ちであることを報告する。

## 独立完了監査

- 相互に独立した2名の読み取り専用サブエージェントへ、次の2系統を分けて監査させる。
  - 原典Issue、親Issue、現Task Issue、固定Planning snapshot、実差分、検証結果を照合し、原典との矛盾と現Issueの全終了条件を1項目ずつ確認する。
  - Task Map、依存Issue、兄弟・後続Issueを照合し、責務境界、受渡しAnchor、依存DAG、Gate、将来Taskの先取りや欠落を確認する。
- 各監査役は編集せず、各項目を「確認済み」または「指摘あり」と根拠Evidence付きで報告する。主担当の結論を前提として与えず、自己レビューで代替しない。
- 契約差異、終了条件のEvidence不足、Owner Path違反、未解決TBD、依存・Gate不成立、兄弟・後続Issueとの重複や受渡し欠落は、影響と対応案を監査結果へ記録する。
- 指摘を反映した場合はTask固有の検証を再実行する。初回監査の2名とは別の読み取り専用サブエージェントが全項目を再確認し、解消済み・未解決を根拠とともに記録する。
- 必要なサブエージェントを利用できない場合は、実施できた確認範囲と制約をユーザーへ報告する。

## ユーザーへの質問項目

ユーザーへ質問する前、または「質問項目はあるか」と尋ねられた場合は、未解決事項を次の2種類へ分類する。

- 内容上の質問項目: 要件、シナリオ、仕様、受入条件、成果物の意味など、ユーザーの回答によってTask成果物の内容が変わる未決定事項。
- 運用上の差異・承認事項: Owner Path、依存Evidence、Gate記録、Issue Marker、worktree管理、`finish`、Issue同期、Commit、push、PRなど、成果物内容を選択しない管理事項。

「内容についての質問項目」には前者だけを回答する。後者を内容上の質問として列挙せず、必要な場合は「運用上の差異・承認事項」として別に報告する。内容上の質問項目がなければ「内容上の質問項目はなし」と明示する。

監査指摘や契約差異を自動的にユーザーへの質問へ変換しない。原典、Planning snapshot、依存成果物から一意に解消できる指摘は依頼範囲内で修正し、別Ownerの事項は影響と対応案を報告する。原典から決められず、選択によって成果物内容が変わる場合だけ、内容上の質問としてユーザー判断を求める。

Commit、push、PR作成の確認は「承認事項」と呼び、「内容上の質問項目」と混同しない。

## コマンド

Skillディレクトリを `<skill>` として、すべてPrimary checkoutから実行する。

```shell
rtk bash <skill>/scripts/manage_worktree.sh plan <issue-number>
rtk bash <skill>/scripts/manage_worktree.sh start <issue-number>
rtk bash <skill>/scripts/manage_worktree.sh status [issue-number]
rtk bash <skill>/scripts/manage_worktree.sh open <issue-number>
rtk bash <skill>/scripts/manage_worktree.sh finish <issue-number>
rtk bash <skill>/scripts/manage_worktree.sh remove <issue-number> --merged-into <ref> --confirm
```

通常の基準refは `origin/main` とする。Gate後のTaskはGate通過Commitを明示する。

```shell
rtk bash <skill>/scripts/manage_worktree.sh plan 46 --base <gate-ref> --gate-commit <sha>
rtk bash <skill>/scripts/manage_worktree.sh start 46 --base <gate-ref> --gate-commit <sha>
```

`plan`はworktreeを作成しない。`start --no-open`はVS Codeを開かず、worktreeと引継ぎファイルだけを作成する。

## 配置規則

Issue #28、Task ID `L1-M1-S1`の例:

```text
worktree: <repo>/.worktrees/issue-28-l1-m1-s1
branch:   task/issue-28-l1-m1-s1
handoff: <worktree>/.codex/task-session.local.md
```

`/.worktrees/`と`/.codex/task-session.local.md`はGit管理対象外にする。worktree内から別worktreeを作成しない。

## Codexへの引継ぎ

`start`はVS Codeを新規ウィンドウで開き、ローカル引継ぎファイルを表示する。Codex UIの開始はユーザーが手動で行う。新しいCodexは次を守る。

- 引継ぎファイル、Task Issue、固定Planning snapshotを最初に読む。
- Issueの単一Owner Pathだけを変更する。
- 意味判断、依存関係、Gate条件を作業セッション内で追加しない。
- 契約差異や未解決TBDを見つけた場合は、影響と対応案を記録して元セッションへ報告する。
- 親Taskではなくleaf Issueだけを実行単位にする。

## 安全境界

- dirtyなworktreeを削除しない。
- `--merged-into`へHEADが含まれないworktreeを削除しない。
- `--force`、`git reset --hard`、未確認のbranch削除を使わない。
- 依存Issueが未完了、統合Commitが未記録、または基準refに含まれない場合は開始しない。
- Gate依存がある場合、`--gate-commit`なしでは開始しない。
- 並行Taskの書込みPathが重なる場合は開始せず、単一Ownerへ直列化する。
- 自動Merge、自動push、自動Issue closeは行わない。
