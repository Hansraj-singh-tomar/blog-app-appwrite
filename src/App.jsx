// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react'
import Header from './components/Header'
import Footer from './pages/Footer'
import { Outlet } from 'react-router-dom'
import authService from './appwrite/auth'
import { useDispatch } from 'react-redux'
import { login, logout } from './store/authSlice'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
  }, [])

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App

// fvgio8aze




