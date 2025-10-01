import React, { forwardRef, useImperativeHandle, useRef, useState, useCallback, useMemo } from 'react';
import {
  IGridRef,
  IGridColumn,
  ICellItem,
  ICell,
  IInnerCell,
  CombinedSelection,
  SelectionRegionType,
  emptySelection,
  RowControlType,
  DraggableType,
  SelectableType,
  RegionType,
  DragRegionType,
  IRectangle,
  IPosition,
  IGridTheme,
  GRID_DEFAULT,
} from '../types/grid';

interface GridProps {
  columns: IGridColumn[];
  rowCount: number;
  rowHeight?: number;
  columnHeaderHeight?: number;
  freezeColumnCount?: number;
  theme?: Partial<IGridTheme>;
  style?: React.CSSProperties;
  isTouchDevice?: boolean;
  draggable?: DraggableType;
  selectable?: SelectableType;
  getCellContent: (cell: ICellItem) => ICell;
  onCellEdited?: (cell: ICellItem, newValue: IInnerCell) => void;
  onCellDblClick?: (cell: ICellItem) => void;
  onSelectionChanged?: (selection: CombinedSelection) => void;
  onContextMenu?: (selection: CombinedSelection, position: IPosition) => void;
  onColumnHeaderClick?: (colIndex: number, bounds: IRectangle) => void;
  onColumnHeaderDblClick?: (colIndex: number) => void;
  onItemClick?: (type: RegionType, bounds: IRectangle, cellItem: ICellItem) => void;
  onItemHovered?: (type: RegionType, bounds: IRectangle, cellItem: ICellItem) => void;
  onScrollChanged?: (scrollLeft?: number, scrollTop?: number) => void;
  onDelete?: (selection: CombinedSelection) => void;
  onCopy?: (selection: CombinedSelection, e: React.ClipboardEvent) => void;
  onPaste?: (selection: CombinedSelection, e: React.ClipboardEvent) => void;
  onUndo?: () => void;
  onRedo?: () => void;
}

const defaultTheme: IGridTheme = {
  backgroundColor: '#ffffff',
  borderColor: '#e5e7eb',
  headerBackgroundColor: '#f9fafb',
  headerTextColor: '#374151',
  cellBackgroundColor: '#ffffff',
  cellTextColor: '#111827',
  selectedBackgroundColor: '#dbeafe',
  hoverBackgroundColor: '#f3f4f6',
};

