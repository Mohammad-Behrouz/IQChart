
import Nav from '../Components/Nav'
import React, { useState, useEffect } from 'react'
import "../styles/login.css";
import { Link, useNavigate } from 'react-router-dom';
import alertify from 'alertifyjs';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    const [errorMsg, setErrorsMsg] = useState("")

    const navigate = useNavigate()

    const token = localStorage.getItem('jwt');

    if (token) {
        try {
            const decoded = jwtDecode(token);
            console.log(decoded);
        } catch (err) {
            console.error('توکن نامعتبره:', err);
        }
    }
    const isValidPhoneNumber = (phone) => {
        const regex = /^09\d{9}$/;
        return regex.test(phone);
    };

    const submitLogin = async (e) => {
        e.preventDefault()

        const form = e.target;

        if (
            form.elements.phone.value === "" ||
            form.elements.password.value === ""
        ) {
            alertify.error("لطفا مقادیر مدنظر را پرکنید");
            return;
        }

        if (form.elements.password.value.length < 6) {
            alertify.error(" ! پسورد نباید کمتر از 6 کارکتر باشه ");
            return;
        }

        const formData = new FormData(form)

        try {
            const res = await fetch("https://localhost:7282/api/auth/Login", {
                method: "POST",
                body: formData
            });
            const contentType = res.headers.get("content-type") || "";

            if (contentType.includes("application/json")) {
                const data = await res.json();
                if (res.ok) {
                    localStorage.setItem("jwt", data.token);
                    alertify.success("خوش آمدید");
                    setInterval(() => {
                        navigate("/user/suggestions")
                    }, 2000)
                } else {
                    alertify.error(data.error || data.message || "خطای لاگین");
                }
            } else {
                const text = await res.text();
                console.error("پاسخ غیر JSON از سرور:", text);
                alertify.error("خطای سرور: " + text);
            }


        } catch (error) {
            console.log("خطای سمت کلاینت:", error);
            alertify.error("ارتباط با سرور برقرار نشد");
        }


    }
    return (
        <>
            <Nav />
            <div id='login-container'>
                <div id="login-div">
                    <div id="login-SubDiv">
                        <h3>ورود | ثبت نام</h3>
                        <p>
                            ! سلام <br />
                            لطفا شماره تلفن خود را وارید نمایید
                        </p>
                        <form onSubmit={submitLogin}>

                            <div>
                                <input type="text" placeholder='شماره تلفن' name='phone' />
                                <i className="fa-solid fa-phone"></i>
                            </div>

                            <div>
                                <input type="text" placeholder='رمز عبور' name='password' />
                                <i className="fa-solid fa-lock"></i>
                            </div>
                            <span>{errorMsg}</span>
                            <button type='submit' className="common-button" style={{ width: "70%" }}>ورود</button>
                        </form>
                        <span style={{ color: "black", fontSize: "12px" }}>
                            اکانت نداری ؟&nbsp;
                            <Link to="/signUp" style={{ fontSize: "14px", fontWeight: "bold", color: "#000f51" }}>ثبت نام</Link>
                        </span>
                    </div>
                    <div id="signUp-SubDiv">
                        <img src="/Images/logo-vertical.png" alt="" />
                    </div>

                </div>
            </div>
        </>
    )
}

export default Login