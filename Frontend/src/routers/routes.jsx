import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import RequireAuth from "../components/RequireAuth"


const ROLES = {
  'User': 'Usuario',
  'Owner': 'Propietario',
  'Admin': 'Administrador'
}

export function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}
