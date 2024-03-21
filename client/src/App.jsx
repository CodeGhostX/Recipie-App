import { BrowserRouter as Router ,Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import Create from "./pages/create"
import Auth from "./pages/auth"
import Saved from "./pages/Saved_recipie"
import Navbar from "./components/Navbar"

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="create" element={<Create />} />
        <Route path="auth" element={<Auth />} />
        <Route path="saved" element={<Saved />} />
      </Routes>
    </Router>
  )
}

export default App
