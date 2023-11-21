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
export async function deleteRole(roleId) {
  const apiKey = getApiKeyFromStorage();
  return await Axios.delete(`roles/${roleId}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
}
