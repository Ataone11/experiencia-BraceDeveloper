const IMAGE_BASE_64 = 'data:image/*;base64,'
const EXCEL_BASE_64 = 'data:application/vnd.ms-excel;base64,'

export const decodeImageBase64 = (urlImage: string) => {
  const base64 = `${IMAGE_BASE_64}${urlImage}`
  return base64
}

export const decodeExcelBase64 = (urlExcel: string) => {
  const base64 = `${EXCEL_BASE_64}${urlExcel}`
  return base64
}
