import { getData, patchData } from "../../proxy/BackendREST";

export const getImportadores = async ({
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

  const response = await getData(`importers`, PARAMS, {});
  const importers = response.data;
  return importers;
};

export const getImportadorId = async (idImporter: string) => {
  const response = await getData(`importers/${idImporter}`, {}, {});
  const importer = response.data;
  return importer;
};

export const changeStatusImportador = async (
  idImporter: string,
  statusImporter: number
) => {
  const response = await patchData(
    `importers/${idImporter}/status`,
    {},
    { status: statusImporter }
  );
  const importer = response.data.data;
  return importer;
};
