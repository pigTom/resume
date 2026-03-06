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
  name: '唐敦红',
  title: '高级 Java 后端工程师',
  contact: {
    phone: '19171807826',
    email: 'm13393895196@163.com',
    location: '深圳 · 离职可立即到岗',
  },
  intention: {
    role: '后端开发工程师',
    city: '深圳',
  },
  summary:
    '7 年 Java 后端开发经验，近 5 年就职于深圳九维数据技术（Bees360），担任技术负责人，领导 5 人团队主导资源服务、事件系统、工作流引擎、用户认证等多个企业级系统的架构设计与交付。擅长分布式系统设计与重构，具备从 0 到 1 构建系统和治理技术债务的丰富实战经验。',
  skills: [
    { category: 'Java 生态', items: ['Spring Boot', 'Spring Cloud', 'Spring Security', 'StateMachine'] },
    { category: '数据库与缓存', items: ['PostgreSQL', 'MySQL', 'Redis', 'MongoDB', 'ES'] },
    { category: '消息与流处理', items: ['Kafka', 'RabbitMQ', 'Debezium', 'Flink'] },
    { category: '云原生与安全', items: ['Docker', 'K8s', 'AWS S3/Lambda', 'OAuth2.0', 'SSO'] },
  ],
  experience: [
    {
      title: '高级 Java 开发工程师 / 技术负责人',
      company: '深圳九维数据技术有限公司（Bees360）',
      period: '2020.03 – 2025.07',
      industry: '企业服务',
      bullets: [
        '担任后端技术负责人，领导最多 5 人团队，负责多个核心系统架构设计、技术选型与交付管理',
        '主导 Debezium 事件系统重构，SLA 从 95% 提升至 99.9%，实现零数据丢失',
        '重构用户认证系统，集成 AWS Cognito 实现 SSO/MFA，全平台零停机迁移',
        '建立代码审核与性能监控体系，平均故障恢复时间缩短 60%',
      ],
    },
    {
      title: '后端开发工程师',
      company: '深圳市龙控智能技术有限公司',
      period: '2019.09 – 2020.03',
      industry: '物联网（机房巡检）',
      bullets: [
        '主导微服务化拆分重构，引入 Docker 容器化与 CI/CD 自动化部署流程',
        '集成 Spring Security 实现细粒度权限管理，搭建机房值班与告警监控平台',
      ],
    },
    {
      title: '后端开发工程师',
      company: '武汉易酒批电子商务有限公司',
      period: '2018.03 – 2019.02',
      industry: '电子商务',
      bullets: [
        '参与微信小程序电商平台开发，负责订单管理、商品管理后台接口与数据库设计',
      ],
    },
  ],
  projects: [
    {
      name: '任务自动分配系统（工作流引擎）',
      period: '2023.03 – 2023.12',
      role: '技术负责人 & 研发组长 · 8 人跨职能团队',
      bullets: [
        '基于 Spring StateMachine 构建配置化状态机引擎，设计加权评分分配策略，支持 20+ 业务场景配置',
        '手动分配减少 90%，任务响应从 4h 缩至 15min，系统可用性达 99.5%',
      ],
    },
    {
      name: '用户认证系统重构与安全升级',
      period: '2024.05 – 2025.03',
      role: '核心开发 & 项目负责人',
      bullets: [
        '集成 AWS Cognito + Auth0，实现 OAuth2.0/SAML2.0、SSO & MFA，附带 Spring 3.x→5.x 升级',
        '登录成功率提升至 99.5%，支持密码/邮箱/Google 社交/企业 SAML 等多种认证方式',
      ],
    },
    {
      name: '统一资源管理服务',
      period: '2021.02 – 2022.03',
      role: '核心开发工程师 → 主导后续迭代',
      bullets: [
        '抽象存储层统一适配 S3/FTP/本地，Lambda 自动化处理图片，RabbitMQ 跨区域异步同步',
        '响应速度提升 40%，集成时间缩短 30%，支持 PB 级存储，日处理图片达百万张',
      ],
    },
  ],
  education: {
    school: '河南理工大学',
    degree: '本科 · 软件工程',
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
