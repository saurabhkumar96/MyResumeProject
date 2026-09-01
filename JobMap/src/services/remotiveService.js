import axios from "axios";

const api = axios.create({
  baseURL: "https://remotive.com/api/remote-jobs", 
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function allRemoteJobs() {
  const response = await api.get("")
  return response.data
}