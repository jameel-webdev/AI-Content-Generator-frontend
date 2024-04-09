import axios from "axios";

const server = "http://localhost:5000";

export const registerUserApi = async (userData) => {
  const res = await axios.post(
    `${server}/api/v1/user/register`,
    {
      username: userData?.username,
      email: userData?.email,
      password: userData?.password,
    },
    {
      withCredentials: true,
    }
  );
  return res?.data;
};

export const loginUserApi = async (userData) => {
  const res = await axios.post(
    `${server}/api/v1/user/login`,
    {
      email: userData?.email,
      password: userData?.password,
    },
    {
      withCredentials: true,
    }
  );
  return res?.data;
};

export const checkUserAuthentication = async () => {
  const res = await axios.get(`${server}/api/v1/user/auth`, {
    withCredentials: true,
  });
  return res?.data;
};

export const logoutApi = async () => {
  const res = await axios.post(
    `${server}/api/v1/user/logout`,
    {},
    {
      withCredentials: true,
    }
  );
  return res?.data;
};

export const profileApi = async () => {
  const res = await axios.get(`${server}/api/v1/user`, {
    withCredentials: true,
  });
  return res?.data;
};
