import { Axios } from ".";
import { getApiKeyFromStorage } from "../localStorage";
export async function getUsers() {
  const apiKey = getApiKeyFromStorage();
  return await Axios.get("users", {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
}

export async function getUser(userId, key) {
  return await Axios.get(`users/${userId}`, {
    headers: {
      Authorization: `Bearer ${key}`,
    },
  });
}

export async function createUser(payLoad) {
  const apiKey = getApiKeyFromStorage();
  return await Axios.post("users", payLoad, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
}

export async function updateUserRole(payLoad) {
  const apiKey = getApiKeyFromStorage();
  return await Axios.put("users/role", payLoad, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
}

export async function updateUserPassword(payLoad) {
  const apiKey = getApiKeyFromStorage();
  return await Axios.put("users/settings", payLoad, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
}

export async function deleteUser(userId) {
  const apiKey = getApiKeyFromStorage();
  return await Axios.delete(`users/${userId}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
}
