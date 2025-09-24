"use client";

import React, { useEffect, useState } from "react";
import {
  Users,
  House,
  Info,
  Mail,
  Settings,
  Menu,
  ChevronDown,
  ChevronUp,
  Gem,
  BadgeIndianRupee,
  KeyRound,
  ChartCandlestick,
  MessageCircleCode,
  BellDot,
  UserCheck,
  Activity,
  PaintBucket,
  SprayCan,
  ShieldCheck,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./sidebar.module.css";

const ICONS = {
  Users,
  House,
  Info,
  Mail,
  Settings,
  Gem,
  BadgeIndianRupee,
  KeyRound,
  ChartCandlestick,
  MessageCircleCode,
  BellDot,
  UserCheck,
  Activity,
  PaintBucket,
  SprayCan,
  ShieldCheck,
};
const Sidebar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  const handleDropdownToggle = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };
  const sideBarItems = [
    {
      name: "All Employees",
      href: "/dashboard",
      icon: "House",
    },
    {
      name: "Holidays",
      href: "/holidays",
      icon: "Users",
    },
    {
      name: "Leaves (Admin)",
      href: "/leaves-admin",
      icon: "Gem",
    },
    {
      name: "My Leaves",
      href: "/my-leaves",
      icon: "BadgeIndianRupee",
    },
    // {
    //   name: "Payroll",
    //   hasDropdown: true,
    //   subItems: [
    //     { name: "Employee Salary", href: "/payroll/employee-salary" },
    //     { name: "Payslip", href: "/payroll/payslip" },
    //   ],
    //   icon: "ShieldCheck",
    // },
    {
      name: "Assets (Admin)",
      href: "/admin-assets",
      icon: "KeyRound",
    },
    {
      name: "My Assets",
      href: "/my-assets",
      icon: "ChartCandlestick",
    },
    {
      name: "Reimbursements (Admin)",
      href: "/reimbursements-admin",
      icon: "MessageCircleCode",
    },
    {
      name: "My Reimbursements",
      href: "/my-reimbursements",
      icon: "BellDot",
    },
    {
      name: "Employee Documents",
      href: "/documents",
      icon: "UserCheck",
    },
    // {
    //   name: "Medical Insurance (Admin)",
    //   href: "/medical-insurance",
    //   icon: "Activity",
    // },
    {
      name: "Leave Policy",
      href: "/leave-policy",
      icon: "PaintBucket",
    },
    {
      name: "Harassment Policy",
      href: "/harassment-policy",
      icon: "PaintBucket",
    },
    {
      name: "Code of Conduct",
      href: "/code-of-conduct",
      icon: "PaintBucket",
    },
    {
      name: "Notice Period Policy",
      href: "/notice",
      icon: "PaintBucket",
    },
    {
      name: "Travel Policy",
      href: "/travel-policy",
      icon: "PaintBucket",
    },
    {
      name: "Attendance",
      href: "/calendar",
      icon: "PaintBucket",
    },
  ];

  return (
    <div
      className={`${styles.sidebarContainer} ${
        isSideBarOpen ? styles.sidebarOpen : styles.sidebarClosed
      }`}
    >
      <div className={styles.sidebarInner}>
        <button
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          className={styles.toggleButton}
        >
          <Menu size={24} style={{ color: "white" }} />
        </button>

        <nav className={styles.navContainer}>
          {sideBarItems.map((item) => {
            const IconComponent = ICONS[item.icon];
            const isActive =
              pathname === item.href ||
              item.subItems?.some((sub) => pathname === sub.href);

            return (
              <div key={item.name}>
                <div
                  className={`${styles.navItem} ${
                    isActive ? styles.navItemActive : ""
                  }`}
                  onClick={() => {
                    if (item.hasDropdown) {
                      handleDropdownToggle(item.name);
                    } else {
                      router.push(item.href);
                    }
                  }}
                >
                  <IconComponent
                    size={20}
                    style={{ minWidth: "20px", color: "white" }}
                  />
                  {isSideBarOpen && (
                    <span className={styles.navText}>
                      {item.name}{" "}
                      {item.hasDropdown && (
                        <span className={styles.dropdown_icon}>
                          {openDropdown ? <ChevronUp /> : <ChevronDown />}
                        </span>
                      )}
                    </span>
                  )}
                </div>

                {/* Dropdown items */}
                {item.hasDropdown &&
                  openDropdown === item.name &&
                  isSideBarOpen && (
                    <div className={styles.dropdownContainer}>
                      {item.subItems.map((subItem) => (
                        <div
                          key={subItem.name}
                          className={`${styles.navItem} ${
                            pathname === subItem.href
                              ? styles.navItemActive
                              : ""
                          }`}
                          onClick={() => router.push(subItem.href)}
                        >
                          <span
                            className={styles.navText}
                            style={{ paddingLeft: "30px" }}
                          >
                            {subItem.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
