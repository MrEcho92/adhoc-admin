import { HTTPInstance } from "../../core";

export const getUser = async () => await HTTPInstance.get("/user");

export const getAddresses = async (postCode: string) =>
  await HTTPInstance.get(`/addresses/${postCode}`).then(({ data }) => data);

export const postMplan = async (payload: any) =>
  await HTTPInstance.post("/mplan/create", payload).then(({ data }) => data);

export const getMplans = async (user_id: string) => {
  const params = { user_id };
  return await HTTPInstance.get("/mplans", { params }).then(({ data }) => data);
};

export const getMplanDetails = async (
  mplan_id: string,
  user_id: string,
  payload: any,
) => {
  const params = { mplan_id, user_id, ...payload };
  return await HTTPInstance.get("/mplans/detail", { params }).then(
    ({ data }) => data,
  );
};

export const getCategories = async () =>
  await HTTPInstance.get("/categories").then(({ data }) => data);
