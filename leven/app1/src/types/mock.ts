// 模拟数据类型
export interface MockField {
  id: string;
  name: string;
  type: string;
  description?: string;
  isPrimary?: boolean;
}

export interface MockRecord {
  id: string;
  fields: Record<string, unknown>;
}

export interface MockView {
  id: string;
  name: string;
  type: string;
  options?: {
    rowHeight?: number;
    frozenColumnCount?: number;
  };
}

export interface MockTable {
  id: string;
  name: string;
  fields: MockField[];
  records: MockRecord[];
  views: MockView[];
}
