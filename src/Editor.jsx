import { useState } from 'react'
import {
  ChevronDown, ChevronRight, Palette, User, Target,
  FileText, Code2, Briefcase, FolderOpen, GraduationCap,
  Plus, Trash2, GripVertical,
} from 'lucide-react'
import { THEMES, DEFAULT_DATA } from './resumeData'
import AvatarEditor from './AvatarEditor'

// ── 通用 UI 组件 ────────────────────────────────────────────────────────────────

/** 单行输入框 */
function Field({ label, value, onChange, placeholder }) {
  return (
    <div className="mb-3">
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400
                   bg-white transition-colors"
      />
    </div>
  )
}

/** 多行文本框 */
function TextArea({ label, value, onChange, rows = 3, placeholder }) {
  return (
    <div className="mb-3">
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400
                   bg-white resize-none transition-colors leading-relaxed"
      />
    </div>
  )
}

/** 可折叠的 Section 卡片 */
function Section({ title, icon: Icon, defaultOpen = true, children, accent = '#3b82f6' }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="bg-white rounded-xl shadow-sm mb-3 overflow-hidden border border-gray-100">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Icon size={15} style={{ color: accent }} />
          <span className="text-sm font-semibold text-gray-700">{title}</span>
        </div>
        {open
          ? <ChevronDown size={15} className="text-gray-400" />
          : <ChevronRight size={15} className="text-gray-400" />}
      </button>
      {open && <div className="px-4 pb-4 pt-1 border-t border-gray-50">{children}</div>}
    </div>
  )
}

/** 删除按钮 */
function DelBtn({ onClick, title = '删除' }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="p-1.5 text-gray-300 hover:text-red-400 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
    >
      <Trash2 size={14} />
    </button>
  )
}

/** 添加按钮 */
function AddBtn({ onClick, label }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 text-xs text-blue-500 border border-blue-200
                 rounded-lg px-3 py-1.5 hover:bg-blue-50 transition-colors mt-1"
    >
      <Plus size={12} />
      {label}
    </button>
  )
}

// ── 各区块编辑器 ─────────────────────────────────────────────────────────────────

