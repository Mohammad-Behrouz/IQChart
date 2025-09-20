import React from 'react'
import "../styles/user.css"
import { Link } from 'react-router-dom'


const UserMarkets = () => {

    const markets = [
        {
            src: "/svg/Bourse.svg",
            title: "بورس" , 
            href : "/Bourse"
        },
        {
            src: "/svg/tala.svg",
            title: "طلا" , 
            href : "/Gold"
        },
        {
            src: "/svg/bitcoin.svg",
            title: "کریپتو" , 
            href : "/"
        },
        {
            src: "/svg/car.svg",
            title: "خودرو" , 
            href : "/"
        },
        {
            src: "/svg/Forex.svg",
            title: "فارکس" , 
            href : "/"
        },
        {
            src: "/svg/dollar.svg",
            title: "بازار ارز" , 
            href : "/"
        },
    ]

    return (
        <>
            <div className='container-of-market-show'>
                <div className='container-of-market-show-div'>
                    {markets.map((market, index) => {
                        return (
                            <Link to={market.href} key={index} className='markets-div'>
                                <img src={market.src} alt="" />
                                <strong>{market.title}</strong>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default UserMarkets