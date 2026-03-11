import { useInView } from 'react-intersection-observer'

export function useReveal(threshold = 0.12, delay = 0) {
  const { ref, inView } = useInView({ threshold, triggerOnce: true })
  const style = {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
  }
  return { ref, style }
}
