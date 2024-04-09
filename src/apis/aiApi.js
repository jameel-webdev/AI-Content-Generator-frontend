import axios from "axios";
const server = "http://localhost:5000";

export const generateContentApi = async ({ prompt }) => {
  const res = await axios.post(
    `${server}/api/v1/ai/generate`,
    { prompt },
    { withCredentials: true }
  );
  return res?.data;
};
