import { HTTPInstance } from "../../core";

export const getUser = async () => await HTTPInstance.get("/user");

export const getAddresses = async (postCode: string) =>
  HTTPInstance.get(`/addresses/${postCode}`);

export const postMplan = async (payload: any) =>
  HTTPInstance.post("/mplan/create", payload);
