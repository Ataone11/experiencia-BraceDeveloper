import React, { useEffect } from 'react'
import { CombinationModel, ProductDetailModel, ProductModel } from '../../src/models/ProductModel';
import NormalInput from '../../src/screens/general/inputs/NormalInput';
import { VariantModel } from '../../src/models/CategoryModel';
import CombinationsTable from './CombinationsTable';
import { INCOTERMS } from '../../src/utils/constants';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';


  

interface ProductSaleInformationProps {
    basicInformation: ProductModel
    combinations: CombinationModel[] | null
    setCombinations: (newCombinations: any) => void
    combinationsIdsToDelete: number[]
    setCombinationsIdsToDelete: (newCombinationsIdsToDelete: number[]) => void
    categoryVariants: any
    setCategoryVariants: (newCategoryVariants: any) => void
    selectedVariants: any
    hasVariants: boolean
    hasEXW: boolean
    setHasEXW: (newHasEXW: boolean) => void
    hasFOB: boolean
    setHasFOB: (newHasFOB: boolean) => void
    productDetail?: ProductDetailModel | null,
    setProductDetail: (newProductDetail: ProductDetailModel | null) => void
}

const ProductSaleInformation = ({
    basicInformation,
    combinations,
    setCombinations,
    combinationsIdsToDelete,
    setCombinationsIdsToDelete,
    categoryVariants,
    setCategoryVariants,
    selectedVariants,
    hasVariants,
    hasEXW,
    setHasEXW,
    hasFOB,
    setHasFOB,
    productDetail,
    setProductDetail
}: ProductSaleInformationProps) => {
    const { t } = useTranslation();
    const atLeastOneSelectedVariant = selectedVariants && Object.values(selectedVariants).some((selectedVariants: any) => selectedVariants);

    useEffect(() => {
        if ((selectedVariants?.length === 0 || (!hasFOB && !hasEXW)) && combinations) {
            const newCombinationsIdsToDelete: number[] = []
            combinations.forEach((combination: CombinationModel) => {
                if (combination.id) {
                    newCombinationsIdsToDelete.push(combination.id);
                }
            });
            setCombinations([]);
            setCombinationsIdsToDelete(newCombinationsIdsToDelete);
        }
    }, [categoryVariants, hasEXW, hasFOB]);

    // const handleCategoryVariantSelection = (variant: VariantModel) => {
    //     setCategoryVariants({
    //         ...categoryVariants,
    //         [variant.id]: {
    //             ...categoryVariants[variant.id],
    //             selected: !categoryVariants[variant.id].selected
    //         }
    //     });

    //     // Si estoy deseleccionando recorro las combinaciones y elimino la variante
    //     if (categoryVariants[variant.id].selected && combinations) {
    //         const newCombinations = [...combinations].map((combination: CombinationModel) => {
    //             const newCombination = {
    //                 ...combination,
    //                 variants: combination.variants.filter((currentVariant: VariantModel) => currentVariant.id !== variant.id)
    //             };
    //             const combinationVariantValueId = combination.variants.find((v: VariantModel) => v.id === variant.id)?.selectedVariantValueId;
    //             if (combination.id && combinationVariantValueId) {
    //                 newCombination.delete_variant_values = [
    //                     ...(combination.delete_variant_values || []),
    //                     parseInt(combinationVariantValueId)
    //                 ];
    //             }
    //             return newCombination;
    //         });
    //         setCombinations(newCombinations);
    //     }
    // }

    const handleIncotermSelectionCombinations = (incoterm: INCOTERMS) => {
        // Esta funcion se usa cuando se elimina el incoterm para quitar la informacion de las combinaciones
        const clearCombinationsIncotermInfo = () => {
            const newCombinations = [...(combinations || [])].map((combination: CombinationModel) => {
                const incotermFieldName = incoterm === INCOTERMS.EXW ? "infoEXW" : "infoFOB";
                const productIncotermId = combination[incotermFieldName]?.id;
                const newCombination = {
                    ...combination,
                };

                delete newCombination[incotermFieldName];

                // Esto se hace en caso de que la informacion del producto incoterm ya exista en la BD
                if (productIncotermId) {
                    newCombination.delete_product_incoterms = [
                        ...(combination.delete_product_incoterms || []),
                        productIncotermId
                    ]
                }

                return newCombination;
            });
            setCombinations(newCombinations);
        }

        if (incoterm === INCOTERMS.EXW) {
            if (hasEXW) {
                clearCombinationsIncotermInfo()
            }

            setHasEXW(!hasEXW)
        } else if (incoterm === INCOTERMS.FOB) {
            if (hasFOB) {
                clearCombinationsIncotermInfo()
            }

            setHasFOB(!hasFOB)
        }
    }

    const handleIncotermSelection = (incoterm: INCOTERMS) => {
        if (hasVariants) {
            handleIncotermSelectionCombinations(incoterm)
        } else {
            if (incoterm === INCOTERMS.EXW) {
                if (hasEXW) {
                    let newProductDetail = {
                        ...productDetail,
                        infoEXW: null,
                    };
                    if (productDetail?.infoEXW?.id) {
                        newProductDetail = {
                            ...newProductDetail,
                            productIncotermsIdsToDelete: [
                                ...(productDetail?.productIncotermsIdsToDelete || []),
                                productDetail?.infoEXW?.id
                            ]
                        };
                    }

                    setProductDetail(newProductDetail);
                }

                setHasEXW(!hasEXW)
            } else if (incoterm === INCOTERMS.FOB) {
                if (hasFOB) {
                    let newProductDetail = {
                        ...productDetail,
                        infoFOB: null,
                    };
                    if (productDetail?.infoFOB?.id) {
                        newProductDetail = {
                            ...newProductDetail,
                            productIncotermsIdsToDelete: [
                                ...(productDetail?.productIncotermsIdsToDelete || []),
                                productDetail?.infoFOB?.id
                            ]
                        };
                    }

                    setProductDetail(newProductDetail);
                }

                setHasFOB(!hasFOB)
            }
        }
    }

    const handleChangeProductIncoterm = (e: any, incoterm: INCOTERMS) => {
        const infoToUse = incoterm === INCOTERMS.EXW ? "infoEXW" : "infoFOB";
        setProductDetail({
            ...productDetail,
            [infoToUse]: {
                ...(productDetail && productDetail[infoToUse] || {}),
                [e.target.name]: parseFloat(e.target.value)
            }
        });
    }

    const handleChangeProductDetail = (e: any) => {
        let newProductDetail = {
            ...productDetail,
            [e.target.name]: e.target.name === "has_discount" ? JSON.parse(e.target.value) : e.target.value
        };

        if (e.target.name === "has_discount" && !JSON.parse(e.target.value)) {
            newProductDetail = {
                ...newProductDetail,
                infoEXW: {
                    ...newProductDetail.infoEXW,
                    discount_price: null
                },
                infoFOB: {
                    ...newProductDetail.infoFOB,
                    discount_price: null
                }
            };
        }

        setProductDetail(newProductDetail);
    }

    // const changeHasVariants = (newHasVariants: boolean) => {
    //     if (newHasVariants) {
    //         setProductDetail(null);
    //         setCombinations([]);
    //         if(productDetail?.id)
    //             setCombinationsIdsToDelete([...combinationsIdsToDelete, productDetail.id]);
    //     } else {
    //         const newCombinationsIdsToDelete = [...combinationsIdsToDelete];
    //         combinations?.forEach((c: CombinationModel) => {
    //             if(c.id)
    //                 newCombinationsIdsToDelete.push(c.id)
    //         });
    //         setCombinationsIdsToDelete(newCombinationsIdsToDelete);
    //     }
    //     setHasVariants(newHasVariants);
    // }

    return (
        <div className='rounded-[10px] bg-white py-[30px] md:px-[35px] relative flex flex-col select-none md:border-[1px] border-[#EEEEEE] mt-[24px]'>
            <h2 className='text-[24px] font-bold'>{basicInformation.name}</h2>
            <div className='shadow-thru rounded-[8px] border-[1px] bg-white border-gray-page py-[13px] md:py-[26px] px-[20px] md:px-[40px] mt-[10px] md:mt-[28px] flex flex-col'>
                <h2 className='text-[20px] text-primary font-bold'>{t("products:sale-information")}</h2>
                <div className='mt-[15px] grid grid-cols-2 gap-5'>
                    {/* <div className='flex flex-col w-1/2 justify-between'>
                        <h2 className='text-[13px] text-primary font-medium'>Agregar variantes:</h2>
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
                    </div> */}
                    {/* {
                        hasVariants &&
                        <div className='flex flex-col w-full'>
                            <h2 className='text-[13px] text-primary font-medium'>Manejar variantes por:</h2>
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
                                                `La categoría ${basicInformation.category?.name.text} no tiene variantes, por lo tanto no es posible crear una para este producto.` :
                                                `Asocia primero una categoria a este producto para poder agregar variantes`
                                        }
                                    </span>
                            }
                        </div>
                    } */}
                    <div className='flex flex-col w-full'>
                        <h2 className='text-[13px] text-primary font-medium'>{t("products:sales-modality")}</h2>
                        <div className='flex '>
                            <label className='cursor-pointer flex items-center self-end h-[2.1rem]'>
                                <input type="checkbox" id="cbox1" checked={hasEXW} onChange={() => handleIncotermSelection(INCOTERMS.EXW)} />
                                <span className='text-[13px] ml-2 text-black-page'>
                                    EXW
                                </span>
                            </label>
                            <label className='cursor-pointer flex items-center self-end h-[2.1rem] ml-2'>
                                <input type="checkbox" id="cbox2" checked={hasFOB} onChange={() => handleIncotermSelection(INCOTERMS.FOB)} />
                                <span className='text-[13px] ml-2 text-black-page'>
                                    FOB
                                </span>
                            </label>
                        </div>
                    </div>
                    {
                        !hasVariants &&
                        <NormalInput tooltip='Es el número de referencia único del producto, según aparece registrado en el sistema de tu empresa.' required={false} max={999999999} inputName='sku' value={productDetail?.sku} onChange={handleChangeProductDetail} type={"text"} width='flex-grow' fieldName='SKU'></NormalInput>
                    }
                </div>
                {
                    !hasVariants &&
                    <>
                        <h2 className='text-[20px] text-primary font-bold'>{t("products:prices")}</h2>
                        <div className='flex flex-col mt-[15px]'>
                            <h3 className='text-[13px] text-dark-blue'>{t("products:it-has-a-discount")}</h3>
                            <div className='flex mt-[20px]'>
                                <div className="flex items-center">
                                    <input checked={productDetail?.has_discount} onChange={handleChangeProductDetail} name="has_discount" id="has-variants-radio-1" type="radio" value={'true'} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="has-variants-radio-1" className="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500">{t("products:yes")}</label>
                                </div>
                                <div className="flex items-center ml-3">
                                    <input checked={!productDetail?.has_discount} onChange={handleChangeProductDetail} name="has_discount" id="has-variants-radio-2" type="radio" value={'false'} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="has-variants-radio-2" className="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500">{t("products:no")}</label>
                                </div>
                            </div>
                        </div>
                        <div className='mt-[15px] grid grid-cols-2 gap-x-5'>
                            {
                                hasEXW && <>
                                    <NormalInput inputName='price' value={productDetail?.infoEXW?.price} onChange={(e: any) => handleChangeProductIncoterm(e, INCOTERMS.EXW)} type={"number"} width='flex-grow' fieldName={t("products:price")+'EXW (USD)'}></NormalInput>
                                    {
                                        productDetail?.has_discount && <NormalInput inputName='discount_price' value={productDetail?.infoEXW?.discount_price} onChange={(e: any) => handleChangeProductIncoterm(e, INCOTERMS.EXW)} type={"number"} width='flex-grow' fieldName={t("products:discount-price")+'EXW (USD)'}></NormalInput>
                                    }
                                </>
                            }
                            {
                                hasFOB && <>
                                    <NormalInput inputName='price' value={productDetail?.infoFOB?.price} onChange={(e: any) => handleChangeProductIncoterm(e, INCOTERMS.FOB)} type={"number"} width='flex-grow' fieldName='Precio FOB (USD)'></NormalInput>
                                    {
                                        productDetail?.has_discount && <NormalInput inputName='discount_price' value={productDetail?.infoFOB?.discount_price} onChange={(e: any) => handleChangeProductIncoterm(e, INCOTERMS.FOB)} type={"number"} width='flex-grow' fieldName={t("products:discount-price")+'FOB (USD)'}></NormalInput>
                                    }
                                </>
                            }
                        </div>
                    </>
                }
            </div>
            {
                hasVariants && atLeastOneSelectedVariant && combinations && (hasEXW || hasFOB) && <CombinationsTable categoryVariants={categoryVariants} combinations={combinations} setCombinations={setCombinations} selectedVariants={selectedVariants} hasEXW={hasEXW} hasFOB={hasFOB} productDetails={basicInformation.product_details} combinationsIdsToDelete={combinationsIdsToDelete} setCombinationsIdsToDelete={setCombinationsIdsToDelete} />
            }
        </div >
    )
}

export default ProductSaleInformation