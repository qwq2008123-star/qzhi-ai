# 智职AI — AI Multi-Model Gateway & Job Platform

智能求职助手平台，提供AI简历生成、简历分析、岗位匹配、面试模拟等功能，支持接入多种AI模型API。

## 功能特性

- 📄 **AI智能简历生成** - 根据您的信息智能生成专业简历
- 🔍 **简历分析** - 分析简历优缺点，提供优化建议
- 🎯 **岗位匹配** - 匹配适合您技能和经验的岗位
- 💬 **面试模拟** - 模拟真实面试场景，提供即时反馈
- 🤖 **多模型支持** - 支持DeepSeek、OpenAI、Claude、Gemini等多种AI模型
- 🔧 **自定义API** - 可配置自己的API Key和模型

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动服务器

```bash
npm start
```

服务器将在 http://localhost:3099 启动

### 访问应用

- 首页：http://localhost:3099/index.html
- AI简历生成：http://localhost:3099/feature-ai-resume.html
- 简历分析：http://localhost:3099/feature-resume.html
- 岗位匹配：http://localhost:3099/feature-job.html
- 面试模拟：http://localhost:3099/feature-interview.html

## 技术栈

- 后端：Node.js + Express
- 前端：HTML + CSS + JavaScript
- AI集成：支持OpenAI兼容API

## 项目结构

```
qzhi.dome/
├── public/
│   ├── ai-client.js          # AI客户端封装
│   ├── ai-shared.js          # 共享AI模型配置模块
│   └── ai-model-switcher.js  # 模型切换器
├── lib/
│   ├── ai-gateway.js         # AI网关，处理模型调用
│   └── prompts.js            # 提示词模板
├── feature-ai-resume.html    # AI简历生成页面
├── feature-resume.html       # 简历分析页面
├── feature-job.html          # 岗位匹配页面
├── feature-interview.html    # 面试模拟页面
├── server.js                 # 服务器入口
└── package.json
```

## API接口

- `GET /api/models` - 获取可用模型列表
- `POST /api/generate` - 非流式AI生成
- `POST /api/generate/stream` - 流式AI生成
- `POST /api/resume/analyze` - 简历分析
- `POST /api/job/match` - 岗位匹配
- `POST /api/interview/evaluate` - 面试评价
- `POST /api/resume/generate` - 简历生成
- `GET /api/health` - 健康检查

## 配置说明

点击页面底部的「AI模型切换与配置工具栏」可配置您的模型和API Key。

## License

MIT
