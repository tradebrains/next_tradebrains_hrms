import { authPost } from "./authClient";
import { get, patch, post, put } from "./MainClient";

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

export const getDashboardData = async () => {
  const response = await get(`employee/employee/details/`).then((resp) => {
    return resp;
  });
  return response;
};

export const getEmployeeIds = async () => {
  const response = await get(`employee/users/table/`).then((resp) => {
    return resp;
  });
  return response;
};

export const getManagerList = async () => {
  const response = await get(`employee/managers/`).then((resp) => {
    return resp;
  });
  return response;
};

export const validateUser = async (data) => {
  const response = await put(`authentication/validate-user/`, data).then(
    (resp) => {
      return resp;
    }
  );
  return response;
};

export const getProfileDetails = async () => {
  const response = await get(`employee/users/me/`).then((resp) => {
    return resp;
  });
  return response;
};

export const getAdminLeaveList = async () => {
  const response = await get(`employee/leaves/admin/applications/`).then(
    (resp) => {
      return resp;
    }
  );
  return response;
};

export const getUserLeaveList = async () => {
  const response = await get(`employee/leaves/my-applications/`).then(
    (resp) => {
      return resp;
    }
  );
  return response;
};

export const getUserEmpIDEmail = async () => {
  const response = await get(`employee/leaves/admin/employees/`).then(
    (resp) => {
      return resp;
    }
  );
  return response;
};

export const postAdminLeaves = async (data) => {
  const response = await post(`employee/leaves/admin/apply/`, data).then(
    (resp) => {
      return resp;
    }
  );
  return response;
};
