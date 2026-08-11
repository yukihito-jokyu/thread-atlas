# Task Session Handoff

このファイルはローカルセッション用であり、Gitへコミットしない。

## Task

- Issue: [#{{ISSUE_NUMBER}}]({{ISSUE_URL}})
- Task ID: `{{TASK_ID}}`
- Task名: {{ISSUE_TITLE}}
- Branch: `{{BRANCH}}`
- Worktree: `{{WORKTREE_PATH}}`
- Base ref: `{{BASE_REF}}`
- Worktree起点SHA: `{{BASE_SHA}}`
- Gate通過Commit: `{{GATE_COMMIT}}`
- Planning snapshot: `{{PLANNING_SNAPSHOT}}`
- 書込み可能なPath／Glob: {{OWNER_PATHS}}

## 開始手順

1. このファイルを読む。
2. GitHub Issue本文と固定Planning snapshotを読む。
3. 現在branch、HEAD、依存Evidence、Gate Evidenceを確認する。
4. 書込み可能なPath／Glob以外を変更しない。
5. Task固有の完了条件と検証方法を確認してから作業を始める。

## Codex開始プロンプト

```text
$manage-task-worktrees を使って .codex/task-session.local.md とTask Issueを読み、
記載されたleaf Taskだけを実行してください。
依存関係、Gate、成果物Ownerに差異があれば影響と対応案を報告し、依頼範囲内で実施可能な作業を続けてください。
```

## 終了時

- Task固有テストまたはReviewを実行する。
- 変更PathがOwner境界内であることを確認する。
- Commit承認を求める前に、作業主担当とは別の相互に独立した2名の読み取り専用サブエージェントへ独立完了監査を依頼する。
- 原典Issue、現Issueの全終了条件、親・兄弟・後続Issueの境界・受渡し・依存、未解決TBDを、実差分と検証結果に照らして「確認済み」または「指摘あり」と根拠付きで記録させる。
- 主担当が監査指摘を整理し、必要な修正と再検証を行う。初回監査の2名とは別の読み取り専用サブエージェントで全項目を再確認し、解消済み・未解決を記録する。必要なサブエージェントを利用できない場合は、実施できた確認範囲と制約を報告する。
- 変更内容、検証結果、予定するCommitメッセージとPR概要を提示し、`git add`、Commit、push、PR作成についてユーザーの明示承認を得る。
- 承認された操作だけを実行し、Commit、PR、検証結果、統合CommitをIssueのhuman-progress領域へ記録する。
- Merge前にworktreeを削除しない。
