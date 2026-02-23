# AI Weekly 自动化配置

## 环境变量配置

在 OpenClaw 的 TOOLS.md 或环境变量中配置以下内容：

```bash
# 飞书多维表格
FEISHU_BITABLE_APP_TOKEN=your_app_token
FEISHU_BITABLE_TABLE_ID=your_table_id

# Vercel 构建钩子
VERCEL_BUILD_HOOK=https://api.vercel.com/v1/integrations/deploy/xxx

# Tavily API（已有）
TAVILY_API_KEY=tvly-xxx
```

## 定时任务配置

在 HEARTBEAT.md 中添加：

```yaml
## AI 周报定时任务

### 每周日 7:00 AM - 生成周报
- 检查是否是周日
- 运行 `ts-node scripts/generate-weekly.ts`
- 写入飞书多维表格
- 发送飞书通知
- 触发 Vercel 构建

Cron: 0 7 * * 0
```

## 飞书多维表格字段

| 字段名 | 类型 | 说明 |
|--------|------|------|
| 标题 | 多行文本 | 文章标题 |
| 摘要 | 多行文本 | AI 生成的摘要 |
| 来源 | 单行文本 | 来源名称 |
| 链接 | 超链接 | 原文链接 |
| 分类 | 单选 | llm/agent/chip/opensource/funding/research |
| 周次 | 单行文本 | 如 2026-W08 |
| 发布日期 | 日期 | 文章日期 |
| 创建时间 | 创建时间 | 自动 |

## 部署到 Vercel

1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 配置环境变量
4. 获取 Build Hook URL

## 手动触发

```bash
cd D:\project\openclaw\workspace\ai-weekly
npx ts-node scripts/generate-weekly.ts
```
