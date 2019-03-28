# MEAN App
M - MongoDB

E - Express

A - AngularJS

N - NodeJS

用 MEAN 架構實作簡單的網頁

# 如何使用

先使用 `npm` 下載相關套件

```bash
npm install
```

再使用 `bower` 下載相關套件

```bash
bower install
```

若安裝時出現版本選擇問題

![image](https://user-images.githubusercontent.com/48819258/54979959-7a51e700-4fdf-11e9-920f-335ffcf8a14e.PNG)

開始執行

```bash
npm start
```

# 發佈到 Heroku

將 .gitignore 中與 js source 相關的套件註解，表示要一起上傳

使用 `heroku` 進行相關設定

登入 Heroku

```bash
heroku login
```

![image](https://user-images.githubusercontent.com/48819258/55135192-e65e5780-5165-11e9-8456-f410035dfd70.PNG)

創建 Heroku 的 repositry

```bash
heroku create
```

![image](https://user-images.githubusercontent.com/48819258/55135220-0261f900-5166-11e9-8090-b036b9f55de4.PNG)

設定開發環境

```bash
heroku config:set NODE_ENV=production
```

![image](https://user-images.githubusercontent.com/48819258/55135257-1efe3100-5166-11e9-84c9-6e9dc725c30e.PNG)

用 `git` 查看 remote 分支

```bash
git remote -v
```

開始部屬

```bash
git push heroku master
```

啟動 web dyno

```bash
heroku ps:scale web=1
```

完成部屬，開啟網頁

```bash
heroku open
```
