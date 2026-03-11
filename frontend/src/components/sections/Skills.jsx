import { useReveal } from '../../hooks/useReveal'
import { skills } from '../../utils/data'

export default function Skills() {
  const t = useReveal()
  return (
    <section id="skills" className="py-28 px-8 relative">
      <div className="max-w-6xl mx-auto">
        <div ref={t.ref} style={t.style}>
          <div className="section-label">02 / Capabilities</div>
          <h2 className="section-title">Technical <em className="font-serif italic text-accent">Arsenal</em></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((cat, i) => {
            const { ref, style } = useReveal(0.12, i * 0.08)
            return (
              <div key={cat.category} ref={ref} style={style}
                   className="bg-surface border border-border p-6 hover:border-accent hover:-translate-y-1 transition-all duration-300 group relative">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="flex items-center gap-3 text-accent text-xs tracking-[0.15em] uppercase mb-5 font-syne font-bold">
                  <span className="text-xl">{cat.icon}</span> {cat.category}
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.tags.map(tag => (
                    <span key={tag} className="skill-tag">{tag}</span>
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
