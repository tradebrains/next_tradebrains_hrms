"use client";
import React, { use } from "react";
import styles from "./header.module.css";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Menu } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import { authStore, setAuth } from "@/redux/reducer/authSlice";

function Header() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const listedName =
    pathname?.split("/").pop() === "dashboard"
      ? "All Employees"
      : pathname?.split("/").pop() === "user-list"
      ? "User List"
      : pathname?.split("/").pop() === "premium-support"
      ? "Premium Support"
      : pathname?.split("/").pop() === "transaction"
      ? "Transaction Details"
      : pathname?.split("/").pop() === "kyc-record"
      ? "KYC Records"
      : pathname?.split("/").pop() === "coupons"
      ? "Coupons"
      : pathname?.split("/").pop() === "superstar"
      ? "Superstar Portfolio"
      : pathname?.split("/").pop() === "feedback"
      ? "Feedback"
      : pathname?.split("/").pop() === "notifications"
      ? "Notifications"
      : pathname?.split("/").pop() === "user-management"
      ? "User Management"
      : pathname?.split("/").pop() === "stock-details"
      ? "Stock Details"
      : pathname?.split("/").pop() === "buckets"
      ? "Buckets"
      : pathname.includes("user-management/edit/")
      ? "User Management Edit"
      : pathname.includes("superstar/edit/")
      ? "Superstar Portfolio Edit"
      : pathname.includes("affiliate")
      ? "Affiliate"
      : pathname.includes("stock-details/create")
      ? "Stock Details Create"
      : pathname.includes("stock-details/edit")
      ? "Stock Details Edit"
      : "";

  const userData = useSelector(authStore);
  const userName = userData?.userData?.user?.first_name || "User";

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
