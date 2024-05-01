// eslint-disable-next-line no-unused-vars
import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

export default App


// why this attraction has no end and how it will end and all that
// 