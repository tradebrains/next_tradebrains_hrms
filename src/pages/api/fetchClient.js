import { authPost } from "./authClient";
import { patch } from "./MainClient";

export const postRegister = async (data) => {
  const loginResp = await authPost(`authentication/register/`, data).then(
    (resp) => {
      return resp;
    }
  );
  return loginResp;
};

export const postForgot = async (data) => {
  const loginResp = await authPost(`auth/request-reset-email/`, data).then(
    (resp) => {
      return resp;
    }
  );
  return loginResp;
};

export const postLogin = async (data) => {
  const loginResp = await authPost(`authentication/login/`, data).then(
    (resp) => {
      return resp;
    }
  );
  return loginResp;
};

export const resetPassword = async (data) => {
  const loginResp = await patch(`auth/password-reset-complete/`, data).then(
    (resp) => {
      return resp;
    }
  );
  return loginResp;
};
