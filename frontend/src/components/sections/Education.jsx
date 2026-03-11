import { useReveal } from '../../hooks/useReveal'
import { education } from '../../utils/data'

export default function Education() {
  const t = useReveal()
  return (
    <section id="education" className="py-28 px-8">
      <div className="max-w-6xl mx-auto">
        <div ref={t.ref} style={t.style}>
          <div className="section-label">04 / Education</div>
          <h2 className="section-title">Academic <em className="font-serif italic text-accent">Background</em></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {education.map((e, i) => {
            const { ref, style } = useReveal(0.12, i * 0.1)
            return (
              <div key={e.institution} ref={ref} style={style}
                   className="bg-surface border border-border p-6 hover:border-accent transition-all duration-300 relative overflow-hidden group">
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-accent2 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
                <div className="text-[0.62rem] text-muted tracking-[0.2em] uppercase mb-3">{e.period}</div>
                <div className="font-syne font-bold text-base mb-2">{e.institution}</div>
                <div className="text-sm text-muted leading-relaxed mb-4">
                  {e.degree}
                  {e.note && <><br /><span className="text-xs opacity-70">{e.note}</span></>}
                </div>
                <span className="inline-block px-3 py-1 text-[0.62rem] tracking-[0.1em] uppercase text-accent border border-accent/20 bg-accent/5">{e.badge}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
