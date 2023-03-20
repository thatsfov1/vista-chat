import {Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import Chats from "./components/Chats";

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/chats' element={<Chats/>} />
      </Routes>
    </div>
  )
}

export default App
