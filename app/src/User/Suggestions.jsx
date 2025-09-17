import { useEffect } from "react"
import React, { useState } from 'react'
import alertify from "alertifyjs";

const Suggestions = () => {
  const [suggestion, setSuggestion] = useState("");

  const submitSuggestion = async () => {
    if (suggestion.trim() == "" || suggestion == null) {
      alertify.error("لطفا متن انتقاد یا پیشنهاد خود را خالی نگذارید")
      return
    }

    try {
      const res = await fetch("https://localhost:7282/api/FeedBack", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: suggestion,
          UserId: 0
        })
      })

      const json = await res.json()
      if (res.ok) {
        alertify.success("پیشنهادات و انتقادات شما با موفقیت در سیستم ثبت شدند")
        setTimeout(() => {
          alertify.success("امید است نظرات سازنده شما در راستای بهبود شرایط سایت استفاده شوند")
        }, 1000);
        setTimeout(() => {
          alertify.success("متشکریم از همراهی شما")
        }, 2000)
      } else {
        console.log(json);
        alertify.error("مشکلی در سمت سرور پیش آمده")
      }
    } catch (e) {
      console.log(e);

    }
  }
  return (
    <>
      <section className='center' id='suggestion-container'>
        <div className='suggestions-div'>
          <div id='textarea-container'>
            <div id='header-of-text-area'>
              <h4>متن نظرات</h4>
              <button onClick={() => submitSuggestion()}>ارسال</button>
            </div>
            <textarea onChange={(e) => setSuggestion(e.target.value)} placeholder='بنویسید ....' name="message" ></textarea>
          </div>
          <div className='center' id='explain-suggestions'>
            <h3>📬 انتقادات و پیشنهادات شما</h3>
            <p>
              در IQChart باور داریم که مسیر رشد و بهبود، از دل گفت‌وگوی سازنده با کاربران می‌گذره.
              اگر در استفاده از سرویس‌های ما با مشکلی مواجه شدید، یا ایده‌ای برای بهتر شدن پلتفرم دارید، بسیار خوشحال می‌شیم اون رو با ما در میون بگذارید.
              <br />
              ✅ انتقادات شما به ما کمک می‌کنه خطاها و نقاط ضعف رو سریع‌تر شناسایی کنیم. <br />
              ✅ پیشنهادات شما الهام‌بخش مسیر توسعه‌ی امکانات جدید خواهد بود.
              <br />
              ما تمام پیام‌ها رو با دقت مطالعه کرده و در تصمیم‌گیری‌های آینده لحاظ می‌کنیم.
              <br />
              📝 لطفاً نظرات خودتون رو از طریق این فرم برای ما ارسال کنید.

              با تشکر از همراهی شما — تیم IQChart</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Suggestions