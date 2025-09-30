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

export const getAdminAsset = async (Page) => {
  const response = await get(
    `employee/assets/admin/?page=${Page.page}&page_size=${Page.perPage}`
  ).then((resp) => {
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

export const getEmployeeAsset = async (Page) => {
  const response = await get(
    `employee/assets/user/?page=${Page.page}&page_size=${Page.perPage}`
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const deleteEmployee = async (id) => {
  const response = await del(`employee/employee/delete/${id}/`).then((resp) => {
    return resp;
  });
  return response;
};

export const postAdminReimburse = async (data) => {
  const response = await post(`employee/reimbursements/admin/`, data).then(
    (resp) => {
      return resp;
    }
  );
  return response;
};

export const postEmployeeReimburse = async (data) => {
  const response = await post(
    `employee/reimbursements/user/create/`,
    data
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const postStatusReimburse = async (id, data) => {
  const response = await post(
    `employee/reimbursements/aprove/${id}/${data}/`
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const getAdminReimburse = async (Page) => {
  const response = await get(
    `employee/reimbursements/admin/?page=${Page.page}&page_size=${Page.perPage}`
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const getEmployeeReimburse = async (Page) => {
  const response = await get(
    `employee/reimbursements/user/?page=${Page.page}&page_size=${Page.perPage}`
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const editAdminReimburse = async (id, data) => {
  const response = await put(`employee/reimbursements/admin/${id}/`, data).then(
    (resp) => {
      return resp;
    }
  );
  return response;
};

export const editEmployeeReimburse = async (id, data) => {
  const response = await put(
    `employee/reimbursements/user/edit/${id}/`,
    data
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const deleteReimburse = async (id) => {
  const response = await del(`employee/reimbursements/admin/${id}/`).then(
    (resp) => {
      return resp;
    }
  );
  return response;
};

export const getEmployeeList = async () => {
  const response = await get(`authentication/etime-userlist/`).then((resp) => {
    return resp;
  });
  return response;
};

export const getAttendance = async (empcode, month, year) => {
  const response = await get(
    `employee/get-office-timings/?emp_code=${empcode}&month=${month}&year=${year}`
  ).then((resp) => {
    return resp;
  });
  return response;
};

export const putEmployeeDetails = async (id, data) => {
  const response = await put(`employee/personal-details/${id}/`, data).then(
    (resp) => {
      return resp;
    }
  );
  return response;
};

export const getEmployeeDetails = async (id) => {
  const response = await get(`employee/personal-details/${id}/`).then(
    (resp) => {
      return resp;
    }
  );
  return response;
};

export const getEmailEmployeeIds = async (id) => {
  const response = await get(`employee/leaves/admin/employees/`).then(
    (resp) => {
      return resp;
    }
  );
  return response;
};

export const postEmployeeDocuments = async (id, data) => {
  const response = await post(`employee/documents/upload/${id}/`, data).then(
    (resp) => {
      return resp;
    }
  );
  return response;
};

export const editEmployeeDocuments = async (id, data) => {
  const response = await put(`employee/documents/${id}/`, data).then((resp) => {
    return resp;
  });
  return response;
};

export const getEmployeeDocuments = async () => {
  const response = await get(`employee/documents/all/`).then((resp) => {
    return resp;
  });
  return response;
};

export const deleteEmployeeDocuments = async (id) => {
  const response = await del(`employee/documents/${id}/delete/`).then(
    (resp) => {
      return resp;
    }
  );
  return response;
};

export const getHolidaysList = async () => {
  const response = await get(`employee/holidays/`).then((resp) => {
    return resp;
  });
  return response;
};

export const postHolidays = async (data) => {
  const response = await post(`employee/holidays/create/`, data).then(
    (resp) => {
      return resp;
    }
  );
  return response;
};

export const editHolidays = async (id, data) => {
  const response = await put(`employee/holidays/edit/${id}/`, data).then(
    (resp) => {
      return resp;
    }
  );
  return response;
};

export const deleteHolidays = async (id) => {
  const response = await del(`employee/holidays/delete/${id}/`).then((resp) => {
    return resp;
  });
  return response;
};
