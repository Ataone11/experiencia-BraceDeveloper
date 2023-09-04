import { XIcon } from "@heroicons/react/solid";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import ReactTooltip from "react-tooltip";
import TootltipIcon from "../../src/assets/TooltipIcon";
import { CategoryModel, VariantModel } from "../../src/models/CategoryModel";
import { ProductCategoryFeatureModel } from "../../src/models/ProductCategoryFeatureModel";
import { CreateFeatureValueDto } from "../../src/models/ProductDto";
import { CombinationModel, ProductDetailModel, ProductModel, ProductPhotoModel } from "../../src/models/ProductModel";
import NormalInput from "../../src/screens/general/inputs/NormalInput";
import { S3_BUCKET } from "../../src/utils/constants";
import { getS3FileName } from "../../src/utils/string_utils";
import Button from "../Button";
import ChangeStatusSlider from "./ChangeStatusSlider";
import CustomProperties from "./CustomProperties";
import ProductCategoryFeatures from "./ProductCategoryFeatures";
import SelectProductCategory from "./SelectProductCategory";

interface ProductBasicInformationProps {
  editing: boolean;
  basicInformation: ProductModel;
  setBasicInformation: (newBasicInformation: ProductModel) => void;
  hasVariants: boolean;
  categoryVariants: any;
  setCategoryVariants: (newCategoryVariants: any) => void;
  combinations: CombinationModel[] | null;
  setCombinations: (newCombinations: any) => void;
  productDetail?: ProductDetailModel | null;
  setProductDetail: (newProductDetail: ProductDetailModel | null) => void;
  combinationsIdsToDelete: number[];
  setCombinationsIdsToDelete: (newCombinationsIdsToDelete: number[]) => void;
  setHasVariants: (newHasVariants: boolean) => void;
  categoryFeatures: ProductCategoryFeatureModel[] | null;
}
const ProductBasicInformation = ({
  basicInformation,
  setBasicInformation,
  editing,
  hasVariants,
  categoryVariants,
  setCategoryVariants,
  combinations,
  setCombinations,
  productDetail,
  setProductDetail,
  combinationsIdsToDelete,
  setCombinationsIdsToDelete,
  setHasVariants,
  categoryFeatures
}: ProductBasicInformationProps) => {
  const { t } = useTranslation();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const dataSheetInputRef = useRef<HTMLInputElement>(null);
  const [selectingCategory, setSelectingCategory] = useState<boolean>(false);

  const handleChange = (e: any) => {
    setBasicInformation({
      ...basicInformation,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangSendsSamples = () => {
    setBasicInformation({
      ...basicInformation,
      sends_samples: !basicInformation.sends_samples,
    });
  };

  const handlePhoto = (e: any) => {
    setBasicInformation({
      ...basicInformation,
      photos: [...basicInformation.photos, ...e.target.files],
    });
  };

  const handleDataSheetFile = (e: any) => {
    setBasicInformation({
      ...basicInformation,
      data_sheet: e.target.files[0],
    });
  };

  const deletePhoto = (photo: File | ProductPhotoModel, index: number) => {
    const newPhotos = (basicInformation.photos as File[]).filter(
      (_, currentIndex: number) => currentIndex !== index
    );
    let newBasicInformation = {
      ...basicInformation,
      photos: newPhotos,
    };

    // Se guarda la informacion de las fotos que se deben eliminar en el siguiente llamado REST
    if ((photo as ProductPhotoModel).id) {
      newBasicInformation.delete_photos = [
        ...(newBasicInformation.delete_photos || []),
        (photo as ProductPhotoModel).id,
      ];
    }

    setBasicInformation(newBasicInformation);
  };

  const changeCategory = (category: CategoryModel) => {
    setBasicInformation({ ...basicInformation, category });
    setSelectingCategory(false);
  };

  const selectCategory = () => {
    if (
      basicInformation.product_details &&
      basicInformation.product_details[0]?.variant_values &&
      basicInformation.product_details[0].variant_values.length > 0
    ) {
      toast.error(
        "Este producto tiene combinaciones asociadas, para cambiar la categoria primero es necesario eliminarlas"
      );
    } else {
      setSelectingCategory(true);
    }
  };

  const handleCategoryVariantSelection = (variant: VariantModel) => {
    setCategoryVariants({
      ...categoryVariants,
      [variant.id]: {
        ...categoryVariants[variant.id],
        selected: !categoryVariants[variant.id].selected
      }
    });

    // Si estoy deseleccionando recorro las combinaciones y elimino la variante
    if (categoryVariants[variant.id].selected && combinations) {
      const newCombinations = [...combinations].map((combination: CombinationModel) => {
        const newCombination = {
          ...combination,
          variants: combination.variants.filter((currentVariant: VariantModel) => currentVariant.id !== variant.id)
        };
        const combinationVariantValueId = combination.variants.find((v: VariantModel) => v.id === variant.id)?.selectedVariantValueId;
        if (combination.id && combinationVariantValueId) {
          newCombination.delete_variant_values = [
            ...(combination.delete_variant_values || []),
            parseInt(combinationVariantValueId)
          ];
        }
        return newCombination;
      });
      setCombinations(newCombinations);
    }
  }

  const changeHasVariants = (newHasVariants: boolean) => {
    if (newHasVariants) {
      setProductDetail(null);
      setCombinations([]);
      if (productDetail?.id)
        setCombinationsIdsToDelete([...combinationsIdsToDelete, productDetail.id]);
    } else {
      const newCombinationsIdsToDelete = [...combinationsIdsToDelete];
      combinations?.forEach((c: CombinationModel) => {
        if (c.id)
          newCombinationsIdsToDelete.push(c.id)
      });
      setCombinationsIdsToDelete(newCombinationsIdsToDelete);
    }
    setHasVariants(newHasVariants);
  }
  return (
    <div className="rounded-[10px] bg-white py-[30px] md:px-[35px] relative flex flex-col select-none md:border-[1px] md:border-[#EEEEEE] md:mt-[24px]">
      <div className="flex justify-between">
        <h2 className="text-[24px] font-bold">
          {editing ? basicInformation.name : "Nuevo producto"}
        </h2>
        <div className="flex">
          <span className="mr-2 text-[13px] self-center">
          {t("products:product-status")}
          </span>
          {editing ? (
            <ChangeStatusSlider
              status={basicInformation.status}
              setStatus={(newStatus: number) => {
                setBasicInformation({
                  ...basicInformation,
                  status: newStatus,
                });
              }}
            />
          ) : (
            <span className="self-center font-bold text-primary border-primary border-1">
              {t("products:eraser")}
            </span>
          )}
        </div>
      </div>
      <div
        className={`shadow-thru rounded-[8px] border-[1px] bg-white border-gray-page py-[13px] md:py-[26px] px-[20px] md:px-[40px] mt-[10px] md:mt-[28px] flex flex-col`}
      >
        <h2 className="text-[20px] text-primary font-bold">
        {t("products:basic-information")}
        </h2>
        <div className="flex flex-col lg:flex-row gap-5">
          <NormalInput
            fieldName={t("products:product-name")}
            type="text"
            width="lg:w-1/2"
            onChange={handleChange}
            inputName={"name"}
            value={basicInformation.name}
            maxLength={120}
          />
          <div className="flex flex-col md:flex-row lg:w-1/2 gap-5">
            <NormalInput
              optional={true}
              required={false}
              width="md:w-1/2"
              fieldName={t("products:minimum-order-quantity")}
              type="number"
              onChange={handleChange}
              inputName={"moq"}
              value={basicInformation.moq}
            />
            <NormalInput
              optional={true}
              required={false}
              width="md:w-1/2"
              fieldName={t("products:sales-unit")}
              type="text"
              onChange={handleChange}
              inputName={"unit"}
              value={basicInformation.unit}
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-5 mt-[10px]">
          <div className="flex flex-col md:flex-row lg:w-1/2 gap-5">
            <NormalInput
              optional={true}
              required={false}
              width="md:w-1/2"
              fieldName="HS Code"
              type="number"
              onChange={handleChange}
              inputName={"hs_code"}
              value={basicInformation.hs_code}
              tooltip="El Código de Sistema Armonizado (HS Code) es un método numérico estandarizado para clasificar los productos comercializados."
            />
            <label className="cursor-pointer flex items-center md:self-end my-[0.5rem] h-[2.1rem]">
              <input
                type="checkbox"
                id="cbox1"
                checked={basicInformation.sends_samples}
                onChange={handleChangSendsSamples}
                name={"sends_samples"}
              />
              <span className="text-[13px] ml-2 text-black-page">
              {t("products:samples-are-sent")}
              </span>
            </label>
          </div>
          <div className="lg:w-1/2 flex flex-col md:flex-row justify-between">
            <div className="flex flex-col justify-between my-[0.5rem]">
              <h2 className="text-[0.9rem] text-primary font-bold">
              {t("products:category")}
              </h2>
              <h2 className="text-[0.9rem] text-black-page">
                {basicInformation.category
                  ? basicInformation.category.name.text
                  : t("products:select-category")}
              </h2>
            </div>
            <Button
              onClick={selectCategory}
              text={t("products:select")}
              className="self-start my-[0.5rem] mt-auto"
            />
          </div>
        </div>
        <div className="w-full">
          <h2 className="text-[0.9rem] text-primary font-bold mt-5 pb-[0.5rem]">
          {t("products:description")}
          </h2>
          <textarea
            value={basicInformation.description || ""}
            onChange={handleChange}
            name="description"
            className="w-full border-2 border-gray-page rounded-[0.4rem] p-[0.5rem] outline-none text-[0.8rem]"
          ></textarea>
        </div>
      </div>
      <div
        className={`shadow-thru rounded-[8px] border-[1px] bg-white border-gray-page py-[13px] md:py-[26px] px-[20px] md:px-[40px] mt-[10px] md:mt-[28px] flex flex-col`}
      >
        <h2 className="text-[20px] text-primary font-bold">
        {t("products:variants")}
        </h2>
        <div className="flex flex-col lg:flex-row gap-5 mt-[10px]">
          <div className='flex flex-col w-1/2 justify-between lg:w-1/2'>
            <h2 className='text-[13px] text-primary font-medium'>{t("products:add-variants")}</h2>
            <div className='flex mt-[20px]'>
              <div className="flex items-center">
                <input checked={hasVariants} onChange={(e: any) => changeHasVariants(JSON.parse(e.target.value))} id="has-variants-radio-1" type="radio" value={'true'} name="hasVariants" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="has-variants-radio-1" className="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500">Si</label>
              </div>
              <div className="flex items-center ml-3">
                <input checked={!hasVariants} onChange={(e: any) => changeHasVariants(JSON.parse(e.target.value))} id="has-variants-radio-2" type="radio" value={'false'} name="hasVariants" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="has-variants-radio-2" className="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500">No</label>
              </div>
            </div>
          </div>
          {
            hasVariants &&
            <div className='flex flex-col w-full lg:w-1/2'>
              <h2 className='text-[13px] text-primary font-medium'>{t("products:handle-variants-by")}</h2>
              {
                categoryVariants && Object.values(categoryVariants).length > 0 ?
                  <div className='flex gap-2'>
                    {
                      categoryVariants && Object.values(categoryVariants).map((variant: any) => <label key={variant.id} className='cursor-pointer flex items-center self-end h-[2.1rem]'>
                        <input type="checkbox" id={`cbox-variant-${variant.id}`} checked={variant.selected} onChange={() => handleCategoryVariantSelection(variant)} />
                        <span className='text-[13px] ml-2 text-black-page'>
                          {variant.name}
                        </span>
                      </label>)
                    }
                  </div> :
                  <span className='text-black-page text-[13px] w-full block'>
                    {
                      basicInformation.category ?
                      `${ t("products:the-category")} ${basicInformation.category?.name.text} ${ t("products:not-variant")}` :
                        `${ t("products:a-variant")}`
                    }
                  </span>
              }
            </div>
          }
        </div>
      </div>
      <div
        className={`shadow-thru rounded-[8px] border-[1px] bg-white border-gray-page py-[13px] md:py-[26px] px-[20px] md:px-[40px] mt-[10px] md:mt-[28px] flex flex-col`}
      >
        <h2 className="text-[20px] text-primary font-bold">{t("products:data-sheet")}</h2>
        <div className="flex flex-col items-start w-fit">
          <h2 className="text-[0.9rem] text-primary font-bold mt-5 pb-[0.5rem]">
            Descargable ficha técnica:
          </h2>
          <div className="flex flex-col">
            <Button onClick={() => dataSheetInputRef.current?.click()} text={basicInformation.data_sheet ? "Cambiar" : "Adjuntar"} className="mr-auto" />
            {
              basicInformation.data_sheet && <span className="text-xs mt-2 text-black-page">
                {
                  (basicInformation.data_sheet as File)?.name || (getS3FileName(basicInformation.data_sheet as string))
                }
              </span>
            }

          </div>
          <input onChange={handleDataSheetFile} type="file" className="hidden" ref={dataSheetInputRef} />
        </div>
        <ProductCategoryFeatures
          basicInformation={basicInformation}
          setBasicInformation={setBasicInformation}
          categoryFeatures={categoryFeatures}
          categoryFeatureValues={basicInformation.category_features_values as CreateFeatureValueDto[]}
          setCategoryFeatureValues={(newCategoryFeaturesValues: CreateFeatureValueDto[]) => setBasicInformation({
            ...basicInformation,
            category_features_values: newCategoryFeaturesValues
          })}
        />
        <CustomProperties
          basicInformation={basicInformation}
          setBasicInformation={setBasicInformation}
        />
      </div>
      <div
        className={`shadow-thru rounded-[8px] border-[1px] bg-white border-gray-page py-[13px] md:py-[26px] px-[20px] md:px-[40px] mt-[10px] md:mt-[28px] flex flex-col`}
      >
        <div className="flex justify-between">
          <h2 className="text-[20px] text-primary font-bold">{ t("products:mult")}</h2>
          <div data-tip={"Agrega fotografías de tu producto"} data-for={`multimedia__tooltip`}><TootltipIcon size={20} /></div>
        </div>
        <p className="text-[13px]">{ t("products:we-recommend")}</p>
        <ReactTooltip effect="solid" id={`multimedia__tooltip`} />
        <div className="flex gap-5 mt-[20px] flex-wrap justify-around">
          {basicInformation.photos.map(
            (photo: File | ProductPhotoModel, index: number) => (
              <div key={index} className="flex flex-col w-[80px] relative">
                <div className="w-[80px] h-[80px] rounded-[6px] shadow-md overflow-hidden relative">
                  <Image
                    src={
                      (photo as File).name
                        ? URL.createObjectURL(photo as File)
                        : S3_BUCKET + (photo as ProductPhotoModel).url
                    }
                    layout="fill"
                    objectFit="cover"
                    alt=""
                  />
                </div>
                <div
                  onClick={() => deletePhoto(photo, index)}
                  className="bg-primary absolute p-1 rounded-full flex justify-center items-center cursor-pointer right-[-10px] top-[-5px]"
                >
                  <XIcon color="white" width={10} height={10} />
                </div>
                {(photo as File).name && (
                  <span className="text-center text-[10px] mt-2">
                    {(photo as File).name}
                  </span>
                )}
              </div>
            )
          )}
        </div>
        <Button
          onClick={() => imageInputRef.current?.click()}
          text={ t("products:add-image")}
          className="mx-auto my-5"
        />
        <input
          onChange={handlePhoto}
          className="hidden"
          type="file"
          accept="image/*"
          multiple
          ref={imageInputRef}
        />
      </div>
      {selectingCategory && (
        <SelectProductCategory
          closeDialogue={() => setSelectingCategory(false)}
          changeCategory={changeCategory}
        />
      )}
    </div>
  );
};

export default ProductBasicInformation;
