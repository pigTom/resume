// ── 主题配色方案 ────────────────────────────────────────────────────────────────
export const THEMES = {
  ocean: {
    id: 'ocean',
    name: 'Ocean Twilight',
    sidebarBg: 'linear-gradient(180deg, #0b1a2e 0%, #0d2f52 100%)',
    cardBg: 'linear-gradient(135deg, #1d4ed8, #06b6d4)',
    pageBg: 'linear-gradient(135deg, #f0f9ff, #dbeafe)',
    accentColor: '#2563eb',
    accentBg: '#eff6ff',
    borderColor: '#bfdbfe',
    bulletColor: '#06b6d4',
    sidebarAccent: '#67e8f9',
    sidebarText: 'rgba(219,234,254,0.95)',
    sidebarSub: 'rgba(191,219,254,0.6)',
  },
  lavender: {
    id: 'lavender',
    name: 'Lavender Fields',
    sidebarBg: 'linear-gradient(180deg, #2d1b69 0%, #1e1b4b 100%)',
    cardBg: 'linear-gradient(135deg, #7c3aed, #6366f1)',
    pageBg: 'linear-gradient(135deg, #f5f3ff, #ede9fe)',
    accentColor: '#7c3aed',
    accentBg: '#f5f3ff',
    borderColor: '#ddd6fe',
    bulletColor: '#818cf8',
    sidebarAccent: '#c4b5fd',
    sidebarText: 'rgba(224,231,255,0.95)',
    sidebarSub: 'rgba(196,181,253,0.6)',
  },
  forest: {
    id: 'forest',
    name: 'Forest Dew',
    sidebarBg: 'linear-gradient(180deg, #052e16 0%, #14532d 100%)',
    cardBg: 'linear-gradient(135deg, #166534, #10b981)',
    pageBg: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
    accentColor: '#16a34a',
    accentBg: '#f0fdf4',
    borderColor: '#bbf7d0',
    bulletColor: '#10b981',
    sidebarAccent: '#6ee7b7',
    sidebarText: 'rgba(187,247,208,0.95)',
    sidebarSub: 'rgba(110,231,183,0.6)',
  },
  coral: {
    id: 'coral',
    name: 'Coral Reef',
    sidebarBg: 'linear-gradient(180deg, #4c0519 0%, #9f1239 100%)',
    cardBg: 'linear-gradient(135deg, #e11d48, #f97316)',
    pageBg: 'linear-gradient(135deg, #fff1f2, #ffedd5)',
    accentColor: '#e11d48',
    accentBg: '#fff1f2',
    borderColor: '#fecdd3',
    bulletColor: '#f97316',
    sidebarAccent: '#fda4af',
    sidebarText: 'rgba(254,205,211,0.95)',
    sidebarSub: 'rgba(253,164,175,0.6)',
  },
  aurora: {
    id: 'aurora',
    name: 'Aurora Borealis',
    sidebarBg: 'linear-gradient(180deg, #064e3b 0%, #0c4a6e 100%)',
    cardBg: 'linear-gradient(135deg, #059669, #0ea5e9)',
    pageBg: 'linear-gradient(135deg, #ecfeff, #d1fae5)',
    accentColor: '#0891b2',
    accentBg: '#ecfeff',
    borderColor: '#a5f3fc',
    bulletColor: '#34d399',
    sidebarAccent: '#6ee7b7',
    sidebarText: 'rgba(165,243,252,0.95)',
    sidebarSub: 'rgba(110,231,183,0.6)',
  },
}

