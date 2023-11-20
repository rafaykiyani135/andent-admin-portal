import { Axios } from ".";
import { getApiKeyFromStorage } from "../localStorage";
export async function getRoles() {
  const apiKey = getApiKeyFromStorage();
  return await Axios.get("roles", {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
}
