import instance from "./Instance";

export const login = async (credentials) => {
  try {
    let url = `/login`;
    const response = await instance.post(url, credentials);
    return response;
  } catch (e) {
    return { status: false };
  }
};

export const getUserList = async () => {
  try {
    let url = `/users`;
    const response = await instance.get(url);
    return response;
  } catch (e) {
    return { status: false };
  }
};

export const getUser = async () => {
  try {
    let url = `/user`;
    const response = await instance.get(url);
    return response;
  } catch (e) {
    return { status: false };
  }
};
export const postAddUser = async (credentials) => {
  try {
    let url = "/users";
    const response = await instance.post(url, credentials);
    return response;
  } catch (e) {
    return { status: false };
  }
};

export const putUser = async (credentials, id) => {
  try {
    let url = `users/${id}`;
    const response = await instance.put(url, credentials);
    return response;
  } catch (e) {
    return { status: false };
  }
};

export const deleteUser = async (id) => {
  try {
    let url = `users/${id}`;
    const response = await instance.delete(url);
    return response;
  } catch (e) {
    return { status: false };
  }
};

export const getLogout = async () => {
  try {
    let url = `/logout`;
    const response = await instance.get(url);
    return response;
  } catch (e) {
    return { status: false };
  }
};

export const getPhonesList = async () => {
  try {
    let url = `/phones`;
    const response = await instance.get(url);
    return response;
  } catch (e) {
    return { status: false };
  }
};

export const postAddPhone = async (credentials) => {
  try {
    let url = "/add-phone";
    const response = await instance.post(url, credentials);
    return response;
  } catch (e) {
    return { status: false };
  }
};

export const deletePhone = async (dataToken) => {
  try {
    let url = `phones/${dataToken}`;
    const response = await instance.delete(url);
    return response;
  } catch (e) {
    return { status: false };
  }
};

export const getActivateQr = async (dataToken) => {
  try {
    let url = `activate/${dataToken}`;
    const response = await instance.get(url);
    return response;
  } catch (e) {
    return { status: false };
  }
};

export const getRefreshToken = async (dataToken) => {
  try {
    let url = `phones/refresh-token/${dataToken}`;
    const response = await instance.get(url);
    return response;
  } catch (e) {
    return { status: false };
  }
};

export const postSendMessage = async (credentials) => {
  try {
    let url = "/send-msg";
    const response = await instance.post(url, credentials);
    return response;
  } catch (e) {
    return { status: false };
  }
};

export const getDeactivatePhone = async (dataToken) => {
  try {
    let url = `deactivate/${dataToken}`;
    const response = await instance.get(url);
    return response;
  } catch (e) {
    return { status: false };
  }
};

export const putCallBackUrl = async (credentials) => {
  try {
    let url = `register-callback`;
    const response = await instance.put(url, credentials);
    return response;
  } catch (e) {
    return { status: false };
  }
};