// ── 默认简历数据 ────────────────────────────────────────────────────────────────
export const DEFAULT_DATA = {
  theme: 'ocean',
  avatar: '',          // base64 data URL，空字符串表示使用占位符
  name: '陈梓豪',
  title: '高级 Java 后端工程师',
  contact: {
    phone: '13856279143',
    email: 'chenzihao_dev@126.com',
    location: '深圳 · 离职可立即到岗',
  },
  intention: {
    role: '后端开发工程师',
    city: '深圳',
  },
  summary:
    '7 年 Java 后端开发经验，近 5 年就职于深圳云科智慧科技，担任技术负责人，带领 6 人团队主导微服务架构、数据同步引擎、权限中台、任务调度系统等企业级项目的设计与落地。精通分布式系统开发与性能优化，拥有大量从 0 到 1 搭建核心系统、解决技术瓶颈、治理线上问题的实战经验。',
  skills: [
    { category: 'Java 生态', items: ['Spring Boot', 'Spring Cloud Alibaba', 'Spring Security', 'Quartz'] },
    { category: '数据库与缓存', items: ['MySQL', 'PostgreSQL', 'Redis', 'MongoDB', 'Elasticsearch'] },
    { category: '消息与流处理', items: ['RocketMQ', 'Kafka', 'Canal', 'Spark'] },
    { category: '云原生与安全', items: ['Docker', 'K8s', 'MinIO', 'OAuth2.0', 'JWT'] },
  ],
  experience: [
    {
      title: '高级 Java 开发工程师 / 技术负责人',
      company: '深圳云科智慧科技有限公司',
      period: '2020.03 – 2025.07',
      industry: '企业服务',
      bullets: [
        '担任后端技术负责人，管理 6 人研发团队，负责核心系统架构设计、技术方案评审与项目交付管控',
        '主导 Canal 数据同步系统重构，系统稳定性从 94% 提升至 99.9%，实现数据实时同步零丢失',
        '重构企业权限中台，集成统一认证服务，实现多系统 SSO 单点登录，全量业务零停机升级',
        '搭建全链路监控与自动化测试体系，线上故障发生率降低 70%，故障恢复效率提升 65%',
      ],
    },
    {
      title: '后端开发工程师',
      company: '深圳市智联物联科技有限公司',
      period: '2019.09 – 2020.03',
      industry: '物联网（工业监控）',
      bullets: [
        '负责系统微服务拆分与容器化改造，搭建 Jenkins CI/CD 自动化部署流水线',
        '基于 Spring Security 实现 RBAC 权限体系，开发工业设备监控与数据告警平台',
      ],
    },
    {
      title: '后端开发工程师',
      company: '武汉优鲜达供应链有限公司',
      period: '2018.03 – 2019.02',
      industry: '生鲜电商',
      bullets: [
        '参与生鲜电商小程序后端开发，负责库存管理、物流配送接口开发与数据库表结构设计',
      ],
    },
  ],
  projects: [
    {
      name: '智能任务调度引擎',
      period: '2023.03 – 2023.12',
      role: '技术负责人 & 研发组长 · 7 人跨职能团队',
      bullets: [
        '基于 Spring Quartz 开发可视化调度引擎，设计动态任务配置策略，支持 30+ 业务场景自动化执行',
        '人工操作减少 92%，任务执行效率提升 80%，系统全年可用性稳定在 99.6%',
      ],
    },
    {
      name: '统一认证中台重构升级',
      period: '2024.05 – 2025.03',
      role: '核心开发 & 项目负责人',
      bullets: [
        '基于 OAuth2.0 + JWT 构建统一认证体系，支持账号密码、短信、企业微信等多方式登录，完成 Spring 版本全量升级',
        '登录成功率达 99.8%，支撑公司 10+ 业务系统统一身份认证，日均处理登录请求 50万+',
      ],
    },
    {
      name: '分布式文件存储服务',
      period: '2021.02 – 2022.03',
      role: '核心开发工程师 → 技术负责人',
      bullets: [
        '封装 MinIO/本地存储统一适配层，实现文件异步上传、自动压缩、跨机房同步能力',
        '接口响应速度提升 50%，接入成本降低 40%，支撑 PB 级文件存储，日处理文件 200万+',
      ],
    },
  ],
  education: {
    school: '武汉纺织大学',
    degree: '本科 · 计算机科学与技术',
    period: '2014 – 2018',
    note: '大学英语六级（CET-6）',
  },
}

const STORAGE_KEY        = 'resume_builder_v1'
const AVATAR_STORAGE_KEY = 'resume_builder_avatar_v1'

export function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    const avatar = localStorage.getItem(AVATAR_STORAGE_KEY) ?? ''
    if (saved) return { ...DEFAULT_DATA, ...JSON.parse(saved), avatar }
  } catch (e) {
    console.warn('读取本地存储失败', e)
  }
  return DEFAULT_DATA
}

/**
 * 保存数据，头像单独存储避免主数据超出 quota。
 * @returns {{ ok: boolean, avatarOk: boolean }}
 */
export function saveData(data) {
  const { avatar, ...rest } = data
  let ok = true
  let avatarOk = true

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rest))
  } catch (e) {
    console.error('主数据保存失败', e)
    ok = false
  }

  try {
    if (avatar) {
      localStorage.setItem(AVATAR_STORAGE_KEY, avatar)
    } else {
      localStorage.removeItem(AVATAR_STORAGE_KEY)
    }
  } catch (e) {
    console.error('头像保存失败（图片可能过大）', e)
    avatarOk = false
  }

  return { ok, avatarOk }
}
