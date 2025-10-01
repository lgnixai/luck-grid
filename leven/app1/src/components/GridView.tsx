import React, { useCallback, useMemo, useRef, useState } from 'react';
import Grid from './Grid';
import {
  IGridRef,
  IGridColumn,
  ICellItem,
  ICell,
  IInnerCell,
  CombinedSelection,
  SelectionRegionType,
  emptySelection,
  CellType,
  RegionType,
  IRectangle,
  IPosition,
  DragRegionType,
} from '../types/grid';
import { MockTable, MockField, MockRecord } from '../types/mock';

interface GridViewProps {
  table: MockTable;
  onRowExpand?: (recordId: string) => void;
}

const GridView: React.FC<GridViewProps> = ({ table, onRowExpand }) => {
  const gridRef = useRef<IGridRef>(null);
  const [selection, setSelection] = useState<CombinedSelection>(emptySelection);

  // 将 MockField 转换为 IGridColumn
  const columns: IGridColumn[] = useMemo(() => {
    return table.fields.map((field: MockField) => ({
      id: field.id,
      name: field.name,
      type: field.type,
      width: 150,
      description: field.description,
      isPrimary: field.isPrimary,
    }));
  }, [table.fields]);

  // 将 MockRecord 转换为记录映射
  const recordMap = useMemo(() => {
    const map: { [key: number]: MockRecord } = {};
    table.records.forEach((record, index) => {
      map[index] = record;
    });
    return map;
  }, [table.records]);

  // 获取单元格内容
  const getCellContent = useCallback((cell: ICellItem): ICell => {
    const [colIndex, rowIndex] = cell;
    const record = recordMap[rowIndex];
    
    if (!record) {
      return { type: CellType.Loading };
    }

    const field = table.fields[colIndex];
    if (!field) {
      return { type: CellType.Loading };
    }

    const fieldValue = record.fields[field.id];
    
    switch (field.type) {
      case 'text':
        return {
          type: CellType.Text,
          data: String(fieldValue || ''),
          id: `${field.id}-${record.id}`,
        };
      case 'number':
        return {
          type: CellType.Number,
          data: Number(fieldValue || 0),
          id: `${field.id}-${record.id}`,
        };
      case 'boolean':
        return {
          type: CellType.Boolean,
          data: Boolean(fieldValue),
          id: `${field.id}-${record.id}`,
        };
      case 'select':
        return {
          type: CellType.Select,
          data: Array.isArray(fieldValue) ? fieldValue : [String(fieldValue || '')],
          id: `${field.id}-${record.id}`,
        };
      case 'button':
        return {
          type: CellType.Button,
          data: {
            fieldOptions: {
              label: field.name,
              maxCount: 10,
            },
            cellValue: fieldValue as { count: number } || { count: 0 },
          },
          id: `${field.id}-${record.id}`,
        };
      default:
        return {
          type: CellType.Text,
          data: String(fieldValue || ''),
          id: `${field.id}-${record.id}`,
        };
    }
  }, [recordMap, table.fields]);

  // 单元格编辑处理
  const onCellEdited = useCallback((cell: ICellItem, newVal: IInnerCell) => {
    const [colIndex, rowIndex] = cell;
    const record = recordMap[rowIndex];
    const field = table.fields[colIndex];
    
    if (!record || !field) return;

    // 这里可以添加实际的更新逻辑
    console.log('Cell edited:', { cell, newVal, record, field });
  }, [recordMap, table.fields]);

  // 单元格双击处理
  const onCellDblClick = useCallback((cell: ICellItem) => {
    const [colIndex, rowIndex] = cell;
    const record = recordMap[rowIndex];
    
    if (!record) return;
    
    console.log('Cell double clicked:', { cell, record });
  }, [recordMap]);

  // 选择变化处理
  const onSelectionChanged = useCallback((newSelection: CombinedSelection) => {
    setSelection(newSelection);
  }, []);

  // 右键菜单处理
  const onContextMenu = useCallback((selection: CombinedSelection, position: IPosition) => {
    console.log('Context menu:', { selection, position });
  }, []);

  // 列标题点击处理
  const onColumnHeaderClick = useCallback((colIndex: number, bounds: IRectangle) => {
    console.log('Column header clicked:', { colIndex, bounds });
  }, []);

  // 列标题双击处理
  const onColumnHeaderDblClick = useCallback((colIndex: number) => {
    console.log('Column header double clicked:', colIndex);
  }, []);

  // 项目点击处理
  const onItemClick = useCallback((type: RegionType, bounds: IRectangle, cellItem: ICellItem) => {
    console.log('Item clicked:', { type, bounds, cellItem });
  }, []);

  // 项目悬停处理
  const onItemHovered = useCallback((type: RegionType, bounds: IRectangle, cellItem: ICellItem) => {
    // 可以在这里显示工具提示
  }, []);

  // 滚动变化处理
  const onScrollChanged = useCallback((scrollLeft?: number, scrollTop?: number) => {
    // 可以在这里处理滚动事件
  }, []);

  // 删除处理
  const onDelete = useCallback((selection: CombinedSelection) => {
    console.log('Delete:', selection);
  }, []);

  // 复制处理
  const onCopy = useCallback((selection: CombinedSelection, e: React.ClipboardEvent) => {
    console.log('Copy:', selection);
    e.preventDefault();
  }, []);

  // 粘贴处理
  const onPaste = useCallback((selection: CombinedSelection, e: React.ClipboardEvent) => {
    console.log('Paste:', selection);
    e.preventDefault();
  }, []);

  // 撤销处理
  const onUndo = useCallback(() => {
    console.log('Undo');
  }, []);

  // 重做处理
  const onRedo = useCallback(() => {
    console.log('Redo');
  }, []);

  return (
    <div className="grid-view" style={{ width: '100%', height: '100%' }}>
      <Grid
        ref={gridRef}
        columns={columns}
        rowCount={table.records.length}
        rowHeight={32}
        columnHeaderHeight={32}
        freezeColumnCount={1}
        getCellContent={getCellContent}
        onCellEdited={onCellEdited}
        onCellDblClick={onCellDblClick}
        onSelectionChanged={onSelectionChanged}
        onContextMenu={onContextMenu}
        onColumnHeaderClick={onColumnHeaderClick}
        onColumnHeaderDblClick={onColumnHeaderDblClick}
        onItemClick={onItemClick}
        onItemHovered={onItemHovered}
        onScrollChanged={onScrollChanged}
        onDelete={onDelete}
        onCopy={onCopy}
        onPaste={onPaste}
        onUndo={onUndo}
        onRedo={onRedo}
        style={{
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
        }}
      />
    </div>
  );
};

export default GridView;
