import { useReveal } from '../../hooks/useReveal'
import { leadership } from '../../utils/data'

export default function Leadership() {
  const t = useReveal()
  return (
    <section id="leadership" className="py-28 px-8">
      <div className="max-w-6xl mx-auto">
        <div ref={t.ref} style={t.style}>
          <div className="section-label">06 / Involvement</div>
          <h2 className="section-title">Leadership <em className="font-serif italic text-accent">&amp; Volunteering</em></h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {leadership.map((item, i) => {
            const { ref, style } = useReveal(0.12, i * 0.07)
            return (
              <div key={item.title} ref={ref} style={style}
                   className="bg-surface border border-border p-5 flex items-start gap-4 hover:border-accent hover:bg-[#111d28] transition-all duration-300">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <div className="font-syne font-semibold text-sm mb-1">{item.title}</div>
                  <div className="text-accent text-xs">{item.org}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
