"use client";

import React, { useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import cookie from "js-cookie";
import { useDispatch } from "react-redux";
import { setAuth } from "@/redux/reducer/authSlice";
import styles from "./login.module.css";
import { Turnstile } from "next-turnstile";
import svgSheet from "../../assets/svgSheets";
import { useRouter } from "next/router";
import { postRegister } from "@/pages/api/fetchClient";

function RegisterForm() {
  const [apiLoader, setApiLoader] = useState(false);
  const [apiError, setApiError] = useState();
  const [turnstileToken, setTurnstileToken] = useState(null);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const router = useRouter();
  const onSubmit = async (values) => {
    setApiLoader(true);
    setApiError(null);

    try {
      const resp = await postRegister(values);

      if (resp?.status === 201) {
        window.location.href = "/login";
        message.success(
          "Registration successful! . Please wait for admin approval"
        );
        dispatch(setAuth(resp.data));
      } else {
        setApiError("Invalid login credentials.");
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.password1?.[0] ||
        error?.response?.data?.detail ||
        error?.message;
      setApiError(errorMsg);
    } finally {
      setApiLoader(false);
    }
    setTurnstileToken(null);
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
        <div className="">
          {svgSheet.trade_brains_Logo}
          <p className={styles.header_text}>Register</p>
          <p className="mt-20 mb-20">Access to our dashboard</p>
        </div>
        <div className="w-100">
          <Form
            autoComplete="off"
            form={form}
            name="register"
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
              style={{ margin: "15px 0px " }}
              name="username"
              className={`dark-input-login w-100
                        `}
              rules={[
                {
                  required: true,
                  message: "Please Enter your username!",
                },
              ]}
            >
              <Input
                type="text"
                style={{ height: "40px" }}
                className={`
                          auth-form-input w-100`}
                placeholder="username"
              />
            </Form.Item>
            <Form.Item
              className={`dark-input-login w-100
                        `}
              name="password1"
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
            <Form.Item
              className={`dark-input-login w-100
                        `}
              name="password2"
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
                placeholder="Confirm Password"
              />
            </Form.Item>
            <div className="flex justify-content-center mb-10">
              <Turnstile
                siteKey="0x4AAAAAABy2V7bns6hfsgoR"
                onVerify={(token) => {
                  setTurnstileToken(token);
                }}
                onExpire={() => {
                  setTurnstileToken(null);
                }}
                onError={(err) => {
                  setTurnstileToken(null);
                }}
                options={{
                  theme: "dark",
                  size: "normal",
                }}
              />
            </div>
            {apiError && (
              <div style={{ color: "#ff4d4f", textAlign: "center" }}>
                {apiError}
              </div>
            )}
            {apiLoader ? (
              <button className={styles.login_button}>Registering....</button>
            ) : (
              <button
                disabled={!turnstileToken}
                type="submit"
                className={styles.login_button}
              >
                Register
              </button>
            )}
          </Form>
          <p style={{ marginTop: "20px" }}>
            Already have an account?{" "}
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

export default RegisterForm;
