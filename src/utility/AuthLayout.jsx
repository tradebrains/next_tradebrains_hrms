import AuthLayoutWrapper from "./AuthLayoutWrapper";
import Sidebar from "@/components/Sidbar/Sidebar";
import Header from "@/components/Header/Header";
import Cookies from "js-cookie";
import Breadcrumb from "./Breadcrumb";
import styles from "./Breadcrumb.module.css";

export default function AuthLayout({ children }) {
  const accessToken = Cookies.get("hrms_access_token");
  const isAuthenticated = !!accessToken;

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="layout-container">
      <div className={styles.sidebarContainer}>
        <Sidebar />
      </div>
      <div className="content-wrapper">
        <div className="header-container">
          <Header />
          <Breadcrumb />
          <AuthLayoutWrapper>{children}</AuthLayoutWrapper>
        </div>
      </div>
    </div>
  );
}
