import { Outlet } from "react-router-dom";
import Header from "../Header/ui/Header";
import Sidebar from "../Sidebar/Sidebar";
import { useState } from "react";
import "./AppLayout.scss";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const handleToggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="app-layout">
      <Header onToggleSidebar={handleToggleSidebar} />
      <Sidebar open={sidebarOpen} />
      <main className={`app-layout__content ${sidebarOpen ? "_with-sidebar" : ""}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
