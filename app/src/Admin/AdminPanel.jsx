import React from 'react'
import Nav from '../Components/Nav'
import { Outlet } from 'react-router-dom'
import AdminMenu from '../Components/AdminMenu'
const AdminPanel = () => {
  return (
    <>
      <Nav />
      <AdminMenu />
      <Outlet />
    </>
  )
}

export default AdminPanel