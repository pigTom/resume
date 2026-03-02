# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目目标

本地运行的**个人简历生成网站**。左侧实时预览 A4 简历，右侧编辑器修改所有内容，支持多配色主题，一键打印/导出 PDF。所有数据保存在 localStorage，无需后端。

参考素材：`唐敦红_简历_精装版.pdf` 是简历原稿。

## 启动方式

```bash
npm install   # 首次运行需要安装依赖
npm run dev   # 启动本地开发服务器，浏览器访问 http://localhost:5173
```

## 技术栈

| 层 | 技术 |
|---|---|
| 前端框架 | React 18 + Vite |
| 样式 | Tailwind CSS v3 |
| 图标 | lucide-react |
| 状态持久化 | localStorage（无后端） |
| PDF 导出 | 浏览器原生 `window.print()` + `@media print` CSS |

## 核心文件

```
src/
├── App.jsx          # 顶层布局：工具栏 + 预览区 + 编辑区，管理全局 state
├── Resume.jsx       # A4 简历渲染组件（纯展示，接受 data + theme 两个 prop）
├── Editor.jsx       # 编辑器面板，所有 Section 子组件都在这个文件里
├── resumeData.js    # 主题配色定义（THEMES）、默认数据（DEFAULT_DATA）、localStorage 读写
└── index.css        # Tailwind 入口 + @media print 规则
```

## 架构要点

**数据流：单向**
```
App.jsx (useState)
  ├── → Resume.jsx  (只读，实时渲染)
  └── → Editor.jsx  (onChange 回调，修改触发重新渲染)
```

**主题系统**：`THEMES` 对象中每个主题定义一组 CSS 颜色值（非 Tailwind 类），通过 `style={{ background: theme.xxx }}` 传入组件，避免 Tailwind JIT 扫描动态类名的问题。

**自动保存**：App.jsx 中用 `useEffect` + `setTimeout(1000)` 做防抖，每次 data 变化后 1 秒自动写入 localStorage。

**打印**：工具栏和编辑器加 `.no-print` 类，在 `index.css` 的 `@media print` 中 `display: none`。页面底部常驻一个原始尺寸的 `<Resume>` 加 `.print-only` 类，打印时显示。

**A4 缩放预览**：用 CSS `transform: scale()` + `transformOrigin: top left` 缩放简历，外层容器设置 `width/height = 595*scale × 842*scale` 来"消化"transform 不占用文档流的问题。

## 添加新主题

在 `src/resumeData.js` 的 `THEMES` 对象中添加一条：
```js
myTheme: {
  id: 'myTheme',
  name: '主题名称',
  sidebarBg: 'linear-gradient(...)',
  cardBg:    'linear-gradient(...)',
  pageBg:    'linear-gradient(...)',
  accentColor: '#hex',
  accentBg:    '#hex',
  borderColor: '#hex',
  bulletColor: '#hex',
  sidebarAccent: '#hex',
  sidebarText:   'rgba(...)',
  sidebarSub:    'rgba(...)',
}
```
