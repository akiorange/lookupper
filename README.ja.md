# Lookupper
Lookupperは単語を辞書で素早く引くためのChromeの拡張機能です。今は、 [Oxford Learner's Dictionaries](https://www.oxfordlearnersdictionaries.com/)だけをサポートしています。

*Read this in other languages: [English](README.md), [日本語](README.ja.md).*

<img src="demo/lookupper_demo.gif" alt="Lookupper gif">
<br/>

## 特徴
- 単語を調べるには:
    - 単語をダブルクリックする。
    - 単語をハイライトする、 右クリックする、'Look up ~'を選択する。
- 発音も自動で再生されます。
- ポップアップしたウィンドウは次に単語を調べる時に使われるので、好きなように大きさを変えたり、位置を変えたりすることができます。

<br/>

## インストール
この拡張機能はChromeウェブストアには載っていませんが、 デベロッパーモードを使用してインストールすることができます。インストールするには:

1. このリポジトリをクローンする。
2. `chrome://extensions`にアクセスして、拡張機能の管理ページを開く。
    - 拡張機能の管理ページは以下の手順でもアクセスできます。Chromeメニューをクリックし、**その他のツール**を選び、**拡張機能**を選択する。
3. **デベロッパーモード**のトグルボタンをクリックして有効にする。
4. **パッケージ化されていない拡張機能を読み込む**をクリックする。フォルダを選択する画面が立ちあがるので、ステップ１でクローンしたリポジトリを選択する。

###### (_こちらから修正して転載されました: https://developer.chrome.com/extensions/getstarted#manifest_)

<br/>

## 謝辞
- [chromeExtensionAsync](https://github.com/KeithHenry/chromeExtensionAsync): [Chrome拡張機能のAPI](https://developer.chrome.com/extensions)がJavascriptのPromiseを使えるようにするためにライブラリです。 Chrome拡張機能のAPIは、デフォルトでPromiseではなくコールバック関数を使います。コールバック地獄を防ぎ、コードの保守性を保つために、`chromeExtensionAsync`がこの拡張機能のコードの中で使われています。

- [Feather](https://github.com/feathericons/feather): シンプルできれいなアイコンのコレクションです。この拡張機能のアイコンはFeatherのコレクションの１つです。
