import Image from "next/image";
import React, { useState } from "react";
import Button from "../../Button";
import DeleteIcon from "../../../src/assets/general/DeleteIcon";
import EditIcon from "../../../src/assets/general/EditIcon";
import AddEditVariantsCombinations from "../AddEditVariantsCombinations";
import {
  CombinationModel,
  ProductDetailModel,
} from "../../../src/models/ProductModel";
import { getImageSrc } from "../../../src/utils/images";
import { VariantModel } from "../../../src/models/CategoryModel";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

interface CombinationsTableProps {
  productDetails?: ProductDetailModel[];
  combinations: CombinationModel[];
  setCombinations: (newCombinations: any) => void;
  selectedVariants: any[];
  hasEXW: boolean;
  hasFOB: boolean;
  categoryVariants: any;
  combinationsIdsToDelete: number[];
  setCombinationsIdsToDelete: (newCombinationsIdsToDelete: number[]) => void;
}

const CombinationsTable = ({
  combinations,
  selectedVariants,
  hasEXW,
  hasFOB,
  setCombinations,
  categoryVariants,
  combinationsIdsToDelete,
  setCombinationsIdsToDelete,
}: CombinationsTableProps) => {
  const [indexCombinationToEdit, setIndexCombinationToEdit] = useState<
    number | null
  >(null);
  const [addingCombination, setAddingCombination] = useState(false);

  const deleteCombination = (
    combination: CombinationModel,
    combinationIndex: number
  ) => {
    const newCombinations = combinations.filter(
      (_: any, index: number) => combinationIndex !== index
    );
    setCombinations(newCombinations);

    if (combination.id) {
      setCombinationsIdsToDelete([...combinationsIdsToDelete, combination.id]);
    }
  };
 
  const { t } = useTranslation();
  return (
    <>
      <div
        className={`shadow-thru rounded-[8px] border-[1px] bg-white border-gray-page py-[26px] px-[40px] mt-[28px] flex flex-col`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-[20px] text-primary font-bold">
            {t("products:combine-variant")}
          </h2>
          <Button
            onClick={() => setAddingCombination(true)}
            text={t("products:add-combine")}
          />
        </div>
        {combinations.length > 0 ? (
          <>
            <div className="grid grid-cols-auto-fit w-full mt-10 justify-items-center">
              <div className="text-[13px] font-bold text-dark-blue text-center self-center"></div>
              {selectedVariants.map((currentVariant: any) => {
                return (
                  <div
                    key={currentVariant.id}
                    className="text-[13px] font-bold text-dark-blue text-center self-center"
                  >
                    {currentVariant?.name}
                  </div>
                );
              })}
              {hasEXW && (
                <>
                  <div className="text-[13px] font-bold text-dark-blue text-center self-center">
                  {t("products:price")} EXW (USD)
                  </div>
                  <div className="text-[13px] font-bold text-dark-blue text-center self-center">
                  {t("products:discount-price")} EXW (USD)
                  </div>
                </>
              )}
              {hasFOB && (
                <>
                  <div className="text-[13px] font-bold text-dark-blue text-center self-center">
                  {t("products:price")} FOB (USD)
                  </div>
                  <div className="text-[13px] font-bold text-dark-blue text-center self-center">
                  {t("products:discount-price")}FOB (USD)
                  </div>
                </>
              )}
              <div className="text-[13px] font-bold text-dark-blue text-center self-center">
                SKU
              </div>
              <div className="text-[13px] font-bold text-dark-blue text-center self-center"></div>
            </div>
            {combinations.map(
              (combination: CombinationModel, index: number) => (
                <div
                  key={index}
                  className="grid grid-cols-auto-fit w-full mt-5 justify-items-center items-center"
                >
                  <Image
                    src={getImageSrc(combination.photo)}
                    width={50}
                    height={50}
                    objectFit={combination.photo ? "cover" : "contain"}
                    className="rounded-[4px]"
                    alt=""
                  />
                  {selectedVariants.map((variant: any) => {
                    const combinationVariant = combination.variants.find(
                      (currentVariant: VariantModel) =>
                        variant.id === currentVariant.id
                    );
                    const variantValue = categoryVariants[
                      variant.id
                    ]?.variant_values.find(
                      (currentValue: any) =>
                        currentValue.id ===
                        parseInt(
                          combinationVariant?.selectedVariantValueId || "-1"
                        )
                    );
                    return (
                      <div
                        key={variant.id}
                        onClick={() =>
                          !variantValue?.value &&
                          setIndexCombinationToEdit(index)
                        }
                        className={`text-[13px] flex-grow text-center flex items-center justify-center ${
                          !variantValue?.value
                            ? "bg-yellow-200 w-full h-full cursor-pointer"
                            : ""
                        }`}
                      >
                        {variantValue?.value || t("products:select")}
                      </div>
                    );
                  })}
                  {hasEXW && (
                    <>
                      <div
                        onClick={() =>
                          !combination.infoEXW?.price &&
                          setIndexCombinationToEdit(index)
                        }
                        className={`text-[13px] flex-grow text-center flex items-center justify-center ${
                          !combination.infoEXW?.price
                            ? "bg-yellow-200 w-full h-full cursor-pointer"
                            : ""
                        }`}
                      >
                        {combination.infoEXW?.price
                          ? `$${combination.infoEXW?.price} USD`
                          : t("products:select")}
                      </div>
                      <div
                        onClick={() =>
                          !combination.infoEXW?.discount_price &&
                          combination.has_discount &&
                          setIndexCombinationToEdit(index)
                        }
                        className={`text-[13px] flex-grow text-center flex items-center justify-center ${
                          !combination.infoEXW?.discount_price &&
                          combination.has_discount
                            ? "bg-yellow-200 w-full h-full cursor-pointer"
                            : ""
                        }`}
                      >
                        {combination.infoEXW?.discount_price
                          ? `$${combination.infoEXW?.discount_price} USD`
                          : combination.has_discount
                          ? t("products:select")
                          : "-"}
                      </div>
                    </>
                  )}
                  {hasFOB && (
                    <>
                      <div
                        onClick={() =>
                          !combination.infoFOB?.price &&
                          setIndexCombinationToEdit(index)
                        }
                        className={`text-[13px] flex-grow text-center flex items-center justify-center ${
                          !combination.infoFOB?.price
                            ? "bg-yellow-200 w-full h-full cursor-pointer"
                            : ""
                        }`}
                      >
                        {combination.infoFOB?.price
                          ? `$${combination.infoFOB?.price} USD`
                          : t("products:select")}
                      </div>
                      <div
                        onClick={() =>
                          !combination.infoFOB?.discount_price &&
                          combination.has_discount &&
                          setIndexCombinationToEdit(index)
                        }
                        className={`text-[13px] flex-grow text-center flex items-center justify-center ${
                          !combination.infoFOB?.discount_price &&
                          combination.has_discount
                            ? "bg-yellow-200 w-full h-full cursor-pointer"
                            : ""
                        }`}
                      >
                        {combination.infoFOB?.discount_price
                          ? `$${combination.infoFOB?.discount_price} USD`
                          : combination.has_discount
                          ? t("products:select")
                          : "-"}
                      </div>
                    </>
                  )}
                  <div className="text-[13px] flex-grow text-center">
                    {combination.sku}
                  </div>
                  <div className="text-[13px] flex-grow text-center flex">
                    <button
                      type="button"
                      onClick={() => setIndexCombinationToEdit(index)}
                      className="bg-primary py-[10px] px-[20px] rounded-[6px]"
                    >
                      <EditIcon />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteCombination(combination, index)}
                      className="bg-[#ED5A51] py-[10px] px-[20px] rounded-[6px] ml-[10px]"
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              )
            )}
          </>
        ) : (
          <div className="mx-auto text-[#868686] my-[45px] text-[14px]">
            {t("products:you-have-not-currently")}
          </div>
        )}
      </div>
      {addingCombination && (
        <AddEditVariantsCombinations
          addCombination={(combination: any) =>
            setCombinations([...combinations, combination])
          }
          variants={selectedVariants}
          closeDialogue={() => setAddingCombination(false)}
          hasEXW={hasEXW}
          hasFOB={hasFOB}
        />
      )}
      {indexCombinationToEdit !== null && (
        <AddEditVariantsCombinations
          combinationToEdit={combinations[indexCombinationToEdit]}
          editCombination={(combination: any) =>
            setCombinations(
              combinations.map((currentCombination: any, index: number) => {
                if (index === indexCombinationToEdit) {
                  return combination;
                } else {
                  return currentCombination;
                }
              })
            )
          }
          variants={selectedVariants}
          closeDialogue={() => setIndexCombinationToEdit(null)}
          hasEXW={hasEXW}
          hasFOB={hasFOB}
        />
      )}
    </>
  );
};

export default CombinationsTable;
