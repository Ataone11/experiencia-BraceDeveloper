import { getData, postData } from "../../proxy/BackendREST";

export const getConversations = async (
  id: string,
  role: number | null,
  status: number | null,
  name: string,
  page: number
) => {
  const response = await getData(
    `chats/conversations/${id}`,
    { role, status, name, page, take: 20 },
    {}
  );
  const conversations = response.data.data;
  return conversations;
};

export const getConversation = async (
  id: string,
  from: string,
  page: number
) => {
  const response = await getData(
    `chats/${id}/from/${from}`,
    { page, take: 20 },
    {}
  );
  const conversation = response.data.data;
  return conversation;
};

export const closeConversation = async (id: string) => {
  const response = await postData(`chats/${id}/closeConversation`, {}, {});
  const conversation = response.data.data;
  return conversation;
};

export const sendMessage = async (
  from: string,
  to: string,
  message: string,
  file: any,
  language: string
) => {
  const data: any = { from, to, message, file, language };
  const formData = new FormData();
  Object.keys(data).forEach((key: any) => {
    if (data[key]) formData.append(key, data[key]);
  });
  const response = await postData(`chats`, {}, formData);
  const messageRes = response.data.data;
  return messageRes;
};
