// 基础类型定义
export interface IPosition {
  x: number;
  y: number;
}

export interface IRectangle extends IPosition {
  width: number;
  height: number;
}

export interface IRange {
  0: number;
  1: number;
}

export type ICellItem = [number, number]; // [columnIndex, rowIndex]

// 单元格类型
export enum CellType {
  Text = 'text',
  Number = 'number',
  Boolean = 'boolean',
  Select = 'select',
  Button = 'button',
  Loading = 'loading',
}

export interface ITextCell {
  type: CellType.Text;
  data: string;
  id?: string;
}

export interface INumberCell {
  type: CellType.Number;
  data: number;
  id?: string;
}

export interface IBooleanCell {
  type: CellType.Boolean;
  data: boolean;
  id?: string;
}

export interface ISelectCell {
  type: CellType.Select;
  data: string[];
  id?: string;
}

export interface IButtonCell {
  type: CellType.Button;
  data: {
    fieldOptions: {
      label: string;
      maxCount?: number;
    };
    cellValue?: {
      count: number;
    };
  };
  id?: string;
}

export interface ILoadingCell {
  type: CellType.Loading;
  id?: string;
}

export type ICell = ITextCell | INumberCell | IBooleanCell | ISelectCell | IButtonCell | ILoadingCell;

export interface IInnerCell {
  type: CellType;
  data: unknown;
}

// 列定义
export interface IGridColumn {
  id: string;
  name: string;
  type: string;
  width: number;
  description?: string;
  isPrimary?: boolean;
}

// 行控制类型
export enum RowControlType {
  Checkbox = 'checkbox',
  Drag = 'drag',
  Expand = 'expand',
}

export interface IRowControlItem {
  type: RowControlType;
  icon: string;
}

// 选择类型
export enum SelectionRegionType {
  Cells = 'cells',
  Rows = 'rows',
  Columns = 'columns',
}

export interface ISelectionRange {
  0: ICellItem;
  1: ICellItem;
}

export class CombinedSelection {
  type: SelectionRegionType;
  ranges: ISelectionRange[];

  constructor(type: SelectionRegionType, ranges: ISelectionRange[]) {
    this.type = type;
    this.ranges = ranges;
  }

  get isCellSelection() {
    return this.type === SelectionRegionType.Cells;
  }

  get isRowSelection() {
    return this.type === SelectionRegionType.Rows;
  }

  get isColumnSelection() {
    return this.type === SelectionRegionType.Columns;
  }

  serialize() {
    return this.ranges[0];
  }
}

// 拖拽类型
export enum DraggableType {
  All = 'all',
  None = 'none',
  Row = 'row',
  Column = 'column',
}

export enum SelectableType {
  All = 'all',
  None = 'none',
  Row = 'row',
  Column = 'column',
  Cell = 'cell',
}

// 区域类型
export enum RegionType {
  Cell = 'cell',
  ActiveCell = 'activeCell',
  CellValue = 'cellValue',
  ColumnHeader = 'columnHeader',
  ColumnDescription = 'columnDescription',
  ColumnPrimaryIcon = 'columnPrimaryIcon',
  RowHeader = 'rowHeader',
  RowHeaderDragHandler = 'rowHeaderDragHandler',
}

// 拖拽区域类型
export enum DragRegionType {
  Rows = 'rows',
  Columns = 'columns',
}

// 主题配置
export interface IGridTheme {
  backgroundColor: string;
  borderColor: string;
  headerBackgroundColor: string;
  headerTextColor: string;
  cellBackgroundColor: string;
  cellTextColor: string;
  selectedBackgroundColor: string;
  hoverBackgroundColor: string;
}

// Grid 引用接口
export interface IGridRef {
  resetState: () => void;
  forceUpdate: () => void;
  setSelection: (selection: CombinedSelection) => void;
  scrollTo: (scrollLeft?: number, scrollTop?: number) => void;
  getScrollState: () => { scrollLeft: number; scrollTop: number } | null;
  getRowOffset: (rowIndex: number) => number;
  isEditing: () => boolean | undefined;
  setCellLoading: (cells: ICellItem[]) => void;
  setColumnLoadings: (columns: Array<{ index: number; progress: number; onCancel: () => void }>) => void;
}

// 常量
export const GRID_DEFAULT = {
  scrollBuffer: 100,
  columnAppendBtnWidth: 100,
  rowHeight: 32,
  columnHeaderHeight: 32,
  columnWidth: 150,
};

export const emptySelection = new CombinedSelection(SelectionRegionType.Cells, [[[0, 0], [0, 0]]]);
