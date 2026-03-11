import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Cursor from './components/Cursor'
import SocialBar from './components/SocialBar'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <Router>
      <Cursor />
      <Navbar />
      <SocialBar />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#111820',
            color: '#e8f4f8',
            border: '1px solid #1e2d3d',
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.8rem',
          },
          success: { iconTheme: { primary: '#00ff9d', secondary: '#080c10' } },
          error: { iconTheme: { primary: '#ff6b35', secondary: '#080c10' } },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  )
}