const Grid = forwardRef<IGridRef, GridProps>(({
  columns,
  rowCount,
  rowHeight = GRID_DEFAULT.rowHeight,
  columnHeaderHeight = GRID_DEFAULT.columnHeaderHeight,
  freezeColumnCount = 1,
  theme: customTheme,
  style,
  isTouchDevice = false,
  draggable = DraggableType.All,
  selectable = SelectableType.All,
  getCellContent,
  onCellEdited,
  onCellDblClick,
  onSelectionChanged,
  onContextMenu,
  onColumnHeaderClick,
  onColumnHeaderDblClick,
  onItemClick,
  onItemHovered,
  onScrollChanged,
  onDelete,
  onCopy,
  onPaste,
  onUndo,
  onRedo,
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selection, setSelection] = useState<CombinedSelection>(emptySelection);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const theme = useMemo(() => ({ ...defaultTheme, ...customTheme }), [customTheme]);

  // 计算可见区域
  const visibleColumns = useMemo(() => {
    const containerWidth = containerRef.current?.clientWidth || 800;
    let currentWidth = 0;
    const visible: IGridColumn[] = [];
    
    for (const column of columns) {
      if (currentWidth + column.width > scrollLeft && currentWidth < scrollLeft + containerWidth) {
        visible.push(column);
      }
      currentWidth += column.width;
    }
    
    return visible;
  }, [columns, scrollLeft]);

  const visibleRows = useMemo(() => {
    const containerHeight = containerRef.current?.clientHeight || 600;
    const startRow = Math.floor(scrollTop / rowHeight);
    const endRow = Math.min(startRow + Math.ceil(containerHeight / rowHeight) + 1, rowCount);
    return { startRow, endRow };
  }, [scrollTop, rowHeight, rowCount]);

  // Grid 引用方法
  useImperativeHandle(ref, () => ({
    resetState: () => {
      setSelection(emptySelection);
      setIsEditing(false);
    },
    forceUpdate: () => {
      // 强制更新逻辑
    },
    setSelection: (newSelection: CombinedSelection) => {
      setSelection(newSelection);
      onSelectionChanged?.(newSelection);
    },
    scrollTo: (newScrollLeft?: number, newScrollTop?: number) => {
      if (newScrollLeft !== undefined) setScrollLeft(newScrollLeft);
      if (newScrollTop !== undefined) setScrollTop(newScrollTop);
    },
    getScrollState: () => ({ scrollLeft, scrollTop }),
    getRowOffset: (rowIndex: number) => rowIndex * rowHeight,
    isEditing: () => isEditing,
    setCellLoading: () => {
      // 设置单元格加载状态
    },
    setColumnLoadings: () => {
      // 设置列加载状态
    },
  }));

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const newScrollLeft = target.scrollLeft;
    const newScrollTop = target.scrollTop;
    
    setScrollLeft(newScrollLeft);
    setScrollTop(newScrollTop);
    onScrollChanged?.(newScrollLeft, newScrollTop);
  }, [onScrollChanged]);

  const handleCellClick = useCallback((cell: ICellItem) => {
    const newSelection = new CombinedSelection(SelectionRegionType.Cells, [cell, cell]);
    setSelection(newSelection);
    onSelectionChanged?.(newSelection);
  }, [onSelectionChanged]);

  const handleCellDoubleClick = useCallback((cell: ICellItem) => {
    onCellDblClick?.(cell);
  }, [onCellDblClick]);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      onContextMenu?.(selection, {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  }, [selection, onContextMenu]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Delete' && onDelete) {
      onDelete(selection);
    }
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 'z' && !e.shiftKey && onUndo) {
        e.preventDefault();
        onUndo();
      }
      if ((e.key === 'z' && e.shiftKey || e.key === 'y') && onRedo) {
        e.preventDefault();
        onRedo();
      }
      if (e.key === 'c' && onCopy) {
        onCopy(selection, e as any);
      }
      if (e.key === 'v' && onPaste) {
        onPaste(selection, e as any);
      }
    }
  }, [selection, onDelete, onUndo, onRedo, onCopy, onPaste]);

  return (
    <div
      ref={containerRef}
      className="grid-container"
      style={{
        width: '100%',
        height: '100%',
        overflow: 'auto',
        backgroundColor: theme.backgroundColor,
        border: `1px solid ${theme.borderColor}`,
        ...style,
      }}
      onScroll={handleScroll}
      onContextMenu={handleContextMenu}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* 列标题 */}
      <div
        className="grid-header"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          backgroundColor: theme.headerBackgroundColor,
          borderBottom: `1px solid ${theme.borderColor}`,
          display: 'flex',
          height: columnHeaderHeight,
        }}
      >
        {visibleColumns.map((column, index) => (
          <div
            key={column.id}
            className="grid-header-cell"
            style={{
              width: column.width,
              height: columnHeaderHeight,
              borderRight: `1px solid ${theme.borderColor}`,
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              userSelect: 'none',
              backgroundColor: theme.headerBackgroundColor,
              color: theme.headerTextColor,
            }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              onColumnHeaderClick?.(index, {
                x: rect.left,
                y: rect.top,
                width: rect.width,
                height: rect.height,
              });
            }}
            onDoubleClick={() => onColumnHeaderDblClick?.(index)}
          >
            {column.name}
            {column.isPrimary && <span style={{ marginLeft: '4px', color: '#6b7280' }}>*</span>}
          </div>
        ))}
      </div>

      {/* 表格内容 */}
      <div
        className="grid-body"
        style={{
          position: 'relative',
          height: rowCount * rowHeight,
        }}
      >
        {Array.from({ length: visibleRows.endRow - visibleRows.startRow }, (_, rowOffset) => {
          const rowIndex = visibleRows.startRow + rowOffset;
          return (
            <div
              key={rowIndex}
              className="grid-row"
              style={{
                position: 'absolute',
                top: rowIndex * rowHeight,
                left: 0,
                right: 0,
                height: rowHeight,
                display: 'flex',
                borderBottom: `1px solid ${theme.borderColor}`,
                backgroundColor: selection.isCellSelection && 
                  selection.ranges.some(range => 
                    range[0][1] <= rowIndex && rowIndex <= range[1][1]
                  ) ? theme.selectedBackgroundColor : theme.cellBackgroundColor,
              }}
            >
              {visibleColumns.map((column, colIndex) => {
                const cell: ICellItem = [colIndex, rowIndex];
                const cellContent = getCellContent(cell);
                
                return (
                  <div
                    key={`${colIndex}-${rowIndex}`}
                    className="grid-cell"
                    style={{
                      width: column.width,
                      height: rowHeight,
                      borderRight: `1px solid ${theme.borderColor}`,
                      padding: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      backgroundColor: 'transparent',
                      color: theme.cellTextColor,
                    }}
                    onClick={() => handleCellClick(cell)}
                    onDoubleClick={() => handleCellDoubleClick(cell)}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      onItemHovered?.(RegionType.Cell, {
                        x: rect.left,
                        y: rect.top,
                        width: rect.width,
                        height: rect.height,
                      }, cell);
                    }}
                  >
                    {renderCellContent(cellContent)}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
});

// 渲染单元格内容
function renderCellContent(cell: ICell): React.ReactNode {
  switch (cell.type) {
    case 'text':
      return <span>{cell.data}</span>;
    case 'number':
      return <span>{cell.data}</span>;
    case 'boolean':
      return <span>{cell.data ? '是' : '否'}</span>;
    case 'select':
      return <span>{(cell.data as string[]).join(', ')}</span>;
    case 'button':
      const buttonData = cell.data as any;
      return (
        <button
          style={{
            padding: '4px 8px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
          }}
        >
          {buttonData.fieldOptions.label} ({buttonData.cellValue?.count || 0})
        </button>
      );
    case 'loading':
      return <span>加载中...</span>;
    default:
      return <span>{String(cell.data)}</span>;
  }
}

Grid.displayName = 'Grid';

export default Grid;
