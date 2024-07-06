---
title: "bunとvite使ってbuildしようとするとEPERM: Operation not permittedとエラーがでる"
pubDate: "2024-06-14"
license: "CC0"
description: "bunとvite使ってbuildしようとするとEPERM: Operation not permittedとエラーがでる"
slug: bunとvite使ってbuildしようとするとEPERM-Operation-not-permittedとエラーがでる
tags: ["bun","vite"]
---

## エラー

```shell
$ bun run build
$ tsc && vite build && rm -r dist/data/
vite v5.2.13 building for production...
13622 |     else {
13623 |         process.stdout.write(output.substring(0, process.stdout.columns - 1));
13624 |     }
13625 | }
13626 | function clearLine$1() {
13627 |     process.stdout.clearLine(0);
        ^
EPERM: Operation not permitted
   errno: -1
 syscall: "write"
      fd: 15

      at write (native:1:1)
```

## 解決

bunをsnapで入れているのが悪いらしい．snapのbunを消して，[bunの公式](https://bun.sh/)のインストール方法で入れなおしたら動いた．

```shell
sudo snap remove bun-js

curl -fsSL https://bun.sh/install | bash
```


