/**
 * AvatarEditor — 基于 Canvas 的头像裁剪组件
 *
 * 交互方式：
 *   - 鼠标拖动 / 触屏滑动：平移图片
 *   - 滚轮 / 缩放滑条：缩放图片
 *   - 确认时将圆形区域导出为 JPEG 存储，无需在简历里依赖 CSS 裁切
 */
import { useState, useRef, useEffect } from 'react'
import { Check, X, ZoomIn, ZoomOut } from 'lucide-react'

const CROP_R = 100   // 裁剪圆半径（canvas 内坐标 px）
const SIZE   = 220   // canvas 元素宽高（CROP_R*2 + 10px 四边留白）
const OUT    = 240   // 输出 JPEG 尺寸（正方形）

export default function AvatarEditor({ src, onConfirm, onCancel }) {
  const canvasRef = useRef(null)
  const imgRef    = useRef(null)
  const drag      = useRef(null)         // { sx, sy } 拖拽起始点

  const [scale,    setScale]    = useState(1)
  const [fitScale, setFitScale] = useState(1)   // 恰好覆盖裁剪圆的最小缩放
  const [offset,   setOffset]   = useState({ x: 0, y: 0 })

  /* ── 加载图片，计算初始缩放 ── */
  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      imgRef.current = img
      // cover：图片完全覆盖裁剪圆
      const fit = Math.max(
        (CROP_R * 2) / img.naturalWidth,
        (CROP_R * 2) / img.naturalHeight,
      )
      setFitScale(fit)
      setScale(fit)
      setOffset({ x: 0, y: 0 })
    }
    img.src = src
  }, [src])

  /* ── 每次 scale / offset 变化后重绘 Canvas ── */
  useEffect(() => {
    const img    = imgRef.current
    const canvas = canvasRef.current
    if (!img || !canvas) return

    const ctx = canvas.getContext('2d')
    const cx = SIZE / 2, cy = SIZE / 2

    ctx.clearRect(0, 0, SIZE, SIZE)

    // 圆外遮罩（半透明黑色）
    ctx.fillStyle = 'rgba(0,0,0,0.5)'
    ctx.fillRect(0, 0, SIZE, SIZE)

    // 裁剪圆内显示图片
    ctx.save()
    ctx.beginPath()
    ctx.arc(cx, cy, CROP_R, 0, Math.PI * 2)
    ctx.clip()
    const w = img.naturalWidth  * scale
    const h = img.naturalHeight * scale
    ctx.drawImage(img, cx - w / 2 + offset.x, cy - h / 2 + offset.y, w, h)
    ctx.restore()

    // 圆形参考线
    ctx.beginPath()
    ctx.arc(cx, cy, CROP_R, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(255,255,255,0.75)'
    ctx.lineWidth   = 1.5
    ctx.stroke()
  }, [scale, offset])

  /* ── mouseup/touchend 在 window 上监听，防止拖出 canvas 后卡住 ── */
  useEffect(() => {
    const up = () => { drag.current = null }
    window.addEventListener('mouseup',  up)
    window.addEventListener('touchend', up)
    return () => {
      window.removeEventListener('mouseup',  up)
      window.removeEventListener('touchend', up)
    }
  }, [])

  /* ── 拖拽事件 ── */
  const pt = (e) => (e.touches ? e.touches[0] : e)

  const onDown = (e) => {
    e.preventDefault()
    const p = pt(e)
    drag.current = { sx: p.clientX - offset.x, sy: p.clientY - offset.y }
  }
  const onMove = (e) => {
    if (!drag.current) return
    e.preventDefault()
    const p = pt(e)
    setOffset({ x: p.clientX - drag.current.sx, y: p.clientY - drag.current.sy })
  }
  const onUp = () => { drag.current = null }

  /* ── 滚轮缩放 ── */
  const onWheel = (e) => {
    e.preventDefault()
    setScale(s =>
      Math.max(fitScale * 0.3,
        Math.min(s * (e.deltaY < 0 ? 1.08 : 0.93), fitScale * 6)),
    )
  }

  /* ── 确认：把当前画面渲染到输出 Canvas 并导出 PNG（透明背景，圆形已烘焙） ── */
  const handleConfirm = () => {
    const img = imgRef.current
    if (!img) return

    const cv = document.createElement('canvas')
    cv.width  = OUT
    cv.height = OUT
    const ctx = cv.getContext('2d')
    const cx  = OUT / 2
    const cy  = OUT / 2
    // display → output 坐标系比例
    const f   = OUT / (CROP_R * 2)

    // 圆形裁切（透明背景，圆形直接烘焙进像素，不依赖 CSS border-radius）
    ctx.save()
    ctx.beginPath()
    ctx.arc(cx, cy, OUT / 2, 0, Math.PI * 2)
    ctx.clip()
    const w = img.naturalWidth  * scale * f
    const h = img.naturalHeight * scale * f
    ctx.drawImage(img, cx - w / 2 + offset.x * f, cy - h / 2 + offset.y * f, w, h)
    ctx.restore()

    // 烘焙白色边框（替代 CSS border，避免打印时 border-radius 失效）
    ctx.beginPath()
    ctx.arc(cx, cy, OUT / 2 - 1.5, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(255,255,255,0.6)'
    ctx.lineWidth   = 3
    ctx.stroke()

    onConfirm(cv.toDataURL('image/png'))
  }

  return (
    <div className="bg-white rounded-xl border border-blue-200 shadow-lg p-4 mt-3">
      <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
        ✂️ 调整头像
        <span className="text-xs font-normal text-gray-400">拖动移位 · 滚轮 / 滑条缩放</span>
      </p>

      {/* Canvas 裁剪预览 */}
      <div className="flex justify-center mb-3">
        <canvas
          ref={canvasRef}
          width={SIZE}
          height={SIZE}
          className="rounded-lg select-none"
          style={{ cursor: drag.current ? 'grabbing' : 'grab', touchAction: 'none' }}
          onMouseDown={onDown}
          onMouseMove={onMove}
          onMouseUp={onUp}
          onMouseLeave={onUp}
          onTouchStart={onDown}
          onTouchMove={onMove}
          onTouchEnd={onUp}
          onWheel={onWheel}
        />
      </div>

      {/* 缩放滑条 */}
      <div className="flex items-center gap-2 mb-4 px-1">
        <button
          onClick={() => setScale(s => Math.max(fitScale * 0.3, s * 0.9))}
          className="text-gray-400 hover:text-gray-700 transition-colors flex-shrink-0"
        >
          <ZoomOut size={16} />
        </button>
        <input
          type="range"
          min={fitScale * 0.3}
          max={fitScale * 5}
          step={0.0001}
          value={scale}
          onChange={e => setScale(+e.target.value)}
          className="flex-1 accent-blue-500"
        />
        <button
          onClick={() => setScale(s => Math.min(s * 1.1, fitScale * 5))}
          className="text-gray-400 hover:text-gray-700 transition-colors flex-shrink-0"
        >
          <ZoomIn size={16} />
        </button>
      </div>

      {/* 操作按钮 */}
      <div className="flex gap-2">
        <button
          onClick={onCancel}
          className="flex-1 flex items-center justify-center gap-1.5 text-sm text-gray-600
                     border border-gray-200 rounded-lg py-2 hover:bg-gray-50 transition-colors"
        >
          <X size={14} /> 取消
        </button>
        <button
          onClick={handleConfirm}
          className="flex-1 flex items-center justify-center gap-1.5 text-sm text-white
                     bg-blue-500 rounded-lg py-2 hover:bg-blue-600 transition-colors"
        >
          <Check size={14} /> 确认裁剪
        </button>
      </div>
    </div>
  )
}
