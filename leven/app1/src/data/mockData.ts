import { MockTable, MockField, MockRecord, MockView } from '../types/mock';

// 模拟字段数据
const mockFields: MockField[] = [
  {
    id: 'field_1',
    name: '姓名',
    type: 'text',
    description: '用户姓名',
    isPrimary: true,
  },
  {
    id: 'field_2',
    name: '年龄',
    type: 'number',
    description: '用户年龄',
  },
  {
    id: 'field_3',
    name: '邮箱',
    type: 'text',
    description: '用户邮箱地址',
  },
  {
    id: 'field_4',
    name: '部门',
    type: 'select',
    description: '所属部门',
  },
  {
    id: 'field_5',
    name: '是否在职',
    type: 'boolean',
    description: '员工在职状态',
  },
  {
    id: 'field_6',
    name: '入职日期',
    type: 'text',
    description: '员工入职日期',
  },
  {
    id: 'field_7',
    name: '薪资',
    type: 'number',
    description: '员工薪资',
  },
  {
    id: 'field_8',
    name: '操作',
    type: 'button',
    description: '操作按钮',
  },
];

// 模拟记录数据
const mockRecords: MockRecord[] = [
  {
    id: 'record_1',
    fields: {
      field_1: '张三',
      field_2: 28,
      field_3: 'zhangsan@example.com',
      field_4: ['技术部'],
      field_5: true,
      field_6: '2023-01-15',
      field_7: 15000,
      field_8: { count: 5 },
    },
  },
  {
    id: 'record_2',
    fields: {
      field_1: '李四',
      field_2: 32,
      field_3: 'lisi@example.com',
      field_4: ['产品部'],
      field_5: true,
      field_6: '2022-08-20',
      field_7: 18000,
      field_8: { count: 3 },
    },
  },
  {
    id: 'record_3',
    fields: {
      field_1: '王五',
      field_2: 25,
      field_3: 'wangwu@example.com',
      field_4: ['设计部'],
      field_5: false,
      field_6: '2023-06-10',
      field_7: 12000,
      field_8: { count: 8 },
    },
  },
  {
    id: 'record_4',
    fields: {
      field_1: '赵六',
      field_2: 35,
      field_3: 'zhaoliu@example.com',
      field_4: ['运营部'],
      field_5: true,
      field_6: '2021-12-05',
      field_7: 20000,
      field_8: { count: 2 },
    },
  },
  {
    id: 'record_5',
    fields: {
      field_1: '钱七',
      field_2: 29,
      field_3: 'qianqi@example.com',
      field_4: ['技术部'],
      field_5: true,
      field_6: '2023-03-18',
      field_7: 16000,
      field_8: { count: 6 },
    },
  },
  {
    id: 'record_6',
    fields: {
      field_1: '孙八',
      field_2: 27,
      field_3: 'sunba@example.com',
      field_4: ['市场部'],
      field_5: true,
      field_6: '2023-05-22',
      field_7: 14000,
      field_8: { count: 4 },
    },
  },
  {
    id: 'record_7',
    fields: {
      field_1: '周九',
      field_2: 31,
      field_3: 'zhoujiu@example.com',
      field_4: ['人事部'],
      field_5: false,
      field_6: '2022-11-30',
      field_7: 17000,
      field_8: { count: 1 },
    },
  },
  {
    id: 'record_8',
    fields: {
      field_1: '吴十',
      field_2: 26,
      field_3: 'wushi@example.com',
      field_4: ['财务部'],
      field_5: true,
      field_6: '2023-07-08',
      field_7: 13000,
      field_8: { count: 7 },
    },
  },
];

// 模拟视图数据
const mockViews: MockView[] = [
  {
    id: 'view_1',
    name: '表格视图',
    type: 'grid',
    options: {
      rowHeight: 32,
      frozenColumnCount: 1,
    },
  },
];

// 模拟表格数据
export const mockTable: MockTable = {
  id: 'table_1',
  name: '员工信息表',
  fields: mockFields,
  records: mockRecords,
  views: mockViews,
};
