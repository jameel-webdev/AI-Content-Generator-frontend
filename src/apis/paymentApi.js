import axios from "axios";
const server = "http://localhost:5000";

export const freeSubscriptionApi = async () => {
  const res = await axios.post(
    `${server}/api/v1/payment/freeplan`,
    {},
    { withCredentials: true }
  );
  return res?.data;
};

export const upgradeSubscriptionApi = async (details) => {
  const res = await axios.post(
    `${server}/api/v1/payment/upgrade`,
    {
      amount: details.amount,
      subscriptionPlan: details.subscriptionPlan,
      monthlyRequestCount: details.monthlyRequestCount,
    },
    { withCredentials: true }
  );
  return res?.data;
};

// http://localhost:5000
