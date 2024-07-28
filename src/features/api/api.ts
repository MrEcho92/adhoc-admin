import { HTTPInstance } from "../../core";

export const getUser = async () => await HTTPInstance.get("/user");

export const getAddresses = async (postCode: string) =>
  await HTTPInstance.get(`/addresses/${postCode}`);

export const postMplan = async (payload: any) =>
  await HTTPInstance.post("/mplan/create", payload);

export const getMplans = async (user_id: string) => {
  const params = { user_id };
  return await HTTPInstance.get("/mplans", { params });
};

export const getCategories = async () => await HTTPInstance.get("/categories");
