---
title: "変数にするとtailwindが効かない"
pubDate: "2023-11-18"
license: "CC0"
slug: 変数にするとtailwindが効かない
tags: ["tailwind"]
---

```html
<div class="text-{{ error ? 'red' : 'green' }}-600"></div>
```

こんな感じでclass名を一部変数にした場合, [公式](https://tailwindcss.com/docs/content-configuration#dynamic-class-names)
にも書かれている通りCSSが効かない場合がある.

こんな時はtailwind.config.mjsにsafelistを追加すると良い.

```diff
//tailwind.config.mjs

export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
++  safelist: [{ pattern: /^(bg|text)-.+-(\d+)$/, variants: ["hover"] }],
```
