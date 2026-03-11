import { useReveal } from '../../hooks/useReveal'
import { achievements } from '../../utils/data'

export default function Achievements() {
  const t = useReveal()
  return (
    <section id="achievements" className="py-28 px-8 bg-bg2">
      <div className="max-w-6xl mx-auto">
        <div ref={t.ref} style={t.style}>
          <div className="section-label">07 / Recognition</div>
          <h2 className="section-title">Key <em className="font-serif italic text-accent">Achievements</em></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {achievements.map((a, i) => {
            const { ref, style } = useReveal(0.12, i * 0.1)
            return (
              <div key={a.title} ref={ref} style={style}
                   className="bg-surface border border-border p-6 flex gap-4 hover:border-accent2 transition-all duration-300">
                <span className="text-3xl flex-shrink-0">{a.icon}</span>
                <div>
                  <div className="font-syne font-bold text-base mb-2">{a.title}</div>
                  <div className="text-muted text-sm leading-relaxed">{a.desc}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
