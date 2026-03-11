import { useForm } from 'react-hook-form'
import { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { personal, references } from '../utils/data'
import { useReveal } from '../hooks/useReveal'

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()
  const [sent, setSent] = useState(false)
  const t = useReveal()

  const onSubmit = async (data) => {
    try {
      await axios.post('/api/contact', data)
      toast.success("Message sent! I'll get back to you soon.")
      setSent(true)
      reset()
      setTimeout(() => setSent(false), 6000)
    } catch (err) {
      toast.error('Something went wrong. Please try again or email directly.')
    }
  }

  const contactItems = [
    { icon: '📞', label: 'Phone', value: personal.phone, href: `tel:${personal.phone}` },
    { icon: '✉️', label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
    { icon: '💼', label: 'LinkedIn', value: 'Jithnuka Athurugiriya', href: personal.linkedin },
    { icon: '🐙', label: 'GitHub', value: 'jithnukaofficial', href: personal.github },
    { icon: '📍', label: 'Location', value: personal.location, href: null },
  ]

  return (
    <main className="pt-28 pb-20 px-8 min-h-screen relative grid-bg">
      <div className="noise-overlay absolute inset-0" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={t.ref} style={t.style}>
          <div className="section-label">08 / Contact</div>
          <h1 className="section-title">Let's <em className="font-serif italic text-accent">Connect</em></h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Info */}
          <div>
            <h3 className="font-syne font-bold text-2xl mb-4">Open to opportunities &amp; collaborations</h3>
            <p className="text-muted text-sm leading-relaxed mb-8">
              Whether you're looking to hire, collaborate on a project, or just want to say hello — my inbox is always open. I respond to all messages.
            </p>
            <div className="space-y-3">
              {contactItems.map((item) => (
                item.href ? (
                  <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined}
                     rel="noopener noreferrer"
                     className="flex items-center gap-4 px-5 py-4 bg-surface border border-border hover:border-accent hover:translate-x-1.5 transition-all duration-300 text-sm">
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <div className="text-[0.6rem] tracking-[0.15em] uppercase text-muted mb-0.5">{item.label}</div>
                      <div className="text-text">{item.value}</div>
                    </div>
                  </a>
                ) : (
                  <div key={item.label} className="flex items-center gap-4 px-5 py-4 bg-surface border border-border text-sm">
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <div className="text-[0.6rem] tracking-[0.15em] uppercase text-muted mb-0.5">{item.label}</div>
                      <div className="text-text text-xs">{item.value}</div>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[0.62rem] tracking-[0.2em] uppercase text-muted mb-2">Name *</label>
                <input {...register('name', { required: 'Name is required' })}
                  className="form-field" placeholder="Your Name" />
                {errors.name && <p className="text-accent3 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-[0.62rem] tracking-[0.2em] uppercase text-muted mb-2">Email *</label>
                <input {...register('email', { required: 'Email required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' } })}
                  className="form-field" placeholder="you@email.com" />
                {errors.email && <p className="text-accent3 text-xs mt-1">{errors.email.message}</p>}
              </div>
            </div>
            <div>
              <label className="block text-[0.62rem] tracking-[0.2em] uppercase text-muted mb-2">Subject *</label>
              <input {...register('subject', { required: 'Subject is required' })}
                className="form-field" placeholder="What's this about?" />
              {errors.subject && <p className="text-accent3 text-xs mt-1">{errors.subject.message}</p>}
            </div>
            <div>
              <label className="block text-[0.62rem] tracking-[0.2em] uppercase text-muted mb-2">Message *</label>
              <textarea {...register('message', { required: 'Message required', minLength: { value: 20, message: 'At least 20 characters' } })}
                className="form-field min-h-[140px] resize-none" placeholder="Tell me more..." />
              {errors.message && <p className="text-accent3 text-xs mt-1">{errors.message.message}</p>}
            </div>
            <button type="submit" disabled={isSubmitting}
                    className="btn-primary w-full justify-center disabled:opacity-60">
              {isSubmitting ? 'Sending...' : sent ? '✓ Sent!' : 'Send Message →'}
            </button>
          </form>
        </div>

        {/* References */}
        <div>
          <div className="section-label mb-8">References</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {references.map((ref) => (
              <div key={ref.name} className="bg-surface border border-border p-5 hover:border-accent transition-all duration-300">
                <div className="font-syne font-bold text-sm mb-1">{ref.name}</div>
                <div className="text-accent text-xs mb-0.5">{ref.role}</div>
                <div className="text-muted text-xs mb-3">{ref.company}</div>
                <a href={`tel:${ref.phone}`} className="text-xs text-muted hover:text-accent transition-colors block">{ref.phone}</a>
                <a href={`mailto:${ref.email}`} className="text-xs text-muted hover:text-accent transition-colors block break-all">{ref.email}</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
