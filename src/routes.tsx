import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Gemini from "./pages/Gemini";
import Home from "./pages/Home";
import Three from "./pages/ThreeJS";
import Login from "./pages/AiHome/Login";
import Register from "./pages/AiHome/Register";
import AiHome from "./pages/AiHome";

export const router = createBrowserRouter(
  createRoutesFromElements( 
    <>
      <Route path="/" element={<Home />}></Route>
      <Route path="/gemini" element={<Gemini />}></Route>
      <Route path="/threejs" element={<Three />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/ai-home" element={<AiHome />}></Route>
    </>
  )
);
