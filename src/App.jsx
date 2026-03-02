import { useState, useEffect, useRef } from 'react'
import { Printer, RotateCcw, CheckCircle2, Clock, AlertCircle, Download, Upload, FileDown } from 'lucide-react'
import { loadData, saveData, THEMES, DEFAULT_DATA } from './resumeData'
import Resume from './Resume'
import Editor from './Editor'

export default function App() {
  const [data, setData]         = useState(loadData)
  const [saveStatus, setSaveStatus] = useState('saved') // 'saved' | 'pending' | 'error'
  const [exporting, setExporting]   = useState(false)
  const [scale, setScale]       = useState(0.92)
  const importRef               = useRef(null)
  const exportRef               = useRef(null)   // 离屏简历，供 html2canvas 捕获
  const previewRef              = useRef(null)

  const theme = THEMES[data.theme] ?? THEMES.ocean

  // ── 自动保存（1 秒防抖） ──
  useEffect(() => {
    setSaveStatus('pending')
    const timer = setTimeout(() => {
      const { ok, avatarOk } = saveData(data)
      setSaveStatus(ok && avatarOk ? 'saved' : 'error')
    }, 1000)
    return () => clearTimeout(timer)
  }, [data])

  // ── 导出 PDF（html2canvas + jsPDF，绕开浏览器打印，头像不会花） ──
  const handleExportPDF = async () => {
    if (!exportRef.current || exporting) return
    setExporting(true)
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ])
      const canvas = await html2canvas(exportRef.current, {
        scale: 2,          // 2× 超采样，保证清晰度
        useCORS: true,
        allowTaint: false,
        logging: false,
        backgroundColor: null,
      })
      const imgData = canvas.toDataURL('image/jpeg', 0.95)
      const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' })
      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297)
      pdf.save('resume.pdf')
    } catch (err) {
      console.error('PDF 导出失败', err)
      alert('PDF 导出失败，请尝试浏览器打印')
    } finally {
      setExporting(false)
    }
  }

  // ── 导出 JSON ──
  const handleExport = () => {
    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = 'resume.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  // ── 导入 JSON ──
  const handleImport = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result)
        setData({ ...DEFAULT_DATA, ...parsed })
      } catch {
        alert('文件格式错误，请选择有效的简历 JSON 文件')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  // ── 动态缩放：让 A4 恰好填满预览区 ──
  useEffect(() => {
    const calc = () => {
      const el = previewRef.current
      if (!el) return
      const { width, height } = el.getBoundingClientRect()
      const pad = 32
      const s = Math.min((height - pad) / 842, (width - pad) / 595, 1)
      setScale(Math.max(s, 0.4))
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  const handleReset = () => {
    if (window.confirm('确定要重置为默认简历数据吗？\n（本地存储的修改将丢失）')) {
      setData(DEFAULT_DATA)
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">

      {/* ══════════ 顶部工具栏 ══════════ */}
      <header className="no-print h-14 bg-white shadow-sm flex items-center px-5 justify-between z-10 flex-shrink-0 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">📄</span>
          <h1 className="font-bold text-gray-800 text-base">简历生成器</h1>
          <span className="text-gray-300 text-sm">|</span>
          <span className="text-xs text-gray-400">编辑即保存 · 支持导出 PDF</span>
        </div>

        <div className="flex items-center gap-2">
          {/* 保存状态 */}
          {saveStatus === 'saved' && (
            <span className="flex items-center gap-1 text-xs text-green-500">
              <CheckCircle2 size={13} /> 已保存
            </span>
          )}
          {saveStatus === 'pending' && (
            <span className="flex items-center gap-1 text-xs text-amber-400">
              <Clock size={13} /> 保存中…
            </span>
          )}
          {saveStatus === 'error' && (
            <span className="flex items-center gap-1 text-xs text-red-500" title="浏览器存储已满，请导出 JSON 备份">
              <AlertCircle size={13} /> 保存失败（请导出备份）
            </span>
          )}

          {/* 导入 JSON */}
          <label
            title="从 JSON 文件导入简历数据"
            className="flex items-center gap-1.5 text-sm text-gray-500 border border-gray-200
                       rounded-lg px-3 py-1.5 hover:bg-gray-50 hover:text-gray-700 transition-colors cursor-pointer"
          >
            <Upload size={14} />
            导入
            <input ref={importRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>

          {/* 导出 JSON */}
          <button
            onClick={handleExport}
            title="将简历数据导出为 JSON 文件"
            className="flex items-center gap-1.5 text-sm text-gray-500 border border-gray-200
                       rounded-lg px-3 py-1.5 hover:bg-gray-50 hover:text-gray-700 transition-colors"
          >
            <Download size={14} />
            导出
          </button>

          {/* 重置 */}
          <button
            onClick={handleReset}
            title="重置为默认数据"
            className="flex items-center gap-1.5 text-sm text-gray-500 border border-gray-200
                       rounded-lg px-3 py-1.5 hover:bg-gray-50 hover:text-gray-700 transition-colors"
          >
            <RotateCcw size={14} />
            重置
          </button>

          {/* 导出 PDF（html2canvas，头像不花） */}
          <button
            onClick={handleExportPDF}
            disabled={exporting}
            className="flex items-center gap-1.5 text-sm text-white rounded-lg px-4 py-1.5
                       transition-colors shadow-sm hover:opacity-90 disabled:opacity-60 disabled:cursor-wait"
            style={{ background: theme.accentColor }}
          >
            <FileDown size={14} />
            {exporting ? '生成中…' : '导出 PDF'}
          </button>

          {/* 浏览器打印 */}
          <button
            onClick={() => window.print()}
            title="通过浏览器打印（头像可能显示异常）"
            className="flex items-center gap-1.5 text-sm text-gray-500 border border-gray-200
                       rounded-lg px-3 py-1.5 hover:bg-gray-50 hover:text-gray-700 transition-colors"
          >
            <Printer size={14} />
            打印
          </button>
        </div>
      </header>

      {/* ══════════ 主内容区 ══════════ */}
      <div className="no-print flex-1 flex overflow-hidden">

        {/* 左侧：A4 预览 */}
        <div
          ref={previewRef}
          className="flex-shrink-0 bg-slate-200/80 flex items-center justify-center overflow-hidden"
          style={{ width: Math.round(595 * scale + 48) }}
        >
          {/* 用嵌套 div 解决 transform 不影响文档流的问题 */}
          <div
            style={{
              width:    Math.round(595 * scale),
              height:   Math.round(842 * scale),
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 8,
              boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            }}
          >
            <div
              style={{
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            >
              <Resume data={data} theme={theme} />
            </div>
          </div>
        </div>

        {/* 右侧：编辑器 */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <Editor data={data} onChange={setData} />
        </div>
      </div>

      {/* 打印时显示的简历（不受 scale 影响，原始尺寸） */}
      <div className="print-only">
        <Resume data={data} theme={theme} />
      </div>

      {/* 离屏简历：html2canvas 捕获用，保持在 DOM 中但不可见 */}
      <div style={{ position: 'absolute', left: '-9999px', top: 0, overflow: 'hidden', width: 595, height: 842 }}>
        <div ref={exportRef}>
          <Resume data={data} theme={theme} />
        </div>
      </div>
    </div>
  )
}
