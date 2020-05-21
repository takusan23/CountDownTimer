# スクーリングカウントダウンタイマー
午前9時に始まるらしいので。それまでカウントダウン

# 実行方法

デフォの`package.json`とは`scripts`がちょっと変わってるので読んでね。

## 初回実行時
初回実行時は`node_modules`が無いので以下の一行を入れてね。
```console
npm install
```

2回目以降は以下の一行だけでいいです。  
本家は`npm run build`の後に`npm start`を入れますが`package.json`を書き換えて`npm start`一行で済むようにしてあります。

```console
npm start
```
