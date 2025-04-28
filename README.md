[中文](README.md) | [English](README_EN.md)

# 后来 (Later) - 时光记录应用

"后来"是一个优雅的时光记录应用，允许用户创建、编辑和保存带有日期、文本和图片的记录。这个应用使用 React 和 TypeScript 构建，提供了一个现代化、响应式的用户界面。

## 功能特点

- 创建和编辑时光记录，包含标题、内容和日期
- 支持添加多张图片到每条记录
- 美观的卡片式布局展示所有记录
- 详细视图查看完整记录内容和图片
- 响应式设计，适配各种屏幕尺寸
- 本地存储数据，无需后端服务器
- 现代化的用户界面，包含动画和过渡效果

## 技术栈

- **前端框架**: React 19
- **语言**: TypeScript
- **构建工具**: Vite 6
- **样式**: CSS (自定义设计系统)
- **图标**: React Icons
- **存储**: 浏览器 LocalStorage

## 项目结构

```
src/
├── assets/            # 静态资源文件
├── components/        # React 组件
│   ├── Header.tsx     # 应用头部组件
│   ├── TimeLogList.tsx # 记录列表组件
│   ├── TimeLogEntry.tsx # 单条记录卡片组件
│   ├── TimeLogDetail.tsx # 记录详情组件
│   └── TimeLogForm.tsx # 创建/编辑记录表单组件
├── types/             # TypeScript 类型定义
│   └── index.ts       # 定义 TimeLogEntry 接口
├── utils/             # 工具函数
│   ├── helpers.ts     # 辅助函数 (ID生成、日期格式化等)
│   └── storage.ts     # 本地存储操作函数
├── App.tsx            # 主应用组件
├── App.css            # 应用全局样式
├── index.css          # 全局 CSS 变量和基础样式
└── main.tsx           # 应用入口点
```

## 设计系统

应用使用了一套自定义的设计系统，包括：

- **颜色**: 主色调为紫蓝色 (#5b6cf9)，辅以橙色 (#f97316) 作为点缀
- **阴影**: 多层次的阴影效果增强深度感
- **圆角**: 统一的圆角半径提升现代感
- **动画**: 细腻的过渡动画提升用户体验
- **图标**: 使用 React Icons 提供一致的图标风格

## 数据模型

核心数据模型是 `TimeLogEntry`，定义如下：

```typescript
interface TimeLogEntry {
  id: string;         // 唯一标识符
  title: string;      // 记录标题
  content: string;    // 记录内容
  date: string;       // ISO 格式的日期字符串
  images?: string[];  // 可选的 Base64 编码图片数组
}
```

## 本地存储

应用使用浏览器的 LocalStorage 存储所有记录数据。主要的存储操作包括：

- `getAllEntries()`: 获取所有记录
- `saveEntry(entry)`: 保存新记录
- `updateEntry(entry)`: 更新现有记录
- `deleteEntry(id)`: 删除记录
- `getEntryById(id)`: 通过 ID 获取单条记录

## 开始使用

### 安装依赖

```bash
npm install
```

### 开发模式运行

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

## 未来计划

- 添加黑暗模式支持
- 实现记录分类和标签功能
- 添加搜索和过滤功能
- 支持云端同步
- 添加更多自定义主题选项

## 许可证

MIT
