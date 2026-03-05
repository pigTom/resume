# Resume Builder

一个本地运行的个人简历生成网站。左侧实时预览 A4 简历，右侧编辑器修改所有内容，支持多配色主题，一键打印/导出 PDF。

所有数据保存在浏览器 localStorage，**无需后端**，完全离线可用。

## 功能特性

- **实时预览** — 左侧 A4 比例简历随编辑实时更新
- **所见即所得** — 右侧编辑器覆盖所有简历字段（基本信息、简介、技能、经历、项目、教育）
- **多主题切换** — 内置 5 套配色主题（Ocean Twilight / Lavender Fields / Forest Dew / Coral Reef / Aurora Borealis）
- **头像上传与裁剪** — 支持上传照片并交互式裁剪为圆形头像
- **拖拽排序** — 工作要点、项目亮点等 bullet 支持拖拽调整顺序
- **一键导出 PDF** — 基于浏览器原生打印，无第三方依赖，排版精准
- **自动保存** — 编辑内容 1 秒防抖自动写入 localStorage，刷新不丢失

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

浏览器访问 http://localhost:5173

## 技术栈

| 层 | 技术 |
|---|---|
| 前端框架 | React 18 + Vite 5 |
| 样式 | Tailwind CSS v3 |
| 图标 | lucide-react |
| 状态持久化 | localStorage |
| PDF 导出 | `window.print()` + `@media print` CSS |

## 项目结构

```
src/
├── App.jsx          # 顶层布局与全局 state 管理
├── Resume.jsx       # A4 简历渲染组件（纯展示）
├── Editor.jsx       # 右侧编辑器面板
├── AvatarEditor.jsx # 头像裁剪组件
├── resumeData.js    # 主题配色 & 默认数据 & localStorage 读写
├── main.jsx         # 入口文件
└── index.css        # Tailwind 入口 + @media print 规则
```

## 架构

```
App.jsx (useState)
  ├── Resume.jsx   ← 只读，实时渲染预览
  └── Editor.jsx   ← onChange 回调，修改触发重新渲染
```

单向数据流，App 持有全部 state，Resume 纯展示，Editor 通过回调修改数据。

## 构建

```bash
npm run build    # 产物输出到 dist/
npm run preview  # 本地预览构建产物
```

## License

MIT
