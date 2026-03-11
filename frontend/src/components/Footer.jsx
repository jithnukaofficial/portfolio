import { personal } from '../utils/data'

export default function Footer() {
  return (
    <footer className="bg-bg2 border-t border-border px-8 py-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} <span className="text-accent">{personal.name}</span>. Built with React + Node.js.
        </p>
        <p className="text-xs text-muted tracking-widest uppercase">Operations Engineer · DevOps · Westminster '27</p>
      </div>
    </footer>
  )
}
