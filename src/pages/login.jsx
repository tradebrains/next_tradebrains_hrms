import LoginForm from "@/components/LoginRegister/Login";
import React from "react";

function login() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default login;

export async function getServerSideProps(context) {
  const { req, query } = context;

  if (req?.cookies?.hrms_access_token) {
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard",
      },
    };
  }

  return {
    props: {},
  };
}
