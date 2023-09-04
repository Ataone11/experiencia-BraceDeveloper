import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { VariantModel, VariantValueModel } from '../../src/models/CategoryModel'
import { CombinationModel } from '../../src/models/ProductModel'
import Button from '../Button'

interface AddEditVariantsCombinationsProps {
    closeDialogue: () => void,
    variants: VariantModel[],
    hasEXW: boolean,
    hasFOB: boolean,
    addCombination?: (combination: any) => void
    editCombination?: (combination: any) => void
    combinationToEdit?: any
}

  
const AddEditVariantsCombinations = ({ closeDialogue, variants, hasEXW, hasFOB, addCombination, combinationToEdit, editCombination }: AddEditVariantsCombinationsProps) => {
    const { t } = useTranslation();
    const imageInputRef = useRef<HTMLInputElement>(null);
    const [combination, setCombination] = useState<CombinationModel>(combinationToEdit || {
        has_discount: false,
        photo: null,
        sku: null,
        infoEXW: hasEXW ? { discount_price: null, price: null } : null,
        infoFOB: hasFOB ? { discount_price: null, price: null } : null,
        variants
    });

    const handleChange = (e: any) => {
        setCombination({
            ...combination,
            [e.target.name]: e.target.name === "has_discount" ? JSON.parse(e.target.value) : e.target.value
        });
    }

    const handleChangeEXW = (e: any) => {
        setCombination({
            ...combination,
            infoEXW: {
                ...combination.infoEXW,
                [e.target.name]: e.target.value
            }
        });
    }

    const handleChangeFOB = (e: any) => {
        setCombination({
            ...combination,
            infoFOB: {
                ...combination.infoFOB,
                [e.target.name]: e.target.value
            }
        });
    }

    const handleFile = (e: any) => {
        setCombination({
            ...combination,
            photo: e.target.files[0]
        });
    }

    const handleVariantValueSelection = (variant: VariantModel, variantValueId: string, currentSelectedVariantValueId?: string) => {
        const variantIndex = combination.variants.findIndex((currentVariant: VariantModel) => currentVariant.id === variant.id);
        // Esto se puede dar si se esta editando una variante que no tiene actualmente la combinacion
        if (variantIndex === -1) {
            setCombination({
                ...combination,
                variants: [
                    ...combination.variants,
                    {
                        ...variant,
                        selectedVariantValueId: variantValueId
                    }
                ]
            });
        } else {
            const newVariants = [...combination.variants];
            newVariants[variantIndex] = {
                ...variant,
                selectedVariantValueId: variantValueId
            }

            const newCombination = {
                ...combination,
                variants: newVariants
            };

            if(combination.id && currentSelectedVariantValueId) {
                newCombination.delete_variant_values = [
                    ...(combination.delete_variant_values || []),
                    parseInt(currentSelectedVariantValueId)
                ];
            }
            setCombination(newCombination);
        }
    }

    const onSubmit = () => {
        const allVariantValuesSelected = combination.variants.every((variant: any) => variant.selectedVariantValueId);
        if (
            // Que tenga SKU
            !combination.sku ||
            // Si tiene FOB que tenga el precio
            (hasEXW && !combination?.infoEXW?.price) ||
            // Si tiene EXW que tenga el precio
            (hasFOB && !combination?.infoFOB?.price) ||
            // Que el valor de tods las variantes este elegido
            !allVariantValuesSelected ||
            // Si tiene descuento que este lleno el valor por descuento para FOB
            (combination.has_discount && hasFOB && !combination?.infoFOB?.discount_price) ||
            // Si tiene descuento que este lleno el valor por descuento para EXW
            (combination.has_discount && hasEXW && !combination?.infoEXW?.discount_price)
        ) {
            toast.error("Por favor complete todos los campos");
            t("products:HS")
            return
        }

        if (combination.has_discount && hasEXW && combination.infoEXW && combination.infoEXW.discount_price && combination.infoEXW.price &&
            (parseFloat(combination.infoEXW.discount_price as string) >= parseFloat(combination?.infoEXW?.price as string))
        ) {
            toast.error("El precio de descuento de EXW debe ser menor al precio normal");
            return
        }

        if (combination.has_discount && hasFOB && combination.infoFOB && combination.infoFOB.discount_price && combination.infoFOB.price &&
            (parseFloat(combination.infoFOB.discount_price as string) >= parseFloat(combination?.infoFOB?.price as string))
        ) {
            toast.error("El precio de descuento de FOB debe ser menor al precio normal");
            return
        }


        if (combinationToEdit && editCombination) {
            editCombination(combination)
        } else {
            addCombination && addCombination(combination);
        }

        closeDialogue();
    }
    return (
        <div className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-30 z-50 grid place-items-center overflow-y-scroll p-4'>
            <div className='bg-white py-[22px] px-[28px] rounded-[6px] min-w-[356px]'>
                <h2 className='text-[20px] text-primary font-bold text-center'>{
                    combination.id ? t("products:edit-combine") : t("products:add-combine")
                }</h2>
                {
                    variants.map((currentVariant: any) => {
                        const combinationVariant = combination.variants.find((v: VariantModel) => v.id === currentVariant.id);
                        return <div className='flex flex-col mt-[32px]' key={currentVariant.id}>
                            <h3 className='text-[13px] text-dark-blue'>{currentVariant.name}</h3>
                            <select
                                onChange={(e: any) => handleVariantValueSelection(currentVariant, e.target.value, combinationVariant?.selectedVariantValueId)}
                                className='h-[36px] border-[1px] mt-[4px] rounded-[6px] text-[14px]'>
                                <option disabled selected={!currentVariant.selectedVariantValueId} hidden value=""> {`Seleccionar ${currentVariant.name}`} </option>
                                {
                                    currentVariant.variant_values.map((currentVariantValue: VariantValueModel) => <option key={currentVariantValue.id} value={currentVariantValue.id} selected={parseInt(combinationVariant?.selectedVariantValueId || "-1") === currentVariantValue.id}>
                                        {currentVariantValue.value}
                                    </option>)
                                }
                            </select>
                        </div>
                    }

                    )
                }
                <div className='flex flex-col mt-[15px]'>
                    <h3 className='text-[13px] text-dark-blue'>{t("products:it-has-a-discount")}</h3>
                    <div className='flex mt-[20px]'>
                        <div className="flex items-center">
                            <input checked={combination.has_discount} onChange={handleChange} name="has_discount" id="combination-has-discount-radio-1" type="radio" value={'true'} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="combination-has-discount-radio-1" className="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500">{t("products:yes")}</label>
                        </div>
                        <div className="flex items-center ml-3">
                            <input checked={!combination.has_discount} onChange={handleChange} name="has_discount" id="combination-has-discount-radio-2" type="radio" value={'false'} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="combination-has-discount-radio-2" className="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500">{t("products:no")}</label>
                        </div>
                    </div>
                </div>
                {
                    hasEXW && <>
                        <div className='flex flex-col mt-[15px]'>
                            <h3 className='text-[13px] text-dark-blue'>{t("products:price")} EXW</h3>
                            <input required onChange={handleChangeEXW} name="price" value={combination.infoEXW?.price} type="number" className='h-[36px] border-[1px] mt-[4px] rounded-[6px]'></input>
                        </div>
                        {
                            combination.has_discount &&
                            <div className='flex flex-col mt-[15px]'>
                                <h3 className='text-[13px] text-dark-blue'>{t("products:discount-price")} EXW</h3>
                                <input required onChange={handleChangeEXW} name="discount_price" value={combination.infoEXW?.discount_price || ""} type="number" className='h-[36px] border-[1px] mt-[4px] rounded-[6px]'></input>
                            </div>
                        }
                    </>

                }
                {
                    hasFOB && <>
                        <div className='flex flex-col mt-[15px]'>
                            <h3 className='text-[13px] text-dark-blue'>{t("products:price")}  FOB</h3>
                            <input required onChange={handleChangeFOB} name="price" value={combination.infoFOB?.price} type="number" className='h-[36px] border-[1px] mt-[4px] rounded-[6px]'></input>
                        </div>
                        {
                            combination.has_discount &&
                            <div className='flex flex-col mt-[15px]'>
                                <h3 className='text-[13px] text-dark-blue'>{t("products:discount-price")}FOB</h3>
                                <input required onChange={handleChangeFOB} name="discount_price" value={combination.infoFOB?.discount_price || ""} type="number" className='h-[36px] border-[1px] mt-[4px] rounded-[6px]'></input>
                            </div>

                        }
                    </>
                }
                <div className='flex flex-col mt-[15px]'>
                    <h3 className='text-[13px] text-dark-blue'>SKU</h3>
                    <input required onChange={handleChange} name="sku" value={combination.sku || ""} type="number" className='h-[36px] border-[1px] mt-[4px] rounded-[6px]'></input>
                </div>
                <div className='flex flex-col mt-[15px]'>
                    <h3 className='text-[13px] text-dark-blue mx-auto'>{t("products:variant-photo")} ({t("products:optional")})</h3>
                    <Button onClick={() => imageInputRef?.current?.click()} text={combination.photo ? t("products:change-image") : t("products:add-image")} className='mx-auto mt-[11px]' />
                    <input onChange={handleFile} type="file" accept='image/*' className='hidden' ref={imageInputRef} />
                    <div className='text-[13px] text-black-page mx-auto mt-1 px-2'>{(combination.photo as File)?.name || ""}</div>
                </div>
                <div className='flex mt-[24px] w-full justify-around'>
                    <Button onClick={closeDialogue} text={t("products:cancel")} color='secondary' />
                    <Button onClick={onSubmit} text={combinationToEdit ? t("products:edit") : t("products:add")} />
                </div>
            </div>
        </div>
    )
}

export default AddEditVariantsCombinations