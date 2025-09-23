import { authPost } from "./authClient";
import { del, delWithParams, get, patch, post, put } from "./MainClient";

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

export const getAdminLeaveList = async (Page) => {
  const response = await get(
    `employee/leaves/admin/applications/?page=${Page.page}&per_page=${Page.perPage}`
  ).then((resp) => {
    return resp;
  });
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

export const getLeftLeaves = async (id) => {
  const response = await get(
    `employee/leaves/admin/employee-leave-balance/${id}`
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const postEmployeeLeaves = async (data) => {
  const response = await post(`employee/leaves/apply/`, data).then((resp) => {
    return resp;
  });
  return response;
};

export const getEmployeeLeaves = async () => {
  const response = await get(`employee/leaves/my-applications/`).then(
    (resp) => {
      return resp;
    }
  );
  return response;
};

export const postLeaveStatus = async (id, status) => {
  const response = await post(`employee/leaves/approve/${id}/${status}/`).then(
    (resp) => {
      return resp;
    }
  );
  return response;
};

export const deleteLeaves = async (id) => {
  const response = await del(`employee/leaves/apply/${id}/delete/`).then(
    (resp) => {
      return resp;
    }
  );
  return response;
};

export const editLeaves = async (id, data) => {
  const response = await put(`employee/leaves/apply/${id}/`, data).then(
    (resp) => {
      return resp;
    }
  );
  return response;
};

export const postAsset = async (data) => {
  const response = await post(`employee/assets/admin/create/`, data).then(
    (resp) => {
      return resp;
    }
  );
  return response;
};

export const getAdminAsset = async () => {
  const response = await get(`employee/assets/admin/`).then((resp) => {
    return resp;
  });
  return response;
};

export const updateAssetStatus = async (id, data) => {
  const response = await put(`employee/assets/status/update/${id}/`, data).then(
    (resp) => {
      return resp;
    }
  );
  return response;
};

export const editAsset = async (id, data) => {
  const response = await put(`employee/assets/admin/${id}/edit/`, data).then(
    (resp) => {
      return resp;
    }
  );
  return response;
};

export const deleteAsset = async (id) => {
  const response = await del(`employee/assets/admin/${id}/delete/`).then(
    (resp) => {
      return resp;
    }
  );
  return response;
};

export const getEmployeeAsset = async () => {
  const response = await get(`employee/assets/user/`).then((resp) => {
    return resp;
  });
  return response;
};
