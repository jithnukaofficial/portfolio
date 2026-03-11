import { useReveal } from '../../hooks/useReveal'
import { projects } from '../../utils/data'

export default function Projects() {
  const t = useReveal()
  return (
    <section id="projects" className="py-28 px-8 bg-bg2">
      <div className="max-w-6xl mx-auto">
        <div ref={t.ref} style={t.style}>
          <div className="section-label">05 / Projects</div>
          <h2 className="section-title">Featured <em className="font-serif italic text-accent">Work</em></h2>
        </div>
        <div className="max-w-2xl space-y-6">
          {projects.map((p, i) => {
            const { ref, style } = useReveal(0.12, i * 0.1)
            return (
              <div key={p.title} ref={ref} style={style}
                   className="bg-surface border border-border p-8 hover:-translate-y-1 transition-all duration-300 relative group"
                   style={{ borderTopColor: p.color }}>
                <div className="text-[0.62rem] tracking-[0.2em] uppercase mb-2" style={{ color: p.color }}>{p.type}</div>
                <div className="inline-flex items-center gap-2 text-[0.62rem] mb-3"
                     style={{ color: '#00ff9d', border: '1px solid rgba(0,255,157,0.25)', background: 'rgba(0,255,157,0.08)', padding: '2px 8px' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent2" style={{ animation: 'pulseGlow 2s infinite' }} />
                  {p.status}
                </div>
                <h3 className="font-syne font-bold text-xl mb-1">{p.title}</h3>
                <p className="text-sm mb-4" style={{ color: p.color + 'bb' }}>{p.subtitle}</p>
                <p className="text-muted text-sm leading-relaxed mb-5">{p.description}</p>
                <ul className="space-y-1.5 mb-6">
                  {p.points.map((pt, j) => (
                    <li key={j} className="text-muted text-sm pl-5 relative before:content-['▹'] before:absolute before:left-0 before:text-accent">{pt}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {p.stack.map(tag => (
                    <span key={tag} className="px-3 py-1 text-xs border"
                          style={{ background: `${p.color}10`, borderColor: `${p.color}30`, color: p.color }}>{tag}</span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
