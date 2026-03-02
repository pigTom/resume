import React from 'react';
import {
  Mail, Phone, MapPin, Briefcase,
  GraduationCap, Code2, FolderOpen,
} from 'lucide-react';

// ── 配色方案：Ocean Twilight ──────────────────────────────────────────────────
// 深邃海洋蓝深色侧栏 + 青蓝渐变名片 + 纯白主内容区，科技感强且沉稳

const data = {
  name: '唐敦红',
  title: '高级 Java 后端工程师',
  contact: {
    phone: '19171807826',
    email: 'm13393895196@163.com',
    location: '深圳 · 离职可立即到岗',
  },
  intention: { role: '后端开发工程师', city: '深圳' },
  summary:
    '7 年 Java 后端开发经验，近 5 年就职于深圳九维数据技术（Bees360），担任技术负责人，领导 5 人团队主导资源服务、事件系统、工作流引擎、用户认证等多个企业级系统的架构设计与交付。擅长分布式系统设计与重构，具备从 0 到 1 构建系统和治理技术债务的丰富实战经验。',
  skills: [
    {
      category: 'Java 生态',
      items: ['Spring Boot', 'Spring Cloud', 'Spring Security', 'StateMachine'],
    },
    {
      category: '数据库与缓存',
      items: ['PostgreSQL', 'MySQL', 'Redis', 'MongoDB', 'ES'],
    },
    {
      category: '消息与流处理',
      items: ['Kafka', 'RabbitMQ', 'Debezium', 'Flink'],
    },
    {
      category: '云原生与安全',
      items: ['Docker', 'K8s', 'AWS S3/Lambda', 'OAuth2.0', 'SSO'],
    },
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
        '集成 AWS Cognito + Auth0，实现 OAuth2.0/SAML2.0、SSO & MFA，附带 Spring 3.x→5.x 版本升级',
        '登录成功率提升至 99.5%，支持密码 / 邮箱 / Google 社交 / 企业 SAML 等多种认证方式',
      ],
    },
    {
      name: '统一资源管理服务',
      period: '2021.02 – 2022.03',
      role: '核心开发工程师 → 主导后续迭代',
      bullets: [
        '抽象存储层统一适配 S3 / FTP / 本地，Lambda 自动化处理图片，RabbitMQ 跨区域异步同步',
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
};

// ── 通用小组件 ─────────────────────────────────────────────────────────────────
const SectionHeader = ({ icon: Icon, children }) => (
  <div className="flex items-center gap-1 mb-2 pb-1 border-b border-blue-200">
    <Icon size={11} className="text-blue-500 flex-shrink-0" />
    <h2 className="text-[11px] font-bold text-blue-600 tracking-wide">{children}</h2>
  </div>
);

const Bullet = ({ children }) => (
  <li className="text-[9px] text-gray-700 pl-3 relative leading-tight">
    <span className="absolute left-0 top-[4px] w-1.5 h-1.5 bg-cyan-500 rounded-full" />
    {children}
  </li>
);

// ── 主组件 ────────────────────────────────────────────────────────────────────
const A4Resume = () => (
  <div
    className="font-sans text-xs leading-normal overflow-hidden flex shadow-2xl rounded-lg"
    style={{ width: 595, height: 842, background: 'linear-gradient(135deg, #f0f9ff, #dbeafe)' }}
  >
    {/* ════════════════════ 左侧栏 ════════════════════ */}
    <div
      className="flex flex-col p-3 gap-2.5 flex-shrink-0"
      style={{
        width: 192,
        background: 'linear-gradient(180deg, #0b1a2e 0%, #0d2f52 100%)',
      }}
    >
      {/* ── 名片 ── */}
      <div
        className="rounded-xl p-3 shadow-lg text-white"
        style={{ background: 'linear-gradient(135deg, #1d4ed8, #06b6d4)' }}
      >
        {/* 头像占位 */}
        <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-white/25 border-2 border-white/50 shadow-inner" />
        <h1 className="text-[16px] font-bold text-center tracking-widest mb-0.5">
          {data.name}
        </h1>
        <p className="text-[9px] text-center text-blue-100 mb-2.5 leading-tight">
          {data.title}
        </p>
        <div className="space-y-1">
          {[
            { Icon: Phone,  val: data.contact.phone },
            { Icon: Mail,   val: data.contact.email },
            { Icon: MapPin, val: data.contact.location },
          ].map(({ Icon, val }, i) => (
            <div key={i} className="flex items-start gap-1 text-[9px]">
              <Icon size={8} className="mt-0.5 flex-shrink-0 text-cyan-200" />
              <span className="text-blue-50 break-all leading-tight">{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 求职意向 ── */}
      <div className="rounded-xl p-2.5 border border-white/10 bg-white/5">
        <p className="text-[9px] font-semibold text-cyan-300 mb-1">求职意向</p>
        <p className="text-[9px] text-blue-100">{data.intention.role}</p>
        <p className="text-[9px] text-blue-300">意向城市：{data.intention.city}</p>
      </div>

      {/* ── 核心技术栈 ── */}
      <div className="rounded-xl p-2.5 border border-white/10 bg-white/5 flex-1">
        <div className="flex items-center gap-1 mb-2">
          <Code2 size={9} className="text-cyan-300" />
          <p className="text-[9px] font-semibold text-cyan-300">核心技术栈</p>
        </div>
        <div className="space-y-2">
          {data.skills.map((s, i) => (
            <div key={i}>
              <p className="text-[8px] text-cyan-200/60 mb-1">{s.category}</p>
              <div className="flex flex-wrap gap-1">
                {s.items.map((item, j) => (
                  <span
                    key={j}
                    className="text-[8px] text-blue-100 px-1.5 py-0.5 rounded-full border border-white/15 bg-white/10"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 教育背景 ── */}
      <div className="rounded-xl p-2.5 border border-white/10 bg-white/5">
        <div className="flex items-center gap-1 mb-1.5">
          <GraduationCap size={9} className="text-cyan-300" />
          <p className="text-[9px] font-semibold text-cyan-300">教育背景</p>
        </div>
        <p className="text-[9px] font-semibold text-white">{data.education.school}</p>
        <p className="text-[9px] text-blue-200">{data.education.degree}</p>
        <p className="text-[9px] text-blue-300">{data.education.period}</p>
        <p className="text-[9px] text-cyan-300/80 mt-0.5">{data.education.note}</p>
      </div>
    </div>

    {/* ════════════════════ 右侧主区 ════════════════════ */}
    <div className="flex-1 flex flex-col p-4 gap-2.5 bg-white/90">

      {/* ── 个人简介 ── */}
      <div className="bg-blue-50/70 rounded-xl p-3 shadow-sm">
        <SectionHeader icon={Briefcase}>个人简介</SectionHeader>
        <p className="text-[10px] text-gray-700 leading-relaxed">{data.summary}</p>
      </div>

      {/* ── 工作经历 ── */}
      <div className="bg-blue-50/70 rounded-xl p-3 shadow-sm">
        <SectionHeader icon={Briefcase}>工作经历</SectionHeader>
        <div className="space-y-2">
          {data.experience.map((job, i) => (
            <div
              key={i}
              className={
                i < data.experience.length - 1
                  ? 'pb-2 border-b border-blue-100'
                  : ''
              }
            >
              <div className="flex items-baseline justify-between">
                <h3 className="text-[10px] font-bold text-blue-700">{job.title}</h3>
                <span className="text-[8px] text-gray-400 flex-shrink-0 ml-1">
                  {job.period}
                </span>
              </div>
              <p className="text-[9px] text-gray-500 mb-1">
                {job.company} · {job.industry}
              </p>
              <ul className="space-y-0.5">
                {job.bullets.map((b, j) => (
                  <Bullet key={j}>{b}</Bullet>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── 核心项目经历 ── */}
      <div className="bg-blue-50/70 rounded-xl p-3 shadow-sm flex-1">
        <SectionHeader icon={FolderOpen}>核心项目经历</SectionHeader>
        <div className="space-y-2">
          {data.projects.map((proj, i) => (
            <div
              key={i}
              className={
                i < data.projects.length - 1
                  ? 'pb-2 border-b border-blue-100'
                  : ''
              }
            >
              <div className="flex items-baseline justify-between">
                <h3 className="text-[10px] font-bold text-blue-700">{proj.name}</h3>
                <span className="text-[8px] text-gray-400 flex-shrink-0 ml-1">
                  {proj.period}
                </span>
              </div>
              <p className="text-[9px] text-gray-500 mb-1">{proj.role}</p>
              <ul className="space-y-0.5">
                {proj.bullets.map((b, j) => (
                  <Bullet key={j}>{b}</Bullet>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default A4Resume;
