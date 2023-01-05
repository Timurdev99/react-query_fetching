import { getApiClient } from "src/utils/axios";

export const GetSpecialities = () => {
  return getApiClient().get("/specialities");
};
