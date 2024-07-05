---
title: "astroのmarkdownの画像をPictureにする"
pubDate: "2024-07-06"
license: "CC BY"
description: "astroのmarkdownの画像をPictureにするrehypeのプラグインを作って，ついでにastro-integrationにする．"
slug: astroのmarkdownの画像をPictureにする
tags: ["astro","rehype","markdown"]
heroImage: astro.avif
---

## markdown内の画像は最適化されていない

astroは割と画像回りの処理は気が利いていて，例えば[Picture](https://docs.astro.build/ja/guides/images/#picture-)タグみたいな感じで画像を最適化してくれる．
しかしながら，マークダウン内の画像については，勝手にwebpに変換されるだけで特に設定なんかもみつからない．

せめてAvifとかformatを指定できないかなと調べていたら，同じことをastroの公式discordで質問している人がいて，それっぽい人が「remarkのプラグインを作ればいいよ」と言っていた．

正直それくらいできるようにしてくれんかと思ったが，せっかく作るなら最適化もしてしまおうということで，rehypeのプラグインを作ってみた．

## rehypeのプラグインを作る

そもそもrehypeってなんだよという人は[この記事](https://qiita.com/sankentou/items/f8eadb5722f3b39bbbf8)がわかりやすい．markdownをhtmlに変換するためのツールで，プラグインを作ると，htmlをいじったり色々と処理を追加できる．

今回作ったプラグインの流れは，

1. imgタグを探す
2. 画像をsharpでエンコードして，astroの出力ディレクトリに保存する
3. imgタグをPictureタグに変換して，srcset等を設定する

という感じ．

1については`unist-util-visit`を使って，rehypeのASTを探索している．ネットの海にいくらでもコードが転がっているので，それを参考にすればいい．すごく便利．

2.3も特に難しいことはない．sharpで画像をエンコードして，Pictureタグに変換するだけ．


## astro-integrationにする

プラグインつくるだけで普通に使えるのだが，astroの出力先のフォルダとかキャッシュフォルダの指定とかastroの設定との兼ね合いがまだとれていない．astro-integrationにするとその辺の情報も取得できるので，そうすることにした．

[公式のリファレンス](https://docs.astro.build/en/reference/integrations-reference/)があるので，それを読むのもいいが，他人のコードを読んで改造するのが早い気がする．こういったライブラリに詳しくないのだが，慣れている人だったらすぐ理解できるのだろうか…

```ts
export default function mdImgToPic(): AstroIntegration {
  return {
    name: "astro-rehype-img2pic",

    hooks: {
      "astro:config:setup": async ({ command, config, updateConfig }) => {
        if (command == "build") {
          const pluginConfig = {
            outDir: fileURLToPath(config.outDir),
            cacheDir: fileURLToPath(config.cacheDir),

        ....

          const rehypePlugin = configureMdImgToPicPlugin(pluginConfig);

          updateConfig({
            markdown: {
              rehypePlugins: [rehypePlugin],
            },
          });
        }
      },
    },
  };
}
```

コードとしてはこんな感じ. `astro:config:setup`が初期化時に呼ばれるフックで，`configureMdImgToPicPlugin`は設定を受け取って，rehypeのプラグインを返す高階関数で，それで出力された関数をupdateConfigでrehyePluginsに追加している．上手なやり方だと思う．Github上にあったコードを**参考**にしました．

## まとめ

思ったより簡単だった．

Githubにコードを上げておくので，興味がある人は使ったり改造したりしてみてほしい．

https://github.com/Nakanishi123/astro-rehype-img2pic

![特に意味のない画像](black_white_ruffed_lemur_5.avif)