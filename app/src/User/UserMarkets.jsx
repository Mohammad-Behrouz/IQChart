import React from 'react'
import "../styles/user.css"


const UserMarkets = () => {

    const markets = [
        {
            src: "/svg/Bourse.svg",
            title: "بورس"
        },
        {
            src: "/svg/tala.svg",
            title: "طلا"
        },
        {
            src: "/svg/bitcoin.svg",
            title: "کریپتو"
        },
        {
            src: "/svg/car.svg",
            title: "خودرو"
        },
        {
            src: "/svg/Forex.svg",
            title: "فارکس"
        },
        {
            src: "/svg/dollar.svg",
            title: "بازار ارز"
        },
    ]

    return (
        <>
            <div className='container-of-market-show'>
                <div className='container-of-market-show-div'>
                    {markets.map((market, index) => {
                        return (
                            <div key={index} className='markets-div'>
                                <img src={market.src} alt="" />
                                <strong>{market.title}</strong>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default UserMarkets