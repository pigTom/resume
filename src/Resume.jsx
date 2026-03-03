import { Mail, Phone, MapPin, Briefcase, GraduationCap, Code2, FolderOpen } from 'lucide-react'

// ── 小组件 ──────────────────────────────────────────────────────────────────────
function SectionHeader({ icon: Icon, children, accentColor, borderColor, s }) {
  return (
    <div
      className="flex items-center"
      style={{ gap: s(4), marginBottom: s(8), paddingBottom: s(4), borderBottom: `1px solid ${borderColor}` }}
    >
      <Icon size={s(11)} style={{ color: accentColor }} className="flex-shrink-0" />
      <h2 className="font-bold tracking-wide" style={{ fontSize: s(11), color: accentColor }}>
        {children}
      </h2>
    </div>
  )
}

function Bullet({ children, bulletColor, s }) {
  return (
    <li
      className="text-gray-700 relative"
      style={{ fontSize: s(9), paddingLeft: s(12), lineHeight: 1.45 }}
    >
      <span
        className="absolute rounded-full flex-shrink-0"
        style={{ left: 0, top: s(4), width: s(6), height: s(6), background: bulletColor }}
      />
      {children}
    </li>
  )
}

// ── A4 简历预览组件（纯展示，不含任何状态） ──────────────────────────────────────
//
// printMode = true 时，所有尺寸 × 794/595 ≈ 1.3344，
// 输出 794×1123 px，恰好填满 A4（96dpi），不依赖任何 CSS transform / zoom。
// 图片以目标分辨率原生渲染，彻底避免缩放导致的打印失真。
//
export default function Resume({ data, theme, printMode = false }) {
  const f = printMode ? (794 / 595) : 1
  const s = (v) => v * f

  return (
    <div
      className="font-sans leading-normal overflow-hidden flex"
      style={{
        width: s(595), height: s(842),
        background: theme.pageBg, flexShrink: 0,
        borderRadius: printMode ? 0 : 8,
        boxShadow: printMode ? 'none' : '0 25px 50px -12px rgba(0,0,0,0.25)',
      }}
    >
      {/* ══════════ 左侧栏 ══════════ */}
      <div
        className="flex flex-col flex-shrink-0"
        style={{ width: s(192), background: theme.sidebarBg, padding: s(12), gap: s(10) }}
      >
        {/* 个人名片 */}
        <div
          className="text-white"
          style={{ borderRadius: s(12), padding: s(12), background: theme.cardBg, boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
        >
          {data.avatar
            ? <img src={data.avatar} alt="头像"
                style={{ width: s(48), height: s(48), display: 'block', margin: `0 auto ${s(8)}px` }} />
            : <div
                className="flex items-center justify-center"
                style={{
                  width: s(48), height: s(48), margin: `0 auto ${s(8)}px`,
                  borderRadius: s(9999), background: 'rgba(255,255,255,0.25)',
                  border: `${s(2)}px solid rgba(255,255,255,0.5)`,
                  color: 'rgba(255,255,255,0.4)', fontSize: s(20),
                }}
              >
                👤
              </div>
          }
          <h1
            className="font-bold text-center"
            style={{ fontSize: s(16), letterSpacing: '0.1em', marginBottom: s(2) }}
          >
            {data.name}
          </h1>
          <p
            className="text-center"
            style={{ fontSize: s(9), color: 'rgba(255,255,255,0.85)', marginBottom: s(10), lineHeight: 1.25 }}
          >
            {data.title}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: s(4) }}>
            {[
              { Icon: Phone,  val: data.contact.phone },
              { Icon: Mail,   val: data.contact.email },
              { Icon: MapPin, val: data.contact.location },
            ].map(({ Icon, val }, i) => (
              <div key={i} className="flex items-start" style={{ gap: s(4) }}>
                <Icon size={s(8)} className="flex-shrink-0" style={{ marginTop: s(2), color: theme.sidebarAccent }} />
                <span
                  className="break-all"
                  style={{ fontSize: s(8.5), color: theme.sidebarText, lineHeight: 1.25 }}
                >
                  {val}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 求职意向 */}
        <div style={{ borderRadius: s(12), padding: s(10), background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <p className="font-semibold" style={{ fontSize: s(9), marginBottom: s(4), color: theme.sidebarAccent }}>
            求职意向
          </p>
          <p style={{ fontSize: s(9), color: theme.sidebarText }}>{data.intention.role}</p>
          <p style={{ fontSize: s(9), color: theme.sidebarSub }}>意向城市：{data.intention.city}</p>
        </div>

        {/* 核心技术栈 */}
        <div className="flex-1" style={{ borderRadius: s(12), padding: s(10), background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="flex items-center" style={{ gap: s(4), marginBottom: s(8) }}>
            <Code2 size={s(9)} style={{ color: theme.sidebarAccent }} />
            <p className="font-semibold" style={{ fontSize: s(9), color: theme.sidebarAccent }}>
              核心技术栈
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: s(8) }}>
            {data.skills.map((sk, i) => (
              <div key={i}>
                <p style={{ fontSize: s(8), marginBottom: s(4), color: theme.sidebarSub }}>{sk.category}</p>
                <div className="flex flex-wrap" style={{ gap: s(4) }}>
                  {sk.items.map((item, j) => (
                    <span
                      key={j}
                      style={{
                        fontSize: s(8), padding: `${s(2)}px ${s(6)}px`,
                        borderRadius: s(9999), background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.15)', color: theme.sidebarText,
                      }}
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
        <div style={{ borderRadius: s(12), padding: s(10), background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="flex items-center" style={{ gap: s(4), marginBottom: s(6) }}>
            <GraduationCap size={s(9)} style={{ color: theme.sidebarAccent }} />
            <p className="font-semibold" style={{ fontSize: s(9), color: theme.sidebarAccent }}>
              教育背景
            </p>
          </div>
          <p className="font-semibold text-white" style={{ fontSize: s(9) }}>{data.education.school}</p>
          <p style={{ fontSize: s(9), color: theme.sidebarText }}>{data.education.degree}</p>
          <p style={{ fontSize: s(9), color: theme.sidebarSub }}>{data.education.period}</p>
          <p style={{ fontSize: s(9), marginTop: s(2), color: theme.sidebarSub }}>{data.education.note}</p>
        </div>
      </div>

      {/* ══════════ 右侧主区 ══════════ */}
      <div
        className="flex-1 flex flex-col overflow-hidden"
        style={{
          padding: s(16), gap: s(10),
          background: 'rgba(255,255,255,0.9)',
          borderRadius: printMode ? 0 : `0 ${8}px ${8}px 0`,
        }}
      >
        {/* 个人简介 */}
        <div
          className="flex-shrink-0"
          style={{ borderRadius: s(12), padding: s(12), background: theme.accentBg, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
        >
          <SectionHeader icon={Briefcase} accentColor={theme.accentColor} borderColor={theme.borderColor} s={s}>
            个人简介
          </SectionHeader>
          <p className="text-gray-700" style={{ fontSize: s(10), lineHeight: 1.625 }}>{data.summary}</p>
        </div>

        {/* 工作经历 */}
        <div
          className="flex-shrink-0"
          style={{ borderRadius: s(12), padding: s(12), background: theme.accentBg, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
        >
          <SectionHeader icon={Briefcase} accentColor={theme.accentColor} borderColor={theme.borderColor} s={s}>
            工作经历
          </SectionHeader>
          <div style={{ display: 'flex', flexDirection: 'column', gap: s(8) }}>
            {data.experience.map((job, i) => (
              <div
                key={i}
                style={i < data.experience.length - 1 ? { paddingBottom: s(8), borderBottom: `1px solid ${theme.borderColor}` } : {}}
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="font-bold" style={{ fontSize: s(10), color: theme.accentColor }}>
                    {job.title}
                  </h3>
                  <span className="text-gray-400 flex-shrink-0" style={{ fontSize: s(8), marginLeft: s(4) }}>{job.period}</span>
                </div>
                <p className="text-gray-500" style={{ fontSize: s(9), marginBottom: s(4) }}>
                  {job.company} · {job.industry}
                </p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: s(2) }}>
                  {job.bullets.map((b, j) => (
                    <Bullet key={j} bulletColor={theme.bulletColor} s={s}>{b}</Bullet>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 核心项目经历 */}
        <div
          className="flex-1"
          style={{ borderRadius: s(12), padding: s(12), background: theme.accentBg, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
        >
          <SectionHeader icon={FolderOpen} accentColor={theme.accentColor} borderColor={theme.borderColor} s={s}>
            核心项目经历
          </SectionHeader>
          <div style={{ display: 'flex', flexDirection: 'column', gap: s(8) }}>
            {data.projects.map((proj, i) => (
              <div
                key={i}
                style={i < data.projects.length - 1 ? { paddingBottom: s(8), borderBottom: `1px solid ${theme.borderColor}` } : {}}
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="font-bold" style={{ fontSize: s(10), color: theme.accentColor }}>
                    {proj.name}
                  </h3>
                  <span className="text-gray-400 flex-shrink-0" style={{ fontSize: s(8), marginLeft: s(4) }}>{proj.period}</span>
                </div>
                <p className="text-gray-500" style={{ fontSize: s(9), marginBottom: s(4) }}>{proj.role}</p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: s(2) }}>
                  {proj.bullets.map((b, j) => (
                    <Bullet key={j} bulletColor={theme.bulletColor} s={s}>{b}</Bullet>
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
