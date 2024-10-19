import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Signup from "./pages/Signup/signup"
import Login from "./pages/Login/login"
import Home from "./pages/Home/home"
import Mylist from "./pages/Daftar Saya/daftarsaya"
import Detail from "./pages/Detail/Detail"
import { MovieListProvider } from "./MovieListContext";

function App() {

  return (
    <MovieListProvider>
   <Router>
    <Routes>
      <Route path="login" element={<Login/>}> </Route>
      <Route path="signup" element={<Signup/>}> </Route>
       <Route path="/" element={<Home/>}> </Route>
       <Route path="daftarsaya" element={<Mylist/>}> </Route> 
       <Route path="/detail/:index" element={<Detail />} > </Route>
    </Routes>
   </Router>
   </MovieListProvider>
  )
}

export default App
