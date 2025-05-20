import React from 'react'
import Header from './Components/Header'
import Home from './Components/Home'
import Slider from './Components/Slider'
import Body from './Components/Body'
import Footer from './Components/Footer'
import About from './Components/About'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Faq from './Components/Faq'
import Contact from './Components/Contact'
import Courses from './Components/Courses'
import Register from './Components/Register'
import Login from './Components/Login'
import ChatBot from './Components/Chatbot'
import Scholarship from './Components/Scholarship'
import Profile from './Components/Profile'
import Settings from './Components/Settings'
import Dashboard from './Components/Dashboard'
import { AuthProvider } from './context/AuthContext'

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/faq' element={<Faq/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/courses/:id' element={<Courses/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/chatbot' element={<ChatBot/>}/>
          <Route path='/scholarship' element={<Scholarship/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/settings' element={<Settings/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
