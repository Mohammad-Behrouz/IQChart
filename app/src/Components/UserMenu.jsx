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
                        <Link to="/users/plans">
                            <i className="fa-solid fa-compass"></i>
                            <span>دیدبان</span>
                        </Link>
                    </li>
                    <li className="layoutListLi">
                        <Link to="/users/markets">
                            <i className="fa-solid fa-building-columns"></i>
                            <span>مارکت ها</span>
                        </Link>
                    </li>
                    <li className="layoutListLi">
                        <Link to="/users/plans">
                            <i className="fa-solid fa-chart-simple"></i>
                            <span>اشتراک ها</span>
                        </Link>
                    </li>

                    <li className="layoutListLi">
                        <Link to="/users/plans">
                            <i className="fa-solid fa-crown"></i>
                            <span>اشتراک ها</span>
                        </Link>
                    </li>

                    <li className="layoutListLi">
                        <Link to="/users/suggestions">
                            <i className="fa-solid fa-comments-question-check"></i>
                            <span>انتقادات      </span>
                        </Link>
                    </li>

                </ul>

                {/* <i className='fa-solid fa-door-open' style={{ color: "red", fontSize: "14px" }}></i> */}
        </nav>
    );
}

export default AdminMenu;
