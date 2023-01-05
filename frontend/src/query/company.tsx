import { getApiClient } from "src/utils/axios";

export const GetCompanies = () => {
  return getApiClient().get("/companies");
};
