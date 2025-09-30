"use client";

import React, { useEffect, useState } from "react";
import { Form, Input } from "antd";
import cookie from "js-cookie";
import { useDispatch } from "react-redux";
import { setAuth } from "@/redux/reducer/authSlice";
import styles from "./login.module.css";
import svgSheet from "../../assets/svgSheets";
import { useRouter } from "next/router";
import { postLogin } from "@/pages/api/fetchClient";

function LoginForm() {
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
        cookie.set("hrms_access_token", resp?.data?.access, {
          expires: 999,
        });
        window.location.href = "/dashboard";
        dispatch(setAuth(resp.data));
      } else {
        setApiError("Invalid login credentials.");
      }
    } catch (error) {
      const errorMsg =
        error?.response?.data?.non_field_errors[0] ||
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
      >
        <div className="">
          {svgSheet.trade_brains_Logo}
          <p className={styles.header_text}>Login</p>
          <p className="mt-20 mb-20">Login to access dashboard</p>
        </div>
        <div className="w-100">
          <Form
            autoComplete="off"
            form={form}
            name="login"
            onFinish={onSubmit}
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
            <Form.Item
              className={`dark-input-login w-100
                        `}
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                type="text"
                style={{ height: "40px", width: "100%" }}
                className="auth-form-input w-100"
                placeholder="Enter Password"
              />
            </Form.Item>
            <div
              onClick={() => router.push("/forgot-password")}
              className={styles.forgot_password}
            >
              Forgot Password?
            </div>
            {apiError && (
              <div style={{ color: "#ff4d4f", textAlign: "center" }}>
                {apiError}
              </div>
            )}
            {apiLoader ? (
              <button className={styles.login_button}>Logging in....</button>
            ) : (
              <button type="submit" className={styles.login_button}>
                Login
              </button>
            )}
          </Form>
          <p style={{ marginTop: "20px" }}>
            Don't have an account yet?{" "}
            <span
              className={styles.register}
              onClick={() => router.push("/register")}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
