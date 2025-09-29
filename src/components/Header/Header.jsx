"use client";
import React, { use, useEffect, useState } from "react";
import styles from "./header.module.css";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Drawer, Dropdown, Menu } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import { authStore, setAuth } from "@/redux/reducer/authSlice";
import Sidebar from "../Sidbar/Sidebar";
import { MenuIcon } from "lucide-react";

function Header() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(false);
  }, [router]);

  const listedName =
    pathname?.split("/").pop() === "dashboard"
      ? "All Employees"
      : pathname?.split("/").pop() === "holidays"
      ? "Holidays"
      : pathname?.split("/").pop() === "leaves-admin"
      ? "Leaves (Admin)"
      : pathname?.split("/").pop() === "my-leaves"
      ? "My Leaves"
      : pathname?.split("/").pop() === "admin-assets"
      ? "Assets (Admin)"
      : pathname?.split("/").pop() === "my-assets"
      ? "My Assets"
      : pathname?.split("/").pop() === "reimbursements-admin"
      ? "Reimbursements (Admin)"
      : pathname?.split("/").pop() === "my-reimbursements"
      ? "My Reimbursements"
      : pathname?.split("/").pop() === "documents"
      ? "Employee Documents"
      : pathname?.split("/").pop() === "leave-policy"
      ? "Leave Policy"
      : pathname?.split("/").pop() === "harassment-policy"
      ? "Harassment Policy"
      : pathname?.split("/").pop() === "code-of-conduct"
      ? "Code of Conduct"
      : pathname.includes("notice")
      ? "Notice Period Policy"
      : pathname.includes("travel-policy")
      ? "Travel Policy"
      : pathname.includes("calendar")
      ? "Attendance"
      : "";

  const userData = useSelector(authStore);
  const userName = userData?.userData?.user_details?.full_name || "User";

  const getRandomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  const userLogout = () => {
    window.location.href = "/";
    Cookies.remove("hrms_access_token");
    Cookies.remove("hrms_login_session");
    dispatch(setAuth({}));
  };

  const menu = (
    <Menu
      className={`ff-poppins menu-DropDwon-dark bg-dark-black
        `}
      style={{ width: "100px", height: "auto" }}
      items={[
        {
          label: (
            <div
              className="fs-s-14 fw-500 flex"
              onClick={() => router.push("/profile")}
            >
              <span>My Profile</span>
            </div>
          ),
          key: "1",
        },
        {
          label: (
            <div className="fs-s-14 fw-500 flex" onClick={userLogout}>
              <LogoutOutlined className="mx-10" style={{ fontSize: "23px" }} />
              <span>Logout</span>
            </div>
          ),
          key: "2",
        },
      ]}
    />
  );

  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <h1 className={styles.title}>{listedName}</h1>
        <div className={styles.mobileMenu}>
          <button onClick={showDrawer} className={styles.toggleButton}>
            <MenuIcon />
          </button>
          <Drawer onClose={onClose} open={open}>
            <Sidebar />
          </Drawer>
        </div>
        <div className={styles.controls}>
          <div className={styles.adminContainer}>
            <span className={styles.name}>{userName}</span>
            <Dropdown
              overlay={menu}
              trigger={["click"]}
              placement="bottomRight"
            >
              <div
                className={styles.image_container}
                style={{
                  backgroundColor: getRandomColor(),
                }}
              >
                {userName.slice(0, 1)}
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
