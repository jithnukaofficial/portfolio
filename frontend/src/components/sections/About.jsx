import { useReveal } from '../../hooks/useReveal'
import { personal } from '../../utils/data'

export default function About() {
  const t = useReveal()
  return (
    <section id="about" className="py-28 px-8 bg-bg2">
      <div className="max-w-6xl mx-auto">
        <div ref={t.ref} style={t.style}>
          <div className="section-label">01 / About</div>
          <h2 className="section-title">Who <em className="font-serif italic text-accent">I Am</em></h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-5">
            {personal.bio.map((para, i) => {
              const { ref, style } = useReveal(0.12, i * 0.12)
              return (
                <p key={i} ref={ref} style={style} className="text-muted text-sm leading-[2]"
                   dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong class="text-text">$1</strong>') }} />
              )
            })}
            <p className="text-accent text-xs tracking-widest pt-2">📍 {personal.location}</p>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-px bg-border border border-border mb-6">
              {[['10+','Int\'l Operators'],['100%','Migration Success'],['15+','Sites Managed'],['6mo','To Promotion']].map(([n, l]) => (
                <div key={l} className="bg-surface px-6 py-6 hover:bg-[#151f2a] transition-colors">
                  <div className="font-syne font-black text-3xl text-accent leading-none">{n}</div>
                  <div className="text-[0.62rem] text-muted tracking-[0.15em] uppercase mt-2">{l}</div>
                </div>
              ))}
            </div>
            <div className="bg-surface border border-border p-6 space-y-3">
              <div className="text-[0.62rem] text-accent tracking-[0.2em] uppercase mb-3">Quick Contact</div>
              <a href={`tel:${personal.phone}`} className="flex items-center gap-3 text-sm text-muted hover:text-accent transition-colors">
                <span className="text-accent">📞</span> {personal.phone}
              </a>
              <a href={`mailto:${personal.email}`} className="flex items-center gap-3 text-sm text-muted hover:text-accent transition-colors break-all">
                <span className="text-accent">✉️</span> {personal.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
