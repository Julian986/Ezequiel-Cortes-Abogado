import './App.css'
import { Analytics } from '@vercel/analytics/react'
import Landing from './pages/Landing'

function App() {

  return (
    <>
        <Landing />
        <Analytics />
    </>
  )
}

export default App
