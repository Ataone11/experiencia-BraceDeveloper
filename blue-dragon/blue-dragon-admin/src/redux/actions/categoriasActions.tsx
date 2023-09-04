import {
  deleteData,
  getData,
  patchData,
  postData,
} from "../../proxy/BackendREST";

export const getCategorias = async () => {
  const response = await getData(`categories`, {}, {});
  const categories = response.data.data;
  return categories;
};

export const getCategoryById = async (idCategory: number) => {
  const response = await getData(`categories/${idCategory}`, {}, {});
  const category = response.data.data;
  return category;
};

export const deleteCategoryById = async (idCategory: number) => {
  const response = await deleteData(`categories/${idCategory}`, {}, null);
  const category = response.data.data;
  return category;
};

export const createCategory = async ({
  es_name,
  en_name,
  zh_name,
  parent,
  photo,
}: {
  es_name: string;
  en_name: string;
  zh_name: string;
  parent?: string;
  photo: string;
}) => {
  const formData = new FormData();
  if (es_name) formData.append("es_name", es_name);
  if (en_name) formData.append("en_name", en_name);
  if (zh_name) formData.append("zh_name", zh_name);
  if (parent) formData.append("parent", parent);

  if (photo)
    formData.append("photo", photo);

  const response = await postData("categories", {}, formData);
  const category = response.data.data;
  return category;
};

export const editCategoryById = async ({
  idCategory,
  es_name,
  en_name,
  zh_name,
  parent,
}: {
  idCategory: number;
  es_name: string;
  en_name: string;
  zh_name: string;
  parent?: string;
}) => {
  const formData = new FormData();
  if (es_name) formData.append("es_name", es_name);
  if (en_name) formData.append("en_name", en_name);
  if (zh_name) formData.append("zh_name", zh_name);
  if (parent) formData.append("parent", parent);

  const response = await patchData(`categories/${idCategory}`, {}, formData);
  const category = response.data.data;
  return category;
};

export const addVariantToCategory = async ({
  name,
  category,
  variant_values,
}: {
  name: string;
  category: number;
  variant_values?: string[];
}) => {
  const response = await postData(
    "variants",
    {},
    { name, category, variant_values }
  );
  const categoryResponse = response.data.data;
  return categoryResponse;
};

export const deleteVariantToCategory = async (idVariant: number) => {
  const response = await deleteData(`variants/${idVariant}`, {}, null);
  const category = response.data.data;
  return category;
};

export const addDataSheetToCategory = async ({
  name,
  required,
  type,
  category,
  discrete_values,
}: {
  name: string;
  required: boolean;
  type: number;
  category: number;
  discrete_values?: string[];
}) => {
  const response = await postData(
    "features",
    {},
    { name, required, type, category, discrete_values }
  );
  const dataSheet = response.data.data;
  return dataSheet;
};

export const deleteDataSheetToCategory = async (idDataSheet: number) => {
  const response = await deleteData(`features/${idDataSheet}`, {}, null);
  const category = response.data.data;
  return category;
};
