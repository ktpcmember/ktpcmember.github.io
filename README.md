# KTPC
駒場東邦物理部のホームページです。

## Website
[ktpc.tokyo](https://www.ktpc.tokyo/)

## 注意事項
このプロジェクトでは[TailwindCSS](https://tailwindcss.com)という楽にcssを書ける便利なフレームワークを使用しています。積極的に使用しましょう。

## ~物理部員でもわかる~手順
1.自分のPCにフォルダーを作成する。(作業フォルダーになります)  
2.```cd "フォルダーのパス"``` をコマンドプロンプトで実行する  
3.```git clone https://github.com/ktpcmember/ktpcmember.github.io ```を実行する。(これでプロジェクトが自分のPCにクローンされ、開発を行うことができるようになります)  
4.```cd ./ktpcmember.github.io```を実行(先ほどクローンしたフォルダーに移動しています)  

Node.jsをインストールしていない方はgoogleでNode.js LTSで検索してダウンロードしましょう。  


5.```npm install```を実行(そのプロジェクトで使用する様々なファイルをインストールします。詳しくはpackage.jsonを見てください。)  
これで一旦環境構築は終了です。

### 開発を始める前に
作業フォルダーで```npx tailwindcss -i ./assets/css/input.css -o ./assets/css/output.css --watch```を実行してください。コードを書いている間は実行したままにしておくのを推奨します。(これをすることでCSSファイルがビルドされます)
