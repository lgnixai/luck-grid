# 单元格编辑器位置修复 - 执行摘要

## 问题重现

**现象：** 有 toolbar 时，双击单元格进入编辑，编辑器位置出现偏移

**复现步骤：**
1. 页面包含 toolbar（工具栏）
2. 双击任意单元格进入编辑
3. 编辑器位置与单元格不对齐

**预期：** 编辑器应该精确覆盖在单元格上方

## 根本原因

**时序问题**：在 React 状态更新完成前就开始计算编辑器位置，导致 DOM 未稳定时进行布局计算。

## 修复方案

**核心思路**：使用 `requestAnimationFrame` 延迟 `setEditing(true)` 调用，确保 DOM 完全稳定后再显示编辑器。

## 修改清单

### 共修改 3 个文件，5 个位置

1. **InteractionLayer.tsx** - 2 处
   - 双击进入编辑（第 520-523 行）
   - 单击特定区域进入编辑（第 479-482 行）

2. **useKeyboardSelection.ts** - 2 处
   - F2 键进入编辑（第 177-180 行）
   - Enter 键进入编辑（第 215-218 行）

3. **EditorContainer.tsx** - 1 处
   - 输入字符进入编辑（第 285-287 行）

### 修改模式统一

所有修改都遵循相同模式：

**修改前：**
```typescript
setEditing(true);
```

**修改后：**
```typescript
requestAnimationFrame(() => {
  setEditing(true);
});
```

## 验证方法

### 自动化验证

点击 SimpleDemo 页面的"自动验证编辑器位置"按钮：

- ✅ 通过：误差 ≤ 2px
- ❌ 未通过：显示具体偏差值

### 手动验证

1. **有 toolbar 场景**：双击单元格，编辑器应精确对齐
2. **无 toolbar 场景**：双击单元格，编辑器应精确对齐
3. **滚动后**：编辑器位置跟随正确
4. **不同输入方式**：双击、F2、Enter、输入字符，都应正确

## 技术细节

### 定位公式（未修改，已验证正确）

```typescript
// 横向
left = clamp(
  getColumnRelativeOffset(columnIndex, scrollLeft),
  columnInitSize,
  containerWidth - width
)

// 纵向
top = clamp(
  getRowOffset(rowIndex) - scrollTop,
  rowInitSize,
  containerHeight - height
)
```

### 关键参数

- `rowInitSize` = `columnHeaderHeight`（表头高度，通常 40px）
- `columnInitSize` = 行号列宽度（通常 48px）
- `scrollTop` / `scrollLeft` = 当前滚动位置

## 风险评估

### 低风险 ✅

1. **改动范围小**：仅修改 5 个位置的时序控制
2. **向后兼容**：不改变任何 API 或接口
3. **性能影响微小**：仅延迟 ~16ms（一帧）
4. **不影响功能**：所有编辑功能保持不变

### 测试建议

- 快速连续双击
- 不同编辑器类型（文本、选择、评分等）
- 移动端触摸事件
- 大数据集滚动性能

## 结论

通过在所有进入编辑状态的路径上统一使用 `requestAnimationFrame`，确保编辑器在 DOM 完全稳定后才进行位置计算，从而彻底解决了位置错位问题。

修复方案：
- ✅ 改动最小
- ✅ 逻辑清晰
- ✅ 易于验证
- ✅ 风险可控
- ✅ 可维护性高
