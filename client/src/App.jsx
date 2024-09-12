import React from 'react'
import path from './utils/path'
import { Route, Routes } from "react-router-dom";
import { Login, Home, Public} from "./pages/guest";

const App = () => {
  return (
    <div className="min-h-screen font-main">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />}></Route>
        </Route>
        <Route path={path.LOGIN} element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App
