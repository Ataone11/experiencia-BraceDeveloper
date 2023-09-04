import { getData } from "../../proxy/BackendREST";

export const getProductos = async ({
  page,
  order,
  criteria,
  keyword,
}: {
  page: number;
  order?: string | null;
  criteria?: string | null;
  keyword?: string | null;
}) => {
  const PARAMS: any = {};

  if (page) PARAMS.page = page;
  if (order) PARAMS.order = order;
  if (criteria) PARAMS.criteria = criteria;
  if (keyword) PARAMS.keyword = keyword;

  const response = await getData(`products`, PARAMS, {});
  const products = response.data;
  return products;
};

export const getProductId = async (idProduct: string) => {
  const response = await getData(`products/${idProduct}`, {}, {});
  const product = response.data;
  return product;
};
