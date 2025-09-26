import React, { useEffect, useState } from 'react'
import { api_token_sourceArena } from '../javaScript/api_sourceArena'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'
const SearchModal = ({ SearchOpen, setSearchOpen }) => {

    const [searchInput, setSearchInput] = useState("")
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)

    const [allAssets, setAllAssets] = useState([])
    const [filteredAssets, setAllFilteredAssets] = useState([])
    useEffect(() => {
        fetchData(selectedTabIndex);
    }, [selectedTabIndex]);
    // فیکس اساسی: استفاده از includes به جای contain و اضافه کردن allAssets به دیپندنسی
    useEffect(() => {
        const q = searchInput.trim().toLowerCase();
        if (!q) {
            setAllFilteredAssets(allAssets);
            return;
        }

        setAllFilteredAssets(
            allAssets.filter((item) => {
                // اگر item رشته یا عدد است
                if (typeof item === "string" || typeof item === "number") {
                    return item.toString().toLowerCase().includes(q);
                }
                // بررسی چند فیلد متداول (اسم، نماد، عنوان، ...)
                const fieldsToCheck = [
                    item?.name,
                    item?.symbol,
                    item?.title,
                    item?.shortName,
                    item?.code,
                ];
                for (const f of fieldsToCheck) {
                    if (f && f.toString().toLowerCase().includes(q)) return true;
                }
                // fallback: اگر ساختار نامعلومه (هشدار: stringify سنگینه برای آرایه‌های خیلی بزرگ)
                return JSON.stringify(item).toLowerCase().includes(q);
            })
        );

    }, [searchInput, allAssets]);
    const markets = [
        {
            market: "بورس", index: 0
        },
        {
            market: "طلا", index: 1
        },
        {
            market: "کریپتو", index: 2
        },
        {
            market: "فارکس", index: 3
        },
        {
            market: "ارز", index: 4
        }
    ]

    const handleChange = (e) => {
        setSearchInput(e.target.value)
    }
    const toggleSearch = () => setSearchOpen(!SearchOpen)

    const fetchData = async (number) => {
        switch (number) {
            case 0: {
                const res = await fetch("https://cdn.tsetmc.com/api/ClosingPrice/GetMarketMap?market=0&size=1360&sector=0&typeSelected=1")
                const json = await res.json()

                setAllAssets(json)
                break;
            }
            case 1: {

                const res = await fetch(api_token_sourceArena() + "&currency")
                const json = await res.json()
                setAllAssets(json.data)

                break;
            }
            case 2: {
                const res = await fetch(api_token_sourceArena() + "crypto_v2=all")
                const json = await res.json()
                setAllAssets(json.data)

                break;
            }
            case 3: {
                break;
            }
            case 4: {
                const res = await fetch(api_token_sourceArena() + "currency")
                const json = await res.json()
                setAllAssets(json.data)
            }
        }
    }
    return (
        <Modal
            isOpen={SearchOpen}
            onRequestClose={toggleSearch}
            className="searching-modal"
            contentLabel="Example Modal"
        >
            <h3>جست و جوی نماد</h3>
            <div className='input-search-box'>
                <i className='fa-solid fa-magnifying-glass'></i>
                <input value={searchInput} onChange={(e) => handleChange(e)} type="text" placeholder='جست و جو ...' />
            </div>
            <div className='tab-for-search'>
                {markets.map((m, index) => {
                    return (
                        <button key={index} onClick={() => { setSelectedTabIndex(m.index); setAllFilteredAssets([]); }} className={`search-tab-div ${m.index == selectedTabIndex ? "active-tab" : ""}`} >
                            {m.market}
                        </button>
                    )
                })}
            </div>

            <div className='show-filtered-search-item'>
                {filteredAssets.map((item, index) => {
                    if (selectedTabIndex == 0) {
                        return (
                            <Link to={`/Bourse/${item.insCode}`} className='bourse-search-div'>
                                <div id='name-of-company'>
                                    <span>
                                        <i className='fa-solid fa-square' style={{ color: item.qTotTran5J == 0 ? "#ef4444" : "#16a34a" }}></i>
                                        <strong>
                                            {item.lVal18AFC}
                                        </strong>

                                    </span>
                                    <span id='company-name'>{item.lVal30}</span>
                                </div>
                                <div id='name-of-copmany' style={{ direction: "ltr" }}>
                                    <span className='iran-sans-font'>{parseInt(item.pDrCotVal).toLocaleString("fa")}</span>
                                    <span className='iran-sans-font' style={{ color: item.percent < 0 ? "#ef4444" : "#16a34a", fontSize: "12px" }}>
                                        {item.percent.toLocaleString("fa")}% ({(parseInt(item.pDrCotVal) - parseInt(item.priceYesterday)).toLocaleString("fa")})
                                    </span>
                                </div>
                            </Link>
                        )
                    } else if (selectedTabIndex == 1) {
                        return (
                            <Link to={`/Gold/${item.insCode}`} className='bourse-search-div'>
                                <div id='name-of-company'>
                                    <span>
                                        <i className='fa-solid fa-square' style={{ color: item.change == 0 ? "#ef4444" : "#16a34a" }}></i>
                                        <strong>
                                            {item.name}
                                        </strong>

                                    </span>

                                </div>
                                <div id='name-of-copmany' style={{ direction: "ltr" }}>
                                    <span className='iran-sans-font'>{parseInt(item.price).toLocaleString("fa")}</span>
                                    <span className='iran-sans-font' style={{ color: item.change_percent < 0 ? "#ef4444" : "#16a34a", fontSize: "12px" }}>
                                        {parseFloat(item.change_percent).toLocaleString("fa")}% ({parseInt(item.change).toLocaleString("fa")})
                                    </span>
                                </div>
                            </Link>
                        )
                    } else if (selectedTabIndex == 2) {
                        return (
                            <Link style={{ direction: "ltr" }} to={`/Gold/${item.insCode}`} className='bourse-search-div'>
                                <div id='name-of-company' >
                                    <span>
                                        <i className='fa-solid fa-square' style={{ color: item.change == 0 ? "#ef4444" : "#16a34a" }}></i>
                                        <strong>
                                            {item.name}
                                        </strong>

                                    </span>

                                </div>
                                <div id='name-of-copmany' style={{ direction: "ltr" }}>
                                    <span className='iran-sans-font'>{parseInt(item.price).toLocaleString("fa")}</span>
                                    <span className='iran-sans-font' style={{ color: item.change_percent < 0 ? "#ef4444" : "#16a34a", fontSize: "12px" }}>
                                        {parseFloat(item.change_percent).toLocaleString("fa")}% ({parseInt(item.change).toLocaleString("fa")})
                                    </span>
                                </div>
                            </Link>
                        )
                    }
                    // else if (selectedTabIndex == 3) {
                    //   return (
                    //     <Link style={{direction : "ltr"}} to={`/Gold/${item.insCode}`}  className='bourse-search-div'>
                    //       <div id='name-of-company' >
                    //         <span>
                    //           <i className='fa-solid fa-square' style={{ color: item.change == 0 ? "#ef4444" : "#16a34a" }}></i>
                    //           <strong>
                    //             {item.name}
                    //           </strong>

                    //         </span>

                    //       </div>
                    //       <div id='name-of-copmany' style={{ direction: "ltr" }}>
                    //         <span className='iran-sans-font'>{parseInt(item.price).toLocaleString("fa")}</span>
                    //         <span className='iran-sans-font' style={{ color: item.change_percent < 0 ? "#ef4444" : "#16a34a", fontSize: "12px" }}>
                    //           {parseFloat(item.change_percent).toLocaleString("fa")}% ({parseInt(item.change).toLocaleString("fa")})
                    //         </span>
                    //       </div>
                    //     </Link>
                    //   )
                    // }
                    else if (selectedTabIndex == 4) {
                        return (
                            <Link to={`/Gold/${item.insCode}`} className='bourse-search-div'>
                                <div id='name-of-company' >
                                    <span>
                                        <i className='fa-solid fa-square' style={{ color: item.change == 0 ? "#ef4444" : "#16a34a" }}></i>
                                        <strong>
                                            {item.name}
                                        </strong>

                                    </span>

                                </div>
                                <div id='name-of-copmany' style={{ direction: "ltr" }}>
                                    <span className='iran-sans-font'>{parseInt(item.price).toLocaleString("fa")}</span>
                                    <span className='iran-sans-font' style={{ color: item.change_percent < 0 ? "#ef4444" : "#16a34a", fontSize: "12px" }}>
                                        {parseFloat(item.change_percent).toLocaleString("fa")}% ({parseInt(item.change).toLocaleString("fa")})
                                    </span>
                                </div>
                            </Link>
                        )
                    }
                })}

            </div>
            {/* <button onClick={toggleSearch}>بستن</button> */}
        </Modal>
    )
}

export default SearchModal