
import Nav from '../Components/Nav';
import React, { useState, useEffect } from 'react';
import "../styles/login.css";
import alertify from 'alertifyjs';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [errorMsg, setErrorMsg] = useState({});
   

    
    const isValidPhoneNumber = (phone) => {
        const regex = /^09\d{9}$/;
        return regex.test(phone);
    };

    async function submitSignUp(event) {
        event.preventDefault();

        const form = event.target;

        if (
            form.elements.UserName.value === "" || 
            form.elements.Phone.value === "" ||
            form.elements.Password.value === "" ||
            form.elements.ConfirmPassword.value === ""
        ) {
            alertify.error("لطفا مقادیر مدنظر را پرکنید");
            return;
        }

        if(form.elements.Password.value.length < 6){
            alertify.error(" ! پسورد نباید کمتر از 6 کارکتر باشه ");
            return;
        }
        
        if(form.elements.ConfirmPassword.value != form.elements.Password.value){
            alertify.error(" ! پسورد با تکرارش تطابق ندارد ");
            return;
        }
        

        try {
            const data = new FormData();
            data.append('UserName', form.elements.UserName.value);
            data.append('Phone', form.elements.Phone.value);
            data.append('Password', form.elements.Password.value);
            data.append('ConfirmPassword', form.elements.ConfirmPassword.value);

            const res = await fetch('https://localhost:7282/api/auth/register', {
                method: 'POST',
                body : data
            });
            console.log(res);
            
            if (!res.ok) {
                const json = await res.json().catch(() => ({}));
                setErrorMsg(json.errors || { general: ['خطایی رخ داده است'] });
                alertify.error('! خطا در ثبت نام');
                alertify.error('! اگر اکانت دارید لطفا وارد شوید');
                console.log(errorMsg);
                
            } else {
                setErrorMsg({});
                alertify.success('ثبت‌نام با موفقیت انجام شد');
                alertify.success('لطفا وارد شوید');
            }
        } catch (error) {
            console.error('خطا در ارسال درخواست:', error);
            setErrorMsg({ general: ['ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید.'] });
            alertify.error('ارتباط با سرور برقرار نشد!');
        }
    }
    
    return (
        <>
        <Nav/>
            <div id="login-container">
                <div id="login-div">
                    <div id="signUp-SubDiv">
                        <img src="/Images/logo-vertical.png" alt="" />
                    </div>
                    <div id="login-SubDiv">
                        <h3>ثبت نام</h3>
                        <form onSubmit={submitSignUp}>
                            <div>
                                <input type="text" placeholder='نام کاربری' name='UserName' />
                                <i className="fa-solid fa-at"></i>
                            </div>
                            <div>
                                <input type="text" placeholder="شماره تلفن" name="Phone" />
                                <i className="fa-solid fa-phone"></i>
                            </div>
                            <div>
                                <input type="password" placeholder="رمز عبور" name="Password" />
                                <i className="fa-solid fa-lock"></i>
                            </div>
                            <div>
                                <input type="password" placeholder="تکرار رمز عبور" name="ConfirmPassword" />
                                <i className="fa-solid fa-lock"></i>
                            </div>

                            <button type="submit" className="common-button" style={{ width: '70%' }}>
                                ثبت نام
                            </button>
                        </form>
                        <span style={{ color: 'black', fontSize: '12px' }}>
                            اکانت داری؟{' '}
                            <Link to="/" style={{ fontSize: '14px', fontWeight: 'bold', color: '#000f51' }}>
                                ورود
                            </Link>
                        </span>
                    </div> 
                </div>
            </div>
        </>
    );
};

export default SignUp;