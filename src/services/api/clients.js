import { Axios } from ".";
import { getApiKeyFromStorage } from "../localStorage";

export async function getClients() {
  const apiKey = getApiKeyFromStorage();
  return await Axios.get("clients", {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
}
export async function createClient() {
  const createClientPayLoad = {
    firstName: "John",
    lastName: "Doe",
    source: "Manual Entry",
    status: "Contacted",
    country: "United Kingdom",
    clientNotes: "Fix My Teeth",
    email: `${Date.now()}@gmail.com`,
    number: "0513338383",
    userId: "b18e1c77-fa13-11ed-ac69-0a002700000c",
  };
  const apiKey = getApiKeyFromStorage();
  return await Axios.post("clients", createClientPayLoad, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
}
export async function updateClient(payLoad) {
  const apiKey = getApiKeyFromStorage();
  return await Axios.put("clients", payLoad, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
}
export async function deleteClient(clientId) {
  const apiKey = getApiKeyFromStorage();
  return await Axios.delete(`clients/${clientId}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
}

export async function updateClientStatus(payLoad) {
  const apiKey = getApiKeyFromStorage();
  return await Axios.put("clients/status", payLoad, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
}

export async function uploadClientFile(payLoad) {
  const apiKey = getApiKeyFromStorage();
  return await Axios.post("clients/upload", payLoad, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "multipart/form-data",
    },
  });
}
