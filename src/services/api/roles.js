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
export async function addRole(payLoad) {
  const apiKey = getApiKeyFromStorage();
  return await Axios.post(`roles`, payLoad, {
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

export async function getPermissions() {
  const apiKey = getApiKeyFromStorage();
  return await Axios.get("roles/permissions", {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
}
