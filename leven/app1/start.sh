#!/bin/bash

echo "🚀 启动 Grid Demo 应用..."
echo ""

# 检查是否已安装依赖
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖包..."
    npm install
    echo ""
fi

echo "🎯 启动开发服务器..."
echo "应用将在 http://localhost:3001 启动"
echo ""
echo "按 Ctrl+C 停止服务器"
echo ""

npm run dev
