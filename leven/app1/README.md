# Grid Demo - 表格视图演示

这是一个基于 React 的表格组件演示应用，展示了类似 Teable 的网格视图功能。

## 功能特性

- ✅ **单元格选择和编辑** - 支持单个和多个单元格选择
- ✅ **列标题交互** - 点击和双击列标题进行交互
- ✅ **滚动和虚拟化** - 高效的滚动性能和虚拟化渲染
- ✅ **多种数据类型支持** - 文本、数字、布尔值、选择、按钮等
- ✅ **键盘快捷键** - 支持复制、粘贴、删除、撤销、重做等
- ✅ **右键菜单** - 上下文菜单支持
- ✅ **响应式设计** - 适配不同屏幕尺寸

## 技术栈

- **React 18** - 前端框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Tailwind CSS** - 样式框架
- **Lodash** - 工具库

## 项目结构

```
src/
├── components/          # 组件目录
│   ├── Grid.tsx        # 核心网格组件
│   └── GridView.tsx    # 网格视图组件
├── data/               # 数据目录
│   └── mockData.ts     # 模拟数据
├── types/              # 类型定义
│   ├── grid.ts         # 网格相关类型
│   └── mock.ts         # 模拟数据类型
├── App.tsx             # 主应用组件
├── main.tsx            # 应用入口
└── index.css           # 全局样式
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

应用将在 http://localhost:3001 启动

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 使用说明

### 基本操作

1. **选择单元格** - 点击任意单元格进行选择
2. **多选** - 按住 Ctrl/Cmd 键进行多选
3. **列选择** - 点击列标题选择整列
4. **行选择** - 点击行号选择整行
5. **编辑单元格** - 双击单元格进入编辑模式

### 键盘快捷键

- `Ctrl/Cmd + C` - 复制选中内容
- `Ctrl/Cmd + V` - 粘贴内容
- `Delete` - 删除选中内容
- `Ctrl/Cmd + Z` - 撤销操作
- `Ctrl/Cmd + Y` 或 `Ctrl/Cmd + Shift + Z` - 重做操作

### 数据类型

- **文本** - 普通文本内容
- **数字** - 数值类型
- **布尔值** - 是/否状态
- **选择** - 多选选项
- **按钮** - 可点击的操作按钮

## 自定义配置

### 主题配置

可以通过修改 `Grid` 组件的 `theme` 属性来自定义主题：

```tsx
<Grid
  theme={{
    backgroundColor: '#ffffff',
    borderColor: '#e5e7eb',
    headerBackgroundColor: '#f9fafb',
    // ... 其他主题配置
  }}
/>
```

### 列配置

可以通过修改 `mockData.ts` 中的字段配置来自定义列：

```typescript
const mockFields: MockField[] = [
  {
    id: 'field_1',
    name: '姓名',
    type: 'text',
    description: '用户姓名',
    isPrimary: true,
  },
  // ... 其他字段
];
```

## 开发说明

### 组件架构

- **Grid** - 核心网格组件，负责渲染和交互
- **GridView** - 网格视图组件，负责数据管理和业务逻辑
- **类型系统** - 完整的 TypeScript 类型定义

### 扩展功能

要添加新功能，可以：

1. 在 `types/grid.ts` 中添加新的类型定义
2. 在 `Grid.tsx` 中实现新的交互逻辑
3. 在 `GridView.tsx` 中添加新的业务逻辑
4. 在 `mockData.ts` 中添加新的测试数据

## 许可证

MIT License
