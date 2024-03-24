import React from 'react'

function Sidebar() {
    const { pathname } = window.location
    return (
        <div id="sidebar" className="active">
            <div className="sidebar-wrapper active">
                <div className="sidebar-header" style={{ marginBottom: '-1.5rem' }}>
                    <h1>
                        <a href="/" style={{ color: '#55BEFF', fontWeight: 'bold', fontSize: 50 }}>Admin</a>
                    </h1>
                </div>
                <div className="sidebar-menu">
                    <ul className="menu">
                        <li className={`sidebar-item ${pathname == "/" ? "active" : ""}`}>
                            <a href="/" className="sidebar-link">
                                <span>Dashboard</span>
                            </a>
                        </li>
                        <li className={`sidebar-item ${pathname == "/banners" ? "active" : ""}`}>
                            <a href="/banners" className="sidebar-link">
                                <span>Banners</span>
                            </a>
                        </li>
                        <li className={`sidebar-item ${pathname == "/categories" ? "active" : ""}`}>
                            <a href="/categories" className="sidebar-link">
                                <span>Categories</span>
                            </a>
                        </li>
                        <li className={`sidebar-item ${pathname == "/products" ? "active" : ""}`}>
                            <a href="/products" className="sidebar-link">
                                <span>Products</span>
                            </a>
                        </li>
                        <li className={`sidebar-item ${pathname == "/brands" ? "active" : ""}`}>
                            <a href="/brands" className="sidebar-link">
                                <span>Brands</span>
                            </a>
                        </li>
                        <li className={`sidebar-item ${pathname == "/user" ? "active" : ""}`}>
                            <a href="/user" className="sidebar-link">
                                <span>Users</span>
                            </a>
                        </li>
                        <li className={`sidebar-item ${pathname == "/order" ? "active" : ""}`}>
                            <a href="/order" className="sidebar-link">
                                <span>Orders</span>
                            </a>
                        </li>
                        <li className={`sidebar-item ${pathname == "/payment" ? "active" : ""}`}>
                            <a href="/payment" className="sidebar-link">
                                <span>Payments</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <button className="sidebar-toggler btn x"><i data-feather="x" /></button>
            </div>
        </div >
    )
}

export default Sidebar