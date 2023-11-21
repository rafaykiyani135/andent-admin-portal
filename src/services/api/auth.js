import { Axios } from ".";
export default async function login(payLoad) {
  return await Axios.post("sign-in", payLoad);
}
