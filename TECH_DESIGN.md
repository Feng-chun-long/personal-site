# TECH_DESIGN — 个人主页网站

## 一、技术选型

| 类别 | 选择 | 理由 |
|---|---|---|
| 语言 | 原生 HTML5 + CSS3 + 原生 JS (ES Modules) | 单页展示型站点，不需要框架；原生代码零构建、零依赖、部署后直接跑 |
| 构建工具 | 无 | 纯静态文件，Cloudflare Pages / Vercel / GitHub Pages 都能直接部署 |
| 图标 | Emoji 字符 | 不引入外部图标库，避免网络请求，同时风格统一 |
| 字体 | 系统默认 sans-serif（pingfang / segoe ui / system-ui） | 跨平台一致，不请求外部字体 |

## 二、目录结构

```
personal-site/
├── PRD.md              # 产品需求
├── TECH_DESIGN.md      # 本文档
├── AGENTS.md           # AI 开发规范
└── docs/               # 部署根目录（Cloudflare Pages / GitHub Pages 都指向这个目录）
    ├── index.html      # 主页面
    ├── assets/
    │   ├── style.css   # 样式
    │   └── main.js     # 交互
    └── favicon.svg     # 可选，浏览器标签页小图标
```

## 三、关键技术点

### 1. 平滑滚动（导航跳转）
锚点链接默认跳转有跳跃感，用原生 JS 监听导航点击，调用 `scrollIntoView({ behavior: 'smooth' })`。

### 2. 导航栏滚动变化
监听 `window.scroll`，当滚动距离超过首屏高度时，给 nav 加一个 `.scrolled` 类，改变背景色透明度和阴影。

### 3. 卡片 hover 动效
只在鼠标悬停时给一个轻微上移 (`translateY(-3px)`) 和边框色变化，用 `transition` 做 0.2s 过渡，避免花哨。

### 4. 响应式
用 CSS `@media (max-width: 768px)` 断点，把桌面端横向排列的卡片改成纵向堆叠。导航栏在手机上也简化为单行。

### 5. 数据硬编码
技能和项目列表直接写在 HTML 里，MVP 阶段不做 JSON 动态加载。后续迭代时可改成 fetch 一个 data.json。

## 四、部署

- **平台**：Cloudflare Pages（国内速度好）或 Vercel（同样稳定），也用 GitHub Pages
- **构建命令**：无
- **输出目录**：`docs/`

## 五、颜色变量（CSS Custom Properties）

```css
:root {
  --bg: #F5F1E8;
  --bg-card: rgba(255, 255, 255, 0.55);
  --text: #2D4A3E;
  --text-soft: #6B7F75;
  --accent: #C89B3C;
  --border: rgba(45, 74, 62, 0.12);
}
```
