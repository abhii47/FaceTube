import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './pages/Login'
import Home from './pages/Home'
import { Register } from './pages/Register'
import { Feed } from './components/layout/Feed'
import { Profile } from './components/layout/Profile'
import Watch from './pages/Watch'
import MyVideo from './components/layout/Video'
import UploadVideo from './components/form/Upload'

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Nested Routing for Home */}
        <Route path="/home" element={<Home />}>
          {/* Default feed when visiting /home */}
          <Route index element={<Feed />} />
          {/* Add other child routes here when ready */}
          <Route path="videos" element={<MyVideo />} />
          <Route path="profile" element={<Profile />} />
          <Route path="upload" element={<UploadVideo />} />
        </Route>
        
        <Route path="/register" element={<Register />} />
        <Route path="/watch/:videoId" element={<Watch />} />
        
        {/* Redirect root path to home */}
        <Route index element={<Navigate to="/home" />} />
      </Routes>
    </>
  )
}

export default App;
