# tojimarist

## できること

1. 戸締まりチェックリストをブラウザ上で月単位で作成し、最終的には印刷して使います。
2. 戸締まりするチェック項目（玄関、キッチン、火元等）、を自由に追加・削除・ソートができます。
3. 設定したチェック項目は localStorage に保存します。
4. 何ヶ月分でもつくれます。運用としては3ヶ月毎に必要項目を点検しつつ印刷するイメージです。

# example

実際に動くものをここに置きました。
https://snakada.github.io/tojimarist/

## 主に使ったもの

* [Vue.js](https://jp.vuejs.org/index.html)
* [Vue CLI](https://cli.vuejs.org/)
* [Vuex](https://vuex.vuejs.org/ja/guide/)
* [vue-slicksort](https://www.npmjs.com/package/vue-slicksort)
* [vue-toasted](https://www.npmjs.com/package/vue-toasted)
* [dayjs](https://github.com/iamkun/dayjs)
* [japanese-holidays](https://www.npmjs.com/package/japanese-holidays)
* [Font Awesome](https://fontawesome.com/)
* [Bulma](https://bulma.io/)

## 作った経緯（はしりがき）

毎日の安全のために、アナログな戸締まりチェックリストを mac/Numbers で
作成→印刷して使っていたのですけど、エクセルにあるような
「別のセルを条件に条件付き書式を設定する」が仕様上不可なため
土日の行に色をつけられないという問題に直面しました。

それで運用していると土日は空行にするべきところ、頭ぼんやりな月曜には気づかず
ついうっかり土日のところにペンで書き込んでしまうと
あとで週末くらいになって辻褄が合わなくなってうわぁぁぁぁってなったんです。

それを解決するために Windows/Excel を起動するのも負けた気がするので
Vue で作っちゃおうというのがこのプロジェクトのはじまりです。

せっかくなのでついでに祝日を自動取得して黒塗りしてやるようにしました。
公休日を Google カレンダーとかで調べて、シートに反映するって作業が地味に面倒だったんですよね。
これがあれば毎日のチェック作業しながら、もうちょいで休みだーなんて、ちょっとモチベーションあがるかもしれません。

いろいろとまとめたうえで [Qiita/snakada](https://qiita.com/snakada) に投下するつもりなのですが
意外といろいろ実装してしまったので、もう少しシンプルにしてからやろうと思います。

あとで忘れても困るので、このリポジトリはもはやメモ的に一旦作りました。

## 構成（ざっくり）

```
├── App.vue               // アプリ
├── assets
├── components
│   ├── AddCheckItem.vue  // チェック項目追加フォーム
│   ├── AppHeader.vue     // アプリヘッダ（別になくてもいい）
│   ├── MainSection.vue   // メインセクション（印刷用紙の背景・コンテナ）
│   ├── PrintSheet.vue    // 印刷用紙（成果物、ここに設定がほとんど反映される）
│   ├── SidePanel.vue     // 設定パネル（チェック項目ソート等、いろいろ操作する）
│   └── YearMonths.vue    // 年月操作
├── main.js               // エントリ
└── store.js              // ステート管理
```

## 今後

ちょうどタイプスクリプトの勉強もしたかったので、戸締まりチェックリスト
tojimarist(仮) v0.2.0 とかやりたいです。もう少し余力あれば Qiita に投下したいです。

以下は Vue CLI あたりが用意してくれてたやつそのままです。
他に何をやるべきかの指標にもなって便利ですので、そのまま置いておきます。

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```
