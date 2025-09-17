
import { tr } from 'framer-motion/client';
import Header from '../../Components/Header';
// import Video from '@/Components/Video';
import React, { useEffect, useState } from 'react'

const AdminUsers = () => {
  const [userNumber, setUserNumber] = useState(0);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await fetch("https://localhost:7282/api/users/all")
      const json = await users.json()
      
      setUsers(json)
      setUserNumber(json.length)
      setIsLoading(false)
    }
    fetchUsers()
  }, [])


  return (
    <>
      <Header title="کاربران سایت" />
      <div id='header-of-admin-users'>
        <div id='number-of-users' className='box-admin'>
          <img src="/Images/admin/users.png" alt="" />
          <div>
            <h5>تعداد کاربران</h5>
            <h2>{userNumber}</h2>
          </div>
        </div>
        <div id='add-block-div' >
          <div className="box-admin" id="add-user-box"></div>
          <div className="box-admin" id="users-block-list"></div>
        </div>
      </div>
      <section id='admin-user-section-1'>
        <div id='admin-user-section-1-div'>
          <div>
            <ul className="users-list">
              <li>آیدی</li>
              <li>نام کاربر</li>
              <li>شماره تلفن </li>
              <li>ایمیل</li>
              <li>عملیات</li>
            </ul>
          </div>
          <table className='table-show-users'>
            <tbody >
              {users.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.userName}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.email ?? '-'}</td>
                    <td className='trash-and-edit-for-admin-users'>
                      <button><i className="fa-solid fa-edit"></i></button>
                      <button><i className="fa-solid fa-trash"></i></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )


}

export default AdminUsers