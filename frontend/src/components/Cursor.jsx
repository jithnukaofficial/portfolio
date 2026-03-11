import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const raf = useRef(null)

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top = e.clientY + 'px'
      }
    }
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px'
        ringRef.current.style.top = ring.current.y + 'px'
      }
      raf.current = requestAnimationFrame(animate)
    }
    const grow = () => {
      if (dotRef.current) dotRef.current.style.transform = 'translate(-50%,-50%) scale(2.5)'
      if (ringRef.current) { ringRef.current.style.width = '60px'; ringRef.current.style.height = '60px'; ringRef.current.style.opacity = '0.2' }
    }
    const shrink = () => {
      if (dotRef.current) dotRef.current.style.transform = 'translate(-50%,-50%) scale(1)'
      if (ringRef.current) { ringRef.current.style.width = '40px'; ringRef.current.style.height = '40px'; ringRef.current.style.opacity = '0.5' }
    }
    document.addEventListener('mousemove', move)
    document.querySelectorAll('a,button,input,textarea').forEach(el => {
      el.addEventListener('mouseenter', grow)
      el.addEventListener('mouseleave', shrink)
    })
    raf.current = requestAnimationFrame(animate)
    return () => {
      document.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="fixed w-3 h-3 bg-accent rounded-full pointer-events-none z-[9999]"
           style={{ transform: 'translate(-50%,-50%)', mixBlendMode: 'screen', transition: 'transform 0.1s' }} />
      <div ref={ringRef} className="fixed w-10 h-10 border border-accent rounded-full pointer-events-none z-[9998]"
           style={{ transform: 'translate(-50%,-50%)', opacity: 0.5, transition: 'width 0.3s, height 0.3s, opacity 0.3s' }} />
    </>
  )
}
