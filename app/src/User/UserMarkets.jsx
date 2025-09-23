import React from 'react'
import "../styles/user.css"
import { Link } from 'react-router-dom'


const UserMarkets = () => {

    const markets = [
        {
            src: "/svg/Bourse.svg",
            title: "بورس" , 
            href : "/Bourse" ,
            style : {scale : "1.65"}
        },
        {
            src: "/svg/tala.svg",
            title: "طلا" , 
            href : "/Gold" , 
            style : {scale  : "1.5"}
        },
        {
            src: "/svg/bitcoin.svg",
            title: "کریپتو" , 
            href : "/Crypto"
        },
        {
            src: "/svg/car.svg",
            title: "خودرو" , 
            href : "/Car" , 
            style : {scale : 0.9}
        },
        {
            src: "/svg/Forex.svg",
            title: "فارکس" , 
            href : "/"
        },
        {
            src: "/svg/dollar.svg",
            title: "بازار ارز" , 
            href : "/Arz" , 
            style : {scale : 0.9}
        },
    ]

    return (
        <>
            <div className='container-of-market-show'>
                <div  className='container-of-market-show-div'>
                    {markets.map((market, index) => {
                        return (
                            <Link to={market.href} key={index} className='markets-div'>
                                <img style={market.style} src={market.src} alt="" />
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