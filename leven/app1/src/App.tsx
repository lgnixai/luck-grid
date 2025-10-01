import React from 'react';
import GridView from './components/GridView';
import { mockTable } from './data/mockData';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Grid Demo - 表格视图演示</h1>
        <p>这是一个基于 React 的表格组件演示，展示了类似 Teable 的网格视图功能</p>
      </header>
      
      <main className="app-main">
        <div className="grid-container">
          <GridView table={mockTable} />
        </div>
      </main>
      
      <footer className="app-footer">
        <p>功能特性：</p>
        <ul>
          <li>✅ 单元格选择和编辑</li>
          <li>✅ 列标题交互</li>
          <li>✅ 滚动和虚拟化</li>
          <li>✅ 多种数据类型支持</li>
          <li>✅ 键盘快捷键</li>
          <li>✅ 右键菜单</li>
        </ul>
      </footer>
    </div>
  );
};

export default App;
