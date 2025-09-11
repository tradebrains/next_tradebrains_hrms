"use client";

import React, { useEffect, useState } from "react";
import { Form, Input } from "antd";
import cookie from "js-cookie";
import { useDispatch } from "react-redux";
import { setAuth } from "@/redux/reducer/authSlice";
import styles from "./login.module.css";
import svgSheet from "../../assets/svgSheets";
import { useRouter } from "next/router";

function ForgotPasswordForm() {
  const [apiLoader, setApiLoader] = useState(false);
  const [apiError, setApiError] = useState();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const router = useRouter();
  const [Model, setModel] = useState(false);
  const onSubmit = async (values) => {
    setApiLoader(true);
    setApiError(null);

    try {
      const resp = await postLogin(values);

      if (resp?.status === 200) {
        cookie.set("hrms_login_session", "true", { expires: 999 });
        cookie.set("hrms_access_token", resp?.data?.tokens?.access, {
          expires: 999,
        });
        window.location.href = "/dashboard";
        dispatch(setAuth(resp.data));
      } else {
        setApiError("Invalid login credentials.");
      }
    } catch (error) {
      const errorMsg =
        error?.response?.data?.detail ||
        error?.message ||
        "Login failed. Please check your credentials.";

      setApiError(errorMsg);
    } finally {
      setApiLoader(false);
    }
  };

  return (
    <div>
      <div
        className={`${styles.login_form_container} 
        `}
        style={{
          width: "500px",
          textAlign: "center",
          margin: "auto",
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "#1e1e1e",
        }}
      >
        <div className="w-100">
          {svgSheet.trade_brains_Logo}
          <p className={styles.header_text}>Forgot Password</p>
          <p className={styles.text_email}>
            Enter your email to get a password reset link
          </p>
          <Form
            autoComplete="off"
            // form={forgotForm}
            name="forgot_password"
            // onFinish={onSubmitForgotPassword}
            scrollToFirstError
          >
            <Form.Item
              style={{ margin: "15px 0px " }}
              name="email"
              className={`dark-input-login w-100
                        `}
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please Enter your E-mail!",
                },
              ]}
            >
              <Input
                type="text"
                style={{ height: "40px" }}
                className={`
                          auth-form-input w-100`}
                placeholder="Email"
              />
            </Form.Item>

            <button type="submit" className={styles.login_button}>
              Get Reset Link
            </button>
          </Form>
          <p style={{ marginTop: "20px" }}>
            Remember your password?{" "}
            <span
              className={styles.register}
              onClick={() => router.push("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;
