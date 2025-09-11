"use client";

import React, { useEffect, useState } from "react";
import { Form, Input, message, Modal, Select } from "antd";
// import { resetPassword } from "@/api/fetchClient";
import styles from "./login.module.css";
import { Turnstile } from "next-turnstile";
import svgSheet from "@/assets/svgSheets";

function ResetPasswordForm() {
  const [apiLoader, setApiLoader] = useState(false);
  const [apiError, setApiError] = useState();
  const [form] = Form.useForm();
  const [turnsTileToken, setTurnstileToken] = useState(null);

  //   const onSubmit = async (values) => {
  //     setApiLoader(true);
  //     setApiError(null);
  //     const data = {
  //       password: values.password,
  //       token: new URLSearchParams(window.location.search).get("token"),
  //       uidb64: new URLSearchParams(window.location.search).get("uidb64"),
  //     };

  //     try {
  //       const resp = await resetPassword(data);

  //       if (resp?.status === 200) {
  //         setApiLoader(true);
  //         message.success("Password reset successful.");
  //         window.location.href = "/";
  //       } else {
  //         message.error("Something went wrong. Please try again.");
  //       }
  //     } catch (error) {
  //       message.error(
  //         error?.response?.data?.detail || "Failed to reset password."
  //       );
  //     }
  //     setTurnstileToken(null);
  //   };

  return (
    <div className={styles.ForgotPasswordForm_container}>
      <div
        className={`table-shadow w-100
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
        <div className="">{svgSheet.trade_brains_Logo}</div>
        <div className="w-100">
          <Form
            autoComplete="off"
            form={form}
            name="password_reset"
            // onFinish={onSubmit}
            scrollToFirstError
          >
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
            <Form.Item
              className="dark-input-login w-100"
              name="confirm_password"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password
                type="text"
                style={{ height: "40px", width: "100%" }}
                className="auth-form-input w-100"
                placeholder="Confirm Password"
              />
            </Form.Item>
            {apiError && (
              <div style={{ color: "#ff4d4f", textAlign: "center" }}>
                {apiError}
              </div>
            )}
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

            {apiLoader ? (
              <button className={styles.login_button}>
                Resetting Password....
              </button>
            ) : (
              <button
                disabled={!turnsTileToken}
                type="submit"
                className={styles.login_button}
              >
                Reset Password
              </button>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordForm;
