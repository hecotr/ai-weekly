// AI Weekly Report - Data Types and Sample Data

export type Category = 'llm' | 'agent' | 'chip' | 'opensource' | 'funding' | 'research';

export interface Article {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  category: Category;
  week: string;
  publishedAt: string;
}

export interface WeeklyReport {
  week: string;
  articles: Article[];
  generatedAt: string;
}

export const categoryLabels: Record<Category, string> = {
  llm: '🤖 大模型',
  agent: '🛠️ AI Agent',
  chip: '⚛️ 半导体/AI芯片',
  opensource: '📦 开源项目',
  funding: '💰 融资&产品',
  research: '🔬 研究&论文',
};

export const sampleArticles: Article[] = [
  {
    id: '1',
    title: 'Google 发布 Gemini 3.1 Pro，基准测试再创新高',
    summary: 'Google 发布了 Gemini 系列的最新版本 Gemini 3.1 Pro，在多项基准测试中取得了最高分，展现出强大的推理能力。新模型在数学、编程、多语言理解等方面都有显著提升，被认为是最强大的 LLM 之一。此次更新进一步加剧了与 OpenAI 和 Anthropic 的竞争。',
    source: 'TechCrunch',
    url: 'https://techcrunch.com/2026/02/19/googles-new-gemini-pro-model-has-record-benchmark-scores-again/',
    category: 'llm',
    week: '2026-W08',
    publishedAt: '2026-02-19',
  },
  {
    id: '2',
    title: 'Claude Sonnet 4.6 vs Gemini 3.1 Pro：7 项挑战对比测试',
    summary: 'Tom\'s Guide 进行了详细对比测试，让两个模型完成 7 项复杂任务。结果显示 Claude Sonnet 4.6 在实用推理、情感智能、代码理解等方面表现更优，尤其在处理复杂多步骤任务时更加可靠。Gemini 则在某些知识检索任务上有优势。整体 Claude 胜出。',
    source: "Tom's Guide",
    url: 'https://www.tomsguide.com/ai/i-tested-gemini-3-1-pro-vs-claude-sonnet-4-6-in-7-tough-challenges-and-there-was-one-clear-winner',
    category: 'llm',
    week: '2026-W08',
    publishedAt: '2026-02-18',
  },
  {
    id: '3',
    title: 'Anthropic：Claude 新模型能像人一样操作电脑',
    summary: 'Anthropic 宣布 Claude Sonnet 4.6 在计算机使用能力上取得重大突破，可以自主完成浏览网页、操作软件、填写表格等任务。这意味着 AI Agent 正从"对话"进化到"行动"，有望大幅提升办公自动化水平。该功能已向所有用户开放。',
    source: 'CNET',
    url: 'https://www.cnet.com/tech/services-and-software/anthropic-says-its-newest-ai-model-is-getting-pretty-good-at-using-a-computer/',
    category: 'llm',
    week: '2026-W08',
    publishedAt: '2026-02-18',
  },
  {
    id: '4',
    title: '研究：AI 生成的密码"看起来很强，实际很弱"',
    summary: '网络安全公司 Irregular 的研究发现，ChatGPT、Claude、Gemini 等 LLM 生成的密码虽然看起来复杂，但熵值不足，很容易被破解。原因是模型倾向于生成"看似随机但有模式"的字符组合。建议用户仍应使用专业密码管理器而非 AI 生成密码。',
    source: 'Gizmodo',
    url: 'https://gizmodo.com/ai-generated-passwords-are-apparently-quite-easy-to-crack-2000723660',
    category: 'research',
    week: '2026-W08',
    publishedAt: '2026-02-17',
  },
  {
    id: '5',
    title: 'OpenAI 收购 OpenClaw 开发者，Sam Altman 亲自官宣',
    summary: 'OpenAI 正式聘请了 OpenClaw 的开发者 Peter Steinberger。Steinberger 此前曾与 Meta 创始人扎克伯格讨论过合作可能，最终选择加入 OpenAI。OpenClaw 是一个开源 AI Agent 框架，允许用户创建自己的代理来控制邮件、Spotify、智能家居等应用。',
    source: 'Engadget',
    url: 'https://www.engadget.com/ai/openai-has-hired-the-developer-behind-ai-agent-openclaw-092934041.html',
    category: 'agent',
    week: '2026-W08',
    publishedAt: '2026-02-16',
  },
  {
    id: '6',
    title: 'OpenClaw 曝出 6 个高危安全漏洞，用户需紧急更新',
    summary: '安全研究人员在 OpenClaw 中发现了 6 个高危漏洞，包括服务端请求伪造（SSRF）、认证绕过、路径遍历等。攻击者可利用这些漏洞访问内部网络、窃取敏感数据。OpenClaw 已发布补丁，强烈建议所有用户立即更新到最新版本。',
    source: 'CSO Online',
    url: 'https://www.csoonline.com/article/4134540/six-flaws-found-hiding-in-openclaws-plumbing.html',
    category: 'agent',
    week: '2026-W08',
    publishedAt: '2026-02-18',
  },
  {
    id: '7',
    title: '信息窃取恶意软件开始针对 OpenClaw 用户',
    summary: '随着 OpenClaw 的流行，黑客开始专门针对其用户开发恶意软件。新型信息窃取程序会扫描并窃取 OpenClaw 配置文件中的 API keys、认证令牌等敏感信息。安全专家建议用户不要在配置文件中存储明文凭据，并定期轮换密钥。',
    source: 'BleepingComputer',
    url: 'https://www.bleepingcomputer.com/news/security/infostealer-malware-found-stealing-openclaw-secrets-for-first-time/',
    category: 'agent',
    week: '2026-W08',
    publishedAt: '2026-02-17',
  },
  {
    id: '8',
    title: 'The Atlantic：AI Agent 时代已来，后聊天机器人时代开启',
    summary: '权威媒体 The Atlantic 发布深度报道，认为 AI Agent 正在取代传统聊天机器人成为新范式。Anthropic 的 Claude Code、OpenAI 的 Operator 等产品标志着 AI 从"回答问题"进化到"执行任务"。这将深刻改变人们与计算机的交互方式，但也会带来就业结构变革的阵痛。',
    source: 'The Atlantic',
    url: 'https://www.theatlantic.com/technology/2026/02/post-chatbot-claude-code-ai-agents/686029/',
    category: 'agent',
    week: '2026-W08',
    publishedAt: '2026-02-15',
  },
  {
    id: '9',
    title: 'Anthropic 为 Claude Code 推出 AI 漏洞扫描功能',
    summary: 'Anthropic 为 Claude Code 添加了新的安全特性，可以自动扫描用户代码库中的安全漏洞。该功能利用 AI 理解代码逻辑，识别潜在的安全风险，并提供修复建议。这是 AI Agent 在网络安全领域的重要应用，有望提升开发者的代码安全意识。',
    source: 'The Hacker News',
    url: 'https://thehackernews.com/2026/02/anthropic-launches-claude-code-security.html',
    category: 'agent',
    week: '2026-W08',
    publishedAt: '2026-02-21',
  },
  {
    id: '10',
    title: 'Meta 与 Nvidia 达成数十亿美元大单，购买数百万颗芯片',
    summary: 'Meta 宣布与 Nvidia 签订多年期协议，将购买数百万颗 AI 芯片，包括 Blackwell GPU 和下一代 Vera Rubin 系统。这是 Meta 在 AI 基础设施上的最大投资之一，将用于支持其 AI 产品的训练和推理需求。两家公司股价均应声上涨。',
    source: 'CNBC',
    url: 'https://www.cnbc.com/2026/02/17/meta-nvidia-deal-ai-data-center-chips.html',
    category: 'chip',
    week: '2026-W08',
    publishedAt: '2026-02-17',
  },
  {
    id: '11',
    title: 'Meta 成为首家大规模部署 Nvidia Grace CPU 的大科技公司',
    summary: '此次交易中，Meta 将成为首家在数据中心大规模部署 Nvidia Grace CPU 作为独立处理器的大厂。此前 Grace 主要作为 Grace Hopper 超级芯片的一部分销售。这意味着 Nvidia 正式进入 CPU 市场，与 Intel、AMD 直接竞争服务器处理器领域。',
    source: 'The Verge',
    url: 'https://www.theverge.com/ai-artificial-intelligence/880513/nvidia-meta-ai-grace-vera-chips',
    category: 'chip',
    week: '2026-W08',
    publishedAt: '2026-02-17',
  },
  {
    id: '12',
    title: 'WIRED：Nvidia-Meta 交易标志着算力新时代',
    summary: 'WIRED 发布深度分析文章，认为这笔交易不仅是商业合作，更标志着 AI 算力进入新阶段。Meta 将建设专门为 AI 优化的超大规模数据中心，同时部署 Nvidia 的 GPU 和 CPU。这种"全栈 Nvidia"架构可能成为未来 AI 数据中心的标准配置。',
    source: 'WIRED',
    url: 'https://www.wired.com/story/nvidias-deal-with-meta-signals-a-new-era-in-computing-power/',
    category: 'chip',
    week: '2026-W08',
    publishedAt: '2026-02-17',
  },
  {
    id: '13',
    title: 'Nvidia 进军印度市场，与五大 VC 合作寻找 AI 创业公司',
    summary: 'Nvidia 宣布与印度顶级风投 Peak XV、Elevation Capital、Nexus、Accel India 等建立合作关系，共同识别和投资印度 AI 创业公司。同时 Nvidia 将在印度建设数据中心基础设施。这标志着 Nvidia 正在全球扩张其 AI 生态系统。',
    source: 'CNBC',
    url: 'https://www.cnbc.com/2026/02/18/nvidia-india-ai-vc-data-center-partners.html',
    category: 'chip',
    week: '2026-W08',
    publishedAt: '2026-02-18',
  },
  {
    id: '14',
    title: 'Meta 官方：宣布与 Nvidia 的长期基础设施合作伙伴关系',
    summary: 'Meta 官方发布公告，详细介绍了与 Nvidia 的合作细节。Meta 将建设"超大规模数据中心"，专门针对 AI 工作负载优化，部署数百万颗 Nvidia GPU 和 CPU。这是 Meta 实现 AI 愿景的关键基础设施投资，将支持未来多年的 AI 发展需求。',
    source: 'Meta',
    url: 'https://about.fb.com/news/2026/02/meta-nvidia-announce-long-term-infrastructure-partnership/',
    category: 'chip',
    week: '2026-W08',
    publishedAt: '2026-02-17',
  },
  {
    id: '15',
    title: '美国防部与 Anthropic 谈判遇阻，军事 AI 安全成焦点',
    summary: '美国国防部正在与 Anthropic 就 AI 军事应用的保障措施进行艰难谈判。军方希望在更多场景使用 Claude，但 Anthropic 对其 AI 被用于军事决策持谨慎态度。谈判结果将影响 AI 公司与政府合作的边界设定，可能成为行业先例。',
    source: 'GIGAZINE',
    url: 'https://gigazine.net/gsc_news/en/20260216-pentagon-anthropic-ai-safeguards/',
    category: 'funding',
    week: '2026-W08',
    publishedAt: '2026-02-16',
  },
];

export function getArticlesByWeek(week: string): Article[] {
  return sampleArticles.filter(article => article.week === week);
}

export function getArticlesByCategory(category: Category): Article[] {
  return sampleArticles.filter(article => article.category === category);
}

export function getLatestWeek(): string {
  const weeks = [...new Set(sampleArticles.map(a => a.week))];
  return weeks.sort().reverse()[0] || '2026-W01';
}

export function getAllWeeks(): string[] {
  const weeks = [...new Set(sampleArticles.map(a => a.week))];
  return weeks.sort().reverse();
}
