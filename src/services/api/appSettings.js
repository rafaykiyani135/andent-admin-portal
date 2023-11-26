import { Axios } from ".";
import { getApiKeyFromStorage } from "../localStorage";
export async function getAppSettings() {
  const apiKey = getApiKeyFromStorage();
  return await Axios.get("app-settings", {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
}
