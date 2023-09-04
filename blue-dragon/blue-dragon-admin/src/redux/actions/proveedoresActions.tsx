import { getData, patchData } from "../../proxy/BackendREST";

export const getProveedores = async ({
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
  status?: number[] | null;
}) => {
  const PARAMS: any = {};

  if (page) PARAMS.page = page;
  if (order) PARAMS.order = order;
  if (criteria) PARAMS.criteria = criteria;
  if (keyword) PARAMS.keyword = keyword;
  if (status) PARAMS.status = status.join(",");

  const response = await getData(`providers`, PARAMS, {});
  const providers = response.data;
  return providers;
};

export const getProveedorId = async (idProvider: string) => {
  const response = await getData(
    `providers/${idProvider}/company`,
    {},
    {}
  );
  const provider = response.data.data;
  return provider;
};

export const changeStatusProvider = async (
  idProvider: string,
  statusProvider: number
) => {
  const response = await patchData(
    `providers/${idProvider}/status`,
    {},
    { status: statusProvider }
  );
  const provider = response.data.data;
  return provider;
};
