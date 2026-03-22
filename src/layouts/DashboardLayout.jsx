// src/layouts/DashboardLayout.jsx
import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import "./DashboardLayout.css"; // import responsive CSS

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // TODO: Replace with actual authenticated user
  const user = { role: "vendor_owner", name: "Vendor Name" };

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Products", path: "/dashboard/products", roles: ["vendor_owner", "staff"] },
    { name: "Orders", path: "/dashboard/orders", roles: ["vendor_owner", "staff"] },
    { name: "Settings", path: "/dashboard/settings", roles: ["vendor_owner"] },
  ];

  const allowedMenuItems = menuItems.filter(
    (item) => !item.roles || item.roles.includes(user.role)
  );

  return (
    <div className="dashboard-layout">
      {/* Hamburger for mobile */}
      <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
        ☰
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <h2>Azania Vendor</h2>
        <nav>
          {allowedMenuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => (isActive ? "active-link" : "")}
              onClick={() => setSidebarOpen(false)} // auto-close on mobile
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <Outlet /> {/* nested routes */}
      </main>
    </div>
  );
};

export default DashboardLayout;