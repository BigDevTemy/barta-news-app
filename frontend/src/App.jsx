import { useState } from 'react'

import './App.css'
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import Layout from './components/layout/homepage'
import Home from './components/PageOutlets/Home'
import Register from './components/PageOutlets/Register'
import Login from './components/PageOutlets/Login'
import Settings from './components/PageOutlets/Settings'
function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}/>
        <Route path='register/user' element={<Register />}/>
        <Route path='user/login' element={<Login />}/>
        <Route path='user/settings' element={<Settings />}/>
      </Route>

    </Routes>
  </BrowserRouter>
    </>
  )
}

export default App
