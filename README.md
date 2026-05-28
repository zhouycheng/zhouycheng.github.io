# 周耀程的日志

独立日志博客，使用 Astro 构建，部署到 GitHub Pages。

这个仓库只负责个人日志、技术文章、项目复盘和阶段性思考，不和 JustinView 个人网站混在一起。后续 JustinView 可以通过外链跳转到这里。

## 本地开发

```bash
npm install
npm run dev
```

默认本地地址：

```text
http://localhost:4321
```

## 写文章

文章和日志都放在：

```text
src/content/blog/
```

文件名必须使用 `YYYYMMDD-title.md` 格式，例如：

```text
src/content/blog/20260524-my-first-post.md
```

也可以用脚本生成：

```bash
npm run new
```

脚本会要求输入标题、摘要、日期和类型。摘要会写入页面元信息，供搜索引擎和分享卡片读取。

文章模板：

```md
---
title: 标题
description: 简短摘要
pubDate: 2026-05-24
kind: article
draft: false
---

正文内容。
```

日志模板：

```md
---
title: 标题
description: 简短摘要
pubDate: 2026-05-24
kind: log
draft: false
---

日志内容。
```

## 构建

```bash
npm run build
```

构建产物会输出到：

```text
dist/
```

构建时会生成 `sitemap-index.xml`，`public/robots.txt` 会被复制到 `dist/robots.txt`。发布后可以在 Google Search Console 里提交：

```text
https://zhouycheng.github.io/sitemap-index.xml
```

## 部署

推送到 `main` 分支后，GitHub Actions 会自动构建并部署到 GitHub Pages。

首次使用时，需要在 GitHub 仓库里设置：

```text
Settings -> Pages -> Build and deployment -> Source -> GitHub Actions
```

发布地址：

```text
https://zhouycheng.github.io
```
