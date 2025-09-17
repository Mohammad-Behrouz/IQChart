import React from 'react'
import Nav from '../Components/Nav'
import { Outlet } from 'react-router-dom'
import UserMenu from '../Components/UserMenu'
import "../styles/user.css"
const UserPanel = () => {

  return (
    <>
      <Nav />
      <UserMenu />
      <Outlet />
    </>
  )
}

export default UserPanel
