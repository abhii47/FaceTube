import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './pages/Login'
import Home from './pages/Home'
import { Register } from './pages/Register'
import { Feed } from './components/layout/Feed'
import { Profile } from './pages/Profile'

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />}>
          <Route index element={<Feed />} />
          {/* <Route path="video" element={<VideoPlayer />} /> */}
          {/* <Route path="upload" element={<UploadVideo />} /> */}
          <Route path='profile' element={<Profile />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
