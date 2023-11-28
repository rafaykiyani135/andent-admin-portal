import { Axios } from ".";
import { getApiKeyFromStorage } from "../localStorage";

export async function getClients(
  searchText = "",
  pageNumber = 1,
  pageSize = 10
) {
  let endPoint = `clients?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  if (searchText) {
    endPoint = `clients?search=${searchText}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
  }
  const apiKey = getApiKeyFromStorage();
  return await Axios.get(endPoint, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
}

export async function getClientById(clientId) {
  const apiKey = getApiKeyFromStorage();
  return await Axios.get(`clients/${clientId}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
}
export async function createClient(userId) {
  const createClientPayLoad = {
    firstName: "John",
    lastName: "Doe",
    source: "Manual Entry",
    userId,
  };
  const apiKey = getApiKeyFromStorage();
  return await Axios.post("clients", createClientPayLoad, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
}

export async function sendInvoiceToClient(payLoad) {
  const apiKey = getApiKeyFromStorage();
  return await Axios.post("clients/invoice", payLoad, {
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
export async function deleteClientFile(fileId) {
  const apiKey = getApiKeyFromStorage();
  return await Axios.delete(`clients/upload/${fileId}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
}
