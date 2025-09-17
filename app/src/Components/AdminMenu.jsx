import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/admin.css";

function AdminMenu() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className={`admin-panel-nav ${isOpen ? 'open-nav' : ''}`}>

            <button
                className={`hamburger ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <ul className="layoutListUl">
                <li className="layoutListLi">
                    <Link to="/admin/users">
                        <i className="fa-solid fa-users"></i>
                        <span>کاربران</span>
                    </Link>
                </li>
                <li className="layoutListLi">
                    <Link to="/admin/messages">
                        <i className="fa-solid fa-messages"></i>
                        <span>پیام ها</span>
                    </Link>
                </li>
                <li className="layoutListLi">
                    <Link to="/admin/plans">
                        <i className="fa-solid fa-crown"></i>
                        <span>اشتراک ها</span>
                    </Link>
                </li>
                 <li className="layoutListLi">
                    <Link to="/admin/discount-code">
                        <i className="fa-solid fa-percent"></i>
                        <span>کد تخفیف</span>
                    </Link>
                </li>
                <li className="layoutListLi">
                    <Link to="/admin/products">
                        <i className="fa-solid fa-box"></i>
                        <span>محصولات</span>
                    </Link>
                </li>
                <li className="layoutListLi">
                    <Link to="/admin/articles">
                        <i className="fa-solid fa-graduation-cap"></i>
                        <span>مقالات</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default AdminMenu;
