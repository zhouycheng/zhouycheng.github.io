# 周耀程的日志

独立日志博客，使用 Astro 构建，部署到 GitHub Pages。

这个仓库只负责个人日志、技术手记、项目复盘和短想法，不和 JustinView 个人网站混在一起。后续 JustinView 可以通过外链跳转到这里。

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

正式文章放在：

```text
src/content/blog/
```

短记放在：

```text
src/content/blog/notes/
```

文章模板：

```md
---
title: 标题
description: 简短摘要
pubDate: 2026-05-24
kind: post
tags:
  - 日志
---

正文内容。
```

短记模板：

```md
---
title: 标题
description: 简短摘要
pubDate: 2026-05-24
kind: note
tags:
  - Notes
---

短记内容。
```

## 构建

```bash
npm run build
```

构建产物会输出到：

```text
dist/
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
