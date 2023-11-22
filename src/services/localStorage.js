export function getApiKeyFromStorage() {
  let apiKey = "";
  const user = localStorage.getItem("andent_portal_user");
  if (user) {
    apiKey = JSON.parse(user)?.apiKey;
  }
  return apiKey;
}

export function clearStorage() {
  localStorage.removeItem("andent_portal_user");
}
