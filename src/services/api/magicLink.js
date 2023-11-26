import { Axios } from ".";
import { getApiKeyFromStorage } from "../localStorage";

export async function generateMagicLink() {
  const apiKey = getApiKeyFromStorage();
  return await Axios.get("clients/magic-link/generate", {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
}
