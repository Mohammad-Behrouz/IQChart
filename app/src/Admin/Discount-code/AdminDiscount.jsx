import React, { useState, useEffect } from 'react'
import Header from '../../Components/Header'
import alertify from 'alertifyjs'
import { div } from 'framer-motion/client'

const AdminDiscount = () => {
    const [discountCodes, setDiscountCodes] = useState([])


    useEffect(() => {
        const fetchDiscountCodes = async () => {
            const res = await fetch("https://localhost:7282/api/DiscountCode");
            const json = await res.json();
            setDiscountCodes(json)
        }

        fetchDiscountCodes();
    }, [])

    const deleteCode = async (id) => {
        console.log(id);

        const res = await fetch("https://localhost:7282/api/DiscountCode/" + id, {
            method: "Delete",

        })
        const json = await res.json()
        if (res.ok) {
            alertify.success("با موفقیت حذف شد")
            setDiscountCodes(prev => prev.filter(x => x.discountCodeId !== id))
        } else {
            console.log(json)
            alertify.error("مشکی در سمت سرور پیش آمده")
        }
    }

    const submitDiscount = async (e) => {
        e.preventDefault()

        const form = e.target
        const discountCode = form.discountCode.value.trim()
        const discountPercent = form.discountPercent.value.trim()

        if (!discountCode || !discountPercent) {
            alertify.error("همه فیلدها را پر کنید")
            return
        }
        if (parseInt(discountPercent) > 100 || parseInt(discountPercent) < 0) {
            alertify.error("درصد تخفیف باید بین 0 تا 100 باشد")
            return;
        }

        const formData = new FormData()
        formData.append("discountCode", discountCode)
        formData.append("discountPercent", discountPercent)


        const response = await fetch('https://localhost:7282/api/DiscountCode', {
            method: 'POST',
            body: formData
        })

        const json = await response.json()
        if (response.ok) {
            alertify.success("کد تخفیف ثبت شد")
            setDiscountCodes(prev => [...prev, json])
            form.reset()
        } else {
            alertify.error(`${json.message}`)
        }

    }
    return (
        <>
            <Header title="کد تخفیف" />
            <div className='discount-container'>
                <div id='didcount-form-container'>
                    <form onSubmit={submitDiscount}>
                        <h3>افزودن کد تخفیف جدید</h3>
                        <div className='commonInput'>
                            <i className="fa-solid fa-input-text"></i>
                            <input type="text" name="discountCode" placeholder='کد تخفیف' />
                        </div>
                        <div className='commonInput'>
                            <i className="fa-solid fa-badge-percent"></i>
                            <input type="text" name="discountPercent" placeholder='درصد تخفیف' />
                        </div>

                        <button type="submit">افزودن</button>


                    </form>
                </div>
                <div className='discount-code-display'>
                    {discountCodes.map((x, index) => {
                        return (
                            <div key={index} className='discount-code-display-div'>
                                <div>
                                    <span> کد تخفیف : <b>{x.discountCode}</b></span>
                                    <span>  درصد تخفیف : <b>{x.discountPercent}</b></span>
                                </div>
                                <button onClick={() => deleteCode(x.discountCodeId)}><i className='fa-solid fa-trash'></i></button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default AdminDiscount