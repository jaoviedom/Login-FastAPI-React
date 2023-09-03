import { BrowserRouter } from 'react-router-dom'
// import Login from "./pages/Login"
import { MyRoutes } from './routers/routes'
import Header from './pages/Header'

function App() {

  return (
    <BrowserRouter>
      <Header title={"Sistema de login"} />
      <MyRoutes />
    </BrowserRouter>
  )
}

export default App
