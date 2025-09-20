

import React, { useEffect, useState } from 'react'
import SearchBox from './SearchBox';
import { Link } from 'react-router-dom'

export const Nav = () => {
  const [loggedIn, setLoggedIn] = useState("حساب کاربری")
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  // useEffect(()=>{
  //   const fetchLogin = async ()=>{
  //     var res = await fetch("https://localhost:7282/api/Login" ,{
  //       method : "get",
  //        credentials: "include"
  //     })
  //     var json =  await res.json()
  //     console.log(json.message);


  //     if(json.loggedIn == "y"){
  //       setLoggedIn(json.name.toString())
  //     }else if(json.loggedIn == "n"){
  //       setLoggedIn("حساب کاربری")
  //     }


  //   }

  //   fetchLogin()
  // },[])

  return (
    <>

      <header className="header">
        <div className='mobile-design'>
          <button className="hamburger-btn" onClick={toggleMenu}>
            <span className={`line ${isOpen ? 'line1-active' : ''}`} />
            <span className={`line ${isOpen ? 'line2-active' : ''}`} />
            <span className={`line ${isOpen ? 'line3-active' : ''}`} />
          </button>

          <img className='logo' src="/Images/IQChart_logo_rtl_white.png" alt="" />

          <Link className='search-button-for-mibile'>
            <i className='fa-solid fa-magnifying-glass'></i>
          </Link>

        </div>

        <div id='logo-and-ul-nav'>
          <img className='logo' src="/Images/IQChart_logo_rtl_white.png" alt="" />
          <ul>
            <li className='nav-li' ><Link href="/">صفحه اصلی</Link></li>
            <li className='nav-li drop-down-markets-li' style={{ cursor: 'pointer' }} >
              مارکت ها  &nbsp;<i className="fa-solid fa-chevron-down"></i>
              <div className="drop-down-markets nav-li">
                <ul>
                  <li><Link href="/Bourse"> <img src="/svg/Bourse.svg" className='svg-icon' /> بازار بورس</Link></li>
                  <li>  <Link href="/"><img src="/svg/Crypto.svg" className='svg-icon' />ارزدیجیتال</Link></li>
                  <li> <Link href="/"> <img src="/svg/tala.svg" className='svg-icon' />طلا و ارز</Link></li>
                  <li><Link href="/"> <img src="/svg/Forex.svg" className='svg-icon' />فارکس</Link></li>
                </ul>
              </div>
            </li>
            <li className='nav-li' ><Link href="/Shop">فروشگاه</Link></li>
            <li className='nav-li' ><Link href="/Analysis">تحلیل ها</Link></li>
            <li className='nav-li' ><Link href="/Plans">تعرفه ها</Link></li>
          </ul>
        </div>

        <div id='account-and-search-nav'>
          <Link href="Plan"><i className="fa-solid fa-star"></i>&nbsp; اشتراک</Link>
          <SearchBox />
          <Link href="login"><i className="fa-solid fa-user"></i>&nbsp;{loggedIn}</Link>
        </div>

      </header>

      <div className={`side-menu ${isOpen ? 'side-menu-open' : ''}`}>
        <ul>
          <li>خانه</li>
          <li>درباره ما</li>
          <li>خدمات</li>
          <li>تماس با ما</li>
        </ul>
      </div>
      <div onClick={toggleMenu} style={{display : isOpen?"block" : "none"}} className='overlay-for-menu-moblie' ></div>


      <div id='margin-div-for-nav' ></div>
    </>
  )
}

export default Nav;