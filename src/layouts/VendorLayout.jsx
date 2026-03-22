import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", path: "/vendor/dashboard" },
  { name: "Products", path: "/vendor/products" },
  { name: "Orders", path: "/vendor/orders" },
  { name: "Analytics", path: "/vendor/analytics" },
  { name: "Settings", path: "/vendor/settings" }
];

const VendorLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={styles.container}>

      {/* Sidebar */}
      <nav
        style={{
          ...styles.sidebar,
          width: sidebarOpen ? 220 : 60
        }}
      >
        <div style={styles.logo}>
          <h2 style={{ color: "white", fontSize: sidebarOpen ? 24 : 0, transition: "font-size 0.3s" }}>
            Azania
          </h2>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={styles.toggleButton}
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
        </div>

        <ul style={styles.menuList}>
          {menuItems.map(({ name, path }) => (
            <li key={path} style={styles.menuItem}>
              <NavLink
                to={path}
                style={({ isActive }) => ({
                  color: isActive ? "#0F3D2E" : "white",
                  textDecoration: "none",
                  fontWeight: isActive ? "bold" : "normal",
                  fontSize: sidebarOpen ? 16 : 0,
                  transition: "font-size 0.3s"
                })}
              >
                {sidebarOpen ? name : name.charAt(0)}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main style={styles.mainContent}>
        <header style={styles.header}>
          <h1>Vendor Portal</h1>
        </header>

        <section style={styles.content}>
          <Outlet />
        </section>
      </main>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f5f7fa"
  },

  sidebar: {
    backgroundColor: "#0F3D2E",
    color: "white",
    paddingTop: 20,
    transition: "width 0.3s",
    overflow: "hidden"
  },

  logo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 30
  },

  toggleButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "white",
    fontSize: 20,
    cursor: "pointer"
  },

  menuList: {
    listStyle: "none",
    padding: 0,
    margin: 0
  },

  menuItem: {
    padding: "12px 20px",
    cursor: "pointer"
  },

  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },

  header: {
    backgroundColor: "white",
    padding: "20px 30px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)"
  },

  content: {
    padding: 30,
    overflowY: "auto",
    flexGrow: 1
  }
};

export default VendorLayout;