/** 主题选择 */
function ThemeSection({ data, onChange }) {
  return (
    <Section title="主题配色" icon={Palette} defaultOpen={true} accent="#8b5cf6">
      <div className="flex flex-wrap gap-3 mt-2">
        {Object.values(THEMES).map(t => (
          <button
            key={t.id}
            onClick={() => onChange({ ...data, theme: t.id })}
            title={t.name}
            className={`relative w-10 h-10 rounded-full shadow-md transition-all hover:scale-110
                        ${data.theme === t.id ? 'ring-3 ring-offset-2 ring-gray-400 scale-110' : ''}`}
            style={{ background: t.cardBg }}
          >
            {data.theme === t.id && (
              <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                ✓
              </span>
            )}
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-2">
        当前：{THEMES[data.theme]?.name}
      </p>
    </Section>
  )
}

/** 基本信息 */
function BasicSection({ data, onChange }) {
  const [cropSrc, setCropSrc] = useState(null)

  const set = (field) => (val) => onChange({ ...data, [field]: val })
  const setContact = (field) => (val) =>
    onChange({ ...data, contact: { ...data.contact, [field]: val } })
  const setIntention = (field) => (val) =>
    onChange({ ...data, intention: { ...data.intention, [field]: val } })

  // 读取图片文件 → 打开裁剪器
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setCropSrc(ev.target.result)
    reader.readAsDataURL(file)
    // 清空 input，确保同一文件再次选择时仍能触发 onChange
    e.target.value = ''
  }

  return (
    <Section title="基本信息" icon={User} accent="#3b82f6">
      {/* 头像上传 */}
      <div className="mt-3 mb-4 flex items-center gap-4">
        <div className="relative group flex-shrink-0">
          {data.avatar
            ? <img src={data.avatar} alt="头像"
                className="w-16 h-16 rounded-full border-2 border-gray-200 shadow" />
            : <div className="w-16 h-16 rounded-full bg-gray-100 border-2 border-dashed border-gray-300
                              flex items-center justify-center text-3xl text-gray-300">
                👤
              </div>
          }
          {/* 悬浮遮罩 */}
          <label
            htmlFor="avatar-upload"
            className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100
                       transition-opacity cursor-pointer flex items-center justify-center text-white text-xs font-medium"
          >
            更换
          </label>
        </div>
        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-500 mb-1">头像照片</label>
          <label
            htmlFor="avatar-upload"
            className="inline-flex items-center gap-1.5 text-sm text-blue-500 border border-blue-200
                       rounded-lg px-3 py-1.5 hover:bg-blue-50 transition-colors cursor-pointer"
          >
            📷 上传图片
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
          {data.avatar && (
            <>
              <button
                onClick={() => setCropSrc(data.avatar)}
                className="ml-2 text-xs text-blue-400 hover:text-blue-600 transition-colors"
              >
                重新调整
              </button>
              <button
                onClick={() => onChange({ ...data, avatar: '' })}
                className="ml-2 text-xs text-gray-400 hover:text-red-400 transition-colors"
              >
                移除
              </button>
            </>
          )}
          <p className="text-xs text-gray-400 mt-1">支持 JPG、PNG、WebP</p>
        </div>
      </div>

      {/* 裁剪编辑器 */}
      {cropSrc && (
        <AvatarEditor
          src={cropSrc}
          onConfirm={(cropped) => {
            onChange({ ...data, avatar: cropped })
            setCropSrc(null)
          }}
          onCancel={() => setCropSrc(null)}
        />
      )}

      <div className="grid grid-cols-2 gap-x-3">
        <Field label="姓名" value={data.name} onChange={set('name')} placeholder="你的姓名" />
        <Field label="职位头衔" value={data.title} onChange={set('title')} placeholder="高级 Java 工程师" />
        <Field label="电话" value={data.contact.phone} onChange={setContact('phone')} placeholder="手机号" />
        <Field label="邮箱" value={data.contact.email} onChange={setContact('email')} placeholder="your@email.com" />
        <Field label="所在城市 / 状态" value={data.contact.location} onChange={setContact('location')} placeholder="深圳 · 离职可立即到岗" />
        <Field label="意向城市" value={data.intention.city} onChange={setIntention('city')} placeholder="深圳" />
        <div className="col-span-2">
          <Field label="求职意向职位" value={data.intention.role} onChange={setIntention('role')} placeholder="后端开发工程师" />
        </div>
      </div>
    </Section>
  )
}

/** 个人简介 */
function SummarySection({ data, onChange }) {
  return (
    <Section title="个人简介" icon={FileText} accent="#10b981">
      <div className="mt-3">
        <TextArea
          label="一段话介绍自己（2-4 句）"
          value={data.summary}
          onChange={(val) => onChange({ ...data, summary: val })}
          rows={4}
          placeholder="X 年 Java 后端开发经验..."
        />
      </div>
    </Section>
  )
}

/** 核心技术栈 */
function SkillsSection({ data, onChange }) {
  const updateCategory = (idx, field) => (val) => {
    const skills = data.skills.map((s, i) => i === idx ? { ...s, [field]: val } : s)
    onChange({ ...data, skills })
  }

  const updateItem = (catIdx, itemIdx) => (val) => {
    const skills = data.skills.map((s, i) =>
      i === catIdx
        ? { ...s, items: s.items.map((it, j) => j === itemIdx ? val : it) }
        : s
    )
    onChange({ ...data, skills })
  }

  const addItem = (catIdx) => () => {
    const skills = data.skills.map((s, i) =>
      i === catIdx ? { ...s, items: [...s.items, '新技能'] } : s
    )
    onChange({ ...data, skills })
  }

  const removeItem = (catIdx, itemIdx) => () => {
    const skills = data.skills.map((s, i) =>
      i === catIdx ? { ...s, items: s.items.filter((_, j) => j !== itemIdx) } : s
    )
    onChange({ ...data, skills })
  }

  const addCategory = () => {
    onChange({ ...data, skills: [...data.skills, { category: '新分类', items: ['技能 1'] }] })
  }

  const removeCategory = (idx) => () => {
    onChange({ ...data, skills: data.skills.filter((_, i) => i !== idx) })
  }

  return (
    <Section title="核心技术栈" icon={Code2} accent="#f59e0b">
      <div className="mt-3 space-y-3">
        {data.skills.map((skill, catIdx) => (
          <div key={catIdx} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <input
                value={skill.category}
                onChange={e => updateCategory(catIdx, 'category')(e.target.value)}
                className="flex-1 px-2 py-1 text-xs font-semibold border border-gray-200 rounded-md
                           focus:outline-none focus:ring-1 focus:ring-blue-300 bg-white"
                placeholder="分类名，如：Java 生态"
              />
              <DelBtn onClick={removeCategory(catIdx)} title="删除此分类" />
            </div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {skill.items.map((item, itemIdx) => (
                <div key={itemIdx} className="flex items-center gap-1 bg-white border border-gray-200 rounded-full px-2 py-0.5">
                  <input
                    value={item}
                    onChange={e => updateItem(catIdx, itemIdx)(e.target.value)}
                    className="text-xs w-20 focus:outline-none bg-transparent"
                    placeholder="技能"
                  />
                  <button
                    onClick={removeItem(catIdx, itemIdx)}
                    className="text-gray-300 hover:text-red-400 transition-colors text-xs leading-none"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={addItem(catIdx)}
              className="text-xs text-blue-400 hover:text-blue-600 transition-colors flex items-center gap-1"
            >
              <Plus size={11} /> 添加技能
            </button>
          </div>
        ))}
        <AddBtn onClick={addCategory} label="添加技术分类" />
      </div>
    </Section>
  )
}

/** 单个工作经历条目 */
function ExperienceItem({ job, onChange, onDelete }) {
  const set = (field) => (val) => onChange({ ...job, [field]: val })

  const updateBullet = (idx) => (val) =>
    onChange({ ...job, bullets: job.bullets.map((b, i) => i === idx ? val : b) })

  const addBullet = () =>
    onChange({ ...job, bullets: [...job.bullets, '新增工作职责或成果'] })

  const removeBullet = (idx) =>
    onChange({ ...job, bullets: job.bullets.filter((_, i) => i !== idx) })

  return (
    <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 mb-3">
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs font-semibold text-gray-600 truncate flex-1 mr-2">
          {job.title || '（未填写职位）'} @ {job.company || '（未填写公司）'}
        </span>
        <DelBtn onClick={onDelete} title="删除此段经历" />
      </div>
      <div className="grid grid-cols-2 gap-x-3">
        <Field label="职位名称" value={job.title} onChange={set('title')} placeholder="高级工程师" />
        <Field label="公司名称" value={job.company} onChange={set('company')} placeholder="XX 公司" />
        <Field label="在职时间" value={job.period} onChange={set('period')} placeholder="2020.03 – 2025.07" />
        <Field label="行业" value={job.industry} onChange={set('industry')} placeholder="企业服务" />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1.5">工作要点</label>
        <div className="space-y-1.5">
          {job.bullets.map((b, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
              <textarea
                value={b}
                onChange={e => updateBullet(idx)(e.target.value)}
                rows={2}
                className="flex-1 px-2.5 py-1.5 text-sm border border-gray-200 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400
                           bg-white resize-none"
                placeholder="描述工作职责或量化成果"
              />
              <button
                onClick={() => removeBullet(idx)}
                className="mt-1.5 p-1 text-gray-300 hover:text-red-400 hover:bg-red-50 rounded transition-colors"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
        <AddBtn onClick={addBullet} label="添加要点" />
      </div>
    </div>
  )
}

/** 工作经历列表 */
function ExperienceSection({ data, onChange }) {
  const updateJob = (idx) => (newJob) => {
    const experience = data.experience.map((e, i) => i === idx ? newJob : e)
    onChange({ ...data, experience })
  }

  const addJob = () => {
    onChange({
      ...data,
      experience: [
        ...data.experience,
        { title: '职位名称', company: '公司名称', period: '20XX.XX – 20XX.XX', industry: '行业', bullets: ['工作职责描述'] },
      ],
    })
  }

  const removeJob = (idx) => () => {
    onChange({ ...data, experience: data.experience.filter((_, i) => i !== idx) })
  }

  return (
    <Section title="工作经历" icon={Briefcase} accent="#ef4444">
      <div className="mt-3">
        {data.experience.map((job, idx) => (
          <ExperienceItem
            key={idx}
            job={job}
            onChange={updateJob(idx)}
            onDelete={removeJob(idx)}
          />
        ))}
        <AddBtn onClick={addJob} label="添加工作经历" />
      </div>
    </Section>
  )
}

/** 单个项目条目 */
function ProjectItem({ proj, onChange, onDelete }) {
  const set = (field) => (val) => onChange({ ...proj, [field]: val })

  const updateBullet = (idx) => (val) =>
    onChange({ ...proj, bullets: proj.bullets.map((b, i) => i === idx ? val : b) })

  const addBullet = () =>
    onChange({ ...proj, bullets: [...proj.bullets, '项目亮点或量化成果'] })

  const removeBullet = (idx) =>
    onChange({ ...proj, bullets: proj.bullets.filter((_, i) => i !== idx) })

  return (
    <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 mb-3">
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs font-semibold text-gray-600 truncate flex-1 mr-2">
          {proj.name || '（未填写项目名）'}
        </span>
        <DelBtn onClick={onDelete} title="删除此项目" />
      </div>
      <div className="grid grid-cols-2 gap-x-3">
        <div className="col-span-2">
          <Field label="项目名称" value={proj.name} onChange={set('name')} placeholder="XXX 系统 / 服务" />
        </div>
        <Field label="时间段" value={proj.period} onChange={set('period')} placeholder="2023.03 – 2023.12" />
        <Field label="角色" value={proj.role} onChange={set('role')} placeholder="技术负责人 & 核心开发" />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1.5">项目亮点</label>
        <div className="space-y-1.5">
          {proj.bullets.map((b, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
              <textarea
                value={b}
                onChange={e => updateBullet(idx)(e.target.value)}
                rows={2}
                className="flex-1 px-2.5 py-1.5 text-sm border border-gray-200 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400
                           bg-white resize-none"
                placeholder="技术方案描述或量化成果"
              />
              <button
                onClick={() => removeBullet(idx)}
                className="mt-1.5 p-1 text-gray-300 hover:text-red-400 hover:bg-red-50 rounded transition-colors"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
        <AddBtn onClick={addBullet} label="添加亮点" />
      </div>
    </div>
  )
}

/** 项目经历列表 */
function ProjectsSection({ data, onChange }) {
  const updateProj = (idx) => (newProj) => {
    const projects = data.projects.map((p, i) => i === idx ? newProj : p)
    onChange({ ...data, projects })
  }

  const addProj = () => {
    onChange({
      ...data,
      projects: [
        ...data.projects,
        { name: '项目名称', period: '20XX.XX – 20XX.XX', role: '角色', bullets: ['项目描述'] },
      ],
    })
  }

  const removeProj = (idx) => () => {
    onChange({ ...data, projects: data.projects.filter((_, i) => i !== idx) })
  }

  return (
    <Section title="核心项目经历" icon={FolderOpen} accent="#8b5cf6">
      <div className="mt-3">
        {data.projects.map((proj, idx) => (
          <ProjectItem
            key={idx}
            proj={proj}
            onChange={updateProj(idx)}
            onDelete={removeProj(idx)}
          />
        ))}
        <AddBtn onClick={addProj} label="添加项目" />
      </div>
    </Section>
  )
}

/** 教育背景 */
function EducationSection({ data, onChange }) {
  const set = (field) => (val) =>
    onChange({ ...data, education: { ...data.education, [field]: val } })

  return (
    <Section title="教育背景" icon={GraduationCap} accent="#06b6d4">
      <div className="mt-3 grid grid-cols-2 gap-x-3">
        <Field label="学校名称" value={data.education.school} onChange={set('school')} placeholder="XX 大学" />
        <Field label="学历 · 专业" value={data.education.degree} onChange={set('degree')} placeholder="本科 · 计算机科学" />
        <Field label="就读时间" value={data.education.period} onChange={set('period')} placeholder="2014 – 2018" />
        <Field label="额外说明（证书/奖项等）" value={data.education.note} onChange={set('note')} placeholder="大学英语六级（CET-6）" />
      </div>
    </Section>
  )
}

// ── 主编辑器导出 ────────────────────────────────────────────────────────────────
export default function Editor({ data, onChange }) {
  return (
    <div className="p-5 max-w-2xl mx-auto">
      <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
        ✏️ 编辑简历
      </h2>
      <ThemeSection     data={data} onChange={onChange} />
      <BasicSection     data={data} onChange={onChange} />
      <SummarySection   data={data} onChange={onChange} />
      <SkillsSection    data={data} onChange={onChange} />
      <ExperienceSection data={data} onChange={onChange} />
      <ProjectsSection  data={data} onChange={onChange} />
      <EducationSection data={data} onChange={onChange} />
      <div className="h-8" /> {/* 底部留白 */}
    </div>
  )
}
