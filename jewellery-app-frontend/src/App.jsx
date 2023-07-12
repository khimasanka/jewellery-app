import './App.css'
import Login from './components/auth/Login.jsx'
import Dashboard from "./components/dashboard/Dashboard";
import {Route, Routes} from "react-router-dom";
import Items from "./components/dashboard/Items/Items.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/dashboard" element={<Dashboard/>}>
        <Route index element={<Login />} />
        <Route path="items" element={<Items />} />
      </Route>
    </Routes>
  )
}

export default App
