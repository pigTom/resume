import { Mail, Phone, MapPin, Briefcase, GraduationCap, Code2, FolderOpen } from 'lucide-react'

// ── 小组件 ──────────────────────────────────────────────────────────────────────
function SectionHeader({ icon: Icon, children, accentColor, borderColor }) {
  return (
    <div
      className="flex items-center gap-1 mb-2 pb-1"
      style={{ borderBottom: `1px solid ${borderColor}` }}
    >
      <Icon size={11} style={{ color: accentColor }} className="flex-shrink-0" />
      <h2 className="text-[11px] font-bold tracking-wide" style={{ color: accentColor }}>
        {children}
      </h2>
    </div>
  )
}

function Bullet({ children, bulletColor }) {
  return (
    <li className="text-[9px] text-gray-700 pl-3 relative leading-[1.45]">
      <span
        className="absolute left-0 top-[4px] w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: bulletColor }}
      />
      {children}
    </li>
  )
}

// ── A4 简历预览组件（纯展示，不含任何状态） ──────────────────────────────────────
export default function Resume({ data, theme }) {
  return (
    <div
      className="font-sans leading-normal overflow-hidden flex shadow-2xl rounded-lg"
      style={{ width: 595, height: 842, background: theme.pageBg, flexShrink: 0 }}
    >
      {/* ══════════ 左侧栏 ══════════ */}
      <div
        className="flex flex-col p-3 gap-2.5 flex-shrink-0"
        style={{ width: 192, background: theme.sidebarBg }}
      >
        {/* 个人名片 */}
        <div
          className="rounded-xl p-3 shadow-lg text-white"
          style={{ background: theme.cardBg }}
        >
          {data.avatar
            ? <img src={data.avatar} alt="头像"
                className="w-12 h-12 mx-auto mb-2" />
            : <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-white/25 border-2 border-white/50 shadow-inner flex items-center justify-center text-white/40 text-xl">
                👤
              </div>
          }
          <h1 className="text-[16px] font-bold text-center tracking-widest mb-0.5">
            {data.name}
          </h1>
          <p
            className="text-[9px] text-center mb-2.5 leading-tight"
            style={{ color: 'rgba(255,255,255,0.85)' }}
          >
            {data.title}
          </p>
          <div className="space-y-1">
            {[
              { Icon: Phone,  val: data.contact.phone },
              { Icon: Mail,   val: data.contact.email },
              { Icon: MapPin, val: data.contact.location },
            ].map(({ Icon, val }, i) => (
              <div key={i} className="flex items-start gap-1">
                <Icon size={8} className="mt-0.5 flex-shrink-0" style={{ color: theme.sidebarAccent }} />
                <span
                  className="text-[8.5px] break-all leading-tight"
                  style={{ color: theme.sidebarText }}
                >
                  {val}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 求职意向 */}
        <div className="rounded-xl p-2.5 bg-white/5 border border-white/10">
          <p className="text-[9px] font-semibold mb-1" style={{ color: theme.sidebarAccent }}>
            求职意向
          </p>
          <p className="text-[9px]" style={{ color: theme.sidebarText }}>
            {data.intention.role}
          </p>
          <p className="text-[9px]" style={{ color: theme.sidebarSub }}>
            意向城市：{data.intention.city}
          </p>
        </div>

        {/* 核心技术栈 */}
        <div className="rounded-xl p-2.5 bg-white/5 border border-white/10 flex-1">
          <div className="flex items-center gap-1 mb-2">
            <Code2 size={9} style={{ color: theme.sidebarAccent }} />
            <p className="text-[9px] font-semibold" style={{ color: theme.sidebarAccent }}>
              核心技术栈
            </p>
          </div>
          <div className="space-y-2">
            {data.skills.map((s, i) => (
              <div key={i}>
                <p className="text-[8px] mb-1" style={{ color: theme.sidebarSub }}>
                  {s.category}
                </p>
                <div className="flex flex-wrap gap-1">
                  {s.items.map((item, j) => (
                    <span
                      key={j}
                      className="text-[8px] px-1.5 py-0.5 rounded-full bg-white/10 border border-white/15"
                      style={{ color: theme.sidebarText }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 教育背景 */}
        <div className="rounded-xl p-2.5 bg-white/5 border border-white/10">
          <div className="flex items-center gap-1 mb-1.5">
            <GraduationCap size={9} style={{ color: theme.sidebarAccent }} />
            <p className="text-[9px] font-semibold" style={{ color: theme.sidebarAccent }}>
              教育背景
            </p>
          </div>
          <p className="text-[9px] font-semibold text-white">{data.education.school}</p>
          <p className="text-[9px]" style={{ color: theme.sidebarText }}>{data.education.degree}</p>
          <p className="text-[9px]" style={{ color: theme.sidebarSub }}>{data.education.period}</p>
          <p className="text-[9px] mt-0.5" style={{ color: theme.sidebarSub }}>{data.education.note}</p>
        </div>
      </div>

      {/* ══════════ 右侧主区 ══════════ */}
      <div className="flex-1 flex flex-col p-4 gap-2.5 bg-white/90 rounded-r-lg overflow-hidden">
        {/* 个人简介 */}
        <div
          className="rounded-xl p-3 shadow-sm flex-shrink-0"
          style={{ background: theme.accentBg }}
        >
          <SectionHeader icon={Briefcase} accentColor={theme.accentColor} borderColor={theme.borderColor}>
            个人简介
          </SectionHeader>
          <p className="text-[10px] text-gray-700 leading-relaxed">{data.summary}</p>
        </div>

        {/* 工作经历 */}
        <div
          className="rounded-xl p-3 shadow-sm flex-shrink-0"
          style={{ background: theme.accentBg }}
        >
          <SectionHeader icon={Briefcase} accentColor={theme.accentColor} borderColor={theme.borderColor}>
            工作经历
          </SectionHeader>
          <div className="space-y-2">
            {data.experience.map((job, i) => (
              <div
                key={i}
                className={i < data.experience.length - 1 ? 'pb-2' : ''}
                style={i < data.experience.length - 1 ? { borderBottom: `1px solid ${theme.borderColor}` } : {}}
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="text-[10px] font-bold" style={{ color: theme.accentColor }}>
                    {job.title}
                  </h3>
                  <span className="text-[8px] text-gray-400 flex-shrink-0 ml-1">{job.period}</span>
                </div>
                <p className="text-[9px] text-gray-500 mb-1">
                  {job.company} · {job.industry}
                </p>
                <ul className="space-y-0.5">
                  {job.bullets.map((b, j) => (
                    <Bullet key={j} bulletColor={theme.bulletColor}>{b}</Bullet>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 核心项目经历 */}
        <div
          className="rounded-xl p-3 shadow-sm flex-1"
          style={{ background: theme.accentBg }}
        >
          <SectionHeader icon={FolderOpen} accentColor={theme.accentColor} borderColor={theme.borderColor}>
            核心项目经历
          </SectionHeader>
          <div className="space-y-2">
            {data.projects.map((proj, i) => (
              <div
                key={i}
                className={i < data.projects.length - 1 ? 'pb-2' : ''}
                style={i < data.projects.length - 1 ? { borderBottom: `1px solid ${theme.borderColor}` } : {}}
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="text-[10px] font-bold" style={{ color: theme.accentColor }}>
                    {proj.name}
                  </h3>
                  <span className="text-[8px] text-gray-400 flex-shrink-0 ml-1">{proj.period}</span>
                </div>
                <p className="text-[9px] text-gray-500 mb-1">{proj.role}</p>
                <ul className="space-y-0.5">
                  {proj.bullets.map((b, j) => (
                    <Bullet key={j} bulletColor={theme.bulletColor}>{b}</Bullet>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
