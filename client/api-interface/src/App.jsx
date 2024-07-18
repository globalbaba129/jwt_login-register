import "./App.css";
import Login from "./auth/login";
import Register from "./auth/register";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Register/>
    
    <Login/>
    </>
  )
}

export default App
