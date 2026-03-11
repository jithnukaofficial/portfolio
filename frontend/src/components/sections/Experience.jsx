import { useReveal } from '../../hooks/useReveal'
import { experience } from '../../utils/data'

export default function Experience() {
  const t = useReveal()
  return (
    <section id="experience" className="py-28 px-8 bg-bg2">
      <div className="max-w-6xl mx-auto">
        <div ref={t.ref} style={t.style}>
          <div className="section-label">03 / Experience</div>
          <h2 className="section-title">Work <em className="font-serif italic text-accent">History</em></h2>
        </div>
        <div className="relative">
          <div className="absolute left-[120px] top-0 bottom-0 w-px bg-gradient-to-b from-accent to-transparent hidden md:block" />
          <div className="space-y-14">
            {experience.map((job, i) => {
              const { ref, style } = useReveal(0.12, i * 0.1)
              return (
                <div key={job.id} ref={ref} style={style} className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-6 md:gap-12 relative">
                  <div className="md:text-right text-[0.65rem] text-muted leading-relaxed tracking-wider pt-1 whitespace-pre-line">
                    {job.period.replace(' – ', '\n')}
                  </div>
                  <div className="absolute hidden md:block top-1.5 rounded-full"
                       style={{ left: 'calc(120px - 6px)', width: 13, height: 13, background: job.color, boxShadow: `0 0 18px ${job.color}` }} />
                  <div className="md:pl-12">
                    {job.isCurrent && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 border text-[0.62rem] tracking-[0.1em] uppercase"
                           style={{ background: 'rgba(0,255,157,0.08)', borderColor: 'rgba(0,255,157,0.25)', color: '#00ff9d' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-accent2" style={{ animation: 'pulseGlow 2s ease-in-out infinite' }} />
                        Current Role
                      </div>
                    )}
                    <div className="font-syne font-bold text-lg text-text mb-1">{job.company}</div>
                    <div className="text-[0.7rem] tracking-[0.15em] uppercase mb-4" style={{ color: job.color }}>{job.role}</div>
                    <ul className="space-y-2">
                      {job.points.map((pt, j) => (
                        <li key={j} className="text-muted text-sm leading-relaxed pl-5 relative before:content-['▹'] before:absolute before:left-0 before:text-accent">{pt}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
