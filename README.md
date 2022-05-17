# VSCode設定メモ

exeのあるフォルダに`data`フォルダがあるとポータブル運用となる。
そうでない場合は`%APPDATA%\Code`に設定が保存される。


## コマンドラインオプション

*	`code --diff` : Diff表示
*	`code --list-extensions` : インストールされている拡張の一覧を表示


## [Keyboard Shortcut](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf)

| keymap	| description
| ------	| -----------
| `Ctrl + K Ctrl + S`	| ショートカットキー 一覧
| `Ctrl + /`	| コメントトグル
| `Ctrl + P`	| ワークスペース内のファイルをインクリメンタル検索して開く
| `Alt + ←`	| 編集箇所 戻る
| `Alt + →`	| 編集箇所 進む
| `Ctrl + Shift + O`	| ファイル内のシンボル（定数、構造体、関数など）をインクリメンタル検索
| `Ctrl + Shift + \`	| 対括弧検索
| `F12`	| 宣言箇所へジャンプ
| `Ctrl + F12`	| 実装箇所へジャンプ
| `Shift + F12`	| 参照箇所の検索
| `Alt + F12`	| 定義箇所の検索
| `Ctrl + B`	| サイドバーの表示／非表示の切り替え
| `Ctrl + Shift + E`	| サイドバーに［エクスプローラー］ビューを表示
| `Ctrl + Shift + F`	| サイドバーに［検索］ビューを表示


## [設定](https://code.visualstudio.com/docs/getstarted/settings)

### 設定の保存

*	デフォルト(`[%APPDATA%|data]\User\settings.json`)
*	各フォルダー単位(ワークスペース)の設定ファイル(`.vscode\settings.json`)

*	ワークスペース設定の保存ファイル(`*.code-workspace`)


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


## 拡張

*	Japanese Language Pack @microsoft
*	C/C++ @microsoft
*	Better C++ Syntax @Jeff-Hykin

*	Ayu @teabyii
*	highlight @debugpig

*	Markdown Checkbox @Philipp Kief
*	TOML Language Support @be5invis

*	Clairvoyant
*	Rainbow CSV
*	Log File Highlighter


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
