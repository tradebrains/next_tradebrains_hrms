"use client";

import React, { useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import styles from "./login.module.css";
import svgSheet from "../../assets/svgSheets";
import { useRouter } from "next/router";
import { getResetLink } from "@/pages/api/fetchClient";

function ForgotPasswordForm() {
  const router = useRouter();
  const [form] = Form.useForm();

  const onSubmit = async (values) => {
    const data = {
      email: values.email,
      redirect_url: `${window.location.origin}/reset-password`,
    };
    try {
      const resp = await getResetLink(data);
      if (resp?.status === 200) {
        setForgotPasswordModal(false);
        message.success("A password reset link has been sent to your email.");
      } else {
      }
    } catch (error) {
    } finally {
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
            form={form}
            name="forgot_password"
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
