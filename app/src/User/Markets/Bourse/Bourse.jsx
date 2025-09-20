import React, { useEffect, useState } from 'react'
import "../../../styles/markets.css"
import LineChartForIndexBourse from "../../../Components/LineChartForIndexBourse"
import { Link } from 'react-router-dom';
const Bourse = () => {
    const [FarabourseInfo, setFaraBourseInfo] = useState([]);
    const [bourseInfo, setBourseInfo] = useState([]);
    const [HamWaznInfo, setHamWaznInfo] = useState([])
    const [BourseDataForChart, setBourseDataForChart] = useState([]);
    const [FaraBourseDataForChart, setFaraBourseDataForChart] = useState([]);
    const [HamWaznDataForChart, setHamWaznDataForChart] = useState([]);
    const [activeChart, setActiveChart] = useState('bourse'); // bourse, fara, hamwazn

    const [allBourseAssets, setAllBourseAssets] = useState()
    const [posneg, setPosNeg] = useState([0, 0])
    const [posWidth, setPosWidth] = useState(50);
    const [negWidth, setNegWidth] = useState(50);


    const [EffectivesBourse, setEffectivesBourse] = useState([])
    const [EffectivesFaraBourse, setEffectivesFaraBourse] = useState([])

    const [TopBourse, setTopBourse] = useState([])
    const [TopFaraBourse, setTopFaraBourse] = useState([])

    useEffect(() => {
        const fetchAllBourseAssets = async () => {
            try {
                const res = await fetch("https://cdn.tsetmc.com/api/ClosingPrice/GetMarketMap?market=0&size=1360&sector=0&typeSelected=1");
                const json = await res.json();
                setAllBourseAssets(json);
                calculatePosNegCounts(json)

            } catch (error) {
                console.error("خطا در دریافت اطلاعات بورس:", error);
                setAllBourseAssets([]);
            }
        }
        const fetchBourseBasics = async () => {
            try {
                const res = await fetch("https://cdn.tsetmc.com/api/Index/GetIndexB1LastAll/SelectedIndexes/1");
                const json = await res.json();

                if (Array.isArray(json.indexB1)) {
                    const selectedIndexes = [0, 4, 5, 6]
                        .map(i => json.indexB1[i])
                        .filter(Boolean); // حذف مقادیر undefined احتمالی

                    setBourseInfo(selectedIndexes);
                } else {
                    setBourseInfo([]);
                }
            } catch (error) {
                console.error("خطا در دریافت اطلاعات بورس:", error);
                setBourseInfo([]);
            }
        };
        const fetchEffectivesBourse = async () => {
            const res = await fetch("https://cdn.tsetmc.com/api/Index/GetInstEffect/0/1/7")
            const json = await res.json()
            setEffectivesBourse(json.instEffect)
        }
        const fetchEffectivesFaraBourse = async () => {
            const res = await fetch("https://cdn.tsetmc.com/api/Index/GetInstEffect/0/2/7")
            const json = await res.json()
            setEffectivesFaraBourse(json.instEffect)
        }
        const fetchTopBourse = async () => {
            const res = await fetch("https://cdn.tsetmc.com/api/ClosingPrice/GetTradeTop/MostVisited/1/7")
            const json = await res.json()
            setTopBourse(json.tradeTop)
        }
        const fetchTopFaraBourse = async () => {
            const res = await fetch("https://cdn.tsetmc.com/api/ClosingPrice/GetTradeTop/MostVisited/2/7")
            const json = await res.json()
            setTopFaraBourse(json.tradeTop)
        }
        const fetchHamWaznBasics = async () => {
            try {
                const res = await fetch("https://cdn.tsetmc.com/api/Index/GetIndexB1LastAll/SelectedIndexes/1");
                const json = await res.json();

                if (Array.isArray(json.indexB1)) {
                    const selectedIndexes = [2, 1, 3]
                        .map(i => json.indexB1[i])
                        .filter(Boolean); // حذف مقادیر undefined احتمالی

                    setHamWaznInfo(selectedIndexes);
                } else {
                    setHamWaznInfo([]);
                }
            } catch (error) {
                console.error("خطا در دریافت اطلاعات بورس:", error);
                setHamWaznInfo([]);
            }
        };
        const fetchFaraBourseBasics = async () => {
            try {
                const res = await fetch("https://cdn.tsetmc.com/api/Index/GetIndexB1LastAll/SelectedIndexes/2");
                const json = await res.json();

                if (Array.isArray(json.indexB1)) {
                    const selectedIndexes = [0, 1, 4, 5]
                        .map(i => json.indexB1[i])
                        .filter(Boolean); // حذف مقادیر undefined احتمالی

                    setFaraBourseInfo(selectedIndexes);
                } else {
                    setFaraBourseInfo([]);
                }
            } catch (error) {
                console.error("خطا در دریافت اطلاعات بورس:", error);
            }
        };
        const fetchData = async (url, setData) => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                const tempMap = new Map();

                json.indexB1
                    .filter(item => item.hEven <= 123000)
                    .forEach(item => {
                        const hEvenStr = item.hEven.toString().padStart(6, '0');
                        const hour = Number(hEvenStr.slice(0, 2));
                        const minute = Number(hEvenStr.slice(2, 4));
                        const second = Number(hEvenStr.slice(4, 6));
                        const secondsSinceMidnight = hour * 3600 + minute * 60 + second;
                        const value = item.xDrNivJIdx004 == null ? NaN : Number(item.xDrNivJIdx004);
                        tempMap.set(secondsSinceMidnight, { x: secondsSinceMidnight, c: value });
                    });

                const filteredData = Array.from(tempMap.values())
                    .filter(it => !Number.isNaN(it.c))
                    .sort((a, b) => a.x - b.x);

                setData(filteredData);
            } catch (error) {
                console.error('خطا در دریافت داده:', error);
            }
        };
        fetchTopBourse()
        fetchTopFaraBourse()
        fetchEffectivesBourse()
        fetchEffectivesFaraBourse()
        fetchAllBourseAssets()
        fetchHamWaznBasics()
        fetchFaraBourseBasics()
        fetchBourseBasics()
        fetchData('https://cdn.tsetmc.com/api/Index/GetIndexB1LastDay/32097828799138957', setBourseDataForChart);
        fetchData('https://cdn.tsetmc.com/api/Index/GetIndexB1LastDay/43685683301327984', setFaraBourseDataForChart);
        fetchData('https://cdn.tsetmc.com/api/Index/GetIndexB1LastDay/67130298613737946', setHamWaznDataForChart);
    }, []);


    const calculatePosNegCounts = (data) => {
        let pos = 0;
        let neg = 0;



        for (let i = 0; i < data.length; i++) {
            const diff = data[i].percent;
            if (diff > 0) pos++;
            else if (diff < 0) neg++;
        }

        setPosNeg([pos, neg]);

        // محاسبه درصدها
        const total = pos + neg;
        if (total > 0) {
            const posPercent = (pos / total) * 100;
            const negPercent = (neg / total) * 100;

            console.log(posPercent);
            console.log(negPercent);

            // برای انیمیشن با کمی تأخیر تغییر می‌دیم
            setTimeout(() => {
                setPosWidth(posPercent);
                setNegWidth(negPercent);
            }, 200);
        }
    };


    const renderChart = () => {
        switch (activeChart) {
            case 'bourse':
                return (
                    <>
                        <LineChartForIndexBourse data={BourseDataForChart} />
                        <div className='bourse-talar-table'>
                            <div className='index-bourse-thead'>
                                <span>بازار بورس</span>
                                <span>میزان</span>
                                <span>تغییرات</span>
                            </div>
                            <table className='indexes-table'>

                                <tbody>

                                    {bourseInfo.map((value, index) => (
                                        <tr key={index}>
                                            <td className='bourse-index-title'>{value.lVal30}</td>
                                            <td className='bourse-index-value'>{parseInt(value.xDrNivJIdx004).toLocaleString('fa-IR')}</td>
                                            <td className='bourse-index-change' style={{ color: value.indexChange > 0 ? "green" : "red" }}>
                                                {value.xVarIdxJRfV}%  ({parseInt(value.indexChange).toLocaleString()})
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )
            case 'fara':
                return (
                    <>
                        <LineChartForIndexBourse data={FaraBourseDataForChart} />
                        <div className='bourse-talar-table'>
                            <div className='index-bourse-thead'>
                                <span>بازار بورس</span>
                                <span>میزان</span>
                                <span>تغییرات</span>
                            </div>
                            <table className='indexes-table'>

                                <tbody>

                                    {FarabourseInfo.map((value, index) => (
                                        <tr key={index}>
                                            <td className='bourse-index-title' style={{ width: "47%" }}>{value.lVal30}</td>
                                            <td className='bourse-index-value'>{parseInt(value.xDrNivJIdx004).toLocaleString('fa-IR')}</td>
                                            <td className='bourse-index-change' style={{ color: value.indexChange > 0 ? "green" : "red" }}>
                                                {value.xVarIdxJRfV}%  ({parseInt(value.indexChange).toLocaleString()})
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )
            case 'hamwazn':
                return (
                    <>
                        <LineChartForIndexBourse data={HamWaznDataForChart} />
                        <div className='bourse-talar-table'>
                            <div className='index-bourse-thead'>
                                <span>بازار بورس</span>
                                <span>میزان</span>
                                <span>تغییرات</span>
                            </div>
                            <table className='indexes-table'>

                                <tbody>

                                    {HamWaznInfo.map((value, index) => (
                                        <tr key={index}>
                                            <td className='bourse-index-title' style={{ width: "47%" }}>{value.lVal30}</td>
                                            <td className='bourse-index-value'>{parseInt(value.xDrNivJIdx004).toLocaleString('fa-IR')}</td>
                                            <td className='bourse-index-change' style={{ color: value.indexChange > 0 ? "green" : "red" }}>
                                                {value.xVarIdxJRfV}%  ({parseInt(value.indexChange).toLocaleString()})
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )
            default:
                return null;
        }
    };

    return (
        <div className='container-of-Bourse'>
            <div className='first-chart-Bourse'>
                <div className='chart-buttons'>
                    <button
                        className={activeChart === 'hamwazn' ? 'active' : ''}
                        onClick={() => setActiveChart('hamwazn')}
                    >
                        هم وزن
                    </button>
                    <button
                        className={activeChart === 'fara' ? 'active' : ''}
                        onClick={() => setActiveChart('fara')}
                    >
                        فرابورس
                    </button>
                    <button
                        className={activeChart === 'bourse' ? 'active' : ''}
                        onClick={() => setActiveChart('bourse')}
                    >
                        بورس
                    </button>
                </div>
                <div className='chart-container'>
                    {renderChart()}
                </div>
            </div>
            <div className='show-pos-neg-num'>
                <div id='show-pos-neg-num-bazar-status'>
                    <span>
                        <i className='fa-solid fa-circle' style={{ color: "#ef4444" }}></i>
                        نماد های منفی
                    </span>
                    <strong>وضعیت بازار</strong>
                    <span>
                        نماد های مثبت
                        <i className='fa-solid fa-circle' style={{ color: "#16a34a" }}></i>
                    </span>
                </div>
                <div id="container-of-pos-neg-row">
                    <div id="pos-neg-row">
                        <div
                            id="neg-row"
                            style={{
                                width: `${negWidth}%`,
                                background: "#ef4444",
                                color: "#fff",
                                textAlign: "center",
                                transition: "width 1s ease"
                            }}
                        >
                            {posneg[1]}
                        </div>
                        <div
                            id="pos-row"
                            style={{
                                width: `${posWidth}%`,
                                background: "#16a34a",
                                color: "#fff",
                                textAlign: "center",
                                transition: "width 1s ease"
                            }}
                        >
                            {posneg[0]}
                        </div>
                    </div>
                </div>

            </div>

            {/* تاثیر گذار در شاخص */}
            <div className='effective-container'>
                <div className='index-bourse-thead'>
                    <span>موثر در بورس</span>
                    <span>قیمت پایانی</span>
                    <span>میزان تاثیر</span>
                </div>
                <table className='Effectives-table   indexes-table'>
                    <tbody>
                        {Array.isArray(EffectivesBourse) && EffectivesBourse.length > 0 ? (
                            EffectivesBourse.map((value, index) => (
                                <tr key={index}>
                                    <td className='bourse-index-title ' >
                                        <Link href={`/Bourse/${value.insCode}`}>
                                            {value.instrument?.lVal18AFC || "نام نامشخص"}
                                        </Link>
                                    </td>
                                    <td className='bourse-index-value'>
                                        {value.pClosing ? parseInt(value.pClosing).toLocaleString('fa-IR') : "-"}
                                    </td>
                                    <td
                                        className='bourse-index-change'
                                        style={{ color: value.instEffectValue > 0 ? "green" : "red" }}
                                    >
                                        {value.instEffectValue?.toLocaleString('fa-IR') ?? "-"}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="3">در حال بارگذاری اطلاعات...</td></tr>
                        )}


                    </tbody>
                </table>
            </div>
            <div className='effective-container'>
                <div className='index-bourse-thead'>
                    <span>موثر در فرابورس</span>
                    <span>قیمت پایانی</span>
                    <span>میزان تاثیر</span>
                </div>
                <table className='Effectives-table   indexes-table'>
                    <tbody>
                        {Array.isArray(EffectivesFaraBourse) && EffectivesFaraBourse.length > 0 ? (
                            EffectivesFaraBourse.map((value, index) => (
                                <tr key={index}>
                                    <td className='bourse-index-title ' >
                                        <Link href={`/Bourse/${value.insCode}`}>
                                            {value.instrument?.lVal18AFC || "نام نامشخص"}
                                        </Link>
                                    </td>
                                    <td className='bourse-index-value'>
                                        {value.pClosing ? parseInt(value.pClosing).toLocaleString('fa-IR') : "-"}
                                    </td>
                                    <td
                                        className='bourse-index-change'
                                        style={{ color: value.instEffectValue > 0 ? "green" : "red" }}
                                    >
                                        {value.instEffectValue?.toLocaleString('fa-IR') ?? "-"}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="3">در حال بارگذاری اطلاعات...</td></tr>
                        )}


                    </tbody>
                </table>
            </div>

            <div className='mobile-nazer-codal-div'>
                <Link to="/Bourse/nazer" className='button-nazer-codal'>
                    <i className='fa-solid fa-messages'></i>
                    <strong>پیام ناظر</strong>
                </Link>
                <Link to="/Bourse/codal" className='button-nazer-codal'>
                    <i className='fa-solid fa-newspaper'></i>
                    <strong>کدال</strong>
                </Link>
            </div>

            {/* پرتراکنش ها */}
            <div className='effective-container'>
                <div className='index-bourse-thead'>
                    <span>پرتراکنش بورس</span>
                    <span>قیمت پایانی</span>
                    <span>تغییر</span>
                </div>
                <table className='Effectives-table   indexes-table'>
                    <tbody>
                        {Array.isArray(TopBourse) && TopBourse.length > 0 ? (
                            TopBourse.map((value, index) => (
                                <tr key={index}>
                                    <td className='bourse-index-title ' >
                                        <Link href={`/Bourse/${value.insCode}`}>
                                            {value.instrument?.lVal18AFC || "نام نامشخص"}
                                        </Link>
                                    </td>
                                    <td className='bourse-index-value'>
                                        {value.pClosing ? parseInt(value.pClosing).toLocaleString('fa-IR') : "-"}
                                    </td>
                                    <td
                                        className='bourse-index-change'
                                        style={{ color: value.priceChange > 0 ? "green" : "red" }}
                                    >
                                        {((value.priceChange / value.priceFirst) * 100).toFixed(2)}% ({value.priceChange})
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="3">در حال بارگذاری اطلاعات...</td></tr>
                        )}


                    </tbody>
                </table>
            </div>
            <div className='effective-container'>
                <div className='index-bourse-thead'>
                    <span>پرتراکنش فرابورس</span>
                    <span>قیمت پایانی</span>
                    <span>تغییر</span>
                </div>
                <table className='Effectives-table   indexes-table'>
                    <tbody>
                        {Array.isArray(TopFaraBourse) && TopFaraBourse.length > 0 ? (
                            TopFaraBourse.map((value, index) => (
                                <tr key={index}>
                                    <td className='bourse-index-title ' >
                                        <Link href={`/Bourse/${value.insCode}`}>
                                            {value.instrument?.lVal18AFC || "نام نامشخص"}
                                        </Link>
                                    </td>
                                    <td className='bourse-index-value'>
                                        {value.pClosing ? parseInt(value.pClosing).toLocaleString('fa-IR') : "-"}
                                    </td>
                                    <td
                                        className='bourse-index-change'
                                        style={{ color: value.priceChange > 0 ? "green" : "red" }}
                                    >
                                        {((value.priceChange / value.priceFirst) * 100).toFixed(2)}% ({value.priceChange})
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="3">در حال بارگذاری اطلاعات...</td></tr>
                        )}


                    </tbody>
                </table>
            </div>
            <br /><br /><br /><br />
        </div >
    );
};

export default Bourse;