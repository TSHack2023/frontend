# README

## 環境構築
1. 「docker&docker-compose」 コマンドを利用できるようにする
2. ディレクトリ構造を次のようにする
      ```
      .(dir)
      ├── front
      │   └── Dockerfile
      ├── docker-compose.yml
      └── README.md
      ```
3. 「Windows PowerShell」を開く
4. `cd dir`　でディレクトリに移動する
5. `docker-compose build`　でイメージを作成する
6. `docker-compose up -d`　でコンテナを作成する
7. `docker exec -it node /bin/bash`　でコンテナに入る
8. `npx create-react-app app --template typescript --use-npm`　でReactプロジェクトを作成する
9. `cd app`　でReactプロジェクトのディレクトリに移動する
10. `front/app/package.json` の `devDependencies` の `"typescript": 〇〇` を `"typescript": "^4.9.5"`と書き換える
11. `npm install typescript@4.9.5`　でtypescriptのバージョンを指定する
12. `npx eslint --init --save-dev`　で以下の用に回答し，eslintの設定ファイルを作成する
      ```
      ? How would you like to use ESLint? … - To check syntax, find problems, and enforce code style
      ? What type of modules does your project use? … - JavaScript modules (import/export)
      ? Which framework does your project use? … - React
      ? Does your project use TypeScript? - Yes
      ? Where does your code run? … - Browser
      ? How would you like to define a style for your project? … - Use a popular style guide
      ? Which style guide do you want to follow? … - Standard
      ? What format do you want your config file to be in? … - JavaScript
      ? Would you like to install them now? - Yes
      ? Which package manager do you want to use? … - npm
      ```
13. `npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier pretty-quick`　でprettierをインストールする
14. 「.eslintrc-tmp.js」を「.eslintrc.js」に上書きする
15. 「src/App.tsx」を次の内容で上書きする
      ```
      import React from "react";

      const App = (): JSX.Element => {
      return (
      <div>
            <p></p>
      </div>
      );
      };

      export default App;
      ```
16. 「src/reportWebVitals.ts」を次の内容で上書きする
      ```
      import { type ReportHandler } from "web-vitals";

      const reportWebVitals = (onPerfEntry?: ReportHandler): void => {
            if (onPerfEntry != null && onPerfEntry instanceof Function) {
                  void import("web-vitals").then(
                        ({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
                        getCLS(onPerfEntry);
                        getFID(onPerfEntry);
                        getFCP(onPerfEntry);
                        getLCP(onPerfEntry);
                        getTTFB(onPerfEntry);
                        },
                  );
            }
      };

      export default reportWebVitals;
      ```
17. 「src/app/react-app-env.d.ts」を次の内容で上書きする
      ```
      import "react-scripts/lib/react-app.d.ts";
      ```
18. `npx eslint --fix src/**/*.ts*`　でフォーマットをおこなう
19. `npm start`　でReact開発用サーバを起動する
20. `http://localhost:3000/`　で開発したサイトを確認できる

## サーバの立ち上げ方
1. `cd (dir)`
2. `docker-compose start front`
3. `docker exec -it node /bin/bash`
4. `cd app`
5. `npm start`

## サーバの止め方
1. `Ctrl+C`

## フォーマットのやり方
1. （サーバ起動時）「Windows PowerShell」を別タブで開く
2. `npx eslint --fix src/**/*.ts*`

## Bootstrapの導入
1. `docker exec -it node /bin/bash`
2. `cd app`
3. `npm install react-bootstrap bootstrap@4.6.0`
4. 「src/index.js」に　`import "bootstrap/dist/css/bootstrap.min.css";`　を追加
5. 必要なコンポーネントをインポート（例：`import Button from "react-bootstrap/Button";`）

## react-router-domの導入
1. `docker exec -it node /bin/bash`
2. `cd app`
2. `npm install react-router-dom@5 @types/react-router-dom`

## axiosの導入
1. `docker exec -it node /bin/bash`
2. `cd app`
2. `npm install axios`