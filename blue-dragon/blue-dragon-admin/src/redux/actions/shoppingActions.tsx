import { getData, postData } from "../../proxy/BackendREST";

export const getOrders = async ({
  page,
  order,
  criteria,
  keyword,
  status,
}: {
  page: number;
  order?: string | null;
  criteria?: string | null;
  keyword?: string | null;
  status?: number | null;
}) => {
  const PARAMS: any = {};

  if (page) PARAMS.page = page;
  if (order) PARAMS.order = order;
  if (criteria) PARAMS.criteria = criteria;
  if (keyword) PARAMS.keyword = keyword;
  if (status) PARAMS.status = status;

  const response = await getData(`orders`, PARAMS, {});
  const orders = response.data;
  return orders;
};

export const getOrderById = async (idOrder: string) => {
  const response = await getData(`orders/${idOrder}`, {}, {});
  const order = response.data;
  return order;
};
