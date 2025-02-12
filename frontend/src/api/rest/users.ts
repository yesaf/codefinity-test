import axios from "axios";
import httpClient from "./client";
import { TRandomUserData, TUser } from "@/types/user";
import { TChat } from "@/types/chat";

export const getUsers = async (): Promise<TUser[]> => {
  const response = await httpClient.get("/users");
  return response.data;
};

export const getUser = async (userId: string): Promise<TUser> => {
  const response = await httpClient.get(`/users/${userId}`);
  return response.data;
};

export const getUsersExceptCurrent = async (userId: string): Promise<TUser[]> => {
  const response = await httpClient.get(`/users/except/${userId}`);
  return response.data;
}

export const createUser = async (data: Partial<TUser>): Promise<TUser> => {
  const response = await httpClient.post("/users", data);
  return response.data;
};

export const getRandomUser = async (): Promise<TRandomUserData> => {
  const response = await axios.get("https://randomuser.me/api/");
  return response.data;
}

export const getLoremIpsum = async (): Promise<string> => {
  const response = await axios.get("https://baconipsum.com/api/?type=meat-and-filler");
  return response.data[0];
}

export const getUserChats = async (userId: string): Promise<TChat[]> => {
  const response = await httpClient.get(`/users/${userId}/chats`);
  return response.data;
}
