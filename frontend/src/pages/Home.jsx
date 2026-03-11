import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Skills from '../components/sections/Skills'
import Experience from '../components/sections/Experience'
import Education from '../components/sections/Education'
import Projects from '../components/sections/Projects'
import Leadership from '../components/sections/Leadership'
import Achievements from '../components/sections/Achievements'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Projects />
      <Leadership />
      <Achievements />
    </main>
  )
}
