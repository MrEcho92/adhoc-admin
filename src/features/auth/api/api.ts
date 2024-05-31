import { HTTPInstance } from "../../../core";

export const getUser = () => HTTPInstance.get("/user");
