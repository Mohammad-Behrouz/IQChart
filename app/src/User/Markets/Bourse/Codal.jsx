import React, { useEffect, useState } from 'react'
import Select from "react-select";
import { convertToShamsiWithTime } from '../../../javaScript/js';
const Codal = () => {
    const [allBourseAssets, setAllBourseAssets] = useState([]);
    const [selectedInsCode, setSelectedInsCode] = useState(null);


    const [options, setOptions] = useState([])
    useEffect(() => {
        const fetchAllBourseAssets = async () => {
            try {
                const res = await fetch(
                    "https://cdn.tsetmc.com/api/ClosingPrice/GetMarketMap?market=0&size=1360&sector=0&typeSelected=1"
                );
                const json = await res.json();

                const mapped = json?.map(item => ({
                    value: item.insCode,
                    label: `${item.lVal18AFC} - ${item.lVal30}`,
                })) || [];

                setAllBourseAssets(mapped);
                fetchCodalNews()
            } catch (error) {
                console.error("خطا در دریافت اطلاعات بورس:", error);
                setAllBourseAssets([]);
            }
        };

        fetchAllBourseAssets();
    }, []);

    useEffect(() => {
        fetchCodalNews()
    }, [selectedInsCode])
    const fetchCodalNews = async () => {

        if (selectedInsCode == null) {
            const res = await fetch("https://cdn.tsetmc.com/api/Codal/GetPreparedData/100");
            const json = await res.json()

            setOptions(json.preparedData)

        } else {
            console.log(selectedInsCode);

            const res = await fetch("https://cdn.tsetmc.com/api/Codal/GetPreparedDataByInsCode/100/" + selectedInsCode.value);
            const json = await res.json()

            setOptions(json.preparedData)
        }
    }

    const handleChange = (selectedOption) => {
        setSelectedInsCode(selectedOption); // حالا کل آبجکت را نگه می‌داریم
    };

    return (
        <div className='container-of-Bourse'>
            <h3>سامانه کدال</h3>

            <div className='search-box-for-assets-div'>
                <Select
                    options={allBourseAssets}
                    placeholder="نماد سهم را جست‌وجو کن..."
                    isSearchable
                    isClearable
                    value={selectedInsCode}      // ← کنترل‌شده
                    onChange={handleChange}
                    styles={{
                        control: (base) => ({
                            ...base,
                            backgroundColor: "#ffffffff",
                            borderColor: "#555",
                            color: "#fff",
                            minHeight: "50px",
                            boxShadow: "none",
                        }),
                        singleValue: (base) => ({
                            ...base,
                            color: "#000f51",
                            fontWeight: "bold",
                        }),
                        placeholder: (base) => ({
                            ...base,
                            color: "#aaa",
                        }),
                        input: (base) => ({
                            ...base,
                            color: "#000f51",         // رنگ متن هنگام تایپ کردن
                            fontSize: "18px",
                        }),
                        menu: (base) => ({
                            ...base,
                            backgroundColor: "#000f51",
                        }),
                        option: (base, state) => ({
                            ...base,
                            backgroundColor: state.isFocused ? "#000f51" : "#000f51",
                            color: "#fff",
                            cursor: "pointer",
                        }),
                    }}
                    noOptionsMessage={() => "چیزی پیدا نشد 😢"}
                />
            </div>

            <div id='codal-container'>
                {options.map((item, index) => {
                    const href = "https://cdn.tsetmc.com/api/Codal/GetContentFileByTracingNo/" + item.tracingNo + "/1";


                    return (
                        <div className='codal-Bourse-item' key={`sell-${index}`}>
                            <div id='cofal-Bourse-item-first-div'>
                                <p style={{ width: "40%" }}>
                                    <strong>نماد : </strong> {item.symbol}
                                </p>

                                <p >
                                    <strong>تاریخ : </strong> {convertToShamsiWithTime(item.publishDateTime_Gregorian)}
                                </p>
                            </div>

                            <p style={{ width: "100%" }}>
                                <strong>نام شرکت : </strong> {item.name}
                            </p>

                            <p>
                                <strong>موضوع :</strong> {item.title}
                            </p>

                            <p>
                                <strong>دنلود pdf : </strong>
                                <a href={href} target="_blank" rel="noopener noreferrer">
                                    <i className="fa-solid fa-file-pdf" style={{ color: "red" }}></i>
                                </a>
                            </p>
                            {/* <td className="codal-Bourse-td-data">{shamsiDate}</td>
                            <td className="codal-Bourse-td-title">{item.title}</td>
                            <td className="saham-count-show">
                                <a href={href} target="_blank" rel="noopener noreferrer">
                                    <i className="fa-solid fa-file-pdf"></i>
                                </a>
                            </td> */}
                        </div>
                    );
                })}

            </div>

        </div>
    );
};

export default Codal;
