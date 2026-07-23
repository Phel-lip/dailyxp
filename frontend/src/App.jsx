import { Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import DailyXP from './pages/DailyXP'

function PrivateRoute({ children }) {

  const token = localStorage.getItem("token")

  return token
    ? children
    : <Navigate to="/login" replace />

}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/app" element={ <PrivateRoute> <DailyXP /> </PrivateRoute>} />
    </Routes>
  )
}

export default App