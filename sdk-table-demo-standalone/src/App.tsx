import React from 'react'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          SDK Table Demo
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">
            这是一个独立的 SDK Table Demo 项目，已经成功安装了基础依赖。
          </p>
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800">
              ✅ 安装成功！现在可以添加 Teable SDK 相关功能了。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
