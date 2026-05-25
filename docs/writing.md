# 写作与发布说明

这个仓库的文章和日志都放在：

```text
src/content/blog/
```

新建内容时，建议用日期加英文短标题命名：

```text
src/content/blog/2026-05-26-my-first-post.md
```

文件名会变成文章地址。例如上面的文件发布后地址是：

```text
/blog/2026-05-26-my-first-post/
```

## Frontmatter

每篇 Markdown 开头都需要写 frontmatter：

```md
---
title: 标题
description: 简短摘要
pubDate: 2026-05-26
kind: article
tags:
  - 日志
draft: false
---
```

常用字段：

- `title`：文章标题。
- `description`：首页、归档页里显示的简短摘要。
- `pubDate`：发布日期。
- `kind`：写 `article` 会出现在首页和归档页；写 `log` 会出现在日志页。
- `tags`：标签，可以留空数组 `[]`。
- `draft`：写 `true` 时表示草稿，不会出现在列表里。

## 写文章

如果以后要写开篇记录，可以直接新建一篇 Markdown，例如：

```text
src/content/blog/2026-05-26-opening-note.md
```

正文写在 frontmatter 后面，正常使用 Markdown 即可：

```md
今天开始把一些项目、学习和阶段性想法留在这里。

[查看日志页](/logs/)
```

## 页面连接

站内链接直接使用相对路径：

```md
[日志页](/logs/)
[归档页](/archive/)
[某篇文章](/blog/2026-05-26-my-first-post/)
```

如果要从个人网站或其他地方连接到这个博客，链接到发布地址即可：

```text
https://zhouycheng.github.io
```

单篇文章的完整地址是：

```text
https://zhouycheng.github.io/blog/文件名/
```

## 本地预览

写完后可以本地预览：

```bash
npm run dev
```

构建检查：

```bash
npm run build
```
