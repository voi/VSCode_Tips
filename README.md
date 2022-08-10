# VSCode設定メモ

exeのあるフォルダに`data`フォルダがあるとポータブル運用となる。
そうでない場合は`%APPDATA%\Code`に設定が保存される。


## コマンドラインオプション

*	`code --diff` : Diff表示
*	`code --list-extensions` : インストールされている拡張の一覧を表示


## [Keyboard Shortcut](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf)

| keymap	| description
| ------	| -----------
| `Ctrl + Shift + P` `F1` | コマンドパレット表示
| `Ctrl + P`	| クイックオープン表示（ワークスペース内のファイルをインクリメンタル検索して開く）
| `Ctrl + R`	| 過去に開いた項目一覧
| `Ctrl + K Ctrl + S`	| ショートカットキー 一覧
| `Alt + Click`	{ マルチカーソルを挿入
| `Ctrl + Alt + ↑ / ↓`	| 上/下にマルチカーソルを挿入
| `Ctrl + U`	| 最後のカーソル操作を元に戻す
| `Shift + Alt + I`	| 選択した各行の終わりにマルチカーソルを挿入
| `Ctrl + Shift + L`	| 現在選択しているものの出現箇所をすべて選択
| `Ctrl + F2`	| 現在の単語の出現箇所をすべて選択
| `Ctrl + D`	| 次に一致するものをマルチカーソルで選択
| `Ctrl + K Ctrl + D`	| 最後に選択したものをとばして次に一致するものをマルチカーソルで選択
| `Shift + Alt + →`	| 選択範囲を拡大
| `Shift + Alt + ←`	| 選択範囲を縮小
| `Shift + Alt + (drag mouse)`	| 矩形選択
| `Ctrl + Shift + Alt + ↓ / ↑`	| 矩形選択
| `Ctrl + Shift + Alt + PgUp / PgDn`	| 矩形選択ページアップ・ダウン
| `Ctrl + /`	| コメントトグル
| `Ctrl + L`	| 行選択
| `Alt + ← / →`	| 編集箇所 戻る / 進む
| `Alt + ↓ / ↑`	| 行を上下に移動
| `Shift + Alt + ↓ / ↑`	| 行を上下にコピー
| `Ctrl + Space`	| コード補完の候補を表示
| `Ctrl + Enter`	| 行を挿入（下）
| `Ctrl + Shift + Enter`	| 行を挿入（上）
| `Ctrl + Shift + K`	| 行削除
| `Ctrl + ] / [`	| インデント / アンインデント
| `Ctrl + Shift + O`	| ファイル内のシンボル（定数、構造体、関数など）をインクリメンタル検索
| `Ctrl + Shift + \`	| 対括弧検索
| `F12`	| 宣言箇所へジャンプ
| `Ctrl + T`	| 選択文字列をシンボルとしてワークスペース内の登場箇所を表示
| `F12`	| 定義に移動
| `Alt + F12`	| 定義をピーク（のぞき見）
| `Ctrl + K F12`	| 定義を横に表示
| `Shift + F12`	| 参照を表示
| `Alt + Z`	| 折り返し表示切替
| `ALT + C / R / W / L`	| 検索オプション切替（大小文字区別 / 正規表現 / 単語単位 / 選択範囲内）
| `Enter / Ctrl + Alt + Enter`	| 置換 / 全て置換
| `Ctrl + B`	| サイドバーの表示／非表示の切り替え
| `Ctrl + Shift + E`	| サイドバーに［エクスプローラー］ビューを表示
| `Ctrl + Shift + F`	| サイドバーに［検索］ビューを表示
| `Ctrl + Shift + H`	| サイドバーに［置換］ビューを表示
| `Ctrl + \`	| エディタを分割する
| `Ctrl + 1 / 2 / 3`	| 1・2・3番目のエディタグループにフォーカス
| `Ctrl + K Ctrl + ←/→`	| 左・右のエディタグループにフォーカス
| `Ctrl + Shift + PgUp / PgDn`	| 左・右にエディタを移動
| `Ctrl + K ← / →`	| アクティブなエディタグループを移動
| `Ctrl + Alt + ← / →`	| エディタを前・次のグループに移動


## [設定](https://code.visualstudio.com/docs/getstarted/settings)

### 設定の保存

*	デフォルト(`[%APPDATA%|data]\User\settings.json`)
*	各フォルダー単位(ワークスペース)の設定ファイル(`.vscode\settings.json`)

*	ワークスペース設定の保存ファイル(`*.code-workspace`)


### [環境変数の利用](https://wonwon-eater.com/vscode-environment-variable/)

`${env:環境変数名}`で環境変数を参照できます。


### [配色の変更](https://atmarkit.itmedia.co.jp/ait/articles/1710/20/news023.html)

textMateのスコープはコマンドパレットでscopeといれるとトークンとスコープを確認できるコマンドがあるので、そのコマンドを実行して確認する。

*	[Sublime Text - Scope Naming](https://www.sublimetext.com/docs/scope_naming.html)
*	[microsoft / vscode-markdown-tm-grammar](https://github.com/microsoft/vscode-markdown-tm-grammar/pull/13)


### [特定の色だけ変更](https://qiita.com/tattcho/items/bf35c93ce90fbbc581c1)

~~~json
"editor.tokenColorCustomizations": {
	"comments": "#FF0000"
}
~~~

*	[VS Codeでマークダウンのシンタックスハイライトの配色を変更する](https://scrapbox.io/rashitamemo/VS_Code%E3%81%A7%E3%83%9E%E3%83%BC%E3%82%AF%E3%83%80%E3%82%A6%E3%83%B3%E3%81%AE%E3%82%B7%E3%83%B3%E3%82%BF%E3%83%83%E3%82%AF%E3%82%B9%E3%83%8F%E3%82%A4%E3%83%A9%E3%82%A4%E3%83%88%E3%81%AE%E9%85%8D%E8%89%B2%E3%82%92%E5%A4%89%E6%9B%B4%E3%81%99%E3%82%8B)
*	[VS CodeでMarkDownのシンタックスカラーを変更する](https://scrapbox.io/rashitamemo/VS_Code%E3%81%A7MarkDown%E3%81%AE%E3%82%B7%E3%83%B3%E3%82%BF%E3%83%83%E3%82%AF%E3%82%B9%E3%82%AB%E3%83%A9%E3%83%BC%E3%82%92%E5%A4%89%E6%9B%B4%E3%81%99%E3%82%8B)


## [スニペット](https://code.visualstudio.com/docs/editor/userdefinedsnippets)

*	`メニューバーのファイル` ➡ `ユーザー設定` ➡ `ユーザースニペット`

	> ファイル名を英大文字に置換
	> `"#ifndef _INC_${TM_FILENAME_BASE/(.*)/${1:/upcase}/}_H_",`
	> 
	> 選択文字列
	> `"${TM_SELECTED_TEXT}",`


## ワークスペース

*	[フィルタ(exclude)](https://code.visualstudio.com/docs/editor/codebasics#_advanced-search-options)

	~~~json
	{
	  "files.exclude": {
	    "**/.git": true,
	    "**/.svn": true,
	    "**/.hg": true,
	    "**/CVS": true,
	    "**/.DS_Store": true
	  }
	}
	~~~

	- フォルダ直下のtxt/mdファイル `"samplefolder/*/*.{txt,md}": true`
	- フォルダ以下全てのtxt/mdファイル`"samplefolder/**/*.{txt,md}": true`
