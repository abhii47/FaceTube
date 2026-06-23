import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './pages/Login'
import Home from './pages/Home'
import { Register } from './pages/Register'

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
