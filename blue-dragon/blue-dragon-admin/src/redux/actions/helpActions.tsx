import { getData, patchData } from "../../proxy/BackendREST";

export const getRequestHelps = async ({
  typeRequest,
  page,
  order,
  criteria,
  keyword,
}: {
  typeRequest: string;
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

  const response = await getData(`${typeRequest}-help`, PARAMS, {});
  const helps = response.data;
  return helps;
};

export const getRequestHelpById = async ({
  typeRequest,
  idRequest,
}: {
  typeRequest: string;
  idRequest: string;
}) => {
  const response = await getData(
    `${typeRequest}-help/${idRequest}`,
    {},
    {}
  );
  const help = response.data;
  return help;
};

export const postHelpAnswer = async ({
  typeRequest,
  id,
  message,
}: {
  typeRequest: string;
  id: string;
  message?: string;
}) => {
  const response = await patchData(
    `${typeRequest}-help/${id}/solve`,
    {},
    { solved: true }
  );
  const help = response.data;
  return help;
};